"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { easings } from "@/lib/animations";
import { StorySection } from "./story-section";

const categoryKeys = [
  "frontend",
  "backend",
  "cloud",
  "devops",
  "testing",
  "tools",
] as const;

const categoryColors: Record<string, string> = {
  frontend: "59, 130, 246", // blue
  backend: "34, 197, 94", // green
  cloud: "168, 85, 247", // purple
  devops: "249, 115, 22", // orange
  testing: "236, 72, 153", // pink
  tools: "14, 165, 233", // sky
};

export function TechStack() {
  const t = useTranslations("techStack");
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = categoryKeys.map((key) => ({
    key,
    title: t(`${key}.title`),
    items: t(`${key}.items`).split(", "),
    color: categoryColors[key],
  }));

  return (
    <StorySection id="tech-stack" chapter="03" title={t("title")}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-mono text-xs text-accent uppercase tracking-[0.2em] mb-12"
      >
        {t("subtitle")}
      </motion.p>

      {/* Category filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6, ease: easings.smooth }}
        className="flex flex-wrap gap-2 mb-12"
      >
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
            activeCategory === null
              ? "bg-accent text-accent-foreground"
              : "border border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/30"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() =>
              setActiveCategory(
                activeCategory === cat.key ? null : cat.key
              )
            }
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
              activeCategory === cat.key
                ? "text-white"
                : "border border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/30"
            }`}
            style={
              activeCategory === cat.key
                ? { backgroundColor: `rgba(${cat.color}, 0.8)` }
                : {}
            }
          >
            {cat.title}
          </button>
        ))}
      </motion.div>

      {/* Tech grid */}
      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={gridInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {categories
            .filter(
              (cat) =>
                activeCategory === null || activeCategory === cat.key
            )
            .map((cat, catIdx) => (
              <motion.div
                key={cat.key}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: catIdx * 0.05,
                  ease: easings.smooth,
                }}
                className="group"
              >
                <div className="relative bg-card/30 border border-border/30 rounded-xl p-6 hover:border-border/60 transition-colors duration-500">
                  {/* Category color indicator */}
                  <div
                    className="absolute top-6 left-6 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: `rgba(${cat.color}, 0.7)`,
                      boxShadow: `0 0 10px rgba(${cat.color}, 0.3)`,
                    }}
                  />
                  <p className="text-mono text-xs text-muted-foreground uppercase tracking-[0.15em] mb-5 ml-5">
                    {cat.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.5 + i * 0.05,
                          duration: 0.4,
                        }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                        className="px-3 py-1.5 rounded-lg border text-sm font-mono cursor-default transition-all duration-300"
                        style={
                          {
                            borderColor: `rgba(${cat.color}, 0.15)`,
                            color: `rgb(${cat.color})`,
                            "--hover-bg": `rgba(${cat.color}, 0.1)`,
                          } as React.CSSProperties
                        }
                        onMouseEnter={(e) => {
                          (
                            e.target as HTMLElement
                          ).style.backgroundColor = `rgba(${cat.color}, 0.1)`;
                          (
                            e.target as HTMLElement
                          ).style.borderColor = `rgba(${cat.color}, 0.4)`;
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.target as HTMLElement
                          ).style.backgroundColor = "transparent";
                          (
                            e.target as HTMLElement
                          ).style.borderColor = `rgba(${cat.color}, 0.15)`;
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </StorySection>
  );
}
