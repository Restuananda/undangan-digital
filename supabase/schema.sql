-- Run this once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run).

create table if not exists rsvps (
  id text primary key,
  guest_id text not null unique,
  guest_name text not null,
  attendance text not null check (attendance in ('attending', 'not_attending')),
  message text not null default '',
  submitted_at timestamptz not null default now()
);

-- Speeds up the "recent wishes" query on the invitation's guestbook section.
create index if not exists rsvps_submitted_at_idx on rsvps (submitted_at desc);

-- Row Level Security is enabled with NO public policies defined below.
-- All access happens exclusively through the server-side service_role key
-- (used only in app/api routes and server components, never sent to the
-- browser), which bypasses RLS by design. This means the table is NOT
-- readable or writable directly by anyone using your Supabase anon/public
-- key — the only way in is through this app's own API.
alter table rsvps enable row level security;
