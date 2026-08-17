import { motion } from 'framer-motion';
import { wedding } from '../data/wedding';

interface Props {
  guestLabel: string;
  onOpen: () => void;
}

export default function InvitationCover({ guestLabel, onOpen }: Props) {
  return (
    <motion.div
      className="grain relative flex min-h-[100dvh] min-h-[100svh] flex-col items-center justify-between overflow-hidden bg-espresso px-8 py-14 text-cream"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div
        className="photo-placeholder absolute inset-0 opacity-30"
        style={{ backgroundImage: `url(${wedding.hero.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-espresso/70" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-cream/60"
        >
          The Wedding Of
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="serif-display mt-4 text-[52px] italic leading-none"
        >
          {wedding.cover.monogram}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-5 font-sans text-[13px] tracking-widest2 text-cream/70"
        >
          {wedding.weddingDateLabel}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full flex-col items-center gap-6"
      >
        <p className="font-sans text-[12px] tracking-wide text-cream/60">Dear {guestLabel},</p>
        <button
          type="button"
          onClick={onOpen}
          className="group flex items-center gap-3 border border-cream/30 px-8 py-3.5 font-sans text-[11px] uppercase tracking-widest2 text-cream transition-all duration-500 hover:border-cream/70 active:scale-95"
        >
          Open Invitation
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
