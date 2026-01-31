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

export const Scene2_HookStatement: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Exit animation: everything translates up + fades out (frames 110-134)
	const exitProgress =
		frame >= 110
			? spring({
					frame: frame - 110,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const exitY = exitProgress * -80;
	const exitOpacity = 1 - exitProgress;

	// Name is static — already transitioned into position by Scene 1
	const nameY = 280;

	// "SYSTEM DEVELOPER" clips in from left (frames 5-25)
	const devClipProgress =
		frame >= 5
			? spring({
					frame: frame - 5,
					fps,
					config: { damping: 20, stiffness: 200 },
				})
			: 0;

	// "Bergen, Norway" clips in from left (frames 18-37)
	const locationClipProgress =
		frame >= 18
			? spring({
					frame: frame - 18,
					fps,
					config: { damping: 20, stiffness: 200 },
				})
			: 0;

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
			<BackgroundTexture opacity={0.04} />

			{/* Subtle background texture: topographic lines left, code brackets right */}
			<AbsoluteFill style={{ opacity: 0.04 }}>
				<svg width={1920} height={1080}>
					{/* Topographic contour lines - left side */}
					<g opacity={0.6}>
						{[0, 1, 2, 3, 4].map((i) => (
							<ellipse
								key={`topo-${i}`}
								cx={380 + i * 15}
								cy={540 + i * 10}
								rx={200 + i * 60}
								ry={120 + i * 40}
								fill="none"
								stroke={COLORS.slate}
								strokeWidth={1}
							/>
						))}
					</g>
					{/* Faint code brackets - right side */}
					<g opacity={0.5}>
						<text
							x={1300}
							y={350}
							fontSize={160}
							fontFamily="monospace"
							fill={COLORS.slate}
						>
							{"{ }"}
						</text>
						<text
							x={1350}
							y={600}
							fontSize={100}
							fontFamily="monospace"
							fill={COLORS.slate}
						>
							{"< />"}
						</text>
						<text
							x={1250}
							y={800}
							fontSize={80}
							fontFamily="monospace"
							fill={COLORS.slate}
						>
							{"[ ]"}
						</text>
					</g>
				</svg>
			</AbsoluteFill>

			{/* Content layer with exit animation */}
			<AbsoluteFill
				style={{
					transform: `translateY(${exitY}px)`,
					opacity: exitOpacity,
				}}
			>
				{/* Name - matches Scene 1's AnimatedText jumpInFromLeft settled state exactly:
				    same per-character inline-block spans, same flex container,
				    same scale/translate, so pixels are identical across the cut. */}
				<AbsoluteFill
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						transform: "translateY(-234px) scale(0.667)",
					}}
				>
					<div style={{ display: "flex", justifyContent: "center" }}>
						{"SEBASTIAN ROSNES SØRENSEN".split("").map((letter, i) => (
							<span
								key={`${i}-${letter}`}
								style={{
									fontFamily: FONT_HEADLINE,
									fontSize: 78,
									fontWeight: 700,
									color: COLORS.white,
									letterSpacing: 6,
									whiteSpace: "nowrap",
									display: "inline-block",
									minWidth: letter === " " ? "0.3em" : undefined,
								}}
							>
								{letter}
							</span>
						))}
					</div>
				</AbsoluteFill>

				{/* SYSTEM DEVELOPER */}
				<div
					style={{
						position: "absolute",
						top: nameY + 70,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							fontFamily: FONT_HEADLINE,
							fontSize: 42,
							fontWeight: 500,
							color: COLORS.cyan,
							letterSpacing: 8,
							clipPath: `inset(0 ${(1 - devClipProgress) * 100}% 0 0)`,
						}}
					>
						SYSTEM DEVELOPER
					</div>
				</div>

				{/* Bergen, Norway */}
				<div
					style={{
						position: "absolute",
						top: nameY + 125,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							fontFamily: FONT_HEADLINE,
							fontSize: 24,
							fontWeight: 400,
							color: COLORS.slate,
							letterSpacing: 3,
							clipPath: `inset(0 ${(1 - locationClipProgress) * 100}% 0 0)`,
						}}
					>
						Bergen, Norway
					</div>
				</div>

				{/* Tagline: "Fintech × Military Precision × Nordic Mindset" */}
				<div
					style={{
						position: "absolute",
						top: nameY + 210,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<StaggeredWords
						text="Fintech × Military Precision × Nordic Mindset"
						startFrame={45}
						staggerDelay={4}
						fontSize={32}
						fontWeight={500}
						color={COLORS.white}
						animationStyle="springUp"
						wordStyle={(word) =>
							word === "×" ? { color: COLORS.amber } : undefined
						}
					/>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
