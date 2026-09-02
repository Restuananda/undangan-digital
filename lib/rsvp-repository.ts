import "server-only";
import { RSVPRepository } from "./rsvp-types";
import { JsonRSVPRepository } from "./rsvp-repository-json";
import { RedisRSVPRepository } from "./rsvp-repository-redis";
import { SupabaseRSVPRepository } from "./rsvp-repository-supabase";

export type { RSVPRepository } from "./rsvp-types";
export { RSVPAlreadyExistsError } from "./rsvp-types";

// Backend is picked automatically from whichever env vars are present, in
// this priority order. Local development (no env vars set) always falls
// back to the JSON file, which is fine there since disk is writable —
// deploying to Vercel (or any serverless host) WITHOUT one of Supabase or
// Redis configured will silently keep using JSON, which does not work
// there (see rsvp-repository-json.ts). The README covers the one-time
// setup each option needs.
//
// Each pair below requires BOTH values together — a half-configured pair
// (one set, one missing) would make the client throw on first use, which
// would break every page that checks RSVP status. Treating a half-set pair
// as "not configured" and falling through to the next option is safer than
// crashing.
const hasSupabaseConfig = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

const hasRedisConfig = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
);

export const rsvpRepository: RSVPRepository = hasSupabaseConfig
  ? new SupabaseRSVPRepository()
  : hasRedisConfig
    ? new RedisRSVPRepository()
    : new JsonRSVPRepository();
