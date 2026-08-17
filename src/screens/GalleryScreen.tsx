import { useState } from 'react';
import { wedding } from '../data/wedding';
import ImageViewer from '../components/ImageViewer';

export default function GalleryScreen() {
  const images = wedding.gallery;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pb-nav">
      <header className="px-7 pt-8">
        <p className="eyebrow">Gallery</p>
        <h2 className="serif-display mt-1 text-3xl italic text-espresso">Moments</h2>
      </header>

      <div className="mt-7 grid auto-rows-[150px] grid-cols-2 gap-1.5 px-1.5">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`photo-placeholder relative overflow-hidden ${
              img.span === 'wide' ? 'col-span-2 row-span-2' : img.span === 'tall' ? 'row-span-2' : ''
            }`}
            style={{ backgroundImage: `url(${img.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            data-label={img.alt}
            aria-label={`Open photo: ${img.alt}`}
          >
            <span className="absolute inset-0 bg-espresso/0 transition-colors duration-300 active:bg-espresso/10" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <ImageViewer
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChangeIndex={setOpenIndex}
        />
      )}
    </div>
  );
}
