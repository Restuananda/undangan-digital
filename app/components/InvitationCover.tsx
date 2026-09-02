"use client";

import { weddingConfig } from "@/lib/config";
import { RingsMonogram, SprigDivider } from "./Ornaments";
import Image from "next/image";

interface InvitationCoverProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export default function InvitationCover({ guestName, isOpen, onOpen }: InvitationCoverProps) {
  return (
    <section
      aria-hidden={isOpen}
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden transition-[opacity,visibility] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        visibility: isOpen ? "hidden" : "visible",
        background: "radial-gradient(120% 90% at 50% 0%, #4a3b30 0%, #2e241d 55%, #221b16 100%)",
      }}
    >
      {/* Fine radiating linework stands in for a hero photograph */}
      {/* <div
        className={`pointer-events-none absolute left-1/2 top-[38%] h-[140vw] w-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] transition-transform duration-[1800ms] ease-out ${
          isOpen ? "scale-110 rotate-6" : "scale-100"
        }`}
        style={{
          backgroundImage:
            "repeating-conic-gradient(from 0deg, var(--color-gold-soft) 0deg 0.4deg, transparent 0.4deg 6deg)",
          borderRadius: "9999px",
        }}
      /> */}

      <Image
        src="/images/background.webp"
        width={720}
        height={405}
        priority
        // quality={100}
        alt=""
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out ${
          isOpen ? "scale-110 rotate-6" : "scale-100"
        }`}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-between px-6 pb-10 pt-16 sm:px-10 sm:pb-14">
        <p
          className="eyebrow animate-fade-in text-center text-[color:var(--color-champagne)]"
          style={{ animationDelay: "300ms", opacity: 0 }}
        >
          Undangan Pernikahan
        </p>

        <div className="flex flex-col items-center gap-7 text-center">
          <RingsMonogram
            className="animate-fade-up h-10 w-16 text-[color:var(--color-gold-soft)]/80 sm:h-12 sm:w-20"
            strokeWidth={1}
          />
          <h1
            className="animate-fade-up font-[family-name:var(--font-display)] text-[15vw] italic leading-[0.95] text-[color:var(--color-black)] sm:text-[9vw] md:text-[7rem]"
            style={{ animationDelay: "500ms", opacity: 0 }}
          >
            {weddingConfig.coupleNames.groom}
            <span className="mx-2 not-italic text-[color:var(--color-gold-soft)] sm:mx-4">&amp;</span>
            {weddingConfig.coupleNames.bride}
          </h1>

          <div
            className="animate-fade-up flex items-center gap-4 text-[color:var(--color-black)]"
            style={{ animationDelay: "800ms", opacity: 0 }}
          >
            <span className="h-px w-8 bg-current opacity-50" />
            <p className="font-[family-name:var(--font-body)] text-sm tracking-[0.35em]">
              {weddingConfig.weddingDateDisplay}
            </p>
            <span className="h-px w-8 bg-current opacity-50" />
          </div>
        </div>

        <div
          className="animate-fade-up flex flex-col items-center gap-8"
          style={{ animationDelay: "1050ms", opacity: 0 }}
        >
          <p className="max-w-[22ch] text-center font-[family-name:var(--font-body)] text-xs leading-relaxed tracking-[0.08em] text-[color:var(--color-black)]/80">
            {weddingConfig.invitationHeadline}
            {guestName ? (
              <>
                <br />
                Kepada Yth. {guestName}
              </>
            ) : null}
          </p>

          <button
            type="button"
            onClick={onOpen}
            className="focus-ring group relative flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--color-gold-soft)]/70 text-[color:var(--color-black)] transition-transform duration-500 hover:scale-105 active:scale-95"
            aria-label="Buka undangan"
          >
            <span className="absolute inset-0 rounded-full border border-[color:var(--color-gold-soft)]/30 transition-transform duration-700 group-hover:scale-110" />
            <span className="font-[family-name:var(--font-display)] text-[0.6rem] italic tracking-[0.2em]">
              Buka
            </span>
          </button>
          <span className="eyebrow text-[color:var(--color-black)]/70">Ketuk untuk membuka</span>
        </div>
      </div>

      <SprigDivider className="mx-auto mb-4 h-4 w-32 text-[color:var(--color-gold-soft)]/40" />
    </section>
  );
}
