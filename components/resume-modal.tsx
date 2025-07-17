"use client"

import { X, Download, FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ResumeModalProps {
  onClose: () => void
}

export function ResumeModal({ onClose }: ResumeModalProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch("/placeholder/resume.pdf")
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "adxthyx-resume.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        throw new Error("Resume file not found")
      }
    } catch (error) {
      console.error("Download failed:", error)
      alert("Resume download failed. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const handleViewInNewTab = () => {
    window.open("/placeholder/resume.pdf", "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black dark:text-white">Resume</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Download or view my latest resume</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleViewInNewTab} variant="outline" className="gap-2 bg-transparent">
              <ExternalLink className="w-4 h-4" />
              View in New Tab
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-[#FF4500] hover:bg-[#E03E00] text-white gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* PDF Embed */}
          <div className="w-full h-[600px] border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <iframe src="/placeholder/resume.pdf" className="w-full h-full" title="Resume Preview" />
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Having trouble viewing the PDF? Try downloading it or opening in a new tab.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleViewInNewTab} variant="outline" className="gap-2 bg-transparent">
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </Button>
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-[#FF4500] hover:bg-[#E03E00] text-white gap-2"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? "Downloading..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
