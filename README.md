# Adrian & Clara — Digital Wedding Invitation

A premium, mobile-first digital wedding invitation built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the generic preview, or `http://localhost:3000/undangan/budi-santoso` for a personalized invitation (see `/public/guests.json` for sample guests).

## Customizing for a real couple

Everything guest-facing lives in one place: **`lib/config.ts`**. Update couple names, the wedding date, ceremony/reception details, story timeline, gallery captions, venue, gift/bank info, and the music track there — no component needs to change.

Guests live in **`public/guests.json`**:

```json
{ "id": "001", "name": "Budi Santoso", "slug": "budi-santoso" }
```

Each guest's personalized link is `/undangan/<slug>`.

## Photography

`/public/images/` currently contains generated placeholder duotone photography — no stock-photo access was available while building this. Replace these files with real couple photography before launch, keeping the same filenames referenced in `lib/config.ts`, or update the paths there to match new filenames.

Add a real background track at `/public/audio/wedding.mp3` (or update `lib/config.ts` → `music.src`).

## RSVP: one-time and server-enforced

- The only write endpoint is `POST /api/rsvp` — there is no update or delete route.
- `lib/rsvp-repository.ts` defines an `RSVPRepository` interface with a JSON-file implementation (`public/rsvp.json`). Writes are serialized through an in-process mutex and committed with an atomic rename, so concurrent submissions for the same guest can never create two records.
- To move to a real database (Postgres, MySQL, Supabase, SQLite), implement `RSVPRepository` against it and swap the single `rsvpRepository` export in `lib/rsvp-repository.ts` — no UI or route code needs to change. Enforce `UNIQUE(guestId)` at the database level as the primary safeguard; the JSON implementation's mutex is a stand-in for that constraint.

## Project structure

```
app/
  page.tsx                    generic/preview invitation
  undangan/[guest]/page.tsx   personalized invitation (server-side guest lookup)
  api/rsvp/route.ts           the only RSVP write endpoint
  components/                 one focused component per section
lib/
  config.ts                   all wedding content, centralized
  guests.ts                   server-only guest lookup (never exposes the full roster)
  rsvp-repository.ts          storage abstraction + JSON implementation
types/
  wedding.ts                  shared TypeScript types
public/
  guests.json, rsvp.json, images/, audio/
```

## Notes

- Respects `prefers-reduced-motion` throughout.
- All touch targets are at least 44×44px.
- The hero image loads with `priority`; all other imagery is lazy-loaded via `next/image`.
