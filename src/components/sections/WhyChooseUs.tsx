import Image from "next/image";
import { differentiators } from "@/data/why-choose-us";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { ButtonLink } from "@/components/ui/Button";

export function WhyChooseUs() {
  return (
    <section
      id="why"
      data-tone="dark"
      className="scroll-mt-28 bg-ink py-24 text-ivory md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow="Why Styling Spaces"
              title={
                <>
                  An experience as
                  <br />
                  considered{" "}
                  <span className="italic text-terracotta">as the design.</span>
                </>
              }
              description="Good design is only part of the story. The way a project is managed, communicated, and delivered matters just as much."
            />

            <Reveal delay={0.12}>
              <ImageReveal className="relative mt-10 aspect-[4/5] bg-ink-soft">
                <Image
                  src="/images/about-2.jpg"
                  alt="Considered interior detail with natural materials and soft light"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover opacity-90 transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-terracotta-soft">
                    The studio promise
                  </p>
                  <p className="mt-2 font-serif text-2xl leading-snug text-ivory">
                    Thoughtful design. Clear communication. Complete execution.
                  </p>
                </div>
              </ImageReveal>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2">
              {differentiators.map((item, index) => (
                <Reveal key={item.title} delay={(index % 3) * 0.05}>
                  <div className="h-full border-t border-ivory/15 py-6 sm:pr-8">
                    <span className="text-[0.58rem] font-bold tracking-[0.18em] text-terracotta">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl leading-tight text-ivory">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-ivory-muted">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-4 border-t border-ivory/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-sm leading-relaxed text-ivory-muted">
                  Ready to start with a focused conversation about your space?
                </p>
                <ButtonLink href="#booking" variant="terracotta">
                  Book a free consultation
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
