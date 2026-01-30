"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  useScrollTracker,
  useWindowSize,
  useReducedMotion,
} from "@/lib/jungle-hooks";

export function Parrot() {
  const controls = useAnimation();
  const { scrollY, scrollDirection, scrollVelocity } = useScrollTracker();
  const { width, height } = useWindowSize();
  const prefersReduced = useReducedMotion();
  const [isPerched, setIsPerched] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [perchPosition, setPerchPosition] = useState({ x: 80, y: 200 });
  const lastFlyRef = useRef(0);

  // Fly across screen on fast scroll
  useEffect(() => {
    if (prefersReduced) return;
    const now = Date.now();
    if (scrollVelocity > 2 && now - lastFlyRef.current > 5000) {
      lastFlyRef.current = now;
      setIsPerched(false);

      const startX = -80;
      const endX = width + 80;
      const flyY = Math.random() * (height * 0.5) + 100;

      controls
        .start({
          x: [startX, endX],
          y: [flyY, flyY - 50, flyY + 30, flyY],
          rotate: [0, -5, 5, 0],
          transition: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] },
        })
        .then(() => {
          setIsPerched(true);
          // New perch position
          setPerchPosition({
            x: width > 768 ? 60 + Math.random() * 40 : 20 + Math.random() * 30,
            y: 150 + Math.random() * 200,
          });
        });
    }
  }, [scrollVelocity, width, height, controls, prefersReduced]);

  const handleClick = () => {
    if (isClicked || !isPerched) return;
    setIsClicked(true);
    controls.start({
      scale: [1, 1.2, 1],
      rotate: [0, -15, 15, 0],
      transition: { duration: 0.5 },
    });
    setTimeout(() => setIsClicked(false), 600);
  };

  if (prefersReduced) {
    return (
      <div
        className="pointer-events-auto cursor-pointer"
        style={{
          position: "fixed",
          left: 60,
          top: 200,
          zIndex: 41,
        }}
      >
        <ParrotSVG wingFlap={false} headTilt={0} mouthOpen={false} />
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
      animate={
        isPerched
          ? {
              x: perchPosition.x,
              y: perchPosition.y,
              rotate: 0,
              scale: 1,
            }
          : undefined
      }
      transition={
        isPerched
          ? { type: "spring", stiffness: 80, damping: 15 }
          : undefined
      }
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div animate={controls}>
        <motion.div
          animate={
            isPerched
              ? {
                  y: [0, -2, 0],
                  rotate: [0, 1, -1, 0],
                }
              : {}
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ParrotSVG
            wingFlap={!isPerched || isClicked}
            headTilt={isHovered ? 15 : scrollDirection === "down" ? 5 : -5}
            mouthOpen={isClicked}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ParrotSVG({
  wingFlap = false,
  headTilt = 0,
  mouthOpen = false,
}: {
  wingFlap?: boolean;
  headTilt?: number;
  mouthOpen?: boolean;
}) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(false);
      setTimeout(() => setBlink(true), 120);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      width={50}
      height={65}
      viewBox="0 0 60 80"
      className="drop-shadow-lg"
    >
      {/* Tail feathers */}
      <path
        d="M25,58 Q22,70 18,78"
        stroke="#EF4444"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30,58 Q28,70 26,78"
        stroke="#3B82F6"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M35,58 Q34,70 34,78"
        stroke="#22C55E"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Body */}
      <ellipse cx="30" cy="40" rx="14" ry="20" fill="#22C55E" />

      {/* Belly */}
      <ellipse cx="30" cy="45" rx="9" ry="12" fill="#86EFAC" />

      {/* Wing */}
      <motion.path
        d="M16,30 Q6,42 14,56 Q20,50 18,35"
        fill="#15803D"
        animate={
          wingFlap
            ? {
                d: [
                  "M16,30 Q6,42 14,56 Q20,50 18,35",
                  "M16,30 Q-2,35 8,50 Q18,48 18,35",
                  "M16,30 Q6,42 14,56 Q20,50 18,35",
                ],
              }
            : {
                d: "M16,30 Q6,42 14,56 Q20,50 18,35",
              }
        }
        transition={{
          duration: wingFlap ? 0.3 : 0.5,
          repeat: wingFlap ? 3 : 0,
          ease: "easeInOut",
        }}
      />

      {/* Head */}
      <motion.g
        animate={{ rotate: headTilt }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "30px 16px" }}
      >
        <circle cx="30" cy="16" r="11" fill="#22C55E" />

        {/* Eye ring */}
        <circle cx="36" cy="14" r="5" fill="white" />

        {/* Eye */}
        {blink ? (
          <>
            <circle cx="37" cy="14" r="2.5" fill="#1a1a1a" />
            <circle cx="37.5" cy="13" r="0.8" fill="white" opacity="0.8" />
          </>
        ) : (
          <path
            d="M34,14 Q37,15 40,14"
            stroke="#1a1a1a"
            strokeWidth="1.5"
            fill="none"
          />
        )}

        {/* Beak */}
        <motion.g
          animate={mouthOpen ? { rotate: 10 } : { rotate: 0 }}
          transition={{ duration: 0.15 }}
          style={{ transformOrigin: "40px 18px" }}
        >
          <path d="M40,16 L50,18 L40,21" fill="#F59E0B" />
          <path d="M40,18 L48,19 L40,21" fill="#D97706" />
        </motion.g>
      </motion.g>

      {/* Feet */}
      <path
        d="M24,58 Q22,62 19,60"
        stroke="#D97706"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M36,58 Q38,62 41,60"
        stroke="#D97706"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
