# Adrian & Clara — Digital Wedding Invitation (Bahasa Indonesia)

A premium, mobile-first digital wedding invitation built with Next.js (App Router), TypeScript, and Tailwind CSS v4. All guest-facing copy is in Bahasa Indonesia.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the generic preview, or `http://localhost:3000/undangan/budi-santoso` for a personalized invitation (see `/public/guests.json` for sample guests).

## Two ways guests get in

1. **Direct link — `/undangan/<slug>`.** Share this individually with each guest (e.g. via WhatsApp). It skips the name gate entirely and goes straight into their personalized invitation. An unrecognized slug shows a plain "not recognized" screen, nothing else.
2. **Portal / name entry — `/`.** For a single link shared broadly. The guest types their name; it's checked server-side against `public/guests.json`, and only a match unlocks the invitation.

Both paths call the same server-side guest lookup and land on the same `InvitationExperience`, so RSVP behavior (one-time, server-enforced) is identical either way.

## Customizing for a real couple

Everything guest-facing lives in one place: **`lib/config.ts`**. Update couple names, the wedding date, ceremony/reception details, story timeline, gallery captions, venue, gift/bank info, and the music track there — no component needs to change.

Guests live in **`public/guests.json`**:

```json
{ "id": "001", "name": "Budi Santoso", "slug": "budi-santoso" }
```

Each guest's personalized link is `/undangan/<slug>`.

## Photography

`/public/images/` currently contains generated placeholder duotone photography — no stock-photo access was available while building this. Replace these files with real couple photography before launch, keeping the same filenames referenced in `lib/config.ts`, or update the paths there to match new filenames.

`/public/audio/wedding.mp3` currently contains a short (26s), synthesized instrumental placeholder — generated locally so it's copyright-free, not a real song. It plays automatically the moment a guest taps "Buka" and loops seamlessly (`<audio loop>`) for as long as the page stays open. Swap in the couple's actual chosen track before launch by replacing that file (or updating `lib/config.ts` → `music.src`); any real song used should be one you have the rights to use.

## RSVP: one-time and server-enforced

- The only write endpoint is `POST /api/rsvp` — there is no update or delete route.
- Storage is behind an `RSVPRepository` interface (`lib/rsvp-types.ts`) with two implementations that are picked automatically at runtime (`lib/rsvp-repository.ts`):
  - **`JsonRSVPRepository`** (`public/rsvp.json`) — used when no Redis env vars are present. Fine for local development and for a self-hosted deploy with a persistent, writable disk. **Does not work on Vercel** (or any serverless host) — those run on a read-only filesystem, so writes silently fail in production even though everything works locally.
  - **`RedisRSVPRepository`** — used automatically once `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` (or the older `KV_REST_API_*` aliases) are set. Duplicate protection is enforced with an atomic `SET ... NX` at the database level, which (unlike the JSON backend's in-process mutex) stays correct across multiple concurrent serverless instances.

### Deploying to Vercel — required one-time setup

The JSON backend **will not work in production on Vercel**. Before deploying:

1. In your Vercel project, go to **Storage → Create Database → Redis** (or connect an Upstash Redis integration from the Marketplace).
2. Connect it to this project. Vercel injects the required env vars automatically — no code changes needed.
3. Redeploy. The app detects the env vars and switches to `RedisRSVPRepository` automatically.

Without step 1–2, the app still builds and runs on Vercel, but RSVP submissions will fail once a guest tries to confirm attendance.

**If direct slug links (`/undangan/<slug>`) don't work in production:** the most likely cause is a half-configured Redis integration (one env var present, the other missing) — this used to crash the whole page on render. As of the current version this can no longer happen: a half-configured pair is treated as "no Redis" and the app falls back to the JSON backend instead of throwing. If you still see an issue, check the **Functions** tab in your Vercel deployment logs for the actual error, and confirm the slug in the URL exactly matches an entry in `public/guests.json` (slugs are case-sensitive as typed, though the name-gate matching is not).

To move to a different database entirely (Postgres, Supabase, etc.), implement `RSVPRepository` against it and add it as a third option in `lib/rsvp-repository.ts` — no UI or route code needs to change.

## Project structure

```
app/
  page.tsx                    generic/preview invitation
  undangan/[guest]/page.tsx   personalized invitation (server-side guest lookup)
  api/rsvp/route.ts           the only RSVP write endpoint
  api/guest-access/route.ts   name-entry access gate for the shared/root link
  components/                 one focused component per section
lib/
  config.ts                   all wedding content, centralized
  guests.ts                   server-only guest lookup (never exposes the full roster)
  rsvp-types.ts                RSVPRepository interface + shared error type
  rsvp-repository.ts          picks JSON vs. Redis backend at runtime
  rsvp-repository-json.ts     local-filesystem implementation
  rsvp-repository-redis.ts    Upstash Redis implementation (for Vercel)
types/
  wedding.ts                  shared TypeScript types
public/
  guests.json, rsvp.json, audio/
```

## Notes

- All visible copy — headings, buttons, form labels, API response messages — is in Bahasa Indonesia. Update it in `lib/config.ts` (content) and the individual files under `app/components/` and `app/api/` (interface strings).
- There is no "Our Story" / timeline section — it was intentionally removed. `app/components/CoupleStory.tsx` no longer exists.
- Respects `prefers-reduced-motion` throughout.
- All touch targets are at least 44×44px.
- The hero image loads with `priority`; all other imagery is lazy-loaded via `next/image`.
- `html, body { overflow-x: hidden }` in `globals.css` is a deliberate safety net against full-bleed decorative elements (several sections use vw-sized background shapes) ever producing a horizontally scrollable page — keep it in place if you add further full-bleed decoration.
