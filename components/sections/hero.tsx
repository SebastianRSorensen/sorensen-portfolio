"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { HeroName, getTotalLetterCount } from "./hero-name";
import { easings } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("hero");
  const totalLetters = getTotalLetterCount();
  const nameAnimDuration = totalLetters * 0.04 + 0.5;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Name */}
        <HeroName />

        {/* Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: nameAnimDuration,
            duration: 0.6,
            ease: easings.smooth,
          }}
          className="h-[2px] bg-accent origin-left mt-4 md:mt-6 max-w-xs"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: nameAnimDuration + 0.3,
            duration: 0.6,
            ease: easings.smooth,
          }}
          className="text-body text-lg md:text-xl text-muted-foreground mt-6 max-w-lg"
        >
          {t("tagline")}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: nameAnimDuration + 0.6,
            duration: 0.5,
          }}
          className="text-mono text-sm text-muted-foreground mt-3"
        >
          {t("location")}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: nameAnimDuration + 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-mono text-xs text-muted-foreground">{t("scrollHint")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
