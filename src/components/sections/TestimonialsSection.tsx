
"use client";

import { useState } from "react";
import { Pause, Play, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const extraReviews = [
  {
    id: "review-2",
    quote: "Thoughtful spaces begin with thoughtful design.",
    names: "Anonymous Client",
    project: "Interior Design",
    location: "Hyderabad",
  },
  {
    id: "review-3",
    quote: "Beautiful details can make every corner feel special.",
    names: "Anonymous Client",
    project: "Residential Interiors",
    location: "Hyderabad",
  },
  {
    id: "review-4",
    quote: "A well-designed space makes everyday living feel better.",
    names: "Anonymous Client",
    project: "Custom Interiors",
    location: "Hyderabad",
  },
];

export function TestimonialsSection() {
  const [paused, setPaused] = useState(false);

  const reviews = [
    ...testimonials.map((item) => ({
      id: item.id,
      quote: item.quote,
      names: item.names,
      project: item.project,
      location: item.location,
    })),
    ...extraReviews,
  ];

  const loopReviews = [...reviews, ...reviews];

  return (
    <section
      id="testimonials"
      data-tone="accent"
      className="scroll-mt-28 overflow-hidden bg-terracotta py-20 md:py-28"
    >
      <div className="shell">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-ink">Client stories</p>
            <h2 className="mt-4 font-serif text-5xl leading-[0.95] text-ink md:text-7xl">
              In their <span className="italic">words.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Resume reviews" : "Pause reviews"}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-ivory"
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>

      <div
        className="testimonial-marquee overflow-hidden"
              >
        <div
          className="testimonial-track flex w-max gap-5 px-3"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {loopReviews.map((review, index) => (
            <article
              key={`${review.id}-${index}`}
              className="flex w-[290px] shrink-0 flex-col justify-between rounded-2xl border border-ink/10 bg-ivory p-6 shadow-sm sm:w-[340px] md:w-[390px] md:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Quote
                    size={30}
                    strokeWidth={1.2}
                    className="text-terracotta"
                  />
                  <div className="flex gap-1 text-terracotta">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className="fill-current"
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-7 font-serif text-2xl leading-snug text-ink md:text-3xl">
                  “{review.quote}”
                </p>
              </div>

              <footer className="mt-8 border-t border-ink/15 pt-5">
                <p className="font-semibold text-ink">{review.names}</p>
                <p className="mt-1 text-xs text-muted">
                  {review.project} · {review.location}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

