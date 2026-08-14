/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/prep",
        destination: "https://prep-kohl-mu.vercel.app/",
      },
      {
        source: "/prep/:path*",
        destination: "https://prep-kohl-mu.vercel.app/:path*",
      },
      {
        source: "/chart",
        destination: "https://chartclimber.vercel.app/chart",
      },
      {
        source: "/chart/:path*",
        destination: "https://chartclimber.vercel.app/chart/:path*",
      },
    ]
  },
}

export default nextConfig
