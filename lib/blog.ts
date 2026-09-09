export interface BlogPost {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified?: string
  content: string
  tags: string[]
}

// Currently no published articles (avoiding fake content, ready for future posts)
export const publishedPosts: BlogPost[] = []
