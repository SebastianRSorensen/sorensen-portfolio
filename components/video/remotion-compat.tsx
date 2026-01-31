"use client";

import React, { createContext, useContext } from "react";
import { useScrollFrame, useScrollFrameContext } from "./scroll-frame-context";

// ── Sequence offset context ──────────────────────────────────────────
// Allows Sequence to provide a local frame offset so useCurrentFrame()
// returns the frame relative to the start of the surrounding Sequence.

const SequenceOffsetContext = createContext<number>(0);

export { SequenceOffsetContext };

/**
 * Drop-in replacement for Remotion's useCurrentFrame()
 * Subtracts the sequence offset so scenes get local frames starting at 0.
 */
export function useCurrentFrame() {
  const globalFrame = useScrollFrame();
  const offset = useContext(SequenceOffsetContext);
  return Math.max(0, globalFrame - offset);
}

/**
 * Drop-in replacement for Remotion's useVideoConfig()
 */
export function useVideoConfig() {
  const { totalFrames, fps } = useScrollFrameContext();

  return {
    fps,
    durationInFrames: totalFrames,
    width: 1920,
    height: 1080,
  };
}

/**
 * Drop-in replacement for Remotion's interpolate()
 */
export function interpolate(
  input: number,
  inputRange: readonly number[],
  outputRange: readonly number[],
  options?: {
    extrapolateLeft?: "clamp" | "extend";
    extrapolateRight?: "clamp" | "extend";
    easing?: (t: number) => number;
  }
): number {
  const { extrapolateLeft = "extend", extrapolateRight = "extend", easing } = options || {};

  if (inputRange.length !== outputRange.length) {
    throw new Error("inputRange and outputRange must have the same length");
  }

  if (inputRange.length < 2) {
    throw new Error("inputRange must have at least 2 values");
  }

  // Handle out of range
  if (input <= inputRange[0]) {
    if (extrapolateLeft === "clamp") {
      return outputRange[0];
    }
  }

  if (input >= inputRange[inputRange.length - 1]) {
    if (extrapolateRight === "clamp") {
      return outputRange[outputRange.length - 1];
    }
  }

  // Find the segment
  let segmentIndex = 0;
  for (let i = 1; i < inputRange.length; i++) {
    if (input < inputRange[i]) {
      segmentIndex = i - 1;
      break;
    }
    segmentIndex = i - 1;
  }

  const inputMin = inputRange[segmentIndex];
  const inputMax = inputRange[segmentIndex + 1];
  const outputMin = outputRange[segmentIndex];
  const outputMax = outputRange[segmentIndex + 1];

  // Calculate progress in this segment
  let progress = (input - inputMin) / (inputMax - inputMin);

  // Apply easing if provided
  if (easing) {
    progress = easing(progress);
  }

  // Linear interpolation
  return outputMin + progress * (outputMax - outputMin);
}

/**
 * Simplified spring() — drop-in for Remotion's spring()
 */
export function spring({
  frame,
  fps,
  config = {},
  from = 0,
  to = 1,
  durationInFrames,
}: {
  frame: number;
  fps: number;
  config?: {
    damping?: number;
    mass?: number;
    stiffness?: number;
  };
  from?: number;
  to?: number;
  durationInFrames?: number;
}): number {
  const { damping = 10, mass = 1, stiffness = 100 } = config;

  const duration = durationInFrames || fps;
  const progress = Math.min(1, frame / duration);

  const omega = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  let springProgress: number;

  if (zeta < 1) {
    // Underdamped (bouncy)
    const omegaD = omega * Math.sqrt(1 - zeta * zeta);
    const t = progress * (duration / fps);
    springProgress =
      1 -
      Math.exp(-zeta * omega * t) *
        (Math.cos(omegaD * t) + (zeta * omega / omegaD) * Math.sin(omegaD * t));
  } else {
    // Critically damped or overdamped
    const t = progress * (duration / fps);
    springProgress = 1 - Math.exp(-omega * t) * (1 + omega * t);
  }

  springProgress = Math.max(0, Math.min(1, springProgress));

  return from + springProgress * (to - from);
}

/**
 * Common easing functions
 */
export const Easing = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeInOutQuart: (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInSine: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t: number) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInBack: (t: number) => {
    const c = 1.70158;
    return (c + 1) * t * t * t - c * t * t;
  },
  easeOutBack: (t: number) => {
    const c = 1.70158;
    return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
  },
};

// ── AbsoluteFill ─────────────────────────────────────────────────────

type AbsoluteFillProps = React.HTMLAttributes<HTMLDivElement>;

export const AbsoluteFill = React.forwardRef<HTMLDivElement, AbsoluteFillProps>(
  ({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
);

AbsoluteFill.displayName = "AbsoluteFill";

// ── Sequence ─────────────────────────────────────────────────────────

type SequenceProps = {
  from?: number;
  durationInFrames?: number;
  premountFor?: number;
  children: React.ReactNode;
  name?: string;
  layout?: string;
};

export function Sequence({
  from = 0,
  durationInFrames,
  premountFor = 0,
  children,
}: SequenceProps) {
  const parentOffset = useContext(SequenceOffsetContext);
  const globalFrame = useScrollFrame();

  // The absolute start frame taking parent offset into account
  const absoluteFrom = parentOffset + from;

  // Whether this sequence should be visible
  const localFrame = globalFrame - absoluteFrom;

  // premountFor: render early (but invisible) so children can pre-compute
  const shouldRender =
    localFrame >= -premountFor &&
    (durationInFrames === undefined || localFrame < durationInFrames);

  if (!shouldRender) return null;

  const isVisible = localFrame >= 0;

  return (
    <SequenceOffsetContext.Provider value={absoluteFrom}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </SequenceOffsetContext.Provider>
  );
}

// ── Img ──────────────────────────────────────────────────────────────

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const Img = React.forwardRef<HTMLImageElement, ImgProps>(
  (props, ref) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} alt="" {...props} />
  )
);

Img.displayName = "Img";

// ── random() ─────────────────────────────────────────────────────────
// Deterministic PRNG matching Remotion's random(seed) API.

export function random(seed: string | number): number {
  const str = String(seed);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 32-bit integer
  }
  // Map to 0-1 using sine
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
}

// ── Legacy helpers ───────────────────────────────────────────────────

export function useSequenceFrame(sequenceStart: number) {
  const globalFrame = useScrollFrame();
  return Math.max(0, globalFrame - sequenceStart);
}

export function useFrameRange(start: number, end: number) {
  const frame = useScrollFrame();
  return frame >= start && frame <= end;
}
