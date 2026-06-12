"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, ExternalLink, Award, Calendar, TrendingUp } from "lucide-react"

export function ProfileCard() {
  return (
    <Card className="p-3 sm:p-4 bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#27272a] hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="relative flex-shrink-0">
            <img src="/a.png" alt="Profile" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#FF4500]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#161618]"></div>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-base text-black dark:text-white truncate">u/adxthyx</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-[#71717a] truncate">Developer/Software Engineer</p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 dark:text-[#a1a1aa]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4500] flex-shrink-0" />
              <span>Karma</span>
            </div>
            <span className="font-medium text-black dark:text-white">2,847</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4500] flex-shrink-0" />
              <span className="truncate">Cake day</span>
            </div>
            <span className="font-medium text-black dark:text-white text-xs sm:text-sm">Jan 15, 2019</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4500] flex-shrink-0" />
              <span>Posts</span>
            </div>
            <span className="font-medium text-black dark:text-white">127</span>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-[#27272a]">
          <h4 className="font-medium text-sm sm:text-base text-black dark:text-white mb-2 sm:mb-3">Connect with me</h4>
          <div className="space-y-1 sm:space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
              onClick={() => window.open("https://github.com/adxthyx", "_blank")}
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate">GitHub</span>
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
              onClick={() => window.open("https://linkedin.com/in/adxthyx", "_blank")}
            >
              <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate">LinkedIn</span>
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
              onClick={() => window.open("https://twitter.com/adxthyx", "_blank")}
            >
              <Twitter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate">Twitter</span>
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
              onClick={() => window.open("mailto:adithyanarayana02@gmail.com", "_blank")}
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate">Email</span>
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </Button>
          </div>
        </div>
      </Card>
  )
}

export function Sidebar() {
  return (
    <div className="w-full lg:w-80 space-y-3 sm:space-y-4">
      {/* Profile card shown on desktop, hidden on mobile (shown separately before posts) */}
      <div className="hidden lg:block">
        <ProfileCard />
      </div>

      <Card className="p-3 sm:p-4 bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#27272a] hover:shadow-md transition-shadow duration-200">
        <h3 className="font-bold text-sm sm:text-base text-black dark:text-white mb-2 sm:mb-3">Tech Communities</h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0">
              r/
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-black dark:text-white font-medium truncate text-xs sm:text-sm">webdev</div>
              <div className="text-gray-500 dark:text-[#71717a] text-[10px] sm:text-xs">2.1M members</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0">
              r/
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-black dark:text-white font-medium truncate text-xs sm:text-sm">reactjs</div>
              <div className="text-gray-500 dark:text-[#71717a] text-[10px] sm:text-xs">1.8M members</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0">
              r/
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-black dark:text-white font-medium truncate text-xs sm:text-sm">MachineLearning</div>
              <div className="text-gray-500 dark:text-[#71717a] text-[10px] sm:text-xs">2.8M members</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-3 sm:p-4 bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#27272a] hover:shadow-md transition-shadow duration-200">
        <h3 className="font-bold text-sm sm:text-base text-black dark:text-white mb-2 sm:mb-3">Recent Activity</h3>
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
          <div className="hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="text-gray-600 dark:text-[#a1a1aa]">Commented on</div>
            <div className="text-black dark:text-white font-medium line-clamp-2">
              "Best practices for React performance optimization"
            </div>
            <div className="text-gray-500 dark:text-[#71717a] text-xs">2h ago • r/reactjs</div>
          </div>
          <div className="hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="text-gray-600 dark:text-[#a1a1aa]">Posted in r/webdev</div>
            <div className="text-black dark:text-white font-medium line-clamp-2">
              "My journey from junior to senior developer"
            </div>
            <div className="text-gray-500 dark:text-[#71717a] text-xs">1d ago • 234 upvotes</div>
          </div>
          <div className="hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="text-gray-600 dark:text-[#a1a1aa]">Awarded Gold in</div>
            <div className="text-black dark:text-white font-medium line-clamp-2">
              "AI-powered code review tool showcase"
            </div>
            <div className="text-gray-500 dark:text-[#71717a] text-xs">3d ago • r/MachineLearning</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
