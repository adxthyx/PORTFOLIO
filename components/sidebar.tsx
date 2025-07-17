"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, ExternalLink, Award, Calendar, TrendingUp } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-80 space-y-4">
      <Card className="p-4 bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#27272a] hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img
              src="/placeholder.svg?height=48&width=48"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#FF4500]"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#161618]"></div>
          </div>
          <div>
            <h3 className="font-bold text-black dark:text-white">u/adxthyx</h3>
            <p className="text-sm text-gray-500 dark:text-[#71717a]">Full Stack Developer</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-600 dark:text-[#a1a1aa]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF4500]" />
              <span>Karma</span>
            </div>
            <span className="font-medium text-black dark:text-white">2,847</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF4500]" />
              <span>Cake day</span>
            </div>
            <span className="font-medium text-black dark:text-white">Jan 15, 2019</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FF4500]" />
              <span>Posts</span>
            </div>
            <span className="font-medium text-black dark:text-white">127</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-[#27272a]">
          <h4 className="font-medium text-black dark:text-white mb-3">Connect with me</h4>
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-105"
              onClick={() => window.open("https://github.com/adxthyx", "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-105"
              onClick={() => window.open("https://linkedin.com/in/adxthyx", "_blank")}
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-105"
              onClick={() => window.open("https://twitter.com/adxthyx", "_blank")}
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500] transition-all duration-200 hover:scale-105"
              onClick={() => window.open("mailto:your.email@example.com", "_blank")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#27272a] hover:shadow-md transition-shadow duration-200">
        <h3 className="font-bold text-black dark:text-white mb-3">Tech Communities</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              r/
            </div>
            <div className="flex-1">
              <div className="text-black dark:text-white font-medium">webdev</div>
              <div className="text-gray-500 dark:text-[#71717a] text-xs">2.1M members</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              r/
            </div>
            <div className="flex-1">
              <div className="text-black dark:text-white font-medium">reactjs</div>
              <div className="text-gray-500 dark:text-[#71717a] text-xs">1.8M members</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1c] p-2 rounded transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              r/
            </div>
            <div className="flex-1">
              <div className="text-black dark:text-white font-medium">MachineLearning</div>
              <div className="text-gray-500 dark:text-[#71717a] text-xs">2.8M members</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#27272a] hover:shadow-md transition-shadow duration-200">
        <h3 className="font-bold text-black dark:text-white mb-3">Recent Activity</h3>
        <div className="space-y-4 text-sm">
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
