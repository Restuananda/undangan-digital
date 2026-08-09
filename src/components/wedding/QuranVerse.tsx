import { Section } from "../layout/Section";
import { SprigOrnament } from "../ui/Ornament";
import { weddingData } from "../../data/wedding";

export function QuranVerse() {
  const { quote } = weddingData;

  return (
    <Section tone="charcoal" innerClassName="max-w-xl">
      <div className="flex flex-col items-center gap-8 text-center">
        <SprigOrnament className="h-10 w-10 text-beige-dark rotate-180" />

        {quote.arabic && (
          <p dir="rtl" lang="ar" className="font-display text-2xl sm:text-3xl leading-[1.9] text-cream">
            {quote.arabic}
          </p>
        )}

        <p className="font-accent italic text-lg sm:text-xl leading-relaxed text-ivory/90 text-balance">
          &ldquo;{quote.translation}&rdquo;
        </p>

        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-gold-light">
          {quote.reference}
        </span>
      </div>
    </Section>
  );
}
