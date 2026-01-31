"use client";

import { motion, type Variants } from "framer-motion";
import { type ComponentProps } from "react";

interface UFOProps extends ComponentProps<typeof motion.svg> {
  size?: number;
  beamActive?: boolean;
  beamIntensity?: number;
  floating?: boolean;
}

const floatVariants: Variants = {
  float: {
    y: [0, -12, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function UFO({
  size = 200,
  beamActive = true,
  beamIntensity,
  floating = true,
  ...props
}: UFOProps) {
  const height = (size * 140) / 200;
  const intensity = beamIntensity ?? (beamActive ? 1 : 0);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 140"
      width={size}
      height={height}
      overflow="visible"
      variants={floatVariants}
      animate={floating ? "float" : undefined}
      {...props}
    >
      <defs>
        <linearGradient id="ufo-beam" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a5f3fc" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#a5f3fc" stopOpacity={0} />
        </linearGradient>
        <radialGradient
          id="ufo-beam-glow"
          cx="50%"
          cy="100%"
          r="60%"
          fx="50%"
          fy="100%"
        >
          <stop offset="0%" stopColor="#a5f3fc" stopOpacity={0.4} />
          <stop offset="60%" stopColor="#a5f3fc" stopOpacity={0.1} />
          <stop offset="100%" stopColor="#a5f3fc" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="ufo-dome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="ufo-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="50%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
        <filter id="ufo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="ufo-outer-glow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="6" result="outerGlow" />
          <feMerge>
            <feMergeNode in="outerGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Light beam — always rendered, opacity driven by intensity */}
      {/* Extends far below SVG viewBox via overflow="visible" */}
      <g
        opacity={intensity}
        style={{
          transform: `scaleX(${0.8 + intensity * 0.2})`,
          transformOrigin: "100px 65px",
        }}
      >
        <motion.path
          d="M75 65 L-30 500 L230 500 L125 65 Z"
          fill="url(#ufo-beam)"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Spotlight pool of light at beam base */}
        <ellipse
          cx="100"
          cy="480"
          rx="140"
          ry="30"
          fill="url(#ufo-beam-glow)"
          filter="url(#ufo-outer-glow)"
        />
      </g>

      {/* UFO body (saucer) */}
      <ellipse cx="100" cy="55" rx="55" ry="15" fill="url(#ufo-body)" />

      {/* Body rim highlight */}
      <ellipse cx="100" cy="52" rx="50" ry="10" fill="#9ca3af" opacity={0.3} />

      {/* Bottom detail ring */}
      <ellipse cx="100" cy="60" rx="40" ry="8" fill="#1f2937" />

      {/* Animated lights */}
      <motion.circle
        cx="70"
        cy="58"
        r="4"
        fill="#fbbf24"
        filter="url(#ufo-glow)"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <motion.circle
        cx="100"
        cy="62"
        r="4"
        fill="#34d399"
        filter="url(#ufo-glow)"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <motion.circle
        cx="130"
        cy="58"
        r="4"
        fill="#f87171"
        filter="url(#ufo-glow)"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
      />

      {/* Glass dome */}
      <ellipse
        cx="100"
        cy="45"
        rx="25"
        ry="20"
        fill="url(#ufo-dome)"
        opacity={0.7}
      />

      {/* Dome highlight */}
      <ellipse cx="92" cy="38" rx="8" ry="6" fill="#ffffff" opacity={0.4} />

      {/* Alien silhouette */}
      <ellipse cx="100" cy="48" rx="8" ry="10" fill="#064e3b" opacity={0.6} />
      <circle cx="96" cy="44" r="2" fill="#a5f3fc" />
      <circle cx="104" cy="44" r="2" fill="#a5f3fc" />
    </motion.svg>
  );
}
