import { weddingConfig } from "@/lib/config";
import Reveal from "./Reveal";
import { ArchTransition, RingsMonogram } from "./Ornaments";

export default function ClosingSection() {
  return (
    <section
      className="relative flex h-[92vh] flex-col items-center justify-center text-center"
      style={{ background: "radial-gradient(120% 90% at 50% 100%, #4a3b30 0%, #2e241d 55%, #221b16 100%)" }}
    >
      <ArchTransition fill="#4a3b30" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 0deg, var(--color-gold-soft) 0deg 0.4deg, transparent 0.4deg 6deg)",
            borderRadius: "9999px",
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        <Reveal>
          <RingsMonogram className="h-10 w-16 text-[color:var(--color-gold-soft)]/70" strokeWidth={1} />
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-[26ch] font-[family-name:var(--font-display)] text-2xl italic leading-relaxed text-[color:var(--color-ivory)] sm:text-3xl">
            Terima kasih telah menjadi bagian dari kisah kami.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="flex items-center gap-4 text-[color:var(--color-champagne)]">
            <span className="h-px w-8 bg-current opacity-50" />
            <p className="text-xs tracking-[0.3em]">{weddingConfig.weddingDateDisplay}</p>
            <span className="h-px w-8 bg-current opacity-50" />
          </div>
        </Reveal>
        <Reveal delay={340}>
          <h2 className="font-[family-name:var(--font-display)] text-5xl italic text-[color:var(--color-ivory)] sm:text-6xl">
            {weddingConfig.coupleNames.groom} <span className="text-[color:var(--color-gold-soft)]">&amp;</span>{" "}
            {weddingConfig.coupleNames.bride}
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
