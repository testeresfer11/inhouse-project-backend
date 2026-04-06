"use client";

import React, { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  Search, TrendingUp, Target, FileText,
  ArrowRight, CheckCircle2, BarChart3,
  Zap, ShieldCheck, Settings2, Link2,
  Globe2, Star, Plus, Minus,
  ChevronRight, Tag, AlignLeft, Code2,
  Gauge, ImageIcon, LayoutGrid, Clock,
  Phone, Mail, MapPin,
} from "lucide-react";

const STATS = [
  { icon: TrendingUp, value: "3.8×",    label: "Average Ranking Lift",    color: "#F97316", bg: "#FFF7ED" },
  { icon: Search,     value: "10,000+", label: "Keywords Optimised",       color: "#2563EB", bg: "#EFF6FF" },
  { icon: Target,     value: "94%",     label: "Client Retention Rate",    color: "#16A34A", bg: "#F0FDF4" },
  { icon: BarChart3,  value: "450%",    label: "Avg Organic Traffic Growth",color: "#7C3AED", bg: "#F5F3FF" },
];

const COVERED_SERVICES = [
  {
    icon: Search,
    color: "#2563EB",
    bg: "#EFF6FF",
    title: "Keyword and Search Intent Mapping",
    desc: "We conduct advanced keyword mapping to align your content with user search intent by analysing search behaviour, intent, and competition. We identify high-value keywords and strategically distribute them across your pages, guaranteeing your content matches exactly what your audience is seeking.",
    featured: false,
  },
  {
    icon: FileText,
    color: "#16A34A",
    bg: "#F0FDF4",
    title: "Content Optimisation and Refinement",
    desc: "The team improves keyword content optimisation to create resources that reach more users while maintaining their initial value. We update existing content, add keywords, reorganise structure, remove low-quality content, and ensure every page delivers user value that meets search engine algorithm requirements.",
    featured: true,
  },
  {
    icon: LayoutGrid,
    color: "#F97316",
    bg: "#FFF7ED",
    title: "Heading Structure and Content Hierarchy",
    desc: "Our experts establish an organised heading structure through H1, H2, and H3 heading tags to create an effective content hierarchy. This improves scannability, allows search engines to recognise page structure, and enhances user experience by strategically placing keywords throughout your content.",
    featured: false,
  },
  {
    icon: Tag,
    color: "#7C3AED",
    bg: "#F5F3FF",
    title: "Meta Title and Description Optimization",
    desc: "The team creates meta tags that enable users to find your website through search results. We optimise meta titles and descriptions by adding relevant keywords while meeting character limits, creating accurate page descriptions, and using persuasive writing to draw users to the site.",
    featured: false,
  },
  {
    icon: Globe2,
    color: "#F97316",
    bg: "#FFF7ED",
    title: "URL Structure Optimisation",
    desc: "The team creates user-friendly URL paths which search engines can easily navigate. We build short URLs that include relevant keywords to help users identify page content while allowing search engines to navigate your website efficiently.",
    featured: false,
  },
  {
    icon: Link2,
    color: "#E53E3E",
    bg: "#FFF5F5",
    title: "Internal Linking Optimisation",
    desc: "The team uses internal links to share page authority throughout the website while guiding users toward relevant content. We establish link pathways with descriptive anchor text, connecting related pages to help search engines index content better and reduce bounce rates.",
    featured: false,
  },
  {
    icon: ImageIcon,
    color: "#0D9488",
    bg: "#F0FDFA",
    title: "Image and Media Optimization",
    desc: "The team optimises all visual elements using image ALT tags, compressed file sizes, and proper naming conventions. This increases page load speed, makes content accessible to screen readers, and enables extra ranking possibilities through image searches while maintaining visual quality.",
    featured: false,
  },
  {
    icon: Code2,
    color: "#2563EB",
    bg: "#EFF6FF",
    title: "Technical On-Page Elements",
    desc: "The team handles schema markup, canonical tags, mobile responsiveness, and page speed optimisation as essential technical components. These enhancements enable search engines to crawl your website while users experience fast, seamless interactions across all devices.",
    featured: false,
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    color: "#F97316",
    label: "Page Audit",
    icon: FileText,
    title: "Page Audit",
    desc: "The process begins with an extensive on-page SEO audit to identify both existing optimisation deficiencies and potential improvement areas. Our page-level SEO reviews all title tags, meta descriptions, URL structures, internal link patterns, and content quality assessments.",
    items: [
      "Full website crawl & error detection",
      "Core Web Vitals assessment",
      "Competitor benchmarking",
      "Prioritised action plan",
    ],
  },
  {
    num: "02",
    color: "#2563EB",
    label: "Keyword Mapping",
    icon: Tag,
    title: "Keyword Mapping",
    desc: "We research and map the highest-value keywords to every target page on your site. Each URL receives a primary keyword, supporting secondaries, and a defined search intent — creating a clear hierarchy that eliminates cannibalisation and drives focused relevance.",
    items: [
      "Primary & secondary keyword research",
      "Intent classification per page",
      "Competitor keyword gap analysis",
      "Keyword-to-URL mapping document",
    ],
  },
  {
    num: "03",
    color: "#16A34A",
    label: "Content Optimisation",
    icon: AlignLeft,
    title: "Content Optimisation",
    desc: "With the keyword map in place, we rewrite and enrich your on-page content to align perfectly with search intent and ranking signals. Every headline, paragraph, and call to action is shaped to satisfy both Google's algorithms and your target audience.",
    items: [
      "Titles, H1–H3 and body copy rewrites",
      "Natural keyword integration",
      "Readability and content depth scoring",
      "FAQ and structured content blocks",
    ],
  },
  {
    num: "04",
    color: "#7C3AED",
    label: "Metadata & Structure",
    icon: Code2,
    title: "Metadata & Structure",
    desc: "We optimise every metadata element — title tags, meta descriptions, Open Graph tags, and canonical URLs — to maximise click-through rates and prevent indexing conflicts. Schema markup is implemented to unlock rich results across Google's SERP features.",
    items: [
      "Title tag & meta description optimisation",
      "JSON-LD schema markup implementation",
      "Canonical and hreflang configuration",
      "Open Graph and Twitter Card tags",
    ],
  },
  {
    num: "05",
    color: "#E53E3E",
    label: "Media & Technical",
    icon: Gauge,
    title: "Media & Technical",
    desc: "Images, videos, and technical page elements are all reviewed and optimised for both speed and discoverability. We ensure every media asset has descriptive alt text, optimal compression, and lazy loading — while fixing internal link structures and URL patterns.",
    items: [
      "Image compression & alt text optimisation",
      "Lazy loading and WebP conversion",
      "Internal link audit and restructure",
      "URL slug and breadcrumb optimisation",
    ],
  },
  {
    num: "06",
    color: "#0D9488",
    label: "Performance Review",
    icon: BarChart3,
    title: "Performance Review",
    desc: "After implementation, we monitor every optimised page through Google Search Console, Analytics, and rank tracking tools. Monthly performance reports show exactly which pages improved, which keywords moved, and where we focus effort in the next cycle.",
    items: [
      "Ranking and CTR tracking post-launch",
      "Google Search Console insights review",
      "A/B testing title and meta variations",
      "Monthly reporting and strategy refinement",
    ],
  },
];

const WHY_CARDS = [
  {
    photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=460&fit=crop&q=80",
    title: "Full-Page Optimisation",
    desc: "We audit and optimise every on-page element — from titles and headers to content depth, internal links, and structured data — leaving nothing to chance.",
  },
  {
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=460&fit=crop&q=80",
    title: "Data-Backed Decisions",
    desc: "Every optimisation is guided by keyword research, competitor analysis, and real ranking data — not guesswork. We build strategies around what the data tells us.",
  },
  {
    photo: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&h=460&fit=crop&q=80",
    title: "Search Intent Alignment",
    desc: "We match your content to exactly what searchers are looking for — whether informational, commercial, or transactional — to improve engagement and conversions.",
  },
  {
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=460&fit=crop&q=80",
    title: "Transparent Monthly Reports",
    desc: "Receive clear, no-fluff monthly reports showing exactly which pages improved, which keywords moved, and what we're optimising next — full visibility always.",
  },
  {
    photo: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&h=460&fit=crop&q=80",
    title: "No Lock-In Contracts",
    desc: "We're confident our results will keep you. Our on-page SEO services operate on flexible agreements — stay because of the performance, not because of penalties.",
  },
  {
    photo: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=700&h=460&fit=crop&q=80",
    title: "Dedicated SEO Specialist",
    desc: "Every client gets a named senior SEO specialist who understands your industry, your goals, and your competitive landscape from day one.",
  },
];

const FAQS = [
  {
    q: "What is on-page SEO and why does it matter?",
    a: "On-page SEO refers to all optimisations made directly on your website — including title tags, meta descriptions, header structure, content quality, internal linking, and page speed. It matters because search engines use these signals to understand what your pages are about and how relevant they are to specific search queries. Strong on-page SEO is the foundation for any successful organic search strategy.",
  },
  {
    q: "How long does it take to see results from on-page SEO?",
    a: "Most clients begin seeing measurable ranking improvements within 4–12 weeks of implementing on-page optimisations, depending on domain authority, competition, and how frequently Google crawls the site. Pages with existing authority often see faster movement. We track progress from day one and provide monthly reporting to show clear progress.",
  },
  {
    q: "How is on-page SEO different from technical SEO?",
    a: "On-page SEO focuses on visible, content-level elements that influence relevance — titles, headers, body content, internal links, and schema. Technical SEO covers the underlying infrastructure — crawlability, site speed, indexation, and server configuration. Both are essential and complementary; our team handles both as part of a comprehensive strategy.",
  },
  {
    q: "What on-page SEO elements do you optimise?",
    a: "We optimise title tags, meta descriptions, H1–H6 header hierarchy, body content (keyword integration and depth), internal linking structure, image alt text and file names, URL slugs, Core Web Vitals, schema markup (JSON-LD), and canonical tags — essentially every element that influences how search engines read and rank your pages.",
  },
  {
    q: "Do you write new content or optimise existing pages?",
    a: "Both. For underperforming existing pages, we rewrite or enhance content to improve keyword relevance, search intent alignment, and content depth. For new pages, we create fully optimised content from the ground up based on keyword research and competitive analysis. We clearly outline the scope of work before starting.",
  },
  {
    q: "Will on-page SEO affect my website's user experience?",
    a: "Absolutely — in a positive way. On-page SEO improvements like faster page speed, clearer content structure, better headers, and improved readability all contribute to a better user experience. Google's ranking signals increasingly reflect real user behaviour, so what's good for users is almost always good for rankings.",
  },
];

export function OnPageSeoPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", countryCode: "+1", budget: "", service: "On-Page SEO", message: "" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop&q=85')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(5,13,40,0.92) 0%, rgba(5,13,40,0.78) 55%, rgba(5,13,40,0.4) 100%)" }} />

        <m.div
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-[180px] pointer-events-none"
          style={{ background: "#F97316", opacity: 0.1 }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-28 pb-32 md:pt-36 md:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div className="max-w-xl">
              <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}>
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{ background: "rgba(249,115,22,0.15)", color: "#FB923C", border: "1px solid rgba(249,115,22,0.35)" }}
                >
                  <Search className="w-3.5 h-3.5" /> ON-PAGE SEO SPECIALISTS
                </span>
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.55 }}
                className="font-display font-black leading-tight mb-5"
              >
                <span className="block text-white text-2xl md:text-3xl font-bold">On-Page SEO Services That</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl" style={{ color: "#F97316" }}>Improve Rankings</span>
                <span className="block text-white text-2xl md:text-3xl font-bold">and Conversion Performance</span>
              </m.h1>

              <m.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.45 }}
                className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-md"
              >
                We fine-tune every element of your web pages — from titles and headers to content, schema, and Core Web Vitals — so search engines understand and rank your site higher, driving more qualified organic traffic.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link href="/contact">
                  <m.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
                    style={{ background: "#F97316" }}
                  >
                    Get Free On-Page Audit <ArrowRight className="w-4 h-4" />
                  </m.button>
                </Link>
                <Link href="#process">
                  <m.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white border border-white/25 hover:bg-white/10 transition-colors"
                  >
                    See Our Process <ChevronRight className="w-4 h-4" />
                  </m.button>
                </Link>
              </m.div>
            </div>

            {/* Right — floating metric card */}
            <m.div
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden lg:block"
            >
              <div
                className="rounded-2xl p-6 max-w-sm ml-auto"
                style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Page Performance Uplift</p>
                {[
                  { label: "Homepage",       before: 34, after: 91, color: "#F97316" },
                  { label: "Service Page",   before: 27, after: 84, color: "#2563EB" },
                  { label: "Blog Article",   before: 18, after: 76, color: "#16A34A" },
                  { label: "Product Page",   before: 42, after: 95, color: "#7C3AED" },
                ].map(({ label, before, after, color }) => (
                  <div key={label} className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">{label}</span>
                      <span className="font-bold" style={{ color }}>↑ {after}th</span>
                    </div>
                    <div className="relative h-2 rounded-full bg-white/10">
                      <m.div
                        initial={{ width: `${before}%` }}
                        animate={{ width: `${after}%` }}
                        transition={{ delay: 0.8 + before / 100, duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: color }}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <p className="text-white text-sm font-bold">Avg. Rankings Jump</p>
                  <span className="text-2xl font-black" style={{ color: "#F97316" }}>+47 <span className="text-sm font-medium text-slate-400">positions</span></span>
                </div>
              </div>
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
            {STATS.map(({ icon: Icon, value, label, color, bg }) => (
              <m.div key={label} whileHover={{ y: -3 }} className="flex items-center gap-4 px-6 py-6 cursor-default">
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

      {/* ── WHAT IS ON-PAGE SEO ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "#FFF7ED", color: "#F97316", border: "1px solid #FED7AA" }}>
              UNDERSTAND THE FOUNDATION
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              What Is On-Page SEO and{" "}
              <span style={{ color: "#F97316" }}>How Does It Work?</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              On-page SEO is the practice of optimising individual web pages to rank higher and earn more relevant traffic. Unlike off-page SEO, it focuses entirely on elements you control directly on your website.
            </p>
          </m.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — photo */}
            <m.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="relative pb-10 pr-6"
            >
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=680&fit=crop&q=85"
                  alt="Team working on on-page SEO strategy"
                  className="w-full h-full object-cover"
                />
              </div>
              <m.div
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.35 }}
                className="absolute bottom-8 right-[-20px] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl"
                style={{ background: "#F97316", minWidth: "200px" }}
              >
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-[18px] h-[18px] text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">3.8× Avg. Ranking Lift</p>
                  <p className="text-orange-100 text-xs">After on-page optimisation</p>
                </div>
              </m.div>
              <m.div
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute bottom-[-20px] left-4 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl bg-white"
                style={{ minWidth: "210px", border: "1px solid #E2E8F0" }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#FFF7ED" }}>
                  <Target className="w-4 h-4" style={{ color: "#F97316" }} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm leading-tight">10,000+ Pages Optimised</p>
                  <p className="text-slate-400 text-xs">Across every industry vertical</p>
                </div>
              </m.div>
            </m.div>

            {/* Right — text */}
            <m.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="pt-6 lg:pt-0"
            >
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                On-page SEO covers every optimisation you can make within your web pages to help them rank — this includes your page titles, meta descriptions, header tags, body content, internal links, images, URL structure, schema markup, and page speed performance.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                When done correctly, on-page SEO tells search engines exactly what your page is about, who it&apos;s for, and why it deserves to rank at the top. It&apos;s the most direct signal you can send to Google, and it&apos;s entirely within your control. Our team audits every page, identifies gaps, and implements precise optimisations that produce measurable ranking improvements.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Improves search engine understanding of your content",
                  "Increases organic click-through rates (CTR)",
                  "Aligns pages with the right search intent",
                  "Boosts page speed and Core Web Vitals scores",
                  "Supports conversion rate optimisation goals",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#F97316" }} />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm"
                  style={{ border: "2px solid #F97316", color: "#F97316", background: "transparent" }}
                >
                  Talk to an On-Page SEO Expert
                </m.button>
              </Link>
            </m.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER — Ready to Outrank ── */}
      <section className="py-10 px-4 md:px-6">
        <div className="container mx-auto">
          <m.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="relative rounded-2xl overflow-hidden min-h-[220px] flex items-center"
            style={{ background: "#0a0f1e" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&h=400&fit=crop&q=85')",
                opacity: 0.3,
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.35) 0%, rgba(10,15,30,0.85) 50%, rgba(10,15,30,1) 100%)" }}
            />
            <div className="relative z-10 px-10 py-10 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-display font-black mb-3 leading-snug">
                <span className="text-white">Ready to Outrank Your </span>
                <span className="italic" style={{ color: "#FB923C" }}>Competition?</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
                Let our on-page SEO specialists audit your most important pages and deliver a clear, actionable optimisation roadmap.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg"
                  style={{ background: "#F97316" }}
                >
                  Get Free Page Audit <ArrowRight className="w-4 h-4" />
                </m.button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── WHAT'S COVERED ── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}>
              COMPREHENSIVE COVERAGE
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              What&apos;s Covered in Our{" "}
              <span style={{ color: "#F97316" }}>On-Page SEO</span> Services
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              From the first line of your title tag to your Core Web Vitals score, we optimise every on-page element that influences how search engines rank your site.
            </p>
          </m.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COVERED_SERVICES.map(({ icon: Icon, color, bg, title, desc, featured }, i) => {
              const isHovered = hoveredCard === i;
              return (
                <m.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.07, duration: 0.45 }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative rounded-2xl p-6 flex flex-col gap-4"
                  style={{
                    /* Gradient border trick: transparent border + gradient background clipped to border-box */
                    border: "2px solid transparent",
                    background: isHovered
                      ? `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${color}, ${color}55) border-box`
                      : `linear-gradient(white, white) padding-box, linear-gradient(135deg, #E2E8F0, #E2E8F0) border-box`,
                    boxShadow: isHovered
                      ? `0 12px 32px ${color}28`
                      : "0 1px 4px rgba(0,0,0,0.05)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                  }}
                >
                  {/* Decorative corner dots — appear on hover */}
                  {isHovered && (<>
                    <span className="absolute top-3 right-3 w-[7px] h-[7px] rounded-full"
                      style={{ background: color }} />
                    <span className="absolute top-3 right-[18px] w-[5px] h-[5px] rounded-full"
                      style={{ background: color, opacity: 0.45 }} />
                    <span className="absolute bottom-3 left-3 w-[5px] h-[5px] rounded-full"
                      style={{ background: color, opacity: 0.35 }} />
                  </>)}

                  {/* Icon — scales up on hover */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: bg,
                      transform: isHovered ? "scale(1.2)" : "scale(1)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <Icon className="w-[18px] h-[18px]" style={{ color }} />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm leading-snug" style={{ color }}>
                    {title}
                  </h3>

                  {/* Body */}
                  <p className="text-slate-500 text-xs leading-relaxed flex-1">
                    {desc}
                  </p>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY ON-PAGE SEO IS CRITICAL ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              Why On-Page SEO Is{" "}
              <span style={{ color: "#2563EB" }}>Critical</span>{" "}
              for Performance
            </h2>
          </m.div>

          {/* 3-column layout */}
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-center">

            {/* Left column — 3 items, text left / icon right */}
            <div className="flex flex-col gap-10">
              {[
                {
                  icon: Target,
                  color: "#2563EB",
                  bg: "#EFF6FF",
                  title: "Matches User Search Intent",
                  desc: "Perfectly aligning content with user intent optimisation ensures visitors find exactly what they are actually searching for.",
                },
                {
                  icon: Tag,
                  color: "#16A34A",
                  bg: "#F0FDF4",
                  title: "Strengthens Keyword Focus",
                  desc: "Strategic keyword optimisation establishes topic authority for each webpage through its dedicated keyword optimisation process.",
                },
                {
                  icon: BarChart3,
                  color: "#F97316",
                  bg: "#FFF7ED",
                  title: "Increases Search Clicks",
                  desc: "Generates more clicks on search engine results pages by using a systematic method of meta optimisation.",
                },
              ].map(({ icon: Icon, color, bg, title, desc }, i) => (
                <m.div
                  key={title}
                  initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  {/* Text — right aligned */}
                  <div className="flex-1 text-right">
                    <h4 className="font-bold text-sm mb-1.5" style={{ color }}>{title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                  {/* Icon circle */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                </m.div>
              ))}
            </div>

            {/* Centre — image */}
            <m.div
              initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="w-[340px] xl:w-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
            >
              <img
                src="/images/why-onpage-seo.png"
                alt="On-Page SEO visual — laptop with SEO performance graphics"
                className="w-full h-full object-cover"
              />
            </m.div>

            {/* Right column — 3 items, icon left / text right */}
            <div className="flex flex-col gap-10">
              {[
                {
                  icon: LayoutGrid,
                  color: "#9333EA",
                  bg: "#FAF5FF",
                  title: "Improves User Experience",
                  desc: "Exceptional page usability maintains visitor interest while decreasing bounce rates, which negatively impact website rankings.",
                },
                {
                  icon: TrendingUp,
                  color: "#CA8A04",
                  bg: "#FEFCE8",
                  title: "Supports Higher Conversions",
                  desc: "Creates better conversion rate optimisation, transforming organic visitors into actual business income.",
                },
                {
                  icon: ShieldCheck,
                  color: "#DC2626",
                  bg: "#FEF2F2",
                  title: "Prevents Keyword Overlap",
                  desc: "Keyword cannibalisation prevention creates distinct functions for each website page through focused keyword mapping.",
                },
              ].map(({ icon: Icon, color, bg, title, desc }, i) => (
                <m.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  {/* Icon circle */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  {/* Text */}
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-1.5" style={{ color }}>{title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </m.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── OUR METHODOLOGY ── */}
      <section id="process" className="py-24" style={{ background: "#F0F4FF" }}>
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">

          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "#FFF7ED", color: "#F97316", border: "1px solid #FED7AA" }}>
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Our 6-Step On-Page SEO{" "}
              <span style={{ color: "#F97316" }}>Optimisation Process</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-2xl mx-auto">
              At The Top SEO Services, we follow a streamlined on-page optimisation process to transform webpages into ranking powerhouses. With the help of step-by-step content refinement along with technical excellence, we improve each element systematically that search engines evaluate, guaranteeing your webpages gain maximum visibility and engagement.
            </p>
          </m.div>

          {/* Horizontal step navigator */}
          <div className="relative flex items-start justify-between mb-10 px-2">
            {/* Connecting line behind circles */}
            <div className="absolute top-5 left-0 right-0 h-px mx-8" style={{ background: "#CBD5E1", zIndex: 0 }} />
            {PROCESS_STEPS.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className="relative flex flex-col items-center gap-2 z-10"
                style={{ flex: 1 }}
              >
                {/* Circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-200 border-2"
                  style={{
                    background: activeStep === i ? "#F97316" : "#fff",
                    borderColor: activeStep === i ? "#F97316" : "#CBD5E1",
                    color: activeStep === i ? "#fff" : "#94A3B8",
                    boxShadow: activeStep === i ? "0 0 0 4px rgba(249,115,22,0.15)" : "none",
                  }}
                >
                  {step.num}
                </div>
                {/* Label */}
                <span
                  className="text-xs font-semibold text-center leading-tight hidden sm:block"
                  style={{ color: activeStep === i ? "#F97316" : "#94A3B8", maxWidth: 80 }}
                >
                  {step.label}
                </span>
              </button>
            ))}
          </div>

          {/* Step detail card */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
            >
              <div className="grid md:grid-cols-[1fr_1fr] gap-0">

                {/* Left — icon, badge, title, description */}
                <div className="p-8 flex flex-col gap-4">
                  {/* Icon box */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#FFF7ED" }}
                  >
                    {(() => { const Icon = PROCESS_STEPS[activeStep].icon; return <Icon className="w-6 h-6" style={{ color: "#F97316" }} />; })()}
                  </div>
                  {/* Step badge */}
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold w-fit"
                    style={{ background: "#FFF7ED", color: "#F97316", border: "1px solid #FED7AA" }}
                  >
                    Step {PROCESS_STEPS[activeStep].num} of 06
                  </span>
                  {/* Title */}
                  <h3 className="text-2xl font-display font-black text-slate-900 leading-tight">
                    {PROCESS_STEPS[activeStep].title}
                  </h3>
                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {PROCESS_STEPS[activeStep].desc}
                  </p>
                </div>

                {/* Right — checklist */}
                <div className="p-8 flex flex-col gap-3 justify-center">
                  {PROCESS_STEPS[activeStep].items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl border"
                      style={{ borderColor: "#E2E8F0", background: "#fff" }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "#FFF7ED" }}
                      >
                        <CheckCircle2 className="w-4 h-4" style={{ color: "#F97316" }} />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom bar — progress + pagination */}
              <div className="border-t border-slate-100 px-8 py-4 flex items-center gap-4">
                {/* Progress bar */}
                <div className="flex-1 h-1.5 rounded-full" style={{ background: "#F1F5F9" }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-400"
                    style={{
                      background: "#F97316",
                      width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%`,
                    }}
                  />
                </div>
                {/* Counter + arrows */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-slate-500 text-sm font-medium">
                    {activeStep + 1} / {PROCESS_STEPS.length}
                  </span>
                  <button
                    onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                    disabled={activeStep === 0}
                    className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-150 disabled:opacity-30"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 text-slate-500" />
                  </button>
                  <button
                    onClick={() => setActiveStep((s) => Math.min(PROCESS_STEPS.length - 1, s + 1))}
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                    className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-150 disabled:opacity-30"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </m.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── WHY BUSINESSES CHOOSE US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* ── Top row: text left + 2 feature cards right ── */}
          <div className="grid lg:grid-cols-[2fr_1.4fr_1.4fr] gap-6 mb-6 items-stretch">

            {/* Text block */}
            <m.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex flex-col justify-center py-4"
            >
              <span
                className="inline-block w-fit px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ background: "#fff", color: "#F97316", border: "1.5px solid #FED7AA" }}
              >
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
                Why Businesses Choose Our{" "}
                <span style={{ color: "#F97316" }}>On-Page SEO Expertise</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Our expert on-page SEO services deliver measurable results through strategic optimisation that search engines always reward. We use technical excellence along with our content optimisation methods to create visibility, which generates organic results and transforms visitors into loyal customers who drive sustainable business expansion.
              </p>
            </m.div>

            {/* Top card 1 — Data-Driven Keyword Implementation */}
            {[
              {
                icon: BarChart3,
                color: "#2563EB",
                bg: "#EFF6FF",
                title: "Data-Driven Keyword Implementation",
                desc: "Our work base operates on analysis, which creates our findings, while we do not use any assumptions. The SEO team employs its advanced research tools to discover high-converting keywords, which they insert into titles, headings, meta descriptions, and content to maximise search engine visibility.",
              },
              {
                icon: Target,
                color: "#F97316",
                bg: "#FFF7ED",
                title: "Conversion-Focused Content Strategy",
                desc: "The value of poorly written content disappears when it fails to generate conversions. Our team develops engaging content that contains relevant keywords that users will find intriguing and that search algorithms will process for their content needs.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
                whileHover={{ y: -4, boxShadow: `0 12px 32px ${color}28` }}
                className="rounded-2xl p-6 flex flex-col gap-4 border border-slate-100 cursor-default"
                style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="font-bold text-sm leading-snug" style={{ color }}>{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
              </m.div>
            ))}
          </div>

          {/* ── Bottom row: 4 cards ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Settings2,
                color: "#16A34A",
                bg: "#F0FDF4",
                title: "Technical Excellence That Search Engines Love",
                desc: "Our activities improve the entire technical infrastructure of our organisation, establishing fast page loading times and mobile-friendly website design standards. The content optimisation procedure improves rankings by generating clean code, implementing correct schema markup, and designing an accessible site structure.",
              },
              {
                icon: Globe2,
                color: "#7C3AED",
                bg: "#F5F3FF",
                title: "Comprehensive Competitor Analysis",
                desc: "We build our competitive system based on the successful elements of your competitors' operations. Our on-page SEO expertise includes analysing top-ranking pages in your niche to uncover optimisation opportunities you're missing.",
              },
              {
                icon: FileText,
                color: "#CA8A04",
                bg: "#FEFCE8",
                title: "Transparent Reporting and Measurable ROI",
                desc: "We monitor and document every optimisation measure we execute. Our detailed monthly analytics will show you how our on-page SEO services enhance your rankings and boost organic traffic to provide genuine business benefits.",
              },
              {
                icon: ShieldCheck,
                color: "#DC2626",
                bg: "#FEF2F2",
                title: "Future-Proof Optimisation Strategies",
                desc: "Search algorithms evolve constantly — our strategies evolve faster. Our Google algorithm detection systems maintain protection for our content optimisation methods, which also safeguard your website's rankings against future updates.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ y: -4, boxShadow: `0 12px 32px ${color}28` }}
                className="rounded-2xl p-6 flex flex-col gap-4 border border-slate-100 cursor-default"
                style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="font-bold text-sm leading-snug" style={{ color }}>{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12 max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}>
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              Frequently Asked{" "}
              <span style={{ color: "#F97316" }}>Questions</span>
            </h2>
          </m.div>

          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {[FAQS.filter((_, i) => i % 2 === 0), FAQS.filter((_, i) => i % 2 === 1)].map((col, colIdx) => (
              <div key={colIdx} className="flex-1 w-full flex flex-col gap-4">
                {col.map((faq, rowIdx) => {
                  const i = rowIdx * 2 + colIdx;
                  return (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: colIdx * 0.07, duration: 0.4 }}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                        {openFaq === i
                          ? <Minus className="w-4 h-4 text-orange-400 flex-shrink-0" />
                          : <Plus className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        }
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                              {faq.a}
                            </p>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LET'S GET STARTED ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">

            {/* Left — form */}
            <m.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-8">
                Let&apos;s <span style={{ color: "#2563EB" }}>Get Started</span>
              </h2>

              <form
                onSubmit={(e) => { e.preventDefault(); window.location.href = "/contact"; }}
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <input
                    type="text" required placeholder="Your Name*"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full py-3 text-sm text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none"
                    style={{ borderBottom: "1px solid #E2E8F0" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email" required placeholder="Business Email*"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full py-3 text-sm text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none"
                    style={{ borderBottom: "1px solid #E2E8F0" }}
                  />
                </div>

                {/* Phone with country code */}
                <div
                  className="flex items-center rounded-lg px-3 gap-2"
                  style={{ border: "1px solid #E2E8F0" }}
                >
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="py-3 text-sm text-slate-600 bg-transparent focus:outline-none pr-1 border-r border-slate-200"
                  >
                    <option value="+1">us +1</option>
                    <option value="+44">uk +44</option>
                    <option value="+61">au +61</option>
                    <option value="+91">in +91</option>
                    <option value="+971">ae +971</option>
                  </select>
                  <input
                    type="tel" placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 py-3 text-sm text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none pl-2"
                  />
                </div>

                {/* Budget */}
                <div>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full py-3 text-sm bg-transparent focus:outline-none"
                    style={{ borderBottom: "1px solid #E2E8F0", color: formData.budget ? "#0F172A" : "#94A3B8" }}
                  >
                    <option value="" disabled>Select Budget</option>
                    <option value="<1k">Under $1,000/mo</option>
                    <option value="1k-3k">$1,000 – $3,000/mo</option>
                    <option value="3k-5k">$3,000 – $5,000/mo</option>
                    <option value="5k+">$5,000+/mo</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={4} placeholder="Tell us about your project*"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full py-3 text-sm text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none resize-none"
                    style={{ borderBottom: "1px solid #E2E8F0" }}
                  />
                </div>

                {/* Submit */}
                <div>
                  <m.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-8 py-3 rounded-full font-bold text-white text-sm shadow-md"
                    style={{ background: "#2563EB" }}
                  >
                    Send Message
                  </m.button>
                </div>
              </form>
            </m.div>

            {/* Right — red contact card */}
            <m.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)" }}
              >
                {/* Subtle decorative circle */}
                <div
                  className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
                  style={{ background: "#fff" }}
                />

                <h3 className="text-white font-display font-black text-2xl leading-tight mb-1">
                  Hate Filling out Forms?
                </h3>
                <p className="text-white text-sm mb-8 underline underline-offset-2 opacity-90">
                  Email us.
                </p>

                <div className="space-y-5">
                  {[
                    { label: "Request a Quote",                   email: "business@topseoservices.co" },
                    { label: "Partners Enquires",                 email: "partners@topseoservices.co" },
                    { label: "Reference Checks /Misc. HR Enquires", email: "hr@topseoservices.co" },
                    { label: "Other Enquires",                    email: "info@topseoservices.co" },
                  ].map(({ label, email }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm leading-snug">{label}</p>
                        <a
                          href={`mailto:${email}`}
                          className="text-white text-xs opacity-80 hover:opacity-100 transition-opacity"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </section>

    </div>
  );
}
