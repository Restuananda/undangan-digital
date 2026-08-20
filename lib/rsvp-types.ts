import "server-only";
import { RSVPCreateInput, RSVPRecord } from "@/types/wedding";

/**
 * Storage-agnostic contract for RSVP persistence. `JsonRSVPRepository`
 * (local dev / self-hosted with a writable filesystem) and
 * `RedisRSVPRepository` (Vercel / any serverless deploy) both implement
 * this — UI and API route code only ever talks to this interface, never to
 * a specific backend.
 */
export interface RSVPRepository {
  findByGuestId(guestId: string): Promise<RSVPRecord | null>;
  exists(guestId: string): Promise<boolean>;
  create(input: RSVPCreateInput): Promise<RSVPRecord>;
  /** Most recent records that carry a non-empty guestbook message, newest first. */
  listRecentWithMessages(limit: number): Promise<{ guestName: string; message: string }[]>;
}

export class RSVPAlreadyExistsError extends Error {
  existing: RSVPRecord;
  constructor(existing: RSVPRecord) {
    super("RSVP already submitted for this guest.");
    this.name = "RSVPAlreadyExistsError";
    this.existing = existing;
  }
}
