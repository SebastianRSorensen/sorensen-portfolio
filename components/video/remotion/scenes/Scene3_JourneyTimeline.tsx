"use client";

import React from "react";
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "@/components/video/remotion-compat";
import {
	HorizontalTimeline,
	type Milestone,
} from "../components/HorizontalTimeline";
import { MilestoneCard } from "../components/MilestoneCard";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { COLORS } from "../lib/colors";

// Simple inline SVG icons
const ShieldIcon = (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none">
		<path
			d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.25C16.6 22.15 20 17.25 20 12V6l-8-4z"
			stroke={COLORS.cyan}
			strokeWidth={1.5}
			fill="none"
		/>
		<path d="M9 12l2 2 4-4" stroke={COLORS.cyan} strokeWidth={1.5} />
	</svg>
);

const BracketsIcon = (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none">
		<path
			d="M8 4H6a2 2 0 00-2 2v4l2 2-2 2v4a2 2 0 002 2h2M16 4h2a2 2 0 012 2v4l-2 2 2 2v4a2 2 0 01-2 2h-2"
			stroke={COLORS.white}
			strokeWidth={1.5}
		/>
	</svg>
);

const GraphIcon = (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none">
		<path d="M3 20L9 14l4 4 8-12" stroke={COLORS.amber} strokeWidth={1.5} />
		<circle cx={9} cy={14} r={2} fill={COLORS.amber} opacity={0.5} />
		<circle cx={13} cy={18} r={2} fill={COLORS.amber} opacity={0.5} />
	</svg>
);

const TIMELINE_Y = 520;
const START_X = 120;
const END_X = 1800;
const LINE_LENGTH = END_X - START_X;

const MILESTONES_DATA: Milestone[] = [
	{ position: 0.125, activateFrame: 30, color: COLORS.cyan },
	{ position: 0.5, activateFrame: 180, color: COLORS.white },
	{ position: 0.775, activateFrame: 340, color: COLORS.amber },
];

export const Scene3_JourneyTimeline: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Timeline draw progress across the full scene
	const drawProgress = (() => {
		// Segment 1: 0-30 frames → draw to 12.5%
		if (frame < 30) return interpolate(frame, [0, 30], [0, 0.125], { extrapolateRight: "clamp" });
		// Pause at dot 1, then continue
		if (frame < 100) return 0.125;
		// Segment 2: 100-180 → draw to 50%
		if (frame < 180) return interpolate(frame, [100, 180], [0.125, 0.5], { extrapolateRight: "clamp" });
		// Pause at dot 2
		if (frame < 250) return 0.5;
		// Segment 3: 250-340 → draw to 77.5%
		if (frame < 340) return interpolate(frame, [250, 340], [0.5, 0.775], { extrapolateRight: "clamp" });
		// Pause then finish
		if (frame < 380) return 0.775;
		// Segment 4: 380-400 → draw to 100%
		if (frame < 400) return interpolate(frame, [380, 400], [0.775, 1], { extrapolateRight: "clamp" });
		return 1;
	})();

	// Exit animation: frames 465-524
	const exitProgress =
		frame >= 465
			? spring({
					frame: frame - 465,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const exitOpacity = 1 - exitProgress;
	const exitY = exitProgress * -60;

	// Trait words linger slightly longer
	const traitExitProgress =
		frame >= 485
			? spring({
					frame: frame - 500,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const traitExitOpacity = 1 - traitExitProgress;

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
			<BackgroundTexture opacity={0.03} />

			<AbsoluteFill
				style={{
					transform: `translateY(${exitY}px)`,
					opacity: exitOpacity,
				}}
			>
				<HorizontalTimeline
					progress={drawProgress}
					milestones={MILESTONES_DATA}
					y={TIMELINE_Y}
					startX={START_X}
					endX={END_X}
				/>

				{/* Milestone 1: Army Ranger - above */}
				<div style={{ opacity: frame >= 500 ? traitExitOpacity : 1 }}>
					<MilestoneCard
						year="2020–2021"
						title="ARMY RANGER"
						description="Border reconnaissance on the Russian border. Elite unit, GSV."
						trait="PRECISION"
						traitColor={COLORS.cyan}
						enterFrame={40}
						side="above"
						icon={ShieldIcon}
						x={START_X + LINE_LENGTH * 0.125}
						timelineY={TIMELINE_Y}
					/>
				</div>

				{/* Milestone 2: University - below */}
				<div style={{ opacity: frame >= 500 ? traitExitOpacity : 1 }}>
					<MilestoneCard
						year="2021–2023"
						title="UNIVERSITY OF BERGEN"
						description="Bachelor in Computer Science — Data Technology."
						trait="FOUNDATION"
						traitColor={COLORS.white}
						enterFrame={190}
						side="below"
						icon={BracketsIcon}
						x={START_X + LINE_LENGTH * 0.5}
						timelineY={TIMELINE_Y}
					/>
				</div>

				{/* Milestone 3: Stacc - above */}
				<div style={{ opacity: frame >= 500 ? traitExitOpacity : 1 }}>
					<MilestoneCard
						year="January 2024–NOW"
						title="STACC AS"
						description="Fullstack fintech. Credit solutions across Nordics."
						trait="IMPACT"
						traitColor={COLORS.amber}
						enterFrame={350}
						side="above"
						icon={GraphIcon}
						x={START_X + LINE_LENGTH * 0.775}
						timelineY={TIMELINE_Y}
					/>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
