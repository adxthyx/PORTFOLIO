"use client"

import { X, Github, Eye, ExternalLink, Star, Calendar, User, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface PostModalProps {
  post: any
  onClose: () => void
}

export function PostModal({ post, onClose }: PostModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const isAboutPost = post.type === "about"

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-[#27272a]">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#FF4500] to-[#FF6B35] p-6 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex items-start gap-4">
            {isAboutPost && (
              <img
                src="/a.png"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.timeAgo}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {post.upvotes} upvotes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#161618]">
          <div className="flex gap-1 p-1">
            {["overview", "details", "links"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#FF4500] text-white shadow-lg"
                    : "text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1a1a1c] hover:text-[#FF4500]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] bg-white dark:bg-[#161618]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="text-gray-700 dark:text-[#d4d4d8] leading-relaxed whitespace-pre-wrap">
                  {post.fullContent || post.content}
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-black dark:text-white">Technical Stack</h3>
                  </div>
                  <div className="space-y-2">
                    {post.tags?.map((tag: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-[#d4d4d8]">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-black dark:text-white">Impact</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-[#a1a1aa]">Upvotes</span>
                      <span className="font-semibold text-black dark:text-white">{post.upvotes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-[#a1a1aa]">Comments</span>
                      <span className="font-semibold text-black dark:text-white">{post.comments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-[#a1a1aa]">Community</span>
                      <span className="font-semibold text-black dark:text-white">{post.subreddit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "links" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.github && (
                  <Button
                    variant="outline"
                    className="h-auto p-6 border-2 border-gray-300 dark:border-[#3f3f46] hover:border-[#FF4500] hover:bg-[#FF4500]/5 transition-all duration-200 group bg-transparent"
                    onClick={() => window.open(post.github, "_blank")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Github className="w-6 h-6 text-white dark:text-black" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-black dark:text-white">View Source Code</div>
                        <div className="text-sm text-gray-600 dark:text-[#a1a1aa]">Explore the implementation</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                    </div>
                  </Button>
                )}

                {post.demo && (
                  <Button
                    variant="outline"
                    className="h-auto p-6 border-2 border-[#FF4500] bg-gradient-to-r from-[#FF4500]/5 to-[#FF6B35]/5 hover:from-[#FF4500]/10 hover:to-[#FF6B35]/10 transition-all duration-200 group"
                    onClick={() => window.open(post.demo, "_blank")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-black dark:text-white">Live Demo</div>
                        <div className="text-sm text-gray-600 dark:text-[#a1a1aa]">Try it out yourself</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#FF4500] ml-auto" />
                    </div>
                  </Button>
                )}
              </div>

              {!post.github && !post.demo && (
                <div className="text-center py-8">
                  <div className="text-gray-500 dark:text-[#71717a]">No external links available for this post</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
