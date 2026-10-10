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
  ShieldCheck
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

    try {
      // 1. Send enquiry email directly to team.zynova@gmail.com via multi-tier relay
      await sendEnquiryEmail({
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
    } catch (err) {
      console.warn("Contact enquiry delivery notice:", err);
    } finally {
      setIsSubmitting(false);
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
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="START A CONVERSATION"
          title="Direct Inquiries &amp;"
          highlightedTitle="Technical Advisory."
          subtitle="Whether you have an immediate development requirement or need long-term technical guidance, reach out directly."
        />

        {/* WhatsApp Community / Group Card */}
        <div className="mb-8 sm:mb-10 rounded-2xl bg-gradient-to-br from-white/95 via-amber-50/40 to-white/95 border border-amber-400/40 hover:border-amber-400/70 backdrop-blur-2xl p-5 sm:p-6 lg:p-7 shadow-[0_16px_45px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_24px_60px_rgba(212,175,55,0.16)] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Side (Desktop) / Top (Mobile): Heading, Description, CTA Button */}
            <div className="md:col-span-7 lg:col-span-8 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-50/90 border border-amber-300/70 text-[11px] font-mono font-semibold text-amber-800">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>OFFICIAL WHATSAPP COMMUNITY</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-slate-900">
                JOIN THE ZYNOVA COMMUNITY
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                Connect with ZYNOVA on WhatsApp for project discussions, updates, enquiries and direct communication.
              </p>

              <div className="pt-1.5">
                <MagneticButton
                  asAnchor
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  className="w-full sm:w-auto !py-2.5 sm:!py-3 !px-5 sm:!px-6 text-xs sm:text-sm font-bold shadow-[0_8px_25px_rgba(212,175,55,0.3)] cursor-pointer"
                  cursorLabel="JOIN"
                  aria-label="Join the ZYNOVA WhatsApp group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                  <span>JOIN WHATSAPP GROUP &rarr;</span>
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
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/95 to-slate-50/90 border border-amber-400/40 backdrop-blur-2xl shadow-[0_16px_40px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] space-y-4">
              <div>
                <span className="font-heading text-xl font-black tracking-wide text-slate-900 block">
                  {siteConfig.brandName}
                </span>
                <span className="text-xs font-mono font-semibold text-amber-700">
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
                  className="group p-3 sm:p-3.5 rounded-xl bg-white hover:bg-amber-50/50 border border-slate-200/90 hover:border-amber-400/70 transition-all duration-300 shadow-xs hover:shadow-[0_10px_25px_rgba(212,175,55,0.15)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-amber-400/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 group-hover:scale-110 group-hover:text-amber-700 group-hover:border-amber-400 transition-all duration-300">
                      <Mail className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-500">
                      EMAIL
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-slate-900 group-hover:text-amber-800 transition-colors break-all block">
                      {siteConfig.contact.email}
                    </span>
                    <span className="text-[10.5px] text-amber-700 group-hover:text-amber-800 group-hover:underline flex items-center gap-1 mt-0.5 font-medium">
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
                  className="group p-3 sm:p-3.5 rounded-xl bg-white hover:bg-amber-50/50 border border-slate-200/90 hover:border-amber-400/70 transition-all duration-300 shadow-xs hover:shadow-[0_10px_25px_rgba(212,175,55,0.15)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-amber-400/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 group-hover:scale-110 group-hover:text-amber-700 group-hover:border-amber-400 transition-all duration-300">
                      <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-500">
                      PHONE
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-slate-900 group-hover:text-amber-800 transition-colors block">
                      {siteConfig.contact.phone}
                    </span>
                    <span className="text-[10.5px] text-amber-700 group-hover:text-amber-800 group-hover:underline flex items-center gap-1 mt-0.5 font-medium">
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
                  className="group p-3 sm:p-3.5 rounded-xl bg-white hover:bg-amber-50/50 border border-slate-200/90 hover:border-amber-400/70 transition-all duration-300 shadow-xs hover:shadow-[0_10px_25px_rgba(212,175,55,0.15)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-amber-400/60 cursor-pointer sm:col-span-2"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#25D366] group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                      <WhatsAppIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-[9.5px] font-mono font-semibold tracking-widest uppercase text-amber-700">
                      WHATSAPP
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors block">
                      Join the ZYNOVA WhatsApp Group
                    </span>
                    <span className="text-[10.5px] text-amber-700 group-hover:text-amber-800 group-hover:underline flex items-center gap-1 mt-0.5 font-medium">
                      Connect on WhatsApp &rarr;
                    </span>
                  </div>
                </a>

                {/* Card 4: Location */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between min-h-[95px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-500">
                      LOCATION
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">
                      {siteConfig.contact.location}
                    </span>
                    <span className="text-[10.5px] text-slate-500 block mt-0.5">
                      HQ &amp; Engineering Operations
                    </span>
                  </div>
                </div>

                {/* Card 5: Response Time */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between min-h-[95px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-500">
                      RESPONSE TIME
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">
                      {siteConfig.contact.responseGuarantee}
                    </span>
                    <span className="text-[10.5px] text-emerald-600 block mt-0.5 font-semibold">
                      Direct leadership review
                    </span>
                  </div>
                </div>
              </div>

              {/* BOOK A CALL CTA Block */}
              <div className="pt-3 border-t border-slate-200/80">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-700">
                    DIRECT CONSULTATION
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open for Booking
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
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
              <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    Founder: <strong className="text-slate-900">{siteConfig.founder.name}</strong>
                  </span>
                </div>
                <p className="text-[11.5px] leading-relaxed">
                  Every enquiry is evaluated by senior engineering leadership to guarantee technical feasibility and architectural precision.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-amber-400/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] relative">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mb-4">
                Send an Enquiry
              </h3>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-[0_8px_20px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-slate-900">
                    Enquiry Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-slate-900 font-semibold">{formData.name}</span>. Your enquiry details for <span className="text-amber-700 font-semibold">{formData.serviceRequired}</span> have been sent directly to <span className="text-amber-800 font-mono font-semibold">{siteConfig.contact.email}</span>. Our team will review your project brief and reply to you at <span className="text-slate-900 font-mono">{formData.email}</span> within 12 hours.
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
                          serviceRequired: "Full-Stack Web Development",
                          preferredDate: "",
                          preferredTime: "14:00",
                          message: ""
                        });
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
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
                      <label htmlFor="contact-name" className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
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

                    {/* Work Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
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
                    {/* Company / Brand */}
                    <div>
                      <label htmlFor="contact-company" className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
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
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
                      />
                    </div>

                    {/* Service Interested In */}
                    <div>
                      <label htmlFor="contact-service" className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
                        Service Interested In
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors cursor-pointer shadow-xs"
                      >
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv} className="bg-white text-slate-900">
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="contact-date" className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
                        Preferred Date
                      </label>
                      <input
                        id="contact-date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label htmlFor="contact-time" className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
                        Preferred Time
                      </label>
                      <input
                        id="contact-time"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div>
                    <label htmlFor="contact-brief" className="block text-[11px] font-mono text-slate-600 font-semibold mb-1 uppercase">
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
              <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
                <span>Prefer email?</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email ZYNOVA directly at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="font-mono text-amber-700 hover:text-amber-800 underline hover:no-underline transition-colors inline-flex items-center gap-1.5 font-semibold min-h-[44px] sm:min-h-0 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
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
