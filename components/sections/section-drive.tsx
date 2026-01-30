"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Terminal } from "lucide-react";
import { StorySection } from "./story-section";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function SectionDrive() {
  const t = useTranslations("bygger");
  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true, margin: "-50px" });

  const projects = [
    { name: t("projects.0.name"), desc: t("projects.0.description") },
    { name: t("projects.1.name"), desc: t("projects.1.description") },
    { name: t("projects.2.name"), desc: t("projects.2.description") },
    { name: t("projects.3.name"), desc: t("projects.3.description") },
  ];

  return (
    <StorySection id="bygger" chapter={t("chapter")} title={t("title")}>
      {/* Intro quote */}
      <p className="text-display text-2xl md:text-4xl text-foreground max-w-3xl leading-tight mb-12">
        {t("intro")}
      </p>

      <p className="text-body text-muted-foreground max-w-2xl mb-12 leading-relaxed">
        {t("description")}
      </p>

      {/* Project list */}
      <motion.div
        ref={listRef}
        variants={staggerContainer}
        initial="initial"
        animate={listInView ? "animate" : "initial"}
        className="space-y-4 mb-12"
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex items-start gap-3"
          >
            <span className="text-accent mt-1">—</span>
            <div>
              <p className="text-foreground font-medium">{project.name}</p>
              {project.desc && (
                <p className="text-sm text-muted-foreground mt-0.5">{project.desc}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Claude Code highlight */}
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 max-w-lg mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Terminal className="w-5 h-5 text-accent" />
          <p className="text-mono text-xs text-accent uppercase tracking-wider">
            {t("tools.title")}
          </p>
        </div>
        <p className="text-heading text-foreground mb-2">{t("tools.highlight")}</p>
        <p className="text-body text-sm text-muted-foreground">{t("tools.description")}</p>
      </div>

      {/* GitHub CTA */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">{t("github.description")}</p>
        <motion.a
          href="https://github.com/sebastianrosnes"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm"
        >
          {t("github.cta")}
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </StorySection>
  );
}
