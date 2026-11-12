
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { services, type Service } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { buildWhatsAppUrl } from "@/lib/utils";
import { scrollToSection } from "@/lib/lenis";

export function ServicesSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  function goToBooking() {
    setActiveService(null);
    window.setTimeout(() => scrollToSection("booking"), 180);
  }

  return (
    <section
      id="services"
      className="scroll-mt-28 bg-ivory-soft py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Interiors composed
                <br />
                <span className="italic text-terracotta-deep">
                  with intention.
                </span>
              </>
            }
            description="From thoughtfully designed kitchens to beautifully detailed living spaces, every interior is shaped around your lifestyle, comfort and personal taste."
          />

          <Reveal delay={0.1} className="shrink-0">
            <div className="flex items-end gap-4">
              <span className="font-serif text-6xl leading-none text-ink/20">
                08
              </span>
              <span className="pb-1 text-[0.58rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-muted">
                Design
                <br />
                disciplines
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-14">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={(index % 4) * 0.06}
              className="h-full"
            >
              <button
                type="button"
                onClick={() => setActiveService(service)}
                className="group flex h-full w-full flex-col text-left"
                aria-label={`Explore ${service.title}`}
                aria-haspopup="dialog"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="absolute left-4 top-4 text-[0.65rem] font-semibold tracking-[0.18em] text-white drop-shadow-md">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-ivory text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col border-b border-ink/15 pb-5 pt-5 transition-colors duration-300 group-hover:border-terracotta-deep">
                  <h3 className="font-serif text-[1.55rem] leading-tight text-ink transition-colors duration-300 group-hover:text-terracotta-deep">
                    {service.title}
                  </h3>

                  <p className="mt-3 min-h-[3.5rem] text-[0.82rem] leading-[1.7] text-muted">
                    {service.shortDescription}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-terracotta-deep">
                    Explore service
                    <ArrowUpRight
                      aria-hidden="true"
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(activeService)}
        onClose={() => setActiveService(null)}
        titleId="service-dialog-title"
        className="max-w-4xl"
      >
        {activeService ? (
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[280px] md:min-h-[540px]">
              <Image
                src={activeService.image}
                alt={activeService.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="p-7 md:p-10">
              <p className="eyebrow text-terracotta-deep">Service</p>

              <h3
                id="service-dialog-title"
                className="mt-5 font-serif text-4xl leading-none"
              >
                {activeService.title}
              </h3>

              <p className="mt-5 text-sm leading-relaxed text-muted">
                {activeService.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {activeService.inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-strong"
                  >
                    <span className="icon-circle mt-0.5 h-5 w-5 shrink-0 border border-terracotta-deep/20 bg-terracotta-deep/5 text-terracotta-deep">
                      <Check aria-hidden="true" size={11} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink
                  href="#booking"
                  variant="primary"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    goToBooking();
                  }}
                >
                  Book this service
                </ButtonLink>

                <ButtonLink
                  href={buildWhatsAppUrl(
                    `Hello Styling Spaces, I'd like to enquire about ${activeService.title}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  Enquire on WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
