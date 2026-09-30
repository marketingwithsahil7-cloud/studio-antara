import { ImageReveal } from "@/components/ui/ImageReveal";
import { MediaBlock } from "@/components/ui/MediaBlock";
import type { FeaturedProject } from "@/content/projects";

export function ProjectHero({ project }: { project: FeaturedProject }) {
  return (
    <section className="relative bg-ink pt-32">
      <ImageReveal className="px-[clamp(1.25rem,4vw,4.5rem)]">
        <MediaBlock src={project.hero} alt={project.title} ratio="21/9" priority />
      </ImageReveal>
      <h1 className="font-display relative z-10 mt-[-2.5rem] px-[clamp(1.25rem,4vw,4.5rem)] text-display-l font-normal text-cream [mix-blend-mode:difference] sm:mt-[-4rem] lg:mt-[-6rem]">
        {project.title}
      </h1>
    </section>
  );
}
