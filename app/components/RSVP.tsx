"use client";

import { useState } from "react";
import { Attendance, RSVPRecord } from "@/types/wedding";
import Reveal from "./Reveal";
import { ArchTransition, LaurelWreath } from "./Ornaments";

interface RSVPProps {
  guestId: string | null;
  guestName: string;
  initialRecord: RSVPRecord | null;
}

const MAX_MESSAGE_LENGTH = 500;

type Status = "idle" | "submitting" | "success" | "error";

export default function RSVP({ guestId, guestName, initialRecord }: RSVPProps) {
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [record, setRecord] = useState<RSVPRecord | null>(initialRecord);

  const alreadySubmitted = record !== null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestId || !attendance || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestId, guestName, attendance, message }),
      });
      const data = await res.json();

      if (data.success) {
        setRecord(data.record);
        setStatus("success");
      } else if (data.code === "ALREADY_SUBMITTED") {
        // Someone double-submitted (e.g. two tabs) — treat it as the
        // already-submitted state rather than an error.
        setStatus("success");
        setRecord((prev) => prev ?? { ...data, attendance, message, guestName, guestId, id: "existing", submittedAt: new Date().toISOString() });
      } else {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (!guestId) {
    return (
      <section id="rsvp" className="relative bg-[color:var(--color-ivory)] px-6 py-28 text-center sm:px-14">
        <ArchTransition fill="var(--color-ivory)" />
        <p className="eyebrow">RSVP</p>
        <p className="mx-auto mt-6 max-w-[36ch] font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-taupe-dark)]">
          This preview isn&apos;t tied to a guest. Please open your personal invitation link to confirm your
          attendance.
        </p>
      </section>
    );
  }

  if (alreadySubmitted) {
    return (
      <section id="rsvp" className="relative bg-[color:var(--color-ivory)] px-6 py-28 text-center sm:px-14">
        <ArchTransition fill="var(--color-ivory)" />
        <Reveal>
          <p className="eyebrow">
            {status === "success" ? "Thank You" : "RSVP Received"}
          </p>
          <h2 className="mx-auto mt-6 max-w-[26ch] font-[family-name:var(--font-display)] text-3xl italic leading-tight text-[color:var(--color-bark)] sm:text-4xl">
            {record?.attendance === "attending"
              ? "We're so grateful to know you'll be part of our celebration."
              : "Your love and good wishes mean just as much."}
          </h2>
          <p className="mx-auto mt-6 max-w-[34ch] font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-taupe-dark)]">
            {status === "success"
              ? record?.attendance === "attending"
                ? "Your seat will be waiting."
                : "We're grateful you took a moment to let us know."
              : "We've already received your response. Thank you for letting us know."}
          </p>
          {record && (
            <p className="mt-8 inline-block border border-[color:var(--color-gold)]/50 px-5 py-2 text-xs tracking-[0.2em] text-[color:var(--color-gold)]">
              {record.attendance === "attending" ? "ATTENDING" : "UNABLE TO ATTEND"}
            </p>
          )}
        </Reveal>
      </section>
    );
  }

  return (
    <section id="rsvp" className="relative bg-[color:var(--color-ivory)] px-6 py-28 sm:px-14">
      <ArchTransition fill="var(--color-ivory)" />
      <Reveal>
        <LaurelWreath className="mx-auto mb-6 h-7 w-20 text-[color:var(--color-gold)]/60" />
      </Reveal>
      <Reveal delay={40}>
        <p className="eyebrow text-center">RSVP</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mx-auto mt-4 max-w-[22ch] text-center font-[family-name:var(--font-display)] text-3xl italic leading-tight text-[color:var(--color-bark)] sm:text-4xl">
          Will you celebrate this special day with us?
        </h2>
      </Reveal>

      <form onSubmit={handleSubmit} className="mx-auto mt-14 max-w-md">
        <Reveal delay={200}>
          <div className="flex flex-col gap-4 sm:flex-row" role="radiogroup" aria-label="Attendance">
            {(
              [
                { value: "attending" as Attendance, title: "Joyfully Accept", sub: "I'll be there to celebrate with you." },
                { value: "not_attending" as Attendance, title: "Unable to Attend", sub: "With love, I'll be celebrating from afar." },
              ]
            ).map((opt) => {
              const selected = attendance === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setAttendance(opt.value)}
                  className={`focus-ring flex min-h-[88px] flex-1 flex-col items-center justify-center gap-1.5 border px-4 py-5 text-center transition-all duration-500 ${
                    selected
                      ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10"
                      : "border-[color:var(--color-taupe)]/40 hover:border-[color:var(--color-gold)]/50"
                  }`}
                >
                  <span
                    className={`font-[family-name:var(--font-display)] text-lg italic transition-colors ${
                      selected ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-bark)]"
                    }`}
                  >
                    {opt.title}
                  </span>
                  <span className="text-xs leading-snug text-[color:var(--color-taupe-dark)]">{opt.sub}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10">
            <label
              htmlFor="rsvp-message"
              className="mb-3 block font-[family-name:var(--font-display)] text-xl italic text-[color:var(--color-bark)]"
            >
              Leave a little love
            </label>
            <textarea
              id="rsvp-message"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message for the happy couple..."
              rows={4}
              className="focus-ring w-full resize-none border border-[color:var(--color-taupe)]/40 bg-transparent px-4 py-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-bark)] placeholder:text-[color:var(--color-taupe)]"
            />
            <div className="mt-2 text-right text-[0.7rem] text-[color:var(--color-taupe)]">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </div>
          </div>
        </Reveal>

        {errorMessage && (
          <p role="alert" className="mt-4 text-center text-sm text-[#9a4a3a]">
            {errorMessage}
          </p>
        )}

        <Reveal delay={380}>
          <button
            type="submit"
            disabled={!attendance || status === "submitting"}
            className="focus-ring mt-10 flex h-14 w-full items-center justify-center gap-2 border border-[color:var(--color-bark)] bg-[color:var(--color-bark)] text-xs tracking-[0.25em] text-[color:var(--color-ivory)] transition-all duration-500 hover:bg-transparent hover:text-[color:var(--color-bark)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[color:var(--color-bark)] disabled:hover:text-[color:var(--color-ivory)]"
          >
            {status === "submitting" ? "CONFIRMING YOUR RSVP..." : "CONFIRM MY RSVP"}
          </button>
        </Reveal>
      </form>
    </section>
  );
}
