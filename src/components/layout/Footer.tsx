import { ArrowUpRight, Clock, MapPin, MoveUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { ContactIconGroup } from "@/components/ui/ContactIcon";
import { CopyrightYear } from "@/components/ui/CopyrightYear";
import { ButtonLink } from "@/components/ui/Button";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/layout/CookiePreferencesButton";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-ivory">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 border-b border-ivory/15 pb-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-terracotta">
              Spaces designed around you
            </p>

            <a href="#home" className="mt-5 inline-flex flex-col leading-none" aria-label="Styling Spaces home">
              <span className="font-serif text-4xl tracking-[0.12em] sm:text-5xl md:text-6xl">
                STYLING
                <span className="italic text-terracotta"> SPACES.</span>
              </span>
              <span className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-ivory-muted">
                Interior Design Studio | Hyderabad
              </span>
            </a>

            <p className="mt-7 max-w-sm text-sm leading-7 text-ivory-muted">
              We create thoughtful interiors that bring together timeless aesthetics, everyday comfort and the way you love to live.
            </p>

            <p className="mt-6 font-serif text-2xl italic text-terracotta-soft">
              {siteConfig.tagline}
            </p>

            <ContactIconGroup tooltipSide="top" className="mt-8" />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-terracotta">
              Explore
            </h2>
            <ul className="mt-6 space-y-4">
              {siteConfig.navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="group inline-flex items-center gap-2 text-sm text-ivory-muted transition-colors duration-300 hover:text-ivory">
                    {link.label}
                    <ArrowUpRight size={13} className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a href="#booking" className="text-sm text-ivory-muted transition-colors hover:text-ivory">
                  Book a consultation
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-terracotta">
              Our services
            </h2>
            <ul className="mt-6 space-y-4">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="text-sm text-ivory-muted transition-colors duration-300 hover:text-ivory">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-terracotta">
              Visit our studio
            </h2>

            <div className="mt-6 space-y-5 text-sm text-ivory-muted">
              <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className="group flex gap-3 leading-6 transition-colors hover:text-ivory">
                <MapPin size={18} className="mt-1 shrink-0 text-terracotta" />
                <span>
                  {siteConfig.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </span>
              </a>

              <div className="flex gap-3 leading-6">
                <Clock size={18} className="mt-1 shrink-0 text-terracotta" />
                <span>
                  {siteConfig.hours.days}
                  <br />
                  {siteConfig.hours.time}
                </span>
              </div>

              <a href={`mailto:${siteConfig.email}`} className="inline-block break-all transition-colors hover:text-ivory">
                {siteConfig.email}
              </a>
            </div>

            <ButtonLink href="#booking" variant="terracotta" size="sm" className="mt-7">
              Start your project
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-ivory/15 py-6 text-xs">
          <Link href="/privacy-policy" className="text-ivory-muted transition-colors hover:text-ivory">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="text-ivory-muted transition-colors hover:text-ivory">
            Terms & Conditions
          </Link>
          <CookiePreferencesButton />
        </div>
        <div className="flex flex-col gap-6 pt-8 text-xs text-ivory-muted md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear initialYear={siteConfig.copyrightYear} /> Styling Spaces. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="https://www.instagram.com/aravindwebstudio/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-terracotta">{siteConfig.credit}</a>
            <a href="#home" className="group inline-flex items-center gap-2 uppercase tracking-[0.15em] transition-colors hover:text-ivory">
              Back to top
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-terracotta group-hover:text-terracotta">
                <MoveUpRight size={14} className="-rotate-45" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


