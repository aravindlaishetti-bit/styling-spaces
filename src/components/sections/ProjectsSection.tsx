
"use client";

import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { instagramReels } from "@/data/reels";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { cn } from "@/lib/utils";

const reelImages: Record<string, string> = {
  DdRRZroPqkx: "/images/service-office.jpg",
  DaadyarBxSs: "/images/styling-logo.jpg",
  DZe17liv9ki: "/images/process.jpg",
  "DXCLxUdE-ZL": "/images/about-1.jpg",
  DWLf0eQjT9a: "/images/service-living.jpg",
  DVp6pIFE_62: "/images/service-home.jpg",
  DVlhVHYk3sD: "/images/service-pooja.jpg",
  DVjHPAWEwLD: "/images/hero-alt.jpg",
  "DSNpMM9k-gH": "/images/service-ceiling.jpg",
  DQZnvqxE2gC: "/images/about-2.jpg",
  DPt6b32kxGI: "/images/service-bedroom.jpg",
  DHWEN0rIbMW: "/images/service-washbasin.jpg",
  "C-p_oJmPVwF": "/images/service-wardrobe.jpg",
};

function ReelCard({
  reel,
  index,
}: {
  reel: (typeof instagramReels)[number];
  index: number;
}) {
  const image = reelImages[reel.id] || "/images/hero.jpg";

  return (
    <Reveal delay={(index % 4) * 0.06}>
      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${reel.title} on Instagram`}
        className="group relative block overflow-hidden rounded-[1.5rem] bg-sand outline-none transition-all duration-500 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-terracotta-deep focus-visible:ring-offset-4"
      >
        <div
          className={cn(
            "relative aspect-[4/5] w-full overflow-hidden",
            index % 4 === 1 && "rounded-bl-[3.5rem]",
            index % 4 === 2 && "rounded-tr-[3.5rem]",
          )}
        >
          <Image
            src={image}
            alt={reel.title}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

          <span className="absolute left-4 top-4 text-[0.62rem] font-semibold tracking-[0.2em] text-white/90">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/15 text-white backdrop-blur-md">
            <InstagramIcon className="h-4 w-4" />
          </span>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
            <h3 className="max-w-[85%] font-serif text-xl leading-tight text-white sm:text-2xl">
              {reel.title}
            </h3>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory text-ink shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white">
              <Play
                aria-hidden="true"
                size={15}
                fill="currentColor"
                className="ml-0.5"
              />
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-28 overflow-hidden bg-ivory py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-ink/15 pb-5 md:mb-14">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-terracotta-deep">
              Styling Spaces
            </p>
            <p className="mt-1 font-serif text-2xl text-ink md:text-3xl">
              Instagram Reels
            </p>
          </div>

          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Styling Spaces Instagram profile"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:border-terracotta-deep hover:bg-terracotta-deep hover:text-white"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {instagramReels.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}


