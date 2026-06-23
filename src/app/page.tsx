{/*
  ============================================
  DESIGN CONSTRAINTS — DO NOT VIOLATE

  The website must feel like:
    - Government Digital Initiative
    - Public Knowledge Platform
    - Enterprise Product

  The website must NOT feel like:
    - Startup SaaS
    - AI Tool
    - CRM Dashboard
    - Analytics Platform
    - Creative Agency
    - Crypto Product

  Avoid:
    - Gradient cards everywhere
    - Tiny feature boxes
    - Overuse of icons
    - Fake analytics charts
    - Empty decorative sections
    - Generic dashboard screenshots

  Prioritize:
    - Large typography
    - Strong whitespace
    - Editorial layouts
    - Repository-inspired visuals
    - Premium card compositions
    - Real content hierarchy
  ============================================
*/}

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WhyThisMattersSection } from "@/components/why-this-matters-section";
import { ProblemSection } from "@/components/problem-section";
import { ObjectivesSection } from "@/components/objectives-section";
import { FeaturesSection } from "@/components/modules-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { DiscoverySection } from "@/components/discovery-section";
import { BenefitsBartiSection } from "@/components/benefits-barti-section";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyThisMattersSection />
      <ProblemSection />
      <ObjectivesSection />
      <FeaturesSection />
      <WhyChooseSection />
      <DiscoverySection />
      <BenefitsBartiSection />
      <StatsSection />
      <Footer />
    </>
  );
}
