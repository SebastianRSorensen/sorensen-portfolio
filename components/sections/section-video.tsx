"use client";

import { ScrollVideoPage } from "@/components/video/scroll-video-page";
import { Scene1_OpeningHook } from "@/components/video/remotion/scenes/Scene1_OpeningHook";
import { Scene2_HookStatement } from "@/components/video/remotion/scenes/Scene2_HookStatement";
import { Scene3_JourneyTimeline } from "@/components/video/remotion/scenes/Scene3_JourneyTimeline";
import { Scene4_TechStack } from "@/components/video/remotion/scenes/Scene4_TechStack";
import { Scene5_WhatDrivesMe } from "@/components/video/remotion/scenes/Scene5_WhatDrivesMe";
import { Scene6_CallToAction } from "@/components/video/remotion/scenes/Scene6_CallToAction";

export function SectionVideo() {
  return (
    <section id="showreel">
      <ScrollVideoPage
        scene1={<Scene1_OpeningHook />}
        scene2={<Scene2_HookStatement />}
        scene3={<Scene3_JourneyTimeline />}
        scene4={<Scene4_TechStack />}
        scene5={<Scene5_WhatDrivesMe />}
        scene6={<Scene6_CallToAction />}
        scrollMultiplier={6}
      />
    </section>
  );
}
