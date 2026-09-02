/**
 * A small library of hairline SVG ornaments used in place of photography.
 * The couple has no photos to give us yet, so the invitation's visual
 * identity leans fully on typography, a restrained palette, and this single
 * recurring motif — a linked double ring, drawn once and reused at
 * different scales — rather than on imagery.
 */

export function RingsMonogram({ className = "", strokeWidth = 1.1 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      <circle cx="46" cy="40" r="26" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="74" cy="40" r="26" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function SprigDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" fill="none" className={className} aria-hidden="true">
      <path d="M0 20 H80" stroke="currentColor" strokeWidth="0.75" />
      <path d="M120 20 H200" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M100 20 C96 12 88 8 82 10 C88 13 92 17 94 22 C88 20 81 21 77 26 C84 25 91 27 95 32 C97 26 100 22 100 20 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      <path
        d="M100 20 C104 12 112 8 118 10 C112 13 108 17 106 22 C112 20 119 21 123 26 C116 25 109 27 105 32 C103 26 100 22 100 20 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      <circle cx="100" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}

export function CornerFrame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path d="M2 24 V2 H24" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function PetalMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="40"
          cy="24"
          rx="7"
          ry="16"
          stroke="currentColor"
          strokeWidth="0.8"
          transform={`rotate(${deg} 40 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}

/**
 * A soft laurel flourish — two mirrored sprigs curving inward — used above
 * a heading as a small wedding-styled flourish in place of imagery.
 */
export function LaurelWreath({ className = "" }: { className?: string }) {
  const branch = (
    <>
      <path d="M60 4 C40 8 24 20 16 40" stroke="currentColor" strokeWidth="1" fill="none" />
      {[8, 16, 24, 32].map((t) => (
        <path
          key={t}
          d={`M${60 - t * 1.1} ${4 + t * 0.9} q-8 -2 -12 4`}
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
      ))}
    </>
  );
  return (
    <svg viewBox="0 0 120 44" fill="none" className={className} aria-hidden="true">
      <g>{branch}</g>
      <g transform="translate(120,0) scale(-1,1)">{branch}</g>
    </svg>
  );
}

/**
 * The invitation's recurring "wedding arch" motif — the rounded altar-arch
 * silhouette that gives every section its own marked-off background,
 * rendered filled with that section's own color so it appears to rise up
 * out of the section above it. Place as the first child of a
 * `position: relative` section.
 */
export function ArchTransition({ fill, className = "" }: { fill: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 h-8 -translate-y-[calc(100%-1px)] overflow-hidden sm:h-12 ${className}`}
    >
      <svg viewBox="0 0 400 56" preserveAspectRatio="none" className="h-full w-full">
        <path d="M0 56 V30 Q200 -26 400 30 V56 Z" fill={fill} />
      </svg>
    </div>
  );
}
