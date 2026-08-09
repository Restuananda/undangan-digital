import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { IconButton } from "../ui/IconButton";
import { weddingData } from "../../data/wedding";

interface MusicPlayerProps {
  /** When this becomes true (invitation opened), the player attempts to start playback. */
  shouldStart: boolean;
}

export function MusicPlayer({ shouldStart }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!shouldStart || !audioRef.current) return;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay blocked by the browser — the guest can start it manually.
        setIsPlaying(false);
      });
  }, [shouldStart]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioRef} src={weddingData.audioSrc} loop preload="none" />
      <IconButton label={isPlaying ? "Jeda musik" : "Putar musik"} onClick={toggle}>
        <span
          className="flex items-center justify-center"
          style={isPlaying ? { animation: "disc-spin 6s linear infinite" } : undefined}
        >
          {isPlaying ? <Pause size={16} strokeWidth={1.5} /> : <Music size={16} strokeWidth={1.5} />}
        </span>
      </IconButton>
    </div>
  );
}
