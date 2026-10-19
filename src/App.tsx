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
import { Projects } from "./sections/Projects";
import { WhyZynova } from "./sections/WhyZynova";
import { Industries } from "./sections/Industries";
import { Process } from "./sections/Process";
import { Platforms } from "./sections/Platforms";
import { Testimonials } from "./sections/Testimonials";
import { CTASection } from "./sections/CTASection";
import { BookCall } from "./sections/BookCall";
import { Contact } from "./sections/Contact";
import { Footer } from "./components/layout/Footer";
import { FixedFounderBadge } from "./components/ui/FixedFounderBadge";
import { FloatingWhatsApp } from "./components/ui/FloatingWhatsApp";
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
      <div className="relative min-h-screen bg-[#FAF7F0] text-[#292720] selection:bg-[#B58A45]/25 selection:text-[#292720]">
        {/* Subtle Ambient Light Biscuit & Warm Atmosphere */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-[8%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(240,228,210,0.65)_0%,transparent_70%)]" />
          <div className="absolute top-[42%] left-[-10%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(181,138,69,0.06)_0%,transparent_70%)]" />
          <div className="absolute top-[72%] right-[5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(240,228,210,0.55)_0%,transparent_70%)]" />
        </div>

        {/* Custom Interactive Physics Cursor */}
        <CustomCursor />

        {/* Fixed Light Theme Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* Quick Metrics Strip */}
          <Stats />

          {/* About ZYNOVA & Founder Card (with Video Project 7 background) */}
          <About />

          {/* Large Services Section with Modal */}
          <Services onSelectServiceForBooking={handleSelectServiceForBooking} />

          {/* Featured Projects / Signature Work Showcase (3D Layered Cards with Videos) */}
          <FeaturedProjects onDiscussProject={handleDiscussProject} />

          {/* Modern Technology Stack */}
          <TechStack />

          {/* Selected Work Showcase with Filter & Detail Modal (with Videos) */}
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

          {/* Direct Contact Form */}
          <Contact
            onSuccess={(title, desc) => showToast(title, desc, "success")}
          />
        </main>

        {/* Agency Light Theme Footer */}
        <Footer />

        {/* Fixed Founder Information Badge */}
        <FixedFounderBadge />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* Feedback Toast */}
        <Toast toast={activeToast} onDismiss={() => setActiveToast(null)} />
      </div>
    </CursorProvider>
  );
};

export default App;
