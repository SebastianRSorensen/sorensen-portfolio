"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const spacingValues = [
  { name: "xs", px: 4, tw: "p-1" },
  { name: "sm", px: 8, tw: "p-2" },
  { name: "md", px: 16, tw: "p-4" },
  { name: "lg", px: 24, tw: "p-6" },
  { name: "xl", px: 32, tw: "p-8" },
  { name: "2xl", px: 48, tw: "p-12" },
  { name: "3xl", px: 64, tw: "p-16" },
  { name: "4xl", px: 96, tw: "p-24" },
  { name: "5xl", px: 128, tw: "p-32" },
];

export function SpacingSystem() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="space-y-3"
    >
      {spacingValues.map((s) => (
        <motion.div key={s.name} variants={staggerItem} className="flex items-center gap-4">
          <span className="text-mono text-xs text-muted-foreground w-8 text-right">{s.name}</span>
          <div
            className="h-6 rounded-sm bg-accent/80"
            style={{ width: `${Math.min(s.px * 2, 600)}px` }}
          />
          <span className="text-mono text-xs text-muted-foreground">
            {s.px}px — {s.tw}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
