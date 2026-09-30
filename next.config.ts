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
      // next/image skips its usual basePath-prefixing logic entirely when
      // `unoptimized: true` (it only lives in the /_next/image URL builder),
      // so every plain "/foo.jpg" src we pass in is missing the prefix.
      // Expose it here and prepend it manually via lib/utils.ts#assetPath.
      env: { NEXT_PUBLIC_BASE_PATH: `/${repoName}` },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
      },
      env: { NEXT_PUBLIC_BASE_PATH: "" },
    };

export default nextConfig;
