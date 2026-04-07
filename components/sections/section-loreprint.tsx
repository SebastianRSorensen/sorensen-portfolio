"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  Package,
  CreditCard,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { StorySection } from "./story-section";
import { Magnetic } from "@/components/magnetic";

const highlightIcons = [Sparkles, Package, CreditCard, Layers];

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

export function SectionLoreprint() {
  const t = useTranslations("loreprint");
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });
  const techRef = useRef(null);
  const techInView = useInView(techRef, { once: true, margin: "-50px" });

  const highlights = [0, 1, 2, 3].map((i) => ({
    title: t(`highlights.${i}.title`),
    description: t(`highlights.${i}.description`),
    Icon: highlightIcons[i],
  }));

  const techItems = t("tech").split(", ");

  return (
    <StorySection id="loreprint" chapter={t("chapter")} title={t("title")}>
      {/* Cinematic lead */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-display text-3xl md:text-5xl lg:text-6xl text-foreground max-w-4xl leading-[1.1] mb-14"
      >
        {t("intro")}
      </motion.p>

      {/* Description */}
      <p className="text-body text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
        {t("description")}
      </p>

      {/* Highlights grid */}
      <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 mb-14">
        {highlights.map((highlight, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={cardsInView ? "visible" : "hidden"}
            className="group relative bg-card/50 border border-border/50 rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 rounded-xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <highlight.Icon className="w-5 h-5 text-accent mb-4" />
              <h3 className="text-heading text-lg text-foreground mb-2">
                {highlight.title}
              </h3>
              <p className="text-body text-sm text-muted-foreground leading-relaxed">
                {highlight.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech badges */}
      <div ref={techRef} className="flex flex-wrap gap-2 mb-14">
        {techItems.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className="px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground text-xs font-mono hover:border-accent/50 hover:text-accent transition-colors duration-300"
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* CTA */}
      <Magnetic strength={0.1}>
        <motion.a
          href={t("link")}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium text-sm group/btn"
        >
          {t("cta")}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </motion.a>
      </Magnetic>
    </StorySection>
  );
}
