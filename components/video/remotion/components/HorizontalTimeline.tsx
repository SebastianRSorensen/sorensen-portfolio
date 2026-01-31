"use client";

import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "@/components/video/remotion-compat";
import { COLORS } from "../lib/colors";

export type Milestone = {
	position: number; // 0-1 along the line
	activateFrame: number; // local frame when dot pulses
	color: string;
};

type HorizontalTimelineProps = {
	progress: number; // 0-1 how much line is drawn
	milestones: Milestone[];
	lineColor?: string;
	y?: number;
	startX?: number;
	endX?: number;
};

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({
	progress,
	milestones,
	lineColor = COLORS.slate,
	y = 540,
	startX = 120,
	endX = 1800,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const lineLength = endX - startX;
	const drawnLength = lineLength * progress;

	return (
		<svg
			width={1920}
			height={1080}
			style={{ position: "absolute", top: 0, left: 0 }}
		>
			{/* Base line (track) */}
			<line
				x1={startX}
				y1={y}
				x2={endX}
				y2={y}
				stroke={lineColor}
				strokeWidth={2}
				opacity={0.15}
			/>

			{/* Drawn line */}
			<line
				x1={startX}
				y1={y}
				x2={startX + drawnLength}
				y2={y}
				stroke={lineColor}
				strokeWidth={2}
				opacity={0.6}
			/>

			{/* Leading edge glow */}
			{progress > 0 && progress < 1 && (
				<circle
					cx={startX + drawnLength}
					cy={y}
					r={6}
					fill={COLORS.cyan}
					opacity={0.4}
				>
					<animate
						attributeName="opacity"
						values="0.2;0.5;0.2"
						dur="1s"
						repeatCount="indefinite"
					/>
				</circle>
			)}

			{/* Milestone dots */}
			{milestones.map((ms, i) => {
				const dotX = startX + lineLength * ms.position;
				const isRevealed = progress >= ms.position;

				const dotScale = isRevealed
					? spring({
							frame: Math.max(0, frame - ms.activateFrame),
							fps,
							config: { damping: 12, stiffness: 200 },
						})
					: 0;

				// Radiating ring pulse
				const ringFrame = Math.max(0, frame - ms.activateFrame);
				const ringScale = isRevealed ? 1 + ringFrame * 0.06 : 0;
				const ringOpacity = isRevealed
					? Math.max(0, 1 - ringFrame * 0.04)
					: 0;

				return (
					<g key={`ms-${i}`}>
						{/* Radiating ring */}
						{isRevealed && ringOpacity > 0 && (
							<circle
								cx={dotX}
								cy={y}
								r={8 * ringScale}
								fill="none"
								stroke={ms.color}
								strokeWidth={1.5}
								opacity={ringOpacity}
							/>
						)}
						{/* Dot */}
						<circle
							cx={dotX}
							cy={y}
							r={7 * dotScale}
							fill={ms.color}
						/>
					</g>
				);
			})}
		</svg>
	);
};
