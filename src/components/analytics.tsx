import { AnalyticsConsent } from "@/components/analytics-consent";

/**
 * Privacy-aware analytics. Two gates, both required before anything loads:
 * 1. the env var is set (NEXT_PUBLIC_GA_ID and/or NEXT_PUBLIC_CLARITY_ID), and
 * 2. the visitor has opted in via the consent prompt (decline is the default).
 * With no env vars set (the production default) this renders nothing at all —
 * no prompt, no scripts. The CSP in next.config.ts only allows these hosts
 * when the matching env var is set.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!gaId && !clarityId) return null;
  return <AnalyticsConsent gaId={gaId} clarityId={clarityId} />;
}

/** True when any analytics provider is configured (drives the footer "Cookie settings" link). */
export const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_CLARITY_ID);
