import type { NextConfig } from "next";

// Static export is only switched on for the GitHub Pages build (see
// `npm run build:pages`), so the normal `npm run build` used for Netlify
// keeps the regular server build with optimized images.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "studio-antara";

const nextConfig: NextConfig = isGithubPages
  ? {
      output: "export",
      images: { unoptimized: true },
      basePath: `/${repoName}`,
      assetPrefix: `/${repoName}/`,
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
      },
    };

export default nextConfig;
