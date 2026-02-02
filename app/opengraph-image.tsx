import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sebastian Rosnes Sørensen — Systemutvikler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0f14",
          color: "#e8e4df",
          fontFamily: "serif",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#3b82f6",
            marginBottom: 40,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Sebastian Rosnes
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          Sørensen
        </div>

        {/* Role */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#3b82f6",
            }}
          />
          <span
            style={{
              fontSize: 22,
              color: "#3b82f6",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Systemutvikler
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            fontStyle: "italic",
          }}
        >
          Ikke en typisk utvikler.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#94a3b8",
          }}
        >
          <span>sebastiansorensen.no</span>
          <span>Bergen, Norge</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
