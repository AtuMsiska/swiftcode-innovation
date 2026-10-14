# SwiftCode Innovation — Website

Marketing site for **SwiftCode Innovation (Pty) Ltd** — live at
**https://www.swiftcode.co.za** (the bare domain redirects to `www`).

> _Where Technology Meets Innovation._

**Engineering context lives in [`SwiftCode_Innovation_V1_progress.md`](SwiftCode_Innovation_V1_progress.md)
— read it before making changes** (architecture, design system, hard-won gotchas, mobile rules).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — CSS-first `@theme` tokens in `globals.css`, dark-only
- **motion** (sparingly) · **lucide-react** icons · **clsx**
- Self-hosted fonts via `next/font` (Space Grotesk + Inter) — no runtime Google request (POPIA-friendly)
- **Web3Forms** contact form (no backend) · hosted on **Vercel**

## Develop

Working copy: `D:\TectArch\TectArch Business - 04 Mute IT\08 Websites\swiftcode-innovation`

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # always build before committing
npm run lint    # should be clean (0 problems)
```

## Editing content

Almost everything — company details, navigation, services, case studies, stats,
FAQs, industries — lives in **`src/lib/site.ts`**. Edit there first, not in components.

- Case-study logos: `public/logos/{aiducate,tectarch,mute-it}.png`. Square logos
  with their own background set `logoTile: true` on the project (rounded tile
  instead of a white plate).
- Consultation calendar: set `site.scheduling` to a Cal.com / Calendly URL to embed
  a booking widget in the consultation modal (empty → email/WhatsApp fallback).

## Deploy

Push to `main` → **Vercel builds and deploys automatically.**

```bash
npm run build && git push origin main
```

### Environment variables (all optional)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Overrides the contact-form key (a public key is already built in) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (nothing loads unless set) |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity (nothing loads unless set) |

Set them in **Vercel → Project → Settings → Environment Variables**, then redeploy.

### Domain & DNS (GoDaddy is the registrar, Vercel is the host)

Primary domain in Vercel is **`www.swiftcode.co.za`**; `swiftcode.co.za` 308-redirects to it.
In **GoDaddy → DNS**, the records must be exactly:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `216.198.79.1` *(the **only** `A` record for `@`)* |
| `CNAME` | `www` | the project-specific `…vercel-dns-0xx.com` value shown in Vercel → Domains |

> ⚠️ **Never enable GoDaddy Domain Forwarding** — Vercel already redirects the bare
> domain to `www`. Forwarding silently adds extra `A` records (`3.33.251.168`,
> `15.197.225.128`) that send most bare-domain visitors to GoDaddy and block Vercel's
> SSL certificate (this happened once; fixed 13 Oct 2026 by deleting the forwarding
> rule). Leave **MX/TXT/email CNAME** records alone (GoDaddy-hosted email).

## Contact & company

`admin@swiftcode.co.za` (general / CEO) · `it@swiftcode.co.za` (CTO) · +27 74 832 8272 ·
CIPC 2023/734941/07. There is no `info@` address.
