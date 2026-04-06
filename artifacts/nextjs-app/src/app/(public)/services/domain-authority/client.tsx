"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Star, Phone, Mail,
  ArrowRight, CheckCircle2, TrendingUp,
  Users, Globe, BarChart3, Target,
  Zap, Shield, Clock, ChevronDown,
  Building2, ShoppingBag, Stethoscope,
  Heart, Home, ShoppingCart, Truck, GraduationCap, Briefcase, Monitor,
  FileText, Link2, Crown, Layers, Leaf, Send,
  Eye, Cpu, LayoutGrid, XCircle,
} from "lucide-react";

const ACCENT = "#7C3AED";

const SERVICE_CARDS = [
  { img: "/local-card-gbp.png",            title: "Google Business Profile Optimisation", desc: "We fully optimise your GBP listing — photos, categories, services, Q&A, and review responses — so you dominate the local 3-pack and attract nearby customers." },
  { img: "/local-card-citations.png",       title: "Local Citation Building",               desc: "We build and clean your business citations across 50+ directories, ensuring consistent NAP data that strengthens your local authority signals with Google." },
  { img: "/local-card-reviews.png",         title: "Review Generation & Management",        desc: "Our review generation system builds a steady stream of 5-star Google reviews, and we respond professionally to all feedback to boost your trust signals." },
  { img: "/local-card-keywords.png",        title: "Local Keyword Research",                desc: "We identify high-intent, geo-targeted keywords your ideal customers use when searching for businesses like yours, then map them to every page on your site." },
  { img: "/local-card-location-pages.png",  title: "Location Page Optimisation",           desc: "We create and optimise dedicated location pages for every service area you cover — each with unique content, schema markup, and local signals to rank." },
  { img: "/local-card-link-building.png",   title: "Local Link Building",                   desc: "We earn relevant backlinks from local news sites, chambers of commerce, community sponsorships, and niche directories to build your local domain authority." },
  { img: "/local-card-audit.png",           title: "Domain Authority Audit",                       desc: "A comprehensive audit of your GBP, citations, on-page signals, Core Web Vitals, and competitor positions — so we know exactly where to focus first." },
  { img: "/local-card-map-pack.png",        title: "Map Pack Domination",                   desc: "Our targeted strategy combines GBP signals, proximity optimisation, and review velocity to push your business into the Google Maps top 3 consistently." },
  { img: "/local-card-consulting.png",      title: "Domain Authority Consulting",                  desc: "Monthly strategy calls, competitive analysis, and clear performance reporting so you always know what we're doing and the measurable impact it's having." },
];

function ServiceCardsGrid() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICE_CARDS.map(({ img, title, desc }, i) => {
        const isOpen = openIdx === i;
        return (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl overflow-hidden bg-white border border-slate-100"
            style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}
          >
            {/* Image area */}
            <div className="relative overflow-hidden" style={{ height: 200 }}>
              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={title} className="w-full h-full object-cover" />

              {/* Description overlay — slides in when open */}
              <AnimatePresence>
                {isOpen && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    style={{ background: "rgba(37,99,235,0.93)" }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-white text-sm leading-relaxed">{desc}</p>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Toggle button — top right */}
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-lg transition-transform hover:scale-110"
                style={{ background: isOpen ? "#DC2626" : "#2563EB", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
              >
                {isOpen ? "×" : "+"}
              </button>
            </div>

            {/* Title bar */}
            <div className="px-5 py-4">
              <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
            </div>
          </m.div>
        );
      })}
    </div>
  );
}

const STATS = [
  { icon: Search,    value: "10,000+", label: "Keywords Ranked",    color: "#2563EB" },
  { icon: TrendingUp,value: "450%",    label: "Avg Traffic Growth", color: "#F97316" },
  { icon: Globe,     value: "3,500+",  label: "Projects Delivered", color: "#2563EB" },
  { icon: Users,     value: "120+",    label: "SEO Experts",        color: "#7C3AED" },
];

const SERVICES = [
  { icon: MapPin,    color: "#7C3AED", bg: "#F5F3FF", title: "Google Business Profile Optimisation", desc: "We fully optimise your GBP listing — photos, categories, services, Q&A, and review responses — so you dominate the local 3-pack." },
  { icon: Search,    color: "#2563EB", bg: "#EFF6FF", title: "Local Keyword Research",               desc: "Identify high-intent, geo-targeted keywords your ideal customers use when searching for businesses like yours near them." },
  { icon: Star,      color: "#F97316", bg: "#FFF7ED", title: "Review Generation & Management",       desc: "Build a steady stream of 5-star Google reviews and respond to feedback professionally to improve trust signals." },
  { icon: Globe,     color: "#7C3AED", bg: "#F5F3FF", title: "Local Citation Building",              desc: "Consistent NAP (Name, Address, Phone) across 50+ authoritative directories, data aggregators, and niche platforms." },
  { icon: BarChart3, color: "#7C3AED", bg: "#F5F3FF", title: "Local Link Building",                  desc: "Earn relevant backlinks from local news sites, chambers of commerce, sponsorships, and community partnerships." },
  { icon: Target,    color: "#DC2626", bg: "#FEF2F2", title: "On-Page Domain Authority",                    desc: "Optimise title tags, meta descriptions, schema markup, and location pages to reinforce your local relevance signals." },
];

const WHY_ITEMS = [
  { num: "01", icon: Zap,      title: "Fast Local Rankings",        desc: "Our domain authority campaigns typically move businesses into the top 3 map pack within 60–90 days." },
  { num: "02", icon: Shield,   title: "White-Hat Techniques Only",  desc: "Every tactic we use complies with Google's guidelines — no risky shortcuts that can get you penalised." },
  { num: "03", icon: BarChart3,title: "Transparent Reporting",      desc: "Monthly dashboards showing rank movements, map pack visibility, review velocity, and call tracking data." },
  { num: "04", icon: Users,    title: "Dedicated Domain Authority Team",   desc: "You get a specialist team — not a generalist — who understands the nuances of domain authority building." },
  { num: "05", icon: Clock,    title: "Ongoing Optimisation",       desc: "We continuously update your GBP, monitor competitors, and adjust strategy as Google's local algorithm evolves." },
  { num: "06", icon: Globe,    title: "Multi-Location Expertise",   desc: "From single storefronts to franchise chains across 50+ locations, we scale domain authority without losing precision." },
];

const PROCESS = [
  { step: "01", title: "Local Audit",          desc: "We audit your GBP, citations, reviews, on-page signals, and competitor rankings to map your current local footprint." },
  { step: "02", title: "Keyword Mapping",       desc: "We identify the highest-value local keywords and map them to your service pages and location-specific content." },
  { step: "03", title: "GBP Optimisation",      desc: "Fully optimise your Google Business Profile — categories, services, photos, attributes, and weekly posts." },
  { step: "04", title: "Citation Cleanup",      desc: "Fix inconsistent or duplicate NAP across directories to strengthen your local authority signals." },
  { step: "05", title: "Review Strategy",       desc: "Implement a review generation system that builds positive reviews consistently month after month." },
  { step: "06", title: "Measure & Scale",       desc: "Track map pack rankings, organic local traffic, and call volume — then scale what's working." },
];

const INDUSTRIES = [
  { icon: Heart,          label: "Healthcare",   color: "#2563EB", bg: "#2563EB", img: "/industry-healthcare.png" },
  { icon: Home,           label: "Real Estate",  color: "#DC2626", bg: "#DC2626", img: "/industry-real-estate.png" },
  { icon: ShoppingCart,   label: "E-commerce",   color: "#D97706", bg: "#D97706", img: "/industry-ecommerce.png" },
  { icon: ShoppingBag,    label: "Shopify",      color: "#7C3AED", bg: "#7C3AED", img: "/industry-shopify.png" },
  { icon: Truck,          label: "Logistics",    color: "#2563EB", bg: "#2563EB", img: "/industry-logistics.png" },
  { icon: GraduationCap,  label: "Education",    color: "#DC2626", bg: "#DC2626", img: "/industry-education.png" },
  { icon: Briefcase,      label: "B2B",          color: "#D97706", bg: "#D97706", img: "/industry-b2b.png" },
  { icon: Monitor,        label: "Enterprise",   color: "#7C3AED", bg: "#7C3AED", img: "/industry-enterprise.png" },
];

const FAQS = [
  { q: "Q1. What is domain authority and why does my business need it?",              a: "Domain Authority is the process of optimising your online presence to attract customers from specific geographic areas. If you serve a local audience, you need domain authority to appear in Google's map pack and local organic results when people nearby search for your services." },
  { q: "Q2. How long does it take to see results from domain authority?",             a: "Most businesses see measurable improvement in map pack rankings and local traffic within 60–90 days. Competitive markets may take 4–6 months for significant movement." },
  { q: "Q3. What's the difference between domain authority and regular SEO?",        a: "Regular SEO targets broader keyword rankings nationally or globally. Domain Authority focuses on geo-specific queries, Google Business Profile, local citations, and the map pack — it's designed to drive foot traffic and local calls." },
  { q: "Q4. How important is Google Business Profile for domain authority?",          a: "It's the single most important local ranking factor. A fully optimised GBP with consistent reviews, photos, and posts significantly improves your chances of appearing in the 3-pack." },
  { q: "Q5. Can you help with multiple business locations?",                    a: "Yes — we have extensive experience managing domain authority across multi-location businesses, franchise networks, and service-area businesses with 2 to 500+ locations." },
  { q: "Q6. Do online reviews affect domain authority rankings?",                     a: "Absolutely. Review quantity, velocity, and rating are confirmed local ranking factors. Our review generation strategy helps you build and maintain a strong review profile." },
  { q: "Q7. What are local citations and why do they matter?",                 a: "Citations are mentions of your business name, address, and phone number across the web. Consistent citations across authoritative directories (Yelp, Yellow Pages, etc.) reinforce your local authority." },
  { q: "Q8. Will you optimise my website as part of domain authority?",               a: "Yes — on-page optimisation including location pages, schema markup, meta data, and mobile performance are all part of our domain authority service." },
];

function TrustCard({
  num, Icon, color, bg, hoverBg, bar, title, desc, delay,
}: {
  num: string; Icon: React.ElementType; color: string; bg: string;
  hoverBg: string; bar: string; title: string; desc: string; delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border p-7 cursor-default transition-colors duration-300 overflow-hidden flex flex-col"
      style={{
        background: hovered ? hoverBg : "#fff",
        borderColor: hovered ? color + "40" : "#E2E8F0",
        boxShadow: hovered ? `0 4px 20px ${color}20` : "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top row: icon + faded number */}
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
          style={{ background: bg }}
        >
          <Icon className="w-5 h-5 transition-colors duration-300" style={{ color }} />
        </div>
        <span
          className="text-5xl font-black leading-none select-none"
          style={{ color: hovered ? color + "30" : "#F1F5F9" }}
        >
          {num}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-black text-slate-900 text-base mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>

      {/* Accent bar at bottom */}
      <div className="mt-6 h-0.5 rounded-full w-16 transition-all duration-300" style={{ background: bar, width: hovered ? "100%" : "4rem" }} />
    </m.div>
  );
}

/* ── Animated count-up number ── */
function AnimatedNumber({
  value, prefix = "", suffix = "", decimals = 0,
}: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end   = value;
    if (start === end) return;
    const duration  = 600;
    const startTime = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = start + (end - start) * eased;
      setDisplay(parseFloat(cur.toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
      else prevRef.current = end;
    };
    requestAnimationFrame(step);
  }, [value, decimals]);

  return (
    <span>
      {prefix}
      {decimals > 0
        ? display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : Math.round(display).toLocaleString()}
      {suffix}
    </span>
  );
}

export function DomainAuthorityPageClient() {
  const [openFaq, setOpenFaq]   = useState(-1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", countryCode: "+1", budget: "", message: "",
  });

  /* ── ROI Calculator state ── */
  const [traffic,    setTraffic]    = useState(5600);
  const [convRate,   setConvRate]   = useState(3);
  const [avgOrder,   setAvgOrder]   = useState(100);
  const [investment, setInvestment] = useState(2000);

  const projTraffic  = Math.round(traffic * 3.5);
  const conversions  = Math.round(projTraffic * (convRate / 100));
  const projRevenue  = conversions * avgOrder;
  const roi          = Math.round(((projRevenue - investment) / investment) * 100);
  const profit       = projRevenue - investment;

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden">

        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-local-seo.png"
          alt="Domain Authority hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay — gradient from dark left to slightly lighter right */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.80) 40%, rgba(0,0,0,0.45) 100%)" }}
        />

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 pb-28 pt-28">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5"
              style={{ background: "rgba(22,163,74,0.25)", color: "#4ADE80", border: "1px solid rgba(74,222,128,0.4)" }}
            >
              <MapPin className="w-3 h-3" /> #1 LOCAL SEO AGENCY
            </span>

            <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-tight mb-4">
              Reliable Domain Authority<br />
              <span style={{ color: "#4ADE80" }}>Optimisation</span><br />
              Services
            </h1>

            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.78)" }}>
              Achieving success locally involves more than just being present — it&apos;s about generating tangible business outcomes. As a top{" "}
              <strong className="text-white">domain authority services company</strong>, we combine data-driven tactics, Google Business Profile mastery, and citation authority to grow your local visibility.
            </p>

            <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Link
                href="#get-started"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white"
                style={{ background: ACCENT, boxShadow: "0 4px 20px rgba(124,58,237,0.45)" }}
              >
                Get Free Domain Authority Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </m.div>
          </m.div>
        </div>

        {/* Stats bar — overlapping the hero bottom */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div
              className="rounded-t-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100"
              style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}
            >
              {STATS.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="flex items-center gap-3 px-6 py-5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-lg font-black leading-none" style={{ color }}>{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      </section>

      {/* ── INTRO SPLIT ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Top heading — centered */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Reliable Domain Authority Engine Optimisation{" "}
              <span style={{ color: ACCENT }}>Services</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl mx-auto">
              Achieving local success involves more than just being present — it focuses on generating tangible outcomes. As a top domain authority services company, we combine data-driven tactics, creative implementation, and industry expertise to deliver tangible business growth.
            </p>
          </m.div>

          {/* Two-column split */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left — image with floating badges */}
            <m.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/local-seo-team-analytics.png"
                  alt="Domain Authority team reviewing analytics"
                  className="w-full object-cover rounded-2xl"
                  style={{ maxHeight: 380 }}
                />

                {/* Green badge — bottom-right inside image */}
                <div
                  className="absolute bottom-4 right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                  style={{ background: ACCENT, boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}
                >
                  <TrendingUp className="w-4 h-4 text-white flex-shrink-0" />
                  <div>
                    <p className="text-white font-black text-sm leading-none">4.5× More Traffic</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>Average organic growth rate</p>
                  </div>
                </div>
              </div>

              {/* White keyword badge — bottom-left, overlapping below image */}
              <m.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute -bottom-6 left-4 flex items-center gap-3 bg-white rounded-xl px-5 py-3"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid #F1F5F9" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#EFF6FF" }}>
                  <Search className="w-4 h-4" style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm leading-none">10,000+ Keywords Ranked</p>
                  <p className="text-xs text-slate-400 mt-0.5">Driving qualified organic traffic</p>
                </div>
              </m.div>
            </m.div>

            {/* Right — copy */}
            <m.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="pt-8 lg:pt-0"
            >
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Domain Authority Engine Optimisation (Domain Authority) is the practice of optimising your online presence to rank higher in geo-targeted search results — especially Google&apos;s local 3-pack. Unlike paid advertising, domain authority builds long-term, sustainable visibility that generates free, high-quality local traffic 24/7.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Our comprehensive domain authority services cover everything from Google Business Profile optimisation and citation building to on-page location signals and review generation — ensuring your business becomes the go-to authority in your local market. Whether you&apos;re a single location or a growing multi-site franchise, our proven domain authority strategies deliver measurable results.
              </p>
              <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                <Link
                  href="#get-started"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white"
                  style={{ background: "#2563EB", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
                >
                  Talk to a Domain Authority Expert <ArrowRight className="w-4 h-4" />
                </Link>
              </m.div>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS GRID ── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-3">
              Empower Your Brand With The Best
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5" style={{ color: ACCENT }}>
              Domain Authority Services Company
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              As a trusted domain authority agency, Top SEO Services provides comprehensive domain authority optimisation services designed to improve map pack rankings, increase foot traffic, and maximise conversions. Our tailored services make sure businesses achieve long-term success in their local market.
            </p>
          </m.div>

          {/* 3-column card grid */}
          <ServiceCardsGrid />

        </div>
      </section>

      {/* ── INVISIBLE ON GOOGLE CTA ── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl"
            style={{ background: "#111827" }}
          >
            <div className="grid lg:grid-cols-[1fr_1fr] min-h-[200px]">

              {/* Left — photo with purple overlay */}
              <div className="relative overflow-hidden hidden lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/local-cta-analytics.png"
                  alt="Analytics growth charts"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Purple tint + right-side fade */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, rgba(109,40,217,0.55) 0%, rgba(17,24,39,0.85) 75%, #111827 100%)" }}
                />
              </div>

              {/* Right — copy */}
              <div className="flex flex-col justify-center px-10 py-10 relative z-10">
                <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-4">
                  Tired of Being{" "}
                  <em className="not-italic" style={{ color: "#4ADE80" }}>
                    Invisible on Google?
                  </em>
                </h2>
                <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Our domain authority experts build organic growth engines that transform your website into a lead-generating machine with sustainable, long-term rankings.
                </p>
                <div>
                  <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    <Link
                      href="#get-started"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: ACCENT, boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}
                    >
                      Schedule a Call Today! <ArrowRight className="w-4 h-4" />
                    </Link>
                  </m.div>
                </div>
              </div>

            </div>
          </m.div>
        </div>
      </section>

      {/* ── WHY BUSINESSES TRUST US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-3">
              Why Businesses Trust Our
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5" style={{ color: ACCENT }}>
              Domain Authority Services
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Our domain authority engine optimisation services deliver sustainable map pack rankings, qualified foot traffic, and measurable revenue. Here&apos;s what sets our domain authority agency apart from the competition.
            </p>
          </m.div>

          {/* 3×2 hover cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: "01", icon: Target,    color: "#2563EB", bg: "#EFF6FF", hoverBg: "#EFF6FF",
                bar: "#2563EB",
                title: "Data-Driven Local Strategy",
                desc: "Our domain authority specialists conduct deep keyword and competitor research to identify high-value geo-targeted terms that drive qualified traffic and local conversions for your business.",
              },
              {
                num: "02", icon: TrendingUp, color: "#7C3AED", bg: "#F5F3FF", hoverBg: "#F5F3FF",
                bar: "#7C3AED",
                title: "Sustainable Local Growth",
                desc: "We build long-term domain authority strategies that deliver compounding results over time. Our map pack optimisation creates a permanent local asset that generates free, qualified traffic 24/7.",
              },
              {
                num: "03", icon: Globe,      color: "#DC2626", bg: "#FEF2F2", hoverBg: "#FEF2F2",
                bar: "#DC2626",
                title: "Technical SEO Excellence",
                desc: "Our team resolves complex technical issues — from Core Web Vitals and site architecture to crawlability and schema markup — ensuring search engines can efficiently discover and rank your local pages.",
              },
              {
                num: "04", icon: BarChart3,  color: "#D97706", bg: "#FFFBEB", hoverBg: "#FFFBEB",
                bar: "#D97706",
                title: "Transparent Reporting & Analytics",
                desc: "Access detailed domain authority dashboards showing map pack ranking trends, organic traffic by location, review velocity, and call tracking data. Complete visibility with actionable insights every month.",
              },
              {
                num: "05", icon: Zap,        color: "#2563EB", bg: "#EFF6FF", hoverBg: "#EFF6FF",
                bar: "#2563EB",
                title: "Content That Ranks Locally",
                desc: "Our content team creates locally-optimised pages that satisfy search intent while engaging your target audience. Every location page and blog post is crafted to rank and drive meaningful local business results.",
              },
              {
                num: "06", icon: Shield,     color: "#7C3AED", bg: "#F5F3FF", hoverBg: "#F5F3FF",
                bar: "#7C3AED",
                title: "Proven Local Track Record",
                desc: "With 10,000+ keywords ranked on page one and 450%+ average traffic growth, our domain authority team has the experience and expertise to deliver measurable results across every industry and market.",
              },
            ].map(({ num, icon: Icon, color, bg, hoverBg, bar, title, desc }, i) => (
              <TrustCard
                key={num}
                num={num} Icon={Icon} color={color} bg={bg}
                hoverBg={hoverBg} bar={bar} title={title} desc={desc} delay={i * 0.07}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-2">
              Industries We Serve With
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5" style={{ color: ACCENT }}>
              Domain Authority Services
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl mx-auto">
              We deliver industry-specific domain authority strategies that understand your market, target audience, and competitive landscape to drive qualified local traffic and sustainable growth.
            </p>
          </m.div>

          {/* 4×2 image card grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map(({ icon: Icon, label, bg, img }, i) => (
              <m.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative overflow-hidden rounded-2xl cursor-default group"
                style={{ aspectRatio: "4/3" }}
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
                />

                {/* Colored icon badge — top-left */}
                <div
                  className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Label — bottom-left */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-white font-bold text-sm drop-shadow">{label}</span>
                </div>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── VIDEO CTA ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
            style={{ minHeight: 320 }}
          >
            {/* Left dark panel */}
            <div className="relative z-10 flex flex-col justify-center px-10 py-14 md:py-16 md:w-1/2 bg-[#0F172A]">
              <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-4">
                Getting Traffic But{" "}
                <em className="not-italic font-black" style={{ color: "#F97316" }}>
                  No Rankings?
                </em>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                We fix technical issues, optimise your content, and build authority through strategic link building to help you dominate page one of Google.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white w-fit transition-opacity hover:opacity-90"
                style={{ background: "#2563EB" }}
              >
                Schedule a Strategy Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Fade bridge — dark → transparent so video bleeds through */}
            <div
              className="absolute inset-y-0 left-0 md:left-[48%] w-32 z-10 hidden md:block pointer-events-none"
              style={{ background: "linear-gradient(to right, #0F172A, transparent)" }}
            />

            {/* Right — video */}
            <div className="absolute inset-0 md:left-[45%] left-0 top-0 bottom-0 overflow-hidden">
              {/* Overlay to darken on mobile so text is legible */}
              <div className="absolute inset-0 bg-black/50 md:hidden z-10" />
              <video
                src="/cta-analytics.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </m.div>
        </div>
      </section>

      {/* ── HOW OUR SEO SERVICES ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              How Our SEO Services
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5 text-[#2563EB]">
              Drive Organic Growth &amp; Revenue
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Our search engine optimisation strategies combine technical excellence, content mastery, and authority building to deliver measurable organic growth and sustainable business results.
            </p>
          </m.div>

          {/* 3×2 card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Target,    color: "#2563EB",
                title: "Strategic Keyword Research",
                desc: "We identify and target high-value keywords using search volume, competition analysis, and commercial intent data to ensure your content ranks for queries that drive qualified organic traffic and conversions.",
              },
              {
                icon: Search,    color: "#EF4444",
                title: "Comprehensive Site Audits",
                desc: "Our thorough technical and content audits uncover every issue holding your site back — from crawl errors and broken links to thin content and missing schema markup — creating a clear roadmap for improvement.",
              },
              {
                icon: FileText,  color: "#D97706",
                title: "On-Page Optimisation",
                desc: "We optimise every element of your pages — title tags, meta descriptions, headers, internal links, image alt text, and content structure — to maximise relevance and ranking potential for target keywords.",
              },
              {
                icon: BarChart3, color: "#7C3AED",
                title: "Performance Tracking & Analytics",
                desc: "Advanced rank tracking, organic traffic analysis, and conversion attribution give you complete visibility into SEO performance, enabling data-driven decisions that improve results week over week.",
              },
              {
                icon: Link2,     color: "#2563EB",
                title: "Authority Link Building",
                desc: "We systematically build high-quality backlinks from authoritative, relevant websites through digital PR, guest posting, and strategic outreach to boost your domain authority and search engine trust.",
              },
              {
                icon: Globe,     color: "#EF4444",
                title: "Content Strategy & Creation",
                desc: "Our content team develops SEO-optimised articles, guides, and pillar pages that satisfy search intent, build topical authority, and generate organic traffic that converts into leads and customers.",
              },
            ].map(({ icon: Icon, color, title, desc }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex flex-col gap-4 p-7 rounded-2xl border border-slate-100 bg-white cursor-default transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                {/* Title */}
                <h3 className="text-base font-bold leading-snug" style={{ color }}>
                  {title}
                </h3>
                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section className="py-20" style={{ background: "#0F172A" }}>
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-white leading-tight">
              Calculate Your SEO
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5">
              <span style={{ color: "#7C3AED" }}>Growth</span>{" "}
              <span style={{
                background: "linear-gradient(90deg,#2563EB,#F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Potential</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
              Use our free SEO ROI calculator to estimate your organic traffic growth, conversions, and revenue potential based on your current metrics.
            </p>
          </m.div>

          {/* Two-panel layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

            {/* LEFT — inputs */}
            <m.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl p-8"
              style={{ background: "#1C2438" }}
            >
              {/* Panel header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ACCENT }}>
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-base">Your SEO Parameters</span>
              </div>

              {/* Sliders */}
              {[
                { label: "Current Monthly Organic Traffic", value: traffic,    setter: setTraffic,    min: 100,  max: 50000, step: 100,  display: traffic.toLocaleString() },
                { label: "Conversion Rate",                  value: convRate,   setter: setConvRate,   min: 0.1,  max: 20,    step: 0.1,  display: `${convRate}` },
                { label: "Avg Order Value",                  value: avgOrder,   setter: setAvgOrder,   min: 10,   max: 5000,  step: 10,   display: avgOrder.toLocaleString() },
                { label: "Monthly SEO Investment",           value: investment, setter: setInvestment, min: 500,  max: 20000, step: 100,  display: investment.toLocaleString() },
              ].map(({ label, value, setter, min, max, step, display }) => (
                <div key={label} className="mb-8 last:mb-0">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-400 text-sm">{label}</span>
                    <span
                      className="text-white text-sm font-bold px-3 py-1 rounded-lg"
                      style={{ background: "#111827", minWidth: 64, textAlign: "center" }}
                    >
                      {display}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={min} max={max} step={step}
                    value={value}
                    onChange={e => setter(parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-blue-500"
                    style={{ background: `linear-gradient(to right,#2563EB ${((value - min) / (max - min)) * 100}%,#374151 ${((value - min) / (max - min)) * 100}%)` }}
                  />
                </div>
              ))}
            </m.div>

            {/* RIGHT — results */}
            <m.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              {/* Results header */}
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5" style={{ color: ACCENT }} />
                <span className="text-white font-bold text-base">Projected Results (12 months)</span>
              </div>

              {/* Result rows */}
              {[
                { icon: Search,     bg: "#2563EB", label: "Projected Traffic",   value: projTraffic, prefix: "",   suffix: "" },
                { icon: Target,     bg: "#7C3AED", label: "Conversions/Mo",      value: conversions,  prefix: "",   suffix: "" },
                { icon: TrendingUp, bg: "#D97706", label: "Projected Revenue",   value: projRevenue,  prefix: "$",  suffix: "" },
                { icon: BarChart3,  bg: "#EF4444", label: "ROI",                 value: roi,          prefix: "",   suffix: "%" },
              ].map(({ icon: Icon, bg, label, value, prefix, suffix }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-5 py-4 rounded-xl"
                  style={{ background: "#1C2438" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-400 text-sm">{label}</span>
                  </div>
                  <span className="text-white font-black text-xl tabular-nums">
                    <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
                  </span>
                </div>
              ))}

              {/* Estimated Profit highlight */}
              <div
                className="flex items-center justify-between px-5 py-4 rounded-xl mt-1"
                style={{ background: "linear-gradient(135deg,#14532D,#166534)" }}
              >
                <div>
                  <p className="text-green-300 text-xs font-semibold mb-1 uppercase tracking-wide">Estimated Profit</p>
                  <p className="text-green-400 font-black text-2xl tabular-nums">
                    <AnimatedNumber value={profit} prefix={profit >= 0 ? "+$" : "-$"} />
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#7C3AED" }}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* CTA button */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}
              >
                Get a Free SEO Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20" style={{ background: "#F1F5F9" }}>
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              Affordable &amp; Results-Driven
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5 text-[#2563EB]">
              SEO Packages
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Unlock the full potential of organic search with our performance-driven, cost-effective SEO packages. Our pricing is tailored to boost your rankings and drive meaningful results that fit your business needs.
            </p>
          </m.div>

          {/* 3-column card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">

            {/* ── BASIC ── */}
            <m.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col gap-6"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#2563EB" }}>
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              {/* Title */}
              <div>
                <h3 className="text-xl font-display font-black text-slate-900">Basic SEO Plan</h3>
                <p className="text-slate-400 text-sm mt-1">Starter Package</p>
              </div>
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 w-fit">
                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">On-Page SEO, Technical SEO, Domain Authority</span>
              </div>
              {/* Features */}
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">What&apos;s Included:</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Comprehensive SEO audit and analysis",
                    "Keyword research and mapping (up to 30 keywords)",
                    "On-page optimisation for key pages",
                    "Technical SEO fixes and improvements",
                    "Google Business Profile optimisation",
                    "Monthly content recommendations",
                    "Rank tracking and performance monitoring",
                    "Monthly SEO performance report",
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* CTA */}
              <Link
                href="/contact"
                className="mt-auto flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                Get Started with Basic <ArrowRight className="w-4 h-4" />
              </Link>
            </m.div>

            {/* ── ADVANCED (Most Popular) ── */}
            <m.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
              className="relative bg-white rounded-2xl border-2 p-8 flex flex-col gap-6"
              style={{ borderColor: ACCENT }}
            >
              {/* Most Popular badge */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white text-xs font-bold"
                style={{ background: ACCENT }}
              >
                Most Popular
              </div>
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mt-2" style={{ background: ACCENT }}>
                <Zap className="w-7 h-7 text-white" />
              </div>
              {/* Title */}
              <div>
                <h3 className="text-xl font-display font-black text-slate-900">Advanced SEO Plan</h3>
                <p className="text-slate-400 text-sm mt-1">Growth Package</p>
              </div>
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 w-fit">
                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Full On-Page, Off-Page, Technical, Content SEO</span>
              </div>
              {/* Features */}
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">What&apos;s Included:</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Everything in the Basic plan, plus",
                    "Extended keyword targeting (up to 80 keywords)",
                    "Strategic link building (10+ links/month)",
                    "Content creation (4 SEO blog posts/month)",
                    "Competitor analysis and gap identification",
                    "Schema markup implementation",
                    "Core Web Vitals optimisation",
                    "Bi-weekly strategy calls and reporting",
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* CTA */}
              <Link
                href="/contact"
                className="mt-auto flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}
              >
                Avail your Advanced Plan <ArrowRight className="w-4 h-4" />
              </Link>
            </m.div>

            {/* ── CUSTOM ── */}
            <m.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col gap-6"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#EF4444" }}>
                <Crown className="w-7 h-7 text-white" />
              </div>
              {/* Title */}
              <div>
                <h3 className="text-xl font-display font-black text-slate-900">Custom SEO Plan</h3>
                <p className="text-slate-400 text-sm mt-1">Enterprise Package</p>
              </div>
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 w-fit">
                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Fully customisable</span>
              </div>
              {/* Features */}
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">What&apos;s Included:</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Custom SEO strategy aligned with business goals",
                    "Unlimited keyword targeting and optimisation",
                    "Premium link building (25+ links/month)",
                    "Content hub development and pillar pages",
                    "Advanced technical SEO and site architecture",
                    "International and multi-location SEO",
                    "Dedicated SEO manager and weekly calls",
                    "Custom analytics dashboard and attribution",
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* CTA */}
              <Link
                href="/contact"
                className="mt-auto flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                Request a Custom SEO Strategy <ArrowRight className="w-4 h-4" />
              </Link>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── PREDICTABLE REVENUE CTA ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
            style={{ minHeight: 300, background: "#0F172A" }}
          >
            {/* Left — photo */}
            <div className="absolute inset-0 md:right-[50%] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cta-meeting-analytics.png"
                alt="Team reviewing SEO analytics"
                className="w-full h-full object-cover"
              />
              {/* Fade to dark on the right */}
              <div
                className="absolute inset-0 hidden md:block pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent 40%, #0F172A 100%)" }}
              />
              {/* Mobile dark overlay */}
              <div className="absolute inset-0 bg-black/60 md:hidden" />
            </div>

            {/* Right — text content */}
            <div className="relative z-10 flex flex-col justify-center md:ml-[50%] px-10 py-14 md:py-16">
              <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-3">
                Ready to Turn Organic Traffic Into
              </h2>
              <h2 className="text-2xl md:text-3xl font-display font-black leading-tight mb-5">
                <em className="not-italic" style={{ color: "#F97316" }}>Predictable Revenue?</em>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                Our SEO team builds scalable organic growth systems backed by data, content excellence, and technical precision that grow your business month over month.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white w-fit transition-opacity hover:opacity-90"
                style={{ background: "#F97316" }}
              >
                Request a Free SEO Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              Our Proven
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5 text-[#2563EB]">
              SEO Process
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Our systematic 6-step SEO process ensures your website is built for organic success, delivering measurable ranking improvements and continuous traffic growth from day one.
            </p>
          </m.div>

          {/* Staggered 6-card row — desktop only stagger, mobile stacks */}
          <div className="hidden lg:flex items-start gap-4">
            {[
              {
                step: "01", color: "#F43F5E", bg: "#FFF1F2", icon: Search,
                title: "Discovery\nand Audit",
                desc: "We begin with a comprehensive SEO audit, analysing your website's technical health, content quality, backlink profile, and competitor landscape to identify quick wins and long-term growth opportunities.",
                mt: 0,
              },
              {
                step: "02", color: "#F97316", bg: "#FFF7ED", icon: Target,
                title: "Strategy &\nPlanning",
                desc: "We develop a customised SEO strategy including keyword targeting, content roadmap, link building plan, and technical priorities aligned with your business objectives and competitive landscape.",
                mt: 56,
              },
              {
                step: "03", color: "#3B82F6", bg: "#EFF6FF", icon: Layers,
                title: "Technical\nOptimisation",
                desc: "Our team fixes technical issues — site speed, Core Web Vitals, crawlability, indexation, schema markup, and site architecture — to build a solid foundation for organic growth.",
                mt: 96,
              },
              {
                step: "04", color: "#10B981", bg: "#EDE9FE", icon: Leaf,
                title: "Content &\nOn-Page",
                desc: "We create and optimise high-quality content, implement on-page SEO best practices, build internal linking structures, and ensure every page is optimised for its target keywords.",
                mt: 20,
              },
              {
                step: "05", color: "#8B5CF6", bg: "#F5F3FF", icon: BarChart3,
                title: "Link Building\n& Authority",
                desc: "Through strategic outreach, digital PR, guest posting, and content marketing, we build high-authority backlinks that boost your domain authority and improve rankings across the board.",
                mt: 76,
              },
              {
                step: "06", color: "#F43F5E", bg: "#FFF1F2", icon: TrendingUp,
                title: "Monitor &\nScale",
                desc: "We continuously track rankings, analyse performance data, and refine strategies to expand your organic footprint — targeting new keywords, creating new content, and scaling what works.",
                mt: 8,
              },
            ].map(({ step, color, bg, icon: Icon, title, desc, mt }, i) => (
              <m.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3"
                style={{ marginTop: mt }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-sm font-black text-slate-900 leading-snug whitespace-pre-line">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </m.div>
            ))}
          </div>

          {/* Mobile — simple stacked list */}
          <div className="flex flex-col gap-4 lg:hidden">
            {[
              { step: "01", color: "#F43F5E", bg: "#FFF1F2", icon: Search,     title: "Discovery and Audit",         desc: "Comprehensive SEO audit analysing technical health, content quality, and backlink profile to uncover growth opportunities." },
              { step: "02", color: "#F97316", bg: "#FFF7ED", icon: Target,     title: "Strategy & Planning",          desc: "Customised SEO strategy with keyword targeting, content roadmap, link building plan, and technical priorities." },
              { step: "03", color: "#3B82F6", bg: "#EFF6FF", icon: Layers,     title: "Technical Optimisation",       desc: "Fix technical issues — site speed, Core Web Vitals, crawlability, schema markup, and site architecture." },
              { step: "04", color: "#10B981", bg: "#EDE9FE", icon: Leaf,       title: "Content & On-Page",            desc: "Create and optimise high-quality content, implement on-page SEO, and build internal linking structures." },
              { step: "05", color: "#8B5CF6", bg: "#F5F3FF", icon: BarChart3,  title: "Link Building & Authority",    desc: "Build high-authority backlinks via strategic outreach, digital PR, and guest posting campaigns." },
              { step: "06", color: "#F43F5E", bg: "#FFF1F2", icon: TrendingUp, title: "Monitor & Scale",              desc: "Track rankings, analyse performance data, and refine strategies to continuously expand your organic footprint." },
            ].map(({ step, color, bg, icon: Icon, title, desc }, i) => (
              <m.div
                key={step}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex gap-4 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 mb-0.5">Step {step}</p>
                  <h3 className="text-sm font-black text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </m.div>
            ))}
          </div>

          {/* Wavy connector line with dots — desktop only */}
          <div className="hidden lg:block mt-6 mb-8">
            <svg
              viewBox="0 0 1200 140"
              preserveAspectRatio="none"
              className="w-full"
              style={{ height: 140 }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"    stopColor="#F43F5E" />
                  <stop offset="20%"   stopColor="#F97316" />
                  <stop offset="40%"   stopColor="#3B82F6" />
                  <stop offset="60%"   stopColor="#10B981" />
                  <stop offset="80%"   stopColor="#8B5CF6" />
                  <stop offset="100%"  stopColor="#F43F5E" />
                </linearGradient>
              </defs>
              {/* Wave path */}
              <path
                d="M 100,30 C 175,30 225,75 300,75 C 375,75 425,105 500,105 C 575,105 625,35 700,35 C 775,35 825,90 900,90 C 975,90 1025,28 1100,28"
                fill="none"
                stroke="url(#waveGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Dots + step labels */}
              {[
                { x: 100,  y: 30,  color: "#F43F5E", step: "Step 01" },
                { x: 300,  y: 75,  color: "#F97316", step: "Step 02" },
                { x: 500,  y: 105, color: "#3B82F6", step: "Step 03" },
                { x: 700,  y: 35,  color: "#10B981", step: "Step 04" },
                { x: 900,  y: 90,  color: "#8B5CF6", step: "Step 05" },
                { x: 1100, y: 28,  color: "#F43F5E", step: "Step 06" },
              ].map(({ x, y, color, step }) => (
                <g key={step}>
                  {/* Outer ring */}
                  <circle cx={x} cy={y} r="10" fill={color} opacity="0.2" />
                  {/* Inner dot */}
                  <circle cx={x} cy={y} r="5"  fill={color} />
                  {/* Step label */}
                  <text
                    x={x} y={y + 28}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="600"
                    fill="#64748B"
                    fontFamily="sans-serif"
                  >
                    {step}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* CTA button */}
          <m.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="flex justify-center mt-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "#2563EB" }}
            >
              Start Your SEO Journey <Send className="w-4 h-4" />
            </Link>
          </m.div>

        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-20" style={{ background: "#F1F5F9" }}>
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              Why Choose Top SEO Services for Your
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5 text-[#2563EB]">
              Search Engine Optimisation
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Experience unmatched SEO excellence powered by certified experts, proprietary technology, and a relentless focus on organic growth. We transform your website into a sustainable traffic and revenue engine.
            </p>
          </m.div>

          {/* 3×2 card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "01", icon: TrendingUp,
                title: "Proven Track Record of Rankings",
                desc: "Our data-driven SEO methodology has produced an average organic traffic growth of over 450% for clients across multiple industries. We have documented case studies showing consistent first-page rankings, increased domain authority, and sustainable organic revenue growth.",
              },
              {
                num: "02", icon: Eye,
                title: "Complete Transparency and Reporting",
                desc: "Our SEO dashboard provides real-time access to keyword rankings, organic traffic data, backlink growth, and conversion metrics. You see exactly what we're doing, why we're doing it, and how it impacts your bottom line — no black-box SEO tactics.",
              },
              {
                num: "03", icon: Cpu,
                title: "AI-Powered SEO Technology",
                desc: "We leverage cutting-edge AI tools for keyword research, content optimisation, rank tracking, and competitive analysis. Our proprietary technology stack identifies opportunities faster and executes optimisations more precisely than traditional methods.",
              },
              {
                num: "04", icon: LayoutGrid,
                title: "Industry-Specialised SEO Expertise",
                desc: "Our SEO strategists possess deep knowledge of industry-specific search behaviours, seasonal trends, and competitive dynamics. This vertical expertise enables us to create highly targeted strategies that outperform generic SEO approaches.",
              },
              {
                num: "05", icon: Layers,
                title: "Full-Spectrum SEO Coverage",
                desc: "We cover every aspect of SEO — technical, on-page, off-page, local, e-commerce, and content — through an integrated approach that maximises organic visibility across all search touchpoints and eliminates gaps competitors exploit.",
              },
              {
                num: "06", icon: Shield,
                title: "Dedicated SEO Partnership",
                desc: "You work directly with senior SEO strategists, not junior account managers. We become an extension of your marketing team, providing strategic guidance, proactive recommendations, and hands-on optimisation that drives measurable business growth.",
              },
            ].map(({ num, icon: Icon, title, desc }, i) => (
              <m.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-100 p-7 flex flex-col gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                {/* Icon + number row */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#EFF6FF]">
                    <Icon className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <span className="text-xl font-black text-[#BFDBFE]">{num}</span>
                </div>
                {/* Title */}
                <h3 className="text-base font-black text-slate-900 leading-snug">{title}</h3>
                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SCALE ORGANIC GROWTH CTA ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl shadow-xl"
            style={{ minHeight: 260, background: "#0F172A" }}
          >
            {/* Right — image with purple overlay */}
            <div className="absolute inset-0 md:left-[48%] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/local-cta-analytics.png"
                alt="Analytics growth data"
                className="w-full h-full object-cover object-center"
              />
              {/* Purple/violet gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, #0F172A 0%, rgba(88,28,135,0.7) 50%, rgba(109,40,217,0.5) 100%)" }}
              />
            </div>

            {/* Mobile overlay for legibility */}
            <div className="absolute inset-0 bg-black/60 md:hidden" />

            {/* Left — text */}
            <div className="relative z-10 flex flex-col justify-center px-10 py-14 md:py-16 md:w-[50%]">
              <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-3">
                Struggling to Scale Your{" "}
                <em className="not-italic font-black" style={{ color: "#F59E0B" }}>
                  Organic Growth?
                </em>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                We identify high-value keywords, optimise content at scale, and build topical authority — so you grow traffic without growing ad spend.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-slate-900 w-fit transition-opacity hover:opacity-90"
                style={{ background: "#F59E0B" }}
              >
                Scale Your SEO Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── COMPETITOR COMPARISON ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-2">
              Top SEO Services vs. Competitors:
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-5">
              Why We Are the Best{" "}
              <span className="text-[#2563EB]">SEO Company</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              See how our SEO services compare to other agencies. Our transparent approach, white-hat methodologies, and obsessive focus on results deliver superior organic growth.
            </p>
          </m.div>

          {/* Full-width comparison table */}
          <m.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="rounded-2xl border border-slate-200 overflow-hidden w-full"
          >
            {/* Table header */}
            <div className="grid grid-cols-[1fr_2fr_2fr] bg-slate-50 border-b border-slate-200">
              <div className="px-6 py-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Pointers</span>
              </div>
              <div className="px-6 py-4 border-l border-slate-200">
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: ACCENT }}>Top SEO Services</span>
              </div>
              <div className="px-6 py-4 border-l border-slate-200">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Competitors</span>
              </div>
            </div>

            {/* Rows */}
            {[
              {
                pointer: "SEO Strategy",
                us: "Custom-built strategies based on thorough keyword research, competitor analysis, and your specific business goals",
                them: "Generic, one-size-fits-all approaches with minimal customisation",
              },
              {
                pointer: "Reporting Transparency",
                us: "Real-time dashboards with full access to ranking data, traffic analytics, and backlink profiles",
                them: "Limited monthly reports with restricted visibility into actual work performed",
              },
              {
                pointer: "Link Building",
                us: "White-hat, high-authority link building from relevant industry websites through genuine outreach",
                them: "Low-quality, spammy link networks that risk Google penalties",
              },
              {
                pointer: "Content Quality",
                us: "Expert-written, SEO-optimised content that satisfies search intent and builds topical authority",
                them: "Thin, keyword-stuffed content with minimal value to readers",
              },
              {
                pointer: "Technical Expertise",
                us: "Deep technical SEO knowledge covering Core Web Vitals, site architecture, and advanced schema",
                them: "Surface-level fixes without addressing root technical issues",
              },
              {
                pointer: "Results Focus",
                us: "Laser-focused on organic revenue, qualified leads, and sustainable ranking improvements",
                them: "Vanity metrics like keyword count without measuring actual business impact",
              },
            ].map(({ pointer, us, them }, i, arr) => (
              <div
                key={pointer}
                className={`grid grid-cols-[1fr_2fr_2fr] ${i < arr.length - 1 ? "border-b border-slate-100" : ""}`}
              >
                {/* Pointer */}
                <div className="px-6 py-5 flex items-start">
                  <span className="text-sm font-bold text-slate-800">{pointer}</span>
                </div>

                {/* Us — green check */}
                <div className="px-6 py-5 border-l border-slate-100 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                  <span className="text-sm text-slate-600 leading-relaxed">{us}</span>
                </div>

                {/* Competitors — red X */}
                <div className="px-6 py-5 border-l border-slate-100 flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                  <span className="text-sm text-slate-600 leading-relaxed">{them}</span>
                </div>
              </div>
            ))}
          </m.div>

        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ background: "#F0F6FF" }}>
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              Frequently Asked Questions About
            </h2>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-4 text-[#2563EB]">
              SEO Services
            </h2>
            <p className="text-slate-500 text-sm">
              Get answers to the most common questions about our search engine optimisation services.
            </p>
          </m.div>

          <div className="grid lg:grid-cols-[5fr_8fr] gap-6 items-start">

            {/* Left — image card */}
            <m.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden text-center"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/faq-woman.png"
                alt="Still have questions?"
                className="w-full object-cover"
                style={{ maxHeight: 240 }}
              />
              <div className="px-8 py-8">
                <h3 className="text-lg font-black text-slate-900 mb-2">Still Have Questions?</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Can&apos;t find the answer you&apos;re looking for? Our SEO experts are ready to help you get started.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#2563EB" }}
                >
                  Ask Our SEO Experts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </m.div>

            {/* Right — individual accordion cards */}
            <m.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex flex-col gap-3"
            >
              {[
                { q: "Q1. What SEO services do you offer?",                                    a: "We offer comprehensive SEO services including technical SEO, on-page optimisation, domain authority, link building, content creation, e-commerce SEO, and AI-powered SEO solutions tailored to your specific business goals and industry." },
                { q: "Q2. How long does it take to see SEO results?",                         a: "Most clients see measurable improvements in rankings and traffic within 3–6 months. Competitive industries may take 6–12 months for significant organic growth, though some quick wins can appear within the first 30–60 days." },
                { q: "Q3. How much do your SEO services cost?",                               a: "Our SEO packages are based on your goals, industry, and competition. We offer Basic, Advanced, and Custom Enterprise plans. Schedule a free consultation to get a tailored quote that matches your budget and growth targets." },
                { q: "Q4. How do you measure SEO success?",                                   a: "We track organic traffic growth, keyword ranking improvements, conversion rates, backlink quality, Core Web Vitals scores, and revenue attributed to organic search — providing monthly reports with clear, actionable performance data." },
                { q: "Q5. Do you use white-hat SEO techniques?",                              a: "Absolutely. We exclusively use ethical, white-hat SEO techniques that comply with Google's guidelines. We never use black-hat tactics that risk penalties and always build sustainable, long-term organic growth." },
                { q: "Q6. What's the difference between on-page and off-page SEO?",           a: "On-page SEO covers optimisations done directly on your website — titles, content, structure, and internal links. Off-page SEO involves external signals like backlinks, brand mentions, and digital PR that build your domain authority." },
                { q: "Q7. Do you provide content creation as part of SEO?",                   a: "Yes. Content creation is central to our SEO strategy. We develop SEO-optimised blog posts, landing pages, guides, and pillar content that rank for target keywords and convert organic traffic into qualified leads." },
                { q: "Q8. Can you help with domain authority?",                                      a: "Yes, domain authority is one of our core specialisms. We optimise Google Business Profiles, build local citations, manage reviews, and create location-specific content to dominate domain authority results and map pack rankings." },
                { q: "Q9. How is your SEO agency different from others?",                     a: "We combine transparent reporting, proprietary AI-powered tools, dedicated senior strategists, and proven results across diverse industries. We treat every client as a long-term growth partner, not just a monthly retainer." },
                { q: "Q10. Do you require long-term SEO contracts?",                          a: "No. We offer flexible, month-to-month engagements. SEO is a long-term investment, so we do offer discounted rates for clients who commit to 6 or 12-month growth plans, but there's no obligation to lock in." },
              ].map(({ q, a }, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-slate-100 overflow-hidden cursor-pointer"
                    style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <div className="flex items-center justify-between px-5 py-4 gap-4">
                      <span className="text-sm font-medium text-slate-800">{q}</span>
                      <m.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </m.div>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{a}</p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </m.div>

          </div>
        </div>
      </section>

      {/* ── GET STARTED ── */}
      <section id="get-started" className="bg-white">

        {/* Green top banner */}
        <div className="px-4 md:px-8 pt-10 pb-0">
          <div className="container mx-auto">
            <m.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-7"
              style={{ background: "linear-gradient(135deg, #14532D 0%, #7C3AED 60%, #22C55E 100%)" }}
            >
              <div className="absolute right-0 top-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)", transform: "translate(30%,-30%)" }} />
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-black text-white mb-1">Ready to Dominate Domain Authority?</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Get a free domain authority audit and discover how to appear at the top of domain authority results.
                </p>
              </div>
              <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="relative z-10 flex-shrink-0">
                <Link
                  href="#get-started"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white"
                  style={{ color: "#7C3AED" }}
                >
                  Get Your Free Local Audit <ArrowRight className="w-4 h-4" />
                </Link>
              </m.div>
            </m.div>
          </div>
        </div>

        {/* Form + contact card */}
        <div className="py-14 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* Left — form */}
              <m.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-8">
                  Let&apos;s <span style={{ color: ACCENT }}>Get Started</span>
                </h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Your Name*" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none" style={{ borderBottom: "1.5px solid #CBD5E1" }} />
                  <input type="email" placeholder="Business Email*" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none" style={{ borderBottom: "1.5px solid #CBD5E1" }} />
                  <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden text-sm">
                    <div className="flex items-center gap-1.5 px-3 py-2.5 border-r border-slate-300 bg-slate-50 flex-shrink-0">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <select value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} className="text-xs text-slate-600 bg-transparent outline-none">
                        {[["US","+1"],["GB","+44"],["AU","+61"],["IN","+91"],["DE","+49"],["FR","+33"],["JP","+81"]].map(([c, code]) => (
                          <option key={code} value={code}>{c} {code}</option>
                        ))}
                      </select>
                    </div>
                    <input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none" />
                  </div>
                  <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full pb-2 text-sm bg-transparent outline-none" style={{ borderBottom: "1.5px solid #CBD5E1", color: formData.budget ? "#1E293B" : "#94A3B8" }}>
                    <option value="">Select Budget</option>
                    {["Under $1,000","$1,000–$3,000","$3,000–$5,000","$5,000–$10,000","$10,000+"].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <textarea rows={4} placeholder="Tell us about your project*" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none" style={{ borderBottom: "1.5px solid #CBD5E1" }} />
                  <div>
                    <m.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" className="px-8 py-3 rounded-full font-bold text-sm text-white" style={{ background: ACCENT, boxShadow: "0 4px 16px rgba(22,163,74,0.35)" }}>
                      Send Message
                    </m.button>
                  </div>
                </form>
              </m.div>

              {/* Right — red contact card */}
              <m.div
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="relative rounded-2xl overflow-hidden p-8 md:p-10"
                style={{ background: "#DC2626" }}
              >
                <div className="absolute top-0 right-0 w-44 h-44 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.08)", transform: "translate(30%,-30%)" }} />
                <h3 className="text-xl font-display font-black text-white mb-1 relative z-10">Hate Filling out Forms?</h3>
                <p className="text-sm mb-8 relative z-10">
                  <span className="underline font-medium text-white cursor-pointer hover:opacity-80 transition-opacity">Email us.</span>
                </p>
                <div className="relative z-10 space-y-0">
                  {[
                    { label: "Request a Quote",                       email: "business@topseoservices.co" },
                    { label: "Partners Enquires",                     email: "partners@topseoservices.co" },
                    { label: "Reference Checks /Misc. HR Enquires",   email: "hr@topseoservices.co" },
                    { label: "Other Enquires",                        email: "info@topseoservices.co" },
                  ].map(({ label, email }, i, arr) => (
                    <div key={i} className="py-4" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.9)" }} />
                        <div>
                          <p className="text-white font-bold text-sm">{label}</p>
                          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>{email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
