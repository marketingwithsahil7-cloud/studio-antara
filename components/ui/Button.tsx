"use client";

import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { useLenis } from "@/lib/lenis-provider";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  magnetic?: boolean;
  external?: boolean;
};

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 transition-transform duration-300 ease-[var(--ease-main)] group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path
        d="M2 8H14M14 8L9 3M14 8L9 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  magnetic = true,
  external = false,
}: ButtonProps) {
  const { scrollTo } = useLenis();
  const classes = cn(
    "group inline-flex h-14 items-center gap-2.5 rounded-full px-7 font-sans text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-300",
    variant === "primary"
      ? "bg-brass text-ink hover:bg-brass-soft"
      : "border border-cream bg-transparent text-cream hover:border-brass hover:text-brass-soft",
    className,
  );

  const isHash = href.startsWith("#");

  let content: React.ReactNode;

  if (isHash) {
    content = (
      <a
        href={href}
        data-cursor="link"
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          scrollTo(href, { offset: 0, duration: 1.4 });
        }}
      >
        {children}
        <ArrowIcon />
      </a>
    );
  } else if (external) {
    content = (
      <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="link" className={classes}>
        {children}
        <ArrowIcon />
      </a>
    );
  } else {
    content = (
      <TransitionLink href={href} data-cursor="link" className={classes}>
        {children}
        <ArrowIcon />
      </TransitionLink>
    );
  }

  if (!magnetic) return content;

  return <Magnetic className="inline-block">{content}</Magnetic>;
}
