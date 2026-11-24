# NOUR TRADING INC. — Corporate Website

**From Factory to Your Door.** The B2B website for Nour Trading Inc., a family-owned global sourcing and procurement company based in Illinois.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide icons · Zod**.

---

## 1. What's included

| Page | Route |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Our Services (6 anchored sections) | `/services` (`#global-product-sourcing` …) |
| Industries We Serve | `/industries` |
| How It Works (interactive timeline) | `/how-it-works` |
| Product Categories + 8 category pages | `/products`, `/products/[slug]` |
| Request a Quote | `/request-a-quote` (supports `?category=` / `?service=` presets) |
| Contact Us | `/contact` |
| Privacy Policy / Terms | `/privacy-policy`, `/terms` |
| SEO | `/sitemap.xml`, `/robots.txt`, Open Graph image, JSON-LD (Organization, Service, BreadcrumbList, HowTo) |
| API | `POST /api/quote`, `POST /api/contact` |

Other features: a sticky header with an active-page indicator, a mobile menu, a sticky "Request a Quote" bar on phones, scroll animations that respect the visitor's reduced-motion setting, a skip-to-content link, security headers, and a branded 404 page.

## 2. Run locally

Requirements: **Node.js 20.9+** (22 LTS recommended).

```bash
npm install
cp .env.example .env.local     # then fill in values (see §4)
npm run dev                    # http://localhost:3000
```

Production check:

```bash
npm run build && npm start
npm run lint                   # TypeScript type-check
```

## 3. Editing content (no coding experience needed)

All text and data lives in a few files:

| What | File |
|---|---|
| Company name, contact email / phone / address / hours, site URL | `lib/site.ts` |
| Services | `content/services.ts` |
| Industries | `content/industries.ts` |
| Product categories (add a new entry and it gets its own page, appears in the sitemap and the quote form automatically) | `content/products.ts` |
| Process steps | `content/process.ts` |
| Photos | `content/images.ts` + `public/images/` |
| Logo | `public/brand/nour-mark.png`, `public/brand/nour-logo-full.png`, `app/icon.png`, `app/apple-icon.png` |

**Contact details** are set to `null` in `lib/site.ts`. While a value is `null`, the site shows a tasteful "coming soon" message rather than a fake number or address. Fill them in when they're confirmed.

**Photos:** every image area is a named slot. Until a photo is added, the slot shows a branded navy illustration. To use a real photo, put a licensed image (≥1600px wide, JPG or WebP) in `public/images/` and set its `src` in `content/images.ts`. See `docs/ASSETS-NEEDED.md` for the shot list.

## 4. Forms: status and integrations

> **Honest status:** form validation, spam protection, and file checks are implemented and have been tested locally. **Email and Airtable delivery are implemented but have not been tested with live credentials.** Until at least one delivery method is configured, both forms return a clear *"Online submissions are not yet active"* message. The site never shows a thank-you message for a request that went nowhere.

What the API does for each submission:

1. Rate-limits each IP address (5 submissions per 10 minutes, in memory).
2. Checks a honeypot field and a minimum fill time to catch bots. Cloudflare Turnstile can be added optionally.
3. Validates every field on the server with Zod. The same rules give instant feedback in the browser.
4. Validates uploaded files by extension, size, and file signature ("magic bytes"), so a renamed `.exe` is rejected. Files are never written to disk. They're forwarded as email attachments only.
5. Delivers to whichever integrations are configured:

| Integration | Env vars | Notes |
|---|---|---|
| Email via [Resend](https://resend.com) | `RESEND_API_KEY`, `QUOTE_NOTIFY_TO`, `QUOTE_NOTIFY_FROM` | Sender domain must be verified in Resend. Uploaded files are attached. |
| Airtable CRM | `AIRTABLE_API_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_QUOTES_TABLE`, `AIRTABLE_CONTACTS_TABLE` | Creates one record per request with `typecast: true`. Attachment *filenames* are recorded. Storing the files themselves in Airtable requires a public file URL (see §6). |
| Turnstile (optional) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Server check is built in. Add the Turnstile widget script to the forms when you enable it. |

**Suggested Airtable table "Quote Requests"** (field names must match): Reference, Submitted At, Status, Full Name, Company, Email, Phone, Website, Product Category, Product Description, Estimated Quantity, Specifications, Logo / Printing, Preferred Delivery Date, Destination City, Destination State, Destination ZIP, Shipping Preference, Additional Requirements, Attachments (filenames), Source.
**"Contact Messages":** Reference, Submitted At, Status, Full Name, Company, Email, Phone, Inquiry Type, Message, Source.

**Launch checklist for forms:** set the env vars → submit a test quote with a PDF attached → confirm the email arrives with the attachment and the Airtable record is created → submit a contact message → confirm both.

## 5. Deploy

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. In [vercel.com](https://vercel.com), go to **Add New → Project**, import the repo, and accept the defaults (framework: Next.js).
3. Under **Settings → Environment Variables**, add the variables from `.env.example`, including `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com`.
4. Deploy. Then add your domain under **Settings → Domains** and update DNS at your registrar as Vercel instructs.
5. Submit `https://www.yourdomain.com/sitemap.xml` in Google Search Console.

> Vercel functions accept request bodies up to about 4.5 MB, so uploads are capped at 4 MB total (`FILE_RULES` in `lib/forms/schema.ts`). For larger files, switch to direct-to-storage uploads (Vercel Blob or S3 presigned URLs). Those also give Airtable the public URLs it needs to store attachments.

### Other hosts

Any Node.js host that supports Next.js works (Netlify, Render, AWS Amplify, or a VPS running `npm run build && npm start`). The in-memory rate limiter works per server instance. For multi-instance hosting, move it to Redis or Upstash.

### Static preview (no backend)

`npm run build:preview` writes a static copy of the site to `./out` without the API routes. Forms in that copy show "not connected." It's useful for design review only.

## 6. Recommended next steps

- Add real photography and confirm contact details (`docs/ASSETS-NEEDED.md`).
- Configure and test Resend and/or Airtable (§4).
- Have an attorney review `/privacy-policy` and `/terms`. Both pages are marked as templates.
- Add analytics (Vercel Analytics or GA4) and update the privacy policy to match.
- Plan the customer portal (`docs/PORTAL-ARCHITECTURE.md`).

## 7. Project structure

```
app/                  Routes (App Router), API routes, sitemap, robots, icons
components/layout/    Header, Footer, Logo, MobileQuoteBar
components/sections/  HomeHero, PageHero, ProcessTimeline, CtaBand, JsonLd
components/ui/        Button, Reveal, SectionHeading, BrandVisual (photo slot)
components/forms/     QuoteForm, ContactForm, shared field helpers
content/              Editable site content (services, industries, products, process, images)
lib/                  Site config, SEO helpers, form schema/security/delivery
public/brand/         Logo files
docs/                 Assets needed, domains, portal architecture
scripts/              Static preview builder
```
