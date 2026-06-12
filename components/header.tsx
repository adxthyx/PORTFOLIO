"use client"

import { Search, Trophy, BarChart3, FolderOpen, Settings, User, Download, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface HeaderProps {
  onNavAction: (action: string) => void
  onSearch: (query: string) => void
  searchQuery: string
  onOpenPalette?: () => void
}

export function Header({ onNavAction, onSearch, searchQuery, onOpenPalette }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="w-full px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <button
          onClick={() => onNavAction("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-gradient rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xs sm:text-sm">A</span>
          </div>
          <span className="font-bold text-foreground text-base sm:text-lg md:text-xl bg-brand-gradient bg-clip-text text-transparent">
            adxthyx
          </span>
        </button>

        <div className="flex-1 w-full sm:max-w-2xl sm:mx-4 order-3 sm:order-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-brand transition-colors" />
            <Input
              placeholder="Search r/adithya..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-14 w-full bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-brand transition-all duration-200 text-sm"
            />
            {onOpenPalette && (
              <button
                type="button"
                onClick={onOpenPalette}
                aria-label="Open command palette"
                className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:text-brand hover:border-brand transition-colors"
              >
                ⌘K
              </button>
            )}
          </div>
        </div>

        <TooltipProvider>
          <div className="flex items-center justify-evenly sm:justify-end gap-1 sm:gap-2 overflow-x-auto w-full sm:flex-1 pb-1 sm:pb-0 order-2 sm:order-3 scrollbar-hide">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 hover:scale-110 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex-1 sm:flex-none"
                  onClick={() => onNavAction("achievements")}
                >
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className="text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 hover:scale-110 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex-1 sm:flex-none"
                  onClick={() => onNavAction("stats")}
                >
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className="text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 hover:scale-110 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex-1 sm:flex-none"
                  onClick={() => onNavAction("projects")}
                >
                  <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className="text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 hover:scale-110 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex-1 sm:flex-none"
                  onClick={() => onNavAction("contact")}
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className="text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 hover:scale-110 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex-1 sm:flex-none"
                  onClick={() => onNavAction("settings")}
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className="text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 hover:scale-110 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex-1 sm:flex-none"
                  onClick={() => onNavAction("resume")}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className="text-muted-foreground hover:bg-secondary hover:text-brand transition-all duration-200 hover:scale-110 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex-1 sm:flex-none"
                  onClick={() => onNavAction("profile")}
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
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
