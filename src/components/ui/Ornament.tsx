import { cn } from "../../lib/utils";

/**
 * The signature visual device of this invitation: a slender line-art
 * "gapura" arch — echoing the ceremonial gateway of a Javanese/Sulawesi
 * wedding reception — used to frame the cover, hero and closing moments.
 * Rendered purely in linework so it stays quiet next to photography.
 */
export function ArchOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("text-gold", className)}
    >
      <path
        d="M20 420V160C20 78 84 12 160 12C236 12 300 78 300 160V420"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M46 420V162C46 92 97 36 160 36C223 36 274 92 274 162V420"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.55"
      />
      {/* base sprigs */}
      <path
        d="M20 420C20 400 8 392 0 388M300 420C300 400 312 392 320 388"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* apex flourish */}
      <circle cx="160" cy="12" r="3" fill="currentColor" />
      <path
        d="M160 12C150 2 140 -2 128 0M160 12C170 2 180 -2 192 0"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Small botanical sprig used as a standalone accent (timeline nodes, list markers). */
export function SprigOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("text-moss-soft", className)}
    >
      <path d="M20 38V10" stroke="currentColor" strokeWidth="1" />
      <path d="M20 24C20 24 10 22 8 12C8 12 18 12 20 24Z" stroke="currentColor" strokeWidth="1" />
      <path d="M20 18C20 18 30 16 32 6C32 6 22 6 20 18Z" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="8" r="2.4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Thin corner bracket used to frame photographic blocks. */
export function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("text-gold", className)}
    >
      <path d="M2 22V10C2 5.6 5.6 2 10 2H22" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="2" cy="34" r="1.4" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
