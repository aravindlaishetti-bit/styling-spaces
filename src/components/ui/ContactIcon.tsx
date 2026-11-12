
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export type ContactPlatform =
  | "whatsapp"
  | "instagram"
  | "email"
  | "phone"
  | "location";

type TooltipSide = "top" | "bottom" | "left";

type PlatformConfig = {
  tile: string;
  icon: ReactNode;
  tooltip: string;
  ariaLabel: string;
  href: string;
  external: boolean;
};

const platformConfig: Record<ContactPlatform, PlatformConfig> = {
  whatsapp: {
    tile: "border-white/20 bg-[linear-gradient(145deg,#3ddc84_0%,#25d366_48%,#128c4a_100%)] text-white",
    icon: <WhatsAppIcon className="h-4 w-4" />,
    tooltip: "WhatsApp",
    ariaLabel: "Message Styling Spaces on WhatsApp",
    href: siteConfig.whatsappUrl,
    external: true,
  },

  instagram: {
    tile: "border-white/20 bg-[linear-gradient(135deg,#feda75_0%,#fa7e1e_24%,#d62976_52%,#962fbf_76%,#4f5bd5_100%)] text-white",
    icon: <InstagramIcon className="h-4 w-4" />,
    tooltip: "Instagram",
    ariaLabel: "Styling Spaces on Instagram",
    href: siteConfig.instagram,
    external: true,
  },

  email: {
    tile: "border-ink/10 bg-[linear-gradient(145deg,#faf7f1_0%,#e9e2d5_100%)] text-terracotta-deep",
    icon: (
      <Mail
        aria-hidden="true"
        strokeWidth={1.8}
        className="h-4 w-4"
      />
    ),
    tooltip: "Email",
    ariaLabel: `Email Styling Spaces at ${siteConfig.email}`,
    href: `mailto:${siteConfig.email}`,
    external: false,
  },

  phone: {
    tile: "border-white/20 bg-[linear-gradient(145deg,#3a8f69_0%,#1f7a4d_55%,#145638_100%)] text-white",
    icon: (
      <Phone
        aria-hidden="true"
        strokeWidth={1.8}
        className="h-4 w-4"
      />
    ),
    tooltip: "Call",
    ariaLabel: `Call Styling Spaces at ${siteConfig.phone.display}`,
    href: siteConfig.phone.href,
    external: false,
  },

  location: {
    tile: "border-white/20 bg-[linear-gradient(145deg,#f3b29a_0%,#e78260_58%,#d76f4d_100%)] text-ink",
    icon: (
      <MapPin
        aria-hidden="true"
        strokeWidth={1.8}
        className="h-4 w-4"
      />
    ),
    tooltip: "Location",
    ariaLabel: "Open the Styling Spaces studio location in Google Maps",
    href: siteConfig.mapsUrl,
    external: true,
  },
};

const defaultPlatforms: ContactPlatform[] = [
  "whatsapp",
  "instagram",
  "email",
  "phone",
  "location",
];

type ContactIconSize = "sm" | "md" | "lg";

const tileSizes: Record<ContactIconSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-11 w-11",
};

const tileBase =
  "icon-circle icon-tile relative flex shrink-0 items-center justify-center border";

const tooltipPosition: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 mb-3 -translate-x-1/2",
  bottom: "left-1/2 top-full mt-3 -translate-x-1/2",
  left: "right-full top-1/2 mr-3 -translate-y-1/2",
};

export function ContactIconTile({
  platform,
  size = "md",
  className,
}: {
  platform: ContactPlatform;
  size?: ContactIconSize;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      data-contact-icon={platform}
      data-icon-size={size}
      className={cn(
        tileBase,
        "rounded-full",
        tileSizes[size],
        platformConfig[platform].tile,
        className,
      )}
    >
      {platformConfig[platform].icon}
    </span>
  );
}

type ContactIconLinkProps = {
  platform: ContactPlatform;
  size?: ContactIconSize;
  href?: string;
  label?: string;
  tooltip?: string;
  tooltipSide?: TooltipSide;
  className?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "className" | "href" | "aria-label"
>;

export function ContactIconLink({
  platform,
  size = "md",
  href,
  label,
  tooltip,
  tooltipSide = "bottom",
  className,
  ...props
}: ContactIconLinkProps) {
  const config = platformConfig[platform];
  const resolvedHref = href ?? config.href;

  const isExternal =
    config.external || /^https?:\/\//.test(resolvedHref);

  const externalProps = isExternal
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <a
      href={resolvedHref}
      aria-label={label ?? config.ariaLabel}
      data-contact-icon={platform}
      data-icon-size={size}
      className={cn(
        "group icon-circle icon-tile relative flex shrink-0 items-center justify-center rounded-full border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-deep focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
        tileSizes[size],
        config.tile,
        className,
      )}
      {...externalProps}
      {...props}
    >
      {config.icon}

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute z-20 hidden whitespace-nowrap rounded-full border border-ivory/20 bg-ink px-2.5 py-1.5 text-[0.5rem] font-bold uppercase tracking-[0.16em] text-ivory opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.24)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block",
          tooltipPosition[tooltipSide],
        )}
      >
        {tooltip ?? config.tooltip}
      </span>
    </a>
  );
}

export function ContactIconGroup({
  platforms = defaultPlatforms,
  size = "md",
  tooltipSide = "bottom",
  className,
}: {
  platforms?: readonly ContactPlatform[];
  size?: ContactIconSize;
  tooltipSide?: TooltipSide;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 sm:gap-2.5",
        className,
      )}
    >
      {platforms.map((platform) => (
        <ContactIconLink
          key={platform}
          platform={platform}
          size={size}
          tooltipSide={tooltipSide}
        />
      ))}
    </div>
  );
}
