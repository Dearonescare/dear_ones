import { JsonLd } from "@/components/ui/JsonLd";
import { buildJsonLd } from "@/lib/structured-data";
import { HeroSection } from "@/components/sections/HeroSection";
import { SupportModelSection } from "@/components/sections/SupportModelSection";
import { DistanceSection } from "@/components/sections/DistanceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FamilyUpdatesSection } from "@/components/sections/FamilyUpdatesSection";
import { CarePlansSection } from "@/components/sections/CarePlansSection";
import { OnDemandSection } from "@/components/sections/OnDemandSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildJsonLd()} id="dear-ones-jsonld" />
      <HeroSection />
      <SupportModelSection />
      <DistanceSection />
      <AboutSection />
      <ServicesSection />
      <FamilyUpdatesSection />
      <CarePlansSection />
      <OnDemandSection />
      <HowItWorksSection />
      <TrustSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
