# Studio Antara — concept project

A hand-coded, award-level marketing site for a fictional architecture & interiors
studio, built as a portfolio piece. **This is a demo, not a real business** — every
page carries `noindex,nofollow` and a footer line saying so.

Stack: Next.js 15 (App Router) + TypeScript + Tailwind v4 + GSAP/ScrollTrigger/Flip
+ Lenis smooth scroll. No UI kit, no template — every component is hand-built.

## Running it

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`. `npm run build` produces a static-optimized
production build (all routes are statically prerendered, including the three
project detail pages via `generateStaticParams`).

## How to swap content for a real client

Everything client-specific lives in two folders — you should never need to touch
a component to rebrand this.

**`/config/site.ts`** — studio name, tagline, WhatsApp number, email, phone,
studio address, nav labels, the primary CTA wording, and the demo-mode flag/badge
text. Turn off the demo badge and `noindex` by editing `site.demo` and the
`robots` field in `app/layout.tsx` once this is a real, live site.

**`/content/*.ts`** — all copy and structured data:
- `copy.ts` — hero headline, positioning line, philosophy statement, process
  steps, proof-strip stats, About page paragraphs/principles, contact page
  qualifier line.
- `projects.ts` — the three featured projects shown on the home page and at
  `/projects/[slug]`. Each entry has its own hero image, meta (type/location/
  area/year/scope), description, client quote (**role-based attribution only —
  do not put a real name here unless you have permission**), an 8-image gallery
  with captions, and a 5-item material palette with swatch images.
- `gallery.ts` — the full `/projects` masonry grid. Add entries with `id`,
  `category` (must match one of the five sticky-bar categories), `src`, `ratio`,
  `title`, `location`, `year`, `caption`. The category counts on the filter bar
  are computed automatically from this array — you don't maintain them by hand.
- `services.ts`, `process.ts` — the four service rows and five process steps.
- `credits.ts` — Unsplash photographer credits, rendered at `/credits`. Every
  entry here corresponds to a file in `/public`; remove the credit line if you
  remove the file, and add one for every new sourced photo.

**Copy rules baked into this build** (see the original brief, §1): no invented
testimonials, no invented press mentions, no printed project budgets, no banned
marketing words (world-class, stunning, dream home, elevate, etc.), and never a
random stock photo passed off as the founder — `[FOUNDER PORTRAIT — placeholder]`
in `components/sections/about/FounderPortrait.tsx` stays a bracketed placeholder
until a real photo exists.

## How to add images

1. Drop the file into the matching `/public/projects/<category>/` folder
   (`interiors`, `exteriors`, `material-studies`, `modeling`, `3d-walkthroughs`),
   or `/public/featured/` for a featured-project hero.
2. Reference it by its `/public`-relative path (e.g. `/projects/interiors/interior-13.jpg`)
   in `content/gallery.ts` (for the masonry grid) or `content/projects.ts`
   (for a featured project's hero/gallery/materials).
3. If it's sourced from Unsplash or another stock source, add a matching entry
   to `content/credits.ts` — `{ file, photographer, profileUrl }`.
4. All images render through `components/ui/MediaBlock.tsx`, which reserves the
   aspect ratio (`ratio` prop: `4/5`, `16/9`, `1/1`, `3/4`, or `21/9`) so there's
   no layout shift, and fades the photo in over a warm ink placeholder rather
   than popping in on a white flash. You don't need to do anything extra —
   `next/image` optimization (AVIF/WebP, responsive `sizes`) is automatic.

Curate for tone: golden-hour/warm, empty (no people), textured, slightly
underexposed. Reject anything bright, white, or clinical — it'll read as an
off-brand Scandinavian stock photo against everything else on the site.

## Where things live

```
/app              routes — layout, home, projects (+ [slug]), about, contact, credits
/components
  layout/         Header, MobileMenu, Footer, Cursor, Grain, PageTransitionProvider,
                   TransitionLink, ScrollProgress, WhatsAppButton
  ui/             Button, Magnetic, TextReveal, ImageReveal, Parallax, Counter,
                   MediaBlock, FilterBar, Lightbox, FloatingField, SegmentedField
  sections/       home/*, projects/*, about/*, contact/*
/content          copy.ts, projects.ts, gallery.ts, services.ts, process.ts, credits.ts
/config           site.ts
/lib              gsap.ts (plugin registration + custom eases), lenis-provider.tsx, utils.ts
/public/projects/<category>/   all sourced photography, organized by gallery category
```

## Known gaps / deliberate omissions

- **No hero video loop.** The brief allowed a still fallback if no properly-licensed
  clip matching the warm/golden tone exists — none did, so the hero is a full-bleed
  still. Revisit if a real client supplies footage.
- **No video block on a project detail page**, for the same reason.
- **Gallery categories aren't at the "20+ per category" target** from the original
  spec — Interiors/Exteriors/Material studies sit at 9–12 each, and Modeling/3D
  Walkthroughs (harder to source authentically — see below) at 6 each. Quality and
  tonal consistency were prioritized over hitting a raw count; add more via
  `content/gallery.ts` following the existing pattern.
- **"Modeling" and "3D Walkthroughs"** can't be *this studio's own* work in a demo —
  Modeling uses real photos of physical architectural scale models (authentic
  content, just not this studio's models), and 3D Walkthroughs uses genuine
  architectural-visualization/render photography (real renders, not literal
  fabrication). Swap both wholesale once real studio output exists.
- **Contact form has no backend.** It composes a WhatsApp message and opens
  `wa.me` — see the `TODO(backend)` comment in `components/sections/contact/ContactForm.tsx`
  for where to wire up Resend/Formspree once one exists. Never fake a success
  state here if you touch this file.

## Performance & a11y notes

- Production build: all routes statically prerendered, First Load JS 103–190KB
  per route (target from the brief was <200KB gzipped initial JS).
- `prefers-reduced-motion` disables Lenis, the custom cursor, magnetic pull,
  ScrollTrigger-driven parallax/pin/reveal effects, and the preloader — falls
  back to simple opacity fades.
- Custom cursor, magnetic buttons, and the Services hover-preview are scoped to
  `(min-width: 1024px) and (hover: hover)` and never activate on touch devices.
- ESLint (`next/core-web-vitals` + `jsx-a11y/recommended`) is clean — run
  `npm run lint` to verify after changes.
