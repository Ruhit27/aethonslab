import { CapabilitiesSection } from "./CapabilitiesSection";
import { HeroSection } from "./HeroSection";
import { LandingHeader } from "./LandingHeader";
import { ProofSection } from "./ProofSection";
import { RevealOnScrollProvider } from "./RevealOnScrollProvider";
import { SolutionsSection } from "./SolutionsSection";
import { CtaBand, StartHere } from "./StartHere";
import { TestimonialsSection } from "./TestimonialsSection";
import { ToolsMarquee } from "./ToolsMarquee";
import { WhyUsSection } from "./WhyUsSection";

const railClass =
  "pointer-events-none fixed bottom-0 top-0 z-50 w-4 bg-background transition-colors duration-500 md:w-6 lg:w-8";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Fixed side rails that frame the page, as in the reference design. */}
      <div aria-hidden="true" className={`${railClass} left-0 border-r border-border`} />
      <div aria-hidden="true" className={`${railClass} right-0 border-l border-border`} />

      <div className="px-4 md:px-6 lg:px-8">
        <LandingHeader />
        <main className="min-h-screen">
          <div className="relative w-full overflow-x-clip bg-background transition-colors duration-500">
            <RevealOnScrollProvider>
              <div className="relative z-10 flex flex-col">
                <HeroSection />
                <CtaBand />
                <StartHere />
                <ProofSection />
                <TestimonialsSection />
                <WhyUsSection />
                <CtaBand />
                <CapabilitiesSection />
                <CtaBand />
                <ToolsMarquee />
                <CtaBand />
                <SolutionsSection />
                <CtaBand />
                {/* Checkpoint 3 sections land here. */}
              </div>
            </RevealOnScrollProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
