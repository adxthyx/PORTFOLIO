"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Loader2 } from "lucide-react"

interface Comment {
  id: string
  question: string
  answer: string
  timestamp: Date
}

interface CommentSectionProps {
  postTitle: string
  context: string
  postType?: "post" | "project"
}

export function CommentSection({ postTitle, context, postType = "post" }: CommentSectionProps) {
  const [question, setQuestion] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const commentsContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new comments are added
  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight
    }
  }, [comments, isLoading])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!question.trim() || isLoading) return

    const userQuestion = question.trim()
    const tempId = Date.now().toString()
    setQuestion("")
    setIsLoading(true)

    // Add question immediately (optimistic UI)
    const tempComment: Comment = {
      id: tempId,
      question: userQuestion,
      answer: "",
      timestamp: new Date(),
    }
    setComments((prev) => [...prev, tempComment])

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,
          context: context,
          postTitle: postTitle,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get answer")
      }

      const data = await response.json()
      
      // Update the comment with the answer
      setComments((prev) => 
        prev.map((comment) => 
          comment.id === tempId 
            ? { ...comment, answer: data.answer }
            : comment
        )
      )
    } catch (error) {
      console.error("Error submitting question:", error)
      // Update the comment with error message
      setComments((prev) => 
        prev.map((comment) => 
          comment.id === tempId 
            ? { ...comment, answer: "Sorry, I couldn't process your question right now. Please try again later." }
            : comment
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#161618] flex flex-col h-full overflow-hidden">
      {/* Comment Input Area */}
      <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-[#27272a] flex-shrink-0">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF4500] flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-[10px] sm:text-xs font-bold">u</span>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 min-w-0 flex gap-2 items-center">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask anything about ${postType === "project" ? "this project" : "this post"} or me...`}
              className="h-8 sm:h-9 min-h-[32px] sm:min-h-[36px] max-h-[32px] sm:max-h-[36px] resize-none bg-gray-50 dark:bg-[#0a0a0a] border-gray-300 dark:border-[#3f3f46] focus:border-[#FF4500] focus:ring-[#FF4500] text-xs sm:text-sm flex-1 py-1.5 px-2"
              disabled={isLoading}
              rows={1}
            />
            <Button
              type="submit"
              disabled={!question.trim() || isLoading}
              className="bg-[#FF4500] hover:bg-[#E03E00] text-white px-3 py-1.5 h-8 sm:h-9 text-xs sm:text-sm flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
              ) : (
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Comments List - Fixed height with scrollbar */}
      <div 
        ref={commentsContainerRef}
        className="flex-1 min-h-0 overflow-y-scroll overflow-x-hidden p-2 sm:p-3 space-y-3"
        style={{ 
          maxHeight: '100%',
          WebkitOverflowScrolling: 'touch'
        }}
        onWheel={(e) => {
          e.stopPropagation()
        }}
        onTouchMove={(e) => {
          e.stopPropagation()
        }}
      >
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-[#71717a] mb-1" />
            <p className="text-xs sm:text-sm text-gray-500 dark:text-[#a1a1aa]">
              No questions yet. Be the first to ask!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-1.5">
              {/* Question */}
              <div className="flex gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-400 dark:bg-[#71717a] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px] sm:text-xs font-bold">u</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-100 dark:bg-[#1a1a1c] rounded-lg p-1.5 sm:p-2">
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-[#d4d4d8] break-words">
                      {comment.question}
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#71717a] mt-0.5">
                    {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Answer */}
              {comment.answer && (
                <div className="flex gap-2 ml-3 sm:ml-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF4500] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] sm:text-xs font-bold">A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-[#FF4500]/10 dark:bg-[#FF4500]/20 border-l-2 border-[#FF4500] rounded-lg p-1.5 sm:p-2">
                      <p className="text-xs sm:text-sm text-gray-800 dark:text-[#d4d4d8] break-words whitespace-pre-wrap">
                        {comment.answer}
                      </p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-[#71717a] mt-0.5">
                      u/adxthyx • {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              )}
              {!comment.answer && (
                <div className="flex gap-2 ml-3 sm:ml-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF4500] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] sm:text-xs font-bold">A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-[#FF4500]/10 dark:bg-[#FF4500]/20 border-l-2 border-[#FF4500] rounded-lg p-1.5 sm:p-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin text-[#FF4500]" />
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-[#71717a]">
                          Thinking...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
