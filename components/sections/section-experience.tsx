"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { StorySection } from "./story-section";
import { Magnetic } from "@/components/magnetic";

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

export function SectionExperience() {
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
      <p className="text-mono text-xs text-accent uppercase tracking-[0.2em] mb-10">
        {t("subtitle")}
      </p>

      <div ref={cardsRef} className="space-y-8">
        {/* Stacc */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="group relative bg-card/50 border border-border/50 rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors duration-500"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-heading text-2xl text-foreground">
                  {t("stacc.company")}
                </h3>
                <p className="text-base text-muted-foreground mt-1">
                  {t("stacc.role")}
                </p>
              </div>
              <div className="md:text-right shrink-0">
                <p className="text-mono text-xs text-accent tracking-wider">
                  {t("stacc.period")}
                </p>
                <p className="text-mono text-xs text-muted-foreground mt-1">
                  {t("stacc.location")}
                </p>
              </div>
            </div>
            <p className="text-body text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              {t("stacc.description")}
            </p>
            <div className="flex flex-wrap gap-2">
              {staccHighlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground text-xs font-mono hover:border-accent/50 hover:text-accent transition-colors duration-300"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Rosengrip */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="group relative bg-card/50 border border-border/50 rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors duration-500"
        >
          <div className="absolute inset-0 rounded-xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-heading text-2xl text-foreground">
                  {t("rosengrip.company")}
                </h3>
                <p className="text-base text-muted-foreground mt-1">
                  {t("rosengrip.role")}
                </p>
              </div>
              <div className="md:text-right shrink-0">
                <p className="text-mono text-xs text-accent tracking-wider">
                  {t("rosengrip.period")}
                </p>
                <p className="text-mono text-xs text-muted-foreground mt-1">
                  {t("rosengrip.location")}
                </p>
              </div>
            </div>
            <p className="text-body text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              {t("rosengrip.description")}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {rosengripHighlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground text-xs font-mono hover:border-accent/50 hover:text-accent transition-colors duration-300"
                >
                  {h}
                </span>
              ))}
            </div>
            <Magnetic strength={0.15}>
              <a
                href={t("rosengrip.link")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors group/link"
              >
                {t("rosengrip.linkText")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </StorySection>
  );
}
