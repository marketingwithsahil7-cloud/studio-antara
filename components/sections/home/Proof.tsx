import { Counter } from "@/components/ui/Counter";
import { copy } from "@/content/copy";

export function Proof() {
  return (
    <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-cream">
      <div className="grid gap-12 border-t border-line pt-14 sm:grid-cols-3">
        {copy.proof.stats.map((stat) => (
          <div key={stat.label}>
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-display-l font-normal text-brass"
            />
            <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
