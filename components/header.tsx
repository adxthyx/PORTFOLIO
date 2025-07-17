"use client"

import { Search, Trophy, BarChart3, FolderOpen, Settings, User, Download, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface HeaderProps {
  onNavAction: (action: string) => void
}

export function Header({ onNavAction }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#27272a] sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-black dark:text-white text-xl bg-gradient-to-r from-[#FF4500] to-[#FF6B35] bg-clip-text text-transparent">
            adxthyx
          </span>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#FF4500] transition-colors" />
            <Input
              placeholder="Search portfolio, projects, skills..."
              className="pl-10 bg-gray-50 dark:bg-[#161618] border-gray-200 dark:border-[#27272a] text-black dark:text-white placeholder-gray-500 dark:placeholder-[#71717a] focus:border-[#FF4500] focus:ring-[#FF4500] transition-all duration-200"
            />
          </div>
        </div>

        <TooltipProvider>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-110"
                  onClick={() => onNavAction("achievements")}
                >
                  <Trophy className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Achievements & Certifications</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-110"
                  onClick={() => onNavAction("stats")}
                >
                  <BarChart3 className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub & Coding Stats</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-110"
                  onClick={() => onNavAction("projects")}
                >
                  <FolderOpen className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>All Projects</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-110"
                  onClick={() => onNavAction("contact")}
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contact Me</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-110"
                  onClick={() => onNavAction("settings")}
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme Settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-110"
                  onClick={() => onNavAction("resume")}
                >
                  <Download className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Resume</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-110"
                  onClick={() => onNavAction("profile")}
                >
                  <User className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>About Me</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </header>
  )
}
