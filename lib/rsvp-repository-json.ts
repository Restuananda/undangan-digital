import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { RSVPCreateInput, RSVPRecord } from "@/types/wedding";
import { RSVPAlreadyExistsError, RSVPRepository } from "./rsvp-types";

/**
 * Local-filesystem storage. Fine for local development and for a
 * self-hosted deployment with a persistent, writable disk. NOT usable on
 * Vercel or any other serverless host — those run functions on a read-only
 * filesystem, so writes here will fail in that environment. Use
 * RedisRSVPRepository there instead (see rsvp-repository.ts for the
 * automatic selection).
 */
const DATA_PATH = path.join(process.cwd(), "public", "rsvp.json");

/**
 * A minimal in-process mutex. Serializes every read-modify-write cycle so two
 * concurrent requests for the same guest can never both pass the "exists"
 * check before either has written. This only protects concurrency *within a
 * single running process* — it does not help across multiple server
 * instances, which is one more reason this backend is local/single-server
 * only.
 */
class Mutex {
  private tail: Promise<unknown> = Promise.resolve();

  run<T>(task: () => Promise<T>): Promise<T> {
    const result = this.tail.then(task, task);
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
    return writeLock.run(async () => {
      const records = await readAll();
      const existing = records.find((r) => r.guestId === input.guestId);
      if (existing) {
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

  async listRecentWithMessages(limit: number): Promise<{ guestName: string; message: string }[]> {
    const records = await readAll();
    return records
      .filter((r) => r.message && r.message.trim().length > 0)
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, limit)
      .map((r) => ({ guestName: r.guestName, message: r.message }));
  }
}
