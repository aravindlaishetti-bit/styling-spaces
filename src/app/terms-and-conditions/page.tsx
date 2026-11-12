import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms governing your use of the Styling Spaces website, interior design enquiries and services.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Acceptance of these terms",
    paragraphs: [
      "By accessing or using the Styling Spaces website, you agree to these Terms & Conditions. If you do not agree, please discontinue using the website.",
      "These terms apply to your use of the website and do not replace any separate written agreement that may be made for an interior design project.",
    ],
  },
  {
    title: "2. About our services",
    paragraphs: [
      "Styling Spaces is an interior design studio offering design-related services and project consultations. Information on this website is provided to introduce our studio, work and services.",
      "The exact scope, specifications, timelines, deliverables and commercial terms of any project will be discussed and confirmed separately with the client.",
    ],
  },
  {
    title: "3. Enquiries and consultations",
    paragraphs: [
      "Submitting a contact or booking form prepares a message in WhatsApp. You must choose to send the message to complete your enquiry. An enquiry or preferred consultation time is not a confirmed appointment or accepted project.",
      "Our team will respond and confirm availability, requirements and next steps separately. A project begins only after the relevant scope and terms have been mutually agreed.",
    ],
  },
  {
    title: "4. Estimates, pricing and project timelines",
    paragraphs: [
      "Any prices, estimates, indicative budgets, timelines or service descriptions displayed or discussed during an initial enquiry are for general guidance unless expressly confirmed in a written proposal or agreement.",
      "Final costs and timelines may depend on the project scope, site conditions, material availability, client approvals and other project-specific factors. Any changes will be discussed with the client.",
    ],
  },
  {
    title: "5. Design concepts and visual representations",
    paragraphs: [
      "Design references, photographs, illustrations, renderings and other visual materials are intended to communicate design ideas. Actual materials, finishes, colours, dimensions and completed spaces may vary due to product availability, lighting, site conditions and execution requirements.",
      "Clients should review and approve relevant specifications, drawings, selections and proposals before work proceeds.",
    ],
  },
  {
    title: "6. Intellectual property",
    paragraphs: [
      "Unless otherwise stated, the website's text, branding, graphics, photographs, layouts and other original content belong to Styling Spaces or their respective rights holders and are protected by applicable intellectual property laws.",
      "You may view and use website content for personal, non-commercial reference. You must not reproduce, distribute, modify, publish or commercially exploit our content without prior written permission, except where permitted by law.",
      "Project-specific designs, drawings and deliverables are subject to the ownership and usage terms agreed separately with the client.",
    ],
  },
  {
    title: "7. Acceptable website use",
    paragraphs: [
      "You agree not to misuse the website, attempt unauthorized access, interfere with its operation, introduce malicious code, or use the website for unlawful, misleading or harmful purposes.",
      "We may restrict access where reasonably necessary to protect the website, our business or other users.",
    ],
  },
  {
    title: "8. Third-party services and links",
    paragraphs: [
      "The website may link to third-party services, including WhatsApp, Instagram and Google Maps. These services operate independently and are governed by their own terms, privacy policies and availability.",
      "Styling Spaces is not responsible for third-party websites, services, content or practices.",
    ],
  },
  {
    title: "9. Website availability and information",
    paragraphs: [
      "We aim to keep website information accurate and the website available, but content may occasionally be updated, changed or unavailable. We do not guarantee uninterrupted or error-free operation.",
      "To the extent permitted by applicable law, the website and its general information are provided without warranties that are not expressly stated in a separate written agreement.",
    ],
  },
  {
    title: "10. Limitation of liability",
    paragraphs: [
      "To the extent permitted by applicable law, Styling Spaces will not be liable for indirect or consequential loss arising solely from the use of, or inability to use, this website.",
      "Nothing in these terms excludes or limits any liability or consumer right that cannot lawfully be excluded or limited. Separate project agreements may contain additional terms relating to project work.",
    ],
  },
  {
    title: "11. Privacy",
    paragraphs: [
      "Your use of this website is also subject to our Privacy Policy, which explains how enquiry information, WhatsApp communications and website preferences are handled.",
    ],
  },
  {
    title: "12. Changes to these terms",
    paragraphs: [
      "We may revise these Terms & Conditions when our website or services change. Updated terms will be published on this page with a revised date. Your continued use of the website after an update constitutes use under the revised terms, subject to applicable law.",
    ],
  },
  {
    title: "13. Governing law and jurisdiction",
    paragraphs: [
      "These terms are governed by the laws of India. Subject to applicable law, courts with competent jurisdiction in Hyderabad, Telangana, India, shall have jurisdiction over disputes relating to these website terms.",
    ],
  },
  {
    title: "14. Contact information",
    paragraphs: [
      `For questions about these terms, contact Styling Spaces at ${siteConfig.email} or ${siteConfig.phone}.`,
      `Studio address: ${siteConfig.address}`,
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main id="main" className="bg-ivory text-ink">
      <section className="shell pb-16 pt-36 md:pb-24 md:pt-48">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-deep">
          Clear expectations, thoughtful design
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
          Terms & <span className="italic text-terracotta-deep">Conditions.</span>
        </h1>
        <p className="mt-6 text-sm text-muted">Last updated: 12 November 2026</p>
        <p className="mt-8 max-w-2xl text-base leading-8 text-muted">
          Please read these terms before using the Styling Spaces website.
          They explain the basic conditions for browsing our website and
          contacting our studio about interior design services.
        </p>

        <div className="mt-14 max-w-4xl border-t border-ink/15">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-ink/15 py-8 md:py-10">
              <h2 className="font-serif text-2xl md:text-3xl">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-8 text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-5 text-sm">
          <Link href="/privacy-policy" className="link-underline">
            Privacy Policy
          </Link>
          <Link href="/" className="link-underline">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
