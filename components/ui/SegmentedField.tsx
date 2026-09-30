"use client";

import { cn } from "@/lib/utils";

export function SegmentedField<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  options: readonly T[];
  value: T | "";
  onChange: (value: T) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
        {required && " *"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={cn(
              "min-h-11 rounded-full border px-4 py-2.5 font-sans text-xs uppercase tracking-[0.1em] transition-colors duration-300",
              value === option
                ? "border-brass bg-brass text-ink"
                : "border-line text-cream hover:border-brass-soft hover:text-brass-soft",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 font-sans text-xs text-red-400">{error}</p>}
    </div>
  );
}
