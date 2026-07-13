# SwiftCode Innovation — Website

Production-grade marketing site for **SwiftCode Innovation (Pty) Ltd**, built with
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Motion.

> _Engineering Tomorrow's Digital World._

## Stack

- **Next.js 16** (App Router, static + SSG) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` design tokens, dark-only)
- **Motion** (framer-motion successor) for scroll reveals & count-ups
- **lucide-react** icons + inline brand SVGs
- **Self-hosted fonts** via `next/font` (Space Grotesk + Inter) — no runtime
  Google request, POPIA-friendly
- **Full Next.js app** (SSR/Node) → deploys to **Vercel**
- **Web3Forms** for the contact form (no backend to run)

## Getting started

```bash
npm install
cp .env.example .env.local   # add your Web3Forms + analytics keys
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build + server
```

## Project structure

```
src/
  app/
    layout.tsx            Root layout: fonts, metadata, JSON-LD, nav, footer
    page.tsx              Home
    about/ services/ solutions/ innovation-lab/ industries/
    case-studies/         List + [slug] detail (SSG)
    insights/ careers/ contact/
    privacy/ paia/ terms/ Legal (POPIA/PAIA templates)
    sitemap.ts robots.ts not-found.tsx opengraph-image.tsx
  components/             Nav, Footer, Aurora, Reveal, Counter, ContactForm, UI…
  lib/site.ts             ⭐ Single source of truth: brand, nav, services, projects
```

## Editing content

Almost everything lives in **`src/lib/site.ts`** — company details, navigation,
services, case studies, tech stack, process and industries. Edit there first.

## To finish before launch

1. **Contact form** → get a free key at [web3forms.com](https://web3forms.com)
   and set `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local`, then rebuild.
2. **Project logos** → drop the official PNGs into `public/logos/`
   (`aiducate.png`, `tectarch.png`, `mute-it.png`). See `public/logos/README.md`.
   Missing logos degrade gracefully (nothing renders — no broken images).
3. **Analytics** → set `NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_CLARITY_ID`.
4. **Legal review** → the Privacy / PAIA / Terms pages are templates and must be
   reviewed by a legal professional.

Done already: official SwiftCode wordmark wired (`public/swiftcode-logo.png`),
favicon/OG/apple icons, phone (`+27 74 832 8272`), emails (`info@`, `it@`,
`admin@`), leadership/directors, sitemap/robots, security headers
(`next.config.ts`).

## Deployment (Vercel)

This is a full Next.js app (SSR/Node). Vercel (by the Next.js team) hosts it with
zero config. **Your domain stays at GoDaddy** — GoDaddy remains the registrar,
Vercel is the host, and you point DNS from GoDaddy to Vercel.

**1. Configure the contact form (once):**
- Get a free key at [web3forms.com](https://web3forms.com) (enter
  `info@swiftcode.co.za`), and add it as an env var (below).

**2. Deploy — CLI:**
```bash
npm i -g vercel
vercel            # first run: link/create the project
vercel --prod     # production deploy
```
Or push this folder to GitHub and **Import Project** at
[vercel.com/new](https://vercel.com/new) (auto-detects Next.js; auto-deploys on
every push).

**3. Environment variables** — in Vercel → Settings → Environment Variables, add
the keys from `.env.example`:
`NEXT_PUBLIC_WEB3FORMS_KEY`, and optionally `NEXT_PUBLIC_GA_ID` /
`NEXT_PUBLIC_CLARITY_ID`. Redeploy after adding them.

**4. Connect the GoDaddy domain:**
- Vercel → Settings → **Domains** → add `swiftcode.co.za`.
- In **GoDaddy → Domain → DNS**, set the records Vercel shows you — typically an
  `A` record `@ → 76.76.21.21` and a `CNAME` `www → cname.vercel-dns.com`.
- Vercel issues the SSL certificate automatically.

Security headers are set in `next.config.ts`.

## Notes

- Fully responsive, dark-only, and respects `prefers-reduced-motion`.
- Accessible: skip link, focus states, ARIA labels, semantic landmarks,
  `aria-live` form feedback.
- SEO: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`, Organization
  + SoftwareApplication (AIDucate) JSON-LD.
