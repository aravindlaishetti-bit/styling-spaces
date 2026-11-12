export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "We begin with a conversation about your space, lifestyle, priorities, and investment. This helps us understand the brief before any design work starts.",
  },
  {
    number: "02",
    title: "Site Visit",
    description:
      "We visit the site to study dimensions, light, structure, and services. Accurate measurements and a clear understanding of the space inform every decision that follows.",
  },
  {
    number: "03",
    title: "3D Design",
    description:
      "You see the design before it is built. Layouts, materials, and lighting are developed into visualisations so you can review the direction with confidence.",
  },
  {
    number: "04",
    title: "Material Selection",
    description:
      "Together we refine finishes, fixtures, hardware, and furniture. Every selection is considered for durability, maintenance, and how it will feel in the finished space.",
  },
  {
    number: "05",
    title: "Execution",
    description:
      "Our team coordinates site work, vendors, and quality checks. A dedicated project manager keeps the schedule, details, and communication moving.",
  },
  {
    number: "06",
    title: "Final Handover",
    description:
      "We complete the finishing touches, review every detail with you, and hand over a space that is ready to be lived in and enjoyed.",
  },
];
