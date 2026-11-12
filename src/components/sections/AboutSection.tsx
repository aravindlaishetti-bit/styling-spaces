import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { ButtonLink } from "@/components/ui/Button";

const values = [
  "Personalized design approach",
  "Premium materials",
  "Functional layouts",
  "Attention to detail",
  "Complete execution",
  "Customer-focused service",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-t border-ink/10 py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative">
                <ImageReveal className="relative aspect-[4/5] bg-sand">
                  <Image
                    src="/images/about-1.jpg"
                    alt="Refined interior composition with warm woods and neutral upholstery"
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.025]"
                  />
                </ImageReveal>
                <div className="absolute -bottom-8 right-4 hidden w-44 overflow-hidden border-[6px] border-ivory md:block lg:-right-8 lg:w-52">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src="/images/about-2.jpg"
                      alt="Detail of a thoughtfully styled interior corner"
                      fill
                      sizes="208px"
                      className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.035]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 flex items-center justify-between border-t border-ink/15 pt-5">
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-muted">
                  The studio
                </p>
                <p className="font-serif text-xl italic text-ink">
                  Hyderabad, India
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading
              eyebrow="The Studio"
              title={
                <>
                  Designing spaces.
                  <br />
                  <span className="italic text-terracotta-deep">
                    Creating experiences.
                  </span>
                </>
              }
            />

            <Reveal delay={0.12}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
                <p>
                  Styling Spaces is an interior design studio creating
                  thoughtful residential and commercial environments across
                  Hyderabad. We approach every project as a complete story,
                  where layout, material, light, and detail work together.
                </p>
                <p>
                  From the first conversation to the final handover, our process
                  is personal and transparent. The result is a space that feels
                  considered, comfortable, and unmistakably yours.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <blockquote className="mt-8 border-l-2 border-terracotta pl-5 font-serif text-2xl leading-snug text-ink">
                &ldquo;A beautiful space should work as beautifully as it
                looks.&rdquo;
              </blockquote>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-9 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {values.map((value, index) => (
                  <li
                    key={value}
                    className="flex items-baseline gap-3 border-t border-ink/12 py-3 text-sm"
                  >
                    <span className="text-[0.58rem] font-bold tracking-[0.16em] text-terracotta-deep">
                      0{index + 1}
                    </span>
                    <span className="text-muted-strong">{value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <ButtonLink
                href="#services"
                variant="secondary"
                className="mt-9"
              >
                Discover our services
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
