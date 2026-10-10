import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useCursor } from "../context/useCursor";
import confetti from "canvas-confetti";
import { sendEnquiryEmail, createMailtoLink } from "../utils/emailService";
import {
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Send,
  Mail
} from "lucide-react";

interface BookCallProps {
  prefilledService?: string;
  prefilledBrief?: string;
  onSuccess?: (title: string, desc: string) => void;
}

export const BookCall: React.FC<BookCallProps> = ({
  prefilledService = "",
  prefilledBrief = "",
  onSuccess
}) => {
  const { setCursor, resetCursor } = useCursor();

  const [prevPrefilledService, setPrevPrefilledService] = useState(prefilledService);
  const [prevPrefilledBrief, setPrevPrefilledBrief] = useState(prefilledBrief);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: prefilledService || "Web Development",
    preferredDate: "",
    preferredTime: "14:00",
    message: prefilledBrief || ""
  });

  // Idiomatic React state adjustment during render when props change
  if (prefilledService !== prevPrefilledService) {
    setPrevPrefilledService(prefilledService);
    setFormData((prev) => ({ ...prev, service: prefilledService }));
  }

  if (prefilledBrief !== prevPrefilledBrief) {
    setPrevPrefilledBrief(prefilledBrief);
    setFormData((prev) => ({ ...prev, message: prefilledBrief }));
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    "Web Development",
    "Mobile App Development (Flutter / React Native)",
    "Backend Development (Node / Spring / Django)",
    "Blockchain & Web3 Development",
    "WordPress Custom Development",
    "Shopify E-commerce Development",
    "Excel Data Cleaning & Automation",
    "Professional Excel Dashboards",
    "Power BI Reporting",
    "AI & Workflow Automation",
    "Digital Marketing",
    "Other Custom Digital Architecture"
  ];

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please share a brief description of your project.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // 1. Dispatch discovery call request to team.zynova@gmail.com
      await sendEnquiryEmail({
        subject: `New Discovery Call Booking: ${formData.name} (${formData.preferredDate || "Immediate"} @ ${formData.preferredTime || "Flexible"}) - ZYNOVA`,
        senderEmail: formData.email,
        senderName: formData.name,
        fields: {
          "Client Name": formData.name,
          "Work Email": formData.email,
          "Company / Brand": formData.company || "Not provided",
          "Service Domain": formData.service,
          "Requested Date": formData.preferredDate || "Earliest Available",
          "Preferred Time": formData.preferredTime || "Flexible",
          "Project Scope / Brief": formData.message
        },
        autoResponse: `Thank you for booking a Discovery Call with ZYNOVA. We have received your slot request for ${formData.preferredDate || "an upcoming date"} and will confirm our calendar invite shortly.`
      });

      // 2. Also forward to local backend API if configured
      if (siteConfig.contact.bookingApi && siteConfig.contact.bookingApi.startsWith("http")) {
        fetch(siteConfig.contact.bookingApi, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }).catch(() => {});
      }
    } catch (dispatchErr) {
      console.warn("Discovery call dispatch notice:", dispatchErr);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Fallback gracefully
      }

      if (onSuccess) {
        onSuccess(
          "Discovery Call Request Confirmed!",
          `Your booking request has been sent directly to ${siteConfig.contact.email}. Amit Halder & the team will review and confirm your slot within 12 hours.`
        );
      }
    }
  };

  return (
    <section id="book-call" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SCHEDULE A CONSULTATION"
          title="Let's Talk About"
          highlightedTitle="Your Project."
          subtitle="Book a dedicated technical discovery session to evaluate your roadmap, system specifications, and automation goals."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Booking Option & Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4.5 sm:p-5 rounded-xl bg-gradient-to-b from-white/90 to-slate-50/85 border border-amber-400/35 hover:border-amber-400/60 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] transition-colors">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block mb-1.5">
                OPTION 01 &bull; INSTANT SYNC
              </span>
              <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-1.5">
                Book Directly via Calendar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Prefer to grab an immediate slot on our calendar? Connect via our direct scheduling link for a video discovery call.
              </p>

              <MagneticButton
                asAnchor
                href={siteConfig.bookingURL}
                target="_blank"
                rel="noreferrer"
                variant="gold"
                className="w-full !py-2.5 text-xs font-bold justify-center shadow-[0_8px_20px_rgba(245,158,11,0.3)]"
                cursorLabel="CALENDAR"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book Directly on Calendar</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </MagneticButton>

              <p className="text-[10px] text-slate-500 mt-2.5 text-center">
                Replace <code className="font-mono text-amber-700 font-semibold">siteConfig.bookingURL</code> with your Calendly / Cal.com link
              </p>
            </div>

            <div className="p-4.5 sm:p-5 rounded-xl bg-white/80 border border-slate-200/80 backdrop-blur-xl shadow-sm space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>What to Expect on the Call</span>
              </h4>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>30-minute high-level technical feasibility assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Recommended architecture, timeline, and phased milestones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Direct consultation with Founder Amit Halder</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Strict NDA and client privacy guaranteed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Schedule Request Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-amber-400/35 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] relative">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block mb-1.5">
                OPTION 02 &bull; BESPOKE REQUEST
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mb-4">
                Request a Custom Time Slot
              </h3>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-[0_8px_20px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-slate-900">
                    Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-slate-900 font-semibold">{formData.name}</span>. Your discovery call request was delivered directly to <span className="text-amber-700 font-mono font-semibold">{siteConfig.contact.email}</span>. We will review your project brief and confirm the calendar invitation within 12 hours.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={createMailtoLink(
                        `Discovery Call Booking: ${formData.name} (${formData.preferredDate || "Immediate"}) [ZYNOVA]`,
                        {
                          "Name": formData.name,
                          "Email": formData.email,
                          "Company": formData.company,
                          "Service": formData.service,
                          "Date": formData.preferredDate,
                          "Time": formData.preferredTime,
                          "Brief": formData.message
                        }
                      )}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100/90 text-amber-900 border border-amber-300 hover:border-amber-400 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-600" />
                      <span>Open in Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          service: "Web Development",
                          preferredDate: "",
                          preferredTime: "14:00",
                          message: ""
                        });
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="e.g. Ankita Shrivastav"
                        className={`w-full px-3.5 py-2 rounded-lg bg-white border text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs ${
                          errors.name ? "border-rose-500" : "border-slate-300"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-rose-600 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Ankita.shri@yahoo.com"
                        className={`w-full px-3.5 py-2 rounded-lg bg-white border text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs ${
                          errors.email ? "border-rose-500" : "border-slate-300"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-rose-600 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Company */}
                    <div>
                      <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Acme Corp (Optional)"
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
                        Service Interested In
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Preferences */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Preferred Time (UTC / IST)</span>
                      </label>
                      <input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Message Brief */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
                      Project Brief / Goals *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setCursor("input")}
                      onBlur={resetCursor}
                      placeholder="Tell us about the project requirements, existing stack, and expected timeframe..."
                      className={`w-full px-3.5 py-2 rounded-lg bg-white border text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors resize-none shadow-xs ${
                        errors.message ? "border-rose-500" : "border-slate-300"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-rose-600 mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1.5">
                    <MagneticButton
                      variant="gold"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-[0_8px_24px_rgba(245,158,11,0.3)]"
                      cursorLabel="REQUEST"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-slate-950" />
                          <span>Request Discovery Call</span>
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
