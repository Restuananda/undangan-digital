import Reveal from "./Reveal";
import { ArchTransition } from "./Ornaments";

interface Wish {
  name: string;
  message: string;
}

async function getWishes(): Promise<Wish[]> {
  // Pull guests who left a message alongside their RSVP. Only name + message
  // are surfaced here — no contact details ever leave the server.
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const raw = await fs.readFile(path.join(process.cwd(), "public", "rsvp.json"), "utf-8");
    const records = JSON.parse(raw) as { guestName: string; message: string }[];
    return records
      .filter((r) => r.message && r.message.trim().length > 0)
      .slice(-12)
      .reverse()
      .map((r) => ({ name: r.guestName, message: r.message }));
  } catch {
    return [];
  }
}

const SEED_WISHES: Wish[] = [
  { name: "Andi & Sarah", message: "Congratulations to you both. Wishing you a lifetime of happiness." },
  { name: "Dewi Lestari", message: "So happy for you two — may your home always be full of laughter." },
];

export default async function Wishes() {
  const submitted = await getWishes();
  const wishes = submitted.length > 0 ? submitted : SEED_WISHES;

  return (
    <section id="wishes" className="relative bg-[color:var(--color-champagne)] px-6 py-28 sm:px-14">
      <ArchTransition fill="var(--color-champagne)" />
      <Reveal>
        <p className="eyebrow text-center">Guestbook</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mx-auto mt-4 max-w-[22ch] text-center font-[family-name:var(--font-display)] text-3xl italic text-[color:var(--color-bark)] sm:text-4xl">
          Words from those who&apos;ll be there
        </h2>
      </Reveal>
      <Reveal delay={180}>
        <p className="mx-auto mt-5 max-w-[36ch] text-center font-[family-name:var(--font-body)] text-xs text-[color:var(--color-taupe)]">
          Wishes are collected alongside your RSVP below.
        </p>
      </Reveal>

      <div className="mx-auto mt-16 max-w-2xl divide-y divide-[color:var(--color-taupe)]/25">
        {wishes.map((wish, i) => (
          <Reveal key={`${wish.name}-${i}`} delay={i * 70}>
            <blockquote className="py-8 first:pt-0">
              <p className="font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[color:var(--color-bark)]">
                &ldquo;{wish.message}&rdquo;
              </p>
              <cite className="mt-4 block text-xs not-italic tracking-[0.15em] text-[color:var(--color-gold)]">
                — {wish.name}
              </cite>
            </blockquote>
          </Reveal>
        ))}
      </div>

      <Reveal delay={260}>
        <div className="mt-14 text-center">
          <a
            href="#rsvp"
            className="focus-ring inline-flex h-12 items-center gap-2 border border-[color:var(--color-gold)]/60 px-7 text-xs tracking-[0.2em] text-[color:var(--color-gold)] transition-colors hover:bg-[color:var(--color-gold)]/10"
          >
            SEND YOUR WISHES
          </a>
        </div>
      </Reveal>
    </section>
  );
}
