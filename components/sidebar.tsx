import Link from "next/link"
import { Github, Linkedin, ArrowUpRight, FileText, ChevronDown } from "lucide-react"
import { profile } from "@/lib/content"
import { TrophyCase } from "@/components/trophy-case"

export function Sidebar({ unlockedAchievements }: { unlockedAchievements?: string[] }) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Current focus</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Making follow-up questions reliable for planners, keeping their filters and conversation context
          intact across Teams and the web.
        </p>
        <Link
          href="/about"
          className="mt-3 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-brand hover:underline"
        >
          Experience & background <ArrowUpRight className="h-4 w-4" />
        </Link>
        <div className="mt-4 border-t border-border pt-2">
          {[
            {
              label: "GitHub",
              detail: "Source code & recent work",
              href: profile.links.github,
              icon: Github,
            },
            {
              label: "LinkedIn",
              detail: "Professional profile",
              href: profile.links.linkedin,
              icon: Linkedin,
            },
            { label: "Résumé", detail: "Open PDF", href: profile.resumePath, icon: FileText },
          ].map(({ label, detail, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg py-3 hover:bg-secondary"
            >
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold group-hover:text-brand">{label}</span>
                <span className="block text-xs text-muted-foreground">{detail}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>
      {unlockedAchievements && (
        <details className="group px-1">
          <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between text-sm text-muted-foreground [&::-webkit-details-marker]:hidden">
            Just for fun: visitor trophies
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pt-2">
            <TrophyCase unlockedIds={unlockedAchievements} />
          </div>
        </details>
      )}
    </div>
  )
}
