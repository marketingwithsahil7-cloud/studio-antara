"use client";

import { cn } from "@/lib/utils";

export function FilterBar<T extends string>({
  options,
  active,
  onChange,
}: {
  options: { value: T; label: string; count: number }[];
  active: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2 overflow-x-auto"
      role="tablist"
      aria-label="Filter gallery by category"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={active === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
            active === option.value
              ? "border-brass bg-brass text-ink"
              : "border-line text-muted hover:border-brass-soft hover:text-brass-soft",
          )}
        >
          {option.label} ({option.count})
        </button>
      ))}
    </div>
  );
}
