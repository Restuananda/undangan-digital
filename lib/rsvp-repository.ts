import "server-only";
import { RSVPRepository } from "./rsvp-types";
import { JsonRSVPRepository } from "./rsvp-repository-json";
import { RedisRSVPRepository } from "./rsvp-repository-redis";

export type { RSVPRepository } from "./rsvp-types";
export { RSVPAlreadyExistsError } from "./rsvp-types";

// Redis env vars are present whenever a Vercel Redis storage integration
// (or a manually-configured Upstash Redis instance) is connected. When
// they're absent — local development, or a self-hosted deploy with a
// persistent disk — fall back to the JSON file on disk. Deploying to Vercel
// WITHOUT connecting a Redis integration will silently keep using the JSON
// path, which does not work there (see rsvp-repository-json.ts) — the
// README covers the one-time setup this needs.
//
// Both URL *and* token are required together — a half-configured pair (one
// set, one missing) would make @upstash/redis throw on first use, which
// would break every page that checks RSVP status. Falling back to JSON in
// that case is safer than crashing, even though it means writes still won't
// persist until the pair is fixed.
const hasRedisConfig = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
);

export const rsvpRepository: RSVPRepository = hasRedisConfig
  ? new RedisRSVPRepository()
  : new JsonRSVPRepository();
