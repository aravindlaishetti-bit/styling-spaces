import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils";

export function FAQSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 border-t border-ink/10 bg-ivory-soft py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Questions"
              title={
                <>
                  Good to know
                  <br />
                  <span className="italic text-terracotta-deep">
                    before we begin.
                  </span>
                </>
              }
              description="A few practical answers about cost, timelines, visualisation, and how we work."
            />

            <Reveal delay={0.12}>
              <div className="mt-9 border-t border-ink/15 pt-6">
                <p className="max-w-xs text-base leading-relaxed text-muted">
                  Still have a question? Send us a message and we&apos;ll get
                  back to you during studio hours.
                </p>
                <ButtonLink
                  href={buildWhatsAppUrl(
                    "Hello Styling Spaces, I have a question about interior design.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="mt-5"
                >
                  Ask on WhatsApp
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.04}>
                <details className="group border-b border-ink/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[2px] py-6 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta [&::-webkit-details-marker]:hidden">
                    <span className="flex items-baseline gap-4">
                      <span className="text-[0.58rem] font-bold tracking-[0.16em] text-terracotta-deep">
                        0{index + 1}
                      </span>
                      <span className="font-serif text-2xl leading-snug md:text-[1.7rem]">
                        {faq.question}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="icon-circle icon-tile h-8 w-8 border border-ink/15 bg-ivory-soft text-muted group-open:rotate-45"
                    >
                      <Plus size={16} />
                    </span>
                  </summary>
                  <div className="pb-6 pl-8 pr-7">
                    <p className="max-w-xl text-base leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

