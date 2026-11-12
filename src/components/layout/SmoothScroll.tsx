"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenis(lenis);

    function onLenisScroll() {
      ScrollTrigger.update();
    }

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    function handleAnchorClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!anchor || anchor.dataset.noSmooth === "true") return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = decodeURIComponent(href.slice(1));
      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      window.history.replaceState(null, "", href);
    }

    function refreshScrollTrigger() {
      ScrollTrigger.refresh();
    }

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("load", refreshScrollTrigger);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("load", refreshScrollTrigger);
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
