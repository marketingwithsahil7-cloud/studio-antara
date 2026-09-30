import { TransitionLink } from "@/components/layout/TransitionLink";

export function StickyProjectCta() {
  return (
    <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
      <TransitionLink
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full border border-line bg-ink px-5 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-cream transition-colors duration-300 hover:border-brass hover:text-brass-soft"
      >
        Discuss a similar project →
      </TransitionLink>
    </div>
  );
}
