/**
 * Extracts and decodes the personalized guest name from a URL query string.
 * Supports both `+`-encoded spaces and `%20`, Indonesian characters, and
 * punctuation. Falls back to "Nama Tamu" when no `to` param is present.
 */
export function getGuestNameFromUrl(search: string): string {
  const params = new URLSearchParams(search);
  const raw = params.get("to");

  if (!raw) return "Nama Tamu";

  const decoded = raw.trim();
  return decoded.length > 0 ? decoded : "Nama Tamu";
}

/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Clamps a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Pads a number to at least 2 digits, e.g. 5 -> "05". */
export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

/** Generates a reasonably unique id for client-only entries (wishes, etc). */
export function generateId(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
