import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (lenisInstance) {
    lenisInstance.scrollTo(element, {
      offset: -80,
      duration: reducedMotion ? 0 : 1.25,
    });
    return;
  }

  element.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
}
