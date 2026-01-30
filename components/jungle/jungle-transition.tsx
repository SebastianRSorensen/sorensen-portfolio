"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useJungleMode } from "@/lib/jungle-mode";
import { useEffect, useState } from "react";

export function JungleTransition() {
  const { isTransitioning, isJungle } = useJungleMode();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShowOverlay(true);
      const timer = setTimeout(() => setShowOverlay(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Radial wipe from center */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: isJungle
                ? "radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(7,26,14,0.6) 50%, transparent 70%)"
                : "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(10,15,20,0.5) 50%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Leaf burst particles */}
          {isJungle &&
            Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 12) * 400,
                  y: Math.sin((i * Math.PI * 2) / 12) * 400,
                  rotate: Math.random() * 360,
                  scale: [0, 1, 0.5],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"
                    fill={`hsl(${120 + i * 10}, 60%, ${40 + i * 3}%)`}
                    opacity="0.7"
                  />
                </svg>
              </motion.div>
            ))}

          {/* Star burst for dark mode return */}
          {!isJungle &&
            Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-accent"
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 8) * 300,
                  y: Math.sin((i * Math.PI * 2) / 8) * 300,
                  scale: [0, 3, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
