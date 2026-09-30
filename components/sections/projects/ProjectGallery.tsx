import { ImageReveal } from "@/components/ui/ImageReveal";
import { MediaBlock } from "@/components/ui/MediaBlock";
import type { FeaturedProject } from "@/content/projects";

type Ratio = "4/5" | "16/9" | "1/1" | "3/4" | "21/9";

const layoutPattern: { span: string; ratio: Ratio }[] = [
  { span: "col-span-12", ratio: "16/9" },
  { span: "col-span-12 sm:col-span-6", ratio: "4/5" },
  { span: "col-span-12 sm:col-span-6 sm:mt-16", ratio: "4/5" },
  { span: "col-span-12 sm:col-span-7", ratio: "3/4" },
  { span: "col-span-12 sm:col-span-4 sm:col-start-9 sm:-mt-24", ratio: "1/1" },
  { span: "col-span-12", ratio: "21/9" },
  { span: "col-span-12 sm:col-span-5 sm:col-start-2", ratio: "3/4" },
  { span: "col-span-12 sm:col-span-5 sm:col-start-7 sm:mt-20", ratio: "4/5" },
];

export function ProjectGallery({ project }: { project: FeaturedProject }) {
  return (
    <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-cream">
      <div className="grid grid-cols-12 gap-x-6 gap-y-20">
        {project.gallery.map((image, i) => {
          const layout = layoutPattern[i % layoutPattern.length];
          return (
            <div key={`${image.src}-${i}`} className={layout.span}>
              <ImageReveal>
                <MediaBlock src={image.src} alt={`${project.title} — ${image.caption}`} ratio={layout.ratio} />
              </ImageReveal>
              <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
                {image.caption}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
