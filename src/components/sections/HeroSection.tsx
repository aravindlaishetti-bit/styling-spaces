
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  return (
    <section
      ref={sectionRef}
      id="home"
      data-tone="dark"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-ink text-ivory"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
          >
            <Image
              src="/images/hero.jpg"
              alt="Warm minimalist luxury interior with natural materials, sculptural furniture, and soft editorial lighting"
              fill
              preload
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/35 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/20" />
      </div>

      <motion.div
        className="shell relative z-10 flex min-h-[100svh] flex-col pb-12 pt-28 md:pb-16 md:pt-32 lg:pb-20 lg:pt-28"
        style={reduceMotion ? undefined : { y: copyY }}
      >
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-5xl text-center">
            <Reveal delay={0.08} y={34}>
              <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.045em] text-balance text-ivory [text-shadow:0_2px_28px_rgba(0,0,0,0.38)]">
                <span className="block">
                  Spaces with{" "}
                  <span className="italic text-terracotta">soul.</span>
                </span>
                <span className="mt-2 block">
                  Stories that{" "}
                  <span className="italic text-terracotta">unfold.</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-ivory/90 md:text-lg">
                Designed to inspire. Crafted to admire.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="#projects" variant="terracotta">
                  Explore Our Projects
                </ButtonLink>
                <ButtonLink href="#booking" variant="light">
                  Book a Free Consultation
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.44}>
          <div className="mt-10 flex flex-col gap-4 border-t border-ivory/20 pt-5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-ivory-muted sm:flex-row sm:items-center sm:justify-between">
            <p>Tellapur, Hyderabad</p>
            <p className="hidden sm:block">Residential · Commercial</p>
            <a href="#about" className="group inline-flex items-center gap-3">
              Scroll to explore
              <span
                aria-hidden="true"
                className="h-px w-8 bg-terracotta transition-[width] duration-300 group-hover:w-12"
              />
            </a>
          </div>
        </Reveal>
      </motion.div>

      <span className="sr-only">
        Styling Spaces is an interior design studio in Tellapur, Hyderabad,
        founded in {siteConfig.foundingYear}. Spaces with soul. Stories that unfold.
      </span>
    </section>
  );
}
