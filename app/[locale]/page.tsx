import { Hero } from "@/components/sections/hero";
import { SectionExperience } from "@/components/sections/section-experience";
import { SectionDrive } from "@/components/sections/section-drive";
import { TechStack } from "@/components/sections/tech-stack";
import { SectionEducation } from "@/components/sections/section-education";
import { SectionOtherExperience } from "@/components/sections/section-other-experience";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionExperience />
      <SectionDrive />
      <TechStack />
      <SectionEducation />
      <SectionOtherExperience />
      <Contact />
    </>
  );
}
