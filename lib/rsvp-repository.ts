import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { RSVPCreateInput, RSVPRecord } from "@/types/wedding";

/**
 * Storage-agnostic contract for RSVP persistence. Swap `JsonRSVPRepository`
 * for a Postgres/MySQL/Supabase-backed implementation later without
 * touching any UI or API route code — they only ever talk to this interface.
 */
export interface RSVPRepository {
  findByGuestId(guestId: string): Promise<RSVPRecord | null>;
  exists(guestId: string): Promise<boolean>;
  create(input: RSVPCreateInput): Promise<RSVPRecord>;
}

const DATA_PATH = path.join(process.cwd(), "public", "rsvp.json");

/**
 * A minimal in-process mutex. Serializes every read-modify-write cycle so two
 * concurrent requests for the same guest can never both pass the "exists"
 * check before either has written — the core race condition the JSON store
 * is otherwise vulnerable to. (A real database instead enforces this with a
 * UNIQUE(guestId) constraint; see the note on JsonRSVPRepository.create.)
 */
class Mutex {
  private tail: Promise<unknown> = Promise.resolve();

  run<T>(task: () => Promise<T>): Promise<T> {
    const result = this.tail.then(task, task);
    // Swallow errors here so one failed task doesn't wedge the queue for
    // later, unrelated tasks — each caller still receives its own rejection.
    this.tail = result.then(
      () => undefined,
      () => undefined
    );
    return result;
  }
}

const writeLock = new Mutex();

async function readAll(): Promise<RSVPRecord[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(records: RSVPRecord[]): Promise<void> {
  const tmpPath = `${DATA_PATH}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(records, null, 2), "utf-8");
  // Atomic on POSIX filesystems — readers never observe a half-written file.
  await fs.rename(tmpPath, DATA_PATH);
}

export class JsonRSVPRepository implements RSVPRepository {
  async findByGuestId(guestId: string): Promise<RSVPRecord | null> {
    const records = await readAll();
    return records.find((r) => r.guestId === guestId) ?? null;
  }

  async exists(guestId: string): Promise<boolean> {
    return (await this.findByGuestId(guestId)) !== null;
  }

  async create(input: RSVPCreateInput): Promise<RSVPRecord> {
    // The whole check-then-write cycle happens inside the mutex so a second
    // request for the same guest, arriving mid-write, waits its turn instead
    // of reading a stale "no existing RSVP" snapshot.
    return writeLock.run(async () => {
      const records = await readAll();
      const existing = records.find((r) => r.guestId === input.guestId);
      if (existing) {
        // The route handler treats this as ALREADY_SUBMITTED.
        throw new RSVPAlreadyExistsError(existing);
      }

      const record: RSVPRecord = {
        id: `rsvp_${input.guestId}_${Date.now()}`,
        guestId: input.guestId,
        guestName: input.guestName,
        attendance: input.attendance,
        message: input.message ?? "",
        submittedAt: new Date().toISOString(),
      };

      records.push(record);
      await writeAll(records);
      return record;
    });
  }
}

export class RSVPAlreadyExistsError extends Error {
  existing: RSVPRecord;
  constructor(existing: RSVPRecord) {
    super("RSVP already submitted for this guest.");
    this.name = "RSVPAlreadyExistsError";
    this.existing = existing;
  }
}

// Swap this single export to change storage backend everywhere at once.
export const rsvpRepository: RSVPRepository = new JsonRSVPRepository();
