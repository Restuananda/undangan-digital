import { weddingConfig } from "@/lib/config";
import Reveal from "./Reveal";
import Image from "next/image";

export default function GuestGreeting({ guestName }: { guestName: string }) {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center bg-[color:var(--color-ivory)] px-8 py-24 text-center sm:px-16">
      <Image
        src="/images/background2.webp"
        width={720}
        height={405}
        priority
        // quality={100}
        alt=""
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out `}
          
      />
      <Reveal>
        <p className="eyebrow mb-8">Kepada Yth.</p>
      </Reveal>
      <Reveal delay={150}>
        <h2 className="font-[family-name:var(--font-display)] text-2xl italic leading-tight text-[color:var(--color-bark)] sm:text-6xl">
          {guestName}
        </h2>
      </Reveal>
      <Reveal delay={300}>
        <div className="my-10 h-px w-16 bg-[color:var(--color-gold)]/60" />
      </Reveal>
      <Reveal delay={400}>
        <p className="max-w-[38ch] font-[family-name:var(--font-body)] text-[0.95rem] leading-[1.9] text-[color:var(--color-taupe-dark)] sm:text-base">
          {weddingConfig.greetingMessage}
        </p>
      </Reveal>
      
      <Reveal delay={550}>
        <p className="mt-10 font-[family-name:var(--font-display)] text-4xl italic text-[color:var(--color-gold)]">
          {weddingConfig.coupleNames.display}
        </p>
      </Reveal>
    </section>
  );
}
