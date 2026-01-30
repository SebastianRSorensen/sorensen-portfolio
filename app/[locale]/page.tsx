import { Hero } from "@/components/sections/hero";
import { StoryKode } from "@/components/sections/story-kode";
import { StoryBygger } from "@/components/sections/story-bygger";
import { TechStack } from "@/components/sections/tech-stack";
import { StoryKunnskap } from "@/components/sections/story-kunnskap";
import { StoryGrense } from "@/components/sections/story-grense";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryKode />
      <StoryBygger />
      <TechStack />
      <StoryKunnskap />
      <StoryGrense />
      <Contact />
    </>
  );
}
