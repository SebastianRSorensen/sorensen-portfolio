"use client";

import { motion } from "framer-motion";

export function CardStyles() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Position card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-border rounded-lg p-6 space-y-3"
      >
        <span className="text-mono text-xs text-accent uppercase tracking-wider">Position</span>
        <h4 className="text-heading text-lg text-foreground">System Developer</h4>
        <p className="text-sm text-muted-foreground">Stacc AS</p>
        <p className="text-mono text-xs text-muted-foreground">January 2024 — Present</p>
        <p className="text-body text-sm text-muted-foreground">
          Full-stack responsibility with React, Next.js, and TypeScript.
        </p>
      </motion.div>

      {/* Education card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-border rounded-lg p-6 space-y-3"
      >
        <span className="text-mono text-xs text-accent uppercase tracking-wider">Education</span>
        <h4 className="text-heading text-lg text-foreground">Bachelor in Computer Science</h4>
        <p className="text-sm text-muted-foreground">University of Bergen</p>
        <p className="text-mono text-xs text-muted-foreground">2021 — 2023</p>
        <p className="text-body text-sm text-muted-foreground">
          Programming, data structures, algorithms, and software systems.
        </p>
      </motion.div>

      {/* Project card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-border rounded-lg p-6 space-y-3"
      >
        <span className="text-mono text-xs text-accent uppercase tracking-wider">Project</span>
        <h4 className="text-heading text-lg text-foreground">Rosengrip</h4>
        <p className="text-sm text-muted-foreground">Co-founder</p>
        <p className="text-mono text-xs text-muted-foreground">2024 — Present</p>
        <p className="text-body text-sm text-muted-foreground">
          Web agency creating modern, conversion-focused websites.
        </p>
      </motion.div>
    </div>
  );
}
