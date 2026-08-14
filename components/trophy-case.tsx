"use client"

import { Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ACHIEVEMENTS } from "@/lib/achievements"

interface TrophyCaseProps {
  unlockedIds: string[]
}

// Sidebar trophy case for visitor achievements. Locked entries show only a
// hint so there's something to hunt for.
export function TrophyCase({ unlockedIds }: TrophyCaseProps) {
  return (
    <Card className="p-3 sm:p-4 bg-card border border-border hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-sm sm:text-base text-foreground">Trophy Case</h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {unlockedIds.length}/{ACHIEVEMENTS.length}
        </span>
      </div>
      <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
        Visitor achievements — earned by poking around.
      </p>
      <div className="space-y-1">
        {ACHIEVEMENTS.map((a) => {
          const unlocked = unlockedIds.includes(a.id)
          return (
            <div
              key={a.id}
              className={`flex items-center gap-2.5 p-2 rounded transition-colors ${
                unlocked ? "hover:bg-secondary" : "opacity-60"
              }`}
            >
              <span className="w-6 text-center text-base flex-shrink-0" aria-hidden>
                {unlocked ? a.emoji : <Lock className="w-3.5 h-3.5 mx-auto text-muted-foreground" />}
              </span>
              <div className="min-w-0 text-xs sm:text-sm">
                {unlocked ? (
                  <>
                    <div className="text-foreground font-medium truncate">{a.title}</div>
                    <div className="text-muted-foreground text-[10px] sm:text-xs truncate">{a.description}</div>
                  </>
                ) : (
                  <div className="text-muted-foreground italic truncate">{a.hint}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
