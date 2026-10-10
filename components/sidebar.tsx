"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  TrendingUp,
  Users,
  Code2,
  Briefcase,
  Sparkles,
  Rocket,
  FileText,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react"
import { profile, communities, highlights, communityTagline } from "@/lib/content"
import { useVotes } from "@/lib/votes"
import { TrophyCase } from "@/components/trophy-case"

interface ProfileCardProps {
  onJoin?: () => void
  onResume?: () => void
  onAskAI?: () => void
}

const cardClass = "rounded-lg border border-border bg-card transition-shadow duration-200 hover:shadow-md"
const pillClass =
  "inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-brand text-xs font-semibold text-brand transition-colors hover:bg-brand-solid hover:text-white sm:text-sm"

export function ProfileCard({ onJoin, onResume, onAskAI }: ProfileCardProps) {
  const { karmaDelta } = useVotes()
  const karma = profile.baseKarma + karmaDelta
  const connect = [
    { label: "GitHub", href: profile.links.github, icon: Github },
    { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
    { label: "LeetCode", href: profile.links.leetcode, icon: Code2 },
    { label: "Email", href: `mailto:${profile.links.email}`, icon: Mail },
  ]

  return (
    <section aria-labelledby="community-name" className={`overflow-hidden ${cardClass}`}>
      {/* Community banner */}
      <div className="h-12 bg-brand-gradient sm:h-14" />

      <div className="-mt-7 p-3 sm:-mt-8 sm:p-4">
        <div className="mb-3 flex items-end gap-2 sm:gap-3">
          <div className="relative shrink-0">
            <Image
              src={profile.avatar}
              alt={`${profile.displayName} avatar`}
              width={56}
              height={56}
              priority
              className="h-12 w-12 rounded-full border-4 border-card bg-card object-cover sm:h-14 sm:w-14"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
          </div>
          <div className="min-w-0 pb-0.5">
            <h2 id="community-name" className="truncate text-sm font-bold sm:text-base">
              {profile.subreddit}
            </h2>
            <p className="truncate text-xs text-muted-foreground">
              {profile.username} · {profile.role}
            </p>
          </div>
        </div>

        <p className="mb-3 text-xs text-muted-foreground sm:text-sm">{communityTagline}</p>

        <div className="mb-3 flex items-center gap-4 border-b border-border pb-3 text-xs sm:text-sm">
          <div>
            <div className="font-bold">1</div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              Member
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 font-bold">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />1
            </div>
            <div className="text-muted-foreground">Online (it&apos;s me)</div>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground sm:text-sm">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 shrink-0 text-brand" />
            Karma
          </span>
          <span className="font-medium tabular-nums text-foreground" suppressHydrationWarning>
            {karma.toLocaleString("en-US")}
          </span>
        </div>

        {onJoin && (
          <button
            type="button"
            onClick={onJoin}
            className="h-9 w-full rounded-full bg-brand-solid text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Join
          </button>
        )}

        {(onResume || onAskAI) && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {onResume && (
              <button type="button" onClick={onResume} className={pillClass}>
                <FileText className="h-3.5 w-3.5 shrink-0" />
                Resume
              </button>
            )}
            {onAskAI && (
              <button type="button" onClick={onAskAI} className={pillClass}>
                <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                Ask AI
              </button>
            )}
          </div>
        )}

        <Link
          href="/about"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline sm:text-sm"
        >
          Experience & background <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>

        <div className="mt-3 border-t border-border pt-3">
          <h3 className="mb-2 text-sm font-medium sm:text-base">Connect with me</h3>
          <div className="space-y-1">
            {connect.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-brand sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{label}</span>
                <ExternalLink className="ml-auto h-3 w-3 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const communityColors = ["bg-blue-600", "bg-cyan-700", "bg-purple-600"]
const highlightIcons = [Briefcase, Sparkles, Rocket]

interface SidebarProps extends ProfileCardProps {
  showProfile?: boolean
  unlockedAchievements?: string[]
}

export function Sidebar({ showProfile = true, unlockedAchievements, ...profileProps }: SidebarProps) {
  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Profile card on desktop; mobile renders it separately above the feed */}
      {showProfile && (
        <div className="hidden lg:block">
          <ProfileCard {...profileProps} />
        </div>
      )}

      <section className={`p-3 sm:p-4 ${cardClass}`}>
        <h2 className="mb-2 text-sm font-bold sm:mb-3 sm:text-base">Communities I Lurk In</h2>
        <div className="space-y-1.5 sm:space-y-2">
          {communities.map((community, i) => (
            <a
              key={community.name}
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-2 rounded p-2 text-xs transition-colors hover:bg-secondary sm:gap-3 sm:text-sm"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white sm:h-8 sm:w-8 sm:text-xs ${communityColors[i % communityColors.length]}`}
              >
                r/
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{community.name}</span>
                <span className="block text-[10px] text-muted-foreground sm:text-xs">{community.members}</span>
              </span>
              <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>

      <section className={`p-3 sm:p-4 ${cardClass}`}>
        <h2 className="mb-2 text-sm font-bold sm:mb-3 sm:text-base">Highlights</h2>
        <div className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
          {highlights.map((item, i) => {
            const Icon = highlightIcons[i % highlightIcons.length]
            return (
              <div key={item.title} className="rounded p-2 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Icon className="h-3 w-3" />
                  {item.label}
                </div>
                <div className="line-clamp-2 font-medium">{item.title}</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">{item.meta}</div>
              </div>
            )
          })}
        </div>
      </section>

      {unlockedAchievements && <TrophyCase unlockedIds={unlockedAchievements} />}
    </div>
  )
}
