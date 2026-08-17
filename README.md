# Adrian & Clara — Digital Wedding Invitation

A premium, mobile-app-style digital wedding invitation built with
Vite, React, TypeScript, and Tailwind CSS. Navigation happens through
a persistent bottom bar between five screens — Home, Story, Event,
Gallery, Details — instead of one long scrolling page.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL on your phone (same Wi-Fi) or in a mobile
device toolbar in your browser's dev tools — the design targets
320px–430px phones and scales gracefully up to tablets.

## Guest personalization

Guests are resolved from `/public/guests.json` by URL slug:

```
/undangan/budi-santoso  →  "Dear Budi Santoso"
```

Add or edit guests in that file. Unknown or missing slugs fall back
to "Dear Guest".

## Customizing for your own wedding

Everything wedding-specific lives in one place:

- `src/data/wedding.ts` — couple names, dates, story chapters, event
  sessions, gallery captions, dress code, gift accounts, contact info
- `public/images/` — drop in real photography (see the README inside)
- `public/audio/wedding.mp3` — background music
- `public/guests.json` — the guest list

No other files need to change for a different couple.

## Build

```bash
npm run build
npm run preview
```

Output is a static site in `dist/` — deploy it anywhere that serves
static files (Vercel, Netlify, Cloudflare Pages, etc.), keeping the
`/undangan/:slug` route rewritten to `index.html` for guest links to
work (client-side routing).
