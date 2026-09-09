import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Adithya Narayana Holla — Software Engineer at Hewlett Packard Enterprise"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0E1113",
        fontFamily: "sans-serif",
      }}
    >
      {/* Post card wrapper */}
      <div
        style={{
          display: "flex",
          width: 1060,
          borderRadius: 16,
          border: "1px solid #30363B",
          background: "#181C1F",
          overflow: "hidden",
        }}
      >
        {/* Vote gutter */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            width: 110,
            background: "#22272B",
            borderRight: "1px solid #30363B",
          }}
        >
          <svg width="44" height="36" viewBox="0 0 44 36">
            <polygon points="22,0 44,36 0,36" fill="#FF4500" />
          </svg>
          <div style={{ color: "#FF5A1F", fontSize: 36, fontWeight: 700 }}>r/</div>
          <svg width="44" height="36" viewBox="0 0 44 36">
            <polygon points="22,36 44,0 0,0" fill="#4b5a63" />
          </svg>
        </div>

        {/* Post body */}
        <div style={{ display: "flex", flexDirection: "column", padding: 44, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 22,
                background: "#C93600",
                color: "white",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              A
            </div>
            <div style={{ color: "#FF4500", fontSize: 26, fontWeight: 700 }}>adithyaholla.com</div>
            <div style={{ color: "#A8ADB3", fontSize: 24 }}>· Software Engineer @ HPE</div>
            <div
              style={{
                display: "flex",
                background: "#22272B",
                color: "#F2F4F5",
                fontSize: 18,
                fontWeight: 700,
                padding: "4px 14px",
                borderRadius: 999,
              }}
            >
              AI/ML · GEN AI
            </div>
          </div>

          <div style={{ color: "#F2F4F5", fontSize: 50, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Adithya Narayana Holla
          </div>
          <div style={{ color: "#FF6B35", fontSize: 30, fontWeight: 600, marginBottom: 14 }}>
            Software Engineer — AI/ML, Generative AI & RAG Applications
          </div>
          <div style={{ color: "#A8ADB3", fontSize: 24, lineHeight: 1.4, marginBottom: 24 }}>
            Hewlett Packard Enterprise · Python · FastAPI · LangChain · Next.js · Kubernetes
          </div>

          <div style={{ display: "flex", gap: 24, color: "#A8ADB3", fontSize: 22 }}>
            <div style={{ display: "flex" }}>⭐ Flagship: AskAPS AI Assistant</div>
            <div style={{ display: "flex" }}>📍 Bengaluru, India</div>
            <div style={{ display: "flex" }}>🔗 www.adithyaholla.com</div>
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  )
}
