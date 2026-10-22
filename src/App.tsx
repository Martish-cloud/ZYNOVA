import React, { useState, useCallback, useRef } from "react";
import { CursorProvider } from "./context/CursorContext";
import { CustomCursor } from "./components/cursor/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { SmoothScrollProvider } from "./components/motion/SmoothScroll";
import { StackPanel } from "./components/motion/StackPanel";

import { Hero } from "./sections/Hero";
import { BuildVision } from "./sections/BuildVision";
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

  // 14 Consecutive Stack Panels linking each section to the next for 3D stacking
  const p1 = useRef<HTMLElement>(null);
  const p2 = useRef<HTMLElement>(null);
  const p3 = useRef<HTMLElement>(null);
  const p4 = useRef<HTMLElement>(null);
  const p5 = useRef<HTMLElement>(null);
  const p6 = useRef<HTMLElement>(null);
  const p7 = useRef<HTMLElement>(null);
  const p8 = useRef<HTMLElement>(null);
  const p9 = useRef<HTMLElement>(null);
  const p10 = useRef<HTMLElement>(null);
  const p11 = useRef<HTMLElement>(null);
  const p12 = useRef<HTMLElement>(null);
  const p13 = useRef<HTMLElement>(null);
  const p14 = useRef<HTMLElement>(null);

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
    <SmoothScrollProvider>
      <CursorProvider>
        <div className="relative min-h-screen bg-[#080706] text-[#FFFFFF] selection:bg-[#D0A04B]/35 selection:text-white">
          {/* Custom Interactive Physics Cursor */}
          <CustomCursor />

          {/* Fixed Adaptive Surface-Aware Navbar */}
          <Navbar />

          {/* 3D Stacked-Scroll Surface Pipeline */}
          <main className="relative z-10 w-full">
            {/* Hero Section with Scroll-Controlled Coding-Laptop Frames */}
            <Hero />

            {/* Panel 1: Build Around Your Vision (dark #100D09) */}
            <StackPanel
              ref={p1}
              id="vision"
              theme="dark"
              index={1}
              nextPanelRef={p2}
            >
              <BuildVision />
            </StackPanel>

            {/* Panel 2: Stats + Practical Digital Engineering (dark) */}
            <StackPanel
              ref={p2}
              id="about"
              theme="dark"
              index={2}
              nextPanelRef={p3}
            >
              <Stats />
              <About />
            </StackPanel>

            {/* Panel 3: Services (dark) */}
            <StackPanel
              ref={p3}
              id="services"
              theme="dark"
              index={3}
              nextPanelRef={p4}
            >
              <Services onSelectServiceForBooking={handleSelectServiceForBooking} />
            </StackPanel>

            {/* Panel 4: FeaturedProjects (dark) */}
            <StackPanel
              ref={p4}
              id="featured-projects"
              theme="dark"
              index={4}
              nextPanelRef={p5}
            >
              <FeaturedProjects onDiscussProject={handleDiscussProject} />
            </StackPanel>

            {/* Panel 5: Platforms (Available on Leading Freelance Contract Hubs) */}
            <StackPanel
              ref={p5}
              id="platforms"
              theme="dark"
              index={5}
              nextPanelRef={p6}
            >
              <Platforms />
            </StackPanel>

            {/* Panel 6: TechStack (Engineered With High-Performance Modern Tools) */}
            <StackPanel
              ref={p6}
              id="tech-stack"
              theme="dark"
              index={6}
              nextPanelRef={p7}
            >
              <TechStack />
            </StackPanel>

            {/* Panel 7: Projects (dark) */}
            <StackPanel
              ref={p7}
              id="projects"
              theme="dark"
              index={7}
              nextPanelRef={p8}
            >
              <Projects onDiscussProject={handleDiscussProject} />
            </StackPanel>

            {/* Panel 8: WhyZynova (dark) */}
            <StackPanel
              ref={p8}
              id="why-zynova"
              theme="dark"
              index={8}
              nextPanelRef={p9}
            >
              <WhyZynova />
            </StackPanel>

            {/* Panel 9: Industries (dark) */}
            <StackPanel
              ref={p9}
              id="industries"
              theme="dark"
              index={9}
              nextPanelRef={p10}
            >
              <Industries />
            </StackPanel>

            {/* Panel 10: Process (Seven Step Delivery Pipeline) */}
            <StackPanel
              ref={p10}
              id="process"
              theme="dark"
              index={10}
              nextPanelRef={p11}
            >
              <Process />
            </StackPanel>

            {/* Panel 11: Testimonials (dark) */}
            <StackPanel
              ref={p11}
              id="testimonials"
              theme="dark"
              index={11}
              nextPanelRef={p12}
            >
              <Testimonials />
            </StackPanel>

            {/* Panel 12: CTASection (dark) */}
            <StackPanel
              ref={p12}
              id="cta"
              theme="dark"
              index={12}
              nextPanelRef={p13}
            >
              <CTASection />
            </StackPanel>

            {/* Panel 13: BookCall + Contact (dark) */}
            <StackPanel
              ref={p13}
              id="contact"
              theme="dark"
              index={13}
              nextPanelRef={p14}
            >
              <BookCall
                prefilledService={prefilledService}
                prefilledBrief={prefilledBrief}
                onSuccess={(title, desc) => showToast(title, desc, "success")}
              />
              <Contact
                onSuccess={(title, desc) => showToast(title, desc, "success")}
              />
            </StackPanel>

            {/* Panel 14: Footer (dark) */}
            <StackPanel
              ref={p14}
              id="footer"
              theme="dark"
              index={14}
              nextPanelRef={null}
            >
              <Footer />
            </StackPanel>
          </main>

          {/* Fixed Founder Information Badge */}
          <FixedFounderBadge />

          {/* Floating WhatsApp Quick Action Button */}
          <FloatingWhatsApp />

          {/* Feedback Toast */}
          <Toast toast={activeToast} onDismiss={() => setActiveToast(null)} />
        </div>
      </CursorProvider>
    </SmoothScrollProvider>
  );
};

export default App;
