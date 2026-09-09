import { cn } from "@/lib/utils"

const FLAIR_COLORS: Record<string, string> = {
  AMA: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  About: "bg-secondary text-secondary-foreground",
  Experience: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  Education: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
  Skills: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200",
  "AI/ML": "bg-secondary text-secondary-foreground",
  "Web Dev": "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
}

export function Flair({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
        FLAIR_COLORS[name] ?? "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {name}
    </span>
  )
}
