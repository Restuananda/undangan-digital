import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '../data/wedding';
import Countdown from '../components/Countdown';

export default function EventScreen() {
  const [activeId, setActiveId] = useState(wedding.events[0].id);
  const session = wedding.events.find((e) => e.id === activeId)!;
  const [day, month, year] = new Date(session.date)
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    .split(' ');

  return (
    <div className="pb-nav">
      <header className="px-7 pt-8">
        <p className="eyebrow">The Celebration</p>
        <h2 className="serif-display mt-1 text-3xl italic text-espresso">Join us</h2>
      </header>

      <div className="mt-7 px-7">
        <div className="flex border-b border-espresso/10">
          {wedding.events.map((ev) => {
            const isActive = ev.id === activeId;
            return (
              <button
                key={ev.id}
                type="button"
                onClick={() => setActiveId(ev.id)}
                className="relative flex-1 pb-3.5 pt-1 text-center"
              >
                <span
                  className={`font-sans text-[11px] uppercase tracking-widest2 transition-colors duration-400 ${
                    isActive ? 'text-espresso' : 'text-stone'
                  }`}
                >
                  {ev.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="event-tab-indicator"
                    className="absolute inset-x-0 -bottom-px h-[2px] bg-gold"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={session.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="px-7 pt-10"
        >
          <p className="serif-display text-[15px] italic text-stone">{day}</p>
          <p className="serif-display text-4xl leading-none text-espresso">{month}</p>
          <p className="mt-1 font-sans text-[13px] tracking-wide text-stone">{year}</p>

          <div className="mt-8 h-px w-10 bg-gold" />

          <dl className="mt-8 space-y-6">
            <div>
              <dt className="eyebrow">Time</dt>
              <dd className="mt-1.5 font-sans text-[15px] text-charcoal">{session.timeLabel}</dd>
            </div>
            <div>
              <dt className="eyebrow">Venue</dt>
              <dd className="mt-1.5 serif-display text-xl text-charcoal">{session.venueName}</dd>
              <dd className="mt-1 max-w-[32ch] font-sans text-[13.5px] leading-relaxed text-charcoal/70">
                {session.address}
              </dd>
            </div>
          </dl>

          <a
            href={session.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 border border-espresso/20 px-7 py-3 font-sans text-[11px] uppercase tracking-widest2 text-espresso transition-colors duration-400 hover:border-espresso/50"
          >
            Open Map
          </a>

          <div className="mt-12 border-t border-espresso/10 pt-8">
            <p className="eyebrow mb-5">Time Remaining</p>
            <Countdown targetISO={session.date} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
