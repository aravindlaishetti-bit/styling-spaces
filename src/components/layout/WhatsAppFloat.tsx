"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContactIconLink } from "@/components/ui/ContactIcon";
import { buildWhatsAppUrl } from "@/lib/utils";

const consultationMessage =
  "Hi Styling Spaces, I would like to book a free interior design consultation. Please share more details.";

export function WhatsAppFloat() {
  const reduceMotion = useReducedMotion();
  const href = buildWhatsAppUrl(consultationMessage);

  return (
    <motion.div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] max-w-[calc(100vw-2rem)] md:bottom-6 md:right-6"
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: reduceMotion ? 0 : 1.2,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center gap-2 sm:gap-2.5">
        <ContactIconLink platform="email" size="lg" tooltipSide="top" />
        <ContactIconLink platform="phone" size="lg" tooltipSide="top" />
        <ContactIconLink
          platform="whatsapp"
          size="lg"
          href={href}
          tooltipSide="top"
          label="Book a free interior design consultation on WhatsApp"
          tooltip="Book on WhatsApp"
          data-whatsapp-float=""
        />
      </div>
    </motion.div>
  );
}
