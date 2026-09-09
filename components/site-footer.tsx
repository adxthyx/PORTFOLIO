import Link from "next/link"
import { profile } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-4 border-t border-border px-4 py-7 text-xs text-muted-foreground sm:flex-row sm:px-6">
      <div>
        <p className="font-medium text-foreground">Made by {profile.username}, with curiosity.</p>
        <p className="mt-1">A personal portfolio inspired by Reddit.</p>
      </div>
      <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link href="/about" className="hover:text-brand">
          About
        </Link>
        <Link href="/projects" className="hover:text-brand">
          Projects
        </Link>
        <Link href="/blog" className="hover:text-brand">
          Notes
        </Link>
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
          GitHub ↗
        </a>
        <a href={`mailto:${profile.links.email}`} className="hover:text-brand">
          Email ↗
        </a>
      </nav>
    </footer>
  )
}
