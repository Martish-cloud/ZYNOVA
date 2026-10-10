import React, { useState, useCallback } from "react";
import { CursorProvider } from "./context/CursorContext";
import { CustomCursor } from "./components/cursor/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./sections/Hero";
import { Stats } from "./sections/Stats";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { FeaturedProjects } from "./sections/FeaturedProjects";
import { TechStack } from "./sections/TechStack";
import { DataSolutions } from "./sections/DataSolutions";
import { Projects } from "./sections/Projects";
import { WhyZynova } from "./sections/WhyZynova";
import { Industries } from "./sections/Industries";
import { Process } from "./sections/Process";
import { Platforms } from "./sections/Platforms";
import { Testimonials } from "./sections/Testimonials";
import { CTASection } from "./sections/CTASection";
import { BookCall } from "./sections/BookCall";
import { ZynovaGivesBack } from "./sections/ZynovaGivesBack";
import { Contact } from "./sections/Contact";
import { Footer } from "./components/layout/Footer";
import { FloatingWhatsApp } from "./components/ui/FloatingWhatsApp";
import { GlobalVideoBackground } from "./components/layout/GlobalVideoBackground";
import { Toast } from "./components/ui/Toast";
import type { ToastMessage } from "./components/ui/Toast";

export const App: React.FC = () => {
  const [prefilledService, setPrefilledService] = useState<string>("");
  const [prefilledBrief, setPrefilledBrief] = useState<string>("");
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  const handleSelectServiceForBooking = useCallback((serviceTitle: string) => {
    setPrefilledService(serviceTitle);
  }, []);

  const handleDiscussProject = useCallback((brief: string) => {
    setPrefilledBrief(brief);
  }, []);

  const showToast = useCallback((title: string, description: string, type: "success" | "error" = "success") => {
    setActiveToast({
      id: Date.now().toString(),
      type,
      title,
      description
    });
  }, []);

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#f8fafc] text-[#0f172a] selection:bg-amber-500/20 selection:text-amber-900">
        {/* Global Cinematic Tech 02 Background Video (Full website backdrop with Light Glass veil) */}
        <GlobalVideoBackground />

        {/* Subtle Ambient Light-Glass & Golden Atmosphere */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[15%] right-[-8%] w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
          <div className="absolute top-[48%] left-[-8%] w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06)_0%,transparent_70%)]" />
          <div className="absolute top-[78%] right-[8%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.06)_0%,transparent_70%)]" />
        </div>

        {/* Custom Interactive Physics Cursor */}
        <CustomCursor />

        {/* Fixed Light Glass Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* Quick Metrics Strip */}
          <Stats />

          {/* About ZYNOVA & Founder Card */}
          <About />

          {/* Large Services Section with Modal */}
          <Services onSelectServiceForBooking={handleSelectServiceForBooking} />

          {/* Featured Projects / Signature Work Showcase (3D Layered Floating Cards) */}
          <FeaturedProjects />

          {/* Modern Technology Stack */}
          <TechStack />

          {/* Dedicated Data & Analytics Section */}
          <DataSolutions />

          {/* Selected Work Showcase with Filter & Detail Modal */}
          <Projects onDiscussProject={handleDiscussProject} />

          {/* Why ZYNOVA: 4 Pillars */}
          <WhyZynova />

          {/* Industries We Serve */}
          <Industries />

          {/* 7-Step Delivery Process */}
          <Process />

          {/* Freelance & Contract Platforms */}
          <Platforms />

          {/* Customer Reviews & Client Testimonials */}
          <Testimonials />

          {/* Cinematic Agency CTA */}
          <CTASection />

          {/* Book A Call Conversion Point */}
          <BookCall
            prefilledService={prefilledService}
            prefilledBrief={prefilledBrief}
            onSuccess={(title, desc) => showToast(title, desc, "success")}
          />

          {/* ZYNOVA GIVES BACK Charity & Community Section */}
          <ZynovaGivesBack />

          {/* Direct Contact Form */}
          <Contact
            onSuccess={(title, desc) => showToast(title, desc, "success")}
          />
        </main>

        {/* Agency Light Glass Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* Feedback Toast */}
        <Toast toast={activeToast} onDismiss={() => setActiveToast(null)} />
      </div>
    </CursorProvider>
  );
};

export default App;
