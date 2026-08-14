"use client"

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
  Briefcase,
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
  onToggleRecruiter?: () => void
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

// The global ⌘K listener lives in app/page.tsx — this component is loaded
// lazily on first open, so it can't own its open shortcut.
export function CommandPalette({ open, onOpenChange, onSelectPost, onModal, onToggleRecruiter }: CommandPaletteProps) {
  const { setTheme } = useTheme()

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
          {onToggleRecruiter && (
            <CommandItem onSelect={() => run(onToggleRecruiter)}>
              <Briefcase className="text-muted-foreground" />
              Toggle recruiter mode
            </CommandItem>
          )}
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
