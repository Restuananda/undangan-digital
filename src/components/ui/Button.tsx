import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "solid" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-charcoal text-ivory border border-charcoal hover:bg-transparent hover:text-charcoal",
  outline:
    "bg-transparent text-charcoal border border-gold hover:bg-gold hover:text-ivory",
  ghost:
    "bg-transparent text-charcoal border border-transparent hover:border-beige-dark",
};

export function Button({
  variant = "outline",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[11px] tracking-[0.28em] uppercase font-body font-semibold transition-colors duration-500 ease-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
