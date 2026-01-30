"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Terminal, ArrowUpRight } from "lucide-react";
import { StorySection } from "./story-section";
import { Magnetic } from "@/components/magnetic";

const projectVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function SectionDrive() {
  const t = useTranslations("bygger");
  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true, margin: "-50px" });
  const toolRef = useRef(null);
  const toolInView = useInView(toolRef, { once: true, margin: "-50px" });

  const projects = [
    { name: t("projects.0.name"), desc: t("projects.0.description") },
    { name: t("projects.1.name"), desc: t("projects.1.description") },
    { name: t("projects.2.name"), desc: t("projects.2.description") },
    { name: t("projects.3.name"), desc: t("projects.3.description") },
  ];

  return (
    <StorySection id="bygger" chapter={t("chapter")} title={t("title")}>
      {/* Intro quote - big, cinematic */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-display text-3xl md:text-5xl lg:text-6xl text-foreground max-w-4xl leading-[1.1] mb-14"
      >
        {t("intro")}
      </motion.p>

      <p className="text-body text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
        {t("description")}
      </p>

      {/* Project list - minimalist, elegant */}
      <div ref={listRef} className="mb-16">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={projectVariants}
            initial="hidden"
            animate={listInView ? "visible" : "hidden"}
            className="group border-b border-border/30 py-5 first:border-t"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="text-mono text-xs text-accent/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.name}
                </p>
              </div>
              {project.desc && (
                <p className="text-sm text-muted-foreground hidden md:block max-w-xs text-right">
                  {project.desc}
                </p>
              )}
            </div>
            {project.desc && (
              <p className="text-sm text-muted-foreground mt-1 ml-10 md:hidden">
                {project.desc}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Claude Code highlight - terminal style */}
      <motion.div
        ref={toolRef}
        initial={{ opacity: 0, y: 20 }}
        animate={toolInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-card/50 border border-border/50 rounded-xl p-8 md:p-10 max-w-xl mb-12 group hover:border-accent/30 transition-colors duration-500"
      >
        {/* Terminal dots */}
        <div className="flex items-center gap-1.5 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Terminal className="w-5 h-5 text-accent" />
          <p className="text-mono text-xs text-accent/70 uppercase tracking-[0.2em]">
            {t("tools.title")}
          </p>
        </div>
        <p className="text-heading text-xl text-foreground mb-2">
          {t("tools.highlight")}
        </p>
        <p className="text-body text-muted-foreground">
          {t("tools.description")}
        </p>
      </motion.div>

      {/* GitHub CTA */}
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          {t("github.description")}
        </p>
        <Magnetic strength={0.1}>
          <motion.a
            href="https://github.com/sebastianrosnes"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium text-sm group/btn"
          >
            {t("github.cta")}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </motion.a>
        </Magnetic>
      </div>
    </StorySection>
  );
}
