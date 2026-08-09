import { Divider } from "./Divider";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={cn("flex flex-col gap-4", isCenter ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && (
        <span className={cn("font-accent italic text-sm tracking-[0.2em]", invert ? "text-gold-light" : "text-gold")}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn("font-display text-3xl sm:text-4xl text-balance", invert ? "text-ivory" : "text-charcoal")}>
        {title}
      </h2>
      {isCenter && <Divider className="mt-1" />}
      {description && (
        <p
          className={cn(
            "font-body text-[15px] leading-relaxed max-w-md",
            invert ? "text-ivory/70" : "text-charcoal-soft",
            isCenter && "text-center"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
