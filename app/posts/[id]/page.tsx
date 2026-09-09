import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { mainPosts, profile } from "@/lib/content"
import { Header } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"
import { PostArticle } from "@/components/post-article"
import { BreadcrumbJsonLd } from "@/components/json-ld"

interface Props {
  params: { id: string }
}
export const dynamicParams = false
export function generateStaticParams() {
  return mainPosts.map((post) => ({ id: post.id }))
}
export function generateMetadata({ params }: Props): Metadata {
  const post = mainPosts.find((value) => value.id === params.id)
  if (!post) return {}
  const title = `${post.title} | ${profile.displayName}`
  return {
    title: post.title,
    description: post.content,
    alternates: { canonical: `/posts/${post.id}` },
    openGraph: { type: "article", title, description: post.content, url: `/posts/${post.id}`, images: [] },
    twitter: { card: "summary", title, description: post.content, images: [] },
  }
}
export default function PostPage({ params }: Props) {
  const post = mainPosts.find((value) => value.id === params.id)
  if (!post) notFound()
  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: post.title, url: `/posts/${post.id}` },
        ]}
      />
      <main id="main-content" className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the feed
        </Link>
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-9">
          <PostArticle post={post} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
