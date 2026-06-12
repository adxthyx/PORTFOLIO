export interface GitHubStats {
  totalRepos: number
  totalCommits: number
  totalPRs: number
  totalStars: number
  totalForks: number
  followers: number
  following: number
  yearsActive: number
  currentStreak: number
  profileViews: number
  topLanguages: Array<{
    name: string
    percentage: number
    color: string
  }>
}

export interface LeetCodeStats {
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
