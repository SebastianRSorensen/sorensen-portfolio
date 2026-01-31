"use client";

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "@/components/video/remotion-compat";
import { FONT_HEADLINE } from "../lib/fonts";
import { COLORS } from "../lib/colors";

type MilestoneCardProps = {
	year: string;
	title: string;
	description: string;
	trait: string;
	traitColor: string;
	enterFrame: number;
	side: "above" | "below";
	icon: React.ReactNode;
	x: number;
	timelineY: number;
};

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
	year,
	title,
	description,
	trait,
	traitColor,
	enterFrame,
	side,
	icon,
	x,
	timelineY,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const localFrame = Math.max(0, frame - enterFrame);

	if (frame < enterFrame) return null;

	const cardProgress = spring({
		frame: localFrame,
		fps,
		config: { damping: 16, stiffness: 140 },
	});

	const traitProgress = spring({
		frame: Math.max(0, localFrame - 8),
		fps,
		config: { damping: 14, stiffness: 120 },
	});

	const cardHeight = 180;
	const connectorLength = 50;
	const gap = 12;

	const isAbove = side === "above";
	const cardY = isAbove
		? timelineY - connectorLength - cardHeight - gap
		: timelineY + connectorLength + gap;

	// Slide in from above or below
	const slideOffset = isAbove ? -60 : 60;
	const translateY = slideOffset * (1 - cardProgress);

	// Connector line draws from timeline to card
	const connectorStart = timelineY + (isAbove ? -8 : 8);
	const connectorEnd = isAbove
		? timelineY - connectorLength
		: timelineY + connectorLength;

	return (
		<>
			{/* Connector line */}
			<svg
				width={1920}
				height={1080}
				style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
			>
				<line
					x1={x}
					y1={connectorStart}
					x2={x}
					y2={connectorStart + (connectorEnd - connectorStart) * cardProgress}
					stroke={traitColor}
					strokeWidth={1.5}
					opacity={0.5}
				/>
			</svg>

			{/* Card */}
			<div
				style={{
					position: "absolute",
					left: x - 140,
					top: cardY,
					width: 280,
					transform: `translateY(${translateY}px)`,
					opacity: cardProgress,
				}}
			>
				{/* Icon + Year */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 10,
						marginBottom: 8,
					}}
				>
					<div style={{ opacity: 0.7 }}>{icon}</div>
					<span
						style={{
							fontFamily: FONT_HEADLINE,
							fontSize: 16,
							fontWeight: 500,
							color: COLORS.slate,
							letterSpacing: 2,
						}}
					>
						{year}
					</span>
				</div>

				{/* Title */}
				<div
					style={{
						fontFamily: FONT_HEADLINE,
						fontSize: 24,
						fontWeight: 700,
						color: COLORS.white,
						marginBottom: 6,
						lineHeight: 1.2,
					}}
				>
					{title}
				</div>

				{/* Description */}
				<div
					style={{
						fontFamily: FONT_HEADLINE,
						fontSize: 16,
						fontWeight: 400,
						color: COLORS.slate,
						lineHeight: 1.4,
						marginBottom: 12,
					}}
				>
					{description}
				</div>

				{/* Trait keyword */}
				<div
					style={{
						fontFamily: FONT_HEADLINE,
						fontSize: 14,
						fontWeight: 700,
						color: traitColor,
						letterSpacing: 4,
						textTransform: "uppercase",
						opacity: traitProgress,
						transform: `translateY(${(1 - traitProgress) * 12}px)`,
					}}
				>
					{trait}
				</div>
			</div>
		</>
	);
};
