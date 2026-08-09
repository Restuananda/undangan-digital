import { useMemo } from "react";
import { MessageCircleHeart } from "lucide-react";
import type { WishEntry } from "../../types/wedding";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { RSVPForm } from "./RSVPForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { formatRelativeTime } from "../../lib/date";
import { seedWishes } from "../../data/wishes";

function WishCard({ wish }: { wish: WishEntry }) {
  return (
    <li className="border-b border-beige-dark/40 py-5 last:border-none">
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-base text-charcoal">{wish.name}</span>
        <span
          className={
            wish.attendance === "hadir"
              ? "font-body text-[10px] uppercase tracking-widest text-moss"
              : "font-body text-[10px] uppercase tracking-widest text-charcoal-soft/70"
          }
        >
          {wish.attendance === "hadir" ? "Hadir" : "Tidak Hadir"}
        </span>
      </div>
      <p className="mt-2 font-body text-[14px] leading-relaxed text-charcoal-soft">{wish.message}</p>
      <span className="mt-2 block font-body text-[11px] text-charcoal-soft/60">
        {formatRelativeTime(wish.createdAt)}
      </span>
    </li>
  );
}

export function Wishes() {
  const [userWishes, setUserWishes] = useLocalStorage<WishEntry[]>("wedding-wishes", []);

  const allWishes = useMemo(
    () => [...userWishes, ...seedWishes].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [userWishes]
  );

  const hadirCount = allWishes.filter((w) => w.attendance === "hadir").length;
  const tidakHadirCount = allWishes.filter((w) => w.attendance === "tidak-hadir").length;

  function handleNewWish(entry: WishEntry) {
    setUserWishes((prev) => [entry, ...prev]);
  }

  return (
    <Section tone="ivory">
      <SectionHeading
        eyebrow="Doa & Restu"
        title="Wishes"
        description="Berikan ucapan, harapan, dan doa kepada kedua mempelai."
      />

      <div className="mt-8 flex items-center justify-center gap-2 font-body text-[13px] text-charcoal-soft">
        <MessageCircleHeart size={16} strokeWidth={1.5} className="text-gold" />
        <span>{allWishes.length} Ucapan</span>
        <span className="text-beige-dark">·</span>
        <span>{hadirCount} Hadir</span>
        <span className="text-beige-dark">·</span>
        <span>{tidakHadirCount} Tidak Hadir</span>
      </div>

      <div className="mx-auto mt-10 max-w-md border border-beige-dark/50 bg-cream/50 px-6 py-8 sm:px-8">
        <RSVPForm onSubmit={handleNewWish} />
      </div>

      <ul className="mx-auto mt-10 max-w-md">
        {allWishes.map((wish) => (
          <WishCard key={wish.id} wish={wish} />
        ))}
      </ul>
    </Section>
  );
}
