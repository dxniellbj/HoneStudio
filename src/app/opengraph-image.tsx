import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Hone Studio — Fractional Ops & Tech Partner";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0F1114 0%, #181B20 50%, #22262D 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Teal accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00D4AA 0%, #1AEDC2 50%, #00D4AA 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            textAlign: "center",
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Hone
            </span>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 600,
                color: "#00D4AA",
                letterSpacing: "-0.02em",
              }}
            >
              .
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "32px",
              color: "#B3B8C0",
              margin: 0,
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Fractional Ops & Tech Partner
          </p>

          {/* Subtext */}
          <p
            style={{
              fontSize: "22px",
              color: "#5A6069",
              margin: "24px 0 0 0",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            Strategy, systems, and websites — all from one senior partner
          </p>

          {/* Service pills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "48px",
            }}
          >
            {["Web", "AI & Automation", "Strategy"].map((service, i) => (
              <div
                key={service}
                style={{
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: `1px solid ${
                    i === 0 ? "rgba(0,212,170,0.3)" : i === 1 ? "rgba(255,107,61,0.3)" : "rgba(79,91,213,0.3)"
                  }`,
                  background: i === 0 ? "rgba(0,212,170,0.08)" : i === 1 ? "rgba(255,107,61,0.08)" : "rgba(79,91,213,0.08)",
                  color: i === 0 ? "#00D4AA" : i === 1 ? "#FF6B3D" : "#4F5BD5",
                  fontSize: "16px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00D4AA",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              color: "#8A9099",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            honestudio.cv
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
