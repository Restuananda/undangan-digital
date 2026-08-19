"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/config";
import Reveal from "./Reveal";
import { ArchTransition } from "./Ornaments";

export default function WeddingGift() {
  const { gift } = weddingConfig;
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(gift.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API unavailable — the number is still visible to copy manually.
    }
  }

  return (
    <section id="gift" className="relative bg-[color:var(--color-paper)] px-6 py-28 text-center sm:px-14">
      <ArchTransition fill="var(--color-paper)" />
      <Reveal>
        <p className="eyebrow">A Gift of Love</p>
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-6 max-w-[38ch] font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-taupe-dark)]">
          {gift.note}
        </p>
      </Reveal>

      <Reveal delay={220}>
        {/* Wedding-arch panel, matching the couple/venue treatment */}
        <div className="wedding-arch mx-auto mt-12 max-w-sm border border-[color:var(--color-taupe)]/35 bg-[color:var(--color-ivory)] px-8 pb-10 pt-12">
          <p className="eyebrow">{gift.bankName}</p>
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-[0.08em] text-[color:var(--color-bark)] sm:text-3xl">
            {gift.accountNumber}
          </p>
          <p className="mt-2 text-xs tracking-wide text-[color:var(--color-taupe-dark)]">
            {gift.accountHolder}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="focus-ring mt-8 inline-flex h-12 w-full items-center justify-center gap-2 border border-[color:var(--color-gold)]/60 text-xs tracking-[0.2em] text-[color:var(--color-gold)] transition-colors hover:bg-[color:var(--color-gold)]/10"
          >
            {copied ? "COPIED TO CLIPBOARD" : "COPY ACCOUNT NUMBER"}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
