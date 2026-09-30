import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// GitHub Pages serves this site from a /studio-antara subpath. next/image
// with unoptimized:true (required for static export) doesn't auto-prefix
// basePath onto plain string src values, so every local asset path needs
// to go through this. No-op on Netlify/local, where basePath is "".
export function assetPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return path.startsWith("/") ? `${base}${path}` : path;
}
