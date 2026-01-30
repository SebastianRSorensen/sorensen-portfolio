"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const primaryColors = [
  { name: "Background", var: "--background", hex: "#0a0f14", usage: "Page background" },
  { name: "Foreground", var: "--foreground", hex: "#e8e4df", usage: "Primary text" },
  { name: "Accent", var: "--accent", hex: "#3b82f6", usage: "Links, highlights, CTAs" },
  { name: "Accent Hover", var: "--accent-hover", hex: "#2563eb", usage: "Hover states" },
];

const secondaryColors = [
  { name: "Muted", var: "--muted", hex: "#1e293b", usage: "Card backgrounds, sections" },
  { name: "Muted Foreground", var: "--muted-foreground", hex: "#94a3b8", usage: "Secondary text" },
  { name: "Border", var: "--border", hex: "#334155", usage: "Subtle borders, dividers" },
  { name: "Card", var: "--card", hex: "#0f172a", usage: "Elevated surfaces" },
];

const semanticColors = [
  { name: "Success", var: "--success", hex: "#22c55e", usage: "Positive states" },
  { name: "Warning", var: "--warning", hex: "#f59e0b", usage: "Attention states" },
  { name: "Error", var: "--error", hex: "#ef4444", usage: "Error states" },
];

function ColorSwatch({ name, cssVar, hex, usage }: { name: string; cssVar: string; hex: string; usage: string }) {
  return (
    <motion.div variants={staggerItem} className="space-y-2">
      <div
        className="h-20 rounded-lg border border-border"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-mono text-xs text-muted-foreground">{hex}</p>
        <p className="text-mono text-xs text-muted-foreground">{cssVar}</p>
        <p className="text-xs text-muted-foreground mt-1">{usage}</p>
      </div>
    </motion.div>
  );
}

export function ColorPalette() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-heading text-lg text-foreground mb-4">Primary</h3>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {primaryColors.map((c) => (
            <ColorSwatch key={c.name} name={c.name} cssVar={c.var} hex={c.hex} usage={c.usage} />
          ))}
        </motion.div>
      </div>

      <div>
        <h3 className="text-heading text-lg text-foreground mb-4">Secondary</h3>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {secondaryColors.map((c) => (
            <ColorSwatch key={c.name} name={c.name} cssVar={c.var} hex={c.hex} usage={c.usage} />
          ))}
        </motion.div>
      </div>

      <div>
        <h3 className="text-heading text-lg text-foreground mb-4">Semantic</h3>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {semanticColors.map((c) => (
            <ColorSwatch key={c.name} name={c.name} cssVar={c.var} hex={c.hex} usage={c.usage} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
