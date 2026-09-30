import type { Metadata } from "next";
import { Suspense } from "react";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";
import { gallery } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Selected work — Studio Antara",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(3rem,6vw,4rem)] pt-40 text-cream">
        <div className="flex items-end justify-between gap-6">
          <TextReveal as="h1" className="font-display text-display-l font-normal">
            Selected work
          </TextReveal>
          <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
            ({gallery.length})
          </span>
        </div>
      </section>

      <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5.5rem,12vw,10rem)] text-cream">
        <Suspense fallback={null}>
          <ProjectsGrid />
        </Suspense>
      </section>

      <section className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5rem,10vw,8rem)] text-center text-cream">
        <p className="font-display text-h2 font-normal">Planning something similar?</p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact">Begin a conversation</Button>
        </div>
      </section>
    </>
  );
}
