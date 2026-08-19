import { NextRequest, NextResponse } from "next/server";
import { getGuestByName } from "@/lib/guests";
import { rsvpRepository } from "@/lib/rsvp-repository";

export interface GuestAccessResult {
  success: boolean;
  guest?: { id: string; name: string };
  existingRecord?: import("@/types/wedding").RSVPRecord | null;
  message: string;
}

// A minimal in-memory limiter so this endpoint can't be brute-forced against
// the guest list. Resets on server restart — fine for an invitation's scale,
// swap for a shared store (e.g. Redis) if this is ever deployed behind
// multiple server instances.
const ATTEMPT_LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(key, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > ATTEMPT_LIMIT;
}

export async function POST(req: NextRequest): Promise<NextResponse<GuestAccessResult>> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "The request could not be read." },
      { status: 400 }
    );
  }

  const name = typeof body === "object" && body !== null ? (body as Record<string, unknown>).name : null;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json(
      { success: false, message: "Please enter your name as it appears on your invitation." },
      { status: 400 }
    );
  }

  const guest = await getGuestByName(name);

  if (!guest) {
    // Deliberately generic — this endpoint never confirms or denies partial
    // matches, and never reveals anything about the guest list.
    return NextResponse.json({
      success: false,
      message: "We couldn't find that name on the guest list. Please check the spelling, or reach out to the couple directly.",
    });
  }

  const existingRecord = await rsvpRepository.findByGuestId(guest.id);

  return NextResponse.json({
    success: true,
    guest: { id: guest.id, name: guest.name },
    existingRecord,
    message: "Welcome.",
  });
}
