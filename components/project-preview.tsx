import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ReconcilePreview } from "@/components/reconcile-preview"
import { ProjectIllustration } from "@/components/project-illustration"
import { ragBenchEvidence, ragBenchImprovement } from "@/lib/rag-bench-evidence"

type Preview = { label: string; steps: [string, string][]; caption: string }
const previews: Record<string, Preview> = {
  "ai-askaps": {
    label: "One place to ask a planning question",
    steps: [
      ["Teams / web", "Ask a question"],
      ["AskAPS", "Find answers · follow up"],
      ["HPE services", "Documents · tickets · data"],
    ],
    caption: "I own the application and integrations. Existing services provide retrieval and analytics.",
  },
  "chart-climber": {
    label: "From price chart to playable terrain",
    steps: [
      ["Market history", "API or bundled data"],
      ["Terrain", "Percentage-based slopes"],
      ["Ride", "Physics + Canvas"],
    ],
    caption: "Relative price movements shape the hills across eight stock and crypto assets.",
  },
  "github-quiz": {
    label: "From source code to quiz round",
    steps: [
      ["GitHub source", "Random file + section"],
      ["Hide clues", "Redact identifying terms"],
      ["Pick a repo", "Same-language options"],
    ],
    caption: "Six rounds, three lifelines, and a recap. Formatting stays intact as clues are removed.",
  },
  "repo-watch": {
    label: "Repository monitoring pipeline",
    steps: [
      ["GitHub API", "Issues · PRs · CI"],
      ["Sync + store", "Backfill + daily snapshots"],
      ["Dashboard", "Backlogs + trends"],
    ],
    caption: "FastAPI and PostgreSQL preserve history for the Next.js dashboard.",
  },
  "web-rit": {
    label: "A central place for student information",
    steps: [
      ["Campus sites", "Refresh at login"],
      ["One portal", "Results · notes · timetable"],
      ["Ask Rasa", "Attendance + grades"],
    ],
    caption: "A solo project used by students, later retired as source-site maintenance grew.",
  },
  "web-ngo": {
    label: "My pitch-generation workflow",
    steps: [
      ["Donor context", "Interests + past work"],
      ["Generate pitch", "OpenAI content"],
      ["PowerPoint", "python-pptx output"],
    ],
    caption: "My work covered pitch generation and the dashboard within a team hackathon prototype.",
  },
  "ai-vlm": {
    label: "Assistive prototype workflow",
    steps: [
      ["Camera", "Capture the scene"],
      ["Vision model", "Generate a description"],
      ["Audio", "Speak through earphone"],
    ],
    caption: "Camera → vision-language model → text-to-speech in an assistive prototype.",
  },
  "ai-kannada": {
    label: "Handwriting recognition workflow",
    steps: [
      ["Write", "Trace a character"],
      ["Recognize", "Handwriting model"],
      ["Learn", "Display feedback"],
    ],
    caption: "An earlier learning project, built with classmates.",
  },
  "ai-attendance": {
    label: "Attendance workflow",
    steps: [
      ["Class photo", "Image input"],
      ["Identify", "Face detection + matching"],
      ["Register", "Update attendance"],
    ],
    caption: "An earlier computer-vision project.",
  },
}
const surface = "overflow-hidden rounded-xl border border-border bg-secondary text-foreground"

export function ProjectPreview({
  postId,
  compact = false,
  className,
}: {
  postId: string
  compact?: boolean
  className?: string
}) {
  if (postId === "reconcile") return <ReconcilePreview compact={compact} className={className} />
  if (postId === "rag-bench") {
    return (
      <figure className={cn(surface, compact ? "p-3 sm:p-4" : "p-4 sm:p-6", className)}>
        <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2 text-xs font-medium sm:text-sm">
          <span>FiQA · Search quality</span>
          <span className="rounded-full border border-border bg-card px-2 py-1 font-semibold">
            +{ragBenchImprovement.toFixed(0)}% relative
          </span>
        </figcaption>
        <div className="space-y-3 text-xs sm:text-sm" aria-label="Recorded FiQA retrieval results">
          {[ragBenchEvidence.baseline, ragBenchEvidence.reranked].map(({ label, recall }, index) => (
            <div key={label}>
              <div className="mb-1.5 flex justify-between gap-2">
                <span>{label}</span>
                <span className="font-mono font-medium tabular-nums">{(recall * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-sm bg-black/10 dark:bg-white/10" aria-hidden="true">
                <div
                  className={cn(
                    "h-full rounded-sm",
                    index === 0 ? "bg-[#7f92b2] dark:bg-[#8997b3]" : "bg-[#345cd6] dark:bg-[#92b1ff]",
                  )}
                  style={{ width: `${recall * 100}%` }}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between text-xs" aria-hidden="true">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed sm:text-sm">
          Relevant documents found in the first five results, averaged over {ragBenchEvidence.queries}{" "}
          questions.
        </p>
        {!compact && (
          <p className="mt-4 text-sm leading-relaxed">
            Recall@5: {ragBenchEvidence.baseline.recall.toFixed(3)} →{" "}
            {ragBenchEvidence.reranked.recall.toFixed(3)}. Reordering the search results improves retrieval,
            at the cost of additional query time.
          </p>
        )}
      </figure>
    )
  }
  if (compact && postId !== "ai-askaps") return <ProjectIllustration postId={postId} className={className} />
  const preview = previews[postId]
  if (!preview) return <ProjectIllustration postId={postId} className={className} />
  return (
    <figure className={cn(surface, compact ? "p-3 sm:p-4" : "p-4 sm:p-6", className)}>
      <figcaption className={cn("text-xs font-medium sm:text-sm", compact ? "mb-3" : "mb-4")}>
        {preview.label}
      </figcaption>
      <ol className="grid grid-cols-3 gap-3 sm:gap-5" aria-label="How the project works">
        {preview.steps.map(([title, detail], index) => (
          <li
            key={title}
            className={cn(
              "relative min-w-0 rounded-lg border border-border bg-card",
              compact ? "px-2 py-2.5 sm:px-3" : "p-3 sm:p-4",
            )}
          >
            <span className="block text-xs font-semibold leading-snug sm:text-sm">{title}</span>
            <span className={cn("mt-1 text-xs leading-relaxed", compact ? "hidden sm:block" : "block")}>
              {detail}
            </span>
            {index < 2 && (
              <ArrowRight
                aria-hidden="true"
                className="absolute -right-3 top-1/2 z-10 h-3 w-3 -translate-y-1/2 sm:-right-4 sm:h-4 sm:w-4"
              />
            )}
          </li>
        ))}
      </ol>
      {!compact && <p className="mt-4 text-sm leading-relaxed">{preview.caption}</p>}
    </figure>
  )
}
