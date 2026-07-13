import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Emblem drawn in cyan for contrast on the dark card.
const emblem = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#18E0FF" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="50" r="42" stroke-dasharray="255 8" transform="rotate(-8 50 50)"/><path d="M12 50 H30"/><rect x="30" y="41" width="16" height="18" rx="2"/><path d="M46 45.5 H54 M46 54.5 H54"/><rect x="57.5" y="39" width="14.5" height="22" rx="2"/><path d="M72 50 H90"/></svg>`,
)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1000px 500px at 15% -10%, rgba(30,107,255,0.45), transparent 60%), radial-gradient(900px 500px at 100% 110%, rgba(24,224,255,0.30), transparent 60%), #05070b",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={emblem} width={64} height={64} alt="" />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#eef4fb", letterSpacing: "-0.02em" }}>
            SwiftCode Innovation
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, color: "#ffffff", lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: "900px" }}>
            We Research. We Build. We Transform.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#a6b6ca", maxWidth: "980px" }}>
            Researching real-world challenges before engineering the future.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#18E0FF", fontWeight: 600 }}>{site.domain}</div>
          <div style={{ display: "flex", fontSize: 22, color: "#5d7186" }}>Research-first · Innovation Lab · Boksburg, ZA</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
