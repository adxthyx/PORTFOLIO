import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/content"
import { Header } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"
import { PostCard } from "@/components/post-card"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI assistants, retrieval experiments, an offline Android app, and web projects by Adithya Narayana Holla. Problems, personal contributions, decisions, and outcomes.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Adithya Narayana Holla",
    url: "/projects",
    description: "The engineering behind my AI, Android, and web projects.",
  },
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ]}
      />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The project collection<span className="text-brand">.</span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            From planning assistants to an offline expense tracker and a bike game built on market charts.
            What I built, the decisions behind it, and what came out of the work.
          </p>
        </div>
        {[
          { title: "Recent work", items: projects.slice(0, 6) },
          { title: "Earlier work", items: projects.slice(6) },
        ].map(({ title, items }) => (
          <section key={title} className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">{title}</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {items.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        ))}
        <div className="border-t border-border pt-6">
          <Link
            href="/?modal=contact"
            className="inline-flex min-h-10 items-center gap-1 text-base font-semibold text-brand"
          >
            Working on something similar? Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
