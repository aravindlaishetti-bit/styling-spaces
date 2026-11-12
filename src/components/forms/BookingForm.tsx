"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  CircleCheck,
  LoaderCircle,
  Send,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  buildWhatsAppUrl,
  cn,
  formatDateForMessage,
  todayISO,
} from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

type BookingData = {
  fullName: string;
  whatsapp: string;
  city: string;
  propertyType: string;
  spaceType: string;
  area: string;
  requirements: string;
  referenceFiles: string[];
  date: string;
  time: string;
  notes: string;
};

type Errors = Partial<Record<keyof BookingData, string>>;

const emptyBooking: BookingData = {
  fullName: "",
  whatsapp: "",
  city: "",
  propertyType: "",
  spaceType: "",
  area: "",
  requirements: "",
  referenceFiles: [],
  date: "",
  time: "",
  notes: "",
};

const stepLabels = ["About you", "Your space", "Schedule"];

function validateStep(step: number, data: BookingData): Errors {
  const errors: Errors = {};

  if (step === 1) {
    if (data.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name.";
    }
    if (!/^\+?[0-9][0-9\s-]{8,15}$/.test(data.whatsapp.trim())) {
      errors.whatsapp = "Enter a valid WhatsApp number with country code.";
    }
    if (!data.city.trim()) {
      errors.city = "Please enter your city.";
    }
  }

  if (step === 2) {
    if (!data.propertyType) {
      errors.propertyType = "Select a property type.";
    }
    if (!data.spaceType) {
      errors.spaceType = "Select the space you need designed.";
    }
    if (data.area && !/^\d+(\.\d+)?$/.test(data.area.trim())) {
      errors.area = "Enter the area in sqft using numbers only.";
    }
    if (data.requirements.trim().length < 10) {
      errors.requirements = "Tell us a little about what you need.";
    }
  }

  if (step === 3) {
    if (!data.date) {
      errors.date = "Choose a preferred date.";
    } else if (data.date < todayISO()) {
      errors.date = "Choose today or a future date.";
    }
    if (!data.time) {
      errors.time = "Choose a preferred time.";
    }
  }

  return errors;
}

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

function Field({
  label,
  htmlFor,
  error,
  optional,
  className,
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {optional ? (
          <span className="ml-2 font-normal normal-case tracking-normal text-muted">
            (optional)
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({ ...emptyBooking });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [minDate, setMinDate] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setMinDate(todayISO()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function updateField<K extends keyof BookingData>(
    field: K,
    value: BookingData[K],
  ) {
    setData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function goNext() {
    const nextErrors = validateStep(step, data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep((current) => Math.min(3, current + 1));
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
  }

  function resetForm() {
    setData({ ...emptyBooking });
    setErrors({});
    setStep(1);
    setSubmitted(false);
    setWhatsappUrl("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstStepErrors = validateStep(1, data);
    const secondStepErrors = validateStep(2, data);
    const thirdStepErrors = validateStep(3, data);
    const allErrors = {
      ...firstStepErrors,
      ...secondStepErrors,
      ...thirdStepErrors,
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      if (Object.keys(firstStepErrors).length > 0) {
        setStep(1);
      } else if (Object.keys(secondStepErrors).length > 0) {
        setStep(2);
      }
      return;
    }

    const message = [
      "Hello Styling Spaces,",
      "",
      "I'd like to book a free consultation.",
      "",
      `Name: ${data.fullName.trim()}`,
      `WhatsApp: ${data.whatsapp.trim()}`,
      `City: ${data.city.trim()}`,
      "",
      `Property type: ${data.propertyType}`,
      `Space type: ${data.spaceType}`,
      `Approximate area: ${data.area ? `${data.area} sqft` : "Not specified"}`,
      `Requirements: ${data.requirements.trim()}`,
      `Reference images: ${
        data.referenceFiles.length > 0
          ? data.referenceFiles.join(", ")
          : "None selected"
      }`,
      "",
      `Preferred date: ${formatDateForMessage(data.date)}`,
      `Preferred time: ${data.time}`,
      `Additional notes: ${data.notes.trim() || "None"}`,
      "",
      "Sent from the Styling Spaces website booking form.",
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
      <div className="border border-ink/10 bg-ivory p-7 text-ink shadow-[0_28px_90px_rgba(0,0,0,0.18)] md:p-10">
        <span className="icon-circle icon-tile h-14 w-14 border border-terracotta/30 bg-terracotta/10 text-terracotta-deep sm:h-16 sm:w-16">
          <CircleCheck aria-hidden="true" size={28} strokeWidth={1.4} />
        </span>
        <h3 className="mt-5 font-serif text-4xl leading-none">
          Your enquiry is ready in WhatsApp.
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          We opened WhatsApp with your consultation details prefilled. Send the
          message to complete your request. This website does not store your
          details.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            variant="primary"
          >
            Open WhatsApp again
          </ButtonLink>
          <Button
            type="button"
            variant="secondary"
            onClick={resetForm}
            withIcon={false}
          >
            Start another enquiry
          </Button>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted">
          If WhatsApp did not open, use the button above. You can also email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-underline text-ink"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="border border-ink/10 bg-ivory p-6 text-ink shadow-[0_28px_90px_rgba(0,0,0,0.18)] md:p-9">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-terracotta-deep">
            Consultation request
          </p>
          <h3
            id="booking-form-title"
            className="mt-2 font-serif text-3xl leading-none md:text-4xl"
          >
            Tell us about your space.
          </h3>
        </div>
        <p className="border border-ink/15 px-3 py-1.5 text-[0.56rem] font-bold uppercase tracking-[0.14em] text-muted-strong">
          Free - 60 minutes
        </p>
      </div>

      <ol
        className="mt-7 grid grid-cols-3 gap-3"
        aria-label="Booking progress"
      >
        {stepLabels.map((label, index) => {
          const number = index + 1;
          const isActive = step === number;
          const isComplete = step > number;

          return (
            <li key={label} aria-current={isActive ? "step" : undefined}>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "icon-circle h-8 w-8 border text-[0.6rem] font-bold transition-colors",
                    isActive
                      ? "border-terracotta bg-terracotta text-ink"
                      : isComplete
                        ? "border-ink bg-ink text-ivory"
                        : "border-ink/30 text-muted",
                  )}
                >
                  {isComplete ? (
                    <Check aria-hidden="true" size={12} />
                  ) : (
                    number
                  )}
                </span>
                <span
                  className={cn(
                    "text-[0.56rem] font-bold uppercase leading-tight tracking-[0.1em]",
                    isActive ? "text-ink" : "text-muted",
                  )}
                >
                  {label}
                </span>
              </div>
              <div className="mt-3 h-px bg-ink/15">
                <div
                  className={cn(
                    "h-full bg-terracotta transition-all duration-300",
                    isComplete ? "w-full" : isActive ? "w-1/2" : "w-0",
                  )}
                />
              </div>
            </li>
          );
        })}
      </ol>

      <form
        className="mt-8"
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="booking-form-title"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Full name"
                  htmlFor="fullName"
                  error={errors.fullName}
                >
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    className="field-input"
                    value={data.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    placeholder="Your name"
                  />
                </Field>

                <Field
                  label="WhatsApp number"
                  htmlFor="whatsapp"
                  error={errors.whatsapp}
                >
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="field-input"
                    value={data.whatsapp}
                    onChange={(event) =>
                      updateField("whatsapp", event.target.value)
                    }
                    aria-invalid={Boolean(errors.whatsapp)}
                    aria-describedby={
                      errors.whatsapp ? "whatsapp-error" : undefined
                    }
                    placeholder="+91 00000 00000"
                  />
                </Field>

                <Field
                  label="City"
                  htmlFor="city"
                  error={errors.city}
                  className="sm:col-span-2"
                >
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="field-input"
                    value={data.city}
                    onChange={(event) =>
                      updateField("city", event.target.value)
                    }
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? "city-error" : undefined}
                    placeholder="Hyderabad"
                  />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Property type"
                  htmlFor="propertyType"
                  error={errors.propertyType}
                >
                  <div className="relative">
                    <select
                      id="propertyType"
                      name="propertyType"
                      className="field-input pr-10"
                      value={data.propertyType}
                      onChange={(event) =>
                        updateField("propertyType", event.target.value)
                      }
                      aria-invalid={Boolean(errors.propertyType)}
                      aria-describedby={
                        errors.propertyType
                          ? "propertyType-error"
                          : undefined
                      }
                    >
                      <option value="">Select property type</option>
                      {siteConfig.booking.propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <span className="icon-circle pointer-events-none absolute right-0 top-1/2 h-7 w-7 -translate-y-1/2 border border-ink/10 bg-ivory-soft text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_10px_-8px_rgba(41,41,41,0.35)]">
                      <ChevronDown aria-hidden="true" size={14} />
                    </span>
                  </div>
                </Field>

                <Field
                  label="Space type"
                  htmlFor="spaceType"
                  error={errors.spaceType}
                >
                  <div className="relative">
                    <select
                      id="spaceType"
                      name="spaceType"
                      className="field-input pr-10"
                      value={data.spaceType}
                      onChange={(event) =>
                        updateField("spaceType", event.target.value)
                      }
                      aria-invalid={Boolean(errors.spaceType)}
                      aria-describedby={
                        errors.spaceType ? "spaceType-error" : undefined
                      }
                    >
                      <option value="">Select space type</option>
                      {siteConfig.booking.spaceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <span className="icon-circle pointer-events-none absolute right-0 top-1/2 h-7 w-7 -translate-y-1/2 border border-ink/10 bg-ivory-soft text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_10px_-8px_rgba(41,41,41,0.35)]">
                      <ChevronDown aria-hidden="true" size={14} />
                    </span>
                  </div>
                </Field>

                <Field
                  label="Approximate area"
                  htmlFor="area"
                  error={errors.area}
                  optional
                >
                  <div className="relative">
                    <input
                      id="area"
                      name="area"
                      type="text"
                      inputMode="numeric"
                      className="field-input pr-12"
                      value={data.area}
                      onChange={(event) =>
                        updateField("area", event.target.value)
                      }
                      aria-invalid={Boolean(errors.area)}
                      aria-describedby={errors.area ? "area-error" : undefined}
                      placeholder="1200"
                    />
                    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-muted">
                      sqft
                    </span>
                  </div>
                </Field>

                <Field
                  label="Reference images"
                  htmlFor="referenceFiles"
                  optional
                >
                  <input
                    id="referenceFiles"
                    name="referenceFiles"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) =>
                      updateField(
                        "referenceFiles",
                        Array.from(event.target.files ?? []).map(
                          (file) => file.name,
                        ),
                      )
                    }
                    className="block w-full cursor-pointer text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2.5 file:text-[0.58rem] file:font-bold file:uppercase file:tracking-[0.12em] file:text-ivory file:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_8px_18px_-14px_rgba(41,41,41,0.45)]"
                  />
                  <p className="mt-2 text-[0.7rem] leading-relaxed text-muted">
                    File names are included in your WhatsApp message. We&apos;ll
                    request the actual images there.
                  </p>
                  {data.referenceFiles.length > 0 ? (
                    <p className="mt-1 text-[0.7rem] text-muted-strong">
                      {data.referenceFiles.join(", ")}
                    </p>
                  ) : null}
                </Field>

                <Field
                  label="Requirements"
                  htmlFor="requirements"
                  error={errors.requirements}
                  className="sm:col-span-2"
                >
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    className="field-input"
                    value={data.requirements}
                    onChange={(event) =>
                      updateField("requirements", event.target.value)
                    }
                    aria-invalid={Boolean(errors.requirements)}
                    aria-describedby={
                      errors.requirements ? "requirements-error" : undefined
                    }
                    placeholder="Tell us about the rooms, style, priorities, and any timeline you have in mind."
                  />
                </Field>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Preferred date"
                  htmlFor="date"
                  error={errors.date}
                >
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={minDate}
                    className="field-input"
                    value={data.date}
                    onChange={(event) =>
                      updateField("date", event.target.value)
                    }
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "date-error" : undefined}
                  />
                </Field>

                <Field
                  label="Preferred time"
                  htmlFor="time"
                  error={errors.time}
                >
                  <div className="relative">
                    <select
                      id="time"
                      name="time"
                      className="field-input pr-10"
                      value={data.time}
                      onChange={(event) =>
                        updateField("time", event.target.value)
                      }
                      aria-invalid={Boolean(errors.time)}
                      aria-describedby={
                        errors.time ? "time-error" : undefined
                      }
                    >
                      <option value="">Select a time</option>
                      {siteConfig.booking.timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <span className="icon-circle pointer-events-none absolute right-0 top-1/2 h-7 w-7 -translate-y-1/2 border border-ink/10 bg-ivory-soft text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_10px_-8px_rgba(41,41,41,0.35)]">
                      <ChevronDown aria-hidden="true" size={14} />
                    </span>
                  </div>
                </Field>

                <Field
                  label="Additional notes"
                  htmlFor="notes"
                  optional
                  className="sm:col-span-2"
                >
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    className="field-input"
                    value={data.notes}
                    onChange={(event) =>
                      updateField("notes", event.target.value)
                    }
                    placeholder="Anything else we should know before we meet?"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <p className="border border-ink/15 bg-ivory-soft p-4 text-[0.75rem] leading-relaxed text-muted">
                    Submitting opens WhatsApp with your details prefilled.
                    Nothing is stored on this website. A booking is only
                    confirmed once the studio replies on WhatsApp.
                  </p>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              icon={ChevronLeft}
              iconPosition="start"
              className="justify-start text-[0.62rem]"
            >
              Back
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={goNext}
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              icon={loading ? LoaderCircle : Send}
              iconClassName={loading ? "animate-spin" : undefined}
              className="w-full sm:w-auto"
            >
              {loading ? "Preparing WhatsApp" : "Send via WhatsApp"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

