import type { Person } from "../../types/wedding";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CornerOrnament } from "../ui/Ornament";
import { weddingData } from "../../data/wedding";

function PersonPortrait({ person, childLabel }: { person: Person; childLabel: "Putri" | "Putra" }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden bg-cream">
        <img
          src={person.photo}
          alt={`Potret ${person.fullName}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <CornerOrnament className="absolute -left-1 -top-1 h-8 w-8" />
        <CornerOrnament className="absolute -right-1 -bottom-1 h-8 w-8 rotate-180" />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-display text-2xl text-charcoal">{person.fullName}</h3>
        <p className="font-body text-[13px] leading-relaxed text-charcoal-soft">
          {childLabel} dari
          <br />
          {person.parents.father}
          <br />
          &amp; {person.parents.mother}
        </p>
      </div>
    </div>
  );
}

export function CoupleSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <Section tone="cream">
      <SectionHeading
        eyebrow="Mempelai"
        title="Kedua Mempelai"
        description="Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir dan memberikan doa restu."
      />

      <div className="mt-14 flex flex-col items-center gap-16 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
        <PersonPortrait person={bride} childLabel="Putri" />
        <span className="font-accent italic text-3xl text-gold sm:mt-24">&amp;</span>
        <PersonPortrait person={groom} childLabel="Putra" />
      </div>
    </Section>
  );
}
