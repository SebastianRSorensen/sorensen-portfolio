"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { StorySection } from "./story-section";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function SectionOtherExperience() {
  const t = useTranslations("grense");
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });

  const highlights = [
    t("highlights.0"),
    t("highlights.1"),
    t("highlights.2"),
  ];

  return (
    <StorySection id="grense" chapter={t("chapter")} title={t("title")}>
      <p className="text-mono text-xs text-accent/70 uppercase tracking-[0.2em] mb-10">
        {t("subtitle")}
      </p>

      <div ref={cardsRef} className="space-y-8">
        {/* Home nursing */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="group relative bg-card/50 border border-border/50 rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors duration-500"
        >
          <div className="absolute inset-0 rounded-xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-heading text-xl text-foreground">
                  {t("nursing.role")}
                </h3>
                <p className="text-base text-muted-foreground mt-1">
                  {t("nursing.company")}
                </p>
              </div>
              <p className="text-mono text-xs text-accent/70 tracking-wider shrink-0">
                {t("nursing.period")}
              </p>
            </div>
            <p className="text-body text-muted-foreground leading-relaxed">
              {t("nursing.description")}
            </p>
          </div>
        </motion.div>

        {/* Coop */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="group relative bg-card/50 border border-border/50 rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors duration-500"
        >
          <div className="absolute inset-0 rounded-xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-heading text-xl text-foreground">
                  {t("coop.role")}
                </h3>
                <p className="text-base text-muted-foreground mt-1">
                  {t("coop.company")}
                </p>
              </div>
              <p className="text-mono text-xs text-accent/70 tracking-wider shrink-0">
                {t("coop.period")}
              </p>
            </div>
            <p className="text-body text-muted-foreground leading-relaxed">
              {t("coop.description")}
            </p>
          </div>
        </motion.div>

        {/* Military — the standout card */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="group relative bg-card/50 border border-accent/20 rounded-xl p-8 md:p-10 hover:border-accent/40 transition-colors duration-500"
        >
          {/* Subtle accent glow */}
          <div className="absolute inset-0 rounded-xl bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" />

          <div className="relative pl-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-heading text-2xl text-foreground">
                  {t("military.role")}
                </h3>
                <p className="text-base text-muted-foreground mt-1">
                  {t("military.unit")}
                </p>
              </div>
              <p className="text-mono text-xs text-accent/70 tracking-wider shrink-0">
                {t("military.period")}
              </p>
            </div>
            <p className="text-body text-muted-foreground leading-relaxed mb-6">
              {t("military.description")}
            </p>
            <div className="space-y-3">
              {highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.6 + i * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="text-accent mt-0.5 text-sm">—</span>
                  <p className="text-sm text-foreground/80">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </StorySection>
  );
}
