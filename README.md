# Dear Ones — Landing Website

A premium, production-quality marketing site for **Dear Ones**, an elder-support
and NRI parent-care brand ("Your Love. Our Hands."). It communicates the
service, its three care plans, on-demand support, how it works, and converts
visitors into enquiries via a validated contact form, phone and WhatsApp.

The site is intentionally honest: no prices, locations, testimonials, ratings,
medical licences or contact details are invented. Every business-specific value
comes from central configuration and is hidden gracefully when unset.

## Tech stack

- **Next.js 16** (App Router, Server Components by default)
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-based `@theme` tokens)
- **next/font** — Cormorant Garamond (headings) + Manrope (body)
- **lucide-react** — line icons
- **zod** — shared client + server form validation
- **resend** — optional transactional email for enquiries
- **sharp** — one-time brand image processing (dev only)
- Native CSS + a lightweight IntersectionObserver `Reveal` for animation

## Getting started

```bash
npm install
cp .env.example .env.local      # then fill in real values
npm run process-images          # generate image assets (see below)
npm run dev                     # http://localhost:3000
```

### Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run process-images` | Generate optimised brand image assets |

## Brand image assets

The design uses the supplied Dear Ones brand photo (older woman + held hands).
Because that file is not committed, a resilient pipeline is included:

1. Drop the real photo at **`brand-source/dear-ones-source.jpeg`**
   (`.jpg`, `.png` or `.webp` also accepted).
2. Run `npm run process-images`.

This generates, in `public/images/`:

- `dear-ones-source.webp` / `.avif` — optimised full image
- `dear-ones-hero.webp` / `.avif` — hero crop (woman + hands, no baked-in text)
- `dear-ones-hands.webp` — close crop of the held hands

If **no** source photo is present, the script generates tasteful warm
**placeholder** images so the site still builds and looks complete. Crop ratios
live in `scripts/process-images.mjs` (`CROPS`) and can be tuned to your framing.

The "Dear Ones" wordmark and symbol in the header/footer are rendered as crisp,
accessible **SVG + live text** (`src/components/ui/BrandMark.tsx`) rather than an
image crop — sharper, responsive and readable by search engines.

## Where to edit things

| You want to change… | Edit |
| --- | --- |
| Business details (phone, email, WhatsApp, areas, socials, legal name) | `.env.local` (see `src/config/site.ts`) |
| All landing-page copy (hero, services, plans, FAQ, etc.) | `src/content/landing-page.ts` |
| Form fields / validation rules | `src/lib/validation.ts` |
| Colours, fonts, spacing, animations | `src/app/globals.css` |
| Structured data (JSON-LD) | `src/lib/structured-data.ts` |
| SEO metadata (title, description, OG) | `src/app/layout.tsx` |

## Environment variables

See `.env.example` for the full list. Highlights:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL (used for metadata, sitemap, JSON-LD)
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_WHATSAPP_NUMBER`
  — public contact channels (empty → hidden everywhere)
- `NEXT_PUBLIC_SERVICE_AREAS` — comma-separated cities/areas
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Search Console verification
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — optional GA4 (disabled unless set)
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — **server-only**
  email delivery (never exposed to the browser)

> Never place a secret behind a `NEXT_PUBLIC_` name — those are shipped to the browser.

## Contact form setup

The form (`POST /api/enquiry`) validates with Zod on both client and server and
includes a honeypot for basic spam reduction.

- **With** `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL` set,
  enquiries are emailed via [Resend](https://resend.com).
- **Without** them, the API returns an honest "not configured" state — the UI
  never claims a message was sent and instead surfaces phone/WhatsApp/email
  fallbacks. This keeps development safe and truthful.

## SEO implementation

- Metadata API in `src/app/layout.tsx` (title template, description, Open Graph,
  Twitter, canonical, robots, Search Console verification)
- `sitemap.ts`, `robots.ts`, `manifest.ts`
- Generated `icon.tsx` (favicon/app icon) and `opengraph-image.tsx` (1200×630)
- JSON-LD `@graph` (`Organization`, `WebSite`, `WebPage`, `Service`, `FAQPage`)
  built from confirmed values only — empty fields are omitted
- All content is server-rendered; animations never gate crawlable text

## Deployment (Vercel)

1. Push the `dear-ones` folder to a Git repository.
2. Import the project in Vercel.
3. Add the environment variables from `.env.example` in **Project → Settings →
   Environment Variables**.
4. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Pre-launch checklist

- [ ] Confirm service location(s) — `NEXT_PUBLIC_SERVICE_AREAS`, `NEXT_PUBLIC_PRIMARY_AREA`
- [ ] Confirm phone and WhatsApp number
- [ ] Confirm contact email
- [ ] Confirm production domain — `NEXT_PUBLIC_SITE_URL`
- [ ] Confirm legal/registered business name — `NEXT_PUBLIC_LEGAL_NAME`
- [ ] Confirm business address (before adding to JSON-LD)
- [ ] Confirm operating hours
- [ ] Confirm exact plan inclusions (`src/content/landing-page.ts`)
- [ ] Confirm service limits (visit counts, durations)
- [ ] Confirm medical-service wording (FAQ #4 is a draft — see `needsConfirmation`)
- [ ] Confirm emergency-service wording
- [ ] Publish a real **Privacy Policy** (`src/app/privacy`)
- [ ] Publish real **Terms of Service** (`src/app/terms`)
- [ ] Confirm form delivery (Resend keys) and send a test enquiry
- [ ] Validate structured data (Google Rich Results Test)
- [ ] Test `/sitemap.xml` and `/robots.txt`
- [ ] Verify Google Search Console
- [ ] Test all mobile breakpoints (360, 390, 768, 1024, 1280, 1440)
- [ ] Run Lighthouse (Performance / A11y / Best Practices / SEO)
- [ ] Proofread all copy
- [ ] Replace placeholder brand images with the real photo + `npm run process-images`
- [ ] Legal review of the footer disclaimer

## Content & legal notes requiring confirmation

- Care-plan inclusions and service limits are transcribed from the source brief
  and must be confirmed as current.
- The medical-treatment FAQ answer is a careful draft; confirm the exact wording
  with the business/legal owner.
- The footer disclaimer is a draft for legal review.
