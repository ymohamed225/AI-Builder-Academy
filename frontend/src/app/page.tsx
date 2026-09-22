import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { SkillsGrid } from "@/components/SkillsGrid";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { Methodology } from "@/components/Methodology";
import { ProgramBootcamp } from "@/components/ProgramBootcamp";
import { Pricing } from "@/components/Pricing";
import { Audience } from "@/components/Audience";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark text-slate-100 relative selection:bg-brand-cyan selection:text-brand-darker">
      <Navbar />
      <Hero />
      <WhyUs />
      <SkillsGrid />
      <ProjectsShowcase />
      <Methodology />
      <ProgramBootcamp />
      <Pricing />
      <Audience />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
