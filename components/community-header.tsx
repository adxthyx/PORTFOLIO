import Image from "next/image"
import { profile } from "@/lib/content"

export function CommunityHeader() {
  return (
    <section
      aria-labelledby="community-title"
      className="rounded-2xl border border-border bg-card px-5 py-5 sm:px-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium text-muted-foreground sm:text-sm">
            <span className="font-mono">{profile.subreddit}</span> · A personal portfolio
          </p>
          <h1 id="community-title" className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
            {profile.displayName}
          </h1>
        </div>
        <Image
          src={profile.avatar}
          alt="Adithya"
          width={72}
          height={72}
          priority
          sizes="(max-width: 639px) 48px, 72px"
          className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-[72px] sm:w-[72px]"
        />
      </div>
      <p className="mt-3 text-base leading-relaxed sm:text-lg">
        <strong className="font-semibold">Software Engineer at HPE</strong> building AI assistants and web
        applications.
      </p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/85 sm:text-base">
        Currently helping supply chain planners find answers through natural language.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Side projects get weird: I turned stock charts into a bike game.
      </p>
    </section>
  )
}
