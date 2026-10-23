import type { NextConfig } from "next";
import { site } from "./src/lib/site";

// Full Next.js app (SSR/Node) for Vercel. Security headers are served by the
// Node runtime here (no static-export / .htaccess needed).
// See SECURITY_COMPLIANCE.md for the reasoning behind each header.

const isDev = process.env.NODE_ENV !== "production";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

// Third-party origins are allowed ONLY when the feature that needs them is
// switched on (analytics env vars / site.scheduling). Nothing extra otherwise.
// 'unsafe-inline' scripts: Next.js hydration + JSON-LD (pages are static, so no nonces).
const scriptSrc = ["'self'", "'unsafe-inline'"];
const connectSrc = ["'self'", "https://api.web3forms.com"];
const imgSrc = ["'self'", "data:", "blob:"];
const frameSrc: string[] = [];

if (isDev) scriptSrc.push("'unsafe-eval'"); // React dev tooling only — never in production
if (gaId) {
  scriptSrc.push("https://www.googletagmanager.com");
  connectSrc.push("https://*.google-analytics.com", "https://*.analytics.google.com", "https://www.googletagmanager.com");
  imgSrc.push("https://*.google-analytics.com", "https://www.googletagmanager.com");
}
if (clarityId) {
  scriptSrc.push("https://www.clarity.ms", "https://*.clarity.ms");
  connectSrc.push("https://*.clarity.ms", "https://c.bing.com");
  imgSrc.push("https://*.clarity.ms", "https://c.bing.com");
}
if (site.scheduling) frameSrc.push(new URL(site.scheduling).origin);

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src ${imgSrc.join(" ")}`,
  "font-src 'self'",
  `connect-src ${connectSrc.join(" ")}`,
  `frame-src ${frameSrc.length ? frameSrc.join(" ") : "'none'"}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
