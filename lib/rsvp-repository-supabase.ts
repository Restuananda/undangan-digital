import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { RSVPCreateInput, RSVPRecord } from "@/types/wedding";
import { RSVPAlreadyExistsError, RSVPRepository } from "./rsvp-types";

const TABLE = "rsvps";

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase environment variables are not configured.");
    }
    // Service-role key — full read/write, bypasses Row Level Security by
    // design. This file is marked "server-only" and is never imported from
    // a client component, so the key never reaches the browser. Do not
    // reuse this client outside server-only code.
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}

interface RsvpRow {
  id: string;
  guest_id: string;
  guest_name: string;
  attendance: "attending" | "not_attending";
  message: string | null;
  submitted_at: string;
}

function toRecord(row: RsvpRow): RSVPRecord {
  return {
    id: row.id,
    guestId: row.guest_id,
    guestName: row.guest_name,
    attendance: row.attendance,
    message: row.message ?? "",
    submittedAt: row.submitted_at,
  };
}

/**
 * Supabase (Postgres)-backed storage. Works on Vercel or any serverless
 * host — unlike the JSON file backend, nothing here touches the local
 * filesystem. Duplicate protection is enforced by a UNIQUE constraint on
 * guest_id at the database level (see supabase/schema.sql), which — like
 * the Redis backend's atomic SET NX — stays correct across any number of
 * concurrent serverless instances, unlike an in-process JS mutex.
 */
export class SupabaseRSVPRepository implements RSVPRepository {
  async findByGuestId(guestId: string): Promise<RSVPRecord | null> {
    try {
      const { data, error } = await getClient()
        .from(TABLE)
        .select("*")
        .eq("guest_id", guestId)
        .maybeSingle<RsvpRow>();

      if (error) {
        console.error("[rsvp-repository-supabase] findByGuestId failed", error);
        return null;
      }
      return data ? toRecord(data) : null;
    } catch (err) {
      // Reads fail safe — this runs on every guest-page view just to check
      // "already submitted?" status, so a transient Supabase issue must
      // never take down the whole invitation page.
      console.error("[rsvp-repository-supabase] findByGuestId threw", err);
      return null;
    }
  }

  async exists(guestId: string): Promise<boolean> {
    try {
      const { count, error } = await getClient()
        .from(TABLE)
        .select("id", { count: "exact", head: true })
        .eq("guest_id", guestId);

      if (error) {
        console.error("[rsvp-repository-supabase] exists failed", error);
        return false;
      }
      return (count ?? 0) > 0;
    } catch (err) {
      console.error("[rsvp-repository-supabase] exists threw", err);
      return false;
    }
  }

  async create(input: RSVPCreateInput): Promise<RSVPRecord> {
    // Writes do NOT fail safe — if Supabase is unreachable or misconfigured,
    // the guest needs a real error, not a false "success".
    const record: RSVPRecord = {
      id: `rsvp_${input.guestId}_${Date.now()}`,
      guestId: input.guestId,
      guestName: input.guestName,
      attendance: input.attendance,
      message: input.message ?? "",
      submittedAt: new Date().toISOString(),
    };

    const { error } = await getClient()
      .from(TABLE)
      .insert({
        id: record.id,
        guest_id: record.guestId,
        guest_name: record.guestName,
        attendance: record.attendance,
        message: record.message,
        submitted_at: record.submittedAt,
      });

    if (error) {
      // 23505 = Postgres unique_violation — the guest_id UNIQUE constraint
      // is what actually makes "one RSVP per guest" atomic.
      if (error.code === "23505") {
        const existing = await this.findByGuestId(input.guestId);
        throw new RSVPAlreadyExistsError(existing ?? record);
      }
      throw new Error(`Supabase insert failed: ${error.message}`);
    }

    return record;
  }

  async listRecentWithMessages(limit: number): Promise<{ guestName: string; message: string }[]> {
    try {
      const { data, error } = await getClient()
        .from(TABLE)
        .select("guest_name, message, submitted_at")
        .not("message", "eq", "")
        .order("submitted_at", { ascending: false })
        .limit(limit);

      if (error || !data) {
        if (error) console.error("[rsvp-repository-supabase] listRecentWithMessages failed", error);
        return [];
      }

      return data
        .filter((r) => r.message && r.message.trim().length > 0)
        .map((r) => ({ guestName: r.guest_name as string, message: r.message as string }));
    } catch (err) {
      console.error("[rsvp-repository-supabase] listRecentWithMessages threw", err);
      return [];
    }
  }
}
