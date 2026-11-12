"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (lineRef.current && timelineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 72%",
              end: "bottom 72%",
              scrub: 0.6,
            },
          },
        );
      }

      (gsap.utils.toArray(".process-step") as HTMLElement[]).forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 26,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="scroll-mt-28 py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A clear path from
              <br />
              <span className="italic text-terracotta-deep">
                idea to handover.
              </span>
            </>
          }
          description="Six considered stages keep the design, decisions, and execution aligned from the first meeting to the final walkthrough."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <ImageReveal className="relative aspect-[4/5] bg-sand">
                  <Image
                    src="/images/process.jpg"
                    alt="Architectural interior detail showing craftsmanship and material"
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent"
                  />
                  <div className="absolute bottom-6 left-6 right-6 text-ivory">
                    <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-terracotta-soft">
                      The studio approach
                    </p>
                    <p className="mt-3 font-serif text-3xl leading-tight">
                      Considered at every stage.
                    </p>
                  </div>
                </ImageReveal>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.58rem] font-bold uppercase tracking-[0.15em] text-muted">
                  <span>Free consultation</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-terracotta" />
                  <span>60 minutes</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-terracotta" />
                  <span>No obligation</span>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div ref={timelineRef} className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-ink/15 md:left-[1.4rem]"
              />
              <div
                ref={lineRef}
                aria-hidden="true"
                className="absolute bottom-2 left-[1.15rem] top-2 w-px origin-top bg-terracotta md:left-[1.4rem]"
              />

              <ol>
                {processSteps.map((step) => (
                  <li
                    key={step.number}
                    className="process-step relative grid grid-cols-[2.5rem_1fr] gap-5 py-5 md:grid-cols-[3rem_1fr] md:gap-8 md:py-6"
                  >
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 bg-ivory font-serif text-sm text-ink shadow-sm md:h-12 md:w-12 md:text-base">
                      {step.number}
                    </div>
                    <div className="border-b border-ink/12 pb-6">
                      <h3 className="font-serif text-[1.75rem] leading-tight md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
