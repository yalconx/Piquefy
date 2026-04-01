import { ImageResponse } from "next/og";

export const config = { runtime: "edge" };

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 30%, rgba(255,77,28,0.25) 0%, transparent 60%)",
        }} />

        {/* Fire emoji big */}
        <div style={{ fontSize: "140px", lineHeight: 1, marginBottom: "20px" }}>🔥</div>

        {/* Logo */}
        <div style={{
          fontSize: "80px", fontWeight: 900,
          letterSpacing: "-2px", lineHeight: 1,
          display: "flex",
        }}>
          <span style={{ color: "#F5F5F5" }}>Pique</span>
          <span style={{ color: "#FF4D1C" }}>fy</span>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: "28px", color: "#666",
          marginTop: "20px", letterSpacing: "0.02em",
        }}>
          Porras entre amigos, sin el lío de siempre
        </div>

        {/* Pills */}
        <div style={{
          display: "flex", gap: "12px", marginTop: "32px",
        }}>
          {["Gratis", "Sin registro", "Comparte por WhatsApp"].map((t) => (
            <div key={t} style={{
              background: "rgba(255,77,28,0.15)",
              border: "1px solid rgba(255,77,28,0.3)",
              borderRadius: "50px", padding: "8px 20px",
              fontSize: "18px", color: "#FF8C42",
            }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
