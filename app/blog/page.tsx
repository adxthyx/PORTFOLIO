import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen, ArrowUpRight, PencilLine } from "lucide-react"
import { Header } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { publishedPosts } from "@/lib/blog"
import { formatPostDate } from "@/lib/post-utils"

export const metadata: Metadata = {
  title: "Engineering notes",
  description: "Notes and lessons on AI, RAG systems, and building software by Adithya Narayana Holla.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Engineering notes | Adithya Narayana Holla",
    url: "/blog",
    description: "Things learned while building AI tools and web applications.",
  },
}
export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Notes", url: "/blog" },
        ]}
      />
      <main id="main-content" className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand">
          <BookOpen className="h-4 w-4" />
          Learning out loud
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Notes from the workbench<span className="text-brand">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          The useful discoveries, the decisions behind the code, and the things I&apos;d do differently next
          time.
        </p>
        {publishedPosts.length > 0 ? (
          <div className="mt-8 space-y-4">
            {publishedPosts.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-border bg-card p-6">
                <time dateTime={post.datePublished} className="text-xs text-muted-foreground">
                  {formatPostDate(post.datePublished)}
                </time>
                <h2 className="mt-2 text-xl font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand"
                >
                  Read note
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <section className="mt-9 rounded-2xl border border-border bg-card p-6 sm:p-9">
            <PencilLine className="h-7 w-7 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">Still putting the first note together.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              There aren&apos;t any published articles yet. In the meantime, my project write-ups cover the
              architecture, tools, and reasoning behind the work.
            </p>
            <Link
              href="/projects"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-solid px-4 py-2.5 text-sm font-semibold text-white"
            >
              Read the project stories
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 border-t border-border pt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Topics on my list
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>Building production RAG systems for enterprise teams</li>
                <li>FastAPI, SSE streaming, and Kubernetes</li>
                <li>Agentic workflows versus traditional pipelines</li>
              </ul>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
