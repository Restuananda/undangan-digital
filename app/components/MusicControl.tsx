"use client";

import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/config";

/**
 * The invitation's single floating control. It sits where a hamburger menu
 * would normally live, but this invitation is one continuous scroll rather
 * than a multi-page site — so instead it automates the background music:
 * playing gently the moment the invitation opens, and toggling on tap.
 */
export default function MusicControl({ enabled }: { enabled: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Once the invitation is opened, gently start the music — a deliberate
    // gesture tied to the guest's own "Open Invitation" tap, not an
    // autoplay before any interaction has happened.
    if (enabled && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [enabled]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.music.src} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Hentikan musik latar" : "Putar musik latar"}
        aria-pressed={playing}
        className={`focus-ring fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--color-gold-soft)]/70 bg-[color:var(--color-ivory)]/90 shadow-[0_4px_20px_rgba(58,46,38,0.14)] backdrop-blur transition-opacity duration-700 ${
          enabled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {playing ? (
          <span className="relative flex h-4 w-4 items-end justify-center gap-[3px]" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-[color:var(--color-gold)]"
                style={{
                  height: "100%",
                  animation: `music-bar 900ms ease-in-out ${i * 140}ms infinite alternate`,
                }}
              />
            ))}
          </span>
        ) : (
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[color:var(--color-gold)]"
          >
            <path d="M3 2.5L14 8L3 13.5V2.5Z" fill="currentColor" />
          </svg>
        )}
        <style>{`
          @keyframes music-bar {
            from { transform: scaleY(0.4); }
            to { transform: scaleY(1); }
          }
        `}</style>
      </button>
    </>
  );
}
