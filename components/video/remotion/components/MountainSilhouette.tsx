"use client";

import React from "react";
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "@/components/video/remotion-compat";
import { COLORS } from "../lib/colors";

export const MountainSilhouette: React.FC = () => {
	const frame = useCurrentFrame();
	const { width, height } = useVideoConfig();

	// Rise from bottom with two-hit bounce pattern:
	//  0-12  : charge up from below (110% → -3% overshoot) — first impact
	// 12-17  : bounce back down (-3% → 20%)
	// 17-23  : second rise, harder (20% → -5% overshoot)
	// 23-28  : settle into final position (-5% → 0%)
	const mountainY = interpolate(
		frame,
		[0, 12, 17, 23, 28],
		[110, -3, 20, -5, 0],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	// Subtle horizontal parallax drift
	const drift = interpolate(frame, [0, 600], [0, -30], {
		extrapolateRight: "clamp",
	});

	const bgY = height * 0.55;
	const fgY = height * 0.65;

	// Background range - softer, further away
	const bgPath = [
		`M0,${bgY + 80}`,
		`L${width * 0.05},${bgY + 20}`,
		`L${width * 0.12},${bgY - 60}`,
		`L${width * 0.18},${bgY - 120}`,
		`L${width * 0.25},${bgY - 180}`,
		`L${width * 0.3},${bgY - 140}`,
		`L${width * 0.38},${bgY - 200}`,
		`L${width * 0.42},${bgY - 160}`,
		`L${width * 0.48},${bgY - 90}`,
		`L${width * 0.55},${bgY - 140}`,
		`L${width * 0.62},${bgY - 220}`,
		`L${width * 0.68},${bgY - 170}`,
		`L${width * 0.75},${bgY - 100}`,
		`L${width * 0.82},${bgY - 150}`,
		`L${width * 0.88},${bgY - 190}`,
		`L${width * 0.95},${bgY - 80}`,
		`L${width},${bgY + 40}`,
		`L${width},${height}`,
		`L0,${height} Z`,
	].join(" ");

	// Foreground range - more angular, closer, darker
	const fgPath = [
		`M0,${fgY + 60}`,
		`L${width * 0.04},${fgY - 10}`,
		`L${width * 0.1},${fgY - 80}`,
		`L${width * 0.15},${fgY - 40}`,
		`L${width * 0.22},${fgY - 130}`,
		`L${width * 0.28},${fgY - 170}`,
		`L${width * 0.33},${fgY - 100}`,
		`L${width * 0.4},${fgY - 60}`,
		`L${width * 0.46},${fgY - 110}`,
		`L${width * 0.52},${fgY - 80}`,
		`L${width * 0.58},${fgY - 40}`,
		`L${width * 0.65},${fgY - 90}`,
		`L${width * 0.72},${fgY - 150}`,
		`L${width * 0.78},${fgY - 110}`,
		`L${width * 0.85},${fgY - 60}`,
		`L${width * 0.92},${fgY - 30}`,
		`L${width},${fgY + 20}`,
		`L${width},${height}`,
		`L0,${height} Z`,
	].join(" ");

	return (
		<>
			{/* Background mountain layer */}
			<AbsoluteFill style={{ transform: `translateY(${mountainY}%)` }}>
				<svg
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					style={{ transform: `translateX(${drift * 0.5}px)` }}
				>
					<path d={bgPath} fill={COLORS.darkSlate} opacity={0.5} />
				</svg>
			</AbsoluteFill>
			{/* Foreground mountain layer */}
			<AbsoluteFill style={{ transform: `translateY(${mountainY}%)` }}>
				<svg
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					style={{ transform: `translateX(${drift}px)` }}
				>
					<path d={fgPath} fill={COLORS.darkSlate} opacity={0.8} />
				</svg>
			</AbsoluteFill>
		</>
	);
};
