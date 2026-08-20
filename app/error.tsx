"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[wedding-invitation] unhandled error", error);
  }, [error]);

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center px-8 py-16 text-center"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #4a3b30 0%, #2e241d 55%, #221b16 100%)" }}
    >
      <h1 className="font-[family-name:var(--font-display,serif)] text-3xl italic text-[#f8f4ec]">
        Terjadi Kesalahan
      </h1>
      <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-[#e7dbc4]">
        Maaf, terjadi kendala saat memuat halaman ini. Silakan coba muat ulang, atau hubungi kami jika masalah
        berlanjut.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 flex h-12 items-center justify-center border border-[#c9b493]/60 px-7 text-xs tracking-[0.2em] text-[#f8f4ec] transition-colors hover:bg-[#c9b493]/10"
      >
        MUAT ULANG
      </button>
    </div>
  );
}
