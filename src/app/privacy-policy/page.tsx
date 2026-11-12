import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Styling Spaces handles your personal information, enquiries, WhatsApp communications and website preferences.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Information we collect",
    content: (
      <>
        <p>When you use our contact or booking forms, you may choose to provide information such as:</p>
        <ul>
          <li>Your name, email address and phone or WhatsApp number.</li>
          <li>Your city, property type, space type and approximate area.</li>
          <li>Your interior design requirements, preferred consultation date and time, and additional notes.</li>
          <li>Names of reference image files selected in the booking form. The website does not upload the actual image files through this form.</li>
        </ul>
        <p>You can also contact us directly using the contact details and external links provided on this website.</p>
      </>
    ),
  },
  {
    title: "2. How our enquiry forms work",
    content: (
      <>
        <p>Our contact and booking forms prepare a message and open WhatsApp with the information you entered. You must choose to send that message in WhatsApp to complete your enquiry.</p>
        <p>Form submissions are not sent to or stored in a database by this website. Information you enter remains in your browser while you use the form. Opening WhatsApp does not itself mean that your message has been sent.</p>
        <p>Once you send a message, WhatsApp and its operator, Meta, process that information under their own terms and privacy policies. We may use the information you send to respond to your enquiry and discuss your project.</p>
      </>
    ),
  },
  {
    title: "3. How we use your information",
    content: (
      <>
        <p>Information you voluntarily send to us may be used to:</p>
        <ul>
          <li>Respond to enquiries and consultation requests.</li>
          <li>Understand your space, design preferences and project requirements.</li>
          <li>Communicate about services, estimates, appointments and project discussions.</li>
          <li>Provide customer support and maintain our business communications.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </>
    ),
  },
  {
    title: "4. Cookies and browser storage",
    content: (
      <>
        <p>This website may use essential browser storage to remember your cookie consent and preferences. These preferences help the website respect your choices when you return.</p>
        <p>Optional analytics or marketing technologies are not activated merely because you visit this website. If such technologies are introduced, they should only operate after the relevant consent has been given, and this policy will be updated to identify the applicable services and purposes.</p>
        <p>You can use the Cookie Preferences control on the website to review or change your optional choices. You can also clear locally stored website data through your browser settings; doing so may cause the consent notice to appear again.</p>
      </>
    ),
  },
  {
    title: "5. Third-party services and links",
    content: (
      <>
        <p>Our website may link to services such as WhatsApp, Instagram and Google Maps. When you follow these links or interact with those services, the relevant provider may collect and process information according to its own privacy policy.</p>
        <p>We do not control the privacy practices, security or content of third-party services. Please review their policies before sharing information with them.</p>
      </>
    ),
  },
  {
    title: "6. Data storage and security",
    content: (
      <>
        <p>Our website forms do not submit enquiry details to a website database. Messages that you choose to send through WhatsApp or email may remain in those services and in our business communications for as long as reasonably necessary to handle the enquiry or related business requirements.</p>
        <p>We take reasonable care when handling information shared with us. However, no website, internet transmission or electronic storage method can be guaranteed to be completely secure.</p>
      </>
    ),
  },
  {
    title: "7. Your choices and rights",
    content: (
      <>
        <p>You can choose which information to provide through our forms. You may also contact us to request access to, correction of, or deletion of personal information you have shared with us, subject to applicable legal requirements.</p>
        <p>You can change your optional cookie preferences at any time using the Cookie Preferences control on this website.</p>
      </>
    ),
  },
  {
    title: "8. Children's privacy",
    content: (
      <p>Our website and services are intended for people seeking interior design services. We do not knowingly seek to collect personal information from children. If you believe a child has shared personal information with us, please contact us.</p>
    ),
  },
  {
    title: "9. Changes to this policy",
    content: (
      <p>We may update this Privacy Policy when our website, services or information practices change. The latest revision date will be displayed at the top of this page.</p>
    ),
  },
  {
    title: "10. Contact us",
    content: (
      <>
        <p>If you have questions about this Privacy Policy or how your information is handled, contact Styling Spaces:</p>
        <ul>
          <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
          <li>Phone: <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a></li>
          <li>Address: {`${siteConfig.address.building}, ${siteConfig.address.line}, ${siteConfig.address.city}, ${siteConfig.address.state} - ${siteConfig.address.postalCode}, ${siteConfig.address.country}`}</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="bg-ivory text-ink">
      <section className="shell pb-16 pt-36 md:pb-24 md:pt-48">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-deep">
          Your privacy matters
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
          Privacy <span className="italic text-terracotta-deep">Policy.</span>
        </h1>
        <p className="mt-6 text-sm text-muted">Last updated: 12 November 2026</p>
        <p className="mt-8 max-w-2xl text-base leading-8 text-muted">
          At Styling Spaces, we respect your privacy. This policy explains what
          information you may share with us, how our website forms work, and
          the choices available to you when using our website.
        </p>

        <div className="mt-14 max-w-4xl border-t border-ink/15">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-ink/15 py-8 md:py-10">
              <h2 className="font-serif text-2xl md:text-3xl">{section.title}</h2>
              <div className="policy-content mt-4 space-y-4 text-sm leading-8 text-muted">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-5 text-sm">
          <Link href="/terms-and-conditions" className="link-underline">
            Terms & Conditions
          </Link>
          <Link href="/" className="link-underline">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

