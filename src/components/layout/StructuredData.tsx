import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { faqs } from "@/data/faq";

export function StructuredData() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InteriorDesigner"],
    "@id": `${siteConfig.url}/#studio`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone.href.replace("tel:", ""),
    image: `${siteConfig.url}/images/hero.jpg`,
    logo: `${siteConfig.url}/images/styling-logo.jpg`,
    priceRange: "Contact for pricing",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.building}, ${siteConfig.address.line}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      address: `${siteConfig.address.city}, ${siteConfig.address.state}, India`,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    sameAs: [siteConfig.instagram],
    knowsAbout: services.map((service) => service.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior Design Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.shortDescription,
        },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteConfig.url}/#studio` },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([business, website, faqPage]).replace(/</g, "\\u003c"),
      }}
    />
  );
}
