import { weddingConfig } from "@/lib/config";
import Reveal from "./Reveal";
import { PetalMark, ArchTransition } from "./Ornaments";

function Person({
  initial,
  name,
  parents,
  bio,
  align,
}: {
  initial: string;
  name: string;
  parents: string;
  bio: string;
  align: "left" | "right";
}) {
  return (
    <div className={`flex flex-col ${align === "right" ? "sm:items-end sm:text-right" : "items-start"}`}>
      <Reveal>
        {/* The wedding-arch silhouette stands in for a photo frame */}
        <div className="wedding-arch relative flex h-[42vh] w-[78vw] max-w-[320px] flex-col items-center justify-center border border-[color:var(--color-gold)]/30 bg-[color:var(--color-ivory)] pt-8 sm:h-[48vh] sm:w-[30vw]">
          <PetalMark className="absolute top-[38%] h-24 w-24 text-[color:var(--color-gold)]/12 sm:h-32 sm:w-32" />
          <span className="relative font-[family-name:var(--font-display)] text-8xl italic text-[color:var(--color-gold)] sm:text-9xl">
            {initial}
          </span>
          <span className="wedding-arch absolute inset-3 border border-[color:var(--color-gold)]/25" />
        </div>
      </Reveal>
      <Reveal delay={150} className="mt-6 max-w-[30ch]">
        <h3 className="font-[family-name:var(--font-display)] text-3xl italic text-[color:var(--color-bark)]">
          {name}
        </h3>
        <p className="mt-2 text-xs tracking-wide text-[color:var(--color-taupe-dark)]">{parents}</p>
        <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-taupe-dark)]">
          {bio}
        </p>
      </Reveal>
    </div>
  );
}

export default function CoupleIntroduction() {
  const { groom, bride } = weddingConfig.coupleIntro;
  return (
    <section className="relative bg-[color:var(--color-champagne)] px-6 py-28 sm:px-14 lg:px-20">
      <ArchTransition fill="var(--color-champagne)" />
      <Reveal>
        <p className="eyebrow text-center">Mempelai</p>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-2xl italic text-[color:var(--color-taupe-dark)] sm:text-3xl">
          {weddingConfig.coupleNames.display}
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col items-center gap-20 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <Person initial={groom.initial} name={groom.name} parents={groom.parents} bio={groom.bio} align="left" />
        <div className="hidden self-stretch sm:block">
          <div className="mx-auto h-full w-px bg-[color:var(--color-taupe)]/40" />
        </div>
        <Person initial={bride.initial} name={bride.name} parents={bride.parents} bio={bride.bio} align="right" />
      </div>
    </section>
  );
}
