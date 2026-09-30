import { MediaBlock } from "@/components/ui/MediaBlock";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { copy } from "@/content/copy";

export function PhilosophyTeaser() {
  return (
    <section className="bg-cream px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-ink">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5 lg:col-start-2">
          <TextReveal as="p" className="font-display text-h2 font-normal leading-[1.2]">
            {copy.philosophy.text}
          </TextReveal>
          <TransitionLink
            href="/about"
            className="group relative mt-8 inline-block w-fit font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink"
          >
            {copy.philosophy.linkLabel}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-ink transition-transform duration-300 ease-[var(--ease-main)] group-hover:scale-x-0" />
            <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-brass transition-transform duration-300 ease-[var(--ease-main)] group-hover:scale-x-100" />
          </TransitionLink>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <ImageReveal>
            <MediaBlock
              src="/projects/exteriors/exterior-09.jpg"
              alt="The studio, Sunder Nagar"
              ratio="3/4"
            />
          </ImageReveal>
          <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
            {copy.philosophy.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
