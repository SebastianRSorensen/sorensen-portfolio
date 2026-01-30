import { Hero } from "@/components/sections/hero";
import { StoryGrense } from "@/components/sections/story-grense";
import { StoryKunnskap } from "@/components/sections/story-kunnskap";
import { StoryKode } from "@/components/sections/story-kode";
import { StoryBygger } from "@/components/sections/story-bygger";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryGrense />
      <StoryKunnskap />
      <StoryKode />
      <StoryBygger />
      <TechStack />
      <Contact />
    </>
  );
}
