"use client";

import React from "react";
import { useCurrentFrame, random } from "@/components/video/remotion-compat";

type CameraShakeProps = {
	startFrame: number;
	durationFrames?: number;
	intensity?: number;
	rotationIntensity?: number;
	children: React.ReactNode;
};

export const CameraShake: React.FC<CameraShakeProps> = ({
	startFrame,
	durationFrames = 15,
	intensity = 8,
	rotationIntensity = 1.5,
	children,
}) => {
	const frame = useCurrentFrame();
	const shakeFrame = frame - startFrame;

	let translateX = 0;
	let translateY = 0;
	let rotate = 0;

	if (shakeFrame >= 0 && shakeFrame < durationFrames) {
		// Sharp 2-frame attack, exponential decay
		const attack = shakeFrame < 2 ? shakeFrame / 2 : 1;
		const decay = Math.exp(-0.25 * Math.max(0, shakeFrame - 2));
		const envelope = attack * decay;

		translateX =
			(random(`shake-x-${shakeFrame}`) * 2 - 1) * intensity * envelope;
		translateY =
			(random(`shake-y-${shakeFrame}`) * 2 - 1) * intensity * envelope;
		rotate =
			(random(`shake-r-${shakeFrame}`) * 2 - 1) *
			rotationIntensity *
			envelope;
	}

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
			}}
		>
			{children}
		</div>
	);
};
