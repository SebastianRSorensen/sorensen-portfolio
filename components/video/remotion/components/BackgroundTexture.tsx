"use client";

import React, { useMemo } from "react";
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, random } from "@/components/video/remotion-compat";
import { COLORS } from "../lib/colors";

type BackgroundTextureProps = {
	opacity?: number;
	baseColor?: string;
	speed?: number;
};

export const BackgroundTexture: React.FC<BackgroundTextureProps> = ({
	opacity = 0.06,
	baseColor = COLORS.navy,
	speed = 2,
}) => {
	const frame = useCurrentFrame();
	const { width, height } = useVideoConfig();

	const seed = Math.floor(frame / speed);

	const svgDataUri = useMemo(() => {
		const seedValue = random(`grain-${seed}`) * 1000;
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
			<filter id="g">
				<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="${seedValue}" stitchTiles="stitch"/>
				<feColorMatrix type="saturate" values="0"/>
			</filter>
			<rect width="100%" height="100%" filter="url(#g)"/>
		</svg>`;
		return `data:image/svg+xml;base64,${btoa(svg)}`;
	}, [seed, width, height]);

	return (
		<AbsoluteFill style={{ backgroundColor: baseColor }}>
			<Img
				src={svgDataUri}
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					objectFit: "cover",
					mixBlendMode: "overlay",
					opacity,
				}}
			/>
		</AbsoluteFill>
	);
};
