"use client";

import React from "react";
import {
	AbsoluteFill,
	Sequence,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "@/components/video/remotion-compat";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { TerminalTyping } from "../components/TerminalTyping";
import { MountainSilhouette } from "../components/MountainSilhouette";
import { CameraShake } from "../components/CameraShake";
import { AnimatedText } from "../components/AnimatedText";
import { COLORS } from "../lib/colors";

export const Scene1_OpeningHook: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Grain fades in over first 14 frames
	const grainOpacity = interpolate(frame, [0, 14], [0, 0.06], {
		extrapolateRight: "clamp",
	});

	// --- Text displacement from mountain impacts ---
	const textY = interpolate(
		frame,
		[0, 56, 58, 62, 64, 67, 69, 73],
		[0, 0, -35, -5, 0, 0, -150, -1200],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	const textRotation = interpolate(
		frame,
		[0, 56, 58, 62, 64, 67, 69, 73],
		[0, 0, -2, -0.3, 0, 0, -1.5, -8],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	// --- Mountain exit (frames 160-195): slide back down ---
	const mountainExitY = interpolate(frame, [160, 195], [0, 110], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// --- Name transition (frames 190-235): shrink + move up ---
	// Name center starts at Y=540 (AbsoluteFill center), 78px
	// Target: Y=306 (top=280 + half of 52px), scale 52/78 ≈ 0.667
	const nameTransitionProgress =
		frame >= 190
			? spring({
					frame: frame - 190,
					fps,
					config: { damping: 200 },
				})
			: 0;
	const nameScale = interpolate(nameTransitionProgress, [0, 1], [1, 0.667]);
	const nameTranslateY = interpolate(
		nameTransitionProgress,
		[0, 1],
		[0, -234],
	);

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
			{/* Layer 1: Background grain texture */}
			<BackgroundTexture opacity={grainOpacity} />

			{/* Layer 2: Mountains - rise from bottom, exit back down */}
			<AbsoluteFill
				style={{ transform: `translateY(${mountainExitY}%)` }}
			>
				<Sequence from={45} premountFor={30}>
					<MountainSilhouette />
				</Sequence>
			</AbsoluteFill>

			{/* Layer 3: Terminal typing - displaced by mountain impacts */}
			<Sequence from={15} durationInFrames={60} premountFor={15}>
				<AbsoluteFill
					style={{
						transform: `translateY(${textY}px) rotate(${textRotation}deg)`,
					}}
				>
					<TerminalTyping text="initializing..." fontSize={34} />
				</AbsoluteFill>
			</Sequence>

			{/* Layer 4: Name reveal — jumps in, then shrinks + rises into Scene 2 position */}
			<AbsoluteFill
				style={{
					transform: `translateY(${nameTranslateY}px) scale(${nameScale})`,
				}}
			>
				<Sequence from={82} premountFor={20}>
					<AbsoluteFill
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<CameraShake startFrame={0} durationFrames={18} intensity={10}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "100%",
									height: "100%",
								}}
							>
								<AnimatedText
									text="SEBASTIAN ROSNES SØRENSEN"
									animationStyle="jumpInFromLeft"
									startFrame={0}
									fontSize={78}
									fontWeight={700}
									letterSpacing={6}
									color={COLORS.white}
								/>
							</div>
						</CameraShake>
					</AbsoluteFill>
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
