import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useCursor } from "../context/useCursor";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";
import { WhatsAppQR } from "../components/ui/WhatsAppQR";
import confetti from "canvas-confetti";
import { sendEnquiryEmail, createMailtoLink } from "../utils/emailService";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Send,
  CheckCircle2,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

interface ContactProps {
  onSuccess?: (title: string, desc: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onSuccess }) => {
  const { setCursor, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceRequired: "Full-Stack Web Development",
    preferredDate: "",
    preferredTime: "14:00",
    message: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const servicesList = [
    "Full-Stack Web Development",
    "Mobile App Development",
    "Core Backend Architecture",
    "Excel Automation & Cleaning",
    "Power BI Reporting & Dashboards",
    "WordPress / Shopify E-commerce",
    "Blockchain / Web3 Integration",
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
      // 1. Send enquiry email directly to team.zynova@gmail.com via multi-tier relay
      const res = await sendEnquiryEmail({
        subject: `New Project Enquiry: ${formData.name} - ${formData.serviceRequired} [ZYNOVA]`,
        senderEmail: formData.email,
        senderName: formData.name,
        fields: {
          "Client Name": formData.name,
          "Work Email": formData.email,
          "Company / Brand": formData.company.trim() || "Not specified",
          "Service Interested In": formData.serviceRequired,
          "Preferred Meeting Date": formData.preferredDate || "Earliest Available",
          "Preferred Meeting Time": formData.preferredTime || "Flexible",
          "Project Scope / Brief": formData.message
        },
        autoResponse: `Thank you for contacting ZYNOVA. We have received your project enquiry regarding "${formData.serviceRequired}" and our engineering team will get back to you within 12 hours.`
      });

      // 2. Also forward to local backend API if present
      if (siteConfig.contact.contactApi && siteConfig.contact.contactApi.startsWith("http")) {
        fetch(siteConfig.contact.contactApi, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }).catch(() => {});
      }

      if (res && res.success) {
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
          });
        } catch {
          // Safe fallback
        }

        if (onSuccess) {
          onSuccess(
            "Enquiry Dispatched!",
            `Thank you, ${formData.name}. Your enquiry has been sent directly to ${siteConfig.contact.email}. We will review and reply within 12 hours.`
          );
        }
      } else {
        setSubmitError(
          "We could not dispatch your enquiry automatically. Please use the direct email or WhatsApp button below to reach us directly."
        );
      }
    } catch (err) {
      console.warn("Contact enquiry delivery notice:", err);
      setSubmitError(
        "Network notice: please click below to send via your email client or WhatsApp directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="START A CONVERSATION"
          title="Direct Inquiries &amp;"
          highlightedTitle="Technical Advisory."
          subtitle="Whether you have an immediate development requirement or need long-term technical guidance, reach out directly."
        />

        {/* WhatsApp Community / Group Card */}
        <div className="mb-8 sm:mb-10 rounded-2xl liquid-glass-panel border-amber-400/45 hover:border-amber-400/70 p-5 sm:p-6 lg:p-7 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Side (Desktop) / Top (Mobile): Heading, Description, CTA Button */}
            <div className="md:col-span-7 lg:col-span-8 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/[0.16] border border-amber-400/35 text-[11px] font-mono font-bold text-amber-300">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>OFFICIAL WHATSAPP COMMUNITY &amp; CHAT</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                CONNECT WITH ZYNOVA ON WHATSAPP
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-xl">
                Connect with ZYNOVA on WhatsApp for 1-on-1 project consultations, requirements discussions, updates, and direct communication.
              </p>

              <div className="pt-1.5 flex flex-wrap gap-3">
                <MagneticButton
                  asAnchor
                  href={siteConfig.whatsappChatURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  className="w-full sm:w-auto !py-2.5 sm:!py-3 !px-5 sm:!px-6 text-xs sm:text-sm font-bold shadow-[0_8px_25px_rgba(212,175,55,0.3)] cursor-pointer"
                  cursorLabel="CHAT"
                  aria-label="Chat directly on WhatsApp with ZYNOVA"
                >
                  <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                  <span>CHAT 1-ON-1 ON WHATSAPP &rarr;</span>
                </MagneticButton>

                <MagneticButton
                  asAnchor
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="w-full sm:w-auto !py-2.5 sm:!py-3 !px-5 sm:!px-6 text-xs sm:text-sm font-bold border-amber-400/40 text-amber-300 hover:bg-amber-400/[0.16] cursor-pointer"
                  cursorLabel="GROUP"
                  aria-label="Join the ZYNOVA WhatsApp community group"
                >
                  <span>JOIN WHATSAPP GROUP</span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Side (Desktop) / Bottom (Mobile): QR Code Card */}
            <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
              <WhatsAppQR size={140} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Info & Professional Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl liquid-glass-panel border-amber-400/45 space-y-4">
              <div>
                <span className="font-heading text-xl font-black tracking-wide text-white block">
                  {siteConfig.brandName}
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {siteConfig.positioning}
                </span>
              </div>

              {/* 5 Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Card 1: Email */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email ZYNOVA at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="group p-3 sm:p-3.5 rounded-xl liquid-glass-subcard hover:border-amber-400/70 transition-all duration-300 shadow-xs hover:shadow-[0_10px_25px_rgba(212,175,55,0.15)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-amber-400/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-amber-400/[0.16] border border-amber-400/35 text-amber-300 group-hover:scale-110 group-hover:text-amber-200 group-hover:border-amber-300 transition-all duration-300">
                      <Mail className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-300 font-semibold">
                      EMAIL
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-white group-hover:text-amber-300 transition-colors break-all block">
                      {siteConfig.contact.email}
                    </span>
                    <span className="text-[10.5px] text-amber-300 group-hover:text-amber-200 group-hover:underline flex items-center gap-1 mt-0.5 font-semibold">
                      Send us an email &rarr;
                    </span>
                  </div>
                </a>

                {/* Card 2: Phone */}
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  aria-label={`Call ZYNOVA at ${siteConfig.contact.phone}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="group p-3 sm:p-3.5 rounded-xl liquid-glass-subcard hover:border-amber-400/70 transition-all duration-300 shadow-xs hover:shadow-[0_10px_25px_rgba(212,175,55,0.15)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-amber-400/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-amber-400/[0.16] border border-amber-400/35 text-amber-300 group-hover:scale-110 group-hover:text-amber-200 group-hover:border-amber-300 transition-all duration-300">
                      <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-300 font-semibold">
                      PHONE
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-white group-hover:text-amber-300 transition-colors block">
                      {siteConfig.contact.phone}
                    </span>
                    <span className="text-[10.5px] text-amber-300 group-hover:text-amber-200 group-hover:underline flex items-center gap-1 mt-0.5 font-semibold">
                      Call us &rarr;
                    </span>
                  </div>
                </a>

                {/* Card 3: WhatsApp Group */}
                <a
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the ZYNOVA WhatsApp group"
                  onMouseEnter={() => setCursor("button", "JOIN")}
                  onMouseLeave={resetCursor}
                  className="group p-3 sm:p-3.5 rounded-xl liquid-glass-subcard hover:border-amber-400/70 transition-all duration-300 shadow-xs hover:shadow-[0_10px_25px_rgba(212,175,55,0.15)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-amber-400/60 cursor-pointer sm:col-span-2"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 group-hover:scale-110 group-hover:border-amber-300 transition-all duration-300">
                      <WhatsAppIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-[9.5px] font-mono font-bold tracking-widest uppercase text-amber-300">
                      WHATSAPP
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors block">
                      Join the ZYNOVA WhatsApp Group
                    </span>
                    <span className="text-[10.5px] text-amber-300 group-hover:text-amber-200 group-hover:underline flex items-center gap-1 mt-0.5 font-semibold">
                      Connect on WhatsApp &rarr;
                    </span>
                  </div>
                </a>

                {/* Card 4: Location */}
                <div className="p-3 sm:p-3.5 rounded-xl liquid-glass-subcard shadow-xs flex flex-col justify-between min-h-[95px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-amber-400/[0.16] border border-amber-400/35 text-amber-300">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-300 font-semibold">
                      LOCATION
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {siteConfig.contact.location}
                    </span>
                    <span className="text-[10.5px] text-slate-300 font-normal block mt-0.5">
                      HQ &amp; Engineering Operations
                    </span>
                  </div>
                </div>

                {/* Card 5: Response Time */}
                <div className="p-3 sm:p-3.5 rounded-xl liquid-glass-subcard shadow-xs flex flex-col justify-between min-h-[95px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-amber-400/[0.16] border border-amber-400/35 text-amber-300">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-300 font-semibold">
                      RESPONSE TIME
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {siteConfig.contact.responseGuarantee}
                    </span>
                    <span className="text-[10.5px] text-emerald-400 block mt-0.5 font-bold">
                      Direct leadership review
                    </span>
                  </div>
                </div>
              </div>

              {/* BOOK A CALL CTA Block */}
              <div className="pt-3 border-t border-white/20">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                    DIRECT CONSULTATION
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open for Booking
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-normal leading-relaxed mb-3">
                  Prefer to schedule a dedicated technical discovery session? Pick a convenient time on our calendar.
                </p>
                <MagneticButton
                  asAnchor
                  href={siteConfig.bookingURL}
                  target="_blank"
                  rel="noreferrer"
                  variant="gold"
                  className="w-full !py-2.5 text-xs font-bold justify-center shadow-[0_8px_20px_rgba(212,175,55,0.28)] cursor-pointer"
                  cursorLabel="BOOK"
                  aria-label="Book a call with ZYNOVA"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>BOOK A CALL</span>
                </MagneticButton>
              </div>

              {/* Verification / Leadership Note */}
              <div className="pt-3 border-t border-white/20 text-xs text-slate-200 font-normal space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Founder: <strong className="text-white font-bold">{siteConfig.founder.name}</strong>
                  </span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-300">
                  Every enquiry is evaluated by senior engineering leadership to guarantee technical feasibility and architectural precision.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-2xl liquid-glass-panel border-amber-400/45 relative">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-4">
                Send an Enquiry
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
                        `Project Enquiry: ${formData.name}`,
                        {
                          "Full Name": formData.name,
                          "Work Email": formData.email,
                          "Company": formData.company,
                          "Service": formData.serviceRequired,
                          "Preferred Meeting Date": formData.preferredDate,
                          "Preferred Meeting Time": formData.preferredTime,
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
                <div className="py-8 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_8px_20px_rgba(16,185,129,0.25)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-white">
                    Enquiry Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 font-normal max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-bold">{formData.name}</span>. Your enquiry details for <span className="text-amber-300 font-bold">{formData.serviceRequired}</span> have been sent directly to <span className="text-amber-300 font-mono font-bold">{siteConfig.contact.email}</span>. Our team will review your project brief and reply to you at <span className="text-white font-mono font-bold">{formData.email}</span> within 12 hours.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={createMailtoLink(
                        `Project Enquiry: ${formData.name} - ${formData.serviceRequired} [ZYNOVA]`,
                        {
                          "Full Name": formData.name,
                          "Work Email": formData.email,
                          "Company / Brand": formData.company,
                          "Service Interested In": formData.serviceRequired,
                          "Preferred Meeting Date": formData.preferredDate,
                          "Preferred Meeting Time": formData.preferredTime,
                          "Project Scope / Brief": formData.message
                        }
                      )}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-amber-400/[0.16] hover:bg-amber-400/[0.25] text-amber-300 border border-amber-400/35 hover:border-amber-400/50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
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
                          serviceRequired: "Full-Stack Web Development",
                          preferredDate: "",
                          preferredTime: "14:00",
                          message: ""
                        });
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold liquid-glass-subcard text-slate-200 hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-mono text-slate-100 font-bold mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Ankita Shrivastav"
                        className={`w-full px-3.5 py-2.5 rounded-lg liquid-glass-input text-xs sm:text-sm text-white font-semibold placeholder:text-slate-300 placeholder:font-normal focus:outline-none focus:border-amber-400/80 transition-colors ${
                          errors.name ? "!border-rose-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-rose-400 font-semibold mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-mono text-slate-100 font-bold mb-1.5 uppercase tracking-wider">
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="ankita@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg liquid-glass-input text-xs sm:text-sm text-white font-semibold placeholder:text-slate-300 placeholder:font-normal focus:outline-none focus:border-amber-400/80 transition-colors ${
                          errors.email ? "!border-rose-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-rose-400 font-semibold mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Company / Brand */}
                    <div>
                      <label htmlFor="contact-company" className="block text-[11px] font-mono text-slate-100 font-bold mb-1.5 uppercase tracking-wider">
                        Company / Brand
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Your Organization"
                        className="w-full px-3.5 py-2.5 rounded-lg liquid-glass-input text-xs sm:text-sm text-white font-semibold placeholder:text-slate-300 placeholder:font-normal focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>

                    {/* Service Interested In */}
                    <div>
                      <label htmlFor="contact-service" className="block text-[11px] font-mono text-slate-100 font-bold mb-1.5 uppercase tracking-wider">
                        Service Interested In
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2.5 rounded-lg liquid-glass-input text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-amber-400/80 transition-colors cursor-pointer"
                      >
                        {formData.serviceRequired && !servicesList.includes(formData.serviceRequired) && (
                          <option value={formData.serviceRequired} className="bg-[#12100e] text-amber-300 py-1.5 font-bold">
                            {formData.serviceRequired}
                          </option>
                        )}
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv} className="bg-[#12100e] text-slate-100 py-1.5 font-medium">
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="contact-date" className="block text-[11px] font-mono text-slate-100 font-bold mb-1.5 uppercase tracking-wider">
                        Preferred Date
                      </label>
                      <input
                        id="contact-date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2.5 rounded-lg liquid-glass-input text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label htmlFor="contact-time" className="block text-[11px] font-mono text-slate-100 font-bold mb-1.5 uppercase tracking-wider">
                        Preferred Time
                      </label>
                      <input
                        id="contact-time"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2.5 rounded-lg liquid-glass-input text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div>
                    <label htmlFor="contact-brief" className="block text-[11px] font-mono text-slate-100 font-bold mb-1.5 uppercase tracking-wider">
                      Project Brief *
                    </label>
                    <textarea
                      id="contact-brief"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setCursor("input")}
                      onBlur={resetCursor}
                      placeholder="Describe what you want to achieve, timeline expectations, or specific system requirements..."
                      className={`w-full px-3.5 py-2.5 rounded-lg liquid-glass-input text-xs sm:text-sm text-white font-semibold placeholder:text-slate-300 placeholder:font-normal focus:outline-none focus:border-amber-400/80 transition-colors resize-none ${
                        errors.message ? "!border-rose-500" : ""
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-rose-400 font-semibold mt-1 block">
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
                      className="w-full !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-[0_8px_24px_rgba(212,175,55,0.3)] cursor-pointer"
                      cursorLabel="SEND"
                      aria-label="Submit project enquiry"
                    >
                      {isSubmitting ? (
                        <span>Sending to team.zynova@gmail.com...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-slate-950" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}

              {/* Secondary CTA: Prefer email? */}
              <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 font-medium">
                <span>Prefer email?</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email ZYNOVA directly at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="font-mono text-amber-300 hover:text-amber-200 underline hover:no-underline transition-colors inline-flex items-center gap-1.5 font-bold min-h-[44px] sm:min-h-0 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
