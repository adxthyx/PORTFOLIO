"use client"

import { X, Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-card rounded-lg max-w-md w-full transition-colors duration-300">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-foreground">Settings</h2>
              <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">Customize your experience</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-foreground mb-3 text-sm sm:text-base">Theme Preference</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className={`flex flex-col gap-2 h-auto p-4 ${
                    theme === "light"
                      ? "bg-brand hover:bg-brand-hover text-white"
                      : "border-input hover:border-brand hover:text-brand bg-transparent"
                  }`}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="w-5 h-5" />
                  <span className="text-sm">Light</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className={`flex flex-col gap-2 h-auto p-4 ${
                    theme === "dark"
                      ? "bg-brand hover:bg-brand-hover text-white"
                      : "border-input hover:border-brand hover:text-brand bg-transparent"
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="w-5 h-5" />
                  <span className="text-sm">Dark</span>
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  className={`flex flex-col gap-2 h-auto p-4 ${
                    theme === "system"
                      ? "bg-brand hover:bg-brand-hover text-white"
                      : "border-input hover:border-brand hover:text-brand bg-transparent"
                  }`}
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="w-5 h-5" />
                  <span className="text-sm">System</span>
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Theme changes will be applied immediately and saved for your next visit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
