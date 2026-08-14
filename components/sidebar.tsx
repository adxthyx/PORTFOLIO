"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ExternalLink, Calendar, TrendingUp, Users, Code2, Briefcase, Sparkles, FileText, MessageSquare } from "lucide-react"
import { format, parseISO } from "date-fns"
import { profile } from "@/lib/content"
import { TrophyCase } from "@/components/trophy-case"

interface ProfileCardProps {
  karma?: number
  onJoin?: () => void
  onResume?: () => void
  onAskAI?: () => void
}

export function ProfileCard({ karma = profile.baseKarma, onJoin, onResume, onAskAI }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden bg-card border border-border hover:shadow-md transition-shadow duration-200">
      {/* Community banner */}
      <div className="h-12 sm:h-14 bg-brand-gradient" />

      <div className="p-3 sm:p-4 -mt-7 sm:-mt-8">
        <div className="flex items-end gap-2 sm:gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <img
              src={profile.avatar}
              alt={`${profile.username} avatar`}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-4 border-card bg-card"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card" />
          </div>
          <div className="min-w-0 pb-0.5">
            <h3 className="font-bold text-sm sm:text-base text-foreground truncate">{profile.subreddit}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {profile.username} · {profile.role}
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground mb-3">
          The official community for everything I build, break, and occasionally fix.
        </p>

        <div className="flex items-center gap-4 text-xs sm:text-sm mb-3 pb-3 border-b border-border">
          <div>
            <div className="font-bold text-foreground">1</div>
            <div className="text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" />
              Member
            </div>
          </div>
          <div>
            <div className="font-bold text-foreground flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />1
            </div>
            <div className="text-muted-foreground">Online (it&apos;s me)</div>
          </div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-muted-foreground mb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-brand flex-shrink-0" />
              <span>Karma</span>
            </div>
            <span className="font-medium text-foreground tabular-nums">{karma.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand flex-shrink-0" />
              <span>Cake day</span>
            </div>
            <span className="font-medium text-foreground">{format(parseISO(profile.cakeDay), "MMM d, yyyy")}</span>
          </div>
        </div>

        {onJoin && (
          <Button
            onClick={onJoin}
            className="w-full bg-brand hover:bg-brand-hover text-white rounded-full font-semibold h-8 sm:h-9 text-sm"
          >
            Join
          </Button>
        )}

        {(onResume || onAskAI) && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {onResume && (
              <Button
                onClick={onResume}
                variant="outline"
                className="w-full rounded-full font-semibold h-8 sm:h-9 text-xs sm:text-sm border-brand text-brand hover:bg-brand hover:text-white transition-colors"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                Resume
              </Button>
            )}
            {onAskAI && (
              <Button
                onClick={onAskAI}
                variant="outline"
                className="w-full rounded-full font-semibold h-8 sm:h-9 text-xs sm:text-sm border-brand text-brand hover:bg-brand hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                Ask AI
              </Button>
            )}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-border">
          <h4 className="font-medium text-sm sm:text-base text-foreground mb-2">Connect with me</h4>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 text-xs sm:text-sm"
              onClick={() => window.open(profile.links.github, "_blank")}
            >
              <Github className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">GitHub</span>
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 text-xs sm:text-sm"
              onClick={() => window.open(profile.links.linkedin, "_blank")}
            >
              <Linkedin className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">LinkedIn</span>
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 text-xs sm:text-sm"
              onClick={() => window.open(profile.links.leetcode, "_blank")}
            >
              <Code2 className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">LeetCode</span>
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 text-xs sm:text-sm"
              onClick={() => window.open(`mailto:${profile.links.email}`, "_blank")}
            >
              <Mail className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">Email</span>
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

const communities = [
  { name: "webdev", members: "3.2M members", color: "bg-blue-500", url: "https://reddit.com/r/webdev" },
  { name: "reactjs", members: "1.9M members", color: "bg-cyan-500", url: "https://reddit.com/r/reactjs" },
  { name: "MachineLearning", members: "3.0M members", color: "bg-purple-500", url: "https://reddit.com/r/MachineLearning" },
]

const highlights = [
  {
    icon: Briefcase,
    label: "Now",
    title: "SWE-1 at Hewlett Packard Enterprise — AI/ML solutions",
    meta: "Sept 2025 - Present",
  },
  {
    icon: Sparkles,
    label: "Flagship project",
    title: "AskAPS — AI assistant for HPE supply chain planners",
    meta: "RAG · FastAPI · NL-to-SQL · Teams",
  },
  {
    icon: Code2,
    label: "Current obsession",
    title: "LLM apps with LangChain — RAG pipelines and agents",
    meta: "Always learning",
  },
]

interface SidebarProps {
  karma?: number
  onJoin?: () => void
  onResume?: () => void
  onAskAI?: () => void
  showProfile?: boolean
  unlockedAchievements?: string[]
}

export function Sidebar({ karma, onJoin, onResume, onAskAI, showProfile = true, unlockedAchievements }: SidebarProps) {
  return (
    <div className="w-full lg:w-80 space-y-3 sm:space-y-4">
      {/* Profile card shown on desktop, hidden on mobile (shown separately before posts) */}
      {showProfile && (
        <div className="hidden lg:block">
          <ProfileCard karma={karma} onJoin={onJoin} onResume={onResume} onAskAI={onAskAI} />
        </div>
      )}

      <Card className="p-3 sm:p-4 bg-card border border-border hover:shadow-md transition-shadow duration-200">
        <h3 className="font-bold text-sm sm:text-base text-foreground mb-2 sm:mb-3">Communities I Lurk In</h3>
        <div className="space-y-1.5 sm:space-y-2">
          {communities.map((community) => (
            <button
              key={community.name}
              onClick={() => window.open(community.url, "_blank")}
              className="w-full flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:bg-secondary p-2 rounded transition-colors cursor-pointer text-left"
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 ${community.color} rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0`}
              >
                r/
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground font-medium truncate text-xs sm:text-sm">{community.name}</div>
                <div className="text-muted-foreground text-[10px] sm:text-xs">{community.members}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-3 sm:p-4 bg-card border border-border hover:shadow-md transition-shadow duration-200">
        <h3 className="font-bold text-sm sm:text-base text-foreground mb-2 sm:mb-3">Highlights</h3>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
          {highlights.map((item) => (
            <div key={item.title} className="p-2 rounded hover:bg-secondary transition-colors">
              <div className="text-muted-foreground flex items-center gap-1.5">
                <item.icon className="w-3 h-3" />
                {item.label}
              </div>
              <div className="text-foreground font-medium line-clamp-2">{item.title}</div>
              <div className="text-muted-foreground text-[10px] sm:text-xs mt-0.5">{item.meta}</div>
            </div>
          ))}
        </div>
      </Card>

      {unlockedAchievements && <TrophyCase unlockedIds={unlockedAchievements} />}
    </div>
  )
}
