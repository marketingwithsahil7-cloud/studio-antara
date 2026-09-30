import { MediaBlock } from "@/components/ui/MediaBlock";
import type { FeaturedProject } from "@/content/projects";

export function MaterialPalette({ project }: { project: FeaturedProject }) {
  return (
    <section className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5rem,10vw,8rem)] text-cream">
      <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-brass-soft">
        Material palette
      </p>
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {project.materials.map((material) => (
          <div key={material.label}>
            <MediaBlock src={material.swatch} alt={material.label} ratio="1/1" />
            <p className="font-display mt-3 text-lg font-normal">{material.label}</p>
            <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.12em] text-muted">
              {material.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
