"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Search,
  ArrowUpRight,
  FileText,
  MoreHorizontal,
  Moon,
  Sun,
  Monitor,
  Check,
  Trophy,
  BarChart3,
  Command,
} from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"

interface HeaderProps {
  onNavAction?: (action: string) => void
  onSearch?: (query: string) => void
  searchQuery?: string
  onOpenPalette?: () => void
  recruiterMode?: boolean
  onToggleRecruiter?: () => void
}

const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Notes" },
]

export function Header({
  onNavAction,
  onSearch,
  searchQuery = "",
  onOpenPalette,
  recruiterMode,
  onToggleRecruiter,
}: HeaderProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [searchOpen, setSearchOpen] = useState(false)
  const itemClass =
    "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none focus:bg-secondary data-[highlighted]:bg-secondary"
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:p-3"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2 sm:gap-x-5 sm:px-6 sm:py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="r/adithya home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent font-mono text-lg font-semibold text-[#0e1113]">
            r/
          </span>
          <span className="text-lg font-bold tracking-tight">
            adithya<span className="text-brand-accent">.</span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="order-3 flex w-full items-center gap-1 border-t border-border pt-2 md:order-none md:w-auto md:border-0 md:pt-0"
        >
          {navigation.map(({ href, label }) => {
            const active =
              href === "/"
                ? (pathname === "/" || pathname.startsWith("/posts/")) && !recruiterMode
                : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={(event) => {
                  if (
                    href === "/" &&
                    pathname === "/" &&
                    onNavAction &&
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey
                  ) {
                    event.preventDefault()
                    onNavAction("home")
                  }
                }}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-2 py-2 text-sm font-semibold transition-colors sm:px-3 ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                {label}
              </Link>
            )
          })}
          {onSearch && (
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label="Search projects"
              aria-expanded={searchOpen || Boolean(searchQuery)}
              aria-controls="portfolio-search-wrap"
              className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary lg:hidden"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
        </nav>
        {onSearch && (
          <div
            id="portfolio-search-wrap"
            className={`${searchOpen || searchQuery ? "block" : "hidden"} order-4 w-full pb-1 lg:order-none lg:ml-auto lg:block lg:min-w-0 lg:max-w-xs lg:flex-1 lg:pb-0`}
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <label htmlFor="portfolio-search" className="sr-only">
                Search projects
              </label>
              <Input
                id="portfolio-search"
                type="search"
                placeholder="Search projects…"
                value={searchQuery}
                onChange={(event) => onSearch(event.target.value)}
                className="h-10 rounded-full border-transparent bg-secondary pl-10 text-base sm:text-sm"
              />
            </div>
          </div>
        )}
        <div className={`ml-auto flex items-center gap-1 sm:gap-2 ${onSearch ? "lg:ml-0" : ""}`}>
          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden items-center gap-2 rounded-lg border border-border px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground lg:inline-flex"
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd>⌘ K</kbd>
            </button>
          )}
          <Button asChild variant="ghost" className="gap-1.5 rounded-full px-2.5 sm:px-3">
            <Link href="/about#resume" aria-label="Resume">
              <FileText className="h-4 w-4" />
              <span className="hidden min-[375px]:inline">Resume</span>
            </Link>
          </Button>
          <Button
            asChild
            className="gap-1 rounded-full bg-brand-accent px-3 font-semibold text-[#0e1113] hover:bg-[#ff5a1f] sm:px-4"
          >
            <Link
              href="/?modal=contact"
              onClick={(event) => {
                if (onNavAction && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                  event.preventDefault()
                  onNavAction("contact")
                }
              }}
            >
              Say hello
              <ArrowUpRight className="hidden h-4 w-4 sm:block" />
            </Link>
          </Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="More options"
                className="h-10 w-10 rounded-full"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={10}
                className="z-[60] min-w-[220px] rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl"
              >
                {onToggleRecruiter && (
                  <DropdownMenu.Item className={itemClass} onSelect={onToggleRecruiter}>
                    <FileText className="h-4 w-4" />
                    {recruiterMode ? "Back to posts" : "Quick résumé view"}
                  </DropdownMenu.Item>
                )}
                {onOpenPalette && (
                  <DropdownMenu.Item className={itemClass} onSelect={onOpenPalette}>
                    <Command className="h-4 w-4" />
                    Command palette
                  </DropdownMenu.Item>
                )}
                {[
                  { action: "stats", label: "Coding activity", icon: BarChart3 },
                  { action: "achievements", label: "Achievements", icon: Trophy },
                ].map(({ action, label, icon: Icon }) => (
                  <DropdownMenu.Item key={action} asChild className={itemClass}>
                    <Link
                      href={`/?modal=${action}`}
                      onClick={(event) => {
                        if (onNavAction && !event.metaKey && !event.ctrlKey) {
                          event.preventDefault()
                          onNavAction(action)
                        }
                      }}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className="my-1.5 h-px bg-border" />
                <DropdownMenu.Label className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Appearance
                </DropdownMenu.Label>
                {[
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "system", label: "System", icon: Monitor },
                ].map(({ value, label, icon: Icon }) => (
                  <DropdownMenu.Item key={value} className={itemClass} onSelect={() => setTheme(value)}>
                    <Icon className="h-4 w-4" />
                    {label}
                    {theme === value && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  )
}
