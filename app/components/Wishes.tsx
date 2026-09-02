import Reveal from "./Reveal";
import { ArchTransition } from "./Ornaments";
import { rsvpRepository } from "@/lib/rsvp-repository";

interface Wish {
  name: string;
  message: string;
}

const SEED_WISHES: Wish[] = [
  { name: "Andi & Sarah", message: "Selamat untuk kalian berdua. Semoga selalu bahagia sepanjang usia." },
  { name: "Dewi Lestari", message: "Turut berbahagia untuk kalian berdua — semoga rumah tangga selalu dipenuhi tawa." },
];

export default async function Wishes() {
  // Goes through the same storage abstraction as the RSVP API route — never
  // reads rsvp.json directly, so this stays correct whether the active
  // backend is the local JSON file or Redis in production.
  const submitted = await rsvpRepository.listRecentWithMessages(12);
  const wishes: Wish[] = submitted.length > 0 ? submitted.map((r) => ({ name: r.guestName, message: r.message })) : SEED_WISHES;

  return (
    <section id="wishes" className="relative bg-[color:var(--color-champagne)] px-6 py-28 sm:px-14">
      <ArchTransition fill="var(--color-champagne)" />
      <Reveal>
        <p className="eyebrow text-center">Buku Tamu</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mx-auto mt-4 max-w-[22ch] text-center font-[family-name:var(--font-display)] text-3xl italic text-[color:var(--color-bark)] sm:text-4xl">
          Ucapan dari para tamu
        </h2>
      </Reveal>
      <Reveal delay={180}>
        <p className="mx-auto mt-5 max-w-[36ch] text-center font-[family-name:var(--font-body)] text-xs text-[color:var(--color-taupe)]">
          Ucapan dikumpulkan bersamaan dengan konfirmasi kehadiran Anda di bawah.
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
            KIRIM UCAPAN ANDA
          </a>
        </div>
      </Reveal>
    </section>
  );
}
