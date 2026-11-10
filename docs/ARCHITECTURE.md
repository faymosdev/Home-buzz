# Homebuzz architecture

Build for the business Homebuzz is today; leave clean seams for what it will become.

## Today (Phase 1: launch)

```
Browser ──► Next.js App Router (static pages, server actions)
              │
              ├─ src/app/actions/enquiries.ts   "use server" entry points (validate → call service)
              ├─ src/services/enquiries.ts      business logic (DB writes, storage, notifications)
              ├─ src/lib/supabase/server.ts     service-role client (server only)
              └─ src/lib/email/notify.ts        Resend HTTP API (optional)
                       │
                       ▼
                 Supabase Postgres (RLS on, no public policies) + private Storage bucket
```

- **Every marketing page is static** and prerendered at build time. Only the forms run code on the server.
- **Validation is shared.** `src/lib/validation/*.ts` (Zod) is used by the browser form *and* the server
  action, so the rules can't drift apart. The server always re-validates.
- **Photo uploads skip the server.** The server action issues one-time signed upload URLs into a
  `pending/<uploadId>/` folder in a private bucket; the browser uploads straight to Supabase Storage; the
  final submit only accepts paths inside the folder the server issued. This avoids serverless request-size
  limits and never exposes the service role key.
- **Honest failure modes.** If Supabase isn't configured, the forms say so and show contact details.
  If email isn't configured, enquiries are still saved and the skip is logged.
- **Content lives in `src/config/`.** Business details, services, pricing, FAQs, audiences, reviews,
  navigation and images. Pages read from there; nothing is duplicated across pages.

### Folder map

| Path | What lives there |
|---|---|
| `src/app/` | Routes, layouts, metadata, sitemap, robots, server actions |
| `src/components/ui/` | Primitives: button, field inputs, accordion, placeholder |
| `src/components/layout/` | Header, mobile nav, footer, container/section |
| `src/components/sections/` | Page sections: hero, services, before/after, pricing, FAQ, CTA… |
| `src/components/forms/` | Quote form (multi-step) and contact form |
| `src/config/` | All editable business content |
| `src/lib/` | Utilities, SEO helpers, validation schemas, Supabase and email clients |
| `src/services/` | Backend service layer, reused by actions now and admin/API later |
| `src/types/` | Shared types (statuses, action results) |
| `supabase/migrations/` | Database schema, file-first |

## Later phases: where each one plugs in

Nothing below is built yet. Each phase gets its own migration and its own slice of UI.

### Phase 2: bookings
- New tables: `availability_slots`, `bookings` (FK → `quote_requests`), `notifications_log`.
- `quote_requests.status` already reserves `accepted → scheduled → completed`.
- Customer emails (confirmation, reminder) go in `src/lib/email/` beside `sendBusinessNotification`.
- UI: `/book/[reference]` for a customer to pick a slot after accepting a quote.

### Phase 3: indicative quote calculator
- `quote_requests.estimate_low_gbp / estimate_high_gbp` already exist.
- Put the pricing model in a pure function (`src/services/estimator.ts`) fed by a `pricing_rules` table
  (size, waste type, condition, access, distance, labour, disposal cost). Test it in isolation.
- An estimate is always reviewed by a person before it becomes a written quote: store both, never
  overwrite the human figure.

### Phase 4: contractor network
- Tables: `contractors`, `contractor_documents` (licence and insurance, with expiry and verified_by),
  `jobs` (FK → booking, contractor), `job_photos` (before/after), `job_events` (status history).
- Contractor portal behind auth with a `contractor` role; RLS limits each contractor to their own jobs.

### Phase 5: business accounts
- Tables: `organisations`, `organisation_members`, `properties` (many per organisation),
  `price_agreements` (business-specific pricing), `invoices`.
- Quote requests gain an optional `organisation_id` and `property_id`.
- `/business-services` already describes this as "coming later".

## Admin dashboard (when authentication is added)

- Supabase Auth plus a `profiles` table with `role in ('admin','staff','contractor','business')`.
- Routes under `/admin`, protected in `src/proxy.ts` (Next 16's replacement for middleware) **and** by RLS
  policies keyed on role. Never rely on the UI alone.
- `/admin` is already disallowed in `robots.ts`.
- Admin screens call the same functions in `src/services/`. Photos are shown via short-lived signed URLs
  generated server-side; the bucket stays private.
- Managing pricing, services and reviews from the dashboard means moving `src/config/pricing.ts`,
  `services.ts` and `testimonials.ts` into tables. Keep the config files as the seed data.
- Grants and policy changes go in their own migrations, separate from table changes.
