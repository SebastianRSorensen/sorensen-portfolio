"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { StorySection } from "./story-section";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function StoryKode() {
  const t = useTranslations("kode");
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });

  const staccHighlights = [
    t("stacc.highlights.0"),
    t("stacc.highlights.1"),
    t("stacc.highlights.2"),
  ];

  const rosengripHighlights = [
    t("rosengrip.highlights.0"),
    t("rosengrip.highlights.1"),
    t("rosengrip.highlights.2"),
  ];

  return (
    <StorySection id="kode" chapter={t("chapter")} title={t("title")}>
      <p className="text-mono text-xs text-accent uppercase tracking-wider mb-8">
        {t("subtitle")}
      </p>

      <motion.div
        ref={cardsRef}
        variants={staggerContainer}
        initial="initial"
        animate={cardsInView ? "animate" : "initial"}
        className="space-y-6"
      >
        {/* Stacc */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-heading text-xl text-foreground">{t("stacc.company")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("stacc.role")}</p>
            </div>
            <div className="text-right">
              <p className="text-mono text-xs text-muted-foreground">{t("stacc.period")}</p>
              <p className="text-mono text-xs text-muted-foreground">{t("stacc.location")}</p>
            </div>
          </div>
          <p className="text-body text-sm text-muted-foreground leading-relaxed mb-4">
            {t("stacc.description")}
          </p>
          <div className="flex flex-wrap gap-2">
            {staccHighlights.map((h, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-mono"
              >
                {h}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Rosengrip */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-heading text-xl text-foreground">{t("rosengrip.company")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("rosengrip.role")}</p>
            </div>
            <div className="text-right">
              <p className="text-mono text-xs text-muted-foreground">{t("rosengrip.period")}</p>
              <p className="text-mono text-xs text-muted-foreground">{t("rosengrip.location")}</p>
            </div>
          </div>
          <p className="text-body text-sm text-muted-foreground leading-relaxed mb-4">
            {t("rosengrip.description")}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {rosengripHighlights.map((h, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-mono"
              >
                {h}
              </span>
            ))}
          </div>
          <a
            href={t("rosengrip.link")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
          >
            {t("rosengrip.linkText")}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Previous experience */}
        <div className="pt-8">
          <p className="text-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
            {t("previousTitle")}
          </p>
          <div className="text-sm text-muted-foreground">
            <p>
              <span className="text-foreground">{t("previous.company")}</span>
              {" — "}
              {t("previous.role")}
            </p>
            <p className="text-mono text-xs mt-1">{t("previous.period")}</p>
            <p className="mt-2">{t("previous.description")}</p>
          </div>
        </div>
      </motion.div>
    </StorySection>
  );
}
