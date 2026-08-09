import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
}

export function IconButton({ children, label, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center w-11 h-11 rounded-full border border-beige-dark/60 bg-ivory/90 text-charcoal hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-colors duration-300 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
