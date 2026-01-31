"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  angle: number;
  size: number;
  duration: number;
}

export function ShootingStars() {
  const prefersReducedMotion = useReducedMotion();
  const [stars, setStars] = useState<Star[]>([]);
  const [isMobile, setIsMobile] = useState(true);
  const idRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const delay = 6000 + Math.random() * 14000;
      timeoutId = setTimeout(() => {
        const star: Star = {
          id: idRef.current++,
          x: 10 + Math.random() * 70,
          y: Math.random() * 40,
          angle: 15 + Math.random() * 35,
          size: 50 + Math.random() * 90,
          duration: 0.5 + Math.random() * 0.7,
        };

        setStars((prev) => [...prev, star]);

        setTimeout(() => {
          setStars((prev) => prev.filter((s) => s.id !== star.id));
        }, star.duration * 1000 + 600);

        spawn();
      }, delay);
    };

    spawn();
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion, isMobile]);

  if (prefersReducedMotion || isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 5 }}
    >
      <AnimatePresence>
        {stars.map((star) => {
          const travelX =
            Math.cos((star.angle * Math.PI) / 180) * (star.size * 3);
          const travelY =
            Math.sin((star.angle * Math.PI) / 180) * (star.size * 3);

          return (
            <motion.div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.x}vw`,
                top: `${star.y}vh`,
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.8, 0.8, 0],
                x: travelX,
                y: travelY,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: star.duration, ease: "easeIn" }}
            >
              <svg
                viewBox="0 0 120 4"
                width={star.size}
                height={Math.max(4, star.size * 0.04)}
                style={{ transform: `rotate(${star.angle}deg)` }}
              >
                <defs>
                  <linearGradient
                    id={`trail-${star.id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#e8e4df" stopOpacity={0} />
                    <stop offset="50%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <line
                  x1="0"
                  y1="2"
                  x2="114"
                  y2="2"
                  stroke={`url(#trail-${star.id})`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="117" cy="2" r="2" fill="#ffffff" opacity={0.85} />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
