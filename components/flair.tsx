import { cn } from "@/lib/utils"

const FLAIR_COLORS: Record<string, string> = {
  AMA: "bg-rose-600",
  About: "bg-emerald-600",
  Experience: "bg-blue-600",
  Education: "bg-purple-600",
  Skills: "bg-amber-700",
  "AI/ML": "bg-brand-solid",
  "Web Dev": "bg-cyan-700",
  Android: "bg-green-700",
  Routing: "bg-indigo-600",
}

export function Flair({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white sm:text-xs",
        FLAIR_COLORS[name] ?? "bg-muted-foreground",
        className,
      )}
    >
      {name}
    </span>
  )
}
