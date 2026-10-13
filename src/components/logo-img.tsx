"use client";

import { useState } from "react";

/**
 * Renders a project/brand logo from /public. If the file isn't present yet
 * (e.g. the official asset hasn't been dropped in), it fails gracefully and
 * renders nothing instead of a broken-image icon.
 *
 * `plate` wraps the logo in a clean white card (useful for placing colourful
 * brand marks on the dark theme).
 */
export function LogoImg({
  src,
  alt,
  className,
  plate = false,
  plateClassName = "",
}: {
  src?: string;
  alt: string;
  className?: string;
  plate?: boolean;
  plateClassName?: string;
}) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return null;

  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={src} alt={alt} className={className} loading="lazy" onError={() => setOk(false)} />;

  if (!plate) return img;
  return (
    <div className={`inline-flex items-center justify-center rounded-2xl bg-white/95 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ${plateClassName}`}>
      {img}
    </div>
  );
}

/**
 * A project's logo in the right treatment: wide wordmarks sit on a white
 * plate; square logos with their own background (`logoTile`) render as a
 * rounded tile. `card` = corner badge on case-study cards, `hero` = the large
 * lock-up in a case-study page's visual band.
 */
export function ProjectLogo({
  project,
  size,
}: {
  project: { name: string; logo?: string; logoTile?: boolean };
  size: "card" | "hero";
}) {
  const alt = `${project.name} logo`;
  if (project.logoTile) {
    return (
      <LogoImg
        src={project.logo}
        alt={alt}
        className={
          size === "card"
            ? "absolute left-6 top-6 z-[2] h-[52px] w-[52px] rounded-xl ring-1 ring-white/35 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.7)]"
            : "h-[clamp(96px,14vw,150px)] w-auto rounded-2xl border border-white/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
        }
      />
    );
  }
  return size === "card" ? (
    <LogoImg src={project.logo} alt={alt} plate plateClassName="absolute left-6 top-6 z-[2] px-3 py-2" className="h-7 w-auto" />
  ) : (
    <LogoImg
      src={project.logo}
      alt={alt}
      plate
      plateClassName="px-8 py-6 sm:px-12 sm:py-8"
      className="max-h-[clamp(56px,12vw,120px)] w-auto"
    />
  );
}
