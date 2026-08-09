import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/utils";

type SectionTone = "ivory" | "cream" | "charcoal";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  fullBleed?: boolean;
}

const toneClasses: Record<SectionTone, string> = {
  ivory: "bg-ivory text-charcoal",
  cream: "bg-cream text-charcoal",
  charcoal: "bg-charcoal text-ivory",
};

export function Section({
  id,
  tone = "ivory",
  children,
  className,
  innerClassName,
  fullBleed = false,
}: SectionProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative w-full py-20 sm:py-28 px-6 reveal",
        isInView && "is-visible",
        toneClasses[tone],
        className
      )}
    >
      <div
        className={cn(
          !fullBleed && "mx-auto w-full max-w-[480px] sm:max-w-2xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
