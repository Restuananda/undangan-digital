import type { LoveStoryItem } from "../../types/wedding";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { SprigOrnament } from "../ui/Ornament";
import { useInView } from "../../hooks/useInView";
import { weddingData } from "../../data/wedding";
import { cn } from "../../lib/utils";

function StoryRow({ item, isLast }: { item: LoveStoryItem; isLast: boolean }) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-700",
            isInView ? "border-gold bg-gold text-ivory" : "border-beige-dark text-charcoal-soft"
          )}
        >
          <span className="font-accent italic text-sm">{item.year}</span>
        </div>
        {!isLast && (
          <span className="mt-1 w-px flex-1 bg-beige-dark/60" aria-hidden="true" />
        )}
      </div>

      <div
        className={cn(
          "pb-12 pt-1 transition-all duration-700",
          isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        <h3 className="font-display text-xl text-charcoal">{item.title}</h3>
        <p className="mt-2 max-w-sm font-body text-[14px] leading-relaxed text-charcoal-soft">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function LoveStory() {
  return (
    <Section tone="cream">
      <SectionHeading eyebrow="Perjalanan Kami" title="Kisah Cinta Kami" />
      <div className="mt-4 flex justify-center">
        <SprigOrnament className="h-8 w-8" />
      </div>

      <div className="mt-10">
        {weddingData.loveStory.map((item, i) => (
          <StoryRow key={item.id} item={item} isLast={i === weddingData.loveStory.length - 1} />
        ))}
      </div>
    </Section>
  );
}
