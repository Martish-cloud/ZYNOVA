import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";
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
  Mail,
  Phone,
  AlertCircle
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
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);

    try {
      // 1. Dispatch discovery call request to team.zynova@gmail.com
      const res = await sendEnquiryEmail({
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

      if (res && res.success) {
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 }
          });
        } catch {}

        if (onSuccess) {
          onSuccess(
            "Discovery Call Request Confirmed!",
            `Your booking request has been sent directly to ${siteConfig.contact.email}. Amit Halder & the team will review and confirm your slot within 12 hours.`
          );
        }
      } else {
        setSubmitError(
          "Unable to automatically dispatch via web relay. Please click below to send via your email client or WhatsApp directly."
        );
      }
    } catch (dispatchErr) {
      console.warn("Discovery call dispatch notice:", dispatchErr);
      setSubmitError(
        "Could not dispatch your booking request. Please reach out directly via WhatsApp or Email below."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-call" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
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
            <div className="p-4.5 sm:p-5 rounded-xl bg-[#171410] border border-[#D0A04B]/20 hover:border-[#D0A04B]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D0A04B] font-bold block mb-1.5">
                OPTION 01 &bull; INSTANT CONTACT
              </span>
              <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-1.5">
                Direct WhatsApp or Call
              </h3>
              <p className="text-xs text-[#D4CEC4] font-normal leading-relaxed mb-4">
                Need an immediate conversation? Connect directly with Founder Amit Halder for a prompt discussion regarding your digital project.
              </p>

              <div className="space-y-2.5">
                <MagneticButton
                  asAnchor
                  href={siteConfig.whatsappChatURL}
                  target="_blank"
                  rel="noreferrer"
                  variant="gold"
                  className="w-full !py-2.5 text-xs font-bold justify-center shadow-md shadow-[#D0A04B]/20"
                  cursorLabel="WHATSAPP"
                >
                  <WhatsAppIcon className="w-4 h-4 text-black" />
                  <span>Chat on WhatsApp Directly</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </MagneticButton>

                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#201B14] text-white hover:text-[#D0A04B] text-xs font-semibold border border-[#D0A04B]/20 hover:border-[#D0A04B]/50 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D0A04B]" />
                  <span>Call {siteConfig.phone}</span>
                </a>
              </div>
            </div>

            <div className="p-4.5 sm:p-5 rounded-xl bg-[#171410] border border-[#D0A04B]/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D0A04B]" />
                <span>What to Expect on the Call</span>
              </h4>

              <ul className="space-y-2 text-xs text-[#D4CEC4] font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D0A04B] shrink-0 mt-0.5" />
                  <span>30-minute high-level technical feasibility assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D0A04B] shrink-0 mt-0.5" />
                  <span>Recommended architecture, timeline, and phased milestones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D0A04B] shrink-0 mt-0.5" />
                  <span>Direct consultation with Founder Amit Halder</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D0A04B] shrink-0 mt-0.5" />
                  <span>Strict NDA and client privacy guaranteed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Schedule Request Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#171410] border border-[#D0A04B]/25 shadow-[0_4px_25px_rgba(0,0,0,0.4)] relative">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D0A04B] font-bold block mb-1.5">
                OPTION 02 &bull; BESPOKE REQUEST
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-4">
                Request a Custom Time Slot
              </h3>

              {submitError && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={createMailtoLink(
                        `Discovery Call Booking: ${formData.name}`,
                        {
                          "Client Name": formData.name,
                          "Work Email": formData.email,
                          "Company": formData.company,
                          "Service": formData.service,
                          "Requested Date": formData.preferredDate,
                          "Preferred Time": formData.preferredTime,
                          "Scope": formData.message
                        }
                      )}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-[11px] font-semibold text-rose-100 flex items-center gap-1.5"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Send via Email Client</span>
                    </a>
                    <a
                      href={siteConfig.whatsappChatURL}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-[11px] font-semibold text-emerald-200 flex items-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-3 h-3 text-emerald-400" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-white">
                    Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D4CEC4] font-normal max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-bold">{formData.name}</span>. Your discovery call request was delivered directly to <span className="text-[#D0A04B] font-mono font-bold">{siteConfig.contact.email}</span>. We will review your project brief and confirm the calendar invitation within 12 hours.
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#D0A04B]/10 hover:bg-[#D0A04B]/20 text-[#D0A04B] border border-[#D0A04B]/30 hover:border-[#D0A04B]/50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D0A04B]/50 shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D0A04B]" />
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
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#201B14] border border-[#D0A04B]/20 text-white hover:text-[#D0A04B] transition-colors cursor-pointer shadow-xs"
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
                      <label className="block text-[11px] font-mono text-white font-bold mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="e.g. Ankita Shrivastav"
                        className={`w-full px-3.5 py-2.5 rounded-lg !bg-[#201B14] text-xs sm:text-sm text-white font-semibold placeholder:text-[#D4CEC4]/40 placeholder:font-normal focus:outline-none focus:border-[#D0A04B] border border-[#D0A04B]/20 transition-colors ${
                          errors.name ? "!border-rose-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-rose-500 font-semibold mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-mono text-white font-bold mb-1.5 uppercase tracking-wider">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Ankita.shri@yahoo.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg !bg-[#201B14] text-xs sm:text-sm text-white font-semibold placeholder:text-[#D4CEC4]/40 placeholder:font-normal focus:outline-none focus:border-[#D0A04B] border border-[#D0A04B]/20 transition-colors ${
                          errors.email ? "!border-rose-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-rose-500 font-semibold mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Company */}
                    <div>
                      <label className="block text-[11px] font-mono text-white font-bold mb-1.5 uppercase tracking-wider">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Acme Corp (Optional)"
                        className="w-full px-3.5 py-2.5 rounded-lg !bg-[#201B14] text-xs sm:text-sm text-white font-semibold placeholder:text-[#D4CEC4]/40 placeholder:font-normal focus:outline-none focus:border-[#D0A04B] border border-[#D0A04B]/20 transition-colors"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-[11px] font-mono text-white font-bold mb-1.5 uppercase tracking-wider">
                        Service Interested In
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2.5 rounded-lg !bg-[#201B14] text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-[#D0A04B] border border-[#D0A04B]/20 transition-colors cursor-pointer"
                      >
                        {formData.service && !serviceOptions.includes(formData.service) && (
                          <option value={formData.service} className="bg-[#201B14] text-[#D0A04B] py-1.5 font-bold">
                            {formData.service}
                          </option>
                        )}
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#201B14] text-white py-1.5 font-medium">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Preferences */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-white font-bold mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D0A04B]" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2.5 rounded-lg !bg-[#201B14] text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-[#D0A04B] border border-[#D0A04B]/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-white font-bold mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D0A04B]" />
                        <span>Preferred Time (UTC / IST)</span>
                      </label>
                      <input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2.5 rounded-lg !bg-[#201B14] text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-[#D0A04B] border border-[#D0A04B]/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Brief */}
                  <div>
                    <label className="block text-[11px] font-mono text-white font-bold mb-1.5 uppercase tracking-wider">
                      Project Brief / Goals *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setCursor("input")}
                      onBlur={resetCursor}
                      placeholder="Tell us about the project requirements, existing stack, and expected timeframe..."
                      className={`w-full px-3.5 py-2.5 rounded-lg !bg-[#201B14] text-xs sm:text-sm text-white font-semibold placeholder:text-[#D4CEC4]/40 placeholder:font-normal focus:outline-none focus:border-[#D0A04B] border border-[#D0A04B]/20 transition-colors resize-none ${
                        errors.message ? "!border-rose-500" : ""
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-rose-500 font-semibold mt-1 block">
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
                      className="w-full !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-md shadow-[#D0A04B]/20"
                      cursorLabel="REQUEST"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-black" />
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
