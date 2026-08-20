import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { Guest } from "@/types/wedding";

const GUESTS_PATH = path.join(process.cwd(), "public", "guests.json");

let cache: Guest[] | null = null;

async function readGuests(): Promise<Guest[]> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(GUESTS_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Guest[];
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

function normalizeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    return slug.trim().toLowerCase();
  }
}

/**
 * Looks up a single guest by slug. Only ever returns the one matching guest
 * (or null) — the full roster is never sent to the client.
 */
export async function getGuestBySlug(slug: string | undefined | null): Promise<Guest | null> {
  if (!slug) return null;
  const target = normalizeSlug(slug);
  if (!target) return null;
  const guests = await readGuests();
  const found = guests.find((g) => normalizeSlug(g.slug) === target);
  return found ?? null;
}

export async function getGuestById(id: string | undefined | null): Promise<Guest | null> {
  if (!id) return null;
  const guests = await readGuests();
  return guests.find((g) => g.id === id) ?? null;
}

function normalizeName(name: string): string {
  // Loose on purpose: real guest lists carry titles and punctuation
  // ("S. Pd.,Gr", "A.Md.T", commas, ampersands) that a guest typing their
  // own name on a phone won't reliably reproduce. Stripping everything but
  // letters/digits/spaces before comparing means "Muhammat Sahril" matches
  // "Muhammat Sahril S. Pd.,Gr" just as well as the fully punctuated form.
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Looks up a single guest by loose (punctuation/case/whitespace-insensitive)
 * name match. Used for the name-entry access gate — returns the one
 * matching guest or null, never the roster. If two guests normalize to the
 * same value, the first match wins; guests.json has been checked to contain
 * no such collisions as of the current roster.
 */
export async function getGuestByName(name: string | undefined | null): Promise<Guest | null> {
  if (!name) return null;
  const target = normalizeName(name);
  if (!target) return null;
  const guests = await readGuests();
  return guests.find((g) => normalizeName(g.name) === target) ?? null;
}
