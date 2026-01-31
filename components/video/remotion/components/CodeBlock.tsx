"use client";

import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "@/components/video/remotion-compat";
import { FONT_MONO } from "../lib/fonts";
import { COLORS } from "../lib/colors";

export type CodeToken = {
	text: string;
	color: string;
};

export type CodeLine = CodeToken[];

type CodeBlockProps = {
	lines: CodeLine[];
	startFrame?: number;
	charsPerFrame?: number;
	fontSize?: number;
	showLineNumbers?: boolean;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
	lines,
	startFrame = 0,
	charsPerFrame = 1.5,
	fontSize = 22,
	showLineNumbers = true,
}) => {
	const frame = useCurrentFrame();
	const localFrame = Math.max(0, frame - startFrame);

	// Total character count across all lines (including newlines)
	const totalChars = useMemo(() => {
		let count = 0;
		for (const line of lines) {
			for (const token of line) {
				count += token.text.length;
			}
			count += 1; // newline
		}
		return count;
	}, [lines]);

	const charsRevealed = Math.min(totalChars, Math.floor(localFrame * charsPerFrame));

	// Cursor blink
	const cursorVisible =
		frame >= startFrame &&
		interpolate(
			frame % 20,
			[0, 10, 10.01, 20],
			[1, 1, 0, 0],
			{ extrapolateRight: "clamp" },
		) > 0.5;

	// Build rendered lines with cursor position tracking
	let charIndex = 0;
	let cursorPlaced = false;

	const renderedLines = lines.map((line, lineIdx) => {
		const tokens: React.ReactNode[] = [];
		let lineComplete = true;

		for (let t = 0; t < line.length; t++) {
			const token = line[t];
			const tokenStart = charIndex;
			const tokenEnd = charIndex + token.text.length;

			if (charsRevealed >= tokenEnd) {
				// Full token visible
				tokens.push(
					<span key={`${lineIdx}-${t}`} style={{ color: token.color }}>
						{token.text}
					</span>,
				);
			} else if (charsRevealed > tokenStart) {
				// Partial token
				const visibleCount = charsRevealed - tokenStart;
				tokens.push(
					<span key={`${lineIdx}-${t}`} style={{ color: token.color }}>
						{token.text.slice(0, visibleCount)}
					</span>,
				);
				if (!cursorPlaced && cursorVisible) {
					tokens.push(
						<span
							key={`cursor-${lineIdx}-${t}`}
							style={{ color: COLORS.cyan }}
						>
							{"\u258C"}
						</span>,
					);
					cursorPlaced = true;
				}
				lineComplete = false;
				charIndex = tokenEnd;
				break;
			} else {
				// Token not yet visible
				lineComplete = false;
				break;
			}
			charIndex = tokenEnd;
		}

		if (lineComplete) {
			charIndex += 1; // newline char
		}

		// If cursor belongs at end of this line (all tokens shown, next line not started)
		if (lineComplete && !cursorPlaced && charsRevealed <= charIndex) {
			if (cursorVisible) {
				tokens.push(
					<span key={`cursor-end-${lineIdx}`} style={{ color: COLORS.cyan }}>
						{"\u258C"}
					</span>,
				);
			}
			cursorPlaced = true;
		}

		// Skip lines that haven't started typing
		if (tokens.length === 0 && !lineComplete) return null;

		return (
			<div
				key={`line-${lineIdx}`}
				style={{
					display: "flex",
					lineHeight: 1.7,
					minHeight: fontSize * 1.7,
				}}
			>
				{showLineNumbers && (
					<span
						style={{
							color: COLORS.slate,
							opacity: 0.4,
							width: "3ch",
							textAlign: "right",
							marginRight: "1.5ch",
							userSelect: "none",
							flexShrink: 0,
						}}
					>
						{lineIdx + 1}
					</span>
				)}
				<span>{tokens}</span>
			</div>
		);
	});

	return (
		<div
			style={{
				fontFamily: FONT_MONO,
				fontSize,
				fontWeight: 400,
				backgroundColor: COLORS.darkSlate,
				borderRadius: 12,
				border: `1px solid ${COLORS.slate}33`,
				padding: "28px 32px",
				display: "inline-block",
			}}
		>
			{renderedLines}
		</div>
	);
};
