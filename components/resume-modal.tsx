"use client"

import { X, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Adithya-resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open("/resume.pdf", "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Resume</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInNewTab}
              className="flex items-center gap-2 bg-transparent"
            >
              <ExternalLink className="w-4 h-4" />
              New Tab
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="h-[calc(95vh-80px)]">
          <iframe src="/resume.pdf" className="w-full h-full border-0" title="Resume PDF" />
        </div>
      </div>
    </div>
  )
}
