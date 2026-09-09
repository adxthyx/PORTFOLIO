"use client"

import type * as React from "react"
import { useEffect } from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function BrowserThemeColor() {
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    if (!resolvedTheme) return
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", resolvedTheme === "dark" ? "#0e1113" : "#f4f5f6")
  }, [resolvedTheme])
  return null
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <BrowserThemeColor />
      {children}
    </NextThemesProvider>
  )
}

export { useTheme }
