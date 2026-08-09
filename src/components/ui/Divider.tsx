import { cn } from "../../lib/utils";

interface DividerProps {
  withMark?: boolean;
  className?: string;
}

/** Thin decorative divider used between and within sections. */
export function Divider({ withMark = true, className }: DividerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3 w-full", className)}>
      <span className="h-px flex-1 max-w-24 bg-beige-dark/70" />
      {withMark && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z"
            fill="currentColor"
            className="text-gold"
          />
        </svg>
      )}
      <span className="h-px flex-1 max-w-24 bg-beige-dark/70" />
    </div>
  );
}
