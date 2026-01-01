import type { NextConfig } from "next";

// Detect if running in GitHub Actions
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  basePath: isGitHubActions ? "/xenia-mirror" : "",
  output: "export", // Enable static export for GitHub Pages
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
