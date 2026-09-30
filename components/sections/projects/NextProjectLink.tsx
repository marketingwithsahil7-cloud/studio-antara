import { ImageReveal } from "@/components/ui/ImageReveal";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { TransitionLink } from "@/components/layout/TransitionLink";
import type { FeaturedProject } from "@/content/projects";

export function NextProjectLink({ project }: { project: FeaturedProject }) {
  return (
    <section className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5rem,10vw,8rem)] text-cream">
      <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-brass-soft">
        Next project
      </span>
      <TransitionLink href={`/projects/${project.slug}`} data-cursor="view" className="group mt-6 block">
        <ImageReveal>
          <MediaBlock src={project.hero} alt={project.title} ratio="21/9" />
        </ImageReveal>
        <h2 className="font-display mt-6 text-display-l font-normal transition-colors duration-300 group-hover:text-brass-soft">
          {project.title}
        </h2>
      </TransitionLink>
    </section>
  );
}
