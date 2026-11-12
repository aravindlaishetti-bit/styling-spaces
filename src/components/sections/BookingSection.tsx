import { Calendar, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ContactIconGroup } from "@/components/ui/ContactIcon";
import { BookingForm } from "@/components/forms/BookingForm";

export function BookingSection() {
  return (
    <section
      id="booking"
      data-tone="dark"
      className="scroll-mt-28 bg-ink py-24 text-ivory md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-terracotta">Book a consultation</p>
            <h2 className="mt-6 font-serif text-[clamp(2.7rem,5vw,4.6rem)] leading-[0.97] tracking-[-0.025em]">
              Let&apos;s design something
              <br />
              <span className="italic text-terracotta">
                that feels like you.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory-muted">
              Tell us a little about your space and how you want it to feel.
              We&apos;ll follow up on WhatsApp to confirm your free
              consultation.
            </p>

            <dl className="mt-10 space-y-5">
              <div className="flex gap-4 border-t border-ivory/15 pt-5">
                <span className="icon-circle icon-tile mt-0.5 h-11 w-11 border border-ivory/20 bg-ivory/10 text-terracotta sm:h-12 sm:w-12">
                  <Clock aria-hidden="true" size={19} />
                </span>
                <div>
                  <dt className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ivory/75">
                    Consultation
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-ivory">
                    Free · 60 minutes
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 border-t border-ivory/15 pt-5">
                <span className="icon-circle icon-tile mt-0.5 h-11 w-11 border border-ivory/20 bg-ivory/10 text-terracotta sm:h-12 sm:w-12">
                  <Calendar aria-hidden="true" size={19} />
                </span>
                <div>
                  <dt className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ivory/75">
                    Studio hours
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-ivory">
                    {siteConfig.hours.days}
                  </dd>
                  <p className="mt-1 text-sm text-ivory-muted">
                    {siteConfig.hours.time}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-t border-ivory/15 pt-5">
                <span className="icon-circle icon-tile mt-0.5 h-11 w-11 border border-ivory/20 bg-ivory/10 text-terracotta sm:h-12 sm:w-12">
                  <MapPin aria-hidden="true" size={19} />
                </span>
                <div>
                  <dt className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ivory/75">
                    Meeting
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-ivory">
                    Studio or site visit
                  </dd>
                  <p className="mt-1 text-sm text-ivory-muted">
                    Tellapur, Hyderabad
                  </p>
                </div>
              </div>
            </dl>

            <div className="mt-8 max-w-sm">
              <p className="text-sm leading-relaxed text-ivory-muted">
                Prefer a direct conversation? Call, WhatsApp, or email the
                studio.
              </p>
              <ContactIconGroup
                platforms={["whatsapp", "phone", "email"]}
                tooltipSide="top"
                className="mt-4"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
