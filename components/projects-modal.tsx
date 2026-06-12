"use client"

import { X, FolderOpen, Github, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommentSection } from "@/components/comment-section"
import { useEffect } from "react"

interface ProjectsModalProps {
  projects: any[]
  onClose: () => void
}

export function ProjectsModal({ projects, onClose }: ProjectsModalProps) {
  // Create context string from all projects
  const projectsContext = projects.map((project, index) => 
    `${index + 1}. ${project.title}: ${project.content}${project.tags ? ` (Tech: ${project.tags.join(', ')})` : ''}`
  ).join('\n\n')

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div 
        className="bg-card rounded-lg max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] my-2 sm:my-0 overflow-hidden transition-colors duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-foreground">All Projects</h2>
              <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">Complete portfolio of my work</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Content - Scrollable (75% of space) */}
        <div 
          className="flex-[3] min-h-0 overflow-y-auto"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="p-6 bg-secondary border-0 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">{project.content}</p>
                  </div>
                  <div className="flex items-center gap-1 text-brand ml-4">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">{project.upvotes}</span>
                  </div>
                </div>

                {project.tags && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-secondary text-foreground/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {project.subreddit} • {project.timeAgo}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 h-auto p-2 border-input hover:border-brand hover:text-brand transition-all duration-200 bg-transparent"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 h-auto p-2 border-input hover:border-brand hover:text-brand transition-all duration-200 bg-transparent"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <Eye className="w-3 h-3" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          </div>
        </div>

        {/* Comment Section - Fixed at Bottom (25% of space) */}
        <div className="flex-[1] min-h-0 max-h-[220px] border-t border-border overflow-hidden flex-shrink-0 flex flex-col">
          <CommentSection
            postTitle="All Projects"
            context={projectsContext || "This is my portfolio of projects. Ask me anything about them!"}
            postType="project"
          />
        </div>
      </div>
    </div>
  )
}
