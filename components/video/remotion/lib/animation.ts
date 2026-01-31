import { spring } from "@/components/video/remotion-compat";

type SpringInput = {
	frame: number;
	fps: number;
};

/** Snappy spring for UI elements - quick attack, minimal overshoot */
export const snappySpring = ({ frame, fps }: SpringInput) =>
	spring({ frame, fps, config: { damping: 20, stiffness: 200 } });

/** Smooth spring for subtle reveals - no bounce */
export const smoothSpring = ({ frame, fps }: SpringInput) =>
	spring({ frame, fps, config: { damping: 200 } });

/** Heavy spring for impactful, weighty motion */
export const heavySpring = ({ frame, fps }: SpringInput) =>
	spring({
		frame,
		fps,
		config: { damping: 15, stiffness: 80, mass: 2 },
	});
