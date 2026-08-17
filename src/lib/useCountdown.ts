import { useEffect, useState } from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeParts(targetISO: string): CountdownParts {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isPast: false };
}

export function useCountdown(targetISO: string): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => computeParts(targetISO));

  useEffect(() => {
    const id = window.setInterval(() => setParts(computeParts(targetISO)), 1000);
    return () => window.clearInterval(id);
  }, [targetISO]);

  return parts;
}
