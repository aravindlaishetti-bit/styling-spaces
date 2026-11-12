import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function StatsSection() {
  return (
    <section
      id="studio"
      className="scroll-mt-28 py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The journey"
              title={
                <>
                  Rooted in Hyderabad.
                  <br />
                  <span className="italic text-terracotta-deep">
                    Growing with every space.
                  </span>
                </>
              }
              description="Styling Spaces began in 2021 with a simple belief: a well-designed space can change how a home or workplace feels. That belief still guides every project."
            />

            <Reveal delay={0.12}>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  In 2025 we expanded our premium interior services to offer a
                  more complete design and execution experience. Our studio
                  continues to work across residential and commercial spaces in
                  and around Hyderabad.
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-strong">
                  Founded 2021 · Premium services expanded 2025
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <ButtonLink href="#booking" variant="secondary" className="mt-8">
                Start a conversation
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <dl className="grid grid-cols-2 border-l border-t border-ink/12">
                {siteConfig.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-b border-r border-ink/12 p-6 md:p-8"
                  >
                    <dt className="text-[0.56rem] font-bold uppercase leading-relaxed tracking-[0.17em] text-muted">
                      {stat.label}
                    </dt>
                    <dd className="mt-3 font-serif text-5xl leading-none text-ink md:text-6xl">
                      {stat.value}
                    </dd>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
