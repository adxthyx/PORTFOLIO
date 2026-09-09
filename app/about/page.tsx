import { Header } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { profile, resume, projects } from "@/lib/content"
import { ProfilePageJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  GraduationCap,
  Code2,
  Sparkles,
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  FileText,
  MapPin,
  ExternalLink,
  Bot,
  Layers,
  Award,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description:
    "Adithya Narayana Holla is a Software Engineer at Hewlett Packard Enterprise (HPE) specializing in AI/ML, Generative AI, RAG systems, and full-stack software development with Python, FastAPI, LangChain, and Next.js.",
  alternates: {
    canonical: "https://www.adithyaholla.com/about",
  },
  openGraph: {
    type: "profile",
    url: "https://www.adithyaholla.com/about",
    title: "About Adithya Narayana Holla | Software Engineer – AI/ML & Generative AI",
    description:
      "Software Engineer at Hewlett Packard Enterprise building AI/ML solutions, Generative AI, RAG systems, and LLM applications.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adithya Narayana Holla — Software Engineer at Hewlett Packard Enterprise",
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas text-foreground">
      <ProfilePageJsonLd
        title="About Adithya Narayana Holla"
        description="Software Engineer at Hewlett Packard Enterprise specializing in AI/ML, Generative AI, RAG systems, and LLM applications."
        url="https://www.adithyaholla.com/about"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      <Header />

      <main id="main-content" className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-card bg-secondary flex-shrink-0 shadow-md">
              <Image
                src="/a.jpeg"
                alt="Adithya Narayana Holla — Software Engineer at Hewlett Packard Enterprise"
                width={112}
                height={112}
                priority
                className="object-cover w-full h-full"
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  Adithya Narayana Holla
                </h1>
                <Badge variant="secondary" className="bg-brand/10 text-brand border-brand/20">
                  u/adxthyx
                </Badge>
              </div>

              <p className="text-base sm:text-lg font-medium text-brand">
                Software Engineer at Hewlett Packard Enterprise (HPE)
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-1">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand" />
                  Bengaluru, India
                </span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand" />
                  Specialization: AI/ML, Generative AI & RAG
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center gap-3">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-brand-solid hover:text-white transition-colors text-xs sm:text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              GitHub
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-brand-solid hover:text-white transition-colors text-xs sm:text-sm font-medium"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href={profile.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-brand-solid hover:text-white transition-colors text-xs sm:text-sm font-medium"
            >
              <Code2 className="w-4 h-4" />
              LeetCode
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href={`mailto:${profile.links.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-brand-solid hover:text-white transition-colors text-xs sm:text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              Email Me
            </a>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <Sparkles className="w-5 h-5 text-brand" />
            The work I do
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base leading-relaxed space-y-3">
            <p>
              I am <strong>Adithya Narayana Holla</strong>, a Software Engineer at{" "}
              <strong>Hewlett Packard Enterprise (HPE)</strong> based in Bengaluru, India. My engineering work
              is focused on developing production-grade{" "}
              <strong>AI/ML systems, Generative AI applications, Retrieval-Augmented Generation (RAG)</strong>{" "}
              architectures, and intelligent agent workflows.
            </p>
            <p>
              At HPE, I own the application and integration layer of <strong>AskAPS</strong>, an actively
              maintained assistant for planning and materials-management teams. I connect existing document
              retrieval, ticket search, and analytics services to a shared Teams and web workflow, with scoped
              queries, reliable refinements, source citations, and recoverable errors.
            </p>
          </div>
        </section>

        {/* Work Experience */}
        <section className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <Briefcase className="w-5 h-5 text-brand" />
            Professional Experience
          </h2>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-brand pl-4 sm:pl-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {exp.role} · <span className="text-brand">{exp.company}</span>
                  </h3>
                  <span className="text-xs sm:text-sm text-muted-foreground font-mono">{exp.period}</span>
                </div>
                <p className="text-xs text-muted-foreground">{exp.location}</p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-muted-foreground pt-1">
                  {exp.points.map((point, pIndex) => (
                    <li key={pIndex} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <Code2 className="w-5 h-5 text-brand" />
            Tools I work with
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.skillGroups.map((group, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/50 border border-border/50 space-y-2">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIndex) => (
                    <Badge
                      key={sIndex}
                      variant="secondary"
                      className="bg-card border border-border text-foreground hover:border-brand transition-colors text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <GraduationCap className="w-5 h-5 text-brand" />
            Education
          </h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">{edu.degree}</h3>
                <span className="text-xs sm:text-sm text-muted-foreground font-mono">{edu.period}</span>
              </div>
              <p className="text-sm font-medium text-brand">{edu.school}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{edu.detail}</p>
            </div>
          ))}
        </section>

        {/* Featured Projects Highlight */}
        <section className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Layers className="w-5 h-5 text-brand" />A few things I’ve built
            </h2>
            <Link
              href="/projects"
              className="text-xs sm:text-sm font-semibold text-brand hover:underline inline-flex items-center gap-1"
            >
              View all ({projects.length}) →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {projects.slice(0, 4).map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group p-4 rounded-lg border border-border bg-secondary/30 hover:border-brand hover:bg-secondary/60 transition-all space-y-2 block"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <Badge variant="secondary" className="text-[10px] bg-brand/10 text-brand">
                    {project.flair}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.content}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <section id="resume" className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold">Want the résumé version?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Experience, education, and skills in one place. Take a copy with you.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={profile.resumePath}
              download="Adithya-Holla-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-brand-solid px-4 py-2.5 text-sm font-semibold text-white"
            >
              <FileText className="h-4 w-4" />
              Download résumé
            </a>
            <Link
              href="/?view=recruiter"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold"
            >
              Read the quick summary
            </Link>
          </div>
        </section>
        <section className="px-1 py-3">
          <h2 className="text-xl font-bold">And away from the keyboard?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Bike rides, hiking trails, story-driven games, and two dachshunds. Originally from Belthangady,
            now finding my way around Bengaluru.
          </p>
          <Link
            href="/posts/about"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand"
          >
            Get to know me in the AMA <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
