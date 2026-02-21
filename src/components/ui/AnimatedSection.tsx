"use client";
import { motion, type Transition } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  config?: { tension?: number; friction?: number };
}

export default function AnimatedSection({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
}: AnimatedSectionProps) {
  const axis = direction === "vertical" ? "y" : "x";
  const offset = reverse ? -distance : distance;

  const initial: Record<string, number> = {
    [axis]: offset,
    scale,
  };
  if (animateOpacity) {
    initial.opacity = initialOpacity;
  }

  const animate: Record<string, number> = {
    [axis]: 0,
    scale: 1,
    opacity: 1,
  };

  const transition: Transition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
    delay,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: threshold }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
