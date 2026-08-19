import { weddingConfig } from "@/lib/config";
import Reveal from "./Reveal";
import { ArchTransition } from "./Ornaments";

export default function CoupleStory() {
  return (
    <section className="relative bg-[color:var(--color-paper)] px-6 py-28 sm:px-14 lg:px-24">
      <ArchTransition fill="var(--color-paper)" />
      <Reveal>
        <p className="eyebrow text-center">Our Story</p>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mx-auto mt-4 max-w-[24ch] text-center font-[family-name:var(--font-display)] text-3xl italic leading-tight text-[color:var(--color-bark)] sm:text-4xl">
          A few chapters before this one
        </h2>
      </Reveal>

      <div className="mx-auto mt-20 max-w-2xl">
        {weddingConfig.story.map((moment, i) => (
          <Reveal key={moment.year} delay={i * 80}>
            <div className="grid grid-cols-[3.2rem_1px_1fr] gap-x-6 sm:grid-cols-[4.5rem_1px_1fr] sm:gap-x-10">
              <span className="pt-1 font-[family-name:var(--font-display)] text-xl italic text-[color:var(--color-gold)] sm:text-2xl">
                {moment.year}
              </span>
              <span className="relative">
                <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[color:var(--color-gold)]" />
                <span className="mx-auto block h-full w-px bg-[color:var(--color-taupe)]/40" />
              </span>
              <div className={`pb-16 ${i === weddingConfig.story.length - 1 ? "pb-2" : ""}`}>
                <h3 className="font-[family-name:var(--font-display)] text-xl italic text-[color:var(--color-bark)] sm:text-2xl">
                  {moment.title}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-taupe-dark)]">
                  {moment.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
