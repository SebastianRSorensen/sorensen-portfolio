"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: easings.smooth,
    },
  }),
};

function AnimatedLine({ text, startIndex }: { text: string; startIndex: number }) {
  const letters = text.split("");

  return (
    <span className="block">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={startIndex + i}
          variants={letterAnimation}
          initial="initial"
          animate="animate"
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroName() {
  const lines = ["SEBASTIAN", "ROSNES", "SØRENSEN"];
  let charCount = 0;

  return (
    <h1
      className="text-display leading-[0.95] tracking-tight"
      style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
    >
      {lines.map((line, lineIdx) => {
        const startIndex = charCount;
        charCount += line.length;
        return <AnimatedLine key={lineIdx} text={line} startIndex={startIndex} />;
      })}
    </h1>
  );
}

export function getTotalLetterCount() {
  return "SEBASTIANROSNESSØRENSEN".length;
}
