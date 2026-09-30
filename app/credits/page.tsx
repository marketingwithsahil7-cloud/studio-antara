import type { Metadata } from "next";
import { credits } from "@/content/credits";

export const metadata: Metadata = {
  title: "Image credits — Studio Antara",
};

export default function CreditsPage() {
  return (
    <section className="min-h-[60vh] bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-32 pt-40 text-cream">
      <h1 className="font-display text-display-l font-normal">Image credits</h1>
      <p className="measure mt-6 text-cream/70">
        Every photograph on this site is sourced from Unsplash. This is a concept project — the
        photographers below are not affiliated with Studio Antara.
      </p>

      <ul className="mt-12 grid gap-x-8 gap-y-3 border-t border-line pt-8 font-sans text-sm sm:grid-cols-2 lg:grid-cols-3">
        {credits.map((credit) => (
          <li key={credit.file} className="flex items-baseline justify-between gap-4 border-b border-line py-2">
            <span className="truncate text-muted">{credit.file.replace(/^\//, "")}</span>
            <a
              href={credit.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-cream hover:text-brass-soft"
            >
              @{credit.photographer}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
