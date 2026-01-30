"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { easings } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StorySectionProps {
  id: string;
  chapter: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function StorySection({
  id,
  chapter,
  title,
  children,
  className,
}: StorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Parallax effect for the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative py-28 md:py-40 overflow-hidden", className)}
    >
      {/* Section divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: easings.dramatic }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-left"
      />

      <motion.div style={{ opacity: contentOpacity }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Chapter number with line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: easings.smooth }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase">
              {chapter}
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: easings.smooth,
              }}
              className="h-px w-12 bg-accent/40 origin-left"
            />
          </motion.div>

          {/* Title with clip-path reveal */}
          <div className="relative mb-14 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      clipPath: "inset(0 0 0% 0)",
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: easings.dramatic,
              }}
              className="text-display text-5xl md:text-7xl lg:text-8xl text-foreground"
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: easings.dramatic,
              }}
              className="h-[2px] bg-accent origin-left mt-3 max-w-[160px]"
            />
          </div>

          {/* Section content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: easings.smooth }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
