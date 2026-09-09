import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { Toaster } from "@/components/ui/sonner"
import { PersonJsonLd, WebSiteJsonLd } from "@/components/json-ld"
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
  metadataBase: new URL("https://www.adithyaholla.com"),
  alternates: {
    canonical: "https://www.adithyaholla.com",
  },
  title: {
    default: "Adithya Narayana Holla | Software Engineer – AI/ML & Generative AI",
    template: "%s | Adithya Narayana Holla",
  },
  description:
    "Adithya Narayana Holla is a Software Engineer at Hewlett Packard Enterprise building AI/ML solutions, Generative AI, RAG systems, and LLM applications using Python, FastAPI, LangChain, and Next.js.",
  keywords: undefined, // Avoid legacy keywords tag
  authors: [{ name: "Adithya Narayana Holla", url: "https://www.adithyaholla.com" }],
  creator: "Adithya Narayana Holla",
  publisher: "Adithya Narayana Holla",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adithyaholla.com",
    siteName: "Adithya Narayana Holla",
    title: "Adithya Narayana Holla | Software Engineer – AI/ML & Generative AI",
    description:
      "Software Engineer at Hewlett Packard Enterprise building AI/ML solutions, Generative AI, RAG systems, and LLM applications with Python, FastAPI, LangChain, and Next.js.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adithya Narayana Holla — Software Engineer at Hewlett Packard Enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya Narayana Holla | Software Engineer – AI/ML & Generative AI",
    description:
      "Software Engineer at Hewlett Packard Enterprise building AI/ML solutions, Generative AI, RAG systems, and LLM applications.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/image.png", sizes: "1254x1254", type: "image/png" }],
    shortcut: "/image.png",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#0e1113",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={`${redditSans.variable} ${redditMono.variable} font-sans`}>
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
