# SwiftCode Innovation Website — Security & Compliance

**Scope:** https://www.swiftcode.co.za (this repository)
**Audit:** 23 October 2026 on commit `06d4d99` · **Remediation:** 23 October 2026 (V1.3, see §8)
**Live site checked:** response headers, loaded scripts, robots.txt · **Companion:** `SYSTEM_ARCHITECTURE.md`

> **Summary for the founder:** the site is low-risk by design: no database, no logins, no stored
> customer data, no secrets in the code. The audit found no exposed secrets and no unsafe storage of
> personal data. All code-level findings are now **fixed** (V1.3): framework upgraded (0 production
> vulnerabilities), Content Security Policy added, analytics locked behind opt-in consent, and the
> privacy wording corrected. **Still open (owner actions, not code):** confirm 2FA is on for every account (§6 C1), and
> move hosting to **Vercel Pro (≈ US$20 a month)**, because the free Hobby plan is for non-commercial use only.

---

## 1. Data classification

| Class | Examples on this site | Where it lives | Handling rule |
|---|---|---|---|
| **Public** | Company facts, services, case studies, business phone/WhatsApp, CIPC no., director names | `src/lib/site.ts`, pages | Fine to publish. Anything in the source ships to every browser |
| **Public identifiers** | Web3Forms access key, GA/Clarity IDs | Code / Vercel env | Not secrets, but don't confuse them with secrets |
| **Personal information (POPIA)** | Contact-form name, email, free-text message | In transit → Web3Forms → `admin@` mailbox | Minimum fields only, length-capped; never logged or stored by the site |
| **Technical data** | IP address, user agent (Vercel request logs) | Vercel | Vercel's retention policy; disclosed in the privacy notice |
| **Consent choice** | `sc-analytics-consent` = `granted` / `denied` | Visitor's `localStorage` (only if analytics are enabled) | Not personal information. Holds the visitor's choice only, nothing that identifies them |
| **Secrets** | GitHub, Vercel, GoDaddy, Web3Forms account logins | Password manager + 2FA | **Never** in code, `.env.example`, docs or chat |

**Data minimisation:** the form asks for 3 required fields (name, email, message) and 2 optional ones
(company, interest). There is no phone number, ID number or address, and every value is trimmed and
length-capped before sending. ✅

---

## 2. Threat model

Method: STRIDE, applied to the trust boundaries in `SYSTEM_ARCHITECTURE.md` §4.

| # | Threat | Asset | Likelihood | Impact | Control (V1.3) | Residual |
|---|---|---|---|---|---|---|
| T1 | **Account takeover** of GitHub, Vercel or GoDaddy → defaced site, phishing pages or hijacked email (MX) | Brand, email, visitors | Medium | **High** | Depends on 2FA | **Highest remaining risk.** Enforce 2FA (C1) |
| T2 | Framework vulnerability | Availability, integrity | Low | Medium | Next.js 16.4.2; `npm audit --omit=dev` = 0 | Low; monthly audit (C4) |
| T3 | Cross-site scripting via injected script | Visitors | Low | Medium | React escaping; static JSON-LD; **CSP** blocks external scripts and exfiltration to unknown hosts | Low |
| T4 | Contact-form spam or abuse of the public Web3Forms key | `admin@` inbox | High | Low | Honeypot; length caps; Web3Forms spam filter | Accepted; add captcha if spam grows (F5) |
| T5 | Clickjacking | Visitors | Low | Low | `frame-ancestors 'none'` + `X-Frame-Options: DENY` | Negligible |
| T6 | DNS hijack or misconfiguration | Domain, TLS, email | Low | High | Documented records; GoDaddy forwarding removed | GoDaddy 2FA + domain lock (C1) |
| T7 | Third-party script compromise or tracking without consent | Visitors, PII | Low | Medium | Analytics off; when on, they load **only after opt-in** and only CSP-allowed hosts | Low |
| T8 | Privacy-law non-compliance | Legal / reputation | Low | Medium | Accurate form notice + privacy policy naming operators and transfers | Process items C6–C7 |
| T9 | Reliance on simulated demo content | Legal / reputation | Low | Low | Demo labelled "Simulated sample content, not real grant or health advice" | Negligible |
| T10 | Secret committed to the **public** GitHub repo | Any account the secret unlocks | Low | High | `.env*`, `*.pem`, `*.key`, `*.p12` git-ignored; history clean | Enable secret scanning / push protection (C3) |

---

## 3. Audit against the project security rules

| Rule (from the project brief) | Status | Evidence |
|---|---|---|
| No tokens, PII or session IDs in `localStorage` / `sessionStorage` | ✅ Pass | No tokens or PII in browser storage. Only the non-identifying consent choice, and only when analytics are enabled |
| Secure, HttpOnly, SameSite cookies for auth | ➖ N/A | No authentication; the site sets no cookies |
| No hard-coded secrets | ✅ Pass | Only the Web3Forms key is in code, and it is **public by design**. Git history scanned: no secrets found |
| Credentials via environment variables | ✅ Pass | `NEXT_PUBLIC_*` env vars for public IDs; `.env*` git-ignored |
| `.gitignore` excludes `.env`, secrets, logs, `.pem`, `node_modules`, `__pycache__` | ✅ Pass | Added `*.log`, `*.key`, `*.p12`, `__pycache__/`, `.venv/` |
| CORS restricted; never `*` on authenticated routes | ➖ N/A | No API routes. CSP `connect-src` limits where the page may send data |
| Parameterised DB access (ORM) | ➖ N/A | No database |
| Validate every incoming payload | ✅ Pass (client side) | Required fields, email format, `maxLength`, trim + cap before send. Final validation happens at Web3Forms (no SwiftCode backend) |
| AI agents: least privilege, prompt-injection filtering | ➖ N/A | No AI on the site; the USSD phone is a scripted simulation |
| Blockchain / tamper-evident ledger | ➖ N/A | No transactions or records to anchor |
| Liability disclaimers where guidance is given | ✅ Pass | Terms + Privacy; USSD demo labelled as simulated |
| Data minimisation | ✅ Pass | 3 required fields, capped lengths; nothing logged by the site |
| Opt-in for analytics, third-party AI and tracking | ✅ Pass | Double gate: env var **and** visitor opt-in (decline-default, equal-weight buttons, "Cookie settings" to withdraw; withdrawal clears analytics cookies) |
| HTTPS / transport security | ✅ Pass | HSTS 2 years + includeSubDomains + preload; apex 308 → www; `upgrade-insecure-requests` |
| Security headers | ✅ Pass | CSP, nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, COOP; `X-Powered-By` removed |
| Outbound links safe | ✅ Pass | All `target="_blank"` links carry `rel="noopener noreferrer"` |
| Third-party requests minimised | ✅ Pass | Fonts self-hosted; only Web3Forms on submit |
| Dependencies free of known vulnerabilities | ✅ Pass (production) | `npm audit --omit=dev`: 0. Five dev-only advisories remain in the ESLint toolchain (`braces` via `@next/eslint-plugin-next`); no patched version exists, and that code never ships to visitors |

---

## 4. Legal and liability review

**POPIA (Protection of Personal Information Act, South Africa): applies.** SwiftCode is the
*responsible party* for contact-form data.

| POPIA requirement | Status | Notes |
|---|---|---|
| s18 Notification | ✅ | Form notice states purpose, names Web3Forms, and links the Privacy Policy |
| s19 Security safeguards | ✅ / Process | Code-level controls done; account 2FA outstanding (C1) |
| s20–21 Operators under written agreement | Process | Web3Forms, Vercel, GoDaddy named in the Privacy Policy §7. Keep their accepted terms/DPAs on file (C7) |
| s72 Cross-border transfer | ✅ | Privacy Policy §9 names Vercel (US) and Web3Forms as processing outside SA |
| s14 Retention | Process | Set a mailbox rule for stale enquiries, e.g. 24 months (C6) |
| s69 Direct marketing | ✅ | Policy §10: website enquirers are not added to marketing lists without separate consent |
| s55 Information Officer registered | Verify | Confirm registration on the Information Regulator eServices portal |
| PAIA manual published | ✅ | `/paia` |

**GDPR (EU):** largely not applicable (no EU targeting). The opt-in consent model already meets the
GDPR standard if EU marketing starts.
**CCPA (California):** not applicable (thresholds not met).

**Contract and hosting liability:**
- **Vercel Hobby plan:** Vercel's terms restrict Hobby to personal, non-commercial use, and a company
  marketing site is commercial. **Move to Vercel Pro (≈ US$20 per member per month).** This is a
  purchase decision for the account owner; it was not changed as part of this work.
- Terms of Use (`/terms`) include liability limitations. Have a South African attorney review them once.
  This document is a technical review, not legal advice.

---

## 5. Findings register

| ID | Severity | Finding | Status (23 Oct 2026) |
|---|---|---|---|
| F1 | High | `next@16.2.10` had published advisories (incl. critical middleware bypass; not exploitable here) | ✅ **Fixed**: next + eslint-config-next 16.4.2, `npm audit fix`; production audit = 0 |
| F2 | Medium | No Content-Security-Policy | ✅ **Fixed**: CSP in `next.config.ts` (see §7). Verified on all 16 routes: 0 violations; unknown hosts blocked |
| F3 | Medium (legal) | GA/Clarity would load without consent if enabled | ✅ **Fixed**: `analytics-consent.tsx` opt-in prompt; CSP widens only when an ID is set. Tested accept, decline, reopen and withdraw |
| F4 | Medium (legal) | Form privacy wording inaccurate; operators/transfers not named | ✅ **Fixed**: new form notice + linked policy; Privacy Policy §7, §9, §10, §14 updated (dated October 2026) |
| F5 | Low | Public form key + no length limits → spam | ✅ Partly fixed: `maxLength` + capped payload. Captcha deferred (would add a third-party script and cookies); revisit if spam increases |
| F6 | Low | USSD demo captioned "Live demo" with SASSA/health content | ✅ **Fixed**: "Interactive demo" + "Simulated sample content, not real grant or health advice." |
| F7 | Info | HSTS `preload` is hard to undo | Open (advice): before submitting to hstspreload.org, confirm every subdomain works on HTTPS |
| F8 | Low | Cal.com iframe (when enabled) adds third-party cookies | ✅ Handled: `frame-src` allows only the configured scheduling origin; disclosed in Privacy §14 |
| F9 | Info | JSON-LD via `dangerouslySetInnerHTML` of static data | Accepted (safe while data is static) |
| F10 | Low | `.gitignore` gaps | ✅ **Fixed** |
| F11 | Info | GitHub repo is public | Accepted; secret scanning recommended (C3) |
| F12 | Low (a11y) | After a failed submit, focus didn't move to the first invalid field | ✅ **Fixed** (found during testing) |

---

## 6. Operational controls checklist (owner actions)

| ID | Control | Owner | Status |
|---|---|---|---|
| C1 | 2FA (authenticator app, not SMS) on **GitHub, Vercel, GoDaddy, Web3Forms** and the `admin@` mailbox; GoDaddy domain lock on | Atu | **Verify** |
| C2 | Only Atu (and the CTO) have write access to the repo and Vercel project | Atu | Verify |
| C3 | GitHub → Settings → Code security: secret scanning + push protection, Dependabot alerts | Atu | To do |
| C4 | Monthly: `npm audit --omit=dev`, review Vercel deployments, check DNS unchanged | Dev | Recurring |
| C5 | Web3Forms account email stays `admin@swiftcode.co.za`; rotate the key if the inbox is spammed | Atu | Ongoing |
| C6 | Mailbox retention rule for enquiries (POPIA s14) | Atu | To do |
| C7 | Operator terms/DPAs for Web3Forms, Vercel, GoDaddy saved in company records | Atu | To do |
| C8 | Vercel Pro plan (commercial use) | Atu | **Decision needed** |
| C9 | Any feature that stores data, sets cookies, adds a server route, calls AI or loads a third-party script → update both docs and re-audit **before** shipping | Dev | Rule |

---

## 7. Content-Security-Policy reference

Defined in `next.config.ts`. Production default (no analytics, no scheduling):

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://api.web3forms.com;
frame-src 'none'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';
manifest-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests
```

- `'unsafe-inline'` for scripts is needed because Next.js hydration and JSON-LD use inline scripts and
  every page is pre-rendered (nonces would force dynamic rendering). The CSP still blocks any
  **external** script and any connection to an unlisted host, which is where most real attacks get their
  power.
- Setting `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID` automatically adds only those vendors' hosts;
  setting `site.scheduling` adds only that booking origin to `frame-src`.
- **Adding any new third-party service means adding its host here**, or the browser will block it. Check
  the browser console for `Content Security Policy` errors after any such change.

---

## 8. Remediation log

| Date | Version | Change |
|---|---|---|
| 23 Oct 2026 | V1.3 | F1, F2, F3, F4, F5 (partial), F6, F8, F10, F12 fixed. Verified locally with a production build: all routes 200, 0 CSP violations, form validation + focus, consent accept/decline/reopen/withdraw (with a test GA ID), mobile 375px no overflow; then deployed and re-checked live headers |

---

## 9. Rules for future features

If the site grows beyond a brochure (client portal, AI chat, AIDucate sign-ups), these rules apply
from day one:

- **Auth:** server-managed sessions in `HttpOnly; Secure; SameSite=Strict` cookies. Never tokens in
  browser storage.
- **Secrets:** server-only env vars (no `NEXT_PUBLIC_` prefix), set in Vercel, never in code.
- **APIs:** validate every payload with a schema (Zod in TypeScript, Pydantic in Python); CORS
  allow-list `https://www.swiftcode.co.za` only; rate-limit public endpoints.
- **Data:** use an ORM or parameterised queries only; collect the minimum; document the retention period.
- **AI features:** least-privilege agents (no shell, no direct production-DB writes); filter user input
  for prompt injection; sanitise model output before rendering; show "AI-generated, verify before
  relying on it" disclaimers; get opt-in consent before sending user data to third-party AI APIs.
- **Tracking:** opt-in consent first, script second (`analytics-consent.tsx` is the pattern).
