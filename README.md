# Olif & Usman — Digital Wedding Invitation

A premium, editorial-style Indonesian digital wedding invitation built with
Vite + React + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Personalizing a guest link

Append `?to=Guest+Name` to the URL, e.g.:

```
/?to=Bapak+Andi+dan+Keluarga
```

Indonesian characters, spaces (`+` or `%20`) and punctuation are decoded
automatically. No `to` param falls back to "Nama Tamu".

## Customizing content

Every piece of wedding-specific content — couple names, parents, event
times, venue, love story, gallery, gift accounts, livestream URL — lives in
one place:

```
src/data/wedding.ts
```

Seed guestbook comments live in `src/data/wishes.ts`. Guest-submitted
wishes are persisted to `localStorage` under the key `wedding-wishes`.

## Adding real media

- Photos: replace the `picsum.photos` URLs in `src/data/wedding.ts` with
  your own image paths (e.g. `/images/bride.webp`) placed in `public/images/`.
- Background music: add an MP3 at `public/audio/wedding-music.mp3`
  (path is configurable via `audioSrc` in `src/data/wedding.ts`).
- Google Maps: update `mapsUrl` / `mapsEmbedUrl` in `src/data/wedding.ts`
  with your own location link and embed URL.

## Project structure

```
src/
├── app/App.tsx            Root component, opening → invitation flow
├── components/ui/         Reusable primitives (Button, Modal, Divider…)
├── components/wedding/    Section-level building blocks
├── components/layout/     Section wrapper & page frame
├── data/                  All wedding content (data-driven, no hardcoding)
├── hooks/                 useCountdown, useGuestName, useLocalStorage, useInView
├── lib/                   clipboard, date formatting, guest-name parsing, utils
├── types/                 Shared TypeScript interfaces
└── styles/                Tailwind v4 theme tokens + keyframe animations
```

## Notes

- Countdown target: `2026-08-02T15:00:00+08:00` (Asia/Makassar / WITA).
- Respects `prefers-reduced-motion`.
- RSVP form validates name (2+ chars), attendance selection, and message
  before submitting — no backend required.
