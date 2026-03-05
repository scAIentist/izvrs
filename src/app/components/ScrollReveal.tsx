"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  playful?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  playful = false,
}: ScrollRevealProps) {
  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: playful ? 0.9 : 1, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        playful
          ? { type: "spring", stiffness: 200, damping: 15, delay }
          : { duration: 0.6, delay, ease: "easeOut" }
      }
    >
      {children}
    </motion.div>
  );
}
