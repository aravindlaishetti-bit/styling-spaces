"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection, setLenis } from "@/lib/lenis";

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

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!anchor || anchor.dataset.noSmooth === "true") return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      let id: string;

      try {
        id = decodeURIComponent(href.slice(1));
      } catch {
        return;
      }

      if (!document.getElementById(id)) return;

      event.preventDefault();
      scrollToSection(id);
      window.history.replaceState(null, "", href);
    }

    document.addEventListener("click", handleAnchorClick);

    function refreshScrollTrigger() {
      ScrollTrigger.refresh();
    }

    window.addEventListener("load", refreshScrollTrigger);
    requestAnimationFrame(refreshScrollTrigger);

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
