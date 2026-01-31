"use client";

import React from "react";
import {
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "@/components/video/remotion-compat";
import { FONT_HEADLINE } from "../lib/fonts";
import { COLORS } from "../lib/colors";

type AnimationStyle =
	| "clipFromLeft"
	| "clipFromBottom"
	| "scaleUp"
	| "jumpInFromLeft";

type AnimatedTextProps = {
	text: string;
	animationStyle: AnimationStyle;
	startFrame?: number;
	durationFrames?: number;
	fontFamily?: string;
	color?: string;
	fontSize?: number;
	fontWeight?: number;
	letterSpacing?: number;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
	text,
	animationStyle,
	startFrame = 0,
	durationFrames = 20,
	fontFamily = FONT_HEADLINE,
	color = COLORS.white,
	fontSize = 72,
	fontWeight = 700,
	letterSpacing = 0,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const localFrame = Math.max(0, frame - startFrame);

	const progress = spring({
		frame: localFrame,
		fps,
		config: { damping: 20, stiffness: 200 },
		durationInFrames: durationFrames,
	});

	const baseStyle: React.CSSProperties = {
		fontFamily,
		fontSize,
		fontWeight,
		color,
		letterSpacing,
		whiteSpace: "nowrap",
	};

	if (frame < startFrame) {
		return <div style={{ ...baseStyle, opacity: 0 }}>{text}</div>;
	}

	if (animationStyle === "clipFromLeft") {
		return (
			<div
				style={{
					...baseStyle,
					clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
				}}
			>
				{text}
			</div>
		);
	}

	if (animationStyle === "clipFromBottom") {
		return (
			<div
				style={{
					...baseStyle,
					clipPath: `inset(${(1 - progress) * 100}% 0 0 0)`,
				}}
			>
				{text}
			</div>
		);
	}

	if (animationStyle === "scaleUp") {
		const scale = interpolate(progress, [0, 1], [0.7, 1]);
		return (
			<div
				style={{
					...baseStyle,
					transform: `scale(${scale})`,
					opacity: progress,
				}}
			>
				{text}
			</div>
		);
	}

	if (animationStyle === "jumpInFromLeft") {
		const letters = text.split("");
		const staggerFrames = 2;
		const charWidth = fontSize * 0.6;

		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				{letters.map((letter, i) => {
					const charDelay = i * staggerFrames;
					const charFrame = Math.max(0, localFrame - charDelay);

					const charProgress = spring({
						frame: charFrame,
						fps,
						config: { damping: 14, stiffness: 120 },
					});

					// Each character starts from the left side of screen.
					// Later characters start further left since their final
					// position is further right and they must clear more letters.
					const startX = -400 - i * charWidth;
					const translateX = interpolate(charProgress, [0, 1], [startX, 0]);

					// Arc height grows with index - later chars jump higher
					// to clear the growing row of placed letters.
					const arcHeight = 50 + i * 14;
					const translateY =
						-arcHeight * 4 * charProgress * (1 - charProgress);

					// Slight rotation during flight, settles to 0
					const rotate = (1 - charProgress) * 8;

					// Hidden until this character's animation begins
					const charOpacity = localFrame >= charDelay ? 1 : 0;

					return (
						<span
							key={`${i}-${letter}`}
							style={{
								...baseStyle,
								display: "inline-block",
								transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
								opacity: charOpacity,
								minWidth: letter === " " ? "0.3em" : undefined,
							}}
						>
							{letter}
						</span>
					);
				})}
			</div>
		);
	}

	return <div style={baseStyle}>{text}</div>;
};
