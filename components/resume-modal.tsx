"use client"

import { X, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResumeModalProps {
  onClose: () => void
}

export function ResumeModal({ onClose }: ResumeModalProps) {
  const handleDownload = () => {
    // Create a mock PDF download
    const link = document.createElement("a")
    link.href = "/placeholder.pdf" // Replace with actual resume PDF path
    link.download = "adxthyx-resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
              <h2 className="text-xl font-bold text-black dark:text-white">Resume Preview</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Download or view my latest resume</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownload} className="bg-[#FF4500] hover:bg-[#E03E00] text-white gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Resume Preview */}
          <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-8 max-w-3xl mx-auto shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Your Name</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Full Stack Developer & AI Enthusiast</p>
              <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>your.email@example.com</span>
                <span>•</span>
                <span>+1 (555) 123-4567</span>
                <span>•</span>
                <span>linkedin.com/in/yourprofile</span>
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-black dark:text-white mb-3 border-b border-gray-200 dark:border-gray-600 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Passionate full-stack developer with 5+ years of experience building scalable web applications and
                  AI-powered solutions. Expertise in React, Node.js, Python, and machine learning technologies. Proven
                  track record of leading teams and delivering high-impact projects that serve 100K+ users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-black dark:text-white mb-3 border-b border-gray-200 dark:border-gray-600 pb-1">
                  Experience
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">Senior Full Stack Developer</h3>
                    <p className="text-gray-600 dark:text-gray-400">TechCorp • 2022 - Present</p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>Led team of 5 developers building enterprise applications</li>
                      <li>Increased application performance by 40% through optimization</li>
                      <li>Mentored 8 junior developers with 6 receiving promotions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">Full Stack Developer</h3>
                    <p className="text-gray-600 dark:text-gray-400">StartupXYZ • 2020 - 2022</p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>Built fintech platform handling $2M+ in transactions</li>
                      <li>Developed responsive web app with 99.9% uptime</li>
                      <li>Implemented OAuth2 authentication system</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-black dark:text-white mb-3 border-b border-gray-200 dark:border-gray-600 pb-1">
                  Skills
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-2">Frontend</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">React, TypeScript, Next.js, Tailwind CSS</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-2">Backend</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">Node.js, Python, PostgreSQL, MongoDB</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-2">AI/ML</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">TensorFlow, PyTorch, Scikit-learn</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-2">Cloud</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">AWS, Docker, Kubernetes</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-black dark:text-white mb-3 border-b border-gray-200 dark:border-gray-600 pb-1">
                  Education
                </h2>
                <div>
                  <h3 className="font-semibold text-black dark:text-white">Bachelor of Science in Computer Science</h3>
                  <p className="text-gray-600 dark:text-gray-400">University of Technology • 2015 - 2019</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">GPA: 3.8/4.0, Dean's List</p>
                </div>
              </section>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              This is a preview of my resume. Click the download button above to get the full PDF version.
            </p>
            <Button onClick={handleDownload} className="bg-[#FF4500] hover:bg-[#E03E00] text-white gap-2">
              <Download className="w-4 h-4" />
              Download Full Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
