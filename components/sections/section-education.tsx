"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { StorySection } from "./story-section";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function SectionEducation() {
  const t = useTranslations("kunnskap");
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });

  return (
    <StorySection id="utdanning" chapter={t("chapter")} title={t("title")}>
      <p className="text-mono text-xs text-accent uppercase tracking-wider mb-8">
        {t("subtitle")} — {t("period")}
      </p>

      <motion.div
        ref={cardsRef}
        variants={staggerContainer}
        initial="initial"
        animate={cardsInView ? "animate" : "initial"}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Bachelor */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4"
        >
          <h3 className="text-heading text-lg text-foreground">{t("bachelor.title")}</h3>
          <p className="text-mono text-xs text-muted-foreground">{t("bachelor.period")}</p>
          <p className="text-body text-sm text-muted-foreground leading-relaxed">
            {t("bachelor.description")}
          </p>
        </motion.div>

        {/* Master */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4"
        >
          <h3 className="text-heading text-lg text-foreground">{t("master.title")}</h3>
          <p className="text-mono text-xs text-muted-foreground">{t("master.period")}</p>
          <p className="text-body text-sm text-muted-foreground leading-relaxed">
            {t("master.description")}
          </p>
        </motion.div>
      </motion.div>
    </StorySection>
  );
}
