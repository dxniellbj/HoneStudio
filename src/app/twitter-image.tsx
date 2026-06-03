import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Hone Studio: Custom Software & AI Tools, Built Solo";
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
          background: "linear-gradient(135deg, #2A2420 0%, #1A1410 100%)",
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
        {/* Scanline grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(232,224,200,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,224,200,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Arcade accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #C0392B 0%, #D4AC0D 50%, #C0392B 100%)",
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
                fontSize: "76px",
                fontWeight: 700,
                color: "#E8E0C8",
                letterSpacing: "-0.03em",
              }}
            >
              Hone
            </span>
            <span
              style={{
                fontSize: "76px",
                fontWeight: 700,
                color: "#C0392B",
                letterSpacing: "-0.03em",
              }}
            >
              .
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "32px",
              color: "#D4C9A8",
              margin: 0,
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Custom Software & AI Tools
          </p>

          {/* Subtext */}
          <p
            style={{
              fontSize: "22px",
              color: "#A89C82",
              margin: "24px 0 0 0",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            Built by one developer who works out what your business needs first
          </p>

          {/* Service pills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "48px",
            }}
          >
            {["Software & AI", "Web", "Strategy"].map((service, i) => {
              const accent = i === 0 ? "#C0392B" : i === 1 ? "#2471A3" : "#D4AC0D";
              return (
                <div
                  key={service}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "4px",
                    border: `1.5px solid ${accent}`,
                    background: "rgba(232,224,200,0.04)",
                    color: accent,
                    fontSize: "16px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {service}
                </div>
              );
            })}
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
              background: "#5DBF5D",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              color: "#A89C82",
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
