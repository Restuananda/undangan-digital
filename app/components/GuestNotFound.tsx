import { weddingConfig } from "@/lib/config";
import { RingsMonogram } from "./Ornaments";

export default function GuestNotFound() {
  return (
    <div
      className="grain flex min-h-dvh flex-col items-center justify-center px-8 py-16 text-center"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #4a3b30 0%, #2e241d 55%, #221b16 100%)" }}
    >
      <RingsMonogram className="h-9 w-14 text-[color:var(--color-gold-soft)]/80" strokeWidth={1} />

      <h1 className="mt-8 font-[family-name:var(--font-display)] text-3xl italic text-[color:var(--color-ivory)] sm:text-4xl">
        {weddingConfig.coupleNames.display}
      </h1>

      <p className="mt-8 max-w-[34ch] font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--color-champagne)]/85">
        This invitation link isn&apos;t recognized. Please double-check the link you received, or reach out to
        the couple directly.
      </p>

      <p className="mt-8 font-[family-name:var(--font-body)] text-xs tracking-wide text-[color:var(--color-champagne)]/60">
        {weddingConfig.contact.email}
      </p>
    </div>
  );
}
