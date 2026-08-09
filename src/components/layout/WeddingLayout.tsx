import type { ReactNode } from "react";

interface WeddingLayoutProps {
  children: ReactNode;
}

/** Outer frame for the invitation: keeps the reading column centered and the background consistent. */
export function WeddingLayout({ children }: WeddingLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-ivory">
      <div className="relative mx-auto w-full overflow-hidden shadow-none sm:shadow-soft">
        {children}
      </div>
    </div>
  );
}
