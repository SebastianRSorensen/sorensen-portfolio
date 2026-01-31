"use client";

import React, { useMemo } from "react";
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	random,
} from "@/components/video/remotion-compat";
import { StaggeredWords } from "../components/StaggeredWords";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { COLORS } from "../lib/colors";
import { FONT_HEADLINE, FONT_MONO } from "../lib/fonts";

type Particle = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
	opacity: number;
};

export const Scene6_CallToAction: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Pre-calculate particle positions
	const particles = useMemo<Particle[]>(() => {
		return Array.from({ length: 14 }, (_, i) => ({
			x: 1100 + random(`p-x-${i}`) * 700,
			y: 100 + random(`p-y-${i}`) * 880,
			vx: (random(`p-vx-${i}`) - 0.5) * 0.3,
			vy: (random(`p-vy-${i}`) - 0.5) * 0.3,
			r: 2 + random(`p-r-${i}`) * 2,
			opacity: 0.15 + random(`p-o-${i}`) * 0.1,
		}));
	}, []);

	// Vertical cyan accent line draws top-to-bottom (frames 5-30)
	const lineProgress =
		frame >= 5
			? spring({
					frame: frame - 5,
					fps,
					config: { damping: 200 },
				})
			: 0;

	// Line pulse after settling
	const linePulse =
		frame >= 120
			? 0.6 + Math.sin(frame * 0.06) * 0.15
			: 0.7;

	// Clip-in helpers
	const clipIn = (startFrame: number) => {
		if (frame < startFrame) return 0;
		return spring({
			frame: frame - startFrame,
			fps,
			config: { damping: 20, stiffness: 200 },
		});
	};

	const nameProgress = clipIn(10);
	const titleProgress = clipIn(25);
	const emailProgress = clipIn(45);
	const locationProgress = clipIn(55);

	// Exit (frames 260-299)
	const exitProgress =
		frame >= 260
			? spring({
					frame: frame - 260,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const exitOpacity = 1 - exitProgress;
	const exitSlide = exitProgress * -40;

	// Left edge X for golden ratio positioning
	const textX = 480;
	const lineX = textX - 30;
	const lineTop = 280;
	const lineBottom = 740;

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
			<BackgroundTexture opacity={0.03} />

			{/* Ambient particles on right half */}
			{particles.map((p, i) => {
				const px = p.x + p.vx * frame;
				const py = p.y + p.vy * frame;
				return (
					<div
						key={`particle-${i}`}
						style={{
							position: "absolute",
							left: px,
							top: py,
							width: p.r * 2,
							height: p.r * 2,
							borderRadius: "50%",
							backgroundColor: COLORS.slate,
							opacity: p.opacity * exitOpacity,
						}}
					/>
				);
			})}

			{/* Content with exit animation */}
			<AbsoluteFill
				style={{
					transform: `translateX(${exitSlide}px)`,
					opacity: exitOpacity,
				}}
			>
				{/* Vertical cyan accent line */}
				<div
					style={{
						position: "absolute",
						left: lineX,
						top: lineTop,
						width: 3,
						height: (lineBottom - lineTop) * lineProgress,
						backgroundColor: COLORS.cyan,
						opacity: linePulse,
						borderRadius: 2,
					}}
				/>

				{/* Name */}
				<div
					style={{
						position: "absolute",
						left: textX,
						top: 300,
						fontFamily: FONT_HEADLINE,
						fontSize: 52,
						fontWeight: 700,
						color: COLORS.white,
						letterSpacing: 3,
						clipPath: `inset(0 ${(1 - nameProgress) * 100}% 0 0)`,
						whiteSpace: "nowrap",
					}}
				>
					SEBASTIAN ROSNES SØRENSEN
				</div>

				{/* Title */}
				<div
					style={{
						position: "absolute",
						left: textX,
						top: 370,
						fontFamily: FONT_HEADLINE,
						fontSize: 28,
						fontWeight: 400,
						color: COLORS.slate,
						clipPath: `inset(0 ${(1 - titleProgress) * 100}% 0 0)`,
						whiteSpace: "nowrap",
					}}
				>
					System Developer
				</div>

				{/* Email */}
				<div
					style={{
						position: "absolute",
						left: textX,
						top: 460,
						fontFamily: FONT_MONO,
						fontSize: 20,
						fontWeight: 400,
						color: COLORS.slate,
						clipPath: `inset(0 ${(1 - emailProgress) * 100}% 0 0)`,
						whiteSpace: "nowrap",
					}}
				>
					sebastian.rosnes.sorensen@hotmail.com
				</div>

				{/* Location */}
				<div
					style={{
						position: "absolute",
						left: textX,
						top: 500,
						fontFamily: FONT_HEADLINE,
						fontSize: 20,
						fontWeight: 400,
						color: COLORS.slate,
						clipPath: `inset(0 ${(1 - locationProgress) * 100}% 0 0)`,
						whiteSpace: "nowrap",
					}}
				>
					Bergen, Norway
				</div>

				{/* CTA: "Let's build something." */}
				<div
					style={{
						position: "absolute",
						left: textX,
						top: 590,
					}}
				>
					<StaggeredWords
						text="Let's build something."
						startFrame={85}
						staggerDelay={5}
						fontSize={36}
						fontWeight={700}
						color={COLORS.amber}
						animationStyle="springUp"
					/>
				</div>
			</AbsoluteFill>

			{/* Final fade to pure navy in last 10 frames */}
			{frame >= 290 && (
				<AbsoluteFill
					style={{
						backgroundColor: COLORS.navy,
						opacity: interpolate(frame, [290, 299], [0, 1], {
							extrapolateRight: "clamp",
						}),
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
