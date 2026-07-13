import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const emblem = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#18E0FF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="50" r="42" stroke-dasharray="255 8" transform="rotate(-8 50 50)"/><path d="M12 50 H30"/><rect x="30" y="41" width="16" height="18" rx="2"/><path d="M46 45.5 H54 M46 54.5 H54"/><rect x="57.5" y="39" width="14.5" height="22" rx="2"/><path d="M72 50 H90"/></svg>`,
)}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(120px 120px at 30% 20%, rgba(30,107,255,0.5), transparent), #05070b",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={emblem} width={118} height={118} alt="" />
      </div>
    ),
    { ...size },
  );
}
