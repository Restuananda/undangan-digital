import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import type { GalleryImage } from '../types/wedding';

interface Props {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export default function ImageViewer({ images, index, onClose, onChangeIndex }: Props) {
  const image = images[index];

  const go = useCallback(
    (delta: number) => {
      const next = (index + delta + images.length) % images.length;
      onChangeIndex(next);
    },
    [index, images.length, onChangeIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        className="fixed inset-0 z-50 flex flex-col bg-espresso"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex items-center justify-between px-5 pt-4"
          style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}
        >
          <span className="font-sans text-[11px] tracking-widest2 text-cream/70">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition-colors hover:text-cream"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={image.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="photo-placeholder h-full max-h-[70vh] w-full max-w-full rounded-sm"
              style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              data-label={image.alt}
            />
          </AnimatePresence>
        </div>

        <p className="px-6 pb-8 text-center font-sans text-[11px] tracking-wide text-cream/50" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
          Swipe to continue
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
