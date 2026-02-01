"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { easings, ufoTimings } from "@/lib/animations";
import { useUFOOptional } from "@/lib/ufo-context";
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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const ufo = useUFOOptional();
  const ufoEnabled = ufo?.isEnabled ?? false;

  // Sentinel ref in normal document flow for reliable useInView detection
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sentinelRef, {
    once: true,
    margin: "-60px",
  });

  // Should we use UFO mode? (desktop + motion enabled + context available)
  const useUFOMode = ufoEnabled && ufo !== null;

  // Permanent reveal state — once illuminated, stays true forever
  const [revealed, setRevealed] = useState(false);

  // Use ref for illuminated to avoid stale closure in MotionValue callback
  const illuminatedRef = useRef(false);
  const revealedRef = useRef(false);

  // Register with UFO context
  useEffect(() => {
    if (!ufo) return;
    ufo.registerSection(id, { sectionRef, titleRef });
    return () => ufo.unregisterSection(id);
  }, [ufo, id]);

  // Track activeSection in a ref so the beam callback always has current value
  const activeSectionRef = useRef(ufo?.activeSection);
  useEffect(() => {
    activeSectionRef.current = ufo?.activeSection;
  });

  // Subscribe to beam intensity — when beam hits this section, reveal permanently
  useEffect(() => {
    if (!ufo || !useUFOMode) return;

    const unsubscribe = ufo.beamIntensityMV.on("change", (intensity) => {
      const isActive = activeSectionRef.current === id;

      if (isActive && intensity > 0.3 && !revealedRef.current) {
        revealedRef.current = true;
        illuminatedRef.current = true;
        setRevealed(true);
      }
    });

    return () => unsubscribe();
  }, [ufo, useUFOMode, id]);

  // Warp reveal: instantly show non-target sections when warp signal fires
  useEffect(() => {
    if (!ufo || !useUFOMode) return;
    if (ufo.warpRevealSignal === 0) return;

    // If this section is NOT the warp target, reveal it instantly
    if (ufo.warpTargetSection !== id && !revealedRef.current) {
      revealedRef.current = true;
      illuminatedRef.current = true;
      setRevealed(true);
    }
  }, [ufo?.warpRevealSignal, ufo?.warpTargetSection, ufo, useUFOMode, id]);

  // Parallax effect for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.3, 1, 1, 0.3]
  );

  // In UFO mode: title/chapter/underline shown once revealed by beam (permanent)
  // In fallback mode: everything uses useInView
  // Content always uses useInView
  const showTitle = useUFOMode ? revealed : isSectionInView;
  const showContent = useUFOMode ? revealed || isSectionInView : isSectionInView;

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("relative py-28 md:py-40 overflow-hidden", className)}
    >
      {/* Invisible sentinel in normal flow for useInView detection */}
      <div ref={sentinelRef} className="absolute top-20 left-0 w-px h-px" aria-hidden />

      {/* Section divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isSectionInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: easings.dramatic }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-left"
      />

      <motion.div style={{ opacity: contentOpacity }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Chapter number with line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={showTitle ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: easings.smooth,
            }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase">
              {chapter}
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={showTitle ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: easings.smooth,
              }}
              className="h-px w-12 bg-accent/40 origin-left"
            />
          </motion.div>

          {/* Title with UFO spotlight reveal or fallback clip-path */}
          <div className="relative mb-14 md:mb-20">
            {/* Invisible placeholder to prevent layout shift */}
            <div
              className="text-display text-5xl md:text-7xl lg:text-8xl text-foreground invisible"
              aria-hidden
            >
              {title}
            </div>

            {/* Real title — absolutely positioned over placeholder */}
            <motion.h2
              ref={titleRef}
              initial={
                useUFOMode
                  ? { opacity: 0, filter: "blur(8px)", y: 10, clipPath: "none" }
                  : { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }
              }
              animate={
                showTitle
                  ? useUFOMode
                    ? { opacity: 1, filter: "blur(0px)", y: 0, clipPath: "none" }
                    : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
                  : {}
              }
              transition={{
                duration: useUFOMode
                  ? ufoTimings.titleRevealDuration
                  : 0.8,
                delay: useUFOMode ? 0 : 0.2,
                ease: easings.dramatic,
              }}
              className="absolute top-0 left-0 text-display text-5xl md:text-7xl lg:text-8xl text-foreground"
            >
              {title}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={showTitle ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: useUFOMode ? 0.15 : 0.6,
                ease: easings.dramatic,
              }}
              className="h-[2px] bg-accent origin-left mt-3 max-w-[160px]"
            />
          </div>

          {/* Section content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: easings.smooth }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
