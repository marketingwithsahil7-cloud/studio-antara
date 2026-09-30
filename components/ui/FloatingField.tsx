"use client";

import { useState, type ChangeEvent, type FocusEvent } from "react";
import { cn } from "@/lib/utils";

type FloatingFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
};

export function FloatingField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  type = "text",
  as = "input",
  rows = 4,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedClassName = cn(
    "peer w-full border-b bg-transparent pb-3 pt-6 font-sans text-cream outline-none transition-colors duration-300",
    error ? "border-red-400/70" : "border-line",
  );

  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(sharedClassName, "resize-none")}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={sharedClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 font-sans uppercase tracking-[0.12em] text-muted transition-all duration-300",
          active ? "top-0 text-[10px]" : "top-6 text-sm normal-case tracking-normal text-cream/50",
        )}
      >
        {label}
        {required && " *"}
      </label>

      <span
        className={cn(
          "absolute bottom-0 left-0 h-px origin-left bg-brass transition-transform duration-300",
          focused ? "w-full scale-x-100" : "w-full scale-x-0",
        )}
        aria-hidden="true"
      />

      {error && (
        <p id={`${id}-error`} className="mt-2 font-sans text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
