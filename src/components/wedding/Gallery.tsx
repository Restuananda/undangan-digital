import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { weddingData } from "../../data/wedding";
import { cn } from "../../lib/utils";

const spanClasses: Record<string, string> = {
  portrait: "row-span-2",
  landscape: "col-span-2",
  square: "",
};

export function Gallery() {
  const images = weddingData.gallery;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <Section tone="ivory">
      <SectionHeading eyebrow="Momen Kami" title="Galeri Foto" />

      <div className="mt-12 grid auto-rows-[110px] grid-cols-3 gap-2 [grid-auto-flow:dense] sm:auto-rows-[140px] sm:gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative overflow-hidden bg-cream focus-visible:z-10",
              spanClasses[image.aspect]
            )}
            aria-label={`Buka foto: ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/20" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal/95 px-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau galeri foto"
        >
          <button
            onClick={close}
            aria-label="Tutup galeri"
            className="absolute right-5 top-5 text-ivory/80 hover:text-ivory cursor-pointer"
          >
            <X size={26} strokeWidth={1.4} />
          </button>

          <button
            onClick={showPrev}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-ivory/70 hover:text-ivory cursor-pointer sm:left-6"
          >
            <ChevronLeft size={30} strokeWidth={1.3} />
          </button>

          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="max-h-[78vh] max-w-full object-contain animate-scale-in"
          />

          <button
            onClick={showNext}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-ivory/70 hover:text-ivory cursor-pointer sm:right-6"
          >
            <ChevronRight size={30} strokeWidth={1.3} />
          </button>

          <span className="mt-4 font-body text-xs tracking-widest text-ivory/60">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </Section>
  );
}
