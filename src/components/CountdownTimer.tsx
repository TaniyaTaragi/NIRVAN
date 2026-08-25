import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

const EVENT_START = new Date('2026-10-12T09:00:00+05:30').getTime();
const getRemaining = () => Math.max(0, EVENT_START - Date.now());
const format = (value: number) => String(value).padStart(2, '0');

export const CountdownTimer: React.FC = () => {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div aria-label="Countdown to NIRVAN 2026" className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/70 backdrop-blur-md px-3 py-2 shadow-sm">
      <Timer className="w-3.5 h-3.5 text-zinc-700" aria-hidden="true" />
      <span className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-600">Launch countdown</span>
      <span className="text-xs font-mono-code font-bold text-zinc-900 tabular-nums">{days}D {format(hours)}:{format(minutes)}:{format(seconds)}</span>
    </div>
  );
};
