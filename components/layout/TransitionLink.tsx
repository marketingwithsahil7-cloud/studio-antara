"use client";

import Link from "next/link";
import type { ComponentPropsWithRef, MouseEvent } from "react";
import { usePageTransition } from "./PageTransitionProvider";

type TransitionLinkProps = ComponentPropsWithRef<typeof Link>;

export function TransitionLink({ href, onClick, children, ref, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href.toString());
  }

  return (
    <Link ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
