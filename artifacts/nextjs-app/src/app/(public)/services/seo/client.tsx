"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import {
  Search, TrendingUp, Target, Users,
  ArrowRight, CheckCircle2, BarChart3,
  Globe2, Zap, ShieldCheck, FileSearch,
  Link2, Settings2, MapPin, Bot, Mic,
  Plus, X, Crown,
  Heart, Home, ShoppingBag, Truck,
  BookOpen, Briefcase, Building2, Store,
} from "lucide-react";

const STATS = [
  { icon: Search,    value: "10,000+", label: "Keywords Ranked",    color: "#2563EB", bg: "#EFF6FF" },
  { icon: TrendingUp,value: "450%",    label: "Avg Traffic Growth", color: "#F97316", bg: "#FFF7ED" },
  { icon: Target,    value: "3,500+",  label: "Projects Delivered", color: "#7C3AED", bg: "#F5F3FF" },
  { icon: Users,     value: "120+",    label: "SEO Experts",        color: "#8B5CF6", bg: "#F5F3FF" },
];


const BRAND_CARDS = [
  {
    title: "Strategic Backlink Building",
    photo: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=700&h=460&fit=crop&q=80",
    desc: "We build high-authority backlinks through targeted outreach, digital PR, and content partnerships that signal trust to Google and compound your rankings over time.",
  },
  {
    title: "In-depth SEO Audits",
    photo: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&h=460&fit=crop&q=80",
    desc: "Our website SEO audit examines both the technical structure, content quality, user behaviour, and gaps between competitors and provides clear instructions on how to improve search engine rankings and do better in search besides trafficking visitors effectively.",
  },
  {
    title: "Specialized E-commerce SEO",
    photo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&h=460&fit=crop&q=80",
    desc: "Drive product discovery and sales with category-level optimisation, rich snippet markup, faceted navigation fixes, and conversion-focused content strategies built for online stores.",
  },
  {
    title: "Advanced Technical SEO",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=460&fit=crop&q=80",
    desc: "We tackle crawl budget, Core Web Vitals, JavaScript rendering, structured data, and log-file analysis to remove every technical barrier holding your rankings back.",
  },
  {
    title: "Enterprise-Level SEO Solutions",
    photo: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=700&h=460&fit=crop&q=80",
    desc: "Scalable SEO frameworks designed for large websites — managing thousands of pages with automated auditing, template optimisation, and cross-team governance for sustained organic growth.",
  },
  {
    title: "Expert SEO Consulting",
    photo: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=460&fit=crop&q=80",
    desc: "Work directly with our senior strategists to audit your current approach, identify missed opportunities, and build a roadmap tailored to your industry, goals, and competitive landscape.",
  },
  {
    title: "Targeted Local SEO",
    photo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=460&fit=crop&q=80",
    desc: "Dominate Google Maps, local pack results, and near-me searches with Google Business Profile optimisation, localised content, and citation building that drives real foot traffic.",
  },
  {
    title: "Optimized On-Page SEO",
    photo: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&h=460&fit=crop&q=80",
    desc: "Every element of your pages — titles, meta tags, headers, internal links, and content — is precision-optimised to align with search intent and climb the rankings.",
  },
  {
    title: "Effective Off-Page SEO",
    photo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&h=460&fit=crop&q=80",
    desc: "Strengthen your domain authority through strategic link building, brand mentions, digital PR, and social signals that tell search engines your site is a trusted industry resource.",
  },
  {
    title: "Robust AI SEO",
    photo: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=700&h=460&fit=crop&q=80",
    desc: "Leverage machine learning insights and AI-driven content strategies to identify emerging search trends, automate keyword clustering, and stay ahead of algorithm updates.",
  },
  {
    title: "Domain Authority Services",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=460&fit=crop&q=80",
    desc: "Systematically grow your domain rating through curated link acquisition campaigns, toxic link removal, and trust-signal optimisation that builds lasting authority in your niche.",
  },
  {
    title: "GEO (Generative Engine Optimisation)",
    photo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&h=460&fit=crop&q=80",
    desc: "Optimise your content to appear prominently in AI-generated search answers from Google SGE, ChatGPT, Perplexity, and other LLM-powered discovery tools driving the next wave of organic traffic.",
  },
  {
    title: "AEO (Answer Engine Optimisation)",
    photo: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=460&fit=crop&q=80",
    desc: "Structure your content to win featured snippets, People Also Ask boxes, knowledge panels, and voice search results — capturing zero-click searches that build brand authority at the top of the SERP.",
  },
];

const WHY_ITEMS = [
  "Transparent monthly reporting with real-time dashboards",
  "Dedicated senior SEO strategist assigned to your account",
  "Proven results across 25+ industries globally",
  "No lock-in contracts — results speak for themselves",
  "AI-assisted keyword research and content gap analysis",
  "Full technical SEO infrastructure review included",
];

export function SeoServicePageClient() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [openFaq,    setOpenFaq]    = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", countryCode: "+1", budget: "", message: "" });

  // SEO ROI Calculator state
  const [traffic,    setTraffic]    = useState(28100);
  const [convRate,   setConvRate]   = useState(3);
  const [orderValue, setOrderValue] = useState(240);
  const [investment, setInvestment] = useState(4000);

  const calc = useMemo(() => {
    const projTraffic   = Math.round(traffic * 3.5);
    const projConv      = Math.round(projTraffic * (convRate / 100));
    const projRevenue   = projConv * orderValue;
    const roi           = investment > 0 ? Math.round(((projRevenue - investment) / investment) * 100) : 0;
    const profit        = projRevenue - investment;
    return { projTraffic, projConv, projRevenue, roi, profit };
  }, [traffic, convRate, orderValue, investment]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=900&fit=crop&q=85')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(5,13,40,0.88) 0%, rgba(5,13,40,0.72) 55%, rgba(5,13,40,0.35) 100%)" }} />

        {/* Subtle animated blob */}
        <m.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[160px] pointer-events-none"
          style={{ background: "#2563EB", opacity: 0.12 }}
          animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-28 pb-32 md:pt-36 md:pb-40">
          <div className="max-w-xl">

            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA", border: "1px solid rgba(96,165,250,0.35)" }}
              >
                <Search className="w-3.5 h-3.5" /> #1 SEO AGENCY
              </span>
            </m.div>

            {/* Heading */}
            <m.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              <h1 className="font-display font-black leading-tight mb-5">
                <span className="block text-white text-3xl md:text-4xl font-bold">Reliable Search Engine</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl" style={{ color: "#3B82F6" }}>Optimization</span>
                <span className="block text-white text-3xl md:text-4xl font-bold">Services</span>
              </h1>
            </m.div>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-md"
            >
              Achieving success online involves more than just being present; it focuses on generating tangible outcomes. As a top{" "}
              <strong className="text-white">SEO services company</strong>, we combine data-driven tactics, creative implementation, and industry expertise to deliver tangible business growth.
            </m.p>

            {/* CTA */}
            <m.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.42 }}
            >
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
                  style={{ background: "#2563EB" }}
                >
                  Get Free SEO Audit <ArrowRight className="w-4 h-4" />
                </m.button>
              </Link>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="relative z-10 -mt-16 pb-0">
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100"
          >
            {STATS.map(({ icon: Icon, value, label, color, bg }, i) => (
              <m.div
                key={label}
                whileHover={{ y: -3 }}
                className="flex items-center gap-4 px-6 py-6 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="font-display font-black text-2xl leading-none mb-1" style={{ color }}>{value}</p>
                  <p className="text-slate-500 text-xs">{label}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ── INTRO / ABOUT SECTION ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Centered heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Reliable Search Engine Optimization{" "}
              <span className="block" style={{ color: "#2563EB" }}>Services</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Achieving success online involves more than just being present; it focuses on generating tangible outcomes. As a top SEO services company, we combine data-driven tactics, creative implementation, and industry expertise to deliver tangible business growth.
            </p>
          </m.div>

          {/* Two-column: photo + text */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — photo with floating badges */}
            <m.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="relative pb-10 pr-6"
            >
              {/* Main photo */}
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=680&fit=crop&q=85"
                  alt="SEO team analysing data on large screens"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge — green (bottom-right) */}
              <m.div
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.35 }}
                className="absolute bottom-8 right-[-20px] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl"
                style={{ background: "#16A34A", minWidth: "190px" }}
              >
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4.5 h-4.5 text-white" style={{ width: "18px", height: "18px" }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">4.5× More Traffic</p>
                  <p className="text-green-100 text-xs">Average organic growth rate</p>
                </div>
              </m.div>

              {/* Floating badge — white (bottom-left) */}
              <m.div
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute bottom-[-20px] left-4 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl bg-white"
                style={{ minWidth: "210px", border: "1px solid #E2E8F0" }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#EFF6FF" }}>
                  <Search className="w-4 h-4" style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm leading-tight">10,000+ Keywords Ranked</p>
                  <p className="text-slate-400 text-xs">Driving qualified organic traffic</p>
                </div>
              </m.div>
            </m.div>

            {/* Right — text + CTA */}
            <m.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="pt-6 lg:pt-0"
            >
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Search Engine Optimization (SEO) is the practice of optimizing your website to rank higher in organic search results on Google, Bing, and other search engines. Unlike paid advertising, SEO builds long-term, sustainable visibility that generates free, high-quality traffic 24/7. Our comprehensive SEO services cover everything from technical audits and on-page optimization to content strategy and link building, ensuring your website becomes the go-to authority in your industry. Whether you&apos;re a startup looking for visibility or an enterprise scaling organic growth, our proven SEO strategies deliver measurable results.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm"
                  style={{ border: "2px solid #2563EB", color: "#2563EB", background: "transparent" }}
                >
                  Talk to an SEO Expert
                </m.button>
              </Link>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── EMPOWER YOUR BRAND / PHOTO CARD GRID ── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Empower Your Brand With The Best{" "}
              <span className="block" style={{ color: "#2563EB" }}>SEO Services Company</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              As a trusted SEO agency, Top SEO Services provides comprehensive search engine optimization services designed to improve rankings, increase traffic, and maximize conversions. Our tailored services make sure businesses achieve long-term success in the digital space.
            </p>
          </m.div>

          {/* 3 × 2 photo card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRAND_CARDS.map(({ title, photo, desc }, i) => {
              const isOpen = activeCard === i;
              return (
                <m.div
                  key={title}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: (i % 3) * 0.07, duration: 0.45 }}
                  className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white cursor-pointer"
                  style={{ boxShadow: isOpen ? "0 8px 30px rgba(37,99,235,0.18)" : "0 1px 6px rgba(0,0,0,0.06)" }}
                >
                  {/* Photo area with overlay */}
                  <div className="relative" style={{ aspectRatio: "16/10" }}>
                    {/* Background photo */}
                    <img
                      src={photo}
                      alt={title}
                      className="w-full h-full object-cover"
                      style={{ filter: isOpen ? "brightness(0.3)" : "brightness(1)", transition: "filter 0.35s ease" }}
                    />

                    {/* Blue overlay (active state) */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "#2563EB",
                        opacity: isOpen ? 0.88 : 0,
                        transition: "opacity 0.35s ease",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Overlay content (search icon + text) */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                      style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.3s ease", transitionDelay: isOpen ? "0.1s" : "0s" }}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-white/60 flex items-center justify-center mb-4">
                        <Search className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white text-sm leading-relaxed">{desc}</p>
                    </div>

                    {/* + / × toggle button */}
                    <button
                      onClick={() => setActiveCard(isOpen ? null : i)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 z-10"
                      style={{ background: isOpen ? "#EF4444" : "#2563EB" }}
                      aria-label={isOpen ? "Close" : "Open"}
                    >
                      {isOpen
                        ? <X className="w-4 h-4 text-white" />
                        : <Plus className="w-4 h-4 text-white" />
                      }
                    </button>
                  </div>

                  {/* Card title */}
                  <div className="px-4 py-3.5">
                    <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
                  </div>
                </m.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── CTA BANNER — Tired of Being Invisible ── */}
      <section className="py-10 px-4 md:px-6">
        <div className="container mx-auto">
          <m.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-center"
            style={{ background: "#0a0f1e" }}
          >
            {/* Background photo — left portion */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop&q=85')",
                opacity: 0.35,
              }}
            />
            {/* Purple gradient overlay fading left→right */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(80,20,120,0.55) 0%, rgba(10,15,30,0.92) 55%, rgba(10,15,30,1) 100%)" }}
            />

            {/* Content — right-aligned */}
            <div className="relative z-10 ml-auto w-full max-w-lg px-10 py-10">
              <h2 className="text-2xl md:text-3xl font-display font-black mb-3 leading-snug">
                <span className="text-white">Tired of Being </span>
                <span className="italic" style={{ color: "#4ADE80" }}>Invisible on Google?</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
                Our SEO experts build organic growth engines that transform your website into a lead-generating machine with sustainable, long-term rankings.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg"
                  style={{ background: "#16A34A" }}
                >
                  Schedule a Call Today! <ArrowRight className="w-4 h-4" />
                </m.button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── WHY BUSINESSES TRUST US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Why Businesses Trust Our{" "}
              <span className="block" style={{ color: "#2563EB" }}>SEO Services</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Our search engine optimization services deliver sustainable organic growth, qualified traffic, and measurable revenue. Here&apos;s what sets our SEO agency apart from the competition.
            </p>
          </m.div>

          {/* 3 × 2 trust cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: Target,
                iconColor: "#2563EB",
                lineColor: "#2563EB",
                title: "Data-Driven Keyword Strategy",
                desc: "Our SEO specialists conduct deep keyword research using advanced tools to identify high-value search terms with strong commercial intent, ensuring your content targets the queries that drive qualified organic traffic and conversions.",
              },
              {
                num: "02",
                icon: TrendingUp,
                iconColor: "#16A34A",
                lineColor: "#16A34A",
                title: "Sustainable Organic Growth",
                desc: "We build long-term SEO strategies that deliver compounding results over time. Unlike paid ads, our organic optimisation creates a permanent asset that generates free, qualified traffic 24/7 without ongoing ad spend.",
              },
              {
                num: "03",
                icon: Search,
                iconColor: "#E53E3E",
                lineColor: "#E53E3E",
                title: "Technical SEO Excellence",
                desc: "Our team resolves complex technical issues — from Core Web Vitals and site architecture to crawlability and indexation — ensuring search engines can efficiently discover, understand, and rank your content.",
              },
              {
                num: "04",
                icon: BarChart3,
                iconColor: "#D97706",
                lineColor: "#D97706",
                title: "Transparent Reporting & Analytics",
                desc: "Access detailed SEO dashboards showing keyword rankings, organic traffic trends, backlink growth, and conversion data. We provide complete visibility into your SEO performance with actionable insights.",
              },
              {
                num: "05",
                icon: Zap,
                iconColor: "#2563EB",
                lineColor: "#2563EB",
                title: "Content That Ranks & Converts",
                desc: "Our content team creates SEO-optimised content that satisfies search intent while engaging your target audience. From blog posts to pillar pages, every piece is crafted to rank higher and drive meaningful business results.",
              },
              {
                num: "06",
                icon: ShieldCheck,
                iconColor: "#16A34A",
                lineColor: "#16A34A",
                title: "Proven SEO Track Record",
                desc: "With 10,000+ keywords ranked on page one and 450%+ average traffic growth, our SEO team has the experience and expertise to deliver measurable results across every industry we serve.",
              },
            ].map(({ num, icon: Icon, iconColor, lineColor, title, desc }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
                className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
              >
                {/* Icon + number row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${iconColor}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: iconColor }} />
                  </div>
                  <span className="text-3xl font-black" style={{ color: "#E2E8F0" }}>{num}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>

                {/* Bottom accent line */}
                <div className="mt-5 h-0.5 w-10 rounded-full" style={{ background: lineColor }} />
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Industries We Serve With{" "}
              <span className="block" style={{ color: "#2563EB" }}>Search Engine Optimization</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              We deliver industry-specific SEO strategies that understand your market, target audience, and competitive landscape to drive qualified organic traffic and sustainable growth.
            </p>
          </m.div>

          {/* 4 × 2 industry cards with video backgrounds */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Healthcare",   icon: Heart,      iconBg: "#2563EB", video: "https://videos.pexels.com/video-files/3209209/3209209-hd_1920_1080_25fps.mp4",  poster: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop" },
              { label: "Real Estate",  icon: Home,       iconBg: "#E53E3E", video: "https://videos.pexels.com/video-files/1526909/1526909-hd_1920_1080_25fps.mp4",  poster: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" },
              { label: "E-commerce",   icon: ShoppingBag,iconBg: "#D97706", video: "https://videos.pexels.com/video-files/5256339/5256339-hd_1920_1080_25fps.mp4",  poster: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
              { label: "Shopify",      icon: Store,      iconBg: "#0D9488", video: "https://videos.pexels.com/video-files/4068295/4068295-hd_1920_1080_25fps.mp4",  poster: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" },
              { label: "Logistics",    icon: Truck,      iconBg: "#2563EB", video: "https://videos.pexels.com/video-files/3753580/3753580-hd_1920_1080_25fps.mp4",  poster: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop" },
              { label: "Education",    icon: BookOpen,   iconBg: "#E53E3E", video: "https://videos.pexels.com/video-files/3196396/3196396-hd_1920_1080_25fps.mp4",  poster: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop" },
              { label: "B2B",          icon: Briefcase,  iconBg: "#D97706", video: "https://videos.pexels.com/video-files/3184418/3184418-hd_1920_1080_25fps.mp4",  poster: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop" },
              { label: "Enterprise",   icon: Building2,  iconBg: "#16A34A", video: "https://videos.pexels.com/video-files/3066976/3066976-hd_1920_1080_25fps.mp4",  poster: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" },
            ].map(({ label, icon: Icon, iconBg, video, poster }, i) => (
              <m.div
                key={label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 4) * 0.07, duration: 0.45 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "4/3" }}
              >
                {/* Looping background video */}
                <video
                  autoPlay muted loop playsInline
                  poster={poster}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transition: "transform 0.4s ease" }}
                >
                  <source src={video} type="video/mp4" />
                </video>

                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)" }}
                />

                {/* Icon badge — top-left */}
                <div className="absolute top-3 left-3 z-10">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                    style={{ background: iconBg }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Industry label — bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4">
                  <p className="text-white font-bold text-sm drop-shadow-sm">{label}</p>
                </div>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA — Getting Traffic But No Rankings ── */}
      <section className="py-10 px-4 md:px-6">
        <div className="container mx-auto">
          <m.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="relative rounded-2xl overflow-hidden grid lg:grid-cols-2 items-center min-h-[220px]"
            style={{ background: "#0f172a" }}
          >
            {/* Left — text content */}
            <div className="relative z-10 px-10 py-10">
              <h2 className="text-2xl md:text-3xl font-display font-black mb-3 leading-snug">
                <span className="text-white">Getting Traffic But </span>
                <span style={{ color: "#3B82F6" }}>No Rankings?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                We fix technical issues, optimize your content, and build authority through strategic link building to help you dominate page one of Google.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg"
                  style={{ background: "#2563EB" }}
                >
                  Schedule a Strategy Call <ArrowRight className="w-4 h-4" />
                </m.button>
              </Link>
            </div>

            {/* Right — analytics photo */}
            <div className="relative h-full min-h-[200px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&q=85"
                alt="Analytics dashboard"
                className="w-full h-full object-cover"
                style={{ opacity: 0.75 }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, #0f172a 0%, transparent 40%)" }}
              />
            </div>
          </m.div>
        </div>
      </section>

      {/* ── HOW OUR SEO SERVICES DRIVE GROWTH ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              How Our SEO Services{" "}
              <span className="block" style={{ color: "#2563EB" }}>Drive Organic Growth &amp; Revenue</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Our search engine optimization strategies combine technical excellence, content mastery, and authority building to deliver measurable organic growth and sustainable business results.
            </p>
          </m.div>

          {/* 2 × 3 feature card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Target,    iconBg: "#EFF6FF", iconColor: "#2563EB", titleColor: "#2563EB",
                title: "Strategic Keyword Research",
                desc: "We identify and target high-value keywords using search volume, competition analysis, and commercial intent data to ensure your content ranks for queries that drive qualified organic traffic and conversions.",
              },
              {
                icon: Search,    iconBg: "#FEF2F2", iconColor: "#E53E3E", titleColor: "#E53E3E",
                title: "Comprehensive Site Audits",
                desc: "Our thorough technical and content audits uncover every issue holding your site back — from crawl errors and broken links to thin content and missing schema markup — creating a clear roadmap for improvement.",
              },
              {
                icon: FileSearch, iconBg: "#FFFBEB", iconColor: "#D97706", titleColor: "#D97706",
                title: "On-Page Optimization",
                desc: "We optimise every element of your pages — title tags, meta descriptions, headers, internal links, image alt text, and content structure — to maximise relevance and ranking potential for target keywords.",
              },
              {
                icon: BarChart3, iconBg: "#F0FDF4", iconColor: "#16A34A", titleColor: "#16A34A",
                title: "Performance Tracking & Analytics",
                desc: "Advanced rank tracking, organic traffic analysis, and conversion attribution give you complete visibility into SEO performance, enabling data-driven decisions that improve results week over week.",
              },
              {
                icon: Link2,     iconBg: "#EFF6FF", iconColor: "#2563EB", titleColor: "#2563EB",
                title: "Authority Link Building",
                desc: "We systematically build high-quality backlinks from authoritative, relevant websites through digital PR, guest posting, and strategic outreach to boost your domain authority and search engine trust.",
              },
              {
                icon: Globe2,    iconBg: "#FEF2F2", iconColor: "#E53E3E", titleColor: "#E53E3E",
                title: "Content Strategy & Creation",
                desc: "Our content team develops SEO-optimised articles, guides, and pillar pages that satisfy search intent, build topical authority, and generate organic traffic that converts into leads and customers.",
              },
            ].map(({ icon: Icon, iconBg, iconColor, titleColor, title, desc }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
                whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(0,0,0,0.09)" }}
                className="bg-white rounded-2xl p-6 border border-slate-100"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: iconBg }}
                >
                  <Icon className="w-5 h-5" style={{ color: iconColor }} />
                </div>

                {/* Coloured title */}
                <h3 className="font-bold text-base mb-2" style={{ color: titleColor }}>{title}</h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SEO ROI CALCULATOR ── */}
      <section className="py-20" style={{ background: "#1a2035" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-4">
              <span className="text-white">Calculate Your SEO</span>
              <span
                className="block"
                style={{ background: "linear-gradient(90deg, #4ADE80 0%, #FBBF24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                Growth Potential
              </span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Use our free SEO ROI calculator to estimate your organic traffic growth, conversions, and revenue potential based on your current metrics.
            </p>
          </m.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

            {/* LEFT — sliders panel */}
            <m.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="rounded-2xl p-7"
              style={{ background: "#242b42", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Panel header */}
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#16A34A" }}>
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-white font-bold text-base">Your SEO Parameters</h3>
              </div>

              {/* Sliders */}
              {[
                {
                  label: "Current Monthly Organic Traffic",
                  value: traffic, setter: setTraffic,
                  min: 0, max: 100000, step: 100,
                  display: traffic.toLocaleString(),
                },
                {
                  label: "Conversion Rate",
                  value: convRate, setter: setConvRate,
                  min: 0.1, max: 20, step: 0.1,
                  display: String(convRate),
                },
                {
                  label: "Avg Order Value",
                  value: orderValue, setter: setOrderValue,
                  min: 10, max: 5000, step: 10,
                  display: String(orderValue),
                },
                {
                  label: "Monthly SEO Investment",
                  value: investment, setter: setInvestment,
                  min: 100, max: 50000, step: 100,
                  display: investment.toLocaleString(),
                },
              ].map(({ label, value, setter, min, max, step, display }) => {
                const pct = ((value - min) / (max - min)) * 100;
                return (
                  <div key={label} className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-xs">{label}</span>
                      <span
                        className="text-white text-xs font-mono font-semibold rounded-md px-2.5 py-1"
                        style={{ background: "#1a2035" }}
                      >
                        {display}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={min} max={max} step={step}
                      value={value}
                      onChange={e => setter(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #2563EB ${pct}%, #374151 ${pct}%)`,
                        outline: "none",
                        WebkitAppearance: "none",
                      }}
                    />
                  </div>
                );
              })}
            </m.div>

            {/* RIGHT — results panel */}
            <m.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              {/* Results label */}
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4" style={{ color: "#FBBF24" }} />
                <span className="text-slate-300 text-sm font-semibold">Projected Results (12 months)</span>
              </div>

              {/* 4 result cards */}
              {[
                { icon: Search,    iconBg: "#2563EB", label: "Projected Traffic",  value: calc.projTraffic.toLocaleString() },
                { icon: Target,    iconBg: "#16A34A", label: "Conversions/Mo",     value: calc.projConv.toLocaleString()    },
                { icon: Users,     iconBg: "#D97706", label: "Projected Revenue",  value: `$${calc.projRevenue.toLocaleString()}` },
                { icon: TrendingUp,iconBg: "#E53E3E", label: "ROI",               value: `${calc.roi.toLocaleString()}%`   },
              ].map(({ icon: Icon, iconBg, label, value }) => (
                <m.div
                  key={label}
                  layout
                  className="flex items-center justify-between rounded-xl px-5 py-4"
                  style={{ background: "#242b42", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-400 text-sm">{label}</span>
                  </div>
                  <m.span
                    key={value}
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-white font-black text-lg tabular-nums"
                  >
                    {value}
                  </m.span>
                </m.div>
              ))}

              {/* Estimated profit card */}
              <m.div
                layout
                className="rounded-xl px-5 py-4 flex items-center justify-between"
                style={{ background: "#1a2d1a", border: "1px solid #16A34A" }}
              >
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">Estimated Profit</p>
                  <m.p
                    key={calc.profit}
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-black text-2xl"
                    style={{ color: "#4ADE80" }}
                  >
                    {calc.profit >= 0 ? "+" : ""}{`$${calc.profit.toLocaleString()}`}
                  </m.p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#16A34A" }}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </m.div>

              {/* CTA button */}
              <Link href="/contact" className="block">
                <m.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white"
                  style={{ background: "#16A34A" }}
                >
                  Get a Free SEO Audit <ArrowRight className="w-4 h-4" />
                </m.button>
              </Link>
            </m.div>

          </div>
        </div>

        {/* Slider thumb global style */}
        <style>{`
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px; height: 16px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 0 0 3px rgba(37,99,235,0.5);
            cursor: pointer;
          }
          input[type='range']::-moz-range-thumb {
            width: 16px; height: 16px;
            border-radius: 50%;
            background: #ffffff;
            border: none;
            box-shadow: 0 0 0 3px rgba(37,99,235,0.5);
            cursor: pointer;
          }
        `}</style>
      </section>

      {/* ── PRICING SECTION ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-4 text-slate-900">
              Affordable &amp; Results-Driven{" "}
              <span className="text-blue-600 block">SEO Packages</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Unlock the full potential of organic search with our performance-driven, cost-effective SEO packages. Our pricing is tailored to boost your rankings and drive meaningful results that fit your business needs.
            </p>
          </m.div>

          {/* Cards */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">

            {/* ── BASIC ── */}
            <m.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col"
            >
              <div className="mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#EFF6FF" }}>
                  <Search className="w-5 h-5" style={{ color: "#2563EB" }} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Basic SEO Plan</h3>
                <p className="text-slate-400 text-sm mb-3">Starter Package</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-full px-3 py-1">
                  <Globe2 className="w-3 h-3" /> On-Page SEO, Technical SEO, Local SEO
                </span>
              </div>

              <div className="border-t border-slate-100 pt-5 flex-1">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">What&apos;s Included:</p>
                <ul className="space-y-2.5">
                  {[
                    "Comprehensive SEO audit and analysis",
                    "Keyword research and mapping (up to 30 keywords)",
                    "On-page optimization for key pages",
                    "Technical SEO fixes and improvements",
                    "Google Business Profile optimization",
                    "Monthly content recommendations",
                    "Rank tracking and performance monitoring",
                    "Monthly SEO performance report",
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <Link href="/contact">
                  <m.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-sm hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Get Started with Basic <ArrowRight className="w-4 h-4" />
                  </m.button>
                </Link>
              </div>
            </m.div>

            {/* ── ADVANCED (Most Popular) ── */}
            <m.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex flex-col rounded-2xl border-2 border-green-500 overflow-visible"
              style={{ background: "#fff" }}
            >
              {/* Most Popular banner */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-green-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-md">
                  Most Popular
                </span>
              </div>

              <div className="p-7 pt-9 flex flex-col h-full">
                <div className="mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#F0FDF4" }}>
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1">Advanced SEO Plan</h3>
                  <p className="text-slate-400 text-sm mb-3">Growth Package</p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-full px-3 py-1">
                    <Globe2 className="w-3 h-3" /> Full On-Page, Off-Page, Technical, Content SEO
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-5 flex-1">
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">What&apos;s Included:</p>
                  <ul className="space-y-2.5">
                    {[
                      "Everything in the Basic plan, plus",
                      "Extended keyword targeting (up to 80 keywords)",
                      "Strategic link building (10+ links/month)",
                      "Content creation (4 SEO blog posts/month)",
                      "Competitor analysis and gap identification",
                      "Schema markup implementation",
                      "Core Web Vitals optimization",
                      "Bi-weekly strategy calls and reporting",
                    ].map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7">
                  <Link href="/contact">
                    <m.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: "#16A34A" }}
                    >
                      Avail your Advanced Plan <ArrowRight className="w-4 h-4" />
                    </m.button>
                  </Link>
                </div>
              </div>
            </m.div>

            {/* ── CUSTOM ── */}
            <m.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col"
            >
              <div className="mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#FEF2F2" }}>
                  <Crown className="w-5 h-5" style={{ color: "#DC2626" }} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Custom SEO Plan</h3>
                <p className="text-slate-400 text-sm mb-3">Enterprise Package</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-full px-3 py-1">
                  <Settings2 className="w-3 h-3" /> Fully customizable
                </span>
              </div>

              <div className="border-t border-slate-100 pt-5 flex-1">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">What&apos;s Included:</p>
                <ul className="space-y-2.5">
                  {[
                    "Custom SEO strategy aligned with business goals",
                    "Unlimited keyword targeting and optimization",
                    "Premium link building (25+ links/month)",
                    "Content hub development and pillar pages",
                    "Advanced technical SEO and site architecture",
                    "International and multi-location SEO",
                    "Dedicated SEO manager and weekly calls",
                    "Custom analytics dashboard and attribution",
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <Link href="/contact">
                  <m.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-sm hover:border-red-500 hover:text-red-600 transition-colors"
                  >
                    Request a Custom SEO Strategy <ArrowRight className="w-4 h-4" />
                  </m.button>
                </Link>
              </div>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── CTA CARD ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: "#1a2035", minHeight: 260 }}
          >
            <div className="grid lg:grid-cols-2 min-h-[260px]">

              {/* Photo left */}
              <div className="relative min-h-[220px] lg:min-h-0">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop"
                  alt="Business team reviewing SEO growth charts"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* right-side fade so it blends into dark bg */}
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{ background: "linear-gradient(to right, transparent 55%, #1a2035 100%)" }}
                />
                <div
                  className="absolute inset-0 lg:hidden"
                  style={{ background: "linear-gradient(to bottom, transparent 55%, #1a2035 100%)" }}
                />
              </div>

              {/* Content right */}
              <div className="flex flex-col justify-center px-8 md:px-12 py-12 lg:py-10 relative z-10">
                <h2 className="text-white font-black text-2xl md:text-3xl leading-tight mb-4">
                  Ready to Turn Organic Traffic Into{" "}
                  <span style={{ color: "#F97316" }}>Predictable Revenue?</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-sm">
                  Our SEO team builds scalable organic growth systems backed by data, content excellence, and technical precision that grow your business month over month.
                </p>
                <div>
                  <Link href="/contact">
                    <m.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold text-sm"
                      style={{ background: "#F97316" }}
                    >
                      Request a Free SEO Consultation <ArrowRight className="w-4 h-4" />
                    </m.button>
                  </Link>
                </div>
              </div>

            </div>
          </m.div>
        </div>
      </section>

      {/* ── OUR PROVEN SEO PROCESS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-4 text-slate-900">
              Our Proven{" "}
              <span className="text-blue-600 block">SEO Process</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Our systematic 6-step SEO process ensures your website is built for organic success, delivering measurable ranking improvements and continuous traffic growth from day one.
            </p>
          </m.div>

          {/* 6 step cards */}
          {(() => {
            const STEPS = [
              {
                icon: Search, color: "#F43F5E", bg: "#FFF1F2",
                title: "Discovery\nand Audit",
                desc: "We begin with a comprehensive SEO audit, analyzing your website's technical health, content quality, backlink profile, and competitor landscape to identify quick wins and long-term growth opportunities.",
              },
              {
                icon: Target, color: "#F97316", bg: "#FFF7ED",
                title: "Strategy &\nPlanning",
                desc: "We develop a customized SEO strategy, including keyword targeting, content roadmap, link building plan, and technical priorities aligned with your business objectives and competitive landscape.",
              },
              {
                icon: Settings2, color: "#3B82F6", bg: "#EFF6FF",
                title: "Technical\nOptimization",
                desc: "Our team fixes technical issues — site speed, Core Web Vitals, crawlability, indexation, schema markup, and site architecture — to build a solid foundation for organic growth.",
              },
              {
                icon: FileSearch, color: "#22C55E", bg: "#F0FDF4",
                title: "Content &\nOn-Page",
                desc: "We create and optimize high-quality content, implementing on-page SEO best practices, build internal linking structures, and ensure every page is optimized for its target keywords.",
              },
              {
                icon: Link2, color: "#06B6D4", bg: "#ECFEFF",
                title: "Link Building\n& Authority",
                desc: "Through strategic outreach, digital PR, guest posting, and content marketing, we build high-authority backlinks that boost your domain authority and improve rankings across the board.",
              },
              {
                icon: BarChart3, color: "#8B5CF6", bg: "#F5F3FF",
                title: "Monitor &\nScale",
                desc: "We continuously track rankings, analyze performance data, and refine strategies to expand your organic footprint — targeting new keywords, creating new content, and scaling what works.",
              },
            ];
            const dotColors = ["#F43F5E","#F97316","#3B82F6","#22C55E","#06B6D4","#8B5CF6"];
            // SVG wave positions: 6 dots at equal intervals inside viewBox 0 0 960 80
            const dots = [
              { cx: 80,  cy: 40, label: "Step 01" },
              { cx: 240, cy: 20, label: "Step 02" },
              { cx: 400, cy: 60, label: "Step 03" },
              { cx: 560, cy: 20, label: "Step 04" },
              { cx: 720, cy: 60, label: "Step 05" },
              { cx: 880, cy: 40, label: "Step 06" },
            ];
            return (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                  {STEPS.map(({ icon: Icon, color, bg, title, desc }, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 flex-shrink-0" style={{ background: bg }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <h4 className="text-slate-900 font-black text-sm leading-snug mb-2 whitespace-pre-line">{title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                    </m.div>
                  ))}
                </div>

                {/* Wave connector with step labels */}
                <div className="hidden lg:block relative w-full overflow-hidden mb-10 px-2">
                  <svg viewBox="0 0 960 100" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ height: 100 }}>
                    <defs>
                      <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#F43F5E" />
                        <stop offset="20%"  stopColor="#F97316" />
                        <stop offset="40%"  stopColor="#3B82F6" />
                        <stop offset="60%"  stopColor="#22C55E" />
                        <stop offset="80%"  stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                    {/* Wave path */}
                    <path
                      d="M 80 40 C 140 15, 180 5, 240 20 C 300 35, 340 65, 400 60 C 460 55, 500 5, 560 20 C 620 35, 660 65, 720 60 C 780 55, 820 20, 880 40"
                      stroke="url(#waveGrad)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Dots + step labels */}
                    {dots.map(({ cx, cy, label }, i) => (
                      <g key={i}>
                        <circle cx={cx} cy={cy} r="10" fill={dotColors[i]} />
                        <circle cx={cx} cy={cy} r="5"  fill="white" />
                        <text
                          x={cx} y={cy + 26}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="600"
                          fill="#94a3b8"
                          fontFamily="sans-serif"
                        >
                          {label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Mobile step labels */}
                <div className="lg:hidden flex flex-wrap justify-center gap-2 mb-10">
                  {dots.map(({ label }, i) => (
                    <span key={i} className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: dotColors[i] }}>
                      {label}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Link href="/contact">
                    <m.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-sm"
                      style={{ background: "#2563EB" }}
                    >
                      Start Your SEO Journey <ArrowRight className="w-4 h-4" />
                    </m.button>
                  </Link>
                </div>
              </>
            );
          })()}

        </div>
      </section>

      {/* ── WHY CHOOSE TOP SEO SERVICES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-4 text-slate-900">
              Why Choose Top SEO Services for Your{" "}
              <span className="text-blue-600 block">Search Engine Optimization</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Experience unmatched SEO excellence powered by certified experts, proprietary technology, and a relentless focus on organic growth. We transform your website into a sustainable traffic and revenue engine.
            </p>
          </m.div>

          {/* 6-card grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: TrendingUp,
                num: "01",
                title: "Proven Track Record of Rankings",
                desc: "Our data-driven SEO methodology has produced an average organic traffic growth of over 450% for clients across multiple industries. We have documented case studies showing consistent first-page rankings, increased domain authority, and sustainable organic revenue growth.",
              },
              {
                icon: BarChart3,
                num: "02",
                title: "Complete Transparency and Reporting",
                desc: "Our SEO dashboard provides real-time access to keyword rankings, organic traffic data, backlink growth, and conversion metrics. You see exactly what we're doing, why we're doing it, and how it impacts your bottom line — no black-box SEO tactics.",
              },
              {
                icon: Bot,
                num: "03",
                title: "AI-Powered SEO Technology",
                desc: "We leverage cutting-edge AI tools for keyword research, content optimization, rank tracking, and competitive analysis. Our proprietary technology stack identifies opportunities faster and executes optimizations more precisely than traditional methods.",
              },
              {
                icon: Building2,
                num: "04",
                title: "Industry-Specialized SEO Expertise",
                desc: "Our SEO strategists possess deep knowledge of industry-specific search behaviors, seasonal trends, and competitive dynamics. This vertical expertise enables us to create highly targeted strategies that outperform generic SEO approaches.",
              },
              {
                icon: Globe2,
                num: "05",
                title: "Full-Spectrum SEO Coverage",
                desc: "We cover every aspect of SEO — technical, on-page, off-page, local, e-commerce, and content — through an integrated approach that maximizes organic visibility across all search touchpoints and eliminates gaps competitors exploit.",
              },
              {
                icon: ShieldCheck,
                num: "06",
                title: "Dedicated SEO Partnership",
                desc: "You work directly with senior SEO strategists, not junior account managers. We become an extension of your marketing team, providing strategic guidance, proactive recommendations, and hands-on optimization that drives measurable business growth.",
              },
            ].map(({ icon: Icon, num, title, desc }, i) => (
              <m.div
                key={num}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Icon + number row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#EFF6FF" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#2563EB" }} />
                  </div>
                  <span className="text-slate-300 font-black text-xl leading-none">{num}</span>
                </div>
                <h3 className="text-slate-900 font-black text-base leading-snug mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SCALE CTA CARD ── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "#12121e", minHeight: 200 }}
          >
            {/* Right-side photo with purple overlay */}
            <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&auto=format&fit=crop"
                alt="Person working on SEO growth"
                fill
                className="object-cover"
                sizes="50vw"
              />
              {/* purple tint + left fade */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #12121e 0%, rgba(90,40,180,0.55) 60%, rgba(90,40,180,0.35) 100%)" }} />
            </div>

            {/* Left content */}
            <div className="relative z-10 flex flex-col justify-center px-8 md:px-12 py-10 max-w-lg">
              <h2 className="font-black text-2xl md:text-3xl leading-snug mb-3">
                <span className="text-white">Struggling to Scale Your{" "}</span>
                <span style={{ color: "#F59E0B" }}>Organic Growth?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-7">
                We identify high-value keywords, optimize content at scale, and build topical authority — so you grow traffic without growing ad spend.
              </p>
              <div>
                <Link href="/contact">
                  <m.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm text-slate-900"
                    style={{ background: "#F59E0B" }}
                  >
                    Scale Your SEO Now <ArrowRight className="w-4 h-4" />
                  </m.button>
                </Link>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-4 text-slate-900">
              Top SEO Services vs. Competitors:{" "}
              Why We Are the Best{" "}
              <span className="text-blue-600">SEO Company</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              See how our SEO services compare to other agencies. Our transparent approach, white-hat methodologies, and obsessive focus on results deliver superior organic growth.
            </p>
          </m.div>

          {/* Table */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-slate-200 shadow-sm"
          >
            <table className="w-full text-sm">
              {/* Header */}
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-[26%]">
                    Pointers
                  </th>
                  <th className="px-6 py-4 w-[37%]">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider" style={{ color: "#16A34A" }}>
                      Top SEO Services
                    </span>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-left w-[37%]">
                    Competitors
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    pointer: "SEO Strategy",
                    us: "Custom-built strategies based on thorough keyword research, competitor analysis, and your specific business goals",
                    them: "Generic, one-size-fits-all approaches with minimal customization",
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
                    us: "Expert-written, SEO-optimized content that satisfies search intent and builds topical authority",
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
                ].map(({ pointer, us, them }, i) => (
                  <tr
                    key={pointer}
                    className="border-b border-slate-100 last:border-0"
                    style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}
                  >
                    <td className="px-6 py-4 font-semibold text-slate-800 align-top">{pointer}</td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-500" />
                        <span className="text-slate-600 leading-snug">{us}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                        <span className="text-slate-500 leading-snug">{them}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </m.div>

        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12 max-w-xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-3 text-slate-900">
              Frequently Asked Questions About{" "}
              <span className="text-blue-600">SEO Services</span>
            </h2>
            <p className="text-slate-500 text-base">
              Get answers to the most common questions about our search engine optimization services.
            </p>
          </m.div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 max-w-5xl mx-auto items-start">

            {/* Left — Still Have Questions card */}
            <m.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5">
                <Image
                  src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop"
                  alt="Woman thinking with question mark"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
              <h3 className="font-black text-slate-900 text-base mb-2">Still Have Questions?</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-5">
                Can&apos;t find the answer you&apos;re looking for? Our SEO experts are ready to help you get started.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs text-white"
                  style={{ background: "#2563EB" }}
                >
                  Ask Our SEO Experts <ArrowRight className="w-3.5 h-3.5" />
                </m.button>
              </Link>
            </m.div>

            {/* Right — Accordion */}
            <m.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              {[
                { q: "Q1. What SEO services do you offer?", a: "We offer a full suite of SEO services including on-page optimization, technical SEO, link building, content creation, local SEO, e-commerce SEO, and GEO/AEO optimization. Whether you need a complete SEO strategy or targeted improvements, we tailor our approach to your specific business goals." },
                { q: "Q2. How long does it take to see SEO results?", a: "SEO is a long-term strategy. Most clients begin seeing measurable improvements in rankings and traffic within 3–6 months. Significant revenue impact typically follows in 6–12 months. The timeline depends on your current site health, competition level, and the aggressiveness of your strategy." },
                { q: "Q3. How much do your SEO services cost?", a: "Our SEO packages are tailored to your business size and goals. We offer flexible pricing starting from project-based engagements to monthly retainers. Contact us for a custom quote based on a free audit of your current SEO position." },
                { q: "Q4. How do you measure SEO success?", a: "We track a full suite of metrics including organic traffic growth, keyword ranking improvements, domain authority, click-through rates, conversion rates, and revenue attributed to organic search. We provide transparent monthly reporting dashboards." },
                { q: "Q5. Do you use white-hat SEO techniques?", a: "Absolutely. Every tactic we use adheres strictly to Google's Webmaster Guidelines. We never use black-hat techniques like keyword stuffing, cloaking, or purchased link schemes. Our long-term approach protects your site from algorithm penalties." },
                { q: "Q6. What's the difference between on-page and off-page SEO?", a: "On-page SEO refers to optimizations made directly on your website — content quality, keyword targeting, meta tags, page speed, and site structure. Off-page SEO involves building your site's authority through backlinks, digital PR, brand mentions, and social signals from external sources." },
                { q: "Q7. Do you provide content creation as part of SEO?", a: "Yes. Content creation is a core part of our SEO service. We produce SEO-optimized blog posts, landing pages, product descriptions, and pillar pages designed to rank for target keywords and satisfy search intent. Content is written by industry-specialist writers and optimized by our SEO team." },
                { q: "Q8. Can you help with local SEO?", a: "Yes. Our local SEO services include Google Business Profile optimization, local citation building, map-pack ranking strategies, review management, and location-specific content creation to drive qualified foot traffic and local leads." },
                { q: "Q9. How is your SEO agency different from others?", a: "We combine proprietary AI-powered tools with deep human expertise. Unlike agencies that report on vanity metrics, we focus entirely on business outcomes — qualified leads, revenue, and sustainable rankings. You get a dedicated SEO strategist, not a rotating account manager." },
                { q: "Q10. Do you require long-term SEO contracts?", a: "We offer both month-to-month and longer-term engagement options. While we believe consistent long-term investment yields the best results, we never lock you into inflexible contracts. Our work speaks for itself — most clients stay because they see results." },
              ].map(({ q, a }, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm"
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-slate-800 font-semibold text-sm pr-4">{q}</span>
                    <m.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 text-slate-400"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </m.span>
                  </button>
                  <m.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-slate-500 text-sm leading-relaxed">{a}</p>
                  </m.div>
                </div>
              ))}
            </m.div>

          </div>
        </div>
      </section>

      {/* ── GREEN CTA BANNER ── */}
      <section className="py-7" style={{ background: "#16A34A" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-xl md:text-2xl mb-1">
                Ready to Dominate Search Rankings?
              </h3>
              <p className="text-green-100 text-sm">
                Get a free SEO audit and discover how to turn organic traffic into measurable growth.
              </p>
            </div>
            <Link href="/contact" className="flex-shrink-0">
              <m.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-green-700 bg-white"
              >
                Get Your Free Audit <ArrowRight className="w-4 h-4" />
              </m.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── LET'S GET STARTED ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">

            {/* Left — Form */}
            <m.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-8">
                Let&apos;s{" "}
                <span className="text-blue-600">Get Started</span>
              </h2>

              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                {/* Name */}
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {/* Email */}
                <input
                  type="email"
                  placeholder="Business Email *"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {/* Phone */}
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-3 bg-white text-sm text-slate-700 flex-shrink-0">
                    <span>🇺🇸</span>
                    <select
                      value={formData.countryCode}
                      onChange={e => setFormData(p => ({ ...p, countryCode: e.target.value }))}
                      className="bg-transparent text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="+1">US +1</option>
                      <option value="+44">UK +44</option>
                      <option value="+61">AU +61</option>
                      <option value="+91">IN +91</option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="flex-1 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                {/* Budget */}
                <select
                  value={formData.budget}
                  onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="" disabled>Select Budget</option>
                  <option value="<1k">Under $1,000/mo</option>
                  <option value="1k-3k">$1,000 – $3,000/mo</option>
                  <option value="3k-5k">$3,000 – $5,000/mo</option>
                  <option value="5k+">$5,000+/mo</option>
                </select>
                {/* Message */}
                <textarea
                  placeholder="Tell us about your project *"
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
                <m.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
                  style={{ background: "#2563EB" }}
                >
                  Send Message
                </m.button>
              </form>
            </m.div>

            {/* Right — Contact info card */}
            <m.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8 text-white"
              style={{ background: "#DC2626" }}
            >
              <h3 className="font-black text-xl mb-1">Hate Filling out Forms?</h3>
              <p className="text-red-200 text-sm mb-6">
                <span className="underline cursor-pointer">Email us.</span>
              </p>

              <div className="space-y-4">
                {[
                  { label: "Request a Quote",                     email: "business@topseoservices.co" },
                  { label: "Partners Enquires",                   email: "partners@topseoservices.co" },
                  { label: "Reference Checks / Misc. HR Enquires",email: "hr@topseoservices.co" },
                  { label: "Other Enquires",                      email: "info@topseoservices.co" },
                ].map(({ label, email }, i, arr) => (
                  <div key={label}>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-200" />
                      <div>
                        <p className="font-bold text-sm text-white">{label}</p>
                        <a
                          href={`mailto:${email}`}
                          className="text-red-200 text-xs hover:text-white transition-colors"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                    {i < arr.length - 1 && <div className="mt-4 border-t border-red-500/40" />}
                  </div>
                ))}
              </div>
            </m.div>

          </div>
        </div>
      </section>

    </div>
  );
}
