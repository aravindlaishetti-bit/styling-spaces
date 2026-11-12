import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/layout/StructuredData";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Styling Spaces | Luxury Interior Design Studio in Hyderabad",
    template: "%s | Styling Spaces",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "interior designer Hyderabad",
    "luxury interior design",
    "modular kitchen Hyderabad",
    "home interiors Tellapur",
    "interior design studio Hyderabad",
    "residential interior designer",
    "office interiors Hyderabad",
  ],
  authors: [{ name: siteConfig.name }],
  creator: "Aravind Web Studio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: siteConfig.name,
    title: "Styling Spaces | Luxury Interior Design Studio in Hyderabad",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 2200,
        height: 1650,
        alt: "Warm contemporary interior by Styling Spaces",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styling Spaces | Luxury Interior Design Studio in Hyderabad",
    description: siteConfig.description,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Interior Design",
};

export const viewport: Viewport = {
  themeColor: "#F3EFE6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <a href="#main" data-no-smooth="true" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Preloader />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
        <StructuredData />
      </body>
    </html>
  );
}
