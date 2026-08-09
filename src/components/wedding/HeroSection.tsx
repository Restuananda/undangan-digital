import { weddingData } from "../../data/wedding";
import { formatLongDateID } from "../../lib/date";
import { Divider } from "../ui/Divider";
import { CornerOrnament } from "../ui/Ornament";

export function HeroSection() {
  const { bride, groom } = weddingData.couple;
  const dateLabel = formatLongDateID(weddingData.weddingDateISO);

  return (
    <div className="relative flex min-h-[92vh] w-full flex-col items-center justify-center overflow-hidden bg-ivory px-6 py-24 text-center">
      <span className="font-accent italic text-sm tracking-[0.3em] text-gold animate-fade-up">
        The Wedding Of
      </span>

      <div className="relative mt-6 flex items-center justify-center gap-6 sm:gap-10 animate-fade-up [animation-delay:120ms]">
        <span className="font-display text-6xl sm:text-7xl text-charcoal">{bride.initial}</span>
        <span className="font-accent italic text-3xl text-beige-dark">&amp;</span>
        <span className="font-display text-6xl sm:text-7xl text-charcoal">{groom.initial}</span>
      </div>

      <div className="relative mt-10 w-full max-w-xs animate-fade-up [animation-delay:240ms]">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden bg-cream">
          <img
            src={bride.photo}
            alt={`Potret ${bride.fullName} dan ${groom.fullName}`}
            className="h-full w-full object-cover grayscale-[15%] sepia-[8%]"
            loading="eager"
          />
          <div className="absolute inset-0 border border-ivory/40" aria-hidden="true" />
          <CornerOrnament className="absolute -left-1 -top-1 h-9 w-9" />
          <CornerOrnament className="absolute -right-1 -top-1 h-9 w-9 rotate-90" />
          <CornerOrnament className="absolute -bottom-1 -left-1 h-9 w-9 -rotate-90" />
          <CornerOrnament className="absolute -bottom-1 -right-1 h-9 w-9 rotate-180" />
        </div>
      </div>

      <h1 className="mt-10 font-display text-3xl sm:text-4xl text-charcoal animate-fade-up [animation-delay:320ms] text-balance">
        {bride.shortName} &amp; {groom.shortName}
      </h1>

      <Divider className="mt-6 max-w-[200px] animate-fade-up [animation-delay:380ms]" />

      <p className="mt-6 font-body text-sm tracking-wide text-charcoal-soft animate-fade-up [animation-delay:420ms]">
        {dateLabel}
      </p>
    </div>
  );
}
