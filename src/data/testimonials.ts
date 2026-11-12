export type Testimonial = {
  id: string;
  quote: string;
  names: string;
  project: string;
  location: string;
  image: string;
  alt: string;
  suppliedByClient: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "ananya-vikram",
    quote:
      "From concept to handover, Styling Spaces made our home feel bespoke. Every corner tells a story.",
    names: "Ananya & Vikram",
    project: "Skyline Penthouse",
    location: "Gachibowli",
    image: "/images/testimonial.jpg",
    alt: "Warm, thoughtfully styled interior living space",
    suppliedByClient: true,
  },
];
