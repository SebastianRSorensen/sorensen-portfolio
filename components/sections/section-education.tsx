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

export function SectionEducation() {
  const t = useTranslations("kunnskap");
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });

  return (
    <StorySection id="utdanning" chapter={t("chapter")} title={t("title")}>
      <p className="text-mono text-xs text-accent uppercase tracking-[0.2em] mb-10">
        {t("subtitle")} — {t("period")}
      </p>

      <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
        {/* Bachelor */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="group relative bg-card/50 border border-border/50 rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors duration-500"
        >
          <div className="absolute inset-0 rounded-xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative space-y-4">
            <h3 className="text-heading text-xl text-foreground">
              {t("bachelor.title")}
            </h3>
            <p className="text-mono text-xs text-accent tracking-wider">
              {t("bachelor.period")}
            </p>
            <p className="text-body text-muted-foreground leading-relaxed">
              {t("bachelor.description")}
            </p>
          </div>
        </motion.div>

        {/* Master */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="group relative bg-card/50 border border-border/50 rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors duration-500"
        >
          <div className="absolute inset-0 rounded-xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative space-y-4">
            <h3 className="text-heading text-xl text-foreground">
              {t("master.title")}
            </h3>
            <p className="text-mono text-xs text-accent tracking-wider">
              {t("master.period")}
            </p>
            <p className="text-body text-muted-foreground leading-relaxed">
              {t("master.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </StorySection>
  );
}
