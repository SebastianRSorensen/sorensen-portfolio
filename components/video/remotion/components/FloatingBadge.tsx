"use client";

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "@/components/video/remotion-compat";
import { FONT_MONO } from "../lib/fonts";
import { COLORS } from "../lib/colors";

type FloatingBadgeProps = {
	label: string;
	liftFrame: number;
	originX: number;
	originY: number;
	targetX: number;
	targetY: number;
	color?: string;
};

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
	label,
	liftFrame,
	originX,
	originY,
	targetX,
	targetY,
	color = COLORS.amber,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const localFrame = Math.max(0, frame - liftFrame);

	if (frame < liftFrame) return null;

	const progress = spring({
		frame: localFrame,
		fps,
		config: { damping: 15, stiffness: 80, mass: 2 },
	});

	const x = originX + (targetX - originX) * progress;
	const baseY = originY + (targetY - originY) * progress;

	// Parabolic arc during flight
	const arcHeight = -60 * 4 * progress * (1 - progress);

	// Gentle bob after settling
	const bob = progress > 0.95 ? Math.sin((frame - liftFrame) * 0.08) * 3 : 0;

	const y = baseY + arcHeight + bob;

	// Fade in quickly
	const opacity = Math.min(1, localFrame / 4);

	return (
		<div
			style={{
				position: "absolute",
				left: x,
				top: y,
				transform: "translate(-50%, -50%)",
				fontFamily: FONT_MONO,
				fontSize: 18,
				fontWeight: 500,
				color: COLORS.white,
				backgroundColor: COLORS.darkSlate,
				borderBottom: `2px solid ${color}`,
				borderRadius: 8,
				padding: "8px 18px",
				whiteSpace: "nowrap",
				opacity,
			}}
		>
			{label}
		</div>
	);
};
