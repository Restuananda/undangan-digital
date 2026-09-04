import { weddingConfig } from "@/lib/config";
import { WeddingEventDetail } from "@/types/wedding";
import Reveal from "./Reveal";
import { ArchTransition } from "./Ornaments";
import Image from "next/image";

function EventBlock({ event }: { event: WeddingEventDetail }) {
  return (
    <div className="flex flex-col items-center px-4 text-center">
      <p className="eyebrow">{event.label}</p>
      <p className="mt-5 font-[family-name:var(--font-display)] text-2xl italic text-[color:var(--color-bark)] sm:text-3xl">
        {event.date}
      </p>
      <p className="mt-2 font-[family-name:var(--font-body)] text-sm tracking-wide text-[color:var(--color-taupe-dark)]">
        {event.time}
      </p>
      <div className="my-6 h-px w-10 bg-[color:var(--color-gold)]/50" />
      <p className="font-[family-name:var(--font-body)] text-base text-[color:var(--color-bark)]">
        {event.venueName}
      </p>
      <p className="mt-1 max-w-[32ch] font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-taupe-dark)]">
        {event.address}
      </p>
      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="focus-ring mt-6 inline-flex h-11 items-center gap-2 border border-[color:var(--color-gold)]/60 px-6 text-xs tracking-[0.2em] text-[color:var(--color-gold)] transition-colors hover:bg-[color:var(--color-gold)]/10"
      >
        LIHAT DI GOOGLE MAPS
      </a>
    </div>
  );
}

export default function WeddingEvent() {
  const { akad, reception } = weddingConfig.events;
  return (
    <section id="wedding" className="relative bg-[color:var(--color-ivory)] px-6 py-28 sm:px-14">

      <Image
        src="/images/background4.webp"
        width={720}
        height={405}
        priority
        // quality={100}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <ArchTransition fill="var(--color-ivory)" />
      <Reveal>
        <p className="eyebrow text-center">Acara Pernikahan</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mx-auto mt-4 max-w-[20ch] text-center font-[family-name:var(--font-display)] text-3xl italic text-[color:var(--color-bark)] sm:text-4xl">
          Saat kami mengucap janji suci
        </h2>
      </Reveal>

      <div className="mx-auto mt-20 flex max-w-3xl flex-col items-center gap-16 sm:flex-row sm:items-stretch sm:justify-center sm:gap-0">
        <Reveal delay={150} className="sm:flex-1">
          <EventBlock event={akad} />
        </Reveal>
        <div className="hidden w-px shrink-0 bg-[color:var(--color-taupe)]/30 sm:block" />
        <Reveal delay={250} className="sm:flex-1">
          <EventBlock event={reception} />
        </Reveal>
      </div>
    </section>
  );
}
