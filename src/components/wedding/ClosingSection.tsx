import { ArchOrnament } from "../ui/Ornament";
import { Divider } from "../ui/Divider";
import { weddingData } from "../../data/wedding";

export function ClosingSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-ivory px-6 py-24 text-center">
      <ArchOrnament className="pointer-events-none absolute left-1/2 top-6 h-[85%] w-auto -translate-x-1/2 rotate-180 opacity-50" />

      <span className="font-accent italic text-sm tracking-[0.3em] text-gold">Terima Kasih</span>

      <p className="mt-8 max-w-sm font-body text-[15px] leading-relaxed text-charcoal-soft text-balance">
        {weddingData.closingMessage}
      </p>

      <Divider className="my-8 max-w-[180px]" />

      <span className="font-body text-[11px] uppercase tracking-[0.25em] text-charcoal-soft">
        Kami yang berbahagia,
      </span>

      <div className="mt-4 flex items-center gap-4">
        <span className="font-display text-4xl text-charcoal">{bride.initial}</span>
        <span className="font-accent italic text-xl text-gold">&amp;</span>
        <span className="font-display text-4xl text-charcoal">{groom.initial}</span>
      </div>

      <h2 className="mt-3 font-display text-2xl text-charcoal">
        {bride.shortName} &amp; {groom.shortName}
      </h2>

      <p className="mt-16 font-body text-[10px] uppercase tracking-[0.3em] text-charcoal-soft/50">
        Dibuat dengan cinta
      </p>
    </section>
  );
}
