"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";

/**
 * Opt-in consent for analytics. Only mounted when an analytics ID is configured
 * (see analytics.tsx). Nothing third-party loads until the visitor accepts;
 * Decline and Accept carry equal weight (no dark patterns).
 *
 * The stored value is just the choice ("granted" / "denied"), not personal
 * information, so browser storage is acceptable here (SECURITY_COMPLIANCE.md).
 */
const KEY = "sc-analytics-consent";
const EVENT = "sc:consent-change";
type Choice = "granted" | "denied" | null;

function read(): Choice {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return "denied"; // storage blocked → treat as declined, never as consent
  }
}

function write(choice: Choice) {
  try {
    if (choice) localStorage.setItem(KEY, choice);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked — choice lasts for this page view only */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Re-open the consent prompt (used by the footer "Cookie settings" link). */
export function resetConsent() {
  write(null);
}

/** Remove first-party analytics cookies after consent is withdrawn. */
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!/^(_ga|_gid|_gat|_clck|_clsk|CLID|MUID)/.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

export function AnalyticsConsent({ gaId, clarityId }: { gaId?: string; clarityId?: string }) {
  // Server render + hydration: "denied" (renders nothing); real value after mount.
  const choice = useSyncExternalStore<Choice>(subscribe, read, () => "denied");

  function decide(next: "granted" | "denied") {
    const w = window as Window & { dataLayer?: unknown; clarity?: unknown };
    const scriptsLoaded = Boolean(w.dataLayer || w.clarity);
    write(next);
    if (next === "denied" && scriptsLoaded) {
      // Scripts already running can't be unloaded — clear their cookies and reload clean.
      clearAnalyticsCookies();
      location.reload();
    }
  }

  return (
    <>
      {choice === "granted" && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {choice === "granted" && clarityId && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}

      {choice === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Analytics cookies"
          className="fixed inset-x-4 bottom-[84px] z-[70] mx-auto max-w-[560px] rounded-2xl border border-[var(--color-line-strong)] bg-navy-2/95 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md sm:bottom-6"
        >
          <p className="text-[14px] leading-relaxed text-body">
            May we use analytics cookies to understand how visitors use this site? They&apos;re optional
            and off unless you agree. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-cyan">Privacy Policy</Link>.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="min-h-[44px] cursor-pointer rounded-xl border border-[var(--color-line-strong)] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-white/5"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="min-h-[44px] cursor-pointer rounded-xl border border-[var(--color-line-strong)] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-white/5"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link that re-opens the consent prompt so visitors can change their mind. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  );
}
