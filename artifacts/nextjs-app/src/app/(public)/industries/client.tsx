"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import {
  ArrowRight, ShoppingCart, HeartPulse, Scale, GraduationCap,
  Building2, Plane, Utensils, Cpu, Home, Car, Dumbbell, Banknote,
  Tv2, ShoppingBag, Package, Wrench, Sparkles, PawPrint,
  ChevronLeft, ChevronRight,
  Target, Zap, CheckCircle2, Headphones, Users2, BarChart3,
  CheckCircle, Phone, Mail,
} from "lucide-react";

const INDUSTRIES = [
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    iconBg: "#2563EB",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=420&fit=crop&q=80",
    desc: "Drive qualified traffic, boost product visibility, and convert browsers into buyers with data-backed SEO and PPC strategies tailored for online stores.",
  },
  {
    icon: Banknote,
    title: "Fintech",
    iconBg: "#7C3AED",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=420&fit=crop&q=80",
    desc: "Build trust and capture high-value leads in regulated markets through compliant content strategies, local SEO, and precision PPC.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    iconBg: "#0EA5E9",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=420&fit=crop&q=80",
    desc: "Help patients find your practice or services through local SEO, content authority, and HIPAA-compliant digital campaigns.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    iconBg: "#2563EB",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=420&fit=crop&q=80",
    desc: "Attract students and professionals through organic search, paid ads, and content strategies that showcase your programs and outcomes.",
  },
  {
    icon: Car,
    title: "Logistics",
    iconBg: "#0891B2",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=420&fit=crop&q=80",
    desc: "Optimise supply chain visibility, drive freight inquiries, and grow B2B leads with targeted industrial SEO campaigns.",
  },
  {
    icon: Cpu,
    title: "Technology & SaaS",
    iconBg: "#7C3AED",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=420&fit=crop&q=80",
    desc: "Grow MRR through product-led content, technical SEO, and demand-gen strategies that turn search intent into paying customers.",
  },
  {
    icon: Plane,
    title: "Travel & Hospitality",
    iconBg: "#0EA5E9",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=420&fit=crop&q=80",
    desc: "Fill bookings year-round with seasonal content strategies, destination SEO, and paid campaigns that reach travellers at the moment of intent.",
  },
  {
    icon: Home,
    title: "Real Estate",
    iconBg: "#059669",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=420&fit=crop&q=80",
    desc: "Generate seller and buyer leads with hyper-local SEO, Google Maps dominance, and compelling property content strategies.",
  },
  {
    icon: Utensils,
    title: "Food & Restaurant",
    iconBg: "#F97316",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=420&fit=crop&q=80",
    desc: "Pack your tables and boost online orders with local SEO, Google Business optimisation, and social-first content strategies.",
  },
  {
    icon: Building2,
    title: "Legal & Law Firms",
    iconBg: "#4F46E5",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=420&fit=crop&q=80",
    desc: "Rank for high-intent legal keywords, dominate local search, and establish unquestioned authority with content that builds client trust.",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Wellness",
    iconBg: "#EC4899",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=420&fit=crop&q=80",
    desc: "Grow memberships, class bookings, and online product sales with SEO content, local search, and high-converting landing pages.",
  },
  {
    icon: Scale,
    title: "Automotive",
    iconBg: "#64748B",
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=420&fit=crop&q=80",
    desc: "Sell more vehicles and service appointments with VDP optimisation, local inventory ads, and high-intent keyword targeting.",
  },
];

const ON_DEMAND = [
  {
    icon: Tv2,
    title: "Streaming & OTT",
    iconBg: "#7C3AED",
    img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=800&fit=crop&q=80",
    desc: "Grow subscribers and reduce churn with content-led SEO, programmatic campaigns, and audience-first discovery strategies.",
  },
  {
    icon: ShoppingBag,
    title: "Grocery Delivery",
    iconBg: "#059669",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=800&fit=crop&q=80",
    desc: "Capture high-intent shoppers at checkout with local SEO, app store optimisation, and targeted digital advertising.",
  },
  {
    icon: Utensils,
    title: "Food Delivery",
    iconBg: "#F97316",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=800&fit=crop&q=80",
    desc: "Drive app downloads and repeat orders with restaurant SEO, review management, and geo-targeted paid campaigns.",
  },
  {
    icon: Car,
    title: "Ride-sharing",
    iconBg: "#0891B2",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=800&fit=crop&q=80",
    desc: "Attract drivers and riders simultaneously through multi-audience SEO, app marketing, and city-level expansion strategies.",
  },
  {
    icon: HeartPulse,
    title: "Telemedicine",
    iconBg: "#EF4444",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=800&fit=crop&q=80",
    desc: "Connect patients with virtual care through HIPAA-compliant content, medical SEO, and high-converting health campaigns.",
  },
  {
    icon: Sparkles,
    title: "Beauty & Wellness",
    iconBg: "#EC4899",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=800&fit=crop&q=80",
    desc: "Fill appointment books and boost retail sales with local SEO, influencer content strategies, and beauty-focused paid ads.",
  },
  {
    icon: Package,
    title: "Last-mile Delivery",
    iconBg: "#2563EB",
    img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=800&fit=crop&q=80",
    desc: "Win logistics contracts and B2B clients with technical SEO, industry directory visibility, and demand-gen content.",
  },
  {
    icon: Wrench,
    title: "Home Services",
    iconBg: "#64748B",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=800&fit=crop&q=80",
    desc: "Book more jobs in your service area with map-pack dominance, review generation, and neighbourhood-level targeting.",
  },
  {
    icon: GraduationCap,
    title: "Online Learning",
    iconBg: "#0EA5E9",
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=800&fit=crop&q=80",
    desc: "Increase course enrolments with content marketing, keyword-rich programme pages, and high-converting ad funnels.",
  },
  {
    icon: PawPrint,
    title: "Pet Care",
    iconBg: "#F59E0B",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=800&fit=crop&q=80",
    desc: "Connect pet owners with your services through local SEO, social content, and community-driven digital campaigns.",
  },
];

const WHY_CHOOSE_IND = [
  { icon: Target,       title: "Data-Driven Strategy",  desc: "Every decision backed by analytics and real performance data for measurable, industry-specific results.",              color: "#2563EB", bg: "#EFF6FF" },
  { icon: Zap,          title: "Fast Results",           desc: "Our proven methodologies deliver faster rankings and increased traffic within weeks across all industries.",           color: "#F59E0B", bg: "#FFFBEB" },
  { icon: CheckCircle2, title: "Transparent Reporting",  desc: "Regular detailed reports so you always know exactly how your campaigns are performing.",                              color: "#10B981", bg: "#ECFDF5" },
  { icon: Headphones,   title: "Dedicated Support",      desc: "A dedicated account manager with deep industry knowledge ensures personalized attention.",                            color: "#EF4444", bg: "#FEF2F2" },
  { icon: Users2,       title: "Industry Experts",       desc: "Our team brings specialised knowledge across 25+ industries, ensuring strategies that resonate.",                     color: "#8B5CF6", bg: "#F5F3FF" },
  { icon: BarChart3,    title: "Proven Track Record",    desc: "Hundreds of successful campaigns across diverse industries with documented case studies.",                            color: "#0EA5E9", bg: "#F0F9FF" },
];

const IND_CONTACTS = [
  { label: "Request a Quote",                    email: "business@topseoservices.co" },
  { label: "Partners Enquires",                  email: "partners@topseoservices.co" },
  { label: "Reference Checks /Misc. HR Enquires",email: "hr@topseoservices.co" },
  { label: "Other Enquires",                     email: "hello@topseoservices.co" },
];

export function IndustriesPageClient() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [odHovered, setOdHovered] = useState<number | null>(null);
  const [whyHovered, setWhyHovered] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: 1 | -1) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.offsetWidth / 4;
    sliderRef.current.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24"
        style={{ background: "linear-gradient(180deg, #f2f3f6 0%, #eef0f5 60%, #f8f9ff 100%)" }}
      >
        {/* soft blobs */}
        <m.div
          className="absolute top-0 left-[10%] w-80 h-80 rounded-full blur-[130px] pointer-events-none"
          style={{ background: "#bbf7d0", opacity: 0.35 }}
          animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute bottom-0 right-[10%] w-64 h-64 rounded-full blur-[110px] pointer-events-none"
          style={{ background: "#bfdbfe", opacity: 0.3 }}
          animate={{ y: [0, 18, 0], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <m.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "#fed7aa", opacity: 0.2 }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">

          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <span
              className="inline-flex items-center px-5 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}
            >
              Industries We Serve
            </span>
          </m.div>

          {/* Heading */}
          <m.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 text-slate-900"
          >
            Digital Growth Across
            <br />
            <span style={{ color: "#2563EB" }}>Every Industry</span>
          </m.h1>

          {/* Subtitle */}
          <m.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          >
            As a premier digital marketing agency, we deliver measurable growth through scalable
            services like SEO, PPC, and content marketing — tailored perfectly to each sector&apos;s
            audience and competitive landscape.
          </m.p>

          {/* CTA */}
          <m.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/contact">
              <m.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white shadow-md"
                style={{ background: "#F97316" }}
              >
                Get a Free Consultation <ArrowRight className="w-4 h-4" />
              </m.button>
            </Link>
            <Link href="/services">
              <m.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 text-slate-700 hover:border-slate-400 transition-colors"
                style={{ borderColor: "#e2e8f0" }}
              >
                Our Services
              </m.button>
            </Link>
          </m.div>
        </div>
      </section>

      {/* ── INDUSTRIES GRID ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Industries We <span style={{ color: "#2563EB" }}>Excel In</span>
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              We work with high-impact sectors where digital performance directly influences growth, delivering strategies that drive real business results.
            </p>
          </m.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map(({ icon: Icon, title, iconBg, img, desc }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 4) * 0.07, duration: 0.4 }}
                whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(0,0,0,0.22)" }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Background photo */}
                <img
                  src={img}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: hovered === i ? "scale(1.08)" : "scale(1)" }}
                />

                {/* Base dark gradient — always visible at bottom */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)" }}
                />

                {/* Hover overlay — fades in */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.82) 100%)",
                    opacity: hovered === i ? 1 : 0,
                  }}
                />

                {/* Icon badge — top left */}
                <div
                  className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center z-10"
                  style={{ background: iconBg }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Title — always bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="text-white font-bold text-sm leading-tight mb-0">{title}</h3>

                  {/* Desc + button — reveal on hover */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: hovered === i ? "120px" : "0", opacity: hovered === i ? 1 : 0 }}
                  >
                    <p className="text-slate-200 text-xs leading-relaxed mt-2 mb-3">{desc}</p>
                    <button className="inline-flex items-center gap-1.5 text-xs font-bold text-white border border-white/60 rounded-full px-3 py-1.5 hover:bg-white hover:text-slate-900 transition-colors duration-200">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ON DEMAND SLIDER ── */}
      <section className="py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #f8f9ff 0%, #eef0f7 100%)" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Header + nav row */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10 gap-4 flex-wrap"
          >
            <div>
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-3"
                style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}
              >
                Digital Growth
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
                On <span style={{ color: "#2563EB" }}>Demand</span>
              </h2>
              <p className="text-slate-500 text-base mt-2 max-w-lg">
                Specialised digital strategies built for fast-moving, app-first businesses where speed and scale are everything.
              </p>
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollSlider(-1)}
                className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(1)}
                className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </m.div>

          {/* Slider track */}
          <div
            ref={sliderRef}
            className="no-scrollbar flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {ON_DEMAND.map(({ icon: Icon, title, iconBg, img, desc }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08, duration: 0.45 }}
                whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(0,0,0,0.22)" }}
                className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
                style={{
                  width: "calc(25% - 12px)",
                  minWidth: "220px",
                  aspectRatio: "3/4",
                  scrollSnapAlign: "start",
                }}
                onHoverStart={() => setOdHovered(i)}
                onHoverEnd={() => setOdHovered(null)}
              >
                {/* Photo */}
                <img
                  src={img}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: odHovered === i ? "scale(1.08)" : "scale(1)" }}
                />

                {/* Base gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)" }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.82) 100%)",
                    opacity: odHovered === i ? 1 : 0,
                  }}
                />

                {/* Icon badge — top left */}
                <div
                  className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center z-10"
                  style={{ background: iconBg }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Title + reveal */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="text-white font-bold text-sm leading-tight">{title}</h3>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: odHovered === i ? "120px" : "0", opacity: odHovered === i ? 1 : 0 }}
                  >
                    <p className="text-slate-200 text-xs leading-relaxed mt-2 mb-3">{desc}</p>
                    <button className="inline-flex items-center gap-1.5 text-xs font-bold text-white border border-white/60 rounded-full px-3 py-1.5 hover:bg-white hover:text-slate-900 transition-colors duration-200">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <m.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}
              >
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight mb-6">
                Industry-Focused{" "}
                <span style={{ color: "#2563EB" }}>Digital<br />Excellence</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-md">
                With deep expertise across 25+ industries, our team combines sector-specific knowledge with data-driven strategies to deliver outstanding results for businesses of all sizes.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg hover:opacity-90 transition-opacity"
                  style={{ background: "#E53E3E" }}
                >
                  Start Your Journey <ArrowRight className="w-4 h-4" />
                </m.button>
              </Link>
            </m.div>

            {/* Right — 3×2 cards */}
            <div className="grid grid-cols-2 gap-4">
              {WHY_CHOOSE_IND.map(({ icon: Icon, title, desc, color, bg }, i) => (
                <m.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  onHoverStart={() => setWhyHovered(i)}
                  onHoverEnd={() => setWhyHovered(null)}
                  className="rounded-2xl p-5 border cursor-pointer"
                  style={{
                    backgroundColor: whyHovered === i ? color : "white",
                    borderColor: whyHovered === i ? color : "#f1f5f9",
                    boxShadow: whyHovered === i ? `0 12px 32px ${color}40` : "0 1px 6px rgba(0,0,0,0.06)",
                    transition: "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: whyHovered === i ? "rgba(255,255,255,0.2)" : bg, transition: "background 0.25s ease" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: whyHovered === i ? "white" : color, transition: "color 0.25s ease" }} />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: whyHovered === i ? "white" : "#0f172a", transition: "color 0.25s ease" }}>
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: whyHovered === i ? "rgba(255,255,255,0.85)" : "#64748b", transition: "color 0.25s ease" }}>
                    {desc}
                  </p>
                </m.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── LET'S GET STARTED ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* LEFT — form */}
            <m.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-8">
                Let&apos;s <span style={{ color: "#2563EB" }}>Get Started</span>
              </h2>

              <div className="space-y-4">
                <input
                  type="text" placeholder="Your Name*"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white"
                />
                <input
                  type="email" placeholder="Business Email*"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white"
                />
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-3 border border-slate-200 rounded-xl text-sm text-slate-600 bg-white flex-shrink-0 cursor-pointer">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>US +1</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                  <input
                    type="tel" placeholder="Phone Number *"
                    className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white"
                  />
                </div>
                <select
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>Select Budget</option>
                  <option>Under $1,000</option>
                  <option>$1,000 – $5,000</option>
                  <option>$5,000 – $15,000</option>
                  <option>$15,000+</option>
                </select>
                <textarea
                  rows={4} placeholder="Tell us about your project*"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white resize-none"
                />
                <m.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ background: "#F97316" }}
                >
                  Send Message
                </m.button>
              </div>
            </m.div>

            {/* RIGHT — red info card */}
            <m.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{ background: "#E53E3E", minHeight: "460px" }}
            >
              <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="absolute top-10 right-10 w-28 h-28 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-black text-white mb-2">
                  Hate Filling out Forms?
                </h3>
                <a href="mailto:business@topseoservices.co" className="text-white text-sm underline underline-offset-2 mb-6 inline-block hover:opacity-80 transition-opacity">
                  Email us.
                </a>
                <div className="mt-4 space-y-0 divide-y divide-white/10">
                  {IND_CONTACTS.map(({ label, email }) => (
                    <div key={label} className="flex items-start gap-3 py-4">
                      <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-bold text-sm mb-0.5">{label}</p>
                        <a href={`mailto:${email}`} className="text-red-100 text-xs hover:text-white transition-colors">{email}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #050d1f 0%, #0f1f4a 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <m.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none"
          style={{ background: "#2563EB", opacity: 0.15 }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <m.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
          >
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(249,115,22,0.15)", color: "#FB923C", border: "1px solid rgba(249,115,22,0.25)" }}
            >
              Don&apos;t See Your Industry?
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white leading-tight mb-5">
              We Grow Any Business That<br />
              <span style={{ color: "#F97316" }}>Wants to Be Found Online</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-xl mx-auto mb-8">
              Our team has worked with clients in over 50 sectors. If you&apos;re not listed above, reach out — we&apos;ll build a custom strategy around your market.
            </p>
            <Link href="/contact">
              <m.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm shadow-lg"
                style={{ background: "#F97316" }}
              >
                Talk to a Strategist <ArrowRight className="w-4 h-4" />
              </m.button>
            </Link>
          </m.div>
        </div>
      </section>

    </div>
  );
}
