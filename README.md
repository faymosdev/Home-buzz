# Homebuzz Gardening Services: website

Marketing site and quote-request system for Homebuzz Gardening Services, a garden clearance and green
waste removal business in Belfast (launching March 2027).

**Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4, shadcn-style UI primitives on Radix,
Solar icons, React Hook Form + Zod, Supabase (Postgres + Storage), Resend for email notifications.

- Every marketing page is prerendered static. Only the two forms run server code.
- See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the design of the backend and how bookings,
  the quote calculator, contractors, business accounts and the admin dashboard plug in later.

---

## 1. Install and run

Requires Node.js 20.9+ and pnpm 10.

```bash
pnpm install
cp .env.example .env.local   # then fill in what you have (see section 2)
pnpm dev                     # http://localhost:3000
```

Other scripts:

```bash
pnpm build      # production build (also runs TypeScript checks)
pnpm start      # serve the production build
pnpm lint       # ESLint
npx tsc --noEmit
```

The site runs with **no environment variables at all**. The forms then show an honest "online requests
aren't switched on yet" message with contact details, instead of pretending to send.

## 2. Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | SEO | Live URL, no trailing slash. Canonicals, sitemap, Open Graph and structured data use it. |
| `NEXT_PUBLIC_SUPABASE_URL` | Forms | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Photo uploads | Public key; uploads only work through one-time signed URLs |
| `SUPABASE_SERVICE_ROLE_KEY` | Forms | **Secret.** Server only. Never prefix with `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_SUPABASE_QUOTE_PHOTOS_BUCKET` | Optional | Defaults to `quote-photos` |
| `RESEND_API_KEY` | Email notifications | Optional; enquiries are still saved without it |
| `NOTIFY_EMAIL_TO` | Email notifications | Who receives new-enquiry emails (comma-separated) |
| `NOTIFY_EMAIL_FROM` | Email notifications | e.g. `Homebuzz Website <quotes@yourdomain.co.uk>` on a Resend-verified domain |

## 3. Connect Supabase

1. Create a Supabase project (choose the London region for UK data).
2. Apply the schema in [`supabase/migrations/`](supabase/migrations/), using either:
   - the CLI: `supabase link --project-ref <ref>` then `supabase db push`, or
   - SQL editor: paste the migration file into a **new** project and run it once.

   This creates `quote_requests`, `quote_request_photos` and `contact_messages` (row-level security on,
   no public access) and a **private** `quote-photos` storage bucket (images only, 10 MB each).
3. Copy the URL, anon key and service role key into your environment (section 2).
4. Submit a test quote with photos, then check **Table editor → quote_requests** and
   **Storage → quote-photos**.

Treat applied migration files as frozen. Schema changes go in a new, dated migration file.

**How photo uploads work:** the browser asks the server for one-time signed upload URLs, uploads each
photo straight to the private bucket, then submits the form with the file paths. The server only accepts
paths inside the folder it issued. Photos never pass through the web server, which avoids hosting
request-size limits.

## 4. Email notifications

1. Create a [Resend](https://resend.com) account and verify your sending domain.
2. Set `RESEND_API_KEY`, `NOTIFY_EMAIL_TO` and `NOTIFY_EMAIL_FROM`.
3. Each new quote request sends a plain-text email with the customer's details, a reference number
   (e.g. `HB-7K2QXM`) and links to the photos that stay valid for 7 days. *Reply* goes to the customer.

If sending fails, the enquiry is still saved and the error is logged. Check Supabase if an email seems
missing.

## 5. Update content, services and pricing

Everything editable lives in **`src/config/`**. Change it there and every page updates.

| File | What it controls |
|---|---|
| `site.ts` | Phone, email, opening hours, social links, launch banner, waste carrier registration, insurance, discount wording |
| `services.ts` | The 7 services and the "coming soon" window cleaning card (descriptions, suitable for, benefits, image) |
| `pricing.ts` | Indicative prices (whole pounds, GBP) and the pricing notes |
| `faqs.ts` | All FAQ questions, categories, and which appear on the homepage |
| `audiences.ts` | "Who we help" cards |
| `testimonials.ts` | Customer reviews. **Genuine reviews only.** While empty, a "reviews coming soon" state shows |
| `navigation.ts` | Header, footer and legal links |
| `images.ts` | Every photo and its alt text |

### Placeholders to replace before launch

Anything not yet confirmed shows on the site as a dashed, pencil-marked **placeholder**. Search the code
for `<Placeholder` and for `null` values in `src/config/site.ts`. At the moment that covers:

- phone, email, opening hours and social links (`site.ts`)
- waste carrier registration, insurance and business registration (`site.ts`). **Don't claim waste carrier
  registration until it's confirmed.**
- founder photo and founder story (`src/app/about/page.tsx`)
- the privacy policy and terms (`src/app/privacy`, `src/app/terms`). Both are drafts that haven't been legally reviewed
- the discount amount for older and disabled residents (`site.concessionDiscount`)
- photos: all current images are illustrative stock (see `docs/IMAGE_CREDITS.md`). Replace them with real
  Homebuzz photos, and use real before/after pairs only with the customer's permission
- turn off the launch banner after launch: `site.launch.show = false`

When the phone and email are added, they automatically become clickable links and are added to the
LocalBusiness structured data.

## 6. Deploy

The simplest route is **Vercel**:

1. Push this repository to GitHub and import it in Vercel (framework: Next.js; it detects pnpm).
2. Add the environment variables from section 2 for Production (and Preview if wanted).
3. Deploy, then point your domain at Vercel and set `NEXT_PUBLIC_SITE_URL` to it. Redeploy so that
   canonicals and the sitemap use the real domain.
4. Submit `https://<your-domain>/sitemap.xml` in Google Search Console, and create a Google Business
   Profile for local search.

Any Node host that runs `pnpm build && pnpm start` also works.

## Design system (short version)

- **Concept:** "the calm after the clearance". Navy carries authority and type; green
  (`#1F5C3A`) is the single action colour; paper and mint are the quiet grounds.
- **Type:** Bricolage Grotesque (display) + Manrope (body), via `next/font`.
- **Rules:** buttons are always `rounded-full`; no box shadows (depth comes from borders and surface
  steps); Solar icons (Outline by default, Bold for emphasis); images use the "leaf" mask (`leaf`,
  `leaf-lg` utilities: two large opposite corners).
- Tokens live in `src/app/globals.css` under `@theme`.

## Accessibility

Skip link, one `h1` per page, labelled landmarks, visible `:focus-visible` rings, 44px+ touch targets,
labelled inputs with announced (`aria-live`) errors that also carry an icon, a keyboard-operable
before/after slider (native range input), a Radix dialog for the mobile menu (focus trap, Esc to close), and
`prefers-reduced-motion` support.
