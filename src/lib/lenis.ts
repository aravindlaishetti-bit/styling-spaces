import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

function getHeaderOffset() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;

  return headerHeight + 16;
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const offset = getHeaderOffset();

  if (lenisInstance) {
    lenisInstance.scrollTo(element, {
      offset: -offset,
      duration: reducedMotion ? 0 : 1.2,
    });
    return;
  }

  const targetPosition =
    window.scrollY + element.getBoundingClientRect().top - offset;

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: reducedMotion ? "instant" : "smooth",
  });
}
