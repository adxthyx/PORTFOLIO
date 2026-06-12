"use client"

import { X, Trophy, Award, Star, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"

interface AchievementsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const achievements = [
  {
    title: "Intern → Full-Time Conversion at HPE",
    issuer: "Hewlett Packard Enterprise",
    date: "2025",
    type: "achievement",
    description:
      "Converted a 6-month software engineering internship into a full-time SWE role, building dashboards, Agentic AI solutions, and Python automation",
  },
  {
    title: "B.E. in AI & Machine Learning — CGPA 8.8/10",
    issuer: "Ramaiah Institute of Technology, Bengaluru",
    date: "2021 - 2025",
    type: "academic",
    description: "Graduated with a degree in Artificial Intelligence and Machine Learning",
  },
  {
    title: "Senior Project: LLM-Powered Planning Solution",
    issuer: "Ramaiah Institute of Technology",
    date: "2025",
    type: "achievement",
    description:
      "Built an LLM-powered solution for supply and demand planners along with an AI-powered CLI system as the capstone project",
  },
  {
    title: "AskAPS — AI Assistant for HPE Supply Chain Planning",
    issuer: "Hewlett Packard Enterprise",
    date: "2025 - Present",
    type: "achievement",
    description:
      "Built and shipped a multi-module AI assistant on Microsoft Teams for APS supply chain planners — RAG over docs, similarity search over tickets, and natural-language-to-SQL for metrics",
  },
  {
    title: "Active Problem Solver",
    issuer: "LeetCode",
    date: "Ongoing",
    type: "achievement",
    description: "Consistent DSA practice — live solved counts and ranking are in the Stats dashboard",
    link: "https://leetcode.com/u/adxthyx/",
  },
]

export function AchievementsModal({ open, onOpenChange }: AchievementsModalProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "certification":
        return <Award className="w-5 h-5" />
      case "award":
        return <Trophy className="w-5 h-5" />
      case "achievement":
        return <Star className="w-5 h-5" />
      default:
        return <Trophy className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "certification":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "award":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "achievement":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "academic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <DialogTitle asChild>
                <h2 className="text-base sm:text-xl font-bold text-foreground">Achievements</h2>
              </DialogTitle>
              <DialogDescription asChild>
                <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">
                  Milestones and accomplishments so far
                </p>
              </DialogDescription>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto min-h-0">
          <div className="grid gap-3 sm:gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-secondary rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-gradient rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {getIcon(achievement.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-base sm:text-lg break-words">{achievement.title}</h3>
                        <p className="text-muted-foreground font-medium text-sm sm:text-base">{achievement.issuer}</p>
                        <p className="text-muted-foreground text-xs sm:text-sm mt-1">{achievement.description}</p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <Badge className={`${getTypeColor(achievement.type)} text-xs`}>{achievement.type}</Badge>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm mt-2">
                          <Calendar className="w-3 h-3" />
                          {achievement.date}
                        </div>
                      </div>
                    </div>

                    {achievement.link && (
                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-brand hover:text-brand-hover h-auto p-1"
                          onClick={() => window.open(achievement.link, "_blank")}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
