"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  useScrollTracker,
  useMouseTracker,
  useWindowSize,
  useReducedMotion,
} from "@/lib/jungle-hooks";

export function Frog() {
  const controls = useAnimation();
  const { scrollY } = useScrollTracker();
  const { mouseX, mouseY } = useMouseTracker();
  const { width, height } = useWindowSize();
  const prefersReduced = useReducedMotion();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 500 });
  const hopTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  // Reposition frog based on scroll
  useEffect(() => {
    if (prefersReduced) return;
    const newY = Math.min(
      height - 80,
      Math.max(200, 400 + (scrollY * 0.1) % 300)
    );
    setPosition((prev) => ({ ...prev, y: newY }));
  }, [scrollY, height, prefersReduced]);

  // Occasional random hop
  useEffect(() => {
    if (prefersReduced) return;
    const scheduleHop = () => {
      hopTimeoutRef.current = setTimeout(
        () => {
          const hopX = Math.max(
            30,
            Math.min(
              width > 768 ? 200 : 100,
              position.x + (Math.random() - 0.5) * 80
            )
          );
          controls
            .start({
              x: hopX,
              y: [position.y, position.y - 40, position.y],
              transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
            })
            .then(() => {
              setPosition((prev) => ({ ...prev, x: hopX }));
            });
          scheduleHop();
        },
        6000 + Math.random() * 8000
      );
    };

    scheduleHop();
    return () => {
      if (hopTimeoutRef.current) clearTimeout(hopTimeoutRef.current);
    };
  }, [width, controls, position.x, position.y, prefersReduced]);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    // Big hop to random position
    const newX = Math.max(30, Math.min(width > 768 ? 200 : 100, Math.random() * 200));
    controls.start({
      x: newX,
      y: [position.y, position.y - 80, position.y + 20, position.y],
      rotate: [0, -10, 5, 0],
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    });
    setPosition((prev) => ({ ...prev, x: newX }));
    setTimeout(() => setIsClicked(false), 800);
  };

  // Eye tracking toward mouse
  const mouseNearby = mouseX > -500 && mouseY > -500;
  const eyeOffsetX = mouseNearby
    ? Math.max(-2, Math.min(2, (mouseX - position.x) / 200))
    : 0;
  const eyeOffsetY = mouseNearby
    ? Math.max(-1, Math.min(1, (mouseY - position.y) / 200))
    : 0;

  if (prefersReduced) {
    return (
      <div
        className="pointer-events-auto cursor-pointer"
        style={{
          position: "fixed",
          left: 100,
          bottom: 100,
          zIndex: 41,
        }}
      >
        <FrogSVG throatPulse={false} eyeOffsetX={0} eyeOffsetY={0} crouched={false} />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-auto cursor-pointer"
      style={{
        position: "fixed",
        zIndex: 41,
      }}
      initial={{ x: position.x, y: position.y, opacity: 0 }}
      animate={{ x: position.x, y: position.y, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div animate={controls}>
        <FrogSVG
          throatPulse={!isClicked}
          eyeOffsetX={eyeOffsetX}
          eyeOffsetY={eyeOffsetY}
          crouched={isHovered}
          isJumping={isClicked}
        />
      </motion.div>
    </motion.div>
  );
}

function FrogSVG({
  throatPulse = true,
  eyeOffsetX = 0,
  eyeOffsetY = 0,
  crouched = false,
  isJumping = false,
}: {
  throatPulse?: boolean;
  eyeOffsetX?: number;
  eyeOffsetY?: number;
  crouched?: boolean;
  isJumping?: boolean;
}) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(false);
      setTimeout(() => setBlink(true), 100);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      width={45}
      height={35}
      viewBox="0 0 55 42"
      className="drop-shadow-lg"
    >
      {/* Back legs */}
      <motion.path
        d={
          crouched
            ? "M12,32 Q5,38 3,34 Q1,30 8,28"
            : "M12,32 Q6,36 4,32 Q2,28 8,28"
        }
        fill="#16A34A"
        animate={{
          d: crouched
            ? "M12,32 Q5,38 3,34 Q1,30 8,28"
            : "M12,32 Q6,36 4,32 Q2,28 8,28",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d={
          crouched
            ? "M43,32 Q50,38 52,34 Q54,30 47,28"
            : "M43,32 Q49,36 51,32 Q53,28 47,28"
        }
        fill="#16A34A"
        animate={{
          d: crouched
            ? "M43,32 Q50,38 52,34 Q54,30 47,28"
            : "M43,32 Q49,36 51,32 Q53,28 47,28",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Toe pads on back legs */}
      <circle cx="3" cy="34" r="2" fill="#15803D" />
      <circle cx="52" cy="34" r="2" fill="#15803D" />

      {/* Body */}
      <ellipse cx="27.5" cy="28" rx="16" ry="10" fill="#4ADE80" />

      {/* Spots */}
      <circle cx="20" cy="26" r="2.5" fill="#16A34A" opacity="0.4" />
      <circle cx="32" cy="30" r="2" fill="#16A34A" opacity="0.4" />
      <circle cx="25" cy="32" r="1.5" fill="#16A34A" opacity="0.3" />

      {/* Throat (pulse animation) */}
      <motion.ellipse
        cx="27.5"
        cy="34"
        rx="6"
        ry="3"
        fill="#86EFAC"
        animate={
          throatPulse
            ? {
                ry: [3, 4.5, 3],
                rx: [6, 7, 6],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Front legs */}
      <path d="M16,34 Q12,38 10,36" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M39,34 Q43,38 45,36" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Toe pads front */}
      <circle cx="10" cy="36" r="1.5" fill="#15803D" />
      <circle cx="45" cy="36" r="1.5" fill="#15803D" />

      {/* Eyes - protruding */}
      <circle cx="18" cy="16" r="7" fill="#4ADE80" />
      <circle cx="37" cy="16" r="7" fill="#4ADE80" />

      {/* Eye whites */}
      <circle cx="18" cy="15" r="5" fill="#F0FDF4" />
      <circle cx="37" cy="15" r="5" fill="#F0FDF4" />

      {/* Pupils - track mouse */}
      {blink ? (
        <>
          <motion.circle
            cx={18 + eyeOffsetX}
            cy={15 + eyeOffsetY}
            r="2.5"
            fill="#1a1a1a"
            animate={{
              cx: 18 + eyeOffsetX,
              cy: 15 + eyeOffsetY,
            }}
            transition={{ duration: 0.1 }}
          />
          <motion.circle
            cx={37 + eyeOffsetX}
            cy={15 + eyeOffsetY}
            r="2.5"
            fill="#1a1a1a"
            animate={{
              cx: 37 + eyeOffsetX,
              cy: 15 + eyeOffsetY,
            }}
            transition={{ duration: 0.1 }}
          />
          {/* Eye shine */}
          <circle cx={18.5 + eyeOffsetX} cy={13.5 + eyeOffsetY} r="0.8" fill="white" opacity="0.8" />
          <circle cx={37.5 + eyeOffsetX} cy={13.5 + eyeOffsetY} r="0.8" fill="white" opacity="0.8" />
        </>
      ) : (
        <>
          <path d="M14,15 Q18,17 22,15" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
          <path d="M33,15 Q37,17 41,15" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
        </>
      )}

      {/* Mouth */}
      <path
        d="M19,24 Q27.5,27 36,24"
        stroke="#15803D"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
