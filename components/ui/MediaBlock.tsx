"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Ratio = "4/5" | "16/9" | "1/1" | "3/4" | "21/9";

const ratioClass: Record<Ratio, string> = {
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "21/9": "aspect-[21/9]",
};

// No client-supplied blur data exists for these images, so instead of a fake grey
// box we fade the photo in over a warm ink placeholder — nothing pops in white.
export function MediaBlock({
  src,
  alt,
  ratio,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: {
  src: string;
  alt: string;
  ratio: Ratio;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden bg-ink-2", ratioClass[ratio], className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-opacity duration-700 ease-[var(--ease-main)]",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
