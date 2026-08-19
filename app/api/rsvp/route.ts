import { NextRequest, NextResponse } from "next/server";
import { getGuestById } from "@/lib/guests";
import { rsvpRepository, RSVPAlreadyExistsError } from "@/lib/rsvp-repository";
import { Attendance, RSVPResult } from "@/types/wedding";

const MAX_MESSAGE_LENGTH = 500;
const ATTENDANCE_VALUES: Attendance[] = ["attending", "not_attending"];

function sanitizeMessage(raw: unknown): string {
  if (typeof raw !== "string") return "";
  // Strip control characters and collapse excessive whitespace; this is a
  // guestbook message, not markup, so no HTML is ever persisted or rendered
  // as anything but plain text.
  return raw
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

export async function POST(req: NextRequest): Promise<NextResponse<RSVPResult>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, code: "INVALID_INPUT", message: "The request body could not be read." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { success: false, code: "INVALID_INPUT", message: "Invalid request." },
      { status: 400 }
    );
  }

  const { guestId, guestName, attendance, message } = body as Record<string, unknown>;

  if (typeof guestId !== "string" || !guestId.trim()) {
    return NextResponse.json(
      { success: false, code: "INVALID_INPUT", message: "A guest could not be identified." },
      { status: 400 }
    );
  }

  if (typeof attendance !== "string" || !ATTENDANCE_VALUES.includes(attendance as Attendance)) {
    return NextResponse.json(
      { success: false, code: "INVALID_INPUT", message: "Please choose whether you'll be attending." },
      { status: 400 }
    );
  }

  // Re-validate the guest against the server-side roster rather than trusting
  // the client-supplied name — the client only ever confirms identity, it
  // never establishes it.
  const guest = await getGuestById(guestId);
  if (!guest) {
    return NextResponse.json(
      { success: false, code: "INVALID_GUEST", message: "We couldn't find your invitation." },
      { status: 404 }
    );
  }

  const safeMessage = sanitizeMessage(message);
  const safeName = typeof guestName === "string" && guestName.trim() ? guestName.trim() : guest.name;

  try {
    const record = await rsvpRepository.create({
      guestId: guest.id,
      guestName: safeName,
      attendance: attendance as Attendance,
      message: safeMessage,
    });

    return NextResponse.json({
      success: true,
      message: "Your RSVP has been received.",
      record,
    });
  } catch (err) {
    if (err instanceof RSVPAlreadyExistsError) {
      return NextResponse.json(
        { success: false, code: "ALREADY_SUBMITTED", message: "Your RSVP has already been received." },
        { status: 409 }
      );
    }
    console.error("Failed to create RSVP", err);
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
