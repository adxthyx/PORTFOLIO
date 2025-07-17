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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full transition-colors duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black dark:text-white">Settings</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Customize your experience</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-black dark:text-white mb-3">Theme Preference</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className={`flex flex-col gap-2 h-auto p-4 ${
                    theme === "light"
                      ? "bg-[#FF4500] hover:bg-[#E03E00] text-white"
                      : "border-gray-300 dark:border-gray-600 hover:border-[#FF4500] hover:text-[#FF4500] bg-transparent"
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
                      ? "bg-[#FF4500] hover:bg-[#E03E00] text-white"
                      : "border-gray-300 dark:border-gray-600 hover:border-[#FF4500] hover:text-[#FF4500] bg-transparent"
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
                      ? "bg-[#FF4500] hover:bg-[#E03E00] text-white"
                      : "border-gray-300 dark:border-gray-600 hover:border-[#FF4500] hover:text-[#FF4500] bg-transparent"
                  }`}
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="w-5 h-5" />
                  <span className="text-sm">System</span>
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Theme changes will be applied immediately and saved for your next visit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
