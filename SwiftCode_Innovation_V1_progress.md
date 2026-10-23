# SwiftCode Innovation — V1 Engineering Baseline

**Status:** ✅ LIVE at https://www.swiftcode.co.za · **Last updated:** 23 October 2026 (V1.3 security remediation)
**This file is the permanent context for all future development. Read it first.**

> **✅ DNS fixed 13 Oct 2026:** GoDaddy Domain Forwarding (`swiftcode.co.za → WWW…`, 301) was removed,
> which deleted its two stray `A` records. Bare domain now resolves only to Vercel, has a valid cert, and
> 308-redirects to `www` (12/12 requests OK; Vercel shows all 3 domains *Valid Configuration*). See §7.10.

> **V1.3.1 (23 Oct 2026):** HSTS `preload` removed (email.swiftcode.co.za webmail has no HTTPS cert; never
> preload) · `.github/dependabot.yml` weekly npm PRs · logos resized to ~3× display size (originals in git
> history; keep new logos ≤ ~1300px long edge) · POPIA operator register in
> `05 SwiftCode Innovation\05 Company Documentation\POPIA & Operator Agreements\`.
>
> **V1.3 changelog (security, 23 Oct 2026):** full audit → `SECURITY_COMPLIANCE.md` + `SYSTEM_ARCHITECTURE.md`
> (read both before adding any feature that stores data, sets cookies, adds a route, calls AI or loads a
> third-party script) · Next.js 16.2.10 → **16.4.2** (prod `npm audit` = 0) · **Content-Security-Policy** +
> COOP + `X-Frame-Options: DENY` in `next.config.ts` (§7.14) · analytics now **opt-in consent** gated
> (`analytics-consent.tsx`, footer "Cookie settings") · contact form: accurate POPIA notice + Privacy link,
> `maxLength` + capped payload, focus moves to first invalid field · Privacy Policy names Vercel/Web3Forms,
> cross-border, no-marketing-without-consent, cookies (Oct 2026) · USSD caption "Simulated sample content"
> · `.gitignore` hardened.
>
> **V1.2 changelog (cleanup):** ESLint now 0 problems (fixed 4 React-19 `set-state-in-effect` errors +
> 1 unused import — see §7.11) · canonical/sitemap/robots/OG/JSON-LD moved to the `www` primary (§7.12) ·
> USSD phone: no float animation (moving tap targets), 264×620 frame so keypad/Restart never clip, 44px
> menu rows, 8px keypad gaps, hint moved to a caption · real case-study logos live via shared
> `ProjectLogo` (AIDucate = rounded tile, others = white plate) · removed 5 unused create-next-app SVGs ·
> README rewritten (was stale: wrong tagline, `info@`, old Vercel IP).
>
> **V1.1 changelog:** interactive USSD simulator, qualitative pipeline badges (no more `0`),
> mobile slide-over drawer + persistent sticky CTA, consultation modal (portalled), capability/industry
> hover polish, founding year → 2023. Mute IT case study now live-linked (`muteit.co.za`); USSD demo
> carrier label is generic "NetProvider" (network-agnostic marketing).

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
**Client work:** TectArch (`tectarch.co.za`, live), Mute IT (`muteit.co.za`, **live** — `urlStatus: "live"`).

---

## 3. Stack

- **Next.js 16.4.2** (App Router, Turbopack) · **React 19.2.4** · **TypeScript**
- **Tailwind CSS v4** — CSS-first `@theme` in `globals.css`; **no `tailwind.config.js`**
- **motion** (framer-motion successor) — used sparingly, see §7.2
- **lucide-react** icons, **clsx**
- **Fonts:** `next/font` (Space Grotesk display + Inter body) — self-hosted at build (POPIA-friendly, no runtime Google call)
- **Contact form:** Web3Forms (client-side POST, no backend)
- **Host:** Vercel (full SSR/Node app). **Domain at GoDaddy = registrar only**; DNS points to Vercel.

---

## 4. Repo & deploy pipeline

- **Local:** `D:\TectArch\TectArch Business - 04 Mute IT\08 Websites\swiftcode-innovation`
  (moved from `C:\Users\atums\Documents\Claude\swiftcode-innovation` on 14 Oct 2026 to free C: space —
  the old C: copy is deleted. GitHub/Vercel are path-independent, so nothing changed there.)
  After a fresh clone/copy: `npm ci` (node_modules and `.next` are never copied/committed).
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
                   aiducate-showcase · ussd-simulator (interactive) · consultation-cta (modal) ·
                   reveal · counter · magnetic · mouse-glow · logo · logo-img (LogoImg + ProjectLogo) · icon · ui ·
                   page-header · legal · contact-form · analytics
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
   (`C:/Program Files/Google/Chrome/Application/chrome.exe`). **Install puppeteer-core in the session
   scratchpad (its own `npm init`), not the project** — `package.json` stays untouched and nothing needs
   cleaning up. Serve the build with `npx next start -p 3100` (own port). ⚠️ **Never
   `taskkill //IM node.exe`** — other sessions run dev servers in this folder; kill only your own port's
   PID. Always verify visually; several bugs were invisible in code.
8. **`will-change: transform` ALSO traps `position: fixed`** (same family as #3). `Reveal` sets
   `will-change: transform`, so any modal/overlay rendered *inside* a `Reveal` is trapped and mis-layered.
   **Render modals via `createPortal(…, document.body)`** — see `consultation-cta.tsx`. (This bit the
   consultation modal: the nav painted over it until portalled.)
9. **If ever reverting to static export** (`output: "export"` for cPanel): metadata routes need
   `export const dynamic = "force-static"`, API routes are forbidden, and Apache needs `.htaccess` with
   `ForceType image/png` for the extensionless `opengraph-image`/`apple-icon`. (Currently NOT used —
   we're on Vercel with the full SSR app.)
10. **DNS: GoDaddy forwarding/parking adds stray `A` records.** Diagnosed 13 Oct 2026: `@` resolved to
    `216.198.79.1` (Vercel ✅) **and** `3.33.251.168` + `15.197.225.128` (GoDaddy ❌). DNS round-robin sent
    most bare-domain visitors to GoDaddy (TLS fail), and Let's Encrypt validation failed so Vercel had no
    cert for the bare domain (`curl` exit 60 via Vercel's IP). **Correct records:** `A @ 216.198.79.1`
    *only* + `CNAME www → <project>.vercel-dns-0xx.com`; Domain Forwarding OFF; never touch MX/TXT.
    Check with: `curl -s "https://dns.google/resolve?name=swiftcode.co.za&type=A"`.
    **Resolved** by deleting the forwarding rule (GoDaddy → Domain Portfolio → swiftcode.co.za → DNS →
    *Forwarding*), which auto-removed both stray records. **Never re-add GoDaddy forwarding** — Vercel
    already does the bare→`www` redirect. Vercel project: `vercel.com/swift-code-innovation/swiftcode-innovation`.
    Email is GoDaddy-hosted (MX `smtp`/`mailstore1.secureserver.net`, `email` CNAME, 2 DKIM CNAMEs).
11. **React 19 lint (`react-hooks/set-state-in-effect`)** — never call `setState` synchronously in an
    effect body. House patterns: reset-on-prop-change → *adjust state during render* with a `prev` value
    (`nav.tsx`); one-off show → `requestAnimationFrame(() => setX(...))` (`reveal.tsx`); reduced-motion →
    *derive* the value instead of setting it (`counter.tsx`); "is client?" → `useSyncExternalStore`
    (`consultation-cta.tsx`). Keep `npm run lint` at **0 problems** (it does not block `next build`, so
    check it explicitly).
12. **Canonical origin = `www`.** Vercel's primary domain is `www.swiftcode.co.za` (bare 308-redirects),
    so `site.url` is `https://www.swiftcode.co.za` — canonical, sitemap, robots, OG and JSON-LD must not
    point at a redirect. `site.domain` stays `swiftcode.co.za` for *display*.
13. **Interactive elements must not animate position.** The USSD phone lost its `animate-float` once it
    became tappable (moving tap targets). Its frame is sized (264×620) so the dialog never clips the
    keypad; the dialog area is `min-h-0 flex-1 overflow-y-auto` as a safety net.
14. **The CSP blocks every host it doesn't list.** Any new third-party script, API, iframe or image host
    must be added in `next.config.ts` or it silently fails (check the console for "Content Security
    Policy"). Analytics/Cal.com hosts are added automatically only when their env var / `site.scheduling`
    is set. Inline scripts stay allowed (static pages, no nonces). Analytics must stay behind
    `AnalyticsConsent` — never load trackers directly. See `SECURITY_COMPLIANCE.md` §7.

---

## 8. Mobile rules (desktop is SIGNED OFF)

⚠️ **Do not change anything ≥768px.** Scope all mobile work to ≤768px using `md:` prefixes, or by
lowering `clamp()` minimums (which only affect narrow widths).

Current mobile treatment: **right-anchored slide-over drawer** (52px+ targets, CSS-transition slide,
close X in header) · **persistent sticky "Start a project" CTA fixed at viewport bottom** (`sm:hidden`,
rendered from `Nav` fragment; layout has a `h-[72px] sm:hidden` spacer for clearance) · hero = badge +
headline + paragraph + 2 CTAs · footer accordion (`FooterSection`) · tech stack swipeable chips · stats
2-col/3 items · **form inputs 16px** (prevents iOS zoom) · fewer hero-canvas particles + lower aurora blur.
**Verified (V1.2): no horizontal overflow at 320/360/375/390/412/430/768/1024/1440.**

---

## 9. Content & SEO

- JSON-LD: **Organization** (layout) · **WebSite + FAQ** (home) · **Breadcrumb + SoftwareApplication** (case studies)
- Generated **OG image** + **apple-icon** via `next/og` `ImageResponse`; favicon = `src/app/icon.svg`
  (SVG recreation of the plug emblem). Official wordmark: `public/swiftcode-logo.png`
  (teal, brightened via CSS `filter: brightness(1.28)` so it reads on dark).
- Security headers (CSP, HSTS, COOP, etc.) + `poweredByHeader: false` in `next.config.ts`.
- Legal set: Privacy · POPIA · PAIA · Terms — all finalised with the CIPC number, **no draft banners**.
  Written original (modelled on reference structure only). Information Officer = CEO.

---

## 10. Next steps (open)

0. ~~Fix GoDaddy DNS~~ — ✅ done 13 Oct 2026 (forwarding removed; see §7.10).
1. ~~Case-study logos~~ — ✅ done (V1.2): all three live via `ProjectLogo`; see `public/logos/README.md`.
2. **Analytics** — set `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID` in Vercel and redeploy. A consent prompt then appears; nothing loads until a visitor accepts, and the CSP widens automatically.
2b. **Consultation calendar** — set `site.scheduling` in `src/lib/site.ts` to a Cal.com / Calendly URL
    and the consultation modal embeds a live booking iframe (currently `""` → shows email/WhatsApp fallback).
3. **Optional 2nd mobile polish pass** — card padding, section rhythm, case-study "one at a time".
4. **Optional** — legal counsel review of the legal pages (banners removed at user's instruction).
5. **Insights/blog** — page is currently an empty state; needs real articles.
6. **Owner security actions** (`SECURITY_COMPLIANCE.md` §6): 2FA on GitHub/Vercel/GoDaddy/Web3Forms/mailbox,
   GitHub secret scanning + Dependabot, **Vercel Pro** (Hobby = non-commercial only), mailbox retention rule.

---

## 11. Working style that worked

Verify visually before declaring done · content lives in `site.ts` · `npm run build` **and**
`npm run lint` (0 problems) before every commit · push to deploy, then confirm the live site serves the
new build · be honest about traction (0 live apps) · keep desktop untouched when doing mobile ·
check DNS with the DoH one-liner in §7.10 when anything domain-related looks off.
