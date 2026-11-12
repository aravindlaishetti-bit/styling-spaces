
export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  inclusions: string[];
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: "modular-kitchen",
    title: "Modular Kitchen",
    shortDescription: "Beautiful kitchens designed around your everyday lifestyle.",
    description: "Thoughtfully planned modular kitchens combining elegant finishes, intelligent storage and practical layouts.",
    inclusions: [
      "Kitchen layout and work-zone planning",
      "Modular cabinets and storage",
      "Countertop and backsplash selection",
      "Lighting and hardware coordination",
    ],
    image: "/images/service-kitchen.jpg",
    alt: "Modern modular kitchen interior",
  },
  {
    id: "pooja-room",
    title: "Pooja Room Designs",
    shortDescription: "Peaceful prayer spaces with beautiful traditional detailing.",
    description: "Create a dedicated spiritual corner with elegant materials, warm lighting and carefully designed details.",
    inclusions: [
      "Custom pooja unit designs",
      "Decorative back panels",
      "Traditional and contemporary finishes",
      "Ambient lighting solutions",
    ],
    image: "/images/service-pooja.jpg",
    alt: "Interior design inspiration for a pooja space",
  },
  {
    id: "bedroom-interiors",
    title: "Bedroom Interiors",
    shortDescription: "Comfortable personal spaces with timeless elegance.",
    description: "Bedrooms designed as relaxing retreats with thoughtful furniture layouts, beautiful finishes and functional storage.",
    inclusions: [
      "Bed and furniture planning",
      "Wardrobe integration",
      "Bedside and ambient lighting",
      "Soft furnishing selection",
    ],
    image: "/images/service-bedroom.jpg",
    alt: "Elegant bedroom interior",
  },
  {
    id: "tv-units",
    title: "TV Units & Media Walls",
    shortDescription: "Statement entertainment walls with smart storage.",
    description: "Transform your living room with custom TV units, elegant wall panels and integrated storage solutions.",
    inclusions: [
      "Custom TV unit designs",
      "Decorative wall panels",
      "Floating storage cabinets",
      "Lighting and finish selection",
    ],
    image: "/images/service-tv-unit.jpg",
    alt: "Modern interior design inspiration",
  },
  {
    id: "living-room",
    title: "Living Room Interiors",
    shortDescription: "Welcoming spaces designed for everyday moments.",
    description: "Beautifully composed living spaces balancing furniture, textures, lighting and carefully selected details.",
    inclusions: [
      "Furniture layout planning",
      "Feature wall designs",
      "Custom furniture concepts",
      "Decor and styling direction",
    ],
    image: "/images/service-living.jpg",
    alt: "Contemporary living room interior",
  },
  {
    id: "washbasin-designs",
    title: "Washbasin Designs",
    shortDescription: "Elegant washbasin areas with refined finishes.",
    description: "Give your bathroom and wash areas a sophisticated look through custom vanities, mirrors and premium materials.",
    inclusions: [
      "Custom vanity designs",
      "Mirror and lighting concepts",
      "Storage integration",
      "Material and finish selection",
    ],
    image: "/images/service-washbasin.jpg",
    alt: "Modern bathroom vanity inspiration",
  },
  {
    id: "wardrobe-solutions",
    title: "Wardrobe Solutions",
    shortDescription: "Beautiful storage designed around your needs.",
    description: "Made-to-measure wardrobes with intelligent internal organization, elegant shutters and quality hardware.",
    inclusions: [
      "Internal storage planning",
      "Custom shutter designs",
      "Mirror and lighting integration",
      "Hardware and finish selection",
    ],
    image: "/images/service-wardrobe.jpg",
    alt: "Premium built-in wardrobe interior",
  },
  {
    id: "false-ceiling",
    title: "False Ceiling & Lighting",
    shortDescription: "Beautiful ceilings that transform the atmosphere.",
    description: "Enhance your interiors with architectural ceiling details, layered lighting and carefully planned illumination.",
    inclusions: [
      "False ceiling designs",
      "Cove and profile lighting",
      "Decorative lighting concepts",
      "Electrical and lighting coordination",
    ],
    image: "/images/service-ceiling.jpg",
    alt: "Modern false ceiling with integrated lighting",
  },
];
