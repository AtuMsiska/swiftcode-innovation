# SwiftCode Innovation — V1 Engineering Baseline

**Status:** ✅ LIVE at https://swiftcode.co.za · **Last updated:** 14 July 2026
**This file is the permanent context for all future development. Read it first.**

---

## 1. What this is

Marketing website for **SwiftCode Innovation (Pty) Ltd**, a South African technology company.

**Positioning (non-negotiable):** an **innovation company that researches real-world problems before
engineering solutions** — *not* a software agency. Innovation is primary; services are secondary.
Quality benchmark: OpenAI / Stripe / Vercel / Linear / Anthropic / Apple. Nothing should feel templated.

---

## 2. Company facts (source of truth: `src/lib/site.ts`)

| | |
|---|---|
| Legal name | SwiftCode Innovation (Pty) Ltd |
| CIPC reg. no. | **2023/734941/07** (registered 8 May 2023, founded 2023) |
| HQ | 33 Rolls Royce Street, Impala Park, Boksburg, Gauteng, 1459, South Africa |
| Phone | +27 74 832 8272 |
| Emails | `admin@swiftcode.co.za` (general + CEO), `it@swiftcode.co.za` (CTO). ⚠️ **`info@` does NOT exist** |
| Tagline | "Where Technology Meets Innovation." |

**Leadership:** CEO **Atusaye Msiska** (also POPIA **Information Officer**), COO **Tumelo Mohlala**,
CTO **Emmanuel Mhlaba**.
**Directors:** 6, equal shareholding — the 3 above + Mphiwe Ntuli, Zamani Msimango, Musa Macheke.
⚠️ There are **NO non-executive directors** — everyone is simply a Director.

**Flagship product — AIDucate:** USSD-powered intelligent information/education platform for users
without smartphones. Status: **product complete, launch phase**. ⚠️ Be honest: **0 live apps**, several
in development. Never present AIDucate as a client.
**Client work:** TectArch (`tectarch.co.za`, live), Mute IT (`muteit.co.za`, shows "Launching Soon").

---

## 3. Stack

- **Next.js 16.2.10** (App Router, Turbopack) · **React 19.2.4** · **TypeScript**
- **Tailwind CSS v4** — CSS-first `@theme` in `globals.css`; **no `tailwind.config.js`**
- **motion** (framer-motion successor) — used sparingly, see §7.2
- **lucide-react** icons, **clsx**
- **Fonts:** `next/font` (Space Grotesk display + Inter body) — self-hosted at build (POPIA-friendly, no runtime Google call)
- **Contact form:** Web3Forms (client-side POST, no backend)
- **Host:** Vercel (full SSR/Node app). **Domain at GoDaddy = registrar only**; DNS points to Vercel.

---

## 4. Repo & deploy pipeline

- **Local:** `C:\Users\atums\Documents\Claude\swiftcode-innovation`
- **GitHub:** `https://github.com/AtuMsiska/swiftcode-innovation` (branch `main`) — credentials cached, `git push` works
- **Deploy:** `npm run build` to verify → commit → **push to `main` → Vercel auto-builds & replaces live**
- Git identity (local): Atusaye Msiska `<admin@swiftcode.co.za>`
- Claude cannot deploy/sign in on the user's behalf — pushing is the mechanism.

---

## 5. Architecture

```
src/
  app/
    layout.tsx     root: fonts, metadata, Organization JSON-LD, Aurora, Nav, Footer, Analytics
    template.tsx   route transition
    page.tsx       Home (hero → InnovationFlow → AIDucate → pipeline → stats → cases → services → industries → tech → FAQ → CTA)
    about/ innovation-lab/ solutions/ services/ industries/ insights/ careers/ contact/
    case-studies/  list + [slug] detail (SSG via generateStaticParams; async params)
    privacy/ popia/ paia/ terms/   legal pages (use <LegalPage>)
    sitemap.ts robots.ts opengraph-image.tsx apple-icon.tsx icon.svg not-found.tsx
  components/      nav · footer · footer-section · aurora · hero-canvas · innovation-flow ·
                   aiducate-showcase · reveal · counter · magnetic · mouse-glow · logo ·
                   logo-img · icon · ui · page-header · legal · contact-form · analytics
  lib/site.ts      ⭐ SINGLE SOURCE OF TRUTH — company, nav, services, projects, stats, FAQs, industries
```

**Rule:** content/config changes go in `src/lib/site.ts` first, not in components.

---

## 6. Design system (`globals.css` `@theme`)

- **Dark only.** `ink #05070b` (bg) · `navy #071c2c` · `royal #1e6bff` · `cyan #18e0ff`
- **Text:** `fg #fff` (headings) · `body #cbd6e4` · `muted #a6b6ca` · `faint #7d8fa4`
- ⚠️ High contrast is **deliberate and signed off** — never reintroduce low-opacity text
  (`text-white/50`, `text-zinc-400`, etc.). Headings are pure white.
- Gradient text must use **bright stops only** (dark stops made words look faded).
- Utilities: `.container-x` `.glass` `.glow-card` `.mouse-glow` `.grid-bg` `.grad-text` `.grad-text-anim`

---

## 7. ⚠️ HARD-WON GOTCHAS — do not regress

1. **`.grid-bg` carries a `mask-image`, which masks its ENTIRE subtree.** Only ever use it as an
   absolutely-positioned **background layer** — never on a wrapper containing text. (This caused the
   hero/page headers to fade into invisibility.)
2. **`motion`'s `whileInView`/`animate` is unreliable in this setup** — it left content stuck
   transparent. `Reveal` and the mobile menu therefore use **IntersectionObserver + CSS transitions**.
   Prefer CSS transitions for anything whose *visibility* depends on it.
3. **A `backdrop-filter` ancestor traps `position: fixed` descendants** to that ancestor's box. The
   mobile menu is a **sibling of `<header>`** for this reason. `header z-[60]` > `menu z-50` keeps the
   close **X** visible (a stacking context traps its children's z-index).
4. **`Button` (ui.tsx) has its own `inline-flex`, which overrides a `hidden` class.** To hide it
   responsively, wrap it in a `<span className="hidden sm:inline-flex">`.
5. **lucide-react ships NO brand icons** (Github/Linkedin) — use inline SVGs (see `footer.tsx`).
6. **Web3Forms key is PUBLIC by design** and hardcoded as a fallback in `contact-form.tsx`
   (`d5bd7209-40e5-4a01-98e6-166f915a89a4`, override via `NEXT_PUBLIC_WEB3FORMS_KEY`). **No Vercel env
   var needed.** Submissions → `admin@swiftcode.co.za`.
7. **Verification workflow:** the browser MCP times out — instead use `puppeteer-core` + system Chrome
   (`C:/Program Files/Google/Chrome/Application/chrome.exe`) against `npm start`, screenshot, then
   **uninstall puppeteer-core and delete the script**. Always verify visually; several bugs were
   invisible in code.
8. **If ever reverting to static export** (`output: "export"` for cPanel): metadata routes need
   `export const dynamic = "force-static"`, API routes are forbidden, and Apache needs `.htaccess` with
   `ForceType image/png` for the extensionless `opengraph-image`/`apple-icon`. (Currently NOT used —
   we're on Vercel with the full SSR app.)

---

## 8. Mobile rules (desktop is SIGNED OFF)

⚠️ **Do not change anything ≥768px.** Scope all mobile work to ≤768px using `md:` prefixes, or by
lowering `clamp()` minimums (which only affect narrow widths).

Current mobile treatment: fullscreen opaque menu (56px targets, staggered CSS transitions, visible X) ·
hero = badge + headline + paragraph + 2 CTAs only · footer accordion (`FooterSection`) · tech stack as
swipeable chips (not marquee) · stats 2-col/3 items · **form inputs 16px** (prevents iOS zoom) · fewer
hero-canvas particles + lower aurora blur.
**Verified: no horizontal overflow at 320/360/375/390/412/430/768.**

---

## 9. Content & SEO

- JSON-LD: **Organization** (layout) · **WebSite + FAQ** (home) · **Breadcrumb + SoftwareApplication** (case studies)
- Generated **OG image** + **apple-icon** via `next/og` `ImageResponse`; favicon = `src/app/icon.svg`
  (SVG recreation of the plug emblem). Official wordmark: `public/swiftcode-logo.png`
  (teal, brightened via CSS `filter: brightness(1.28)` so it reads on dark).
- Security headers + `poweredByHeader: false` in `next.config.ts`.
- Legal set: Privacy · POPIA · PAIA · Terms — all finalised with the CIPC number, **no draft banners**.
  Written original (modelled on reference structure only). Information Officer = CEO.

---

## 10. Next steps (open)

1. **Case-study logos** — drop `aiducate.png`, `tectarch.png`, `mute-it.png` into `public/logos/`
   (`LogoImg` hides gracefully until they exist). See `public/logos/README.md`.
2. **Analytics** — set `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID` (the `Analytics` component is env-gated; nothing loads without them).
3. **Optional 2nd mobile polish pass** — card padding, section rhythm, case-study "one at a time".
4. **Optional** — legal counsel review of the legal pages (banners removed at user's instruction).
5. **Insights/blog** — page is currently an empty state; needs real articles.

---

## 11. Working style that worked

Verify visually before declaring done · content lives in `site.ts` · build (`npm run build`) before every
commit · push to deploy · be honest about traction (0 live apps) · keep desktop untouched when doing mobile.
