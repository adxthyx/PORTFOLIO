import {
  AudioLines,
  Bike,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  GitPullRequest,
  CircleDot,
  CircleCheck,
  MapPin,
} from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Concept illustrations, not screenshots or measured project data.
const illustrations: Record<string, { label: string; visual: ReactNode }> = {
  "chart-climber": {
    label: "A price curve you can ride",
    visual: (
      <div className="relative h-28 overflow-hidden">
        <svg
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <path
            d="M0 85 L38 65 L65 74 L110 40 L145 54 L190 18 L232 42 L260 29 L305 67 L346 50 L400 8 V100 H0Z"
            fill="currentColor"
            opacity=".09"
          />
          <path
            d="M0 85 L38 65 L65 74 L110 40 L145 54 L190 18 L232 42 L260 29 L305 67 L346 50 L400 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
        <Bike className="absolute left-[43%] top-0 h-9 w-9 -rotate-12" />
        <span className="absolute bottom-0 left-0 text-xs">Market history → hills & descents</span>
      </div>
    ),
  },
  "github-quiz": {
    label: "Recognize the code. Name the repo.",
    visual: (
      <div className="space-y-3">
        <div className="rounded-lg bg-white/60 p-3 font-mono text-xs leading-6 dark:bg-black/20">
          <div>
            <span className="opacity-70">import</span> {"{ "}
            <span className="inline-block h-2.5 w-20 rounded-sm bg-current opacity-25" />
            {" }"}
          </div>
          <div>
            <span className="opacity-70">from</span>{" "}
            <span className="inline-block h-2.5 w-32 rounded-sm bg-current opacity-25" />
          </div>
          <div className="opacity-70">{"// identifying clues hidden"}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["A", "B", "C", "D"].map((letter) => (
            <span
              key={letter}
              className="rounded-md border border-black/20 dark:border-white/20 py-1.5 text-center text-xs font-semibold"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  "repo-watch": {
    label: "One repository, three signals",
    visual: (
      <div className="grid gap-2">
        {[
          { icon: CircleDot, label: "Issues" },
          { icon: GitPullRequest, label: "Pull requests" },
          { icon: CircleCheck, label: "CI runs" },
        ].map(({ icon: Icon, label }) => {
          return (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg bg-white/60 px-3 py-2 dark:bg-white/5"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="w-24 text-xs font-medium">{label}</span>
              <span className="flex flex-1 items-center">
                <span className="h-2 w-2 rounded-full border border-current" />
                <span className="h-px flex-1 bg-current opacity-25" />
                <span className="h-2 w-2 rounded-full bg-current opacity-60" />
                <span className="h-px flex-1 bg-current opacity-25" />
                <span className="h-2 w-2 rounded-full border border-current" />
              </span>
            </div>
          )
        })}
      </div>
    ),
  },
  "web-rit": {
    label: "Campus essentials, together",
    visual: (
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: BookOpen, label: "Class notes" },
          { icon: CalendarDays, label: "Timetables" },
          { icon: GraduationCap, label: "Results" },
          { icon: CircleCheck, label: "Attendance" },
        ].map(({ icon: Icon, label }) => {
          return (
            <div
              key={label}
              className="flex flex-col items-start gap-2 rounded-lg bg-white/65 px-3 py-3 dark:bg-white/5 sm:flex-row sm:items-center"
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-xs font-medium">{label}</span>
            </div>
          )
        })}
      </div>
    ),
  },
  "web-ngo": {
    label: "A pitch shaped by shared interests",
    visual: (
      <div className="flex items-center justify-center gap-4 py-2">
        <FileText className="h-10 w-10 shrink-0" />
        <div className="relative w-48 rounded-lg border border-black/20 dark:border-white/20 bg-white/65 p-4 shadow-[5px_5px_0_0_currentColor] dark:bg-card">
          <p className="text-xs font-semibold">A cause. A shared interest.</p>
          <div className="mt-3 space-y-2">
            <div className="h-1.5 w-4/5 rounded bg-current opacity-25" />
            <div className="h-1.5 w-full rounded bg-current opacity-20" />
            <div className="h-1.5 w-2/3 rounded bg-current opacity-20" />
          </div>
          <p className="mt-3 text-xs">An editable presentation</p>
        </div>
      </div>
    ),
  },
  "ai-vlm": {
    label: "A camera view, described aloud",
    visual: (
      <div className="flex items-center justify-center gap-6 py-2">
        <div className="relative h-24 w-36 rounded-lg border border-dashed border-black/40 dark:border-white/40">
          <svg viewBox="0 0 144 96" className="h-full w-full" fill="none">
            <circle cx="103" cy="24" r="9" fill="currentColor" opacity=".3" />
            <path
              d="M12 81 L51 32 L91 81 M69 81 L100 49 L132 81"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <AudioLines className="h-16 w-16 shrink-0" strokeWidth={1.5} />
      </div>
    ),
  },
  "multicity-routing": {
    label: "Connecting stops across cities",
    visual: (
      <div className="relative h-28">
        <svg viewBox="0 0 400 110" className="h-full w-full" fill="none">
          <path
            d="M25 75 C75 75 65 25 120 25 S185 100 240 75 S300 20 375 35"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <circle cx="25" cy="75" r="6" fill="currentColor" />
          <circle cx="120" cy="25" r="6" fill="currentColor" />
          <circle cx="240" cy="75" r="6" fill="currentColor" />
          <circle cx="375" cy="35" r="6" fill="currentColor" />
        </svg>
        <MapPin className="absolute bottom-0 left-1/2 h-5 w-5" />
      </div>
    ),
  },
}

export function ProjectIllustration({ postId, className }: { postId: string; className?: string }) {
  const illustration = illustrations[postId]
  if (!illustration) return null
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-secondary p-3 text-foreground sm:p-4",
        className,
      )}
    >
      <figcaption className="mb-3 text-xs font-medium sm:text-sm">{illustration.label}</figcaption>
      <div aria-hidden="true">{illustration.visual}</div>
      <p className="mt-3 text-xs">Concept illustration</p>
    </figure>
  )
}
