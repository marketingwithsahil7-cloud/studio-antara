import { MediaBlock } from "@/components/ui/MediaBlock";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { featuredProjects } from "@/content/projects";

const ratios: ("4/5" | "3/4" | "16/9")[] = ["4/5", "3/4", "16/9"];

export function FeaturedProjects() {
  return (
    <section id="featured-projects" className="bg-ink text-cream">
      {featuredProjects.map((project, i) => {
        const flipped = i % 2 === 1;
        return (
          <div
            key={project.slug}
            className={`grid gap-10 border-t border-line px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] lg:grid-cols-12 lg:gap-16 ${
              flipped ? "" : ""
            }`}
          >
            <div className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}>
              <TransitionLink href={`/projects/${project.slug}`} data-cursor="view" className="block">
                <ImageReveal>
                  <MediaBlock src={project.hero} alt={project.title} ratio={ratios[i % ratios.length]} />
                </ImageReveal>
              </TransitionLink>
            </div>

            <div className={`flex flex-col justify-center lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
              <span className="font-display text-3xl text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <TextReveal as="h2" className="font-display mt-4 text-h2 font-normal">
                {project.title}
              </TextReveal>
              <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
                {project.type} · {project.location} · {project.area} · {project.year}
              </p>
              <p className="text-body-l measure mt-6 text-cream/80">{project.description}</p>

              <blockquote className="font-display measure mt-8 border-l border-brass pl-6 text-lg italic text-cream/90">
                &ldquo;{project.quote.text}&rdquo;
                <footer className="mt-3 font-sans text-[11px] font-normal not-italic uppercase tracking-[0.14em] text-muted">
                  {project.quote.role}
                </footer>
              </blockquote>

              <TransitionLink
                href={`/projects/${project.slug}`}
                data-cursor="link"
                className="group mt-8 inline-flex w-fit items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.1em] text-brass-soft transition-colors duration-300 hover:text-brass"
              >
                View project
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 transition-transform duration-300 ease-[var(--ease-main)] group-hover:translate-x-1"
                >
                  <path
                    d="M2 8H14M14 8L9 3M14 8L9 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </TransitionLink>
            </div>
          </div>
        );
      })}
    </section>
  );
}
