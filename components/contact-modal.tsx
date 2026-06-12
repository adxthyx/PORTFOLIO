"use client"

import type React from "react"

import { useState } from "react"
import { X, Send, Mail, User, MessageSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { toast } from "sonner"

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" })
        onOpenChange(false)
        toast.success("Message sent — I'll get back to you soon!")
      } else {
        toast.error("Failed to send message. Please try again or email me directly.")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      toast.error("Failed to send message. Please try again or email me directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-gradient rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <DialogTitle asChild>
                <h2 className="text-base sm:text-xl font-bold text-foreground">Contact Me</h2>
              </DialogTitle>
              <DialogDescription asChild>
                <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">Let's discuss your next project</p>
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

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground/80">
                Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 border-input focus:border-brand focus:ring-brand bg-background text-foreground"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground/80">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 border-input focus:border-brand focus:ring-brand bg-background text-foreground"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-foreground/80">
              Subject *
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              className="border-input focus:border-brand focus:ring-brand bg-background text-foreground"
              placeholder="What's this about?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-foreground/80">
              Message *
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="pl-10 pt-3 border-input focus:border-brand focus:ring-brand resize-none bg-background text-foreground"
                placeholder="Tell me about your project, ideas, or just say hello!"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1 border-input hover:bg-secondary bg-transparent">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-brand hover:bg-brand-hover text-white">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="px-6 py-4 bg-secondary border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            You can also reach me directly at{" "}
            <a href="mailto:adithyanarayana02@gmail.com" className="text-brand hover:underline">
              adithyanarayana02@gmail.com
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
