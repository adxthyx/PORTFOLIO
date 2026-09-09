import { z } from "zod"

export const contactLimits = {
  name: { min: 2, max: 80 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 2000 },
  email: { max: 254 },
} as const
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(contactLimits.name.min, "Please enter at least 2 characters.")
    .max(contactLimits.name.max),
  email: z.string().trim().email("Please enter a valid email address.").max(contactLimits.email.max),
  subject: z
    .string()
    .trim()
    .min(contactLimits.subject.min, "Please add a subject of at least 3 characters.")
    .max(contactLimits.subject.max),
  message: z
    .string()
    .trim()
    .min(contactLimits.message.min, "Please write at least 10 characters.")
    .max(contactLimits.message.max),
})
export type ContactValues = z.infer<typeof contactSchema>

export function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }
  return value.replace(/[&<>"']/g, (character) => entities[character])
}
