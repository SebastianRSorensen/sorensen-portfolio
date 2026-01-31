"use client";

import React from "react";
import { AbsoluteFill, Sequence } from "@/components/video/remotion-compat";
import { Scene1_OpeningHook } from "./scenes/Scene1_OpeningHook";
import { Scene2_HookStatement } from "./scenes/Scene2_HookStatement";
import { Scene3_JourneyTimeline } from "./scenes/Scene3_JourneyTimeline";
import { Scene4_TechStack } from "./scenes/Scene4_TechStack";
import { Scene5_WhatDrivesMe } from "./scenes/Scene5_WhatDrivesMe";
import { Scene6_CallToAction } from "./scenes/Scene6_CallToAction";
import { COLORS } from "./lib/colors";

export const MainVideo: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
			{/* Scene 1: Opening Hook (0-8s) — includes mountain exit + name transition */}
			<Sequence durationInFrames={240}>
				<Scene1_OpeningHook />
			</Sequence>

			{/* Scene 2: Hook Statement (8-12.5s) - frames 240-375 */}
			<Sequence from={240} durationInFrames={135}>
				<Scene2_HookStatement />
			</Sequence>

			{/* Scene 3: Journey Timeline (12.5-30s) - frames 375-900 */}
			<Sequence from={375} durationInFrames={525}>
				<Scene3_JourneyTimeline />
			</Sequence>

			{/* Scene 4: Tech Stack Showcase (30-40s) - frames 900-1200 */}
			<Sequence from={900} durationInFrames={300}>
				<Scene4_TechStack />
			</Sequence>

			{/* Scene 5: What Drives Me (40-50s) - frames 1200-1500 */}
			<Sequence from={1200} durationInFrames={300}>
				<Scene5_WhatDrivesMe />
			</Sequence>

			{/* Scene 6: Call to Action (50-60s) - frames 1500-1800 */}
			<Sequence from={1500} durationInFrames={300}>
				<Scene6_CallToAction />
			</Sequence>
		</AbsoluteFill>
	);
};
