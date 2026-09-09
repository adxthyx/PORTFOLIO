import { Header } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"
import { PostBody } from "@/components/post-body"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"
import { ArrowLeft } from "lucide-react"
import { publishedPosts } from "@/lib/blog"

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return publishedPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = publishedPosts.find((p) => p.slug === params.slug)
  if (!post) return {}

  const title = `${post.title} | Adithya Narayana Holla`
  const url = `https://www.adithyaholla.com/blog/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified || post.datePublished,
      authors: ["Adithya Narayana Holla"],
      images: [],
    },
    twitter: {
      card: "summary",
      images: [],
      title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = publishedPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-canvas text-foreground">
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={`https://www.adithyaholla.com/blog/${post.slug}`}
        datePublished={post.datePublished}
        dateModified={post.dateModified}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <Header />

      <main id="main-content" className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <header className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {post.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono">
              Published on {post.datePublished} by Adithya Narayana Holla
            </p>
          </header>
          <PostBody content={post.content} />
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
