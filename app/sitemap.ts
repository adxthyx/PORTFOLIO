import { MetadataRoute } from "next"
import { projects, mainPosts } from "@/lib/content"
import { publishedPosts } from "@/lib/blog"

const BASE_URL = "https://www.adithyaholla.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  // Base indexable routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Dynamic project routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified: project.postedAt ? new Date(project.postedAt).toISOString() : currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = mainPosts.map((post) => ({
    url: `${BASE_URL}/posts/${post.id}`,
    lastModified: new Date(post.postedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }))
  const articleRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }))
  return [...staticRoutes, ...projectRoutes, ...postRoutes, ...articleRoutes]
}
