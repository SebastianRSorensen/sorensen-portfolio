"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useJungleMode } from "@/lib/jungle-mode";

export function JungleToggle() {
  const { isJungle, toggleJungle, isTransitioning } = useJungleMode();

  return (
    <button
      onClick={toggleJungle}
      disabled={isTransitioning}
      className="relative w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 group"
      aria-label={isJungle ? "Switch to dark mode" : "Switch to jungle mode"}
      title={isJungle ? "Dark mode" : "Jungle mode"}
    >
      <AnimatePresence mode="wait">
        {isJungle ? (
          <motion.svg
            key="jungle"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Leaf icon - filled when active */}
            <motion.path
              d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"
              fill="currentColor"
              className="text-accent"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="dark"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Leaf icon - outline when inactive */}
            <motion.path
              d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="group-hover:stroke-accent transition-colors duration-300"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Glow effect when jungle mode is active */}
      {isJungle && (
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </button>
  );
}
