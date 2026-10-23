# SwiftCode Innovation Website — System Architecture

**Scope:** the public marketing site at https://www.swiftcode.co.za
**Last reviewed:** 23 October 2026 · **Version:** V1.3 (security remediation; see `SECURITY_COMPLIANCE.md` §8)
**Companion documents:** `SECURITY_COMPLIANCE.md` (threat model and audit), `SwiftCode_Innovation_V1_progress.md` (engineering baseline)

> **In plain English:** this is a brochure website. It has no database, no user accounts, no logins,
> no AI agents and no payments. Every page is built ahead of time and served as a static file. The only
> personal information it touches is what a visitor types into the contact form, which goes straight
> from their browser to an email-forwarding service (Web3Forms) and lands in `admin@swiftcode.co.za`.
> That small footprint is the main reason the site's risk profile is low.

---

## 1. System overview

```
                         ┌───────────────────────────── Vercel (host) ─────────────────────────────┐
 Visitor's browser ──────►  Edge / CDN  ──►  Pre-rendered HTML, JS, CSS, fonts, images              │
   │   HTTPS only (HSTS)  │  security headers from next.config.ts                                    │
   │                      └──────────────────────────────────────────────────────────────────────────┘
   │
   ├── Contact form (POST, JSON) ──────────► api.web3forms.com ──► email to admin@swiftcode.co.za
   │                                                               (GoDaddy-hosted mailbox)
   ├── "WhatsApp us" link (user-initiated) ► wa.me/27748328272
   ├── mailto: links (user-initiated) ─────► visitor's own mail app
   ├── Outbound links ─────────────────────► tectarch.co.za, muteit.co.za, LinkedIn, GitHub,
   │                                         inforegulator.org.za (all rel="noopener noreferrer")
   └── OPTIONAL, currently OFF ────────────► Google Analytics 4 / Microsoft Clarity
                                             (need NEXT_PUBLIC_GA_ID / _CLARITY_ID set AND visitor opt-in)
                                             Cal.com booking iframe (only if site.scheduling is set)

 Source & deploy:  GitHub (AtuMsiska/swiftcode-innovation, branch main) ──push──► Vercel build ──► live
 DNS:              GoDaddy (registrar + DNS only). A @ → 216.198.79.1, CNAME www → Vercel.
```

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript | All routes prerendered (static or SSG) |
| Styling | Tailwind CSS v4, `motion`, `lucide-react` | No runtime CSS-in-JS |
| Fonts | `next/font` (Space Grotesk, Inter) | Self-hosted at build: no request to Google at runtime |
| Hosting | Vercel (Hobby plan) | Auto-deploys every push to `main` |
| Forms | Web3Forms (third-party SaaS) | Browser posts directly; there is no SwiftCode server code |
| Email | GoDaddy-hosted mailboxes (`admin@`, `it@`) | MX/TXT records at GoDaddy |
| Analytics | GA4 / Microsoft Clarity, **disabled** | Off in production. If enabled, load only after opt-in (`analytics-consent.tsx`) |
| Browser security | Content-Security-Policy + headers in `next.config.ts` | Only listed hosts can run scripts or receive data |

**What is deliberately absent:** a backend API, a database, authentication, sessions, cookies set by
SwiftCode (the only browser storage is the analytics consent choice, and only when analytics are enabled), server actions, middleware or proxy, AI or LLM calls, payments, file uploads, and any
blockchain or ledger component.

---

## 2. Agent communication flow

**Not applicable.** The site contains no AI agents, no LLM calls, and no automated actions on a
visitor's behalf. The "AIDucate" phone on the home page is a **scripted front-end simulation**
(`src/components/ussd-simulator.tsx`): a fixed set of menu screens held in the browser that never calls
a server, a mobile network or an AI model.

If AI features are added later (for example a chat assistant), they must follow the agent rules in
`SECURITY_COMPLIANCE.md` §7 and be documented here first.

---

## 3. Data model

There is no database. Data exists in only two forms.

### 3.1 Static content (public, in the source code)

`src/lib/site.ts` is the single source of truth: company details, navigation, services, case studies,
FAQs and industries. Everything in it is public by design (company address, CIPC number, business
phone/WhatsApp, director names). **Never put anything in `site.ts` that is not meant for the public:**
it ships to every browser.

### 3.2 Contact-form submission (personal information, in transit only)

| Field | Required | Classification | Purpose |
|---|---|---|---|
| `name` | Yes | Personal information (POPIA) | Address the reply |
| `email` | Yes | Personal information (POPIA) | Reply to the enquiry |
| `company` | No | Business information | Context |
| `interest` | No (fixed list) | Non-personal | Route the enquiry |
| `message` | Yes | Free text, **may contain** personal information | The enquiry itself |
| `botcheck` | Hidden honeypot | Non-personal | Spam filtering |
| `access_key` | Auto | **Public** identifier (not a secret) | Tells Web3Forms which inbox to deliver to |

**Lifecycle:** browser → HTTPS POST to `api.web3forms.com/submit` → Web3Forms emails it to
`admin@swiftcode.co.za` → it is retained in that mailbox. The website itself stores **nothing**: no
`localStorage`, `sessionStorage`, cookies or server logs of form content. Web3Forms and the mailbox
provider are **operators** under POPIA (see `SECURITY_COMPLIANCE.md` §4).

### 3.3 Automatically collected technical data

Vercel keeps standard request logs (IP address, user agent, path, time) for operating the CDN. This is
controlled by Vercel's retention policy, not by this codebase. No analytics are collected while the
GA/Clarity environment variables are unset.

---

## 4. Trust boundaries

| # | Boundary | What crosses it | Control |
|---|---|---|---|
| B1 | Internet → Vercel | Page requests | HTTPS only, HSTS, CSP + security headers, static output (nothing to inject into) |
| B2 | Browser → Web3Forms | Contact-form PII | HTTPS; CSP `connect-src` allows only this host; validation + length caps; honeypot; Web3Forms spam filtering |
| B3 | GitHub → Vercel | Source code → build | Only pushes to `main` deploy; GitHub account security (2FA) is the key control |
| B4 | GoDaddy DNS → Vercel | Domain resolution | Exact A/CNAME records; GoDaddy account 2FA; **never enable Domain Forwarding** |
| B5 | Browser → optional third parties | Analytics, Cal.com | Off today. Analytics need opt-in consent; CSP admits a vendor's hosts only when it is configured |

---

## 5. Configuration and secrets

| Setting | Where | Secret? |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Vercel env (optional); a default is built into `contact-form.tsx` | **No.** Web3Forms keys are public by design |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | Vercel env | No (public IDs). Currently unset |
| `site.scheduling` | `src/lib/site.ts` | No. Currently empty |

Anything prefixed `NEXT_PUBLIC_` is **embedded in the browser bundle and visible to everyone**. A real
secret (an API key with spending power, a database URL or a private key) must **never** use that prefix
and, on this site, has nowhere to live: adding one means adding a backend, which needs a fresh security
review first. `.env*` files are git-ignored.

---

## 6. Blockchain / ledger verification layer

**Not applicable.** The site records no transactions, contracts or state changes that would need
tamper-evident auditing. Adding a ledger would raise cost and complexity without reducing any real risk.
Revisit only if the site starts handling signed agreements, payments or regulated records.

---

## 7. Deployment pipeline

1. Develop locally in `D:\TectArch\TectArch Business - 04 Mute IT\08 Websites\swiftcode-innovation`.
2. `npm run build` and `npm run lint` must pass.
3. Commit and push to `main` on GitHub.
4. Vercel builds and swaps the live site atomically. Earlier deployments stay available for instant rollback in the Vercel dashboard.

**Third-party rule:** a new external service will be **blocked by the CSP** until its host is added in
`next.config.ts` (see `SECURITY_COMPLIANCE.md` §7).

**Change rule:** any feature that adds a server route, stores data, sets a cookie, calls an AI model or
loads a new third-party script must update this file and `SECURITY_COMPLIANCE.md` **before** it ships.
