"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ButtonStyles() {
  return (
    <div className="space-y-10">
      {/* Variants */}
      <div>
        <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-4">Variants</h4>
        <div className="flex flex-wrap gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm"
          >
            Primary
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
          >
            Ghost / Secondary
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full border border-accent text-accent font-medium text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Outline
          </motion.button>

          <motion.button
            whileHover={{ x: 4 }}
            className="text-foreground font-medium text-sm inline-flex items-center gap-2 group"
          >
            Link style
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-4">Sizes</h4>
        <div className="flex flex-wrap gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium text-xs"
          >
            Small
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm"
          >
            Default
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium text-base"
          >
            Large
          </motion.button>
        </div>
      </div>
    </div>
  );
}
