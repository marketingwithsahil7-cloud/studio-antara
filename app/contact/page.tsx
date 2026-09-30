import type { Metadata } from "next";
import { TextReveal } from "@/components/ui/TextReveal";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { site } from "@/config/site";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contact — Studio Antara",
};

export default function ContactPage() {
  return (
    <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5.5rem,12vw,10rem)] pt-40 text-cream">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <TextReveal as="h1" className="font-display text-display-l font-normal leading-[1.05]">
            Begin a conversation.
          </TextReveal>

          <div className="mt-10 flex flex-col gap-1 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
            {site.contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2 font-sans text-sm">
            <a href={`mailto:${site.contact.email}`} className="text-cream hover:text-brass-soft">
              {site.contact.email}
            </a>
            <span className="text-cream">{site.contact.phone}</span>
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-brass-soft"
            >
              Instagram
            </a>
          </div>

          <p className="measure mt-10 border-t border-line pt-8 font-sans text-sm text-cream/70">
            {copy.contact.qualifier}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
