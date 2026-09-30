import type { FeaturedProject } from "@/content/projects";

const fields: { label: string; key: keyof FeaturedProject }[] = [
  { label: "Type", key: "type" },
  { label: "Location", key: "location" },
  { label: "Area", key: "area" },
  { label: "Year", key: "year" },
  { label: "Scope", key: "scope" },
];

export function ProjectMeta({ project }: { project: FeaturedProject }) {
  return (
    <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(4rem,8vw,6rem)] pt-[clamp(3rem,6vw,4rem)] text-cream">
      <div className="grid grid-cols-2 gap-y-8 border-y border-line py-8 font-sans text-[11px] uppercase tracking-[0.16em] sm:grid-cols-5">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-2">
            <span className="text-muted">{field.label}</span>
            <span className="text-cream">{project[field.key] as string}</span>
          </div>
        ))}
      </div>

      <p className="text-body-l measure mt-10 max-w-[60ch] text-cream/80">{project.description}</p>

      <blockquote className="font-display measure mt-10 max-w-2xl border-l border-brass pl-6 text-lg italic text-cream/90">
        &ldquo;{project.quote.text}&rdquo;
        <footer className="mt-3 font-sans text-[11px] font-normal not-italic uppercase tracking-[0.14em] text-muted">
          {project.quote.role}
        </footer>
      </blockquote>
    </section>
  );
}
