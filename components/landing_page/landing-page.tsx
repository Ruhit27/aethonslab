import { LandingAboutSection } from "./LandingAboutSection";
import { LandingContactSection } from "./LandingContactSection";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingHeroSection } from "./LandingHeroSection";
import { LandingProcessSection } from "./LandingProcessSection";
import { LandingProductsSection } from "./LandingProductsSection";
import { LandingServicesSection } from "./LandingServicesSection";
import { LandingWhyAethonLabSection } from "./LandingWhyAethonLabSection";
import { LandingWorkSection } from "./LandingWorkSection";
import { RevealOnScrollProvider } from "./RevealOnScrollProvider";

export default function LandingPage() {
  return (
    <div className="page-shell min-h-screen overflow-hidden">
      <LandingHeader />
      <RevealOnScrollProvider>
        <main>
          <LandingHeroSection />
          <LandingServicesSection />
          <LandingWhyAethonLabSection />
          <LandingWorkSection />
          <LandingProductsSection />
          <LandingProcessSection />
          <LandingAboutSection />
          <LandingContactSection />
        </main>
      </RevealOnScrollProvider>
      <LandingFooter />
    </div>
  );
}
