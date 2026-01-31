"use client";

import React from "react";
import { interpolate, useCurrentFrame } from "@/components/video/remotion-compat";
import { COLORS } from "../lib/colors";
import { FONT_MONO } from "../lib/fonts";

type TerminalTypingProps = {
	text: string;
	charFrames?: number;
	cursorBlinkFrames?: number;
	startDelay?: number;
	fontSize?: number;
};

export const TerminalTyping: React.FC<TerminalTypingProps> = ({
	text,
	charFrames = 2,
	cursorBlinkFrames = 16,
	startDelay = 0,
	fontSize = 32,
}) => {
	const frame = useCurrentFrame();
	const adjustedFrame = Math.max(0, frame - startDelay);

	const charsToShow = Math.min(
		text.length,
		Math.floor(adjustedFrame / charFrames),
	);
	const typedText = text.slice(0, charsToShow);

	const cursorOpacity = interpolate(
		frame % cursorBlinkFrames,
		[0, cursorBlinkFrames / 2, cursorBlinkFrames],
		[1, 0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "100%",
			}}
		>
			<div
				style={{
					fontFamily: FONT_MONO,
					fontSize,
					fontWeight: 400,
					letterSpacing: 1,
				}}
			>
				<span style={{ color: COLORS.slate }}>{">"} </span>
				<span style={{ color: COLORS.cyan }}>{typedText}</span>
				<span style={{ color: COLORS.cyan, opacity: cursorOpacity }}>
					{"\u258C"}
				</span>
			</div>
		</div>
	);
};
