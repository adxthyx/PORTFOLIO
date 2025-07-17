"use client"

import { X, Download, ExternalLink, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/placeholder/resume.pdf"
    link.download = "adxthyx-resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open("/placeholder/resume.pdf", "_blank")
  }

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Resume</h2>
              <p className="text-white/80 text-sm">Download or view my latest resume</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-white hover:bg-white/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenInNewTab}
              className="text-white hover:bg-white/20 flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              New Tab
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="relative h-[calc(95vh-100px)] bg-gray-50 dark:bg-gray-950">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-[#FF4500]" />
                <span className="text-gray-600 dark:text-gray-400">Loading resume...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Resume not found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please add your resume.pdf file to the /public/placeholder/ directory
                </p>
                <Button onClick={handleDownload} variant="outline">
                  Try Download Anyway
                </Button>
              </div>
            </div>
          )}

          <iframe
            src="/placeholder/resume.pdf"
            className="w-full h-full border-0"
            title="Resume PDF"
            onLoad={handleLoad}
            onError={handleError}
            style={{ display: loading || error ? "none" : "block" }}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            <div className="flex gap-2">
              <Button onClick={handleDownload} size="sm" className="bg-[#FF4500] hover:bg-[#FF4500]/90">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
