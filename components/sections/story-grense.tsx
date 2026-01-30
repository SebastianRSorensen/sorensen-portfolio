"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { StorySection } from "./story-section";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function StoryGrense() {
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
      <p className="text-mono text-xs text-accent uppercase tracking-wider mb-10">
        {t("subtitle")}
      </p>

      <motion.div
        ref={cardsRef}
        variants={staggerContainer}
        initial="initial"
        animate={cardsInView ? "animate" : "initial"}
        className="space-y-6"
      >
        {/* Home nursing — most recent */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-heading text-xl text-foreground">{t("nursing.role")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("nursing.company")}</p>
            </div>
            <p className="text-mono text-xs text-muted-foreground">{t("nursing.period")}</p>
          </div>
          <p className="text-body text-sm text-muted-foreground leading-relaxed">
            {t("nursing.description")}
          </p>
        </motion.div>

        {/* Coop */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-heading text-xl text-foreground">{t("coop.role")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("coop.company")}</p>
            </div>
            <p className="text-mono text-xs text-muted-foreground">{t("coop.period")}</p>
          </div>
          <p className="text-body text-sm text-muted-foreground leading-relaxed">
            {t("coop.description")}
          </p>
        </motion.div>

        {/* Military */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-heading text-xl text-foreground">{t("military.role")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("military.unit")}</p>
            </div>
            <p className="text-mono text-xs text-muted-foreground">{t("military.period")}</p>
          </div>
          <p className="text-body text-sm text-muted-foreground leading-relaxed mb-4">
            {t("military.description")}
          </p>
          <div className="space-y-2">
            {highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="text-accent mt-0.5 text-sm">—</span>
                <p className="text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </StorySection>
  );
}
