import type { Metadata } from "next";
import { TextReveal } from "@/components/ui/TextReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { Button } from "@/components/ui/Button";
import { FounderPortrait } from "@/components/sections/about/FounderPortrait";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: "About the studio — Studio Antara",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(4rem,8vw,6rem)] pt-40 text-cream">
        <TextReveal as="h1" className="font-display max-w-4xl text-display-l font-normal leading-[1.1]">
          {copy.about.intro}
        </TextReveal>
      </section>

      <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5.5rem,12vw,10rem)] text-cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ImageReveal>
              <MediaBlock
                src="/projects/exteriors/exterior-10.jpg"
                alt="The studio, Sunder Nagar"
                ratio="4/5"
              />
            </ImageReveal>
            <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
              {copy.about.studioCaption}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-6 lg:col-start-7">
            {copy.about.paragraphs.map((p) => (
              <p key={p} className="text-body-l measure text-cream/80">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-cream">
        <div className="grid gap-16 sm:grid-cols-3">
          {copy.about.principles.map((principle) => (
            <div key={principle.index}>
              <span className="font-sans text-xs uppercase tracking-[0.16em] text-brass-soft">
                {principle.index}
              </span>
              <h3 className="font-display mt-3 text-h3 font-normal">{principle.title}</h3>
              <p className="measure mt-3 text-cream/70">{principle.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <FounderPortrait />
          </div>
          <div className="flex flex-col justify-center gap-8 lg:col-span-6 lg:col-start-6">
            <div>
              <p className="font-display text-display-l font-normal text-brass">14</p>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
                Person studio
              </p>
            </div>
            <div>
              <p className="font-display text-display-l font-normal text-brass">10–12</p>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
                Projects a year
              </p>
            </div>
            <div>
              <p className="font-display text-display-l font-normal text-brass">2017</p>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
                Studio founded
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(4rem,8vw,6rem)]">
        <p className="text-center font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
          Featured in
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {copy.proof.press.map((label, i) => (
            <span key={`${label}-${i}`} className="font-display text-lg text-muted/50">
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5rem,10vw,8rem)] text-center text-cream">
        <p className="font-display text-h2 font-normal">{copy.finalCta.line}</p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact">Begin a conversation</Button>
        </div>
      </section>
    </>
  );
}
