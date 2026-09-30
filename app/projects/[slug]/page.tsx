import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFeaturedProject, featuredProjects } from "@/content/projects";
import { ProjectHero } from "@/components/sections/projects/ProjectHero";
import { ProjectMeta } from "@/components/sections/projects/ProjectMeta";
import { ProjectGallery } from "@/components/sections/projects/ProjectGallery";
import { MaterialPalette } from "@/components/sections/projects/MaterialPalette";
import { NextProjectLink } from "@/components/sections/projects/NextProjectLink";
import { StickyProjectCta } from "@/components/sections/projects/StickyProjectCta";

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProject(slug);
  return { title: project ? `${project.title} — Studio Antara` : "Studio Antara" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) notFound();

  const currentIndex = featuredProjects.findIndex((p) => p.slug === slug);
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length];

  return (
    <>
      <ProjectHero project={project} />
      <ProjectMeta project={project} />
      <ProjectGallery project={project} />
      <MaterialPalette project={project} />
      <NextProjectLink project={nextProject} />
      <StickyProjectCta />
    </>
  );
}
