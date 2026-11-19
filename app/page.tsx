import rawData from "@/data/templates.json";
import type { SalonTemplateData } from "@/types/templates.types";
import { fill } from "@/components/ui/text";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const templateData: SalonTemplateData = rawData;
const sectionData = templateData.categories.BeautySalon.sections;
const servicesData = sectionData.Services?.variants?.BeautySalonServices1;
const packagesData = sectionData.Packages?.variants?.BeautySalonPackages1;
const contactForm = sectionData.ContactForm?.variants?.BeautySalonContactForm1;

// The form's service list: every service card, then every package ("Glow Package")
const serviceOptions = [
  ...(servicesData?.items ?? []).map((item) => item.title),
  ...(packagesData?.items ?? []).map((item) => fill(contactForm?.packageOption ?? "{title}", { title: `${item.nameAccent} ${item.name}` })),
];

/*
  One landing page built from the Glaméra design, sections in the order of the design. Each section's id
  (templates.json) matches the header and footer links ("#about" → id="about").
*/
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection data={sectionData.Hero?.variants?.BeautySalonHero1} />
      <AboutSection data={sectionData.About?.variants?.BeautySalonAbout1} />
      <ServicesSection data={servicesData} />
      <PackagesSection data={packagesData} />
      <GallerySection data={sectionData.Gallery?.variants?.BeautySalonGallery1} />
      <TestimonialsSection data={sectionData.Testimonials?.variants?.BeautySalonTestimonials1} />
      <ContactSection data={sectionData.Contact?.variants?.BeautySalonContact1} form={contactForm} serviceOptions={serviceOptions} />
    </main>
  );
}
