"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let alreadySeen = false;

    try {
      alreadySeen = window.sessionStorage.getItem("ss-preloader-seen") === "1";
    } catch {
      alreadySeen = false;
    }

    const timer = window.setTimeout(
      () => {
        try {
          window.sessionStorage.setItem("ss-preloader-seen", "1");
        } catch {
          // Storage can be unavailable in strict privacy modes.
        }
        setVisible(false);
      },
      alreadySeen ? 0 : reduceMotion ? 180 : 1050,
    );

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-label="Loading Styling Spaces"
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ivory"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <span className="font-serif text-[1.8rem] tracking-[0.18em] text-ink md:text-[2.4rem]">
              STYLING{" "}
              <span className="italic text-terracotta-deep">SPACES</span>
            </span>
            <span className="mt-3 text-[0.58rem] font-bold uppercase tracking-[0.44em] text-muted-strong">
              Interior Design Studio
            </span>
            <span className="mt-8 block h-px w-28 overflow-hidden bg-ink/15">
              <motion.span
                className="block h-full w-full origin-left bg-terracotta"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.div>
          <span className="sr-only">Loading</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
