# Reddit Portfolio

A modern, highly interactive portfolio website inspired by Reddit's UI/UX. Built with Next.js 14, TypeScript, Tailwind CSS, and Radix UI.

## 🚀 Features
- **Reddit-style UI**: Post cards, sidebar communities, and header navigation mimicking the familiar Reddit interface.
- **Interactive Modals**: Seamless navigation through About, Experience, Education, Skills, and Projects using modal windows.
- **Live GitHub Stats**: Dynamically fetched repository counts, commit activity, stars, and top languages using the GitHub API.
- **Live LeetCode Stats**: Real-time coding statistics, including problems solved by difficulty and global ranking.
- **Category Filtering**: Quickly filter content by AI/ML projects, Web Development, or general "About" information.
- **Search Functionality**: Real-time search across all posts and project tags.
- **Dark Mode Support**: Beautifully crafted dark and light themes with smooth transitions.
- **Responsive Design**: Optimized for desktop, tablet, and mobile viewing.
- **Contact System**: Integrated contact form with EmailJS/Resend support.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: GitHub API, LeetCode GraphQL API
- **Theming**: [Next-Themes](https://github.com/pacocoursey/next-themes)

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm / npm / yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/adxthyx/reddit-portfolio.git
   cd reddit-portfolio
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   \`\`\`env
   GITHUB_TOKEN=your_github_personal_access_token
   # Optional: RESEND_API_KEY=your_resend_api_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/`: Next.js App Router and API routes.
- `components/`: Reusable UI components (Modals, Cards, Layout).
- `public/`: Static assets (images, PDFs).
- `styles/`: Global CSS and Tailwind configurations.
- `lib/`: Utility functions.

---
Built with ❤️ by [adxthyx](https://github.com/adxthyx)
