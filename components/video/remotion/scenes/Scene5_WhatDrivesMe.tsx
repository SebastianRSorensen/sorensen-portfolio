"use client";

import React from "react";
import {
	AbsoluteFill,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "@/components/video/remotion-compat";
import { StaggeredWords } from "../components/StaggeredWords";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { COLORS } from "../lib/colors";
import { FONT_HEADLINE } from "../lib/fonts";

// Minimal inline SVG icons
const ChipIcon = (
	<svg width={36} height={36} viewBox="0 0 36 36" fill="none">
		<rect x={10} y={10} width={16} height={16} rx={2} stroke={COLORS.cyan} strokeWidth={1.5} />
		<line x1={14} y1={10} x2={14} y2={4} stroke={COLORS.cyan} strokeWidth={1.5} />
		<line x1={22} y1={10} x2={22} y2={4} stroke={COLORS.cyan} strokeWidth={1.5} />
		<line x1={14} y1={26} x2={14} y2={32} stroke={COLORS.cyan} strokeWidth={1.5} />
		<line x1={22} y1={26} x2={22} y2={32} stroke={COLORS.cyan} strokeWidth={1.5} />
		<line x1={10} y1={14} x2={4} y2={14} stroke={COLORS.cyan} strokeWidth={1.5} />
		<line x1={10} y1={22} x2={4} y2={22} stroke={COLORS.cyan} strokeWidth={1.5} />
		<line x1={26} y1={14} x2={32} y2={14} stroke={COLORS.cyan} strokeWidth={1.5} />
		<line x1={26} y1={22} x2={32} y2={22} stroke={COLORS.cyan} strokeWidth={1.5} />
	</svg>
);

const CursorIcon = (
	<svg width={36} height={36} viewBox="0 0 36 36" fill="none">
		<path
			d="M10 6l16 12-7 1.5 4 9-3 1.5-4-9-6 5z"
			stroke={COLORS.amber}
			strokeWidth={1.5}
			fill="none"
		/>
	</svg>
);

const MountainIcon = (
	<svg width={36} height={36} viewBox="0 0 36 36" fill="none">
		<path d="M4 30L14 10l6 10 8-14 4 24H4z" stroke={COLORS.cyan} strokeWidth={1.5} fill="none" />
	</svg>
);

const CompassIcon = (
	<svg width={36} height={36} viewBox="0 0 36 36" fill="none">
		<circle cx={18} cy={18} r={13} stroke={COLORS.amber} strokeWidth={1.5} />
		<path d="M18 8l2 8 8-2-6 6 2 8-6-6-8 2 6-6-2-8 6 6z" fill={COLORS.amber} opacity={0.3} />
		<circle cx={18} cy={18} r={2} fill={COLORS.amber} />
	</svg>
);

type Strip = {
	label: string;
	icon: React.ReactNode;
	iconSide: "left" | "right";
	textX: number;
	iconX: number;
	y: number;
	enterFrame: number;
	accentColor: string;
	driftX: number; // exit scatter direction
};

const STRIPS: Strip[] = [
	{
		label: "Technology & AI",
		icon: ChipIcon,
		iconSide: "left",
		iconX: 580,
		textX: 700,
		y: 180,
		enterFrame: 10,
		accentColor: COLORS.cyan,
		driftX: -80,
	},
	{
		label: "User Experience",
		icon: CursorIcon,
		iconSide: "right",
		iconX: 1020,
		textX: 400,
		y: 320,
		enterFrame: 50,
		accentColor: COLORS.amber,
		driftX: 80,
	},
	{
		label: "Hiking & Sports",
		icon: MountainIcon,
		iconSide: "left",
		iconX: 580,
		textX: 700,
		y: 460,
		enterFrame: 90,
		accentColor: COLORS.cyan,
		driftX: -80,
	},
	{
		label: "Travel",
		icon: CompassIcon,
		iconSide: "right",
		iconX: 1020,
		textX: 400,
		y: 600,
		enterFrame: 130,
		accentColor: COLORS.amber,
		driftX: 80,
	},
];

export const Scene5_WhatDrivesMe: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Compress strips toward center (frames 170-175)
	const compressProgress =
		frame >= 170
			? spring({
					frame: frame - 170,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const compressY = compressProgress * -30; // each strip moves slightly toward center

	// Amber line above quote (frames 175-180)
	const lineProgress =
		frame >= 175
			? spring({
					frame: frame - 175,
					fps,
					config: { damping: 20, stiffness: 200 },
				})
			: 0;

	// Exit (frames 270-299)
	const exitProgress =
		frame >= 270
			? spring({
					frame: frame - 270,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const exitOpacity = 1 - exitProgress;

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
			<BackgroundTexture opacity={0.03} />

			<AbsoluteFill style={{ opacity: exitOpacity }}>
				{/* Passion strips */}
				{STRIPS.map((strip, i) => {
					const localFrame = Math.max(0, frame - strip.enterFrame);
					const iconProgress = spring({
						frame: localFrame,
						fps,
						config: { damping: 14, stiffness: 120 },
					});
					const textProgress =
						localFrame >= 5
							? spring({
									frame: localFrame - 5,
									fps,
									config: { damping: 20, stiffness: 200 },
								})
							: 0;

					const isVisible = frame >= strip.enterFrame;

					// Exit scatter
					const scatterX = exitProgress * strip.driftX;

					// Center offset for the strip (1=top, 4=bottom)
					const centerBias = (i - 1.5) * compressY;

					return (
						<div
							key={strip.label}
							style={{
								position: "absolute",
								top: strip.y + centerBias,
								left: 0,
								width: "100%",
								transform: `translateX(${scatterX}px)`,
								opacity: isVisible ? 1 : 0,
							}}
						>
							{/* Icon */}
							<div
								style={{
									position: "absolute",
									left: strip.iconX,
									top: 0,
									transform: `scale(${iconProgress})`,
									transformOrigin: "center",
								}}
							>
								{strip.icon}
							</div>

							{/* Text */}
							<div
								style={{
									position: "absolute",
									left: strip.textX,
									top: 4,
									fontFamily: FONT_HEADLINE,
									fontSize: 32,
									fontWeight: 600,
									color: COLORS.white,
									letterSpacing: 2,
									clipPath: `inset(0 ${(1 - textProgress) * 100}% 0 0)`,
									whiteSpace: "nowrap",
								}}
							>
								{strip.label}
							</div>

							{/* Accent underline */}
							<div
								style={{
									position: "absolute",
									left: strip.textX,
									top: 44,
									width: 40 * textProgress,
									height: 2,
									backgroundColor: strip.accentColor,
									opacity: 0.6,
								}}
							/>
						</div>
					);
				})}

				{/* Thin amber line above quote */}
				<div
					style={{
						position: "absolute",
						top: 720,
						left: 960 - 150 * lineProgress,
						width: 300 * lineProgress,
						height: 1,
						backgroundColor: COLORS.amber,
						opacity: 0.5,
					}}
				/>

				{/* Quote */}
				<div
					style={{
						position: "absolute",
						top: 740,
						width: "100%",
						display: "flex",
						justifyContent: "center",
						padding: "0 200px",
					}}
				>
					<StaggeredWords
						text="Building solutions that matter, from the mountains to the browser."
						startFrame={180}
						staggerDelay={3}
						fontSize={28}
						fontWeight={500}
						color={COLORS.white}
						animationStyle="springUp"
						springConfig={{ damping: 16, stiffness: 140 }}
					/>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
