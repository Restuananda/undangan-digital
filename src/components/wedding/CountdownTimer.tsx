import { useCountdown } from "../../hooks/useCountdown";
import { pad2 } from "../../lib/utils";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { weddingData } from "../../data/wedding";

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center border border-beige-dark/70 sm:h-20 sm:w-20">
        <span className="font-display text-2xl text-charcoal sm:text-3xl tabular-nums">
          {pad2(value)}
        </span>
      </div>
      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-charcoal-soft">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const countdown = useCountdown(weddingData.weddingDateISO);

  return (
    <Section tone="ivory">
      <SectionHeading eyebrow="Menghitung Hari" title="Menuju Hari Bahagia" />

      <div className="mt-12 flex justify-center gap-3 sm:gap-5">
        {countdown.isComplete ? (
          <p className="font-accent italic text-xl text-gold">
            Hari bahagia telah tiba. Sampai jumpa di hari pernikahan kami!
          </p>
        ) : (
          <>
            <TimeBlock value={countdown.days} label="Hari" />
            <TimeBlock value={countdown.hours} label="Jam" />
            <TimeBlock value={countdown.minutes} label="Menit" />
            <TimeBlock value={countdown.seconds} label="Detik" />
          </>
        )}
      </div>
    </Section>
  );
}
