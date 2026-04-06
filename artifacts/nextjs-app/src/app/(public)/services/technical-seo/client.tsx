"use client";

import React, { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  Settings2, TrendingUp, FileText,
  ArrowRight, CheckCircle2, BarChart3,
  Zap, Star, Plus, Minus,
  ChevronRight, Code2, Gauge,
  Phone, Mail,
  Search, AlertCircle,
  Lock, RefreshCw, Smartphone,
} from "lucide-react";

const PROCESS_STEPS = [
  {
    num: "01",
    color: "#F97316",
    label: "Technical SEO",
    icon: Search,
    title: "Technical SEO Audit",
    desc: "A technical SEO audit forms the foundation of a successful SEO strategy. We identify issues affecting site speed, mobile usability, and overall performance, then implement solutions that enhance user experience and improve search engine rankings.",
    items: [
      "Full website crawl & error detection",
      "Core Web Vitals assessment",
      "Competitor benchmarking",
      "Prioritized action plan",
    ],
  },
  {
    num: "02",
    color: "#F97316",
    label: "Website Speed",
    icon: Gauge,
    title: "Website Speed Optimisation",
    desc: "Page speed is a confirmed Google ranking signal. We optimise server response times, compress assets, defer non-critical scripts, and configure CDN delivery — targeting real-world Core Web Vitals improvements across every device type.",
    items: [
      "LCP, INP, and CLS optimisation",
      "Image compression & WebP conversion",
      "JavaScript deferral & render-blocking removal",
      "CDN setup and server response tuning",
    ],
  },
  {
    num: "03",
    color: "#F97316",
    label: "Mobile-Friendliness",
    icon: Smartphone,
    title: "Mobile-Friendliness & Responsive Design",
    desc: "Google uses mobile-first indexing, making your mobile experience your primary digital presence. We audit and fix every mobile usability issue — from tap-target spacing to viewport configuration — to satisfy Google's mobile requirements.",
    items: [
      "Mobile usability audit across device types",
      "Responsive layout and viewport fixes",
      "Touch-target and font-size compliance",
      "Mobile page speed benchmarking",
    ],
  },
  {
    num: "04",
    color: "#F97316",
    label: "Optimising Core",
    icon: Code2,
    title: "Optimising Core Web Vitals",
    desc: "Core Web Vitals — LCP, INP, and CLS — are the page experience metrics Google uses as ranking signals. We diagnose real-world field data, implement code-level fixes, and validate improvements through Search Console and PageSpeed Insights.",
    items: [
      "Core Web Vitals field data analysis",
      "LCP image and server optimisation",
      "CLS layout shift identification and fixing",
      "INP interaction delay improvements",
    ],
  },
  {
    num: "05",
    color: "#F97316",
    label: "On-Page SEO",
    icon: FileText,
    title: "On-Page SEO & Structured Data",
    desc: "We implement comprehensive JSON-LD schema markup across your key page types and align on-page technical elements. Structured data unlocks rich results — FAQs, star ratings, and breadcrumbs — that improve CTR and brand visibility in the SERPs.",
    items: [
      "Title tag, meta description & heading audits",
      "Canonical and hreflang configuration",
      "JSON-LD schema implementation (FAQ, Article, Org)",
      "Schema validation via Rich Results Test",
    ],
  },
  {
    num: "06",
    color: "#F97316",
    label: "Ongoing Monitoring",
    icon: BarChart3,
    title: "Ongoing Monitoring & Reporting",
    desc: "After implementation, we configure continuous monitoring dashboards that alert us to new issues before they affect rankings. Monthly reports document every improvement — crawl stats, Core Web Vitals, indexation, and organic performance trends.",
    items: [
      "Search Console crawl error monitoring",
      "Core Web Vitals field data tracking",
      "Monthly technical health scorecard",
      "Algorithm update impact analysis",
    ],
  },
];


const FAQS = [
  { q: "What technical issues does your agency review?",                                         a: "Our agency reviews broken links, SSL security issues, page loading speed for both mobile and desktop, duplicate content, thin content, crawlability problems, and overall site structure to ensure your website meets the highest technical standards." },
  { q: "What types of businesses do you collaborate with?",                                      a: "We work with businesses of all sizes — from startups to enterprise brands — across e-commerce, SaaS, healthcare, finance, legal, and local services. If your website needs to rank on Google, we can help build the technical foundation to make it happen." },
  { q: "What is an XML sitemap, and why do you need it?",                                        a: "An XML sitemap is a file that lists all the important pages on your website, helping search engines discover and index your content efficiently. Without a properly configured sitemap, key pages may be missed or crawled infrequently, limiting your organic visibility." },
  { q: "What tools do you use for a successful technical SEO?",                                  a: "We use a combination of industry-leading tools including Screaming Frog, Google Search Console, PageSpeed Insights, Ahrefs, SEMrush, Lighthouse, and custom scripts for crawl analysis, Core Web Vitals monitoring, and log file analysis." },
  { q: "Why hire Top SEO Services for your technical SEO?",                                      a: "Our team combines deep engineering expertise with proven SEO strategy. We don't just identify problems — we fix them. Every client gets a tailored technical health plan, transparent monthly reporting, and dedicated support throughout implementation." },
  { q: "What is the difference between technical SEO and SEO?",                                  a: "SEO is a broad discipline covering content, authority building, and technical performance. Technical SEO specifically focuses on the infrastructure layer — server configuration, crawlability, indexation, page speed, structured data, and security — ensuring search engines can effectively access and understand your site." },
  { q: "What is a canonical tag, and why do you use it?",                                        a: "A canonical tag tells search engines which version of a page is the 'master' copy when duplicate or near-duplicate content exists across multiple URLs. Correct canonical implementation prevents duplicate content penalties and consolidates link equity to the preferred page." },
  { q: "What strategies should I follow to improve the speed at which my website loads?",        a: "Key strategies include optimising server response time, enabling browser caching, compressing images (WebP format), deferring non-critical JavaScript, minimising render-blocking resources, implementing a CDN, and targeting Core Web Vitals improvements through code-level fixes." },
  { q: "What are orphan pages?",                                                                  a: "Orphan pages are pages on your website that have no internal links pointing to them. Search engines struggle to discover and index these pages efficiently, meaning they may not rank despite having good content. We identify and reconnect orphan pages as part of our site architecture audit." },
  { q: "What are the key components of a technical audit?",                                      a: "A comprehensive technical audit covers crawlability and robots.txt, XML sitemap accuracy, index coverage, canonical and hreflang tags, page speed and Core Web Vitals (LCP, INP, CLS), structured data validity, HTTPS configuration, mobile usability, internal linking, and URL structure." },
  { q: "How much do you charge for Technical SEO services?",                                     a: "Pricing depends on the scope of your site, the complexity of issues identified, and the level of ongoing support required. We offer flexible packages for one-time audits, implementation projects, and monthly retainers. Contact us for a tailored quote based on your specific needs." },
  { q: "What are the best practices for implementing FAQ schema markup?",                         a: "Best practices include using JSON-LD format, ensuring the FAQ content matches what's visible on the page, using concise answers under 300 words, avoiding promotional language in answers, and validating the markup via Google's Rich Results Test before deploying." },
];

export function TechnicalSeoPageClient() {
  const [openFaq, setOpenFaq]       = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [faqSearch, setFaqSearch]     = useState("");
  const [formData, setFormData]     = useState({
    name: "", email: "", phone: "", countryCode: "+1",
    budget: "", service: "Technical SEO", message: "",
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28"
        style={{ background: "linear-gradient(140deg, #EEF4FF 0%, #F4F7FE 45%, #F8FAFC 100%)" }}
      >
        {/* Subtle gradient blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(37,99,235,0.08)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(249,115,22,0.06)" }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          {/* Breadcrumb */}
          <m.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs text-slate-400 mb-8"
          >
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-500">Search Engine Marketing</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold" style={{ color: "#2563EB" }}>Technical SEO</span>
          </m.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <div>
              <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.18)" }}
                >
                  <Settings2 className="w-3.5 h-3.5" /> Technical SEO Services
                </span>
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                className="font-display font-black text-slate-900 leading-tight mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Advanced{" "}
                <span style={{ color: "#2563EB" }}>Technical SEO</span>
                <br />Services to Drive
                <br />Rankings &amp; Authority
              </m.h1>

              <m.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.45 }}
                className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-md"
              >
                Top SEO Services is an award-winning technical SEO services provider for businesses of all scales. Our scalable technical SEO strategies and best practices help overcome performance obstacles while improving rankings and boosting online authority.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link href="/contact">
                  <m.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
                    style={{ background: "#F97316", boxShadow: "0 4px 20px rgba(249,115,22,0.35)" }}
                  >
                    Get Free SEO Proposal <ArrowRight className="w-4 h-4" />
                  </m.button>
                </Link>
                <Link href="#process">
                  <m.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    See Our Process <ChevronRight className="w-4 h-4" />
                  </m.button>
                </Link>
              </m.div>
            </div>

            {/* Right — SEO audit dashboard mockup */}
            <m.div
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden lg:flex justify-center"
            >
              <div
                className="rounded-2xl overflow-hidden w-full max-w-md"
                style={{
                  background: "white",
                  boxShadow: "0 16px 60px rgba(37,99,235,0.14), 0 2px 8px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(37,99,235,0.1)",
                }}
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100" style={{ background: "#F8FAFC" }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-slate-400 font-mono">seo-audit: report</span>
                </div>

                <div className="p-5">
                  {/* Bar chart */}
                  <div className="mb-4">
                    <div className="flex items-end gap-1.5 h-24 mb-2">
                      {[40, 55, 45, 65, 52, 72, 60, 85].map((h, i) => (
                        <m.div
                          key={i}
                          initial={{ height: 0 }} animate={{ height: `${h}%` }}
                          transition={{ delay: 0.7 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                          className="flex-1 rounded-t-sm"
                          style={{ background: i === 7 ? "#16A34A" : i >= 5 ? "#2563EB" : "#BFDBFE", minHeight: "8px" }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Rankings</span>
                      <span className="font-semibold text-green-600">Authority</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2">
                    {[
                      { label: "Core Web Vitals", value: "✓ Pass",  color: "#16A34A", bg: "#F0FDF4" },
                      { label: "Crawl Efficiency", value: "96%",    color: "#2563EB", bg: "#EFF6FF" },
                      { label: "Page Speed",       value: "1.2s",   color: "#F97316", bg: "#FFF7ED" },
                    ].map(({ label, value, color, bg }) => (
                      <div key={label} className="flex items-center justify-between p-2.5 rounded-lg" style={{ background: bg }}>
                        <span className="text-xs text-slate-600 font-medium">{label}</span>
                        <span className="text-xs font-bold" style={{ color }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tag row */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                    {["Optimisation", "Speed", "Indexing"].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── WHAT IS TECHNICAL SEO ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — image collage */}
            <m.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative"
              style={{ height: "420px" }}
            >
              {/* Main large dark image */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{ right: "60px", boxShadow: "0 12px 48px rgba(0,0,0,0.18)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=540&fit=crop&q=85"
                  alt="Analytics dashboard"
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay to give it the dark dashboard feel */}
                <div className="absolute inset-0" style={{ background: "rgba(5,13,40,0.55)" }} />
                {/* Simulated chart overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-white text-xs font-bold opacity-80 mb-3">USERS: LAST 7 DAYS USING MEDIAN</p>
                    <div className="grid grid-cols-2 gap-3">
                      {["LOAD TIME VS BOUNCE RATE", "START RENDER VS BOUNCE RATE"].map((title) => (
                        <div key={title} className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <p className="text-white text-xs opacity-60 mb-2">{title}</p>
                          {/* Mini chart lines */}
                          <svg viewBox="0 0 80 30" className="w-full h-8">
                            <polyline points="0,25 15,18 25,22 35,10 45,15 55,8 65,12 80,5" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
                            <polyline points="0,28 15,24 25,26 35,20 45,22 55,18 65,20 80,15" fill="none" stroke="#F97316" strokeWidth="1.5" />
                          </svg>
                          <p className="text-xs font-bold mt-1" style={{ color: "#06B6D4" }}>57.1%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Page Load", value: "0.7s" },
                      { label: "Page Views", value: "2.7Mpvs" },
                      { label: "Bounce Rate", value: "40.6%" },
                      { label: "Sessions", value: "479K" },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg p-2" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <p className="text-white text-xs opacity-50">{label}</p>
                        <p className="text-white text-xs font-bold mt-0.5">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top-right floating image */}
              <m.div
                initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-0 right-0 w-40 h-28 rounded-xl overflow-hidden"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 10 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=320&h=220&fit=crop&q=85"
                  alt="Data analytics on laptop"
                  className="w-full h-full object-cover"
                />
              </m.div>

              {/* Bottom-left floating image */}
              <m.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.45, duration: 0.5 }}
                className="absolute bottom-0 left-0 w-36 h-24 rounded-xl overflow-hidden"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 10 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=280&h=190&fit=crop&q=85"
                  alt="Technical dashboard"
                  className="w-full h-full object-cover"
                />
              </m.div>
            </m.div>

            {/* Right — copy */}
            <m.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.18)" }}
              >
                <Search className="w-3.5 h-3.5" /> Understanding Technical SEO
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-6">
                What Is Technical SEO and{" "}
                <span style={{ color: "#2563EB" }}>How Does It Work?</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Technical SEO is a super-advanced &amp; effective way to boost the online success of your B2B and B2C company. Drive organic traffic, boost conversion rates, and ultimately increase your profit by working with a technical SEO agency to execute a data-driven methodology to improve your online presence. Along with this, technical SEO services is vital because search engines like Google, BING and Yandex give preferential treatment in search results pages to websites with specific technical pointers.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                As a result, our team thoroughly conducts improved technical SEO analysis to guarantee your website fulfils the performance standards to rank in today&apos;s competitive search results.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
                  style={{ background: "#F97316", boxShadow: "0 4px 20px rgba(249,115,22,0.35)" }}
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </m.button>
              </Link>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── WHAT WE COVER — EXPERT SOLUTIONS ── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Header — centered */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.18)" }}
            >
              <Settings2 className="w-3.5 h-3.5" /> Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              What We Cover in Our Expert{" "}
              <span style={{ color: "#2563EB" }}>Technical SEO Solutions</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Dominate search rankings with our proven technical SEO strategies that scale your website into a high-performance powerhouse. Our technical SEO services fix deep-rooted barriers, improve site speed, and enhance online authority.
            </p>
          </m.div>

          {/* 4 × 2 card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: Search,
                color: "#2563EB",
                bg: "#EFF6FF",
                title: "Website Crawling and Indexing Optimization",
                desc: "Search engines must be able to fully crawl and index all important pages on your website. The team executes an entire assessment of your XML sitemaps and robots.txt files and internal link structure to identify and fix issues that block search engines from reaching your website.",
              },
              {
                icon: Gauge,
                color: "#16A34A",
                bg: "#F0FDF4",
                title: "Site Speed and Performance",
                desc: "A slow website destroys your ability to convert visitors into customers while also damaging your search engine position. The engineers optimise your system to achieve a two-second loading time for all pages, which results in a fast user experience that Google and your users will appreciate through their active engagement and ongoing loyalty.",
              },
              {
                icon: Smartphone,
                color: "#7C3AED",
                bg: "#F5F3FF",
                title: "Mobile-Friendly and Responsive Design",
                desc: "With Google's mobile-first indexing, your mobile experience is now required because it functions as your complete digital presence. Our team conducts a complete assessment of your entire website to verify its proper operation across all devices. A perfect mobile experience leads to better rankings and reduced bounce rates.",
              },
              {
                icon: FileText,
                color: "#CA8A04",
                bg: "#FEFCE8",
                title: "Technical On-Page SEO",
                desc: "The technical aspects of on-page SEO serve as the invisible force driving improvements in search engine rankings beyond basic keyword usage. The team optimises all major aspects such as title tags, descriptions, heading hierarchy, canonical URLs, internal linking, and image alt texts, etc.",
              },
              {
                icon: Code2,
                color: "#DB2777",
                bg: "#FDF2F8",
                title: "Structured Data and Schema Markup",
                desc: "The use of structured data through professional implementation creates rich snippets, which make your search results more distinctive. We establish schema markup power through FAQ, product, review, and local business and event schema implementations, directly aligning your website coding structure.",
              },
              {
                icon: Settings2,
                color: "#F97316",
                bg: "#FFF7ED",
                title: "Fixing Crawl Errors and Redirects",
                desc: "Our technical experts discover all 404 errors while they resolve redirect chain problems and loop issues, and they correct every Google Search Console crawl warning. The team uses clean 301 redirects to combine duplicate pages during the lost link equity recovery.",
              },
              {
                icon: Lock,
                color: "#0EA5E9",
                bg: "#F0F9FF",
                title: "Secure Website Setup (HTTPS)",
                desc: "Trust functions as digital currency in online spaces, which makes HTTPS your verification method. We execute a complete SSL certificate implementation through our installation and configuration process that secures your website. Google also gives better search rankings to these websites.",
              },
              {
                icon: RefreshCw,
                color: "#D97706",
                bg: "#FFFBEB",
                title: "Technical SEO Audit and Monitoring",
                desc: "Continuous monitoring serves as the requirement for your website to maintain its top position because one-time repairs fail to protect your site. Our technical SEO audits discover all hidden problems that affect your complete website, from indexing failures to Core Web Vitals issues.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 4) * 0.07, duration: 0.45 }}
                onMouseEnter={() => setHoveredCard(200 + i)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden cursor-default transition-all duration-300"
                style={{
                  background: hoveredCard === 200 + i ? `${color}10` : "white",
                  border: hoveredCard === 200 + i ? `1.5px solid ${color}30` : "1.5px solid #F1F5F9",
                  boxShadow: hoveredCard === 200 + i
                    ? `0 8px 32px ${color}18`
                    : "0 1px 4px rgba(0,0,0,0.04)",
                  transform: hoveredCard === 200 + i ? "translateY(-4px)" : "none",
                }}
              >
                {/* Corner blob */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none transition-all duration-300"
                  style={{
                    background: hoveredCard === 200 + i ? `${color}22` : `${color}12`,
                    transform: "translate(30%, -30%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300"
                  style={{
                    background: hoveredCard === 200 + i ? `${color}20` : bg,
                  }}
                >
                  <Icon className="w-5 h-5 transition-colors duration-300" style={{ color }} />
                </div>

                <h3
                  className="font-bold text-sm leading-snug relative z-10 transition-colors duration-300"
                  style={{ color }}
                >
                  {title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1 relative z-10">{desc}</p>
              </m.div>
            ))}
          </div>

          {/* CTA button */}
          <div className="flex justify-center">
            <Link href="/contact">
              <m.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white shadow-lg"
                style={{ background: "#F97316", boxShadow: "0 4px 20px rgba(249,115,22,0.35)" }}
              >
                Let&apos;s Discuss Your Requirements <ArrowRight className="w-4 h-4" />
              </m.button>
            </Link>
          </div>

        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #F0F7FF 0%, #F8FAFC 50%, #EFF6FF 100%)" }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">

          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.18)" }}
            >
              <Zap className="w-3.5 h-3.5" /> Why It Matters
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Why Technical SEO Is Essential for{" "}
              <span style={{ color: "#2563EB" }}>Website Performance</span> and Scalability
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              A strong technical foundation eliminates performance hurdles, improves scalability, and aligns every element to maximize speed, efficiency, and impact.
            </p>
          </m.div>

          {/* 3-row × 2-col feature list */}
          <div className="divide-y divide-slate-100">
            {[
              [
                { icon: Search,       color: "#2563EB", bg: "#EFF6FF", title: "Crawlability & Indexing",     desc: "Ensure high-value pages are discovered, indexed, and positioned for organic growth." },
                { icon: Gauge,        color: "#16A34A", bg: "#F0FDF4", title: "Website Speed & Stability",   desc: "Enhance server response, resource delivery, and code efficiency for fast experiences." },
              ],
              [
                { icon: Smartphone,   color: "#7C3AED", bg: "#F5F3FF", title: "Mobile Compatibility",        desc: "Responsive design and fast mobile load speeds for Google's mobile-first indexing." },
                { icon: Zap,          color: "#F97316", bg: "#FFF7ED", title: "Core Web Vitals & UX",        desc: "LCP, CLS, and INP metrics ensuring fast loading, visual stability, and smooth interaction." },
              ],
              [
                { icon: AlertCircle,  color: "#E11D48", bg: "#FFF1F2", title: "Fixing Technical Errors",     desc: "Resolve broken links, crawl errors, duplicate content, and redirect issues." },
                { icon: Lock,         color: "#0EA5E9", bg: "#F0F9FF", title: "Website Security",            desc: "HTTPS encryption and vulnerability management for trust and rankings." },
              ],
            ].map((row, ri) => (
              <div key={ri} className="grid sm:grid-cols-2 gap-0 py-7">
                {row.map(({ icon: Icon, color, bg, title, desc }, ci) => {
                  const idx = 300 + ri * 2 + ci;
                  return (
                    <m.div
                      key={title}
                      initial={{ opacity: 0, x: ci === 0 ? -16 : 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ri * 0.1, duration: 0.4 }}
                      onMouseEnter={() => setHoveredCard(idx)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="flex items-start gap-4 px-5 py-4 rounded-xl transition-all duration-200 cursor-default"
                      style={{
                        background: hoveredCard === idx ? `${color}09` : "transparent",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                        style={{ background: hoveredCard === idx ? `${color}22` : bg }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color, width: "18px", height: "18px" }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-800 mb-1">{title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </m.div>
                  );
                })}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(120deg, #050D28 0%, #0C1A45 60%, #0F2460 100%)" }}
          >
            {/* Subtle glow blobs */}
            <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(37,99,235,0.15)", filter: "blur(60px)", transform: "translateY(-40%)" }} />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(249,115,22,0.12)", filter: "blur(50px)", transform: "translateY(30%)" }} />

            <div className="relative grid lg:grid-cols-2 gap-0 items-center">
              {/* Left — copy */}
              <div className="p-10 md:p-14">
                <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-3">
                  Do your website&apos;s hidden weaknesses cost you
                </h2>
                <h2 className="text-2xl md:text-3xl font-display font-black leading-tight mb-5" style={{ color: "#F97316" }}>
                  rankings &amp; revenue?
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
                  Each second matters. Our technical SEO experts diagnose and eliminate technical flaws to deliver speed, authority, and powerful search performance.
                </p>
                <Link href="/contact">
                  <m.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white"
                    style={{ background: "#F97316", boxShadow: "0 4px 20px rgba(249,115,22,0.45)" }}
                  >
                    Obtain Free Technical SEO Audit <ArrowRight className="w-4 h-4" />
                  </m.button>
                </Link>
              </div>

              {/* Right — analytics mockup */}
              <div className="relative h-64 lg:h-full lg:min-h-[340px] overflow-hidden">
                {/* Photo underneath */}
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=85"
                  alt="Analytics dashboard"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                {/* Dark overlay so the chart UI pops */}
                <div className="absolute inset-0" style={{ background: "rgba(5,13,40,0.55)" }} />

                {/* Chart UI overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <p className="text-white text-xs font-bold opacity-70">USERS: LAST 7 DAYS USING MEDIAN ▼</p>

                  {/* Bar chart simulation */}
                  <div className="flex items-end gap-1.5 h-24">
                    {[40, 65, 50, 80, 55, 90, 70, 95, 60, 85, 45, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background: i % 3 === 0
                            ? "rgba(6,182,212,0.9)"
                            : i % 3 === 1
                              ? "rgba(37,99,235,0.7)"
                              : "rgba(249,115,22,0.5)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Bottom metrics row */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Page Views", value: "2.7Mpvs" },
                      { label: "Bounce Rate", value: "40.6%" },
                      { label: "Sessions",   value: "479K" },
                      { label: "Load Time",  value: "0.7s" },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg px-2.5 py-2" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <p className="text-white text-xs opacity-50">{label}</p>
                        <p className="text-white text-xs font-bold mt-0.5">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </m.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-20" style={{ background: "linear-gradient(135deg, #F0F7FF 0%, #F8FAFC 50%, #EFF6FF 100%)" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Header — centered */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.18)" }}
            >
              <Settings2 className="w-3.5 h-3.5" /> Our Strategy
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              Our Proven 6-Step{" "}
              <span style={{ color: "#2563EB" }}>Technical SEO<br className="hidden sm:block" /> Strategy</span>
            </h2>
          </m.div>

          {/* Step navigation bar */}
          <div className="relative flex items-start mb-8 px-2">
            {PROCESS_STEPS.map((step, i) => (
              <React.Fragment key={i}>
                <button
                  onClick={() => setActiveStep(i)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 group"
                  style={{ width: "80px" }}
                >
                  {/* Circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                    style={{
                      background: activeStep === i ? "#F97316" : "white",
                      color: activeStep === i ? "white" : "#94A3B8",
                      border: activeStep === i ? "none" : "1.5px solid #E2E8F0",
                      boxShadow: activeStep === i ? "0 4px 14px rgba(249,115,22,0.40)" : "none",
                    }}
                  >
                    {step.num}
                  </div>
                  {/* Label */}
                  <span
                    className="text-xs text-center leading-tight transition-colors duration-200"
                    style={{
                      color: activeStep === i ? "#F97316" : "#94A3B8",
                      fontWeight: activeStep === i ? 700 : 400,
                      maxWidth: "72px",
                    }}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connector line */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="flex-1 h-px mt-5" style={{ background: "#E2E8F0" }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Content card */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeStep}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
              className="relative bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)", border: "1px solid #F1F5F9" }}
            >
              {/* Top-right corner blob */}
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: "rgba(249,115,22,0.10)", transform: "translate(38%, -38%)" }}
              />

              {(() => {
                const step = PROCESS_STEPS[activeStep];
                const Icon = step.icon;
                return (
                  <div className="p-8 md:p-10">
                    <div className="grid lg:grid-cols-2 gap-10 items-start relative">

                      {/* Left — info */}
                      <div>
                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                          style={{ background: "#FFF7ED" }}
                        >
                          <Icon className="w-6 h-6" style={{ color: "#F97316" }} />
                        </div>

                        {/* Step badge */}
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                          style={{ background: "#FFF7ED", color: "#F97316" }}
                        >
                          Step {step.num} of 0{PROCESS_STEPS.length}
                        </span>

                        <h3 className="text-2xl font-display font-black text-slate-900 mb-4">{step.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                      </div>

                      {/* Right — checklist */}
                      <div className="space-y-3">
                        {step.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 py-3.5 px-4 rounded-xl"
                            style={{ border: "1px solid #F1F5F9", background: "#FAFBFC" }}
                          >
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#F97316" }} />
                            <span className="text-slate-700 text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Bottom — progress bar + navigation */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                      {/* Prev */}
                      <button
                        onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                        disabled={activeStep === 0}
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30 flex-shrink-0"
                        style={{ borderColor: "#E2E8F0" }}
                      >
                        <ChevronRight className="w-4 h-4 rotate-180 text-slate-500" />
                      </button>

                      {/* Progress bar */}
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                        <m.div
                          className="h-full rounded-full"
                          style={{ background: "#F97316" }}
                          initial={{ width: 0 }}
                          animate={{ width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>

                      {/* Counter */}
                      <span className="text-slate-500 text-sm font-medium flex-shrink-0">
                        {activeStep + 1} / {PROCESS_STEPS.length}
                      </span>

                      {/* Next */}
                      <button
                        onClick={() => setActiveStep((s) => Math.min(PROCESS_STEPS.length - 1, s + 1))}
                        disabled={activeStep === PROCESS_STEPS.length - 1}
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30 flex-shrink-0"
                        style={{ borderColor: "#E2E8F0" }}
                      >
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </m.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── MID-PAGE CTA ── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #F0F7FF 0%, #F8FAFC 50%, #EFF6FF 100%)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <m.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
                Maximize Your Website&apos;s Potential with{" "}
                <span style={{ color: "#2563EB" }}>Result-Driven Technical SEO Solutions</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-md">
                Get in touch with our SEO professionals to build a powerful technical SEO strategy for a fully optimized and mobile-friendly website.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white"
                  style={{ background: "#F97316", boxShadow: "0 4px 20px rgba(249,115,22,0.38)" }}
                >
                  Start Your SEO Journey Today
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </m.button>
              </Link>
            </m.div>

            {/* Right — laptop photo */}
            <m.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=460&fit=crop&q=85"
                alt="Laptop showing analytics dashboard"
                className="w-full h-full object-cover"
                style={{ maxHeight: "300px" }}
              />
            </m.div>

          </div>
        </div>
      </section>

      {/* ── WHY BUSINESSES CHOOSE US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.18)" }}
            >
              <Search className="w-3.5 h-3.5" /> Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
              Why Businesses Choose Our{" "}
              <span style={{ color: "#2563EB" }}>Technical SEO Expertise</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-3xl mx-auto">
              Businesses consider Top SEO Services to be their reliable technical SEO services company because our exceptional SEO specialists concentrate on producing results that create a strong business impact. Our off-page SEO services deliver immediate solutions for essential performance problems that affect website speed and mobile optimization to help your website succeed in the online marketplace.
            </p>
          </m.div>

          {/* Zigzag timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical center line */}
            <div
              className="absolute top-8 bottom-8 w-px pointer-events-none"
              style={{ left: "50%", transform: "translateX(-50%)", background: "linear-gradient(to bottom, #E2E8F0, #CBD5E1, #E2E8F0)" }}
            />

            {[
              { num: "01", icon: Search,    color: "#2563EB", title: "In-Depth Audits",              desc: "The SEO experts conduct a full SEO assessment of the website to evaluate its complete state while they analyze every single site component." },
              { num: "02", icon: Zap,       color: "#F97316", title: "Speed Optimization",           desc: "Our team optimizes your website to achieve instant performance improvements, which result in better user experience and higher search engine rankings." },
              { num: "03", icon: Smartphone,color: "#16A34A", title: "Mobile Friendliness",          desc: "We establish your website's responsive design capability to provide users with a seamless experience across all devices, which helps to increase their time spent on your site." },
              { num: "04", icon: Settings2, color: "#7C3AED", title: "On-Page Improvements",         desc: "We optimize every website element, starting from Meta titles to metadata, which helps improve website visibility and user attraction for both visitors and search engines." },
              { num: "05", icon: BarChart3, color: "#E11D48", title: "Core Web Vitals Compliance",   desc: "Our core objective is to ensure your site is compliant with the core web vitals, which Google considers an essential requirement for determining website rankings." },
              { num: "06", icon: TrendingUp,color: "#D97706", title: "Regular Tracking",             desc: "Our job won't stop after optimization because our ongoing monitoring will help your website maintain its competitive edge while achieving peak performance." },
            ].map(({ num, icon: Icon, color, title, desc }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <m.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="relative grid items-center mb-10 last:mb-0"
                  style={{ gridTemplateColumns: "1fr 72px 1fr" }}
                >
                  {/* Left text (odd rows) */}
                  <div className={`pr-6 ${isLeft ? "text-right" : ""}`}>
                    {isLeft && (
                      <>
                        <div className="inline-flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-base" style={{ color }}>{title}</h3>
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black"
                            style={{ background: color, fontSize: "10px" }}
                          >
                            {num}
                          </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                      </>
                    )}
                  </div>

                  {/* Center circle */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: color,
                        boxShadow: `0 4px 16px ${color}44`,
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Right text (even rows) */}
                  <div className="pl-6">
                    {!isLeft && (
                      <>
                        <div className="inline-flex items-center gap-2 mb-2">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black"
                            style={{ background: color, fontSize: "10px" }}
                          >
                            {num}
                          </span>
                          <h3 className="font-bold text-base" style={{ color }}>{title}</h3>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                      </>
                    )}
                  </div>
                </m.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}
            >
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-6">
              Technical SEO <span style={{ color: "#2563EB" }}>FAQs</span>
            </h2>

            {/* Search bar */}
            <div className="relative max-w-xs">
              <input
                type="text"
                placeholder="Search question here"
                value={faqSearch}
                onChange={(e) => { setFaqSearch(e.target.value); setOpenFaq(null); }}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none"
                style={{ border: "1.5px solid #E2E8F0", background: "white" }}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </m.div>

          {/* 2-col accordion */}
          {(() => {
            const filtered = faqSearch.trim()
              ? FAQS.filter((f) => f.q.toLowerCase().includes(faqSearch.toLowerCase()))
              : FAQS;
            const left  = filtered.filter((_, i) => i % 2 === 0);
            const right = filtered.filter((_, i) => i % 2 === 1);

            const FaqItem = ({ faq, idx }: { faq: { q: string; a: string }; idx: number }) => {
              const isOpen = openFaq === idx;
              return (
                <m.div
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.35 }}
                  className="rounded-xl overflow-hidden mb-3 transition-all duration-200"
                  style={{
                    background: isOpen ? "#FFF7ED" : "white",
                    border: isOpen ? "1.5px solid #FED7AA" : "1.5px solid #F1F5F9",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                  >
                    <span
                      className="font-semibold text-sm leading-snug"
                      style={{ color: isOpen ? "#F97316" : "#1E293B" }}
                    >
                      {faq.q}
                    </span>
                    {/* +/– button */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isOpen ? "#F97316" : "transparent",
                        border: isOpen ? "none" : "1.5px solid #CBD5E1",
                      }}
                    >
                      {isOpen
                        ? <Minus className="w-3.5 h-3.5 text-white" />
                        : <Plus  className="w-3.5 h-3.5 text-slate-400" />
                      }
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              );
            };

            if (filtered.length === 0) {
              return (
                <p className="text-slate-400 text-sm py-8 text-center">No questions match your search.</p>
              );
            }

            return (
              <div className="grid lg:grid-cols-2 gap-4 items-start">
                <div>
                  {left.map((faq) => {
                    const idx = FAQS.indexOf(faq);
                    return <FaqItem key={idx} faq={faq} idx={idx} />;
                  })}
                </div>
                <div>
                  {right.map((faq) => {
                    const idx = FAQS.indexOf(faq);
                    return <FaqItem key={idx} faq={faq} idx={idx} />;
                  })}
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── LET'S GET STARTED ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — form */}
            <m.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-8">
                Let&apos;s <span style={{ color: "#2563EB" }}>Get Started</span>
              </h2>

              {/* Input helper style: bottom-border only */}
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Your Name */}
                <input
                  type="text" placeholder="Your Name*" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                  style={{ borderBottom: "1.5px solid #E2E8F0" }}
                />

                {/* Business Email */}
                <input
                  type="email" placeholder="Business Email*" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                  style={{ borderBottom: "1.5px solid #E2E8F0" }}
                />

                {/* Phone row */}
                <div className="flex items-center gap-3 pb-2" style={{ borderBottom: "1.5px solid #E2E8F0" }}>
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="text-sm text-slate-700 bg-transparent outline-none pr-1"
                  >
                    {[["US","+1"],["GB","+44"],["AU","+61"],["IN","+91"],["DE","+49"],["FR","+33"],["JP","+81"]].map(([c, code]) => (
                      <option key={code} value={code}>{c} {code}</option>
                    ))}
                  </select>
                  <span className="text-slate-300 text-sm">|</span>
                  <input
                    type="tel" placeholder="Phone Number *" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                  />
                </div>

                {/* Select Budget */}
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full pb-2 text-sm bg-transparent outline-none"
                  style={{ borderBottom: "1.5px solid #E2E8F0", color: formData.budget ? "#1E293B" : "#94A3B8" }}
                >
                  <option value="">Select Budget</option>
                  {["Under $1,000","$1,000–$3,000","$3,000–$5,000","$5,000–$10,000","$10,000+"].map(b => <option key={b} value={b}>{b}</option>)}
                </select>

                {/* Message */}
                <textarea
                  rows={3} placeholder="Tell us about your project*"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none resize-none"
                  style={{ borderBottom: "1.5px solid #E2E8F0" }}
                />

                {/* Submit */}
                <div>
                  <m.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-8 py-3 rounded-full font-bold text-sm text-white"
                    style={{ background: "#2563EB", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
                  >
                    Send Message
                  </m.button>
                </div>
              </form>
            </m.div>

            {/* Right — red contact card */}
            <m.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden p-8 md:p-10"
              style={{ background: "#DC2626" }}
            >
              {/* Decorative blob top-right */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "rgba(255,255,255,0.08)", transform: "translate(35%, -35%)" }}
              />
              <div
                className="absolute top-8 right-8 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              <h3 className="text-xl font-display font-black text-white mb-1 relative z-10">
                Hate Filling out Forms?
              </h3>
              <p className="text-sm mb-8 relative z-10" style={{ color: "rgba(255,255,255,0.85)" }}>
                <span className="underline font-medium cursor-pointer hover:opacity-80 transition-opacity">Email us.</span>
              </p>

              <div className="relative z-10 divide-y" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                {[
                  { label: "Request a Quote",                  email: "business@topseoservices.co" },
                  { label: "Partners Enquires",                email: "partners@topseoservices.co" },
                  { label: "Reference Checks /Misc. HR Enquires", email: "hr@topseoservices.co" },
                  { label: "Other Enquires",                   email: "info@topseoservices.co" },
                ].map(({ label, email }, i) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ borderColor: "rgba(255,255,255,0.7)" }}
                      >
                        <div className="w-1.5 h-1 border-b-2 border-r-2 rotate-45 -translate-y-0.5" style={{ borderColor: "rgba(255,255,255,0.9)" }} />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{label}</p>
                        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>{email}</p>
                      </div>
                    </div>
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
