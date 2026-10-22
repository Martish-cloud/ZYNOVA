import React, { useState, useCallback, useRef } from "react";
import { CursorProvider } from "./context/CursorContext";
import { CustomCursor } from "./components/cursor/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { SmoothScrollProvider } from "./components/motion/SmoothScroll";
import { StackPanel } from "./components/motion/StackPanel";

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
import { PersistentVerticalScrollText } from "./components/ui/PersistentVerticalScrollText";
import { Toast } from "./components/ui/Toast";
import type { ToastMessage } from "./components/ui/Toast";

export const App: React.FC = () => {
  const [prefilledService, setPrefilledService] = useState<string>("");
  const [prefilledBrief, setPrefilledBrief] = useState<string>("");
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  // 13 Consecutive Stack Panels linking each section to the next for 3D stacking
  const p0 = useRef<HTMLElement>(null);
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
        <div className="relative min-h-screen bg-[#0a0806] text-[#FAF7F0] selection:bg-[#B58A45]/35 selection:text-white">
          {/* Custom Interactive Physics Cursor */}
          <CustomCursor />

          {/* Fixed Adaptive Surface-Aware Navbar */}
          <Navbar />

          {/* 3D Stacked-Scroll Surface Pipeline */}
          <main className="relative z-10 w-full">
            {/* Panel 0: Hero (dark) */}
            <StackPanel
              ref={p0}
              id="hero"
              theme="dark"
              index={0}
              nextPanelRef={p1}
            >
              <Hero />
            </StackPanel>

            {/* Panel 1: Stats + About (light) */}
            <StackPanel
              ref={p1}
              id="about"
              theme="light"
              index={1}
              nextPanelRef={p2}
            >
              <Stats />
              <About />
            </StackPanel>

            {/* Panel 2: Services (dark) */}
            <StackPanel
              ref={p2}
              id="services"
              theme="dark"
              index={2}
              nextPanelRef={p3}
            >
              <Services onSelectServiceForBooking={handleSelectServiceForBooking} />
            </StackPanel>

            {/* Panel 3: FeaturedProjects (light) */}
            <StackPanel
              ref={p3}
              id="featured-projects"
              theme="light"
              index={3}
              nextPanelRef={p4}
            >
              <FeaturedProjects onDiscussProject={handleDiscussProject} />
            </StackPanel>

            {/* Panel 4: TechStack (dark) */}
            <StackPanel
              ref={p4}
              id="tech-stack"
              theme="dark"
              index={4}
              nextPanelRef={p5}
            >
              <TechStack />
            </StackPanel>

            {/* Panel 5: Projects (light) */}
            <StackPanel
              ref={p5}
              id="projects"
              theme="light"
              index={5}
              nextPanelRef={p6}
            >
              <Projects onDiscussProject={handleDiscussProject} />
            </StackPanel>

            {/* Panel 6: WhyZynova (dark) */}
            <StackPanel
              ref={p6}
              id="why-zynova"
              theme="dark"
              index={6}
              nextPanelRef={p7}
            >
              <WhyZynova />
            </StackPanel>

            {/* Panel 7: Industries (light) */}
            <StackPanel
              ref={p7}
              id="industries"
              theme="light"
              index={7}
              nextPanelRef={p8}
            >
              <Industries />
            </StackPanel>

            {/* Panel 8: Process (dark) */}
            <StackPanel
              ref={p8}
              id="process"
              theme="dark"
              index={8}
              nextPanelRef={p9}
            >
              <Process />
            </StackPanel>

            {/* Panel 9: Platforms + Testimonials (light) */}
            <StackPanel
              ref={p9}
              id="testimonials"
              theme="light"
              index={9}
              nextPanelRef={p10}
            >
              <Platforms />
              <Testimonials />
            </StackPanel>

            {/* Panel 10: CTASection (dark) */}
            <StackPanel
              ref={p10}
              id="cta"
              theme="dark"
              index={10}
              nextPanelRef={p11}
            >
              <CTASection />
            </StackPanel>

            {/* Panel 11: BookCall + Contact (light) */}
            <StackPanel
              ref={p11}
              id="contact"
              theme="light"
              index={11}
              nextPanelRef={p12}
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

            {/* Panel 12: Footer (dark) */}
            <StackPanel
              ref={p12}
              id="footer"
              theme="dark"
              index={12}
              nextPanelRef={null}
            >
              <Footer />
            </StackPanel>
          </main>

          {/* Fixed Founder Information Badge */}
          <FixedFounderBadge />

          {/* Floating WhatsApp Quick Action Button */}
          <FloatingWhatsApp />

          {/* Priority 1: Persistent Vertical Left-Edge Scrolling Text Animation */}
          <PersistentVerticalScrollText />

          {/* Feedback Toast */}
          <Toast toast={activeToast} onDismiss={() => setActiveToast(null)} />
        </div>
      </CursorProvider>
    </SmoothScrollProvider>
  );
};

export default App;
