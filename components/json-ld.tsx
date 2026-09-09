import React from "react"
import { profile, Post } from "@/lib/content"

const BASE_URL = "https://www.adithyaholla.com"

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Adithya Narayana Holla",
    alternateName: ["Adithya Holla", "Adithya N", "adxthyx"],
    url: BASE_URL,
    image: `${BASE_URL}/a.jpeg`,
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Hewlett Packard Enterprise",
      url: "https://www.hpe.com",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Ramaiah Institute of Technology",
      url: "https://www.msrit.edu",
    },
    homeLocation: {
      "@type": "Place",
      name: "Bengaluru, India",
    },
    description:
      "Software Engineer at Hewlett Packard Enterprise specializing in AI/ML, Generative AI, RAG architectures, LLM applications, and full-stack software development with Python, FastAPI, LangChain, and Next.js.",
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "Retrieval-Augmented Generation (RAG)",
      "Large Language Models (LLM)",
      "AI Agents",
      "FastAPI",
      "Python",
      "LangChain",
      "Next.js",
      "React",
      "TypeScript",
      "Docker",
      "Kubernetes",
      "Natural Language Processing",
      "Computer Vision",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  )
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Adithya Narayana Holla | Software Engineer – AI/ML & Generative AI",
    alternateName: "Adithya Holla Portfolio",
    description:
      "Personal portfolio and engineering projects of Adithya Narayana Holla, Software Engineer at Hewlett Packard Enterprise focusing on AI/ML, Generative AI, RAG, and LLM applications.",
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
    inLanguage: "en-US",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  )
}

export function ProfilePageJsonLd({
  title,
  description,
  url = BASE_URL,
}: {
  title: string
  description: string
  url?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}/#profilepage`,
    url: url,
    name: title,
    description: description,
    mainEntity: {
      "@id": `${BASE_URL}/#person`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  )
}

export function ProjectJsonLd({ project }: { project: Post }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${BASE_URL}/projects/${project.id}/#software`,
    name: project.title,
    description: project.content,
    url: `${BASE_URL}/projects/${project.id}`,
    codeRepository: project.github || undefined,
    author: {
      "@id": `${BASE_URL}/#person`,
    },
    programmingLanguage: project.tags || [],
    keywords: project.tags?.join(", ") || "AI/ML, Software Engineering",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@id": `${BASE_URL}/#person`,
    },
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  )
}
