import { weddingConfig } from "@/lib/config";
import Reveal from "./Reveal";
import { ArchTransition, RingsMonogram } from "./Ornaments";

export default function Venue() {
  const { venue } = weddingConfig;
  return (
    <section id="venue" className="relative bg-[color:var(--color-paper)] px-8 py-28 text-center sm:px-14">
      <ArchTransition fill="var(--color-paper)" />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 38px, var(--color-taupe) 38px 39px)",
        }}
      />
      <Reveal>
        {/* Wedding-arch panel stands in for a venue photograph */}
        <div className="wedding-arch relative mx-auto max-w-xl border border-[color:var(--color-taupe)]/35 bg-[color:var(--color-ivory)] px-8 pb-16 pt-14 sm:px-14">
          <RingsMonogram className="mx-auto h-8 w-14 text-[color:var(--color-gold)]/70" strokeWidth={1} />
          <p className="eyebrow mt-8">The Venue</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl italic text-[color:var(--color-bark)] sm:text-4xl">
            {venue.name}
          </h2>
          <p className="mx-auto mt-4 max-w-[34ch] font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-taupe-dark)]">
            {venue.address}
          </p>
          <p className="mx-auto mt-4 max-w-[36ch] font-[family-name:var(--font-body)] text-xs leading-relaxed text-[color:var(--color-taupe)]">
            {venue.note}
          </p>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-8 inline-flex h-12 items-center gap-2 border border-[color:var(--color-gold)]/60 px-7 text-xs tracking-[0.2em] text-[color:var(--color-gold)] transition-colors hover:bg-[color:var(--color-gold)]/10"
          >
            VIEW ON GOOGLE MAPS
          </a>
        </div>
      </Reveal>
    </section>
  );
}
