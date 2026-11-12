import { siteConfig } from "@/data/site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function buildWhatsAppUrl(message: string) {
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function formatDateForMessage(value: string) {
  if (!value) return "To be confirmed";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0];
}
