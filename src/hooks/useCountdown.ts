import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function computeCountdown(targetISO: string): CountdownValue {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isComplete: false };
}

/** Live countdown that recomputes every second from a target ISO date string. */
export function useCountdown(targetISO: string): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() => computeCountdown(targetISO));

  useEffect(() => {
    const tick = () => setValue(computeCountdown(targetISO));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetISO]);

  return value;
}
