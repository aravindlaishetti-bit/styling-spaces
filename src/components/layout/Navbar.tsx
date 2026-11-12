"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { getLenis, scrollToSection } from "@/lib/lenis";
import { ContactIconGroup } from "@/components/ui/ContactIcon";
import { ButtonLink } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 28);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = siteConfig.primaryNavLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const lenis = getLenis();
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      menuButton?.focus();
    };
  }, [open]);

  function handleDrawerNav(id: string) {
    setOpen(false);
    window.setTimeout(() => scrollToSection(id), 140);
  }

  return (
    <>
      <header
        data-tone={scrolled ? undefined : "dark"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink/10 bg-ivory/95 py-3 shadow-[0_10px_40px_rgba(41,41,41,0.06)] backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-ink/70 via-ink/25 to-transparent py-5",
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Styling Spaces home"
          >
            <span
              className={cn(
                "icon-circle h-12 w-12 overflow-hidden border bg-ivory shadow-[0_2px_12px_rgba(0,0,0,0.16)] max-sm:h-[42px] max-sm:w-[42px]",
                scrolled ? "border-ink/15" : "border-ivory/35",
              )}
            >
              <Image
                src="/images/styling-logo.jpg"
                alt="Styling Spaces logo"
                width={48}
                height={48}
                sizes="(max-width: 639px) 42px, 48px"
                loading="eager"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-serif text-[1.1rem] tracking-[0.18em] sm:text-[1.3rem]",
                  scrolled ? "text-ink" : "text-ivory",
                )}
              >
                STYLING{" "}
                <span
                  className={cn(
                    "italic",
                    scrolled ? "text-terracotta-deep" : "text-terracotta",
                  )}
                >
                  SPACES
                </span>
              </span>
              <span
                className={cn(
                  "mt-1.5 text-[0.46rem] font-bold uppercase tracking-[0.32em] sm:text-[0.5rem]",
                  scrolled ? "text-muted" : "text-ivory/75",
                )}
              >
                INTERIOR DESIGN STUDIO
              </span>
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-4 lg:flex xl:gap-6"
          >
            {siteConfig.primaryNavLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? "page" : undefined}
                className={cn(
                  "group relative py-2 text-[0.64rem] font-bold uppercase tracking-[0.15em]",
                  active === link.id
                    ? scrolled
                      ? "text-terracotta-deep"
                      : "text-terracotta-soft"
                    : scrolled
                      ? "text-muted-strong"
                      : "text-ivory/85",
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-300",
                    scrolled ? "bg-terracotta-deep" : "bg-terracotta",
                    active === link.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex xl:gap-5">
            <ContactIconGroup
              platforms={["whatsapp", "instagram", "email"]}
              tooltipSide="bottom"
              className="gap-2"
            />
            <ButtonLink
              href="#booking"
              variant="terracotta"
              size="sm"
              className="text-[0.62rem]"
            >
              Let&apos;s Talk
            </ButtonLink>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "button-icon icon-circle h-11 w-11 border lg:hidden",
              scrolled ? "border-ink/15 text-ink" : "border-ivory/30 text-ivory",
            )}
          >
            <Menu aria-hidden="true" size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            data-tone="dark"
            className="fixed inset-0 z-[70] overflow-y-auto bg-ink text-ivory lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="shell flex min-h-svh flex-col py-5">
              <div className="flex items-center justify-between">
                <a
                  href="#home"
                  onClick={(event) => {
                    event.preventDefault();
                    handleDrawerNav("home");
                  }}
                  className="flex flex-col leading-none"
                  aria-label="Styling Spaces home"
                >
                  <span className="font-serif text-[1.3rem] tracking-[0.18em] text-ivory">
                    STYLING{" "}
                    <span className="italic text-terracotta">SPACES</span>
                  </span>
                  <span className="mt-1.5 text-[0.5rem] font-bold uppercase tracking-[0.38em] text-ivory/75">
                    Interior Design Studio
                  </span>
                </a>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="button-icon icon-circle h-11 w-11 border border-ivory/20 text-ivory"
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </div>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-1 flex-col justify-center py-10"
              >
                <ul className="space-y-1">
                  {siteConfig.primaryNavLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.06 + index * 0.045,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleDrawerNav(link.id);
                        }}
                        className="group flex items-baseline justify-between border-b border-ivory/10 py-3"
                      >
                        <span className="font-serif text-[2.2rem] leading-none text-ivory transition-transform duration-300 group-hover:translate-x-1 sm:text-[2.6rem]">
                          {link.label}
                        </span>
                        <span className="text-[0.62rem] font-bold tracking-[0.18em] text-ivory/75">
                          0{index + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-ivory/15 pt-6">
                <ButtonLink
                  href="#booking"
                  variant="terracotta"
                  className="w-full"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleDrawerNav("booking");
                  }}
                >
                  Book Free Consultation
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
