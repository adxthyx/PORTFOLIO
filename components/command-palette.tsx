"use client"

import { useEffect } from "react"
import {
  FileText,
  Trophy,
  BarChart3,
  FolderOpen,
  Settings,
  Download,
  MessageSquare,
  Sun,
  Moon,
  Monitor,
  Github,
  Linkedin,
  Code2,
  Mail,
} from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import { useTheme } from "@/components/theme-provider"
import { allPosts, profile, type Post } from "@/lib/content"

export type ModalId = "contact" | "achievements" | "stats" | "projects" | "settings" | "resume"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectPost: (post: Post) => void
  onModal: (id: ModalId) => void
}

const MODAL_ACTIONS: Array<{ id: ModalId; label: string; icon: typeof Trophy }> = [
  { id: "contact", label: "Contact me", icon: MessageSquare },
  { id: "resume", label: "View resume", icon: Download },
  { id: "stats", label: "GitHub & LeetCode stats", icon: BarChart3 },
  { id: "projects", label: "All projects", icon: FolderOpen },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
]

const LINKS = [
  { label: "GitHub", icon: Github, url: profile.links.github },
  { label: "LinkedIn", icon: Linkedin, url: profile.links.linkedin },
  { label: "LeetCode", icon: Code2, url: profile.links.leetcode },
  { label: "Email", icon: Mail, url: `mailto:${profile.links.email}` },
]

export function CommandPalette({ open, onOpenChange, onSelectPost, onModal }: CommandPaletteProps) {
  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const run = (action: () => void) => {
    onOpenChange(false)
    action()
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search posts..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Posts">
          {allPosts.map((post) => (
            <CommandItem key={post.id} value={`${post.title} ${post.flair}`} onSelect={() => run(() => onSelectPost(post))}>
              <FileText className="text-muted-foreground" />
              <span className="truncate">{post.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {MODAL_ACTIONS.map(({ id, label, icon: Icon }) => (
            <CommandItem key={id} onSelect={() => run(() => onModal(id))}>
              <Icon className="text-muted-foreground" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => run(() => setTheme("light"))}>
            <Sun className="text-muted-foreground" />
            Light
          </CommandItem>
          <CommandItem onSelect={() => run(() => setTheme("dark"))}>
            <Moon className="text-muted-foreground" />
            Dark
          </CommandItem>
          <CommandItem onSelect={() => run(() => setTheme("system"))}>
            <Monitor className="text-muted-foreground" />
            System
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          {LINKS.map(({ label, icon: Icon, url }) => (
            <CommandItem key={label} onSelect={() => run(() => window.open(url, "_blank"))}>
              <Icon className="text-muted-foreground" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
