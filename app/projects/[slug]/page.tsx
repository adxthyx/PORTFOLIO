import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { projects, allProjects, profile } from "@/lib/content"
import { Header } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"
import { PostArticle } from "@/components/post-article"
import { ProjectJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"

interface Props {
  params: { slug: string }
}
export const dynamicParams = false
export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.id }))
}
export function generateMetadata({ params }: Props): Metadata {
  const project = allProjects.find((post) => post.id === params.slug)
  if (!project) return {}
  const title = `${project.title} | ${profile.displayName}`
  const description = project.content.slice(0, 160)
  return {
    title: project.title,
    robots: project.archived ? { index: false, follow: true } : undefined,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: { type: "article", url: `/projects/${project.id}`, title, description, images: [] },
    twitter: { card: "summary", title, description, images: [] },
  }
}
export default function ProjectPage({ params }: Props) {
  const post = allProjects.find((project) => project.id === params.slug)
  if (!post) notFound()
  return (
    <>
      <Header />
      <ProjectJsonLd project={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
          { name: post.title, url: `/projects/${post.id}` },
        ]}
      />
      <main id="main-content" className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/projects"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-9">
          <PostArticle post={post} />
        </div>
        <section className="mt-9">
          <h2 className="mb-4 text-lg font-semibold">Keep exploring</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {projects
              .filter((project) => project.id !== post.id)
              .slice(0, 2)
              .map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm font-semibold hover:text-brand"
                >
                  {project.title}
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </Link>
              ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
