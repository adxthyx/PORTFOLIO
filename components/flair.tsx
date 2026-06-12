import { cn } from "@/lib/utils"

const FLAIR_COLORS: Record<string, string> = {
  AMA: "bg-rose-600",
  About: "bg-emerald-600",
  Experience: "bg-blue-600",
  Education: "bg-purple-600",
  Skills: "bg-amber-500",
  "AI/ML": "bg-brand",
  "Web Dev": "bg-cyan-600",
}

export function Flair({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white whitespace-nowrap",
        FLAIR_COLORS[name] ?? "bg-muted-foreground",
        className,
      )}
    >
      {name}
    </span>
  )
}
