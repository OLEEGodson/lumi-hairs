import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import StylistsSection from "./components/StylistsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StylistsSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}