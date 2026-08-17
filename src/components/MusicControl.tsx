import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { wedding } from '../data/wedding';

interface Props {
  autoStart?: boolean;
}

export default function MusicControl({ autoStart = false }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoStart) {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [autoStart]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={wedding.music.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? `Pause ${wedding.music.title}` : `Play ${wedding.music.title}`}
        className="fixed right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-espresso/10 bg-cream/90 text-espresso shadow-[0_2px_14px_rgba(42,37,31,0.08)] backdrop-blur-md transition-transform duration-300 active:scale-90"
        style={{ bottom: 'calc(96px + env(safe-area-inset-bottom))' }}
      >
        <span className={isPlaying ? 'animate-pulse' : ''}>
          {isPlaying ? <Pause size={15} strokeWidth={1.6} /> : <Play size={15} strokeWidth={1.6} />}
        </span>
      </button>
    </>
  );
}
