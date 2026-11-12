"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CircleCheck, LoaderCircle, Send, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

type ContactData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Errors = Partial<Record<keyof ContactData, string>>;

const emptyContact: ContactData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [data, setData] = useState<ContactData>({ ...emptyContact });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function updateField<K extends keyof ContactData>(field: K, value: ContactData[K]) {
    setData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function validate(): Errors {
    const next: Errors = {};
    if (data.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (data.phone && !/^\+?[0-9][0-9\s-]{8,15}$/.test(data.phone.trim())) {
      next.phone = "Enter a valid phone number.";
    }
    if (data.message.trim().length < 10) {
      next.message = "Tell us a little more about your enquiry.";
    }
    return next;
  }

  function resetForm() {
    setData({ ...emptyContact });
    setErrors({});
    setSubmitted(false);
    setWhatsappUrl("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = [
      "Hello Styling Spaces,",
      "",
      "I'd like to make an enquiry.",
      "",
      `Name: ${data.name.trim()}`,
      `Email: ${data.email.trim()}`,
      `Phone: ${data.phone.trim() || "Not provided"}`,
      "",
      `Message: ${data.message.trim()}`,
      "",
      "Sent from the Styling Spaces website contact form.",
    ].join("\n");

    const url = buildWhatsAppUrl(message);
    setWhatsappUrl(url);
    setLoading(true);
    window.open(url, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden border border-ink/10 bg-ivory p-7 text-ink shadow-[0_24px_70px_rgba(41,41,41,0.08)] md:p-11">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-terracotta/10 blur-3xl" />
        <span className="icon-circle icon-tile relative h-14 w-14 border border-terracotta/30 bg-terracotta/10 text-terracotta-deep sm:h-16 sm:w-16">
          <CircleCheck aria-hidden="true" size={28} strokeWidth={1.4} />
        </span>
        <p className="relative mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-terracotta-deep">
          Enquiry prepared
        </p>
        <h3 className="relative mt-3 max-w-lg font-serif text-4xl leading-tight md:text-5xl">
          Your conversation starts here.
        </h3>
        <p className="relative mt-4 max-w-md text-sm leading-7 text-muted">
          Your enquiry is ready in WhatsApp. Send the prefilled message to complete your request. Your details are not stored on this website.
        </p>
        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl} target="_blank" rel="noreferrer" variant="primary">
            Open WhatsApp again <ArrowUpRight size={15} />
          </ButtonLink>
          <Button type="button" variant="secondary" onClick={resetForm} withIcon={false}>
            Send another message
          </Button>
        </div>
        <p className="relative mt-7 text-xs text-muted">
          Prefer email?{" "}
          <a href={`mailto:${siteConfig.email}`} className="link-underline text-ink">
            {siteConfig.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-ink/10 bg-ivory p-6 text-ink shadow-[0_24px_70px_rgba(41,41,41,0.08)] sm:p-8 md:p-11">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-terracotta/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-terracotta-deep">
            Enquiry form
          </p>
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted">
            Tell us your vision
          </span>
        </div>

        <h3 id="contact-form-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-5xl">
          Let's create something <span className="italic text-terracotta-deep">beautiful.</span>
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
          Share a little about your space. Our team will be happy to understand your ideas and help you take the next step.
        </p>

        <form
          className="mt-9 grid gap-x-7 gap-y-7 sm:grid-cols-2"
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby="contact-form-title"
        >
          <Field label="Your name" htmlFor="contactName" error={errors.name}>
            <input
              id="contactName"
              name="name"
              type="text"
              autoComplete="name"
              className="field-input"
              value={data.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contactName-error" : undefined}
              placeholder="Enter your full name"
            />
          </Field>

          <Field label="Email address" htmlFor="contactEmail" error={errors.email}>
            <input
              id="contactEmail"
              name="email"
              type="email"
              autoComplete="email"
              className="field-input"
              value={data.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contactEmail-error" : undefined}
              placeholder="you@example.com"
            />
          </Field>

          <Field label="Phone number" htmlFor="contactPhone" error={errors.phone} className="sm:col-span-2">
            <input
              id="contactPhone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="field-input"
              value={data.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "contactPhone-error" : undefined}
              placeholder="+91 00000 00000"
            />
          </Field>

          <Field label="Tell us about your space" htmlFor="contactMessage" error={errors.message} className="sm:col-span-2">
            <textarea
              id="contactMessage"
              name="message"
              rows={5}
              className="field-input"
              value={data.message}
              onChange={(event) => updateField("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contactMessage-error" : undefined}
              placeholder="What would you love to create? Tell us about your ideas, requirements or timeline..."
            />
          </Field>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={loading}
              icon={loading ? LoaderCircle : Send}
              iconClassName={loading ? "animate-spin" : undefined}
              className="w-full sm:w-auto"
            >
              {loading ? "Preparing WhatsApp" : "Send your enquiry"}
            </Button>
            <p className="mt-4 max-w-md text-[0.72rem] leading-6 text-muted">
              Your message opens directly in WhatsApp. Nothing is stored on this website. You can also email{" "}
              <a href={`mailto:${siteConfig.email}`} className="link-underline text-ink">
                {siteConfig.email}
              </a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}



