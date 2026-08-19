"use client";

import { useEffect, useState } from "react";
import { weddingConfig } from "@/lib/config";
import Reveal from "./Reveal";
import { ArchTransition, LaurelWreath } from "./Ornaments";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown() {
  const target = new Date(weddingConfig.weddingDateISO).getTime();
  // Server and client never agree on "now" down to the second, so the server
  // renders a static placeholder and the real countdown is filled in only
  // after mount — that keeps the SSR markup and the first client render
  // byte-for-byte identical, avoiding a hydration mismatch.
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: seeds the client-only countdown after mount to avoid an SSR/CSR hydration mismatch on Date.now().
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { label: string; value: string }[] = [
    { label: "Days", value: time ? String(time.days) : "—" },
    { label: "Hours", value: time ? pad(time.hours) : "—" },
    { label: "Minutes", value: time ? pad(time.minutes) : "—" },
    { label: "Seconds", value: time ? pad(time.seconds) : "—" },
  ];

  return (
    <section className="relative flex flex-col items-center bg-[color:var(--color-bark)] px-6 py-24 text-center sm:py-32">
      <ArchTransition fill="var(--color-bark)" />
      <Reveal>
        <LaurelWreath className="mb-6 h-8 w-24 text-[color:var(--color-gold-soft)]/60 sm:h-10 sm:w-32" />
      </Reveal>
      <Reveal delay={60}>
        <p className="eyebrow text-[color:var(--color-gold-soft)]">Counting Down To</p>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-3 font-[family-name:var(--font-display)] text-2xl italic text-[color:var(--color-ivory)] sm:text-3xl">
          {weddingConfig.weddingDateDisplay}
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-14 flex items-start gap-5 sm:gap-10" aria-live="polite">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-start gap-5 sm:gap-10">
              <div className="flex flex-col items-center">
                <span className="font-[family-name:var(--font-display)] text-5xl italic tabular-nums text-[color:var(--color-ivory)] sm:text-7xl">
                  {u.value}
                </span>
                <span className="eyebrow mt-3 text-[0.6rem] text-[color:var(--color-champagne)]/70">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="pt-2 font-[family-name:var(--font-display)] text-3xl italic text-[color:var(--color-gold)]/50 sm:text-5xl">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
