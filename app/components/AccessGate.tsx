"use client";

import { useState } from "react";
import { RSVPRecord } from "@/types/wedding";
import { weddingConfig } from "@/lib/config";
import InvitationExperience from "./InvitationExperience";
import { RingsMonogram } from "./Ornaments";

interface AccessGateProps {
  wishesSection: React.ReactNode;
}

type Status = "idle" | "checking" | "denied";

export default function AccessGate({ wishesSection }: AccessGateProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [guest, setGuest] = useState<{ id: string; name: string } | null>(null);
  const [existingRecord, setExistingRecord] = useState<RSVPRecord | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || status === "checking") return;

    setStatus("checking");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/guest-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (data.success && data.guest) {
        setGuest(data.guest);
        setExistingRecord(data.existingRecord ?? null);
      } else {
        setStatus("denied");
        setErrorMessage(data.message ?? "Nama tidak ditemukan pada daftar tamu.");
      }
    } catch {
      setStatus("denied");
      setErrorMessage("Tidak dapat terhubung ke server. Periksa koneksi Anda dan coba lagi.");
    }
  }

  if (guest) {
    return (
      <InvitationExperience
        guestId={guest.id}
        guestName={guest.name}
        initialRecord={existingRecord}
        wishesSection={wishesSection}
      />
    );
  }

  return (
    <div
      className="grain flex min-h-dvh flex-col items-center justify-center px-8 py-16 text-center"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #4a3b30 0%, #2e241d 55%, #221b16 100%)" }}
    >
      <RingsMonogram className="h-9 w-14 text-[color:var(--color-gold-soft)]/80" strokeWidth={1} />

      <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl italic text-[color:var(--color-ivory)] sm:text-5xl">
        {weddingConfig.coupleNames.display}
      </h1>
      <p className="mt-3 font-[family-name:var(--font-body)] text-xs tracking-[0.3em] text-[color:var(--color-champagne)]/70">
        {weddingConfig.weddingDateDisplay}
      </p>

      <p className="mt-10 max-w-[32ch] font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-champagne)]/85">
        Undangan ini khusus untuk tamu kami. Silakan masukkan nama Anda persis seperti yang tertera pada
        undangan untuk melanjutkan.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-xs flex-col items-center gap-4">
        <label htmlFor="guest-name" className="sr-only">
          Nama Anda
        </label>
        <input
          id="guest-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (status === "denied") setStatus("idle");
          }}
          placeholder="Nama lengkap Anda"
          autoComplete="name"
          className="focus-ring w-full border-b border-[color:var(--color-gold-soft)]/50 bg-transparent px-1 py-3 text-center font-[family-name:var(--font-display)] text-xl italic text-[color:var(--color-ivory)] placeholder:text-[color:var(--color-champagne)]/40"
        />

        {status === "denied" && errorMessage && (
          <p role="alert" className="max-w-[30ch] text-xs leading-relaxed text-[#e0a98f]">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={!name.trim() || status === "checking"}
          className="focus-ring mt-4 flex h-14 w-full items-center justify-center border border-[color:var(--color-gold-soft)]/60 text-xs tracking-[0.25em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-gold-soft)]/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "checking" ? "MEMERIKSA..." : "LIHAT UNDANGAN SAYA"}
        </button>
      </form>

      <p className="mt-10 max-w-[30ch] font-[family-name:var(--font-body)] text-[0.7rem] leading-relaxed text-[color:var(--color-champagne)]/50">
        Mengalami kendala? Hubungi kami di {weddingConfig.contact.email}
      </p>
    </div>
  );
}
