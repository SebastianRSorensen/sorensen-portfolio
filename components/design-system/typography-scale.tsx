"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const typographyItems = [
  {
    label: "Hero Title",
    font: "Instrument Serif",
    specs: "6rem / 96px / weight 400",
    className: "text-display text-7xl md:text-[6rem]",
    sample: "GRENSE",
  },
  {
    label: "Section Title",
    font: "Instrument Serif",
    specs: "4rem / 64px / weight 400",
    className: "text-display text-5xl md:text-[4rem]",
    sample: "KUNNSKAP",
  },
  {
    label: "H2",
    font: "Instrument Serif",
    specs: "2.5rem / 40px / weight 400",
    className: "text-display text-3xl md:text-[2.5rem]",
    sample: "The journey begins",
  },
  {
    label: "H3",
    font: "Geist",
    specs: "1.5rem / 24px / weight 500",
    className: "text-heading text-xl md:text-2xl",
    sample: "System Developer at Stacc AS",
  },
  {
    label: "Body Large",
    font: "Geist",
    specs: "1.25rem / 20px / weight 400",
    className: "text-body text-lg md:text-xl",
    sample: "Building modern web solutions with React, Next.js, and TypeScript.",
  },
  {
    label: "Body",
    font: "Geist",
    specs: "1rem / 16px / weight 400",
    className: "text-body text-base",
    sample: "Working in a team developing credit solutions for consumer finance and sales finance across the Nordics.",
  },
  {
    label: "Small",
    font: "Geist",
    specs: "0.875rem / 14px / weight 400",
    className: "text-body text-sm",
    sample: "January 2024 — Present",
  },
  {
    label: "Caption / Mono",
    font: "Geist Mono",
    specs: "0.75rem / 12px / weight 500",
    className: "text-mono text-xs",
    sample: "CHAPTER 01 — BORDER",
  },
];

export function TypographyScale() {
  return (
    <div className="space-y-10">
      {typographyItems.map((item) => (
        <motion.div
          key={item.label}
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="border-b border-border pb-8 last:border-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
            <span className="text-mono text-xs text-accent uppercase tracking-wider">
              {item.label}
            </span>
            <span className="text-mono text-xs text-muted-foreground">
              {item.font} — {item.specs}
            </span>
          </div>
          <p className={`${item.className} text-foreground`}>{item.sample}</p>
        </motion.div>
      ))}
    </div>
  );
}
