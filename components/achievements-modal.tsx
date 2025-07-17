"use client"

import { X, Trophy, Award, Star, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AchievementsModalProps {
  onClose: () => void
}

const achievements = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    type: "certification",
    description: "Professional-level certification demonstrating expertise in designing distributed systems on AWS",
    credentialId: "AWS-SAA-123456",
    link: "https://aws.amazon.com/certification/",
  },
  {
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2022",
    type: "certification",
    description: "Expertise in developing scalable applications on Google Cloud Platform",
    credentialId: "GCP-PD-789012",
    link: "https://cloud.google.com/certification/",
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2021",
    type: "certification",
    description: "Advanced knowledge of MongoDB database design and development",
    credentialId: "MDB-DEV-345678",
    link: "https://university.mongodb.com/",
  },
  {
    title: "React Conf 2023 Speaker",
    issuer: "React Community",
    date: "2023",
    type: "achievement",
    description: "Presented 'Building Accessible Components' to 2000+ developers",
    link: "https://conf.reactjs.org/",
  },
  {
    title: "Hackathon Winner - AI Innovation",
    issuer: "TechCorp Annual Hackathon",
    date: "2022",
    type: "award",
    description: "First place for developing an AI-powered code review assistant",
    prize: "$10,000",
  },
  {
    title: "Open Source Contributor",
    issuer: "GitHub",
    date: "2019-Present",
    type: "achievement",
    description: "Contributed to 15+ open-source projects with 500+ stars combined",
    stats: "500+ commits, 15 projects",
  },
  {
    title: "Dean's List",
    issuer: "University of Technology",
    date: "2015-2019",
    type: "academic",
    description: "Maintained GPA above 3.5 for 6 consecutive semesters",
  },
  {
    title: "Computer Science Outstanding Student",
    issuer: "University of Technology",
    date: "2019",
    type: "award",
    description: "Awarded to top 5% of graduating class for academic excellence",
  },
]

export function AchievementsModal({ onClose }: AchievementsModalProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "certification":
        return <Award className="w-5 h-5" />
      case "award":
        return <Trophy className="w-5 h-5" />
      case "achievement":
        return <Star className="w-5 h-5" />
      default:
        return <Trophy className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "certification":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "award":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "achievement":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "academic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black dark:text-white">Achievements & Certifications</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Professional accomplishments and recognitions</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {getIcon(achievement.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-black dark:text-white text-lg">{achievement.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">{achievement.issuer}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{achievement.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Badge className={getTypeColor(achievement.type)}>{achievement.type}</Badge>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-2">
                          <Calendar className="w-3 h-3" />
                          {achievement.date}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 items-center">
                      {achievement.credentialId && (
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                          ID: {achievement.credentialId}
                        </span>
                      )}
                      {achievement.prize && (
                        <span className="text-xs bg-yellow-200 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-2 py-1 rounded">
                          Prize: {achievement.prize}
                        </span>
                      )}
                      {achievement.stats && (
                        <span className="text-xs bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded">
                          {achievement.stats}
                        </span>
                      )}
                      {achievement.link && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#FF4500] hover:text-[#E03E00] h-auto p-1"
                          onClick={() => window.open(achievement.link, "_blank")}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Verify
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
