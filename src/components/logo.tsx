import { site } from "@/lib/site";

/**
 * SwiftCode Innovation emblem — a faithful SVG recreation of the plug /
 * connector motif ("where technology meets innovation"). Tinted with the
 * site's cyan→royal gradient to harmonise with the dark theme.
 * Swap for the official raster asset in /public if preferred.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sc-emblem" x1="8" y1="8" x2="92" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#18E0FF" />
          <stop offset="1" stopColor="#1E6BFF" />
        </linearGradient>
      </defs>
      <g stroke="url(#sc-emblem)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="42" strokeDasharray="255 8" transform="rotate(-8 50 50)" />
        <path d="M12 50 H30" />
        <rect x="30" y="41" width="16" height="18" rx="2" />
        <path d="M46 45.5 H54 M46 54.5 H54" />
        <rect x="57.5" y="39" width="14.5" height="22" rx="2" />
        <path d="M72 50 H90" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  // Official wordmark lockup (public/swiftcode-logo.png). Falls back to the
  // emblem + text below if the asset is ever removed.
  return (
    <span className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/swiftcode-logo.png"
        alt={site.name}
        className="h-7 w-auto sm:h-8"
        style={{
          aspectRatio: "3195 / 432",
          // lift the teal wordmark so it reads crisply on the dark nav
          filter: "brightness(1.28) saturate(1.12) contrast(1.05)",
        }}
      />
    </span>
  );
}
