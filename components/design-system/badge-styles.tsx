"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const categories = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "PostgreSQL", "MongoDB"] },
  { label: "DevOps & Tools", items: ["Docker", "Kubernetes", "GitHub Actions", "Claude Code"] },
];

export function BadgeStyles() {
  return (
    <div className="space-y-8">
      {categories.map((cat) => (
        <div key={cat.label}>
          <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-3">
            {cat.label}
          </h4>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {cat.items.map((item) => (
              <motion.span
                key={item}
                variants={staggerItem}
                whileHover={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-foreground)",
                }}
                className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-mono cursor-default transition-colors"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
