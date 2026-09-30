import { copy } from "@/content/copy";

export function Recognition() {
  return (
    <section className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(4rem,8vw,6rem)]">
      <p className="text-center font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
        Featured in
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {copy.proof.press.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="font-display text-lg text-muted/50 grayscale"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
