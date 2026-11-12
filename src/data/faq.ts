export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "How much does interior design cost?",
    answer:
      "Costs depend on the property size, materials, and design requirements. A typical 2BHK may range from ₹6 lakh for a minimal setup to ₹20 lakh or more for a luxury setup.",
  },
  {
    question: "How long does an interior project take?",
    answer:
      "Timelines depend on the project scope, design approvals, and execution requirements. We share a clear schedule after the site visit and design brief.",
  },
  {
    question: "Do you provide 3D designs?",
    answer:
      "Yes, 3D visualization is part of the supplied design service offering. It helps you understand proportions, materials, and lighting before execution begins.",
  },
  {
    question: "Do you work outside Hyderabad?",
    answer:
      "Our studio is based in Hyderabad and serves surrounding areas. Contact the studio to discuss project availability in other locations.",
  },
  {
    question: "Can designs be customized?",
    answer:
      "Yes, designs are tailored to the client's preferences, lifestyle, and space. Every project begins with a conversation about how you want to live or work.",
  },
];
