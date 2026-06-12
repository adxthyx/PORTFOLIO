import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const redditSans = localFont({
  src: [
    { path: "../public/fonts/reddit-sans-latin.woff2", weight: "200 900", style: "normal" },
    { path: "../public/fonts/reddit-sans-italic-latin.woff2", weight: "200 900", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
})

const redditMono = localFont({
  src: [{ path: "../public/fonts/reddit-mono-latin.woff2", weight: "200 900", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://adxthyx.dev"),
  title: {
    default: "Adithya N | AI/ML Engineer — r/adithya",
    template: "%s | r/adithya",
  },
  description:
    "Software Engineer at HPE building AI/ML solutions. Python, Next.js, FastAPI, LangChain. Browse my work like a subreddit — posts, projects, and an AI that answers as me.",
  openGraph: {
    type: "website",
    siteName: "r/adithya",
    title: "Adithya N | AI/ML Engineer — r/adithya",
    description:
      "Software Engineer at HPE building AI/ML solutions. Browse my portfolio like a subreddit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya N | AI/ML Engineer — r/adithya",
    description:
      "Software Engineer at HPE building AI/ML solutions. Browse my portfolio like a subreddit.",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dae0e6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1416" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${redditSans.variable} ${redditMono.variable} font-sans`}>
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
