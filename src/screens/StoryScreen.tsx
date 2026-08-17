import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { wedding } from '../data/wedding';

export default function StoryScreen() {
  const chapters = wedding.story;
  const [index, setIndex] = useState(0);
  const chapter = chapters[index];

  const go = (delta: number) => {
    setIndex((prev) => Math.min(Math.max(prev + delta, 0), chapters.length - 1));
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) go(1);
    else if (info.offset.x > 50) go(-1);
  };

  return (
    <div className="pb-nav">
      <header className="px-7 pt-8">
        <p className="eyebrow">Our Story</p>
        <h2 className="serif-display mt-1 text-3xl italic text-espresso">A short history of us</h2>
      </header>

      <div className="relative mt-7 h-[64vh] min-h-[440px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.year}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="photo-placeholder absolute inset-0 mx-6 rounded-sm"
            style={{ backgroundImage: `url(${chapter.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            data-label={chapter.title}
          >
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/85 via-espresso/15 to-transparent p-7 text-cream">
              <span className="serif-display text-[64px] italic leading-none text-cream/90">
                {chapter.year}
              </span>
              <h3 className="serif-display mt-2 text-2xl">{chapter.title}</h3>
              <p className="mt-3 max-w-[34ch] font-sans text-[13.5px] leading-relaxed text-cream/80">
                {chapter.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between px-7">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous chapter"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-opacity disabled:opacity-25"
        >
          <ChevronLeft size={18} strokeWidth={1.4} />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Story chapters">
          {chapters.map((c, i) => (
            <button
              key={c.year}
              role="tab"
              aria-selected={i === index}
              aria-label={`Chapter ${i + 1}: ${c.year}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-quiet ${
                i === index ? 'w-6 bg-gold' : 'w-1.5 bg-espresso/15'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === chapters.length - 1}
          aria-label="Next chapter"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-opacity disabled:opacity-25"
        >
          <ChevronRight size={18} strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}
