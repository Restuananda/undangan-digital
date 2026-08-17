import { useState } from 'react';
import { wedding } from '../data/wedding';

function GiftCard({ bank, accountNumber, accountName }: { bank: string; accountNumber: string; accountName: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <div className="border border-espresso/10 px-6 py-7 text-center">
      <p className="eyebrow">{bank}</p>
      <p className="serif-display mt-3 text-2xl tracking-wide text-espresso">{accountNumber}</p>
      <p className="mt-1 font-sans text-[12px] uppercase tracking-wide text-stone">{accountName}</p>
      <button
        type="button"
        onClick={copy}
        className="mt-5 inline-flex items-center gap-2 border border-espresso/20 px-6 py-2.5 font-sans text-[10.5px] uppercase tracking-widest2 text-espresso transition-colors duration-300 hover:border-espresso/50"
      >
        {copied ? 'Copied' : 'Copy Account Number'}
      </button>
    </div>
  );
}

export default function DetailsScreen() {
  const { dressCode, venueNotes, notes, contact, gift } = wedding.details;

  return (
    <div className="pb-nav">
      <header className="px-7 pt-8">
        <p className="eyebrow">Details</p>
        <h2 className="serif-display mt-1 text-3xl italic text-espresso">Good to know</h2>
      </header>

      <section className="mt-9 px-7">
        <p className="eyebrow">{dressCode.title}</p>
        <p className="mt-2 max-w-[36ch] font-sans text-[14px] leading-relaxed text-charcoal/75">
          {dressCode.description}
        </p>
        <div className="mt-4 flex gap-2.5">
          {dressCode.palette.map((hex) => (
            <span
              key={hex}
              className="h-7 w-7 rounded-full border border-espresso/10"
              style={{ backgroundColor: hex }}
              aria-hidden="true"
            />
          ))}
        </div>
      </section>

      <section className="mt-10 px-7">
        <p className="eyebrow">Venue Notes</p>
        <p className="mt-2 max-w-[36ch] font-sans text-[14px] leading-relaxed text-charcoal/75">
          {venueNotes}
        </p>
      </section>

      <section className="mt-10 px-7">
        <p className="eyebrow">Important Notes</p>
        <ul className="mt-3 space-y-2.5">
          {notes.map((n) => (
            <li key={n} className="flex gap-3 font-sans text-[14px] leading-relaxed text-charcoal/75">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {n}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 px-7">
        <p className="eyebrow">Contact</p>
        <ul className="mt-3 space-y-3">
          {contact.map((c) => (
            <li key={c.name} className="flex items-baseline justify-between border-b border-espresso/10 pb-3">
              <span className="font-sans text-[14px] text-charcoal">{c.name}</span>
              <a href={`tel:${c.phone}`} className="font-sans text-[13px] text-stone">
                {c.phone}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {gift.length > 0 && (
        <section className="mt-10 px-7">
          <p className="eyebrow text-center">A Little Gesture</p>
          <p className="mx-auto mt-2 max-w-[32ch] text-center font-sans text-[13px] leading-relaxed text-charcoal/70">
            For those who wish to send a wedding gift from afar.
          </p>
          <div className="mt-5 space-y-4">
            {gift.map((g) => (
              <GiftCard key={g.accountNumber} {...g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
