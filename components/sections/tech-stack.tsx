"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";

const categoryKeys = ["frontend", "backend", "cloud", "devops", "testing", "tools"] as const;

export function TechStack() {
  const t = useTranslations("techStack");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech-stack" ref={ref} className="min-h-screen py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Title */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: easings.smooth }}
          className="text-accent font-mono text-sm block mb-4"
        >
          05
        </motion.span>

        <div className="relative inline-block mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easings.smooth }}
            className="text-display text-4xl md:text-6xl text-foreground"
          >
            {t("title")}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: easings.smooth }}
            className="absolute -bottom-2 left-0 h-0.5 w-full bg-accent origin-left"
          />
        </div>

        <p className="text-mono text-xs text-accent uppercase tracking-wider mb-10">
          {t("subtitle")}
        </p>

        {/* Categories grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: easings.smooth }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {categoryKeys.map((key, catIdx) => (
            <TechCategory
              key={key}
              title={t(`${key}.title`)}
              items={t(`${key}.items`).split(", ")}
              delay={catIdx * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechCategory({
  title,
  items,
}: {
  title: string;
  items: string[];
  delay?: number;
}) {
  return (
    <div>
      <p className="text-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </p>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-2"
      >
        {items.map((tech) => (
          <motion.span
            key={tech}
            variants={staggerItem}
            whileHover={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
            }}
            className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-mono cursor-default transition-colors"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
