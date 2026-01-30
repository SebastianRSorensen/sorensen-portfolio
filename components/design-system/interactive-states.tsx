"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export function InteractiveStates() {
  return (
    <div className="space-y-10">
      {/* Link styles */}
      <div>
        <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-4">Links</h4>
        <div className="flex flex-col gap-4">
          <a href="#" className="text-foreground hover:text-accent transition-colors text-lg">
            Default link (hover for color)
          </a>
          <a
            href="#"
            className="text-foreground underline underline-offset-4 decoration-border hover:decoration-accent transition-colors text-lg"
          >
            Underline link
          </a>
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors text-lg"
          >
            Arrow link
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          <a
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            External link
          </a>
        </div>
      </div>

      {/* Button hover */}
      <div>
        <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-4">Button Hover</h4>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm transition-colors hover:bg-accent-hover"
          >
            Scale 1.02 on hover
          </motion.button>
        </div>
      </div>

      {/* Card hover */}
      <div>
        <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-4">Card Hover</h4>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 max-w-sm cursor-pointer"
        >
          <p className="text-foreground">Hover to lift (y: -4)</p>
          <p className="text-sm text-muted-foreground mt-1">Card content here</p>
        </motion.div>
      </div>

      {/* Focus visible */}
      <div>
        <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-4">Focus & Selection</h4>
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-6 py-3 rounded-full bg-muted text-foreground font-medium text-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
            Tab to focus
          </button>
          <p className="text-muted-foreground text-sm">
            Select this text to see selection styling
          </p>
        </div>
      </div>

      {/* Nav item hover */}
      <div>
        <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-4">Nav Item</h4>
        <div className="flex gap-1">
          {["Home", "Story", "Skills", "Contact"].map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Social icon hover */}
      <div>
        <h4 className="text-mono text-xs text-accent uppercase tracking-wider mb-4">Social Icons</h4>
        <div className="flex gap-4">
          <motion.a
            href="#"
            whileHover={{ y: -2 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-6 h-6" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
