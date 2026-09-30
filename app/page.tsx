import { Hero } from "@/components/sections/home/Hero";
import { PositioningStrip } from "@/components/sections/home/PositioningStrip";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { PhilosophyTeaser } from "@/components/sections/home/PhilosophyTeaser";
import { Services } from "@/components/sections/home/Services";
import { Process } from "@/components/sections/home/Process";
import { Proof } from "@/components/sections/home/Proof";
import { Recognition } from "@/components/sections/home/Recognition";
import { FinalCta } from "@/components/sections/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <PositioningStrip />
      <FeaturedProjects />
      <PhilosophyTeaser />
      <Services />
      <Process />
      <Proof />
      <Recognition />
      <FinalCta />
    </>
  );
}
