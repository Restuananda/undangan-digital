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
- Storage is behind an `RSVPRepository` interface (`lib/rsvp-types.ts`) with three implementations, picked automatically at runtime based on which env vars are present (`lib/rsvp-repository.ts`), in this priority order:
  1. **`SupabaseRSVPRepository`** (recommended) — used once `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are both set. See setup below.
  2. **`RedisRSVPRepository`** — used once `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` (or the older `KV_REST_API_*` aliases) are set, if Supabase isn't configured.
  3. **`JsonRSVPRepository`** (`public/rsvp.json`) — the fallback when neither of the above is configured. Fine for local development and for a self-hosted deploy with a persistent, writable disk. **Does not work on Vercel** (or any serverless host) — those run on a read-only filesystem, so writes silently fail in production even though everything works locally.

All three enforce "one RSVP per guest" atomically at the storage layer itself (a `UNIQUE` constraint in Postgres, an atomic `SET ... NX` in Redis, a serialized write lock for the JSON file) — not just in application code — so duplicate submissions can't slip through even under concurrent requests.

### Setting up Supabase (recommended)

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project, open **SQL Editor → New query**, paste the contents of `supabase/schema.sql` from this repo, and run it. This creates the `rsvps` table with a `UNIQUE` constraint on `guest_id` and enables Row Level Security with no public policies — meaning the table is reachable only through this app's own server-side code, never directly by anyone holding your public/anon key.
3. In your project, open **Settings → API**. You'll need two values:
   - **Project URL** → set as `SUPABASE_URL`
   - **service_role key** (under "Project API keys" — not the `anon`/`public` one) → set as `SUPABASE_SERVICE_ROLE_KEY`
4. Add both as environment variables in your deployment:
   - **On Vercel:** Project → Settings → Environment Variables → add both, then redeploy.
   - **Locally:** copy `.env.example` to `.env.local` and fill them in, if you want to test against Supabase during development.

The `service_role` key is a secret with full read/write access to your database, bypassing Row Level Security — it must never be prefixed `NEXT_PUBLIC_` and must never be used in a client component. Every file that touches it in this codebase is marked `"server-only"`, which makes Next.js fail the build if it's ever accidentally imported into client-side code.

Without steps 1–4 (and without a Redis integration either), the app still builds and runs on Vercel, but RSVP submissions will fail once a guest tries to confirm attendance — the JSON backend they'd otherwise fall back to doesn't work there.

### Alternative: Redis instead of Supabase

If you'd rather use Redis: in your Vercel project, go to **Storage → Create Database → Redis** (or connect an Upstash Redis integration from the Marketplace) and connect it. Vercel injects the required env vars automatically. Don't configure both Supabase and Redis unless you mean to — Supabase takes priority when both are present.

### Troubleshooting

**If direct slug links (`/undangan/<slug>`) don't render in production:** the most likely cause used to be a half-configured integration (one env var present, the other missing), which could crash the whole page. As of the current version this can't happen — a half-configured pair for any backend is treated as "not configured" and the app falls through to the next option instead of throwing. If you still see an issue, check **Vercel → your deployment → Functions/Logs** for the actual error, and confirm the slug in the URL exactly matches an entry in `public/guests.json`.

**If RSVP submission fails specifically:** check the same Vercel logs — write failures are surfaced clearly (never silently swallowed), so the log will show the real underlying error (e.g. a typo'd Supabase key, an unreachable project, a missing table).

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
  rsvp-repository.ts          picks Supabase vs. Redis vs. JSON backend at runtime
  rsvp-repository-json.ts     local-filesystem implementation (dev only)
  rsvp-repository-redis.ts    Upstash Redis implementation
  rsvp-repository-supabase.ts Supabase (Postgres) implementation — recommended for production
types/
  wedding.ts                  shared TypeScript types
public/
  guests.json, rsvp.json, audio/
supabase/
  schema.sql                  run once in the Supabase SQL Editor to create the rsvps table
```

## Notes

- All visible copy — headings, buttons, form labels, API response messages — is in Bahasa Indonesia. Update it in `lib/config.ts` (content) and the individual files under `app/components/` and `app/api/` (interface strings).
- There is no "Our Story" / timeline section — it was intentionally removed. `app/components/CoupleStory.tsx` no longer exists.
- Respects `prefers-reduced-motion` throughout.
- All touch targets are at least 44×44px.
- The hero image loads with `priority`; all other imagery is lazy-loaded via `next/image`.
- `html, body { overflow-x: hidden }` in `globals.css` is a deliberate safety net against full-bleed decorative elements (several sections use vw-sized background shapes) ever producing a horizontally scrollable page — keep it in place if you add further full-bleed decoration.
