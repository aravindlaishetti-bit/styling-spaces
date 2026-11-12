import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { BookingSection } from "@/components/sections/BookingSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyChooseUs />
      <ProcessSection />
      <TestimonialsSection />
      <StatsSection />
      <FAQSection />
      <ServiceAreas />
      <BookingSection />
      <ContactSection />
    </main>
  );
}
