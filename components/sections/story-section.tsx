"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easings } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StorySectionProps {
  id: string;
  chapter: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function StorySection({ id, chapter, title, children, className }: StorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("min-h-screen py-24 md:py-32", className)}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Chapter number */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: easings.smooth }}
          className="text-accent font-mono text-sm block mb-4"
        >
          {chapter}
        </motion.span>

        {/* Title with underline */}
        <div className="relative inline-block mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: easings.smooth }}
            className="text-display text-4xl md:text-6xl text-foreground"
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: easings.smooth }}
            className="absolute -bottom-2 left-0 h-0.5 w-full bg-accent origin-left"
          />
        </div>

        {/* Section content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: easings.smooth }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
