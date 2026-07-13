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
