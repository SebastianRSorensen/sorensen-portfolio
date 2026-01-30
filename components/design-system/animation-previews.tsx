"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easings } from "@/lib/animations";
import { RotateCcw } from "lucide-react";

function AnimationDemo({
  label,
  children,
}: {
  label: string;
  children: (key: number) => React.ReactNode;
}) {
  const [key, setKey] = useState(0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-mono text-xs text-accent uppercase tracking-wider">{label}</span>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      <div className="min-h-[60px] flex items-center">
        <AnimatePresence mode="wait">{children(key)}</AnimatePresence>
      </div>
    </div>
  );
}

export function AnimationPreviews() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Fade Up */}
      <AnimationDemo label="Fade Up">
        {(key) => (
          <motion.p
            key={key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            className="text-foreground text-lg"
          >
            Content fades up
          </motion.p>
        )}
      </AnimationDemo>

      {/* Fade In */}
      <AnimationDemo label="Fade In">
        {(key) => (
          <motion.p
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-foreground text-lg"
          >
            Content fades in
          </motion.p>
        )}
      </AnimationDemo>

      {/* Slide In Left */}
      <AnimationDemo label="Slide In Left">
        {(key) => (
          <motion.p
            key={key}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            className="text-foreground text-lg"
          >
            Slides from left
          </motion.p>
        )}
      </AnimationDemo>

      {/* Slide In Right */}
      <AnimationDemo label="Slide In Right">
        {(key) => (
          <motion.p
            key={key}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            className="text-foreground text-lg"
          >
            Slides from right
          </motion.p>
        )}
      </AnimationDemo>

      {/* Scale Up */}
      <AnimationDemo label="Scale Up">
        {(key) => (
          <motion.p
            key={key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easings.smooth }}
            className="text-foreground text-lg"
          >
            Scales up
          </motion.p>
        )}
      </AnimationDemo>

      {/* Stagger Container */}
      <AnimationDemo label="Stagger Children">
        {(key) => (
          <motion.div
            key={key}
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="flex gap-2"
          >
            {["One", "Two", "Three", "Four"].map((word) => (
              <motion.span
                key={word}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: easings.smooth },
                  },
                }}
                className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-mono"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimationDemo>

      {/* Letter by Letter */}
      <AnimationDemo label="Letter Reveal">
        {(key) => (
          <div key={key} className="text-display text-4xl text-foreground">
            {"SEBASTIAN".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.5,
                  ease: easings.smooth,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        )}
      </AnimationDemo>

      {/* Underline Draw */}
      <AnimationDemo label="Underline Draw">
        {(key) => (
          <div key={key} className="relative inline-block">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-display text-3xl text-foreground"
            >
              GRENSE
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easings.smooth }}
              className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent origin-left"
            />
          </div>
        )}
      </AnimationDemo>
    </div>
  );
}
