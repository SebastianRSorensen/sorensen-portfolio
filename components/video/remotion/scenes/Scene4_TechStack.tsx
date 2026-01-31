"use client";

import React from "react";
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "@/components/video/remotion-compat";
import { CodeBlock, type CodeLine } from "../components/CodeBlock";
import { FloatingBadge } from "../components/FloatingBadge";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { COLORS } from "../lib/colors";

// Pre-tokenized code lines with syntax colors
const CODE_LINES: CodeLine[] = [
	[
		{ text: "const", color: COLORS.cyan },
		{ text: " sebastian ", color: COLORS.white },
		{ text: "=", color: COLORS.slate },
		{ text: " {", color: COLORS.white },
	],
	[
		{ text: "  stack", color: COLORS.white },
		{ text: ":", color: COLORS.slate },
		{ text: " [", color: COLORS.white },
		{ text: "'React'", color: COLORS.amber },
		{ text: ",", color: COLORS.slate },
		{ text: " ", color: COLORS.white },
		{ text: "'Next.js'", color: COLORS.amber },
		{ text: ",", color: COLORS.slate },
		{ text: " ", color: COLORS.white },
		{ text: "'TypeScript'", color: COLORS.amber },
		{ text: "]", color: COLORS.white },
		{ text: ",", color: COLORS.slate },
	],
	[
		{ text: "  styles", color: COLORS.white },
		{ text: ":", color: COLORS.slate },
		{ text: " [", color: COLORS.white },
		{ text: "'Tailwind'", color: COLORS.amber },
		{ text: ",", color: COLORS.slate },
		{ text: " ", color: COLORS.white },
		{ text: "'CSS'", color: COLORS.amber },
		{ text: "]", color: COLORS.white },
		{ text: ",", color: COLORS.slate },
	],
	[
		{ text: "  tools", color: COLORS.white },
		{ text: ":", color: COLORS.slate },
		{ text: " [", color: COLORS.white },
		{ text: "'GitHub Actions'", color: COLORS.amber },
		{ text: ",", color: COLORS.slate },
		{ text: " ", color: COLORS.white },
		{ text: "'K9S'", color: COLORS.amber },
		{ text: ",", color: COLORS.slate },
		{ text: " ", color: COLORS.white },
		{ text: "'Postman'", color: COLORS.amber },
		{ text: "]", color: COLORS.white },
		{ text: ",", color: COLORS.slate },
	],
	[
		{ text: "  focus", color: COLORS.white },
		{ text: ":", color: COLORS.slate },
		{ text: " ", color: COLORS.white },
		{ text: "'User Experience'", color: COLORS.amber },
	],
	[
		{ text: "}", color: COLORS.white },
		{ text: ";", color: COLORS.slate },
	],
];

// Badge definitions with staggered lift times and layout positions
const BADGES = [
	{ label: "React", liftFrame: 165, targetX: 1250, targetY: 200 },
	{ label: "Next.js", liftFrame: 174, targetX: 1280, targetY: 270 },
	{ label: "TypeScript", liftFrame: 183, targetX: 1230, targetY: 340 },
	{ label: "Tailwind", liftFrame: 195, targetX: 1300, targetY: 430 },
	{ label: "CSS", liftFrame: 203, targetX: 1220, targetY: 500 },
	{ label: "GitHub Actions", liftFrame: 213, targetX: 1280, targetY: 590 },
	{ label: "K9S", liftFrame: 222, targetX: 1200, targetY: 660 },
	{ label: "Postman", liftFrame: 230, targetX: 1300, targetY: 730 },
	{
		label: "User Experience",
		liftFrame: 241,
		targetX: 1260,
		targetY: 850,
		color: COLORS.cyan,
	},
];

export const Scene4_TechStack: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Code block container springs in (frames 0-15)
	const containerScale = spring({
		frame,
		fps,
		config: { damping: 16, stiffness: 140 },
	});
	const scaleVal = interpolate(containerScale, [0, 1], [0.95, 1]);

	// After typing completes + hold, code block shifts left and fades (frame 155)
	const shiftProgress =
		frame >= 155
			? spring({
					frame: frame - 155,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const codeX = shiftProgress * -200;
	const codeOpacity = interpolate(shiftProgress, [0, 1], [1, 0.4]);

	// Exit fade (frames 270-299)
	const exitProgress =
		frame >= 270
			? spring({
					frame: frame - 270,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const exitOpacity = 1 - exitProgress;
	const exitDrift = exitProgress * 30;

	// Code block origin center for badge lift calculations
	const codeOriginX = 520 + codeX;
	const codeOriginY = 500;

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
			<BackgroundTexture opacity={0.03} />

			<AbsoluteFill
				style={{
					opacity: exitOpacity,
					transform: `translateY(${exitDrift}px)`,
				}}
			>
				{/* Code block */}
				<div
					style={{
						position: "absolute",
						left: 320 + codeX,
						top: 240,
						transform: `scale(${scaleVal})`,
						transformOrigin: "center center",
						opacity: codeOpacity,
					}}
				>
					<CodeBlock
						lines={CODE_LINES}
						startFrame={10}
						charsPerFrame={1.5}
						fontSize={22}
						showLineNumbers
					/>
				</div>

				{/* Floating badges */}
				{BADGES.map((badge) => (
					<FloatingBadge
						key={badge.label}
						label={badge.label}
						liftFrame={badge.liftFrame}
						originX={codeOriginX}
						originY={codeOriginY}
						targetX={badge.targetX}
						targetY={badge.targetY}
						color={badge.color ?? COLORS.amber}
					/>
				))}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
