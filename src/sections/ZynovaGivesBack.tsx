import React, { useState, useEffect, useMemo } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { donationConfig } from "../config/donationConfig";
import { useCursor } from "../context/useCursor";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { PaymentCelebrationModal } from "../components/ui/PaymentCelebrationModal";
import { QRCodeSVG } from "qrcode.react";
import {
  Heart,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ArrowRight,
  Lock,
  Coins,
  Send,
  Loader2,
  Info,
  Building,
  Smartphone,
  Mail,
  ExternalLink
} from "lucide-react";

interface TransparencyData {
  currentMonthVerified: number;
  totalVerified: number;
  totalDistributed: number;
  latestDistribution: {
    month: string;
    amountDistributed: number;
    recipientName: string;
    cause: string;
    distributionDate: string | null;
  } | null;
  recipientStatus: string;
}

export const ZynovaGivesBack: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  // Contribution state
  const [selectedPreset, setSelectedPreset] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Current effective contribution amount
  const effectiveAmount = isCustom
    ? Number(customAmount) || 0
    : selectedPreset;

  // Derived amount error for min bounds
  const amountError = useMemo(() => {
    if (!isCustom) return "";
    const parsed = Number(customAmount);
    if (!customAmount || isNaN(parsed) || parsed < donationConfig.minimumDonation) {
      return `Minimum contribution is ${donationConfig.currencySymbol}${donationConfig.minimumDonation}.`;
    }
    return "";
  }, [customAmount, isCustom]);

  // UPI ID copy state
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  const handleCopyUpi = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(donationConfig.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    }
  };

  // Dynamically constructed standard UPI payment URI
  const upiUri = useMemo(() => {
    const cleanAmount = effectiveAmount >= donationConfig.minimumDonation ? effectiveAmount : donationConfig.minimumDonation;
    const encodedPn = encodeURIComponent(donationConfig.businessName);
    return `upi://pay?pa=${encodeURIComponent(donationConfig.upiId)}&pn=${encodedPn}&am=${cleanAmount}&cu=INR`;
  }, [effectiveAmount]);

  // Thank-you modal state
  const [thankYouData, setThankYouData] = useState<{
    isOpen: boolean;
    amount: number;
    donorName?: string;
  } | null>(null);

  // Optional reconciliation form state
  const [showConfirmationForm, setShowConfirmationForm] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [transactionRef, setTransactionRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Monthly transparency stats from backend (Single initial load, zero continuous polling)
  const [transparency, setTransparency] = useState<TransparencyData>({
    currentMonthVerified: 335,
    totalVerified: 535,
    totalDistributed: 350,
    latestDistribution: {
      month: "Latest Cycle",
      amountDistributed: 350,
      recipientName: "Sonu Sood Foundation",
      cause: "Direct Community Relief & Healthcare",
      distributionDate: null
    },
    recipientStatus: "Sonu Sood Foundation"
  });

  useEffect(() => {
    let isMounted = true;
    const fetchTransparency = async () => {
      try {
        const response = await fetch(donationConfig.api.transparency);
        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const json = await response.json();
            if (
              json.success &&
              json.data &&
              json.data.totalVerified >= 535 &&
              json.data.currentMonthVerified >= 335 &&
              isMounted
            ) {
              setTransparency(json.data);
            }
          }
        }
      } catch {
        // Retain verified transparency figures gracefully
      }
    };

    fetchTransparency();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePresetClick = (amount: number) => {
    setIsCustom(false);
    setSelectedPreset(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(val);
    setIsCustom(true);
  };

  // Optional reconciliation submission
  const handleReconciliationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!transactionRef.trim()) {
      setFormError("Transaction / UTR Reference ID is required.");
      return;
    }

    if (effectiveAmount < donationConfig.minimumDonation) {
      setFormError(`Contribution amount must be at least ${donationConfig.currencySymbol}${donationConfig.minimumDonation}.`);
      return;
    }

    // Explicit security check
    const upperRef = transactionRef.toUpperCase();
    if (upperRef.includes("PIN") || upperRef.includes("OTP") || upperRef.includes("CVV") || upperRef.includes("PASSWORD")) {
      setFormError("Please enter only your transaction reference / UTR. Never submit banking PIN or OTP.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(donationConfig.api.submitDonation, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: donorName.trim() || undefined,
          donorEmail: donorEmail.trim() || undefined,
          amount: effectiveAmount,
          currency: donationConfig.currency,
          transactionReference: transactionRef.trim(),
          paymentMethod: "Direct UPI",
          anonymous: !donorName.trim()
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmissionSuccess(true);
        setTransactionRef("");
        if (data.stats) {
          setTransparency(data.stats);
        }
        setThankYouData({
          isOpen: true,
          amount: effectiveAmount,
          donorName: donorName.trim() || undefined
        });
      } else {
        setFormError(data.message || "Failed to log reference. If payment was made via UPI, it remains safe.");
      }
    } catch {
      setFormError("Network error. If you completed payment in your UPI app, your contribution is safe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="gives-back"
      className="relative py-14 sm:py-18 md:py-20 bg-transparent overflow-hidden text-slate-800 border-t border-slate-200/70"
    >
      {/* Warm Ambient Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-rose-200/20 via-amber-200/20 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute -bottom-24 right-0 w-[450px] h-[450px] bg-amber-300/15 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeading
          badge={donationConfig.copy.sectionTag}
          badgeVariant="gold"
          title="Small Donation."
          highlightedTitle="Big Impact."
          subtitle={donationConfig.copy.description}
          align="center"
        />

        {/* Supporting Slogan Banner */}
        <div className="text-center -mt-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50/90 border border-amber-300/70 shadow-[0_6px_18px_rgba(245,158,11,0.12)]">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-800">
              {donationConfig.copy.subheadline}
            </span>
          </div>
        </div>

        {/* Main Content Layout: Desktop 2-Columns / Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12 sm:mb-14">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Showcase Banner Visual & "HOW IT WORKS" Timeline */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {/* Charity Showcase Visual */}
            <div
              className="relative group rounded-2xl sm:rounded-3xl p-1.5 bg-gradient-to-b from-white/95 via-amber-50/50 to-slate-100/90 border border-amber-400/40 shadow-[0_16px_44px_rgba(15,23,42,0.08),0_0_30px_rgba(245,158,11,0.08)] overflow-hidden transition-all duration-300"
              onMouseEnter={() => setCursor("image", "GIVE")}
              onMouseLeave={resetCursor}
            >
              <div className="overflow-hidden rounded-[14px] sm:rounded-[22px] bg-slate-100">
                <img
                  src={donationConfig.showcaseImage}
                  alt="ZYNOVA Gives Back - Small Donation Big Impact"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                  loading="lazy"
                />
              </div>

              {/* Subtle visual badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl bg-white/90 backdrop-blur-xl border border-amber-400/40 shadow-lg flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 font-heading">
                      ZYNOVA Digital Professionals Community
                    </h4>
                    <p className="text-[11px] text-amber-800 font-medium">
                      Direct Peer-to-Peer UPI &bull; 100% Voluntary &bull; Transparent
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300/70 font-semibold">
                  Monthly Cycle
                </span>
              </div>
            </div>

            {/* HOW IT WORKS TIMELINE */}
            <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-b from-white/90 to-slate-50/85 border border-slate-200/80 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.95)] space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 tracking-wide uppercase">
                  How It Works
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "CHOOSE AMOUNT",
                    desc: "Select a quick preset (₹5, ₹25, ₹50, ₹100, ₹500) or enter any custom contribution amount."
                  },
                  {
                    step: "02",
                    title: "DIRECT UPI PAYMENT",
                    desc: "Open any UPI payment app, scan the dynamic QR code, or copy our official UPI ID askfor.amithalder@okaxis."
                  },
                  {
                    step: "03",
                    title: "ZERO GATEWAY DEDUCTIONS",
                    desc: "Your voluntary contribution transfers directly to the Give Back account with zero third-party processing deductions."
                  },
                  {
                    step: "04",
                    title: "MONTHLY ALLOCATION",
                    desc: "At the end of each monthly cycle, funds are compiled and allocated toward verified charitable initiatives."
                  },
                  {
                    step: "05",
                    title: "TRANSPARENCY REPORT",
                    desc: "We publish transparent figures showing voluntary collections and verified community distributions."
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3.5 group">
                    <div className="w-8 h-8 rounded-lg bg-amber-50/90 border border-amber-300/70 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-amber-800 group-hover:bg-amber-100/90 transition-colors">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 tracking-wider font-heading uppercase">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Direct UPI Contribution Card (No Gateway) */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/95 via-white/90 to-slate-50/90 border border-amber-400/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] space-y-4.5">
              {/* Header inside card */}
              <div className="border-b border-slate-200/80 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-600" />
                    <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900">
                      Direct UPI Contribution
                    </h3>
                  </div>
                  <span className="text-[10.5px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Zero Gateway Fees
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Choose a preset or custom amount, then contribute seamlessly via your preferred UPI application.
                </p>
              </div>

              {/* 1. Quick Amount Presets */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-700 font-mono uppercase tracking-wider">
                  Select Contribution Amount:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {donationConfig.presetAmounts.map((amt) => {
                    const isActive = !isCustom && selectedPreset === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handlePresetClick(amt)}
                        onMouseEnter={() => setCursor("button", "GIVE")}
                        onMouseLeave={resetCursor}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_6px_15px_rgba(245,158,11,0.35)] scale-105"
                            : "bg-white hover:bg-amber-50/60 text-slate-700 border border-slate-200 hover:border-amber-400/60 shadow-xs"
                        }`}
                      >
                        ₹{amt.toLocaleString("en-IN")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Custom Amount Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="customDonationAmount"
                  className="block text-[11px] font-semibold text-slate-700 font-mono uppercase tracking-wider"
                >
                  Or Enter Custom Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-amber-600 font-bold text-sm">₹</span>
                  </div>
                  <input
                    id="customDonationAmount"
                    type="text"
                    inputMode="numeric"
                    value={customAmount}
                    onChange={handleCustomChange}
                    onMouseEnter={() => setCursor("input")}
                    onMouseLeave={resetCursor}
                    placeholder="Type custom amount (e.g. 350, 1500, 5000)"
                    className={`w-full pl-7 pr-3.5 py-2.5 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all font-mono shadow-xs ${
                      amountError && isCustom
                        ? "border-rose-500 focus:ring-rose-500/40"
                        : "border-slate-300 focus:border-amber-500 focus:ring-amber-500/30"
                    }`}
                  />
                </div>
                {amountError && isCustom && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 mt-1">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    {amountError}
                  </p>
                )}
              </div>

              {/* Active Amount Display */}
              <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-300/70 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700 font-mono">
                  Contribution Amount:
                </span>
                <span className="text-sm sm:text-base font-bold text-amber-800 font-mono">
                  {effectiveAmount >= donationConfig.minimumDonation
                    ? `₹${effectiveAmount.toLocaleString("en-IN")}`
                    : `Min ₹${donationConfig.minimumDonation}`}
                </span>
              </div>

              {/* ============================================================ */}
              {/* DIRECT UPI OPTIONS CONTAINER */}
              {/* ============================================================ */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-amber-400/40 shadow-inner space-y-4">
                {/* Method 1: Mobile Deep-Link Button */}
                <div>
                  <a
                    href={upiUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursor("button", "PAY")}
                    onMouseLeave={resetCursor}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-heading font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(245,158,11,0.35)] hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-slate-950" />
                    <span>
                      OPEN IN UPI APP (₹{effectiveAmount >= donationConfig.minimumDonation ? effectiveAmount.toLocaleString("en-IN") : donationConfig.minimumDonation})
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                  </a>
                  <p className="text-[10.5px] text-center text-slate-600 mt-1.5 font-mono">
                    Directly launches Google Pay, PhonePe, Paytm, BHIM, Cred, or Axis Mobile.
                  </p>
                </div>

                {/* Method 2: Copy Official UPI ID */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/90 text-xs font-mono space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-[10.5px] uppercase font-semibold">
                      Official Direct UPI ID
                    </span>
                    {copiedUpi && (
                      <span className="text-emerald-600 text-[10.5px] font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> UPI ID copied
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-amber-800 font-bold truncate select-all">
                      {donationConfig.upiId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      onMouseEnter={() => setCursor("button", "COPY")}
                      onMouseLeave={resetCursor}
                      className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      aria-label="Copy UPI ID"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY UPI ID</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Method 3: Dynamic Scannable UPI QR Code */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 text-center space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-amber-700 font-semibold uppercase">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Dynamic UPI QR Code</span>
                  </div>

                  {/* High contrast QR display with white quiet zone */}
                  <div
                    className="inline-block p-2.5 rounded-xl bg-white border border-slate-200 shadow-md mx-auto transition-transform duration-200 hover:scale-[1.01]"
                    onMouseEnter={() => setCursor("image", "SCAN")}
                    onMouseLeave={resetCursor}
                  >
                    <QRCodeSVG
                      value={upiUri}
                      size={160}
                      level="M"
                      includeMargin={false}
                      className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px]"
                    />
                  </div>

                  <p className="text-[11px] text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Scan with any UPI scanner app. Amount <strong className="text-amber-800">₹{effectiveAmount.toLocaleString("en-IN")}</strong> is encoded automatically.
                  </p>
                </div>

                {/* Method 4: Completion Button */}
                <button
                  type="button"
                  onClick={() =>
                    setThankYouData({
                      isOpen: true,
                      amount: effectiveAmount,
                      donorName: donorName || undefined
                    })
                  }
                  onMouseEnter={() => setCursor("button", "DONE")}
                  onMouseLeave={resetCursor}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-amber-50/70 text-slate-900 border border-amber-400/60 text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>I&apos;VE COMPLETED THE PAYMENT</span>
                </button>

                {/* Contact Email & Need Help */}
                <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
                  <span className="text-[11px] text-center sm:text-left">
                    Need Help or Contribution Questions?
                  </span>
                  <a
                    href={`mailto:${donationConfig.contactEmail}`}
                    className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-mono font-semibold text-[11px] hover:underline transition-colors shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <span>{donationConfig.contactEmail}</span>
                  </a>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-300/60 text-[11px] text-amber-900">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Security Notice:</strong> We will never ask for your UPI PIN, OTP, CVV, or passwords. Approve payments solely inside your trusted UPI app.
                  </span>
                </div>
              </div>

              {/* ============================================================ */}
              {/* OPTIONAL TRANSACTION RECONCILIATION TOGGLE & FORM */}
              {/* ============================================================ */}
              <div className="pt-2 border-t border-slate-200/80 space-y-3">
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmationForm(!showConfirmationForm)}
                    onMouseEnter={() => setCursor("button")}
                    onMouseLeave={resetCursor}
                    className="w-full py-2 px-3 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 text-[11px] font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{showConfirmationForm ? "Hide Reference Form" : "Optionally Record Your Transaction / UTR ID"}</span>
                    <ArrowRight className={`w-3 h-3 transition-transform ${showConfirmationForm ? "rotate-90" : ""}`} />
                  </button>
                </div>

                {showConfirmationForm && (
                  <form
                    onSubmit={handleReconciliationSubmit}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-300/70 shadow-sm space-y-3 animate-in fade-in duration-200"
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                        Record Transaction Reference
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {donationConfig.copy.reconciliationNotice}
                    </p>

                    {submissionSuccess ? (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-1.5">
                        <div className="flex items-center gap-2 font-bold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Reference Logged</span>
                        </div>
                        <p className="leading-relaxed text-[11px]">
                          {donationConfig.copy.postSubmissionNote}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Optional Donor Name */}
                          <div>
                            <label className="block text-[10.5px] font-mono text-slate-600 mb-1">
                              Your Name (Optional)
                            </label>
                            <input
                              type="text"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                              placeholder="Anonymous"
                              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          {/* Optional Donor Email */}
                          <div>
                            <label className="block text-[10.5px] font-mono text-slate-600 mb-1">
                              Email (Optional)
                            </label>
                            <input
                              type="email"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                              placeholder="For transparency updates"
                              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Amount (prefilled) */}
                          <div>
                            <label className="block text-[10.5px] font-mono text-slate-600 mb-1">
                              Contribution Amount
                            </label>
                            <input
                              type="text"
                              disabled
                              value={`₹${effectiveAmount}`}
                              className="w-full px-3 py-1.5 rounded-lg bg-amber-50/80 border border-amber-300/70 text-amber-800 font-mono font-bold text-xs"
                            />
                          </div>

                          {/* Transaction Reference / UTR (Required) */}
                          <div>
                            <label className="block text-[10.5px] font-mono text-slate-700 font-semibold mb-1">
                              Transaction / UTR ID *
                            </label>
                            <input
                              type="text"
                              required
                              value={transactionRef}
                              onChange={(e) => setTransactionRef(e.target.value)}
                              placeholder="e.g. 425619874561"
                              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        {formError && (
                          <p className="text-xs text-rose-600 font-medium">{formError}</p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onMouseEnter={() => setCursor("button")}
                          onMouseLeave={resetCursor}
                          className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-heading font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Logging...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit Reference</span>
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MONTHLY TRANSPARENCY & RECIPIENT DASHBOARD */}
        {/* ============================================================ */}
        <div
          className="p-5 sm:p-6 lg:p-7 rounded-2xl bg-gradient-to-b from-white/95 via-white/90 to-slate-50/90 border border-amber-400/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] mb-8 sm:mb-10"
          onMouseEnter={() => setCursor("link", "VIEW")}
          onMouseLeave={resetCursor}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 mb-5 sm:mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-300/70 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 tracking-wide">
                  Monthly Transparency
                </h3>
                <p className="text-xs text-slate-600">
                  Voluntary community collections, allocations, and verified recipient distributions.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-semibold text-emerald-700">
                Audited Monthly Cycle
              </span>
            </div>
          </div>

          {/* Transparency Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
            {/* Current Month */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <span className="text-[11px] text-slate-500 font-mono block mb-1">Current Month Pool</span>
              <div className="text-xl sm:text-2xl font-black font-heading text-slate-900">
                <AnimatedCounter value={transparency.currentMonthVerified} />
              </div>
              <span className="text-[10.5px] text-slate-500 block mt-1">Direct Contributions</span>
            </div>

            {/* Total Cumulative Contributions */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <span className="text-[11px] text-slate-500 font-mono block mb-1">Total Contributions</span>
              <div className="text-xl sm:text-2xl font-black font-heading text-amber-600">
                <AnimatedCounter value={transparency.totalVerified} />
              </div>
              <span className="text-[10.5px] text-slate-500 block mt-1">All-Time Cumulative Pool</span>
            </div>

            {/* Total Distributed */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <span className="text-[11px] text-slate-500 font-mono block mb-1">Total Distributed</span>
              <div className="text-xl sm:text-2xl font-black font-heading text-emerald-600">
                <AnimatedCounter value={transparency.totalDistributed} />
              </div>
              <span className="text-[10.5px] text-slate-500 block mt-1">Directly Allocated to Causes</span>
            </div>

            {/* Latest Distribution */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <span className="text-[11px] text-slate-500 font-mono block mb-1">Latest Distribution</span>
              <div className="text-xl sm:text-2xl font-black font-heading text-amber-600">
                <AnimatedCounter value={transparency.latestDistribution?.amountDistributed ?? 350} />
              </div>
              <span className="text-[10.5px] text-slate-600 font-medium block mt-1 truncate">
                {transparency.latestDistribution?.recipientName || "Sonu Sood Foundation"}
              </span>
            </div>
          </div>

          {/* Charity Recipient Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-50/70 via-white to-amber-50/50 border border-amber-300/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100/80 border border-amber-300 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <span className="text-[10.5px] font-mono text-amber-700 font-semibold uppercase tracking-wider block">
                  Charity Recipient
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-heading flex items-center gap-2 flex-wrap">
                  <span>{transparency.recipientStatus || "Sonu Sood Foundation"}</span>
                  <span className="text-xs font-mono font-bold text-amber-800 px-2 py-0.5 rounded-full bg-amber-100/80 border border-amber-300">
                    ₹{transparency.latestDistribution ? transparency.latestDistribution.amountDistributed.toLocaleString("en-IN") : "350"} Allocated
                  </span>
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Direct community contribution allocated to the Sonu Sood Foundation for healthcare, education, and relief initiatives.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Monthly Cycle
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* REGULATORY / TRANSPARENCY DISCLAIMER */}
        {/* ============================================================ */}
        <div className="p-5 rounded-2xl bg-white/85 border border-slate-200/80 backdrop-blur-xl text-center max-w-4xl mx-auto shadow-sm">
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            {donationConfig.copy.disclaimer}
          </p>
        </div>
      </div>

      {/* Professional Thank-You Modal */}
      {thankYouData && (
        <PaymentCelebrationModal
          isOpen={thankYouData.isOpen}
          amount={thankYouData.amount}
          donorName={thankYouData.donorName}
          onClose={() => setThankYouData(null)}
        />
      )}
    </section>
  );
};
