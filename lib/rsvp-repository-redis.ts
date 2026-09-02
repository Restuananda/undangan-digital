import "server-only";
import { Redis } from "@upstash/redis";
import { RSVPCreateInput, RSVPRecord } from "@/types/wedding";
import { RSVPAlreadyExistsError, RSVPRepository } from "./rsvp-types";

const KEY_PREFIX = "rsvp:";
const INDEX_KEY = "rsvp:index";

let client: Redis | null = null;

function getClient(): Redis {
  if (!client) {
    // fromEnv() reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
    // (Vercel's Redis storage integration injects these, along with the
    // older KV_REST_API_* aliases, automatically once connected — no
    // manual setup beyond adding the integration in the Vercel dashboard).
    client = Redis.fromEnv();
  }
  return client;
}

/**
 * Redis-backed storage — required for Vercel (or any serverless deploy),
 * since those platforms run functions on a read-only filesystem where
 * JsonRSVPRepository's writes would fail. Duplicate protection here is
 * enforced with an atomic SET ... NX at the database level, which — unlike
 * an in-process mutex — stays correct even when concurrent requests land on
 * different, isolated serverless instances.
 */
export class RedisRSVPRepository implements RSVPRepository {
  async findByGuestId(guestId: string): Promise<RSVPRecord | null> {
    // Reads fail safe: this runs on every guest-page view just to render the
    // "already submitted?" state, so a transient Redis hiccup here must
    // never take down the whole invitation page — worst case, a guest who
    // already responded sees the form again and gets ALREADY_SUBMITTED back
    // from the (still-authoritative) create() check on resubmit.
    try {
      const record = await getClient().get<RSVPRecord>(`${KEY_PREFIX}${guestId}`);
      return record ?? null;
    } catch (err) {
      console.error("[rsvp-repository-redis] findByGuestId failed", err);
      return null;
    }
  }

  async exists(guestId: string): Promise<boolean> {
    try {
      return (await getClient().exists(`${KEY_PREFIX}${guestId}`)) === 1;
    } catch (err) {
      console.error("[rsvp-repository-redis] exists failed", err);
      return false;
    }
  }

  async create(input: RSVPCreateInput): Promise<RSVPRecord> {
    // Writes do NOT fail safe — if Redis is unreachable or misconfigured,
    // the guest needs a real error, not a false "success".
    const record: RSVPRecord = {
      id: `rsvp_${input.guestId}_${Date.now()}`,
      guestId: input.guestId,
      guestName: input.guestName,
      attendance: input.attendance,
      message: input.message ?? "",
      submittedAt: new Date().toISOString(),
    };

    const wasSet = await getClient().set(`${KEY_PREFIX}${input.guestId}`, record, { nx: true });

    if (!wasSet) {
      const existing = await this.findByGuestId(input.guestId);
      throw new RSVPAlreadyExistsError(existing ?? record);
    }

    // Track guest IDs that have an RSVP so the wishes wall can list recent
    // messages without scanning/guessing keys. Best-effort — if this one
    // call fails, the RSVP itself is already safely recorded above, so we
    // log rather than fail the whole submission over a non-critical index
    // update.
    try {
      await getClient().sadd(INDEX_KEY, input.guestId);
    } catch (err) {
      console.error("[rsvp-repository-redis] failed to update wishes index", err);
    }

    return record;
  }

  async listRecentWithMessages(limit: number): Promise<{ guestName: string; message: string }[]> {
    try {
      const redis = getClient();
      const guestIds = await redis.smembers(INDEX_KEY);
      if (!guestIds.length) return [];

      const records = await Promise.all(guestIds.map((id) => redis.get<RSVPRecord>(`${KEY_PREFIX}${id}`)));

      return records
        .filter((r): r is RSVPRecord => !!r && !!r.message && r.message.trim().length > 0)
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
        .slice(0, limit)
        .map((r) => ({ guestName: r.guestName, message: r.message }));
    } catch (err) {
      console.error("[rsvp-repository-redis] listRecentWithMessages failed", err);
      return [];
    }
  }
}
