import { weddingConfig } from "@/lib/config";
import Reveal from "./Reveal";
import { ArchTransition, SprigDivider } from "./Ornaments";

export default function Details() {
  return (
    <section id="details" className="relative bg-[color:var(--color-champagne)] px-6 py-28 sm:px-14">
      <ArchTransition fill="var(--color-champagne)" />
      <Reveal>
        <p className="eyebrow text-center">Informasi Penting</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mx-auto mt-4 max-w-[22ch] text-center font-[family-name:var(--font-display)] text-3xl italic text-[color:var(--color-bark)] sm:text-4xl">
          Beberapa hal yang perlu diketahui
        </h2>
      </Reveal>

      <Reveal delay={180}>
        <SprigDivider className="mx-auto mt-10 h-4 w-32 text-[color:var(--color-gold)]/50" />
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-3xl gap-x-10 gap-y-14 sm:grid-cols-2">
        {weddingConfig.details.map((detail, i) => (
          <Reveal key={detail.label} delay={i * 90}>
            <div className="text-center sm:text-left">
              <p className="eyebrow">{detail.label}</p>
              <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-taupe-dark)]">
                {detail.value}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
