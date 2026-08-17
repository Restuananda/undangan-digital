import { wedding } from '../data/wedding';
import Countdown from '../components/Countdown';

interface Props {
  guestLabel: string;
}

export default function HomeScreen({ guestLabel }: Props) {
  return (
    <div className="pb-nav">
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
        <div
          className="photo-placeholder absolute inset-0"
          style={{ backgroundImage: `url(${wedding.hero.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          data-label="Hero photograph"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent" />
        <div
          className="absolute inset-x-0 bottom-0 px-7 pb-8 text-cream"
          style={{ paddingBottom: '2rem' }}
        >
          <p className="eyebrow text-cream/70">The Wedding Of</p>
          <h1 className="serif-display mt-2 text-[44px] italic leading-[0.95]">
            {wedding.couple.groom}
            <span className="mx-2 not-italic text-cream/50">&amp;</span>
            {wedding.couple.bride}
          </h1>
          <p className="mt-3 font-sans text-[12px] tracking-widest2 text-cream/70">
            {wedding.weddingDateLabel}
          </p>
        </div>
      </section>

      <section className="px-7 pt-9">
        <p className="eyebrow">Dear</p>
        <p className="serif-display mt-1 text-2xl text-espresso">{guestLabel}</p>
        <p className="mt-4 max-w-[38ch] font-sans text-[14.5px] leading-relaxed text-charcoal/75">
          {wedding.hero.invitationMessage}
        </p>
      </section>

      <section className="mt-11 border-y border-espresso/10 px-6 py-8">
        <p className="eyebrow mb-6 text-center">Counting Down</p>
        <Countdown targetISO={wedding.weddingDateISO} />
      </section>

      <section className="px-7 py-10 text-center">
        <p className="serif-display text-lg italic text-charcoal/80">
          &ldquo;Two souls, one heart, forever intertwined.&rdquo;
        </p>
      </section>
    </div>
  );
}
