"use client"

import {
  ArrowLeft,
  Briefcase,
  Code2,
  Download,
  FolderGit2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Wrench,
} from "lucide-react"
import { m } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { profile, projects, resume, type Post } from "@/lib/content"
import { feedContainer, feedItem } from "@/lib/motion"

interface RecruiterViewProps {
  onExit: () => void
  onContact: () => void
  onResume: () => void
  onSelectPost: (post: Post) => void
}

const LINKS = [
  { label: "GitHub", icon: Github, url: profile.links.github },
  { label: "LinkedIn", icon: Linkedin, url: profile.links.linkedin },
  { label: "LeetCode", icon: Code2, url: profile.links.leetcode },
  { label: "Email", icon: Mail, url: `mailto:${profile.links.email}` },
]

function SectionHeading({ icon: Icon, title }: { icon: typeof Briefcase; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 sm:mb-4">
      <div className="w-7 h-7 rounded-md bg-brand-gradient flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h2 className="text-base sm:text-lg font-bold text-foreground">{title}</h2>
    </div>
  )
}

// Recruiter mode: the same content as the feed, flattened into a clean
// one-page resume view for people who don't have time for the Reddit bit.
export function RecruiterView({ onExit, onContact, onResume, onSelectPost }: RecruiterViewProps) {
  return (
    <m.div
      className="max-w-3xl mx-auto space-y-3 sm:space-y-4"
      variants={feedContainer}
      initial="hidden"
      animate="show"
    >
      {/* Mode banner */}
      <m.div
        variants={feedItem}
        className="flex items-center justify-between gap-2 bg-card border border-border rounded-lg px-3 sm:px-4 py-2"
      >
        <p className="text-xs sm:text-sm text-muted-foreground min-w-0 truncate">
          <span className="font-semibold text-foreground">Recruiter mode</span> — the no-nonsense version.
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onExit}
          className="text-muted-foreground hover:text-brand hover:bg-secondary gap-1.5 flex-shrink-0 text-xs sm:text-sm h-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to r/adithya
        </Button>
      </m.div>

      {/* Identity */}
      <m.div variants={feedItem}>
        <Card className="overflow-hidden bg-card border border-border">
          <div className="h-14 sm:h-16 bg-brand-gradient" />
          <div className="p-4 sm:p-6 -mt-9 sm:-mt-10">
            <img
              src={profile.avatar}
              alt={`${profile.displayName} portrait`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-card bg-card mb-3"
            />
            <h1 className="text-xl sm:text-3xl font-bold text-foreground">{profile.displayName}</h1>
            <p className="text-sm sm:text-base text-brand font-semibold mt-0.5">{profile.role}</p>
            <p className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              {resume.location}
            </p>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mt-3">{resume.summary}</p>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Button
                onClick={onResume}
                className="bg-brand hover:bg-brand-hover text-white rounded-full font-semibold h-9 gap-1.5 text-xs sm:text-sm"
              >
                <Download className="w-4 h-4" />
                Resume
              </Button>
              <Button
                onClick={onContact}
                variant="outline"
                className="rounded-full font-semibold h-9 gap-1.5 text-xs sm:text-sm border-brand text-brand hover:bg-brand hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Contact
              </Button>
              <div className="flex items-center gap-1 sm:ml-auto">
                {LINKS.map(({ label, icon: Icon, url }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    aria-label={label}
                    className="w-9 h-9 text-muted-foreground hover:text-brand hover:bg-secondary"
                    onClick={() => window.open(url, "_blank")}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </m.div>

      {/* Experience */}
      <m.div variants={feedItem}>
        <Card className="p-4 sm:p-6 bg-card border border-border">
          <SectionHeading icon={Briefcase} title="Experience" />
          <div className="space-y-4 sm:space-y-5">
            {resume.experience.map((exp) => (
              <div key={`${exp.role}-${exp.period}`} className="border-l-2 border-brand/40 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <h3 className="font-semibold text-sm sm:text-base text-foreground">
                    {exp.role} · <span className="text-brand">{exp.company}</span>
                  </h3>
                  <span className="text-[11px] sm:text-xs text-muted-foreground whitespace-nowrap">{exp.period}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground mb-1.5">{exp.location}</p>
                <ul className="space-y-1">
                  {exp.points.map((point) => (
                    <li key={point} className="flex gap-2 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      <span className="text-brand mt-0.5 flex-shrink-0">›</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </m.div>

      {/* Education */}
      <m.div variants={feedItem}>
        <Card className="p-4 sm:p-6 bg-card border border-border">
          <SectionHeading icon={GraduationCap} title="Education" />
          {resume.education.map((edu) => (
            <div key={edu.degree} className="border-l-2 border-brand/40 pl-3 sm:pl-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <h3 className="font-semibold text-sm sm:text-base text-foreground">{edu.degree}</h3>
                <span className="text-[11px] sm:text-xs text-muted-foreground whitespace-nowrap">{edu.period}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">{edu.school}</p>
              <p className="text-xs sm:text-sm text-foreground/80 mt-1">{edu.detail}</p>
            </div>
          ))}
        </Card>
      </m.div>

      {/* Skills */}
      <m.div variants={feedItem}>
        <Card className="p-4 sm:p-6 bg-card border border-border">
          <SectionHeading icon={Wrench} title="Skills" />
          <div className="space-y-3">
            {resume.skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="text-xs sm:text-sm font-semibold text-muted-foreground sm:w-24 flex-shrink-0">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs bg-secondary text-foreground/80 font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </m.div>

      {/* Projects */}
      <m.div variants={feedItem}>
        <Card className="p-4 sm:p-6 bg-card border border-border">
          <SectionHeading icon={FolderGit2} title="Projects" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelectPost(project)}
                className="text-left p-3 rounded-lg border border-border bg-card hover:border-brand hover:bg-secondary/50 transition-colors group"
              >
                <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-brand transition-colors line-clamp-2 mb-1">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 mb-2">{project.content}</p>
                {project.tags && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary text-muted-foreground font-normal">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] text-muted-foreground self-center">+{project.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-3">
            Click a project for the full write-up — architecture, stack, and why it matters.
          </p>
        </Card>
      </m.div>
    </m.div>
  )
}
