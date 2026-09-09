export interface GitHubStats {
  totalRepos: number
  totalPRs: number | null
  totalStars: number
  totalForks: number
  followers: number
  following: number
  yearsActive: number
  updatedAt: string
  topLanguages: Array<{
    name: string
    percentage: number
    color: string
  }>
}

export interface LeetCodeStats {
  updatedAt: string
  totalSolved: number
  easy: number
  medium: number
  hard: number
  ranking: number
  languages: Array<{
    name: string
    solved: number
  }>
  userAvatar: string
  realName: string
}
