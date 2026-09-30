import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site, whatsappHref } from "@/config/site";
import { copy } from "@/content/copy";

export function FinalCta() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-cream">
      <Image
        src="/projects/exteriors/exterior-01.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl">
        <p className="font-display text-display-l font-normal leading-[1.05]">
          {copy.finalCta.line}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href="/contact">{site.cta.primary}</Button>
          <a
            href={whatsappHref(`Hi ${site.fullName}, I'd like to begin a conversation about a project.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-brass-soft transition-colors duration-300 hover:text-brass"
          >
            {site.contact.phone} — WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
