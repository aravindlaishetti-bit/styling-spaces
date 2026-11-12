"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ImageReveal({
  children,
  className,
  delay = 0,
}: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={
        reduceMotion ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0.4 }
      }
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1.15,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
