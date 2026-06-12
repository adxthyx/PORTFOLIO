"use client"

import { X, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"

interface ResumeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResumeModal({ open, onOpenChange }: ResumeModalProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border flex-shrink-0">
          <DialogTitle asChild>
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Resume</h2>
          </DialogTitle>
          <DialogDescription className="sr-only">View, download, or open my resume PDF</DialogDescription>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm px-2 sm:px-3"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInNewTab}
              className="flex items-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm px-2 sm:px-3"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">New Tab</span>
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </div>

        {/* PDF Viewer — only load the PDF once the dialog is actually open */}
        <div className="h-[calc(95vh-70px)] sm:h-[calc(95vh-80px)]">
          {open && <iframe src="/resume.pdf" className="w-full h-full border-0" title="Resume PDF" />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
