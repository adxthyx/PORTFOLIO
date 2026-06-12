import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "r/adithya — Adithya N, AI/ML Engineer at HPE"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1416",
          fontFamily: "sans-serif",
        }}
      >
        {/* Fake Reddit post card */}
        <div
          style={{
            display: "flex",
            width: 1000,
            borderRadius: 16,
            border: "1px solid #2a3236",
            background: "#14181c",
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
              background: "#1b2226",
              borderRight: "1px solid #2a3236",
            }}
          >
            <svg width="44" height="36" viewBox="0 0 44 36">
              <polygon points="22,0 44,36 0,36" fill="#FF4500" />
            </svg>
            <div style={{ color: "#FF4500", fontSize: 40, fontWeight: 700 }}>342</div>
            <svg width="44" height="36" viewBox="0 0 44 36">
              <polygon points="22,36 44,0 0,0" fill="#4b5a63" />
            </svg>
          </div>

          {/* Post body */}
          <div style={{ display: "flex", flexDirection: "column", padding: 48, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: "linear-gradient(to right, #FF4500, #FF6B35)",
                  color: "white",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                A
              </div>
              <div style={{ color: "#FF4500", fontSize: 28, fontWeight: 700 }}>r/adithya</div>
              <div style={{ color: "#94a3a9", fontSize: 26 }}>· Posted by u/adxthyx</div>
              <div
                style={{
                  display: "flex",
                  background: "#16301f",
                  color: "#4ade80",
                  fontSize: 20,
                  fontWeight: 700,
                  padding: "6px 16px",
                  borderRadius: 999,
                }}
              >
                PINNED
              </div>
            </div>

            <div style={{ color: "#e8ebed", fontSize: 58, fontWeight: 800, lineHeight: 1.15, marginBottom: 18 }}>
              Adithya N — AI/ML Engineer at HPE
            </div>
            <div style={{ color: "#94a3a9", fontSize: 32, lineHeight: 1.4, marginBottom: 30 }}>
              Python · Next.js · FastAPI · LangChain. A portfolio you can browse like a subreddit — vote, sort, and ask
              the bot anything.
            </div>

            <div style={{ display: "flex", gap: 28, color: "#94a3a9", fontSize: 26 }}>
              <div style={{ display: "flex" }}>💬 67 comments</div>
              <div style={{ display: "flex" }}>🏅 2 awards</div>
              <div style={{ display: "flex" }}>↗ Share</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
