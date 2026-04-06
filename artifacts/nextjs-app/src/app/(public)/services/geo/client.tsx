"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  Search, TrendingUp, Target, FileText,
  ArrowRight, CheckCircle2, BarChart3,
  Zap, Star, ChevronRight, ChevronDown,
  Globe, Shield, Layers, Bot, Lightbulb,
  Users, Award, Clock, Rocket, Eye,
  Brain, Cpu, Sparkles, MessageSquare,
  RefreshCw, Link2, PieChart, BadgeCheck,
  Megaphone, ScanSearch, Database, Rss,
  MonitorCheck, Settings2, Lock, Gauge,
  Phone, Mail, Send,
  Flame, DollarSign, MapPin, ShieldCheck,
  ShoppingCart, Heart, Briefcase, Scale, Home, Landmark, MonitorSmartphone,
  BookOpen,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const ACCENT = "#4F46E5";          // indigo
const ACCENT_LIGHT = "#EEF2FF";
const GREEN = "#16A34A";

const HERO_STATS = [
  { icon: Globe,      value: "6,000+",  label: "AI Mentions Secured",   color: GREEN },
  { icon: TrendingUp, value: "420%",    label: "Avg Visibility Growth", color: "#2563EB" },
  { icon: Cpu,        value: "3,200+",  label: "Prompts Optimized",     color: "#7C3AED" },
  { icon: Users,      value: "97%",     label: "Client Retention",      color: "#0891B2" },
];

const SERVICES = [
  { icon: Bot,         color: ACCENT,    bg: ACCENT_LIGHT, title: "AI Citation Building",          desc: "We engineer your content so that ChatGPT, Perplexity, Grok, and Google AI Overviews cite your brand as the trusted authority in your niche." },
  { icon: ScanSearch,  color: "#2563EB", bg: "#EFF6FF",    title: "Prompt Optimisation",            desc: "Map the exact prompts your target audience uses in AI tools and ensure your pages, FAQs, and structured data surface as the recommended answer." },
  { icon: Database,    color: "#F97316", bg: "#FFF7ED",    title: "Knowledge Graph Optimisation",   desc: "Enrich your brand entity in Google's Knowledge Graph with verified data, relationships, and schema markup to boost AI confidence scores." },
  { icon: Layers,      color: GREEN,     bg: "#F0FDF4",    title: "Generative Content Strategy",    desc: "Produce authoritative, structured content that AI engines absorb, cite, and recommend — built around topic clusters and semantic depth." },
  { icon: Sparkles,    color: "#DB2777", bg: "#FDF2F8",    title: "LLM Visibility Audits",          desc: "We test your brand's presence across 10+ leading AI tools monthly, identify gaps, and implement fixes to increase citation frequency." },
  { icon: Shield,      color: "#0891B2", bg: "#ECFEFF",    title: "Reputation & Sentiment Control", desc: "Monitor what AI says about your brand, suppress negative LLM narratives, and amplify positive mentions across AI-generated content." },
  { icon: Rss,         color: "#9333EA", bg: "#F3E8FF",    title: "AI PR & Digital Signals",        desc: "Earn placements in publications that AI engines heavily index — building the external authority signals LLMs use to rank trusted sources." },
  { icon: MonitorCheck,color: "#059669", bg: "#ECFDF5",    title: "Performance Tracking & Reporting",desc: "Monthly AI visibility reports tracking citation counts, prompt rankings, brand mentions in LLM outputs, and attributed lead generation." },
];

const WHY_ITEMS = [
  { icon: Zap,         color: "#F97316", bg: "#FFF7ED", title: "Pioneer GEO Agency",       desc: "One of the first agencies globally to develop a dedicated Generative Engine Optimisation practice — 3 years ahead of the curve." },
  { icon: Target,      color: ACCENT,    bg: ACCENT_LIGHT, title: "Multi-LLM Coverage",   desc: "We optimise across ChatGPT, Perplexity, Grok, Google AI Overviews, Claude, Gemini, and emerging AI platforms simultaneously." },
  { icon: RefreshCw,   color: "#7C3AED", bg: "#F5F3FF", title: "Continuous AI Monitoring", desc: "Our proprietary tools query AI engines daily to track your brand mentions, citation frequency, and sentiment in real time." },
  { icon: Lock,        color: GREEN,     bg: "#F0FDF4", title: "White-Hat Only",           desc: "Every GEO tactic aligns with AI platform guidelines and Google quality standards — no black-hat prompt injection or manipulation." },
  { icon: Brain,       color: "#DB2777", bg: "#FDF2F8", title: "Deep LLM Expertise",      desc: "Our team includes AI researchers, NLP specialists, and former LLM engineers who understand how generative models select citations." },
  { icon: BarChart3,   color: "#0891B2", bg: "#ECFEFF", title: "Proven Revenue Impact",   desc: "Clients using GEO see 420% average growth in AI-driven traffic and measurable pipeline value attributed to LLM citation wins." },
];

const PROCESS_STEPS = [
  { title: "AI Presence Audit",        badge: "Step 01 of 06", icon: ScanSearch,    color: "#7C3AED", items: ["Query your brand across 10+ AI engines", "Map citation gaps vs competitors", "Identify misinformation or missing entity data", "Analyse Knowledge Graph coverage", "Score prompt-answer alignment for target queries", "Baseline AI visibility report"] },
  { title: "GEO Strategy Blueprint",   badge: "Step 02 of 06", icon: Lightbulb,     color: ACCENT,    items: ["Target prompt cluster selection", "Content gap analysis for AI coverage", "Entity relationship mapping", "Schema & structured data roadmap", "LLM authority-building plan", "12-month GEO content calendar"] },
  { title: "Content & Entity Build",   badge: "Step 03 of 06", icon: FileText,      color: "#F97316", items: ["Long-form authority content production", "FAQ and Q&A page creation", "Structured data implementation at scale", "Brand entity enrichment & verification", "Knowledge Graph submission and monitoring", "Wikipedia & Wikidata optimisation"] },
  { title: "AI PR & Link Signals",     badge: "Step 04 of 06", icon: Megaphone,     color: GREEN,     items: ["Placements in AI-indexed publications", "HARO and expert citation campaigns", "Digital PR for LLM authority signals", "Brand mention monitoring & reclamation", "Podcast and video citation strategy", "Thought leadership ghostwriting"] },
  { title: "LLM Monitoring & Testing", badge: "Step 05 of 06", icon: MonitorCheck,  color: "#DB2777", items: ["Daily AI query monitoring across platforms", "Citation frequency tracking dashboard", "Prompt-response testing & optimisation", "Competitor citation analysis", "Sentiment monitoring in AI outputs", "A/B testing content formats for LLM citation"] },
  { title: "Report, Refine & Scale",   badge: "Step 06 of 06", icon: TrendingUp,    color: "#0891B2", items: ["Monthly AI visibility KPI reports", "Citation growth trend analysis", "Revenue attribution from AI-driven traffic", "Quarterly strategy refinement sessions", "Expansion to new AI platforms", "Scalable content velocity planning"] },
];

const PLATFORMS = [
  { name: "ChatGPT",       color: "#10A37F" },
  { name: "Perplexity",    color: "#20B2AA" },
  { name: "Google AI",     color: "#4285F4" },
  { name: "Grok",          color: "#1D9BF0" },
  { name: "Gemini",        color: "#9333EA" },
  { name: "Claude",        color: "#D97706" },
  { name: "Copilot",       color: "#0078D4" },
  { name: "Meta AI",       color: "#0866FF" },
];

const FAQS = [
  { q: "What are GEO services and how do they work?",                              a: "GEO (Generative Engine Optimisation) services optimise your brand's content and online presence so that AI-powered engines like ChatGPT, Perplexity, and Google AI Overviews cite your business in generated answers. We build entity authority, structured content, and citation signals that make your brand the default recommendation." },
  { q: "How can GEO services help my business grow locally?",                      a: "GEO targets local intent queries inside AI engines — when users ask 'best plumber in Manchester' or 'top accountant near me', our work ensures your business surfaces as the cited answer across every major AI platform, driving high-intent local leads directly to you." },
  { q: "Why is GEO targeting important for local SEO?",                            a: "AI search is rapidly replacing traditional local pack results. If your brand isn't optimised for generative engines, competitors who are will capture the recommendations and foot traffic. GEO future-proofs your local visibility as search behaviour shifts." },
  { q: "How does GEO optimization improve customer engagement?",                   a: "When AI engines recommend your brand by name, users arrive with intent and trust already established. This dramatically shortens the consideration phase, increases conversion rates, and produces higher lifetime value customers compared with cold organic clicks." },
  { q: "What are the benefits of using GEO services for marketing?",               a: "GEO delivers citation authority, zero-click brand exposure, trusted recommendations in AI answers, reduced cost-per-acquisition over time, and compounding visibility across every major AI platform — all without relying on paid ads or ranking algorithm volatility." },
  { q: "How can I track the performance of GEO services?",                         a: "We provide monthly reports covering citation frequency across ChatGPT, Perplexity, Gemini, and others; AI-driven referral traffic; share-of-voice versus competitors; and revenue attribution tied directly to GEO activities." },
  { q: "What is the difference between geo-targeting and traditional marketing?",   a: "Traditional marketing targets broad audiences with push messaging. Geo-targeting within GEO delivers your brand as a trusted AI recommendation at the exact moment a user is seeking a solution — combining precision location signals with AI-native authority to produce intent-matched outcomes." },
  { q: "How does GEO data help businesses reach the right audience?",              a: "GEO data maps the exact prompts and questions your target customers ask AI engines, identifies which demographics and locations trigger those queries, and aligns your content strategy to intercept those intent signals before a competitor does." },
  { q: "How do GEO services increase conversions and sales?",                      a: "AI citations pre-qualify buyers — a user who acts on an AI recommendation already trusts the source. Our clients see conversion rates 2–4× higher from AI-referred traffic versus standard organic, because the AI's endorsement shortens the sales cycle." },
  { q: "What kind of businesses can benefit from GEO services?",                   a: "Any brand in a research-driven category benefits — including e-commerce, SaaS, healthcare, legal, financial services, real estate, and B2B. If your customers research before buying, they're using AI engines, and GEO ensures your brand is what those engines recommend." },
  { q: "Can GEO services be used for mobile marketing campaigns?",                 a: "Absolutely. AI assistants on mobile — Siri, Google Assistant, and standalone apps like ChatGPT — rely on GEO-optimised content to deliver answers. Our strategies are mobile-first, ensuring your brand is cited across voice and text-based AI search on every device." },
  { q: "How do GEO services enhance customer retention?",                          a: "When your brand becomes synonymous with authoritative answers in AI engines, repeat customers continue to see your name reinforced across every touchpoint. This builds brand recall, trust, and long-term loyalty — extending customer lifetime value well beyond the initial conversion." },
];

const WHY_CHOOSE = [
  { icon: Bot,       color: ACCENT,    bg: ACCENT_LIGHT, title: "Dedicated GEO Practice",     desc: "Not a bolt-on service — GEO is a standalone practice within our agency, staffed by NLP engineers, AI researchers, and content strategists." },
  { icon: Users,     color: "#2563EB", bg: "#EFF6FF",    title: "80+ GEO Specialists",         desc: "Our team blends AI expertise with marketing strategy. Every recommendation is reviewed by human specialists before implementation." },
  { icon: Award,     color: "#F97316", bg: "#FFF7ED",    title: "Proven Citation Results",     desc: "We've secured over 6,000 AI citations for clients across ChatGPT, Perplexity, and Google AI Overviews — with documented traffic and revenue impact." },
  { icon: Clock,     color: GREEN,     bg: "#F0FDF4",    title: "Real-Time AI Monitoring",     desc: "Proprietary tooling queries AI engines daily so you always know how and where your brand is being cited — and where competitors are beating you." },
  { icon: Rocket,    color: "#DB2777", bg: "#FDF2F8",    title: "Fast Visibility Gains",       desc: "Structured content and entity optimisation deliver early citation wins in 60–90 days, with compounding growth across platforms thereafter." },
  { icon: Shield,    color: "#0891B2", bg: "#ECFEFF",    title: "Full Transparency",           desc: "Monthly reports show every AI mention, citation source, traffic attribution, and revenue impact — no vanity metrics, no guesswork." },
];

/* ─────────────────────────────────────────────
   ANIMATED NUMBER
───────────────────────────────────────────── */
function AnimatedNumber({ value }: { value: string }) {
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 600;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * numericPart));
      if (progress < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [numericPart]);

  return <>{display}{suffix}</>;
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export function GeoPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="font-sans antialiased overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[82vh] flex flex-col justify-end" style={{ background: "#0B0F1A" }}>
        {/* Background photo */}
        <div className="absolute inset-0 overflow-hidden">
          <img src="/ai-seo-hero.jpg" alt="GEO hero" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,15,26,0.95) 45%, rgba(11,15,26,0.5) 100%)" }} />
        </div>

        <div className="relative container mx-auto px-6 md:px-12 pt-32 pb-0 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services/seo" className="hover:text-white transition-colors">SEO</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">GEO Services</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-7"
            style={{ background: GREEN }}>
            <BadgeCheck className="w-3.5 h-3.5" />
            #1 GEO SERVICES PROVIDER
          </div>

          {/* Headline */}
          <h1 className="font-black leading-tight mb-4 max-w-3xl"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)" }}>
            <span style={{ color: ACCENT }}>Elevate Your Brand</span>
            <br />
            <span className="text-white">with Generative Engine<br />Optimization Services</span>
          </h1>

          {/* Body */}
          <p className="text-slate-300 max-w-xl leading-relaxed mb-10" style={{ fontSize: "1rem" }}>
            Maximize your brand&apos;s presence and online credibility in AI search results, such as{" "}
            <span className="text-white font-medium">Grok, ChatGPT, and Perplexity</span>, with our
            results-focused{" "}
            <span className="font-bold text-white">generative engine optimization services</span>. Our
            solutions aim to drive extensive growth, generate leads, and promote awareness.
          </p>

          {/* CTA */}
          <div className="mb-0 pb-14">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: ACCENT, boxShadow: `0 4px 20px rgba(79,70,229,0.5)` }}>
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative w-full" style={{ background: "rgba(255,255,255,0.97)", borderTop: "1px solid #E2E8F0" }}>
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
            {HERO_STATS.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="flex items-center gap-4 py-6 px-6 first:pl-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: color + "18" }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 leading-none">
                    <AnimatedNumber value={value} />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT DOES GEO MEAN ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Centered heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              What does GEO Services{" "}
              <span style={{ color: ACCENT }}>Mean?</span>
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* LEFT — stacked images with floating pills */}
            <div className="relative flex items-end justify-center" style={{ minHeight: 380 }}>
              {/* Back image — tilted left */}
              <div
                className="absolute rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  width: "62%",
                  top: 0,
                  left: 0,
                  transform: "rotate(-3deg)",
                  zIndex: 1,
                }}>
                <img
                  src="/cta-meeting-analytics.png"
                  alt="GEO team at monitors"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Front image — tilted right, overlapping */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  width: "62%",
                  marginLeft: "auto",
                  marginTop: 60,
                  transform: "rotate(2deg)",
                  zIndex: 2,
                }}>
                <img
                  src="/cta-laptop-analytics.png"
                  alt="GEO analytics dashboard"
                  className="w-full h-auto object-cover"
                />
                {/* Green pill on laptop image */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "#16A34A", zIndex: 3 }}>
                  <BarChart3 className="w-3.5 h-3.5 text-white flex-shrink-0" />
                  <div>
                    <div className="text-white text-[11px] font-bold leading-tight">4.5× AI Visibility</div>
                    <div className="text-green-100 text-[9px] leading-tight">Average GEO performance lift</div>
                  </div>
                </div>
              </div>

              {/* White stat pill — bottom-left */}
              <div
                className="absolute flex items-center gap-2.5 bg-white rounded-2xl shadow-lg px-4 py-3"
                style={{ bottom: -10, left: 10, zIndex: 4, border: "1px solid #F1F5F9" }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: ACCENT_LIGHT }}>
                  <Globe className="w-4 h-4" style={{ color: ACCENT }} />
                </div>
                <div>
                  <div className="text-slate-900 text-[13px] font-black leading-tight">6,000+ AI Mentions</div>
                  <div className="text-slate-400 text-[10px] leading-tight">Secured across AI platforms</div>
                </div>
              </div>
            </div>

            {/* RIGHT — text + CTA */}
            <div>
              <p className="text-slate-600 leading-relaxed mb-5" style={{ fontSize: "0.975rem" }}>
                Generative engine optimization generally refers to the process of customizing digital
                content to appear in AI-driven search results. Also, it comprised traditional search as
                well as responses from generative answer engines and voice assistants.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8" style={{ fontSize: "0.975rem" }}>
                Our team aims to assist your business in establishing its online presence by identifying
                suitable opportunities on Google AI Overview and within answer engines and voice
                assistants, including{" "}
                <span className="font-semibold text-slate-800">ChatGPT, Gemini, Siri, and Alexa</span>.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                Let&apos;s Talk <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ── HIGH-PERFORMANCE GEO SERVICES ── */}
      <section className="py-20" style={{ background: "#F0F7FF" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Our High-Performance GEO Services for{" "}
              <span style={{ color: ACCENT }}>Optimal AI Visibility</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              With our top generative engine optimization services, you can gain visibility on leading AI
              engines like Gemini, Perplexity, and ChatGPT. We position your brand where your customers
              are actively searching through conversational AI practices.
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-5">
            {[
              {
                icon: Target,
                color: ACCENT,
                title: "Diverse Targeting Strategy",
                items: [
                  { title: "Prompt Cluster Mapping",    desc: "The audience needs to be tested on their AI engine usage because this information will help you create content that matches their actual search patterns." },
                  { title: "Persona-Based Strategy",    desc: "You should create specific content for each customer persona because they have different AI search patterns and experience unique challenges." },
                  { title: "Platform Behavior Analysis",desc: "You need to learn how ChatGPT, Claude, and Gemini work to locate information that will help you determine the best way to show your brand." },
                ],
              },
              {
                icon: ScanSearch,
                color: "#2563EB",
                title: "GEO Visibility Audit",
                items: [
                  { title: "AI Mention Scanning",    desc: "You can find out how AI engines use your brand name by checking their responses to relevant questions." },
                  { title: "Competitor Benchmarking",desc: "You can check the AI response results to see where your competitors rank while finding ways to achieve better results." },
                  { title: "Prompt Gap Analysis",    desc: "You can discover valuable queries that AI systems presently lack good content sources for, because this shows you how to become the top provider." },
                ],
              },
              {
                icon: Rss,
                color: "#DC2626",
                title: "Content Creation for GEO",
                items: [
                  { title: "LLM-Friendly Content",    desc: "Develop content that large language models can best process with its straightforward facts, authoritative tone, and citation-ready structure." },
                  { title: "Structured for Selection", desc: "The AI engines need information to be presented in lists, definitions, and short answers that they can easily extract and distribute." },
                  { title: "Conversational Flow",      desc: "Develop your writing to follow the natural question-answer style that users apply when they interact with AI assistants." },
                ],
              },
              {
                icon: Zap,
                color: "#D97706",
                title: "Voice GEO Optimization",
                items: [
                  { title: "Voice Query Analysis",         desc: "You should design your system to handle both spoken searches and voice assistant interactions, which use natural conversational questions." },
                  { title: "Mobile & Smart Device Tuning", desc: "Your content should work properly on Alexa, Siri, Google Assistant, and all other voice-enabled platforms." },
                  { title: "Natural Response Structuring", desc: "You should develop your answers as natural-sounding machines that AI systems can vocalize." },
                ],
              },
              {
                icon: BarChart3,
                color: "#0D9488",
                title: "GEO Results Tracking & Analytics",
                items: [
                  { title: "Prompt Match Tracking",     desc: "You should observe which customer inquiries cause your brand to be mentioned in AI-generated answers." },
                  { title: "Citation & Mention Analysis",desc: "The system monitors how often citations occur and assesses their context value and sentiment across multiple AI systems." },
                  { title: "Performance Optimization",  desc: "The GEO strategy development process requires continuous improvement based on current market information and actual conversion results." },
                ],
              },
            ].map(({ icon: Icon, color, title, items }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="flex items-center gap-3 px-8 py-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: color + "18" }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <h3 className="font-bold text-base" style={{ color }}>{title}</h3>
                </div>
                {/* Divider */}
                <div className="h-px bg-slate-100 mx-8" />
                {/* 3-col grid */}
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 px-0">
                  {items.map(({ title: itemTitle, desc }) => (
                    <div key={itemTitle} className="px-8 py-6">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{itemTitle}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK IMAGE CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl overflow-hidden" style={{ background: "#0B0F1A", minHeight: 220 }}>
            {/* Left image area */}
            <div className="absolute inset-y-0 left-0 w-2/5 overflow-hidden">
              <img
                src="/local-cta-analytics.png"
                alt="AI analytics dashboard"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, #0B0F1A)" }} />
            </div>
            {/* Right text area */}
            <div className="relative ml-auto w-full md:w-3/5 px-10 md:pl-16 md:pr-14 py-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">
                <span className="text-white">Not Appearing in </span>
                <span style={{ background: "linear-gradient(90deg, #34D399, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  AI-Generated Results?
                </span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-7 max-w-md">
                Our GEO experts optimize your content so AI engines like ChatGPT, Gemini, and Perplexity
                prioritize your brand as the go-to recommendation.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: "#10B981" }}>
                  Get Your Free GEO Audit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW GEO SERVICES HELP BUSINESSES GROW ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              How GEO Services Help{" "}
              <span style={{ color: ACCENT }}>Businesses to Grow</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Your agency uses geo services for small businesses to connect with local customers who are
              actively seeking your products. The geographic optimization of your digital presence enables
              you to acquire high-intent visitors who will become customers while establishing community
              ties that support your business&apos;s long-term growth.
            </p>
          </div>

          {/* 7-card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", icon: Eye,          color: "#2563EB", title: "Maximize Visibility",            desc: "Local search results enable businesses to achieve market dominance because customers search for their products during peak times. Through GEO optimization, your business achieves maximum visibility because your brand appears on map lists and local result sections and in mobile search results throughout your entire service area." },
              { num: "02", icon: MapPin,        color: "#16A34A", title: "Localized Search Enhancement",  desc: "Content should be customized through regional keyword selection and listing creation to match local search patterns and regional dialects. The targeting system enables business owners to reach customers who search for particular locations, resulting in qualified leads who want to visit nearby companies." },
              { num: "03", icon: DollarSign,    color: "#DC2626", title: "Boost Revenue",                 desc: "Business owners can convert their local online search audience into revenue through effective geographic advertising. Generative engine optimization services focus on valuable markets that require optimization for near me searches while spending less on ads that do not bring results." },
              { num: "04", icon: Flame,         color: "#D97706", title: "Strengthen Brand Presence",     desc: "Business owners establish local market authority through their consistent NAP citation activities, which they use to build positive reviews and participate in community activities. Geographic branding creates strong brand recognition, making your business the preferred option." },
              { num: "05", icon: BarChart3,     color: ACCENT,    title: "Unlock Data Insights",          desc: "The location-based analytics system provides strong capabilities for analyzing customer patterns that show competitor activities and market entry points. Geographic performance metric comprehension enables you to make data-based decisions while your business resource distribution becomes more effective." },
              { num: "06", icon: Globe,         color: "#0D9488", title: "Expand Geographic Reach",       desc: "The agency should enter new markets through strategic scaling while preserving its strong local presence. The multi-location management and franchise optimization of GEO services help your business grow while maintaining personal connections." },
              { num: "07", icon: ShieldCheck,   color: "#DC2626", title: "Build Customer Trust",          desc: "Local businesses achieve legitimacy through their visible street presence, which enables potential customers to reach them easily. Customers select your business because of verified business listings that provide precise location details alongside your active community presence." },
            ].map(({ num, icon: Icon, color, title, desc }) => {
              const isHovered = hoveredCard === num;
              return (
                <div
                  key={num}
                  onMouseEnter={() => setHoveredCard(num)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="rounded-2xl border shadow-sm p-7 flex flex-col cursor-default"
                  style={{
                    background: isHovered ? color : "white",
                    borderColor: isHovered ? color : "#F1F5F9",
                    boxShadow: isHovered ? `0 8px 32px ${color}44` : undefined,
                    transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  }}>
                  {/* Top row: icon + number */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: isHovered ? "rgba(255,255,255,0.2)" : color + "15",
                        transition: "background 0.25s ease",
                      }}>
                      <Icon
                        className="w-5 h-5"
                        style={{ color: isHovered ? "white" : color, transition: "color 0.25s ease" }} />
                    </div>
                    <span
                      className="text-4xl font-black leading-none select-none"
                      style={{
                        color: isHovered ? "rgba(255,255,255,0.2)" : "#F1F5F9",
                        transition: "color 0.25s ease",
                      }}>
                      {num}
                    </span>
                  </div>
                  <h3
                    className="font-black text-base mb-3"
                    style={{ color: isHovered ? "white" : "#0F172A", transition: "color 0.25s ease" }}>
                    {title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed flex-1"
                    style={{ color: isHovered ? "rgba(255,255,255,0.8)" : "#64748B", transition: "color 0.25s ease" }}>
                    {desc}
                  </p>
                  {/* Bottom accent line */}
                  <div
                    className="mt-5 h-0.5 w-10 rounded-full"
                    style={{
                      background: isHovered ? "rgba(255,255,255,0.5)" : color,
                      transition: "background 0.25s ease",
                    }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MAXIMIZE ROI WITH GEO SERVICES ── */}
      <section className="py-20" style={{ background: "#F0F7FF" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              Maximize the ROI with{" "}
              <span style={{ color: ACCENT }}>GEO Services</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Smart generative engine optimization services effectively turn your marketing investment
              into measurable ROI. With some focus on assets in the higher-converting local markets, you
              can easily eliminate wasteful spending, attract qualified leads, and achieve higher
              profitability via proven GEO strategies.
            </p>
          </div>

          {/* 2×2 grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: TrendingUp,
                color: "#2563EB",
                title: "Increase Local Traffic and Conversions",
                desc: "Drive foot traffic and online actions from the nearest customers with purchase intent. GEO-enabled campaigns capture users at critical decision moments, directing them to your doorstep or website, leading to higher conversion rates compared to unfocused marketing efforts.",
              },
              {
                icon: Target,
                color: "#16A34A",
                title: "Optimize Marketing Budgets with Targeted Campaigns",
                desc: "Direct its advertising budget toward the areas that create the most significant business value. Geographic targeting eliminates wasteful impressions in irrelevant markets, allowing you to concentrate spending on profitable locations, demographics, and times when your ideal customers are most active and receptive.",
              },
              {
                icon: DollarSign,
                color: "#DC2626",
                title: "Improve Customer Acquisition Cost Efficiency",
                desc: "Reduce your cost per acquisition by reaching customers with higher intent and relevance. GEO services match all your offerings with local demand, lowering the sales cycle length, decreasing bounce rates, and boosting quality scores that drive down all acquisition expenses.",
              },
              {
                icon: BarChart3,
                color: "#D97706",
                title: "Track and Measure Local Performance Accurately",
                desc: "Gain a detailed understanding of where your best outcomes are coming from — down to the specific locations, neighborhoods, and regions. The system also employs location-based analytics to spot shifts in performance and pinpoint areas ripe for improvement.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 hover:shadow-md transition-shadow">
                {/* Icon */}
                <div className="mb-5">
                  <Icon className="w-7 h-7" style={{ color }} strokeWidth={1.8} />
                </div>
                {/* Title */}
                <h3
                  className="font-bold text-base leading-snug mb-4"
                  style={{ color }}>
                  {title}
                </h3>
                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL AI SEARCHES CTA ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center"
            style={{ background: "#1A1F2E", minHeight: 200 }}>

            {/* Left — text content */}
            <div className="relative z-10 flex-1 px-10 md:px-14 py-12 md:py-10">
              <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">
                <span className="text-white">Missing Out on </span>
                <span style={{ color: "#F97316", fontStyle: "italic" }}>Local AI Searches?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                We optimize your local presence for AI-powered discovery — ensuring your brand appears
                when customers ask AI assistants for nearby solutions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: "#F97316" }}>
                Schedule a Strategy Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — laptop image */}
            <div className="relative flex-shrink-0 w-full md:w-[48%] self-end overflow-hidden">
              <img
                src="/cta-laptop-analytics.png"
                alt="Local AI analytics dashboard"
                className="w-full h-auto object-cover object-top"
                style={{ borderRadius: "0 1.5rem 1.5rem 0", maxHeight: 260 }}
              />
              {/* left fade */}
              <div
                className="absolute inset-y-0 left-0 w-24"
                style={{ background: "linear-gradient(to right, #1A1F2E, transparent)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP SECTORS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              Top Sectors Our Generative Engine{" "}
              <span style={{ color: ACCENT }}>Optimization Services Serve</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Top SEO Services provides comprehensive GEO strategies to multiple sectors that use AI
              search visibility to generate revenue. Our methodologies, which deliver proven results,
              enable brands to drive AI-enabled customer journeys from E-commerce to healthcare.
            </p>
          </div>

          {/* 4×2 grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShoppingCart,
                color: "#2563EB",
                title: "E-commerce",
                desc: "AI shopping assistants will recommend your products based on their system capabilities. Our team improves product descriptions by combining customer reviews with category pages to make your brand discoverable through ChatGPT and other AI systems during consumer product inquiries.",
              },
              {
                icon: Bot,
                color: "#0D9488",
                title: "AI Search",
                desc: "Users want to discover your AI tools using their normal searching methods. Our services enable AI companies to achieve discovery through conversational queries about automation, machine learning, and intelligent systems.",
              },
              {
                icon: Heart,
                color: "#DC2626",
                title: "Healthcare",
                desc: "AI technology helps patients establish trust during their quest for medical knowledge. We produce health content that serves as authoritative sources for AI engines to confirm symptoms and treatments and provider recommendations.",
              },
              {
                icon: Briefcase,
                color: "#D97706",
                title: "B2B",
                desc: "Capture enterprise buyers during their AI-powered research phase. Our team improves thought leadership articles, case studies and technical documents to make your solutions eligible for AI systems that solve business problems.",
              },
              {
                icon: Scale,
                color: "#2563EB",
                title: "Lawyers",
                desc: "Potential clients seek legal assistance through AI systems, which will recommend your services. Our team improves your attorney profiles together with practice area content and FAQ pages to establish your firm as the primary legal resource for clients.",
              },
              {
                icon: Home,
                color: "#16A34A",
                title: "Real Estate",
                desc: "AI systems will show your property listings to users who search for neighbourhood details, market analysis, and property information. Our team enhances listings together with market reports and local expertise content to achieve maximum exposure.",
              },
              {
                icon: Landmark,
                color: "#DC2626",
                title: "Fintech",
                desc: "Create your brand as an authoritative source for AI-assisted financial search engines. Our team positions your brand by creating optimized educational content that helps you achieve your goals in payment solutions, lending products, investment services, and financial tools.",
              },
              {
                icon: MonitorSmartphone,
                color: "#D97706",
                title: "SaaS",
                desc: "Get your software recommended when users search for solutions. We enhance feature pages together with integration guides and comparison content to establish your platform as the ideal tool that AI systems will reference.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col cursor-default"
                style={{ transition: "box-shadow 0.25s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${color}33`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: color + "12" }}>
                  <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.6} />
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-3">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── WHY CHOOSE US FOR GEO ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              Why Choose Us for Your Business Growth with{" "}
              <span style={{ color: ACCENT }}>GEO Services</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Selecting Top SEO Services as your trustworthy generative engine optimization agency is a
              viable decision, as our specialists turn your geographic data into revenue-generating
              customer connections.
            </p>
          </div>

          {/* 3-col grid — 10 cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", icon: MapPin,      title: "Hyper-Local Marketing Expertise",          desc: "Our extensive experience in micro-market targeting enables us to recognise neighbourhood characteristics and cultural preferences, together with local competitive patterns, that standard agencies fail to identify." },
              { num: "02", icon: BarChart3,   title: "Real-Time GEO Insights",                   desc: "We track customer locations in real time to show when people visit and which stores they visit together, and this data helps marketers adjust their campaigns to capitalise on spontaneous opportunities." },
              { num: "03", icon: Layers,      title: "Tailored Campaigns for Your Brand",        desc: "We develop location-based strategies to demonstrate your unique value proposition through competitive research and business development forecasts for all service areas." },
              { num: "04", icon: RefreshCw,   title: "Seamless Integration with Marketing Tools",desc: "Our GEO solutions create unified customer journeys from discovery to purchase through their ability to connect with your present CRM systems, analytics platforms, and advertising accounts." },
              { num: "05", icon: Eye,         title: "Localized Content for Better Engagement",  desc: "People from the community will connect with messages that focus on their area because the content uses local dialects and cultural references and specific neighbourhood promotions that standard content does not provide." },
              { num: "06", icon: BookOpen,    title: "Deep Local Market Knowledge",              desc: "The campaign team analyses local search patterns, community events, seasonal changes, and demographic developments in your regions to create relevant and timely campaigns." },
              { num: "07", icon: Settings2,   title: "Adaptive GEO Strategies for Competitiveness", desc: "Market conditions change, and we track competitor activities, search algorithm changes, and consumer trends to adjust your business plan and stay ahead of competitors." },
              { num: "08", icon: PieChart,    title: "Transparent Performance Reporting",        desc: "The dashboard provides a comprehensive view of how GEO campaigns impact store traffic, phone inquiries, and sales performance for each location through attribution modelling, which demonstrates return on investment." },
              { num: "09", icon: TrendingUp,  title: "Focus on Long-Term Growth",                desc: "Our business strategy establishes sustainable local market leadership through ongoing optimisation, together with reputation management and planned market development into new areas." },
              { num: "10", icon: Rocket,      title: "Results-Driven Business Scaling",          desc: "Our success pointers match yours, whether expanding locations, boosting average payout value, or improving customer lifetime value with our scalable location-based loyalty programmes." },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div
                key={num}
                className="rounded-2xl p-6 flex flex-col"
                style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}18` }}>
                {/* Top row: icon + number */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: ACCENT + "18" }}>
                    <Icon className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.7} />
                  </div>
                  <span
                    className="text-lg font-black"
                    style={{ color: ACCENT + "55" }}>
                    {num}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-3 leading-snug">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── IMAGE CTA ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: "linear-gradient(135deg,#0F172A 0%,#1a1040 100%)" }}>
            {/* Left: photo */}
            <div className="md:w-[46%] flex-shrink-0 relative min-h-[220px]">
              <img
                src="/cta-meeting-analytics.png"
                alt="GEO consultation"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent 60%,#0F172A)" }} />
            </div>
            {/* Right: text */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                Ready to Dominate{" "}
                <span style={{ color: ACCENT }}>AI-Powered Search?</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-7 max-w-md">
                Our GEO team builds content systems that make your brand the definitive recommendation
                across generative AI platforms and voice assistants.
              </p>
              <div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Request a Free GEO Consultation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GEO STRATEGY TABLE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              What is our{" "}
              <span style={{ color: ACCENT }}>GEO Services Strategy</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              As the best GEO services provider, we follow a straightforward procedure to combine
              location data with customer behavior to create campaigns that reach the right people
              just at the right time.
            </p>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_2fr] bg-slate-50 border-b border-slate-200">
              <div className="px-6 py-3 text-xs font-black tracking-widest uppercase text-slate-400">
                Process Phases
              </div>
              <div className="px-6 py-3 text-xs font-black tracking-widest uppercase text-slate-400 border-l border-slate-200">
                Description
              </div>
            </div>
            {/* Rows */}
            {[
              {
                phase: "Discovery and Analysis",
                desc: "We develop a market map that displays competitor operations while our team conducts research to discover new market opportunities through customer demographic analysis and local search pattern identification.",
              },
              {
                phase: "Strategy Development",
                desc: "The customised GEO frameworks, which utilise geofencing, local SEO, and location-based advertising, enable your business to achieve its objectives through improved visibility at essential areas.",
              },
              {
                phase: "Data-Driven Optimization",
                desc: "You can use our platform integration to display your brand in local searches, mapping services, and on mobile devices when potential customers come near your business location.",
              },
              {
                phase: "Implementation",
                desc: "Your campaigns will achieve their best performance through the combination of A/B testing and location performance evaluation. The method enables you to eliminate unnecessary elements while you enhance store visits and conversion rates.",
              },
              {
                phase: "Monitoring and Reporting",
                desc: "The real-time dashboards provide your locations with foot traffic attribution data, local engagement metrics, and return on investment figures. The complete view provides your total marketing expense report.",
              },
            ].map(({ phase, desc }, i, arr) => (
              <div
                key={phase}
                className={`grid grid-cols-[1fr_2fr]${i < arr.length - 1 ? " border-b border-slate-200" : ""}`}>
                <div className="px-6 py-5 text-sm font-black text-slate-900 flex items-start">
                  {phase}
                </div>
                <div className="px-6 py-5 text-sm text-slate-500 leading-relaxed border-l border-slate-200">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Frequently Asked Questions About{" "}
              <span style={{ color: ACCENT }}>GEO Services</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Get answers to the most common questions about our Generative Engine Optimization services.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
            {/* Left: card */}
            <div className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white">
              <img src="/faq-woman.png" alt="Still have questions?" className="w-full object-cover h-52" />
              <div className="p-6 text-center">
                <h3 className="text-lg font-black text-slate-900 mb-2">Still Have Questions?</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">
                  Can&apos;t find the answer you&apos;re looking for? Our GEO experts are ready to help.
                </p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Ask Our GEO Experts <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: accordion list */}
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-sm text-slate-800 font-medium">
                      <span className="font-black text-slate-400 mr-2">Q{i + 1}.</span>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className="w-4 h-4 flex-shrink-0 text-slate-400 transition-transform duration-200"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden">
                        <p className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GREEN CTA BANNER ── */}
      <section className="py-14 px-6 md:px-12" style={{ background: "#16A34A" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
              Ready to Own AI Search?
            </h2>
            <p className="text-green-100 text-sm max-w-md leading-relaxed">
              Get a free GEO audit and discover how to make your brand the top recommendation in
              generative AI search results.
            </p>
          </div>
          <Link href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white font-bold text-sm transition-opacity hover:opacity-90"
            style={{ color: "#16A34A" }}>
            Get Your Free Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── GET STARTED ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left: form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
                Let&apos;s{" "}
                <span style={{ color: "#16A34A" }}>Get Started</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name*"
                    className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-green-400 bg-white transition-colors" />
                </div>
                <div>
                  <input type="email" placeholder="Business Email*"
                    className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-green-400 bg-white transition-colors" />
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-500 flex-shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                    <span>US +1</span>
                  </div>
                  <input type="tel" placeholder="Phone Number *"
                    className="flex-1 rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-green-400 bg-white transition-colors" />
                </div>
                <div>
                  <select
                    className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-green-400 bg-white text-slate-500 transition-colors appearance-none">
                    <option value="">Select Budget</option>
                    <option value="under-1k">Under $1,000/mo</option>
                    <option value="1k-3k">$1,000 – $3,000/mo</option>
                    <option value="3k-5k">$3,000 – $5,000/mo</option>
                    <option value="5k-10k">$5,000 – $10,000/mo</option>
                    <option value="10k+">$10,000+/mo</option>
                  </select>
                </div>
                <div>
                  <textarea rows={4} placeholder="Tell us about your project*"
                    className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-green-400 bg-white resize-none transition-colors" />
                </div>
                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-white font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ background: "#16A34A" }}>
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Right: contact card */}
            <div className="rounded-2xl p-8 text-white" style={{ background: "#DC2626" }}>
              <h3 className="text-2xl font-black mb-1">Hate Filling out Forms?</h3>
              <a href="mailto:info@topseoservices.co"
                className="text-red-200 underline text-sm mb-8 block">
                Email us.
              </a>
              <div className="space-y-0">
                {[
                  { label: "Request a Quote",                    email: "business@topseoservices.co" },
                  { label: "Partners Enquires",                  email: "partners@topseoservices.co" },
                  { label: "Reference Checks /Misc. HR Enquires",email: "hr@topseoservices.co" },
                  { label: "Other Enquires",                     email: "info@topseoservices.co" },
                ].map(({ label, email }, i, arr) => (
                  <div key={label}
                    className={`flex items-start gap-3 py-5${i < arr.length - 1 ? " border-b border-red-500" : ""}`}>
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-0.5">{label}</p>
                      <a href={`mailto:${email}`} className="text-red-200 text-xs hover:text-white transition-colors">
                        {email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
