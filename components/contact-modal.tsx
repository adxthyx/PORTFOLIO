"use client"

import { useEffect, useRef, useState } from "react"
import { X, Send, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { contactLimits, contactSchema, type ContactValues } from "@/lib/contact"
import { profile } from "@/lib/content"
import { toast } from "sonner"

const emptyForm: ContactValues = { name: "", email: "", subject: "", message: "" }
export function ContactModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [values, setValues] = useState(emptyForm)
  const [fields, setFields] = useState<Partial<Record<keyof ContactValues, string[]>>>({})
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const request = useRef<AbortController | null>(null)
  useEffect(() => () => request.current?.abort(), [])
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (submitting) return
    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      setFields(parsed.error.flatten().fieldErrors)
      setError("Please check the highlighted fields.")
      return
    }
    setFields({})
    setError("")
    setSubmitting(true)
    const controller = new AbortController()
    request.current = controller
    const timeout = setTimeout(() => controller.abort(), 20000)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      })
      const data = await response.json()
      if (!response.ok) {
        if (data.fields) setFields(data.fields)
        throw new Error(data.error || "Couldn't send your message. Please try again.")
      }
      setValues(emptyForm)
      onOpenChange(false)
      toast.success("Message sent. Thanks for saying hello!")
    } catch (cause) {
      setError(
        controller.signal.aborted
          ? "Couldn't confirm delivery in time. You can also reach me by email below."
          : cause instanceof Error
            ? cause.message
            : "Couldn't connect. Your message is still here.",
      )
    } finally {
      clearTimeout(timeout)
      request.current = null
      setSubmitting(false)
    }
  }
  const change = (name: keyof ContactValues, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }))
    setFields((previous) => ({ ...previous, [name]: undefined }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92dvh] w-[calc(100vw-2rem)] max-w-xl flex-col rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Say hello<span className="text-brand">.</span>
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A project idea, a question, or a good conversation. My inbox is open.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-full"
              aria-label="Close contact form"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>
        <div className="min-h-0 overflow-y-auto p-5 sm:p-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {(["name", "email"] as const).map((name) => (
                <div key={name} className="space-y-2">
                  <Label htmlFor={`contact-${name}`}>{name === "name" ? "Your name" : "Your email"}</Label>
                  <Input
                    id={`contact-${name}`}
                    name={name}
                    type={name === "email" ? "email" : "text"}
                    autoComplete={name}
                    required
                    minLength={name === "name" ? contactLimits.name.min : undefined}
                    maxLength={contactLimits[name].max}
                    value={values[name]}
                    onChange={(event) => change(name, event.target.value)}
                    aria-invalid={Boolean(fields[name])}
                    aria-describedby={fields[name] ? `contact-${name}-error` : undefined}
                    className="h-11 bg-background text-base sm:text-sm"
                    disabled={submitting}
                  />
                  {fields[name] && (
                    <p id={`contact-${name}-error`} className="text-xs text-destructive">
                      {fields[name]?.[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-subject">What&apos;s on your mind?</Label>
              <Input
                id="contact-subject"
                name="subject"
                required
                minLength={contactLimits.subject.min}
                maxLength={contactLimits.subject.max}
                value={values.subject}
                onChange={(event) => change("subject", event.target.value)}
                aria-invalid={Boolean(fields.subject)}
                aria-describedby={fields.subject ? "contact-subject-error" : undefined}
                className="h-11 bg-background text-base sm:text-sm"
                disabled={submitting}
              />
              {fields.subject && (
                <p id="contact-subject-error" className="text-xs text-destructive">
                  {fields.subject[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Your message</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                minLength={contactLimits.message.min}
                maxLength={contactLimits.message.max}
                value={values.message}
                onChange={(event) => change("message", event.target.value)}
                aria-invalid={Boolean(fields.message)}
                aria-describedby="contact-message-help"
                className="resize-y bg-background text-base sm:text-sm"
                disabled={submitting}
              />
              <p
                id="contact-message-help"
                className={`text-xs ${fields.message ? "text-destructive" : "text-muted-foreground"}`}
              >
                {fields.message?.[0] ||
                  `${values.message.length}/${contactLimits.message.max} characters · at least 10`}
              </p>
            </div>
            {error && (
              <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 w-full gap-2 rounded-full bg-brand-solid text-white hover:bg-brand-hover"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? "Sending…" : "Send message"}
            </Button>
          </form>
          <a
            href={`mailto:${profile.links.email}`}
            className="mt-5 flex items-center justify-center gap-2 break-all text-xs text-muted-foreground hover:text-brand"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {profile.links.email}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
