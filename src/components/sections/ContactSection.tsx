import { ArrowUpRight, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactIconTile } from "@/components/ui/ContactIcon";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-ink/10 bg-ivory-soft py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Begin with a
                  <br />
                  <span className="italic text-terracotta-deep">
                    conversation.
                  </span>
                </>
              }
              description="Share a few details about your space, or reach us directly on WhatsApp, phone, email, or Instagram."
            />

            <div className="mt-9 space-y-0">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center justify-between gap-4 border-t border-ink/15 py-5"
              >
                <span className="flex items-center gap-4">
                  <ContactIconTile
                    platform="email"
                    className="group-hover:-translate-y-0.5"
                  />
                  <span>
                    <span className="block text-[0.56rem] font-bold uppercase tracking-[0.16em] text-muted-strong">
                      Email
                    </span>
                    <span className="mt-1 block text-sm text-muted-strong">
                      {siteConfig.email}
                    </span>
                  </span>
                </span>
                <span className="icon-circle icon-tile h-8 w-8 border border-ink/15 bg-ivory-soft text-muted group-hover:-translate-y-0.5">
                  <ArrowUpRight aria-hidden="true" size={15} />
                </span>
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-t border-ink/15 py-5"
              >
                <span className="flex items-center gap-4">
                  <ContactIconTile
                    platform="whatsapp"
                    className="group-hover:-translate-y-0.5"
                  />
                  <span>
                    <span className="block text-[0.56rem] font-bold uppercase tracking-[0.16em] text-muted-strong">
                      WhatsApp
                    </span>
                    <span className="mt-1 block text-sm text-muted-strong">
                      Message the studio
                    </span>
                  </span>
                </span>
                <span className="icon-circle icon-tile h-8 w-8 border border-ink/15 bg-ivory-soft text-muted group-hover:-translate-y-0.5">
                  <ArrowUpRight aria-hidden="true" size={15} />
                </span>
              </a>

              <a
                href={siteConfig.phone.href}
                className="group flex items-center justify-between gap-4 border-t border-ink/15 py-5"
              >
                <span className="flex items-center gap-4">
                  <ContactIconTile
                    platform="phone"
                    className="group-hover:-translate-y-0.5"
                  />
                  <span>
                    <span className="block text-[0.56rem] font-bold uppercase tracking-[0.16em] text-muted-strong">
                      Phone
                    </span>
                    <span className="mt-1 block text-sm text-muted-strong">
                      {siteConfig.phone.display}
                    </span>
                  </span>
                </span>
                <span className="icon-circle icon-tile h-8 w-8 border border-ink/15 bg-ivory-soft text-muted group-hover:-translate-y-0.5">
                  <ArrowUpRight aria-hidden="true" size={15} />
                </span>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-t border-ink/15 py-5"
              >
                <span className="flex items-center gap-4">
                  <ContactIconTile
                    platform="instagram"
                    className="group-hover:-translate-y-0.5"
                  />
                  <span>
                    <span className="block text-[0.56rem] font-bold uppercase tracking-[0.16em] text-muted-strong">
                      Instagram
                    </span>
                    <span className="mt-1 block text-sm text-muted-strong">
                      {siteConfig.instagramHandle}
                    </span>
                  </span>
                </span>
                <span className="icon-circle icon-tile h-8 w-8 border border-ink/15 bg-ivory-soft text-muted group-hover:-translate-y-0.5">
                  <ArrowUpRight aria-hidden="true" size={15} />
                </span>
              </a>

              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-4 border-t border-ink/15 py-5"
              >
                <span className="flex items-start gap-4">
                  <ContactIconTile
                    platform="location"
                    className="group-hover:-translate-y-0.5"
                  />
                  <span>
                    <span className="block text-[0.56rem] font-bold uppercase tracking-[0.16em] text-muted-strong">
                      Studio
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-strong">
                      {siteConfig.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
                <span className="icon-circle icon-tile mt-0.5 h-8 w-8 border border-ink/15 bg-ivory-soft text-muted group-hover:-translate-y-0.5">
                  <ArrowUpRight aria-hidden="true" size={15} />
                </span>
              </a>

              <div className="flex items-start gap-4 border-y border-ink/15 py-5">
                <span className="icon-circle icon-tile mt-0.5 h-11 w-11 border border-ink/10 bg-ivory-soft text-terracotta-deep sm:h-12 sm:w-12">
                  <Clock aria-hidden="true" size={20} />
                </span>
                <div>
                  <span className="block text-[0.56rem] font-bold uppercase tracking-[0.16em] text-muted-strong">
                    Working hours
                  </span>
                  <span className="mt-1 block text-sm text-muted-strong">
                    {siteConfig.hours.days}
                  </span>
                  <span className="block text-sm text-muted-strong">
                    {siteConfig.hours.time}
                  </span>
                </div>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 overflow-hidden border border-ink/10 bg-sand">
                <iframe
                  title="Map showing the Styling Spaces studio in Tellapur, Hyderabad"
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="260"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[260px] w-full"
                />
              </div>
              <ButtonLink
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Open in Google Maps
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}


