import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceAreas() {
  return (
    <section
      id="areas"
      className="scroll-mt-28 border-t border-ink/10 py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Where we work"
              title={
                <>
                  Across Hyderabad
                  <br />
                  <span className="italic text-terracotta-deep">
                    and beyond.
                  </span>
                </>
              }
              description="Based in Tellapur, our studio designs and executes projects across Hyderabad and select locations in Telangana."
            />
          </div>

          <div className="lg:col-span-8">
            <ul className="grid sm:grid-cols-2">
              {siteConfig.serviceAreas.map((area, index) => (
                <li key={area} className="border-t border-ink/15">
                  <a
                    href="#booking"
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[0.55rem] font-bold tracking-[0.16em] text-terracotta-deep">
                        0{index + 1}
                      </span>
                      <span className="font-serif text-3xl transition-transform duration-300 group-hover:translate-x-0.5 md:text-4xl">
                        {area}
                      </span>
                    </span>
                    <span className="icon-circle icon-tile h-9 w-9 border border-ink/15 bg-ivory-soft text-muted group-hover:-translate-y-0.5">
                      <ArrowUpRight aria-hidden="true" size={16} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <Reveal delay={0.08}>
              <p className="mt-6 text-base leading-relaxed text-muted">
                Not on the list?{" "}
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-ink"
                >
                  Ask about your location
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

