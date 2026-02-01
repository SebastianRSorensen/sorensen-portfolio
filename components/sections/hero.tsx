"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HeroName } from "./hero-name";
import { ParticleField } from "@/components/particle-field";
import { easings } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("hero");
  const [nameComplete, setNameComplete] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Portrait — cinematic background element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={nameComplete ? { opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: easings.dramatic, delay: 0.2 }}
        className="absolute inset-0 md:left-auto md:right-0 md:w-[60%] z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/images/portrait.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-top opacity-15 grayscale md:opacity-25"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 25%, black 65%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 25%, black 65%, transparent 100%)",
          }}
        />
        {/* Desktop: horizontal mask via overlay */}
        <div className="hidden md:block absolute left-0 top-0 h-full w-2/5 bg-linear-to-r from-background to-transparent" />
        <div className="hidden md:block absolute right-0 top-0 h-full w-1/4 bg-linear-to-l from-background to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 w-full h-1/5 bg-linear-to-b from-background to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-background to-transparent" />
      </motion.div>

      {/* Particle field background */}
      <div className="absolute inset-0 z-[1]">
        <ParticleField
          particleCount={100}
          connectionDistance={130}
          mouseRadius={160}
          color="59, 130, 246"
          maxOpacity={0.5}
        />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-[3] max-w-7xl mx-auto w-full px-6 md:px-8">
        {/* Name */}
        <HeroName onComplete={() => setNameComplete(true)} />

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={nameComplete ? { scaleX: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            ease: easings.dramatic,
          }}
          className="h-[2px] bg-accent origin-left mt-5 md:mt-7 max-w-[200px]"
        />

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={nameComplete ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: easings.smooth,
          }}
          className="mt-6 inline-flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-mono text-sm text-accent tracking-wider uppercase">
            {t("title")}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={nameComplete ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.4,
            duration: 0.7,
            ease: easings.smooth,
          }}
          className="text-display text-2xl md:text-4xl text-foreground/90 mt-4 max-w-2xl leading-snug"
        >
          {t("tagline")}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={nameComplete ? { opacity: 1 } : {}}
          transition={{
            delay: 0.7,
            duration: 0.5,
          }}
          className="text-mono text-xs text-muted-foreground mt-4 tracking-wider"
        >
          {t("location")}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={nameComplete ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3"
      >
        <span className="text-mono text-[10px] text-muted-foreground/60 tracking-[0.2em] uppercase">
          {t("scrollHint")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[1px] h-8 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
