import { useCountdown } from '../lib/useCountdown';

interface Props {
  targetISO: string;
  tone?: 'light' | 'dark';
}

const UNITS: { key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function Countdown({ targetISO, tone = 'dark' }: Props) {
  const parts = useCountdown(targetISO);
  const numColor = tone === 'dark' ? 'text-espresso' : 'text-cream';
  const labelColor = tone === 'dark' ? 'text-stone' : 'text-cream/60';
  const dividerColor = tone === 'dark' ? 'bg-espresso/10' : 'bg-cream/20';

  if (parts.isPast) {
    return (
      <p className={`serif-display text-center text-xl italic ${numColor}`}>
        Together, at last.
      </p>
    );
  }

  return (
    <div className="flex items-start justify-center gap-4 sm:gap-6">
      {UNITS.map((u, i) => (
        <div key={u.key} className="flex items-start gap-4 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className={`serif-display text-[34px] leading-none tabular-nums ${numColor}`}>
              {String(parts[u.key]).padStart(2, '0')}
            </span>
            <span className={`mt-2 font-sans text-[9px] uppercase tracking-widest2 ${labelColor}`}>
              {u.label}
            </span>
          </div>
          {i < UNITS.length - 1 && <span className={`mt-2 h-8 w-px ${dividerColor}`} aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
