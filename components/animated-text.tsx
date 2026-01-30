"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easings } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "letter" | "word";
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  splitBy = "word",
  as: Tag = "span",
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const items = splitBy === "letter" ? text.split("") : text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * (splitBy === "letter" ? 0.03 : 0.1),
            ease: easings.smooth,
          }}
          className="inline-block"
        >
          {item}
          {splitBy === "word" ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
