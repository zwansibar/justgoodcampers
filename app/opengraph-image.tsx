import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JustGoodCampers — Camper Rental New Zealand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#1A3C2E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#D4613C",
          }}
        />
        <div
          style={{
            fontSize: "72px",
            fontWeight: "700",
            color: "white",
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          JustGoodCampers
        </div>
        <div
          style={{
            fontSize: "30px",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Camper Rental · New Zealand
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
