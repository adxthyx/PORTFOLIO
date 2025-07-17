"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUp, ArrowDown, MessageSquare, Share, Bookmark, Eye, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PostCardProps {
  id?: string
  title: string
  content: string
  upvotes: number
  comments: number
  subreddit: string
  author: string
  timeAgo: string
  type?: string
  tags?: string[]
  github?: string
  demo?: string
  onClick?: () => void
}

export function PostCard({
  title,
  content,
  upvotes,
  comments,
  subreddit,
  author,
  timeAgo,
  type,
  tags = [],
  github,
  demo,
  onClick,
}: PostCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes)
  const [isHovered, setIsHovered] = useState(false)

  const handleVote = (voteType: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation()
    if (userVote === voteType) {
      setUserVote(null)
      setCurrentUpvotes(voteType === "up" ? currentUpvotes - 1 : currentUpvotes + 1)
    } else {
      const prevVote = userVote
      setUserVote(voteType)

      if (prevVote === null) {
        setCurrentUpvotes(voteType === "up" ? currentUpvotes + 1 : currentUpvotes - 1)
      } else {
        setCurrentUpvotes(voteType === "up" ? currentUpvotes + 2 : currentUpvotes - 2)
      }
    }
  }

  return (
    <Card
      className={`bg-white border border-gray-200 transition-all duration-300 cursor-pointer ${
        isHovered
          ? "border-[#FF4500] shadow-lg transform translate-y-[-2px] shadow-orange-100"
          : "hover:border-gray-300 hover:shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex">
        <div className="flex flex-col items-center p-3 bg-gray-50 border-r border-gray-200 min-w-[60px]">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-auto transition-all duration-200 ${
              userVote === "up"
                ? "text-[#FF4500] bg-orange-50 scale-110"
                : "text-gray-400 hover:text-[#FF4500] hover:bg-orange-50 hover:scale-110"
            }`}
            onClick={(e) => handleVote("up", e)}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
          <span
            className={`text-sm font-bold transition-all duration-200 ${
              userVote === "up"
                ? "text-[#FF4500] scale-110"
                : userVote === "down"
                  ? "text-[#7193FF] scale-110"
                  : "text-gray-600"
            }`}
          >
            {currentUpvotes}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-auto transition-all duration-200 ${
              userVote === "down"
                ? "text-[#7193FF] bg-blue-50 scale-110"
                : "text-gray-400 hover:text-[#7193FF] hover:bg-blue-50 hover:scale-110"
            }`}
            onClick={(e) => handleVote("down", e)}
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="font-medium text-[#FF4500] hover:underline cursor-pointer">{subreddit}</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Posted by {author}</span>
            <span>•</span>
            <span>{timeAgo}</span>
            {timeAgo === "pinned" && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                PINNED
              </Badge>
            )}
            {type && (
              <Badge variant="outline" className="text-xs border-[#FF4500] text-[#FF4500]">
                {type.toUpperCase()}
              </Badge>
            )}
          </div>

          <h2
            className={`text-lg font-semibold text-black mb-2 transition-all duration-200 ${
              isHovered ? "text-[#FF4500]" : "hover:text-[#FF4500]"
            }`}
          >
            {title}
          </h2>

          <div className="text-gray-700 mb-3 line-clamp-3">{content}</div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-500">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:bg-gray-100 hover:text-[#FF4500] gap-1 h-auto p-2 transition-all duration-200 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{comments} Comments</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:bg-gray-100 hover:text-[#FF4500] gap-1 h-auto p-2 transition-all duration-200 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:bg-gray-100 hover:text-[#FF4500] gap-1 h-auto p-2 transition-all duration-200 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <Bookmark className="w-4 h-4" />
                <span className="text-sm">Save</span>
              </Button>
            </div>

            {(github || demo) && (
              <div className="flex items-center gap-2">
                {github && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 h-auto p-2 border-gray-300 hover:border-[#FF4500] hover:text-[#FF4500] transition-all duration-200 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(github, "_blank")
                    }}
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </Button>
                )}
                {demo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 h-auto p-2 border-gray-300 hover:border-[#FF4500] hover:text-[#FF4500] transition-all duration-200 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(demo, "_blank")
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Demo</span>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
