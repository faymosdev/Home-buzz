-- Homebuzz — Phase 1: quote requests, photos and contact messages.
-- Apply with the Supabase CLI (`supabase db push`) or paste into the SQL editor
-- of a NEW project. Once applied, treat this file as frozen: put changes in a new migration.
--
-- Security model: RLS is enabled with NO public policies. The website writes
-- through server actions using the service role key; the browser never reads
-- these tables. A future admin dashboard will add role-based policies in a
-- separate migration (see docs/ARCHITECTURE.md).

create extension if not exists pgcrypto;

-- ── Quote requests ──────────────────────────────────────────────────────────
create table if not exists public.quote_requests (
  id                 uuid primary key default gen_random_uuid(),
  reference          text not null unique,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  status             text not null default 'new'
                     check (status in ('new','reviewing','quoted','accepted','declined','scheduled','completed','cancelled')),
  customer_type      text not null check (customer_type in ('residential','business')),
  full_name          text not null,
  email              text not null,
  phone              text not null,
  postcode           text not null,
  address            text not null,
  service_type       text not null,
  garden_description text not null,
  garden_size        text not null,
  garden_condition   text not null,
  preferred_date     date,
  preferred_contact  text not null check (preferred_contact in ('phone','email','text')),
  consent_at         timestamptz not null,
  source             text not null default 'website',
  -- Phase 3 (indicative estimate, always reviewed by a person before quoting):
  estimate_low_gbp   numeric(10,2),
  estimate_high_gbp  numeric(10,2),
  internal_notes     text
);

create index if not exists quote_requests_status_created_idx on public.quote_requests (status, created_at desc);
create index if not exists quote_requests_email_idx on public.quote_requests (lower(email));

-- ── Photos attached to a quote request ─────────────────────────────────────
create table if not exists public.quote_request_photos (
  id               uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  storage_path     text not null,
  created_at       timestamptz not null default now()
);

create index if not exists quote_request_photos_request_idx on public.quote_request_photos (quote_request_id);

-- ── Contact form messages ──────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  reference   text not null unique,
  created_at  timestamptz not null default now(),
  status      text not null default 'new' check (status in ('new','replied','closed')),
  name        text not null,
  email       text not null,
  phone       text,
  topic       text not null,
  message     text not null,
  consent_at  timestamptz not null
);

-- ── updated_at trigger ─────────────────────────────────────────────────────
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists quote_requests_set_updated_at on public.quote_requests;
create trigger quote_requests_set_updated_at
  before update on public.quote_requests
  for each row execute function public.set_updated_at();

-- ── Row-level security: locked down (service role only) ────────────────────
alter table public.quote_requests       enable row level security;
alter table public.quote_request_photos enable row level security;
alter table public.contact_messages     enable row level security;

-- ── Private storage bucket for quote photos ────────────────────────────────
-- 10 MB per file; images only. Uploads use one-time signed URLs issued by the server.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('quote-photos', 'quote-photos', false, 10485760,
        array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
