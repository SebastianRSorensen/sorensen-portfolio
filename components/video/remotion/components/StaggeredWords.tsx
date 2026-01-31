"use client";

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "@/components/video/remotion-compat";
import { FONT_HEADLINE } from "../lib/fonts";
import { COLORS } from "../lib/colors";

type AnimationStyle = "springUp" | "clipReveal";

type SpringConfig = {
	damping?: number;
	stiffness?: number;
	mass?: number;
};

type StaggeredWordsProps = {
	text: string;
	startFrame?: number;
	staggerDelay?: number;
	fontSize?: number;
	fontWeight?: number;
	color?: string;
	springConfig?: SpringConfig;
	animationStyle?: AnimationStyle;
	letterSpacing?: number;
	fontFamily?: string;
	/** Callback to style individual words, e.g. color the "×" symbols */
	wordStyle?: (word: string, index: number) => React.CSSProperties | undefined;
};

export const StaggeredWords: React.FC<StaggeredWordsProps> = ({
	text,
	startFrame = 0,
	staggerDelay = 4,
	fontSize = 36,
	fontWeight = 700,
	color = COLORS.white,
	springConfig = { damping: 14, stiffness: 120 },
	animationStyle = "springUp",
	letterSpacing = 0,
	fontFamily = FONT_HEADLINE,
	wordStyle,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const words = text.split(" ");

	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: `0 ${fontSize * 0.35}px`,
				justifyContent: "center",
			}}
		>
			{words.map((word, i) => {
				const wordFrame = Math.max(0, frame - startFrame - i * staggerDelay);
				const progress = spring({
					frame: wordFrame,
					fps,
					config: springConfig,
				});

				const isVisible = frame >= startFrame + i * staggerDelay;

				const extraStyle = wordStyle?.(word, i) ?? {};

				if (animationStyle === "springUp") {
					const translateY = (1 - progress) * 40;
					return (
						<span
							key={`${i}-${word}`}
							style={{
								fontFamily,
								fontSize,
								fontWeight,
								color,
								letterSpacing,
								display: "inline-block",
								transform: `translateY(${translateY}px)`,
								opacity: isVisible ? progress : 0,
								whiteSpace: "nowrap",
								...extraStyle,
							}}
						>
							{word}
						</span>
					);
				}

				// clipReveal
				return (
					<span
						key={`${i}-${word}`}
						style={{
							fontFamily,
							fontSize,
							fontWeight,
							color,
							letterSpacing,
							display: "inline-block",
							clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
							opacity: isVisible ? 1 : 0,
							whiteSpace: "nowrap",
							...extraStyle,
						}}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
};
