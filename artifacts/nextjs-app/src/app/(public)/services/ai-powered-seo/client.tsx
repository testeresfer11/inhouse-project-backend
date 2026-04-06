"use client";

import React, { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  Search, TrendingUp, Target, FileText,
  ArrowRight, CheckCircle2, BarChart3,
  Zap, Star, Plus,
  ChevronRight, ChevronDown, Code2, Gauge,
  Phone, Mail,
  Brain, Cpu, Sparkles, LineChart,
  Lock, RefreshCw, Globe, Shield,
  LayoutGrid, Layers, Bot, Lightbulb,
  Users, Award, Clock, Rocket, Eye,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const HERO_STATS = [
  { icon: Search,    value: "10,000+", label: "Keywords Ranked",       color: "#A78BFA" },
  { icon: TrendingUp,value: "450%",    label: "Avg Traffic Growth",    color: "#34D399" },
  { icon: BarChart3, value: "3,500+",  label: "Projects Delivered",    color: "#60A5FA" },
  { icon: Brain,     value: "120+",    label: "AI SEO Experts",        color: "#F472B6" },
];

const COVERS = [
  { icon: Brain,      color: "#7C3AED", bg: "#F5F3FF", title: "AI Content Strategy",        desc: "Leverage machine learning to map topics, discover untapped keyword clusters, and produce content that outranks competitors at scale." },
  { icon: Search,     color: "#2563EB", bg: "#EFF6FF", title: "Semantic Search Optimisation",desc: "Align your pages with natural language queries, entity relationships, and Knowledge Graph signals that modern AI search engines reward." },
  { icon: Cpu,        color: "#F97316", bg: "#FFF7ED", title: "Automated Technical Audits",  desc: "AI-driven crawlers identify and prioritise indexing gaps, Core Web Vitals failures, and structural errors faster than any manual review." },
  { icon: LineChart,  color: "#16A34A", bg: "#F0FDF4", title: "Predictive Keyword Research", desc: "Machine learning models forecast search volume trends before they peak so your content earns rankings while competitors are still planning." },
  { icon: Sparkles,   color: "#DB2777", bg: "#FDF2F8", title: "AI-Generated Content at Scale",desc: "Our proprietary AI pipeline drafts, edits, and publishes SEO-optimised articles, product pages, and FAQs in minutes — reviewed by humans." },
  { icon: Shield,     color: "#0891B2", bg: "#ECFEFF", title: "Algorithm Change Defence",    desc: "Real-time monitoring models alert you to ranking shifts the moment they happen and automatically prescribe corrective actions." },
  { icon: Globe,      color: "#059669", bg: "#ECFDF5", title: "Multilingual AI SEO",         desc: "AI-powered localisation and translation ensures every market hears your brand in its own language with culturally tuned optimisation." },
  { icon: LayoutGrid, color: "#9333EA", bg: "#F3E8FF", title: "Structured Data Automation",  desc: "Auto-generate and validate Schema.org markup across thousands of pages to dominate rich results, featured snippets, and AI answers." },
];

const WHY_ITEMS = [
  { icon: Zap,       color: "#F97316", bg: "#FFF7ED", title: "10× Faster Optimisation",   desc: "AI processes data and deploys optimisations in hours rather than weeks, compressing months of SEO work into days." },
  { icon: Target,    color: "#2563EB", bg: "#EFF6FF", title: "Hyper-Precise Targeting",   desc: "Machine learning surfaces micro-intent keywords and audience segments invisible to traditional research tools." },
  { icon: RefreshCw, color: "#7C3AED", bg: "#F5F3FF", title: "Continuous Learning Loop",  desc: "Our models retrain on live SERP data, adapting your strategy automatically as Google's AI evolves." },
  { icon: Lock,      color: "#16A34A", bg: "#F0FDF4", title: "Algorithm-Proof Strategy",  desc: "Pattern recognition across millions of ranking signals builds campaigns resilient to core updates and AI overviews." },
  { icon: Brain,     color: "#DB2777", bg: "#FDF2F8", title: "Generative AI Expertise",   desc: "We optimise for ChatGPT, Gemini, and Perplexity citations so your brand appears in AI-generated answers." },
  { icon: BarChart3, color: "#0891B2", bg: "#ECFEFF", title: "ROI-Driven Reporting",      desc: "Real-time dashboards with predictive revenue modelling turn SEO data into board-level business intelligence." },
];

const PROCESS_STEPS = [
  { title: "AI Discovery & Audit",         badge: "Step 01 of 06", icon: Search,    color: "#7C3AED", items: ["Comprehensive AI-powered site crawl", "Competitor intelligence extraction", "Entity gap and topic cluster analysis", "Core Web Vitals & technical scoring", "Search intent mapping across 5,000+ queries", "Automated opportunity prioritisation matrix"] },
  { title: "Strategy Blueprint",           badge: "Step 02 of 06", icon: Lightbulb, color: "#2563EB", items: ["12-month AI content calendar", "Keyword-to-page alignment mapping", "Pillar and cluster architecture design", "Internal linking graph optimisation plan", "Backlink profile gap analysis", "Conversion funnel SEO integration"] },
  { title: "AI Content Production",        badge: "Step 03 of 06", icon: Sparkles,  color: "#F97316", items: ["AI-drafted article & page generation", "Human editorial review & brand voice alignment", "NLP optimisation for semantic relevance", "E-E-A-T signal integration", "FAQ and structured data authoring", "Multimedia content briefing & creation"] },
  { title: "Technical Implementation",     badge: "Step 04 of 06", icon: Cpu,       color: "#16A34A", items: ["Schema markup deployment at scale", "Crawl budget optimisation", "Canonicalisation & redirect architecture", "Core Web Vitals code-level fixes", "JavaScript SEO auditing", "XML sitemap & robots.txt refinement"] },
  { title: "Authority & Link Acquisition", badge: "Step 05 of 06", icon: Globe,     color: "#DB2777", items: ["AI-targeted digital PR outreach", "Contextual link prospecting", "Brand mention reclamation", "HARO & expert quotation placement", "Broken link reclamation", "Niche editorial partnerships"] },
  { title: "Measure, Learn & Scale",       badge: "Step 06 of 06", icon: LineChart,  color: "#0891B2", items: ["Real-time rank tracking dashboard", "AI anomaly detection & alert system", "Monthly executive performance reports", "Continuous model retraining on new data", "Quarterly strategy refinement sessions", "Scalable content & link velocity planning"] },
];

const FAQS = [
  { q: "What is AI-Powered SEO?",                               a: "AI-Powered SEO uses machine learning, natural language processing, and large language models to automate research, content creation, technical analysis, and strategy—delivering results faster and at greater scale than traditional SEO." },
  { q: "How is AI SEO different from traditional SEO?",         a: "Traditional SEO relies on manual research and periodic updates. AI SEO uses continuous data processing to detect ranking opportunities in real time, adapt content automatically, and optimise thousands of pages simultaneously." },
  { q: "Will AI-generated content hurt my rankings?",          a: "Not with our approach. Every AI-produced piece is reviewed, refined, and approved by human SEO editors before publication, ensuring it meets E-E-A-T standards and your brand's tone of voice." },
  { q: "How do you handle Google's AI Overviews (SGE)?",       a: "We structure content to be cited by AI Overviews by optimising for concise, authoritative answers, strong entity associations, and high-quality structured data—positioning your brand in the AI answer layer." },
  { q: "How long until I see results?",                        a: "Most clients see measurable improvements in organic traffic within 60–90 days. AI accelerates the process, but lasting rankings still require consistent content quality and authority building." },
  { q: "Do you optimise for ChatGPT and Gemini citations?",    a: "Yes. We build topical authority and structured content specifically designed to appear as trusted sources in ChatGPT, Gemini, Perplexity, and other LLM-driven answers." },
  { q: "What industries do you serve?",                        a: "We work with e-commerce, SaaS, healthcare, finance, law, education, and enterprise brands globally. Our AI models are trained on industry-specific SERP data for each vertical." },
  { q: "Can AI SEO work with my existing content?",            a: "Absolutely. Our AI audit benchmarks existing pages against top-ranking competitors and prescribes targeted enhancements—so you get quick wins from your current asset library." },
  { q: "How do you measure ROI?",                              a: "We connect keyword rankings to revenue using attribution modelling, track pipeline value from organic, and deliver monthly reports that tie SEO metrics to business outcomes." },
  { q: "Is my data secure with your AI tools?",               a: "Yes. We use enterprise-grade security with encrypted data pipelines. Your website data is never shared or used to train third-party public models." },
  { q: "What makes your AI SEO proprietary?",                  a: "Our platform combines seven specialised models—content generation, ranking prediction, link scoring, technical audit, sentiment analysis, SERP volatility, and competitor tracking—built and fine-tuned on five years of SEO data." },
  { q: "How do I get started?",                               a: "Fill in the contact form on this page. We'll run a complimentary AI site audit within 48 hours and present a customised growth roadmap with projected traffic and revenue uplift." },
];

const WHY_CHOOSE = [
  { icon: Bot,       color: "#7C3AED", bg: "#F5F3FF", title: "Proprietary AI Platform",   desc: "Seven specialised models working in unison—ranking prediction, content scoring, link analysis, and more—built on 5 years of SERP data across 40+ industries." },
  { icon: Users,     color: "#2563EB", bg: "#EFF6FF", title: "120+ AI SEO Specialists",   desc: "Every campaign blends machine intelligence with human expertise. Our certified specialists review every AI output before it touches your site." },
  { icon: Award,     color: "#F97316", bg: "#FFF7ED", title: "Award-Winning Results",     desc: "Named Best AI SEO Agency 2024 by Search Engine Journal. Our campaigns have generated over $400M in attributed organic revenue for clients worldwide." },
  { icon: Clock,     color: "#16A34A", bg: "#F0FDF4", title: "Real-Time Optimisation",    desc: "24/7 monitoring detects ranking fluctuations within minutes and automatically deploys corrective content and technical fixes—no human latency." },
  { icon: Rocket,    color: "#DB2777", bg: "#FDF2F8", title: "Faster Time to Results",    desc: "AI-compressed timelines mean clients typically achieve target keyword rankings 3× faster than the industry average, with compounding returns." },
  { icon: Shield,    color: "#0891B2", bg: "#ECFEFF", title: "Penalty-Free Guarantee",    desc: "Our white-hat AI methods comply with every Google quality guideline. We offer a full remediation guarantee if any of our work triggers a manual action." },
];

const INDUSTRIES = [
  { icon: Brain,     iconBg: "#2563EB", title: "Healthcare",  image: "/industry-healthcare.png" },
  { icon: Target,    iconBg: "#EF4444", title: "Real Estate", image: "/industry-real-estate.png" },
  { icon: Rocket,    iconBg: "#F59E0B", title: "E-commerce",  image: "/industry-ecommerce.png" },
  { icon: Globe,     iconBg: "#10B981", title: "Shopify",     image: "/industry-shopify.png" },
  { icon: Layers,    iconBg: "#2563EB", title: "Logistics",   image: "/industry-logistics.png" },
  { icon: Lightbulb, iconBg: "#EF4444", title: "Education",   image: "/industry-education.png" },
  { icon: Users,     iconBg: "#F59E0B", title: "B2B",         image: "/industry-b2b.png" },
  { icon: BarChart3, iconBg: "#10B981", title: "Enterprise",  image: "/industry-enterprise.png" },
];

const PLATFORM_CARDS = [
  {
    num: "01", color: "#2563EB", bg: "#EFF6FF",
    icon: Brain,
    title: "ChatGPT",
    desc: "The process of optimizing content for conversational queries enables your brand to show up in AI-generated search results. The semantic content structure we use, together with our entity recognition enhancement and knowledge-style page creation, establishes your business as an authoritative source of information for AI systems.",
  },
  {
    num: "02", color: "#10B981", bg: "#ECFDF5",
    icon: Sparkles,
    title: "Google Gemini",
    desc: "Search systems now discover information through answer-based methods. Our team's website content optimization process includes creating organized content enhancements, improving schema data, and developing topical authority, which enables Google AI systems to extract relevant information from your site and produce accurate AI-generated content summaries.",
  },
  {
    num: "03", color: "#EF4444", bg: "#FEF2F2",
    icon: Gauge,
    title: "Bing Copilot",
    desc: "Microsoft Search extensively relies on AI summarization technology. The team produces web content that meets optimization standards through three core components: contextual relevance, structured clarity, and authority signals, all of which strengthen your brand's presence in AI search results.",
  },
  {
    num: "04", color: "#F59E0B", bg: "#FFFBEB",
    icon: Rocket,
    title: "Voice Search Assistants (Alexa, Siri)",
    desc: "Voice search technology operates using two core technologies, which include separate answer delivery systems and systems that handle natural language query processing. The AI SEO strategy of our company focuses on creating content that answers questions through optimization for featured snippets and targeting location-based search intent to increase your business presence in voice search results.",
  },
  {
    num: "05", color: "#2563EB", bg: "#EFF6FF",
    icon: Globe,
    title: "Meta AI (Bard / LLaMA)",
    desc: "AI technology powers social discovery systems, which now use it for their functionality. The team improves brand entities, topical authority, and conversational context to enable your website content to function as an AI-based recommendation system on social media platforms.",
  },
];

const SERVICE_CARDS = [
  {
    tag: "LLM SEO SERVICES",
    title: "LLM Optimization",
    image: "/ai-seo-card-llm.png",
    desc: "We optimise your website's content and structure so large language models like GPT-4, Claude, and Gemini cite your brand as a trusted source. Our LLM SEO strategies include entity reinforcement, structured fact markup, and authoritative content positioning to maximise AI-generated visibility.",
  },
  {
    tag: "AEO SEO SERVICES",
    title: "Answer Engine Optimization (AEO)",
    image: "/ai-seo-card-aeo.png",
    desc: "Direct questions have become the preferred method for users to conduct their searches. The AEO SEO services optimise your website to display featured snippets while they control voice search functions and create AI-powered responses. The structured question-answer frameworks we develop include schema markup and brief informational content, which establishes your website as the main source for search engines to use during their immediate response delivery.",
  },
  {
    tag: "GEO SEO SERVICES",
    title: "Generative Engine Optimization (GEO)",
    image: "/ai-seo-card-geo.png",
    desc: "GEO optimisation positions your content to appear in AI-generated search overviews across Google SGE, Bing Copilot, and Perplexity. We build structured, authoritative content clusters that AI summarisers trust to pull answers from — earning you visibility above traditional organic results.",
  },
  {
    tag: "KEYWORD RESEARCH SERVICES",
    title: "AI Smart Keyword Research",
    image: "/ai-seo-card-keyword.png",
    desc: "Our proprietary AI models analyse billions of data points to uncover high-value, low-competition keyword opportunities before they trend. We map these to your content architecture, ensuring every page targets the exact intent signals driving conversions in your market.",
  },
  {
    tag: "SEMANTIC SEO",
    title: "Semantic Content Optimization",
    image: "/ai-seo-card-semantic.png",
    desc: "Modern search engines understand meaning, not just keywords. We build topical authority through semantic content clusters — interconnected pages that cover every facet of a subject — so Google and AI engines recognise your site as the definitive resource in your niche.",
  },
  {
    tag: "TECHNICAL SEO",
    title: "Technical SEO Automation",
    image: "/ai-seo-card-technical.png",
    desc: "Our AI-powered crawlers run continuous technical audits across your entire site, automatically detecting and triaging indexability errors, Core Web Vitals failures, duplicate content, and crawl budget leaks. Critical fixes are deployed programmatically — no waiting for the next sprint cycle.",
  },
  {
    tag: "CHATGPT SEO",
    title: "ChatGPT Optimization",
    image: "/ai-seo-card-chatgpt.png",
    desc: "As millions of users turn to ChatGPT for product and service recommendations, we ensure your brand surfaces in those AI-generated responses. Our ChatGPT SEO strategy builds the authoritative web presence, backlink profile, and entity associations that language models rely on when generating answers.",
  },
  {
    tag: "GOOGLE AI MODE",
    title: "Google AI Mode Optimization",
    image: "/ai-seo-card-google-ai.png",
    desc: "Google's AI Mode is reshaping how search results are presented. We optimise your content specifically for AI Mode overviews by aligning page structure, E-E-A-T signals, and schema data with the patterns Google's AI surfaces in conversational and multi-step query responses.",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export function AiPoweredSeoPageClient() {
  const [activeStep, setActiveStep]   = useState(0);
  const [openFaq, setOpenFaq]         = useState<number>(-1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", countryCode: "+1", budget: "", message: "",
  });

  const step = PROCESS_STEPS[activeStep];

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/ai-seo-hero.jpg')" }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,10,40,0.88) 0%, rgba(30,20,70,0.80) 50%, rgba(15,10,40,0.70) 100%)" }} />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="container mx-auto px-4 md:px-8 pt-24 pb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left — text */}
              <m.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-widest" style={{ background: "rgba(124,58,237,0.25)", border: "1px solid rgba(167,139,250,0.5)", color: "#C4B5FD" }}>
                  <Cpu className="w-3.5 h-3.5" />
                  AI-POWERED SEO
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white leading-tight mb-5">
                  AI-Powered SEO Services to{" "}
                  <span style={{ background: "linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Boost Rankings
                  </span>{" "}
                  and Drive Results
                </h1>

                {/* Subtitle */}
                <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Are you seeking award-winning and trusted AI-powered SEO services to outperform your competitors? Look no further — our elite AI platform serves both small- and large-scale businesses, driving measurable AI visibility for e-commerce and enterprise brands alike.
                </p>

                {/* CTA */}
                <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                  <Link
                    href="#get-started"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm text-white"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}
                  >
                    Get a Free Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </m.div>
              </m.div>

              {/* Right — generated AI image */}
              <m.div
                initial={{ opacity: 0, scale: 0.92, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                {/* Glow halo */}
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-40 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center, #7C3AED 0%, #EC4899 60%, transparent 100%)", transform: "scale(1.08)" }}
                />
                {/* Image card */}
                <div className="relative rounded-3xl overflow-hidden border" style={{ border: "1.5px solid rgba(167,139,250,0.35)", boxShadow: "0 24px 80px rgba(124,58,237,0.45)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ai-seo-visual.png"
                    alt="AI-powered SEO neural network visualisation"
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: "420px" }}
                  />
                  {/* Overlay shimmer */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(15,10,40,0.6) 100%)" }} />

                  {/* Floating metric pill — top left */}
                  <m.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
                    style={{ background: "rgba(124,58,237,0.85)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(167,139,250,0.4)" }}
                  >
                    <Brain className="w-3.5 h-3.5" />
                    AI Signals: 2.4M processed
                  </m.div>

                  {/* Floating metric pill — bottom right */}
                  <m.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
                    style={{ background: "rgba(236,72,153,0.85)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(236,72,153,0.4)" }}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    +450% Avg Traffic Growth
                  </m.div>
                </div>
              </m.div>

            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10">
          <div
            className="container mx-auto px-4 md:px-8 mb-8"
          >
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(16px)" }}
            >
              {HERO_STATS.map(({ icon: Icon, value, label, color }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-5 border-r border-b last:border-r-0 md:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}22` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-white leading-none">{value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</p>
                  </div>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AI-POWERED SEO ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Centered heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
              What is AI-Powered SEO and{" "}<br className="hidden sm:block" />
              <span style={{ color: "#2563EB" }}>how does it work?</span>
            </h2>
          </m.div>

          {/* Two-col layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — image with floating badges */}
            <m.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="relative"
            >
              {/* Main photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ai-seo-team.png"
                  alt="Business team reviewing AI SEO analytics dashboard"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "360px" }}
                />

                {/* Purple badge — bottom-right of image */}
                <div
                  className="absolute bottom-4 right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)", boxShadow: "0 8px 24px rgba(124,58,237,0.45)" }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-black leading-none">4.5× More Traffic</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>AI-driven organic growth rate</p>
                  </div>
                </div>
              </div>

              {/* White card badge — bottom-left, partially outside image */}
              <m.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute -bottom-6 -left-4 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid #F1F5F9" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#EFF6FF" }}>
                  <Cpu className="w-4.5 h-4.5 text-blue-600" style={{ width: "18px", height: "18px" }} />
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-black leading-none">10,000+ AI Optimizations</p>
                  <p className="text-slate-400 text-xs mt-0.5">Automated ranking improvements</p>
                </div>
              </m.div>
            </m.div>

            {/* Right — copy + CTA */}
            <m.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            >
              <p className="text-slate-600 leading-relaxed mb-5 text-[15px]">
                The phrase &quot;AI-powered SEO&quot; refers to a modernized approach to search optimization that uses Artificial intelligence to analyze search behavior, deeply understand user intent, and elevate website performance across search engines and other AI answer platforms. This approach differs from traditional methodologies that heavily rely on manual audits and guesswork.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8 text-[15px]">
                Along with this, the AI-powered seo services use machine learning models, entity recognition, and predictive analytics to identify ranking opportunities, optimize content, and automate technical improvements. Also, the result is smarter targeting, better search visibility, and sustained organic growth, perfectly aligned with how search engines now figure out websites.
              </p>

              <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  href="#get-started"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm text-white"
                  style={{ background: "#2563EB", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
                >
                  Talk to an AI SEO Expert
                </Link>
              </m.div>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS GRID ── */}
      <section className="py-20" style={{ background: "#F8F9FF" }}>
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Optimize Your Website with Our{" "}<br className="hidden sm:block" />
              <span style={{ color: "#2563EB" }}>AI-Powered SEO Services</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              The professional AI-powered SEO company uses its automated system together with its data modeling capabilities and its search intelligence methods to achieve better search engine rankings and increased customer conversions. The AI-powered service suite provides user intent analysis with technical performance optimization and helps establish your website presence on search engines, AI bots, and answer-based platforms.
            </p>
          </m.div>

          {/* 4×2 card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICE_CARDS.map((card, i) => {
              const isOpen = expandedCard === i;
              return (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden bg-white"
                  style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
                >
                  {/* Image area with + / × toggle */}
                  <div className="relative overflow-hidden" style={{ height: "180px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: isOpen ? "scale(1.04)" : "scale(1)" }}
                    />

                    {/* Toggle button — top-right */}
                    <button
                      onClick={() => setExpandedCard(isOpen ? null : i)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 z-10"
                      style={{
                        background: isOpen ? "#EF4444" : "#2563EB",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    {/* Expanded overlay */}
                    <AnimatePresence>
                      {isOpen && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 flex items-end p-4 overflow-y-auto"
                          style={{ background: "linear-gradient(160deg, rgba(37,99,235,0.95) 0%, rgba(124,58,237,0.92) 100%)" }}
                        >
                          <p className="text-white text-xs leading-relaxed">{card.desc}</p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card footer */}
                  <div className="px-4 py-4">
                    <p className="text-xs font-bold tracking-widest mb-1" style={{ color: "#2563EB" }}>{card.tag}</p>
                    <h3 className="font-black text-slate-900 text-sm leading-snug">{card.title}</h3>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl"
            style={{ background: "#12092B" }}
          >
            <div className="grid lg:grid-cols-2 min-h-[220px]">

              {/* Left — tinted image with grid overlay */}
              <div className="relative overflow-hidden min-h-[220px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ai-seo-team.png"
                  alt="AI SEO professional"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Purple colour wash */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.72) 0%, rgba(124,58,237,0.55) 100%)" }} />
                {/* Subtle grid lines */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Right fade into dark bg */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, #12092B 100%)" }} />
              </div>

              {/* Right — copy */}
              <div className="relative z-10 flex flex-col justify-center px-10 py-12">
                <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-4">
                  Tired of Being{" "}
                  <em className="not-italic" style={{ color: "#A78BFA" }}>
                    Invisible to AI Search?
                  </em>
                </h2>
                <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Our AI-powered SEO experts build intelligent optimization engines that make your brand visible across search engines, AI assistants, and answer platforms.
                </p>
                <div>
                  <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    <Link
                      href="#get-started"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white"
                      style={{ background: "#7C3AED", boxShadow: "0 4px 20px rgba(124,58,237,0.5)" }}
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

      {/* ── PLATFORM CARDS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
              Boost Your Visibility with AI-Optimised<br />
              <span style={{ color: "#2563EB" }}>SEO Across Platforms</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              The AI-powered SEO solution boosts brand visibility in both current search engines and traditional search platforms. Our On-Page SEO services, together with our optimization solutions, achieve this result because they extend visibility to multiple platforms, which include conversational interfaces, AI chatbots, and answer engines, while maintaining search ranking results through advanced search optimization technology and multi-platform indexing.
            </p>
          </m.div>

          {/* Cards — row 1: 3 cols, row 2: 2 cols centered */}
          <div className="space-y-5">
            {/* Row 1 */}
            <div className="grid lg:grid-cols-3 gap-5">
              {PLATFORM_CARDS.slice(0, 3).map((card, i) => {
                const isHovered = hoveredCard === 400 + i;
                const Icon = card.icon;
                return (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    onMouseEnter={() => setHoveredCard(400 + i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative rounded-2xl p-6 overflow-hidden cursor-default border border-slate-100 bg-white"
                    style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
                  >
                    {/* Sweep overlay from left */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: card.bg,
                        transformOrigin: "left",
                        transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />

                    {/* Bottom border */}
                    <div
                      className="absolute bottom-0 left-0 h-[3px] pointer-events-none"
                      style={{
                        background: card.color,
                        width: isHovered ? "100%" : "0%",
                        transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: isHovered ? card.color : card.bg }}>
                          <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: isHovered ? "#fff" : card.color }} />
                        </div>
                        <span className="text-4xl font-black" style={{ color: isHovered ? `${card.color}30` : "#F1F5F9" }}>{card.num}</span>
                      </div>
                      <h3 className="font-black text-slate-900 mb-3">{card.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </m.div>
                );
              })}
            </div>

            {/* Row 2 */}
            <div className="grid lg:grid-cols-2 gap-5 lg:max-w-[66.7%]">
              {PLATFORM_CARDS.slice(3).map((card, i) => {
                const idx = i + 3;
                const isHovered = hoveredCard === 400 + idx;
                const Icon = card.icon;
                return (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    onMouseEnter={() => setHoveredCard(400 + idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative rounded-2xl p-6 overflow-hidden cursor-default border border-slate-100 bg-white"
                    style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
                  >
                    {/* Sweep overlay from left */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: card.bg,
                        transformOrigin: "left",
                        transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />

                    {/* Bottom border */}
                    <div
                      className="absolute bottom-0 left-0 h-[3px] pointer-events-none"
                      style={{
                        background: card.color,
                        width: isHovered ? "100%" : "0%",
                        transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: isHovered ? card.color : card.bg }}>
                          <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: isHovered ? "#fff" : card.color }} />
                        </div>
                        <span className="text-4xl font-black" style={{ color: isHovered ? `${card.color}30` : "#F1F5F9" }}>{card.num}</span>
                      </div>
                      <h3 className="font-black text-slate-900 mb-3">{card.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20" style={{ background: "#F8F9FF" }}>
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
              Industries We Serve as an<br />
              <span style={{ color: "#2563EB" }}>AI-Powered SEO Services Provider</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Our AI-powered seo agency services support diverse sectors through data-driven optimization, automated keyword targeting, and search visibility growth. We then deliver super-exclusive enterprise SEO strategy, intelligent content optimization, and AI search ranking enhancements across competitive markets.
            </p>
          </m.div>

          {/* 4×2 image card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map(({ icon: Icon, iconBg, title, image }, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-default"
                style={{ height: "220px" }}
              >
                {/* Background photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay — bottom */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

                {/* Icon badge — top-left */}
                <div
                  className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: iconBg, boxShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Title — bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{title}</p>
                </div>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── GETTING TRAFFIC CTA ── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl"
            style={{ background: "#1A1A2E" }}
          >
            <div className="grid lg:grid-cols-[1fr_1fr] min-h-[180px]">

              {/* Left — dark copy panel */}
              <div className="flex flex-col justify-center px-10 py-10">
                <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-4">
                  Getting Traffic But{" "}
                  <em className="not-italic" style={{ color: "#F97316" }}>No AI Visibility?</em>
                </h2>
                <p className="text-sm leading-relaxed mb-7 max-w-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  We use AI-powered analysis to fix technical issues, optimize content for LLMs, and build authority so your brand shows up in AI-generated answers.
                </p>
                <div>
                  <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    <Link
                      href="#get-started"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white"
                      style={{ background: "#2563EB", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}
                    >
                      Schedule a Strategy Call <ArrowRight className="w-4 h-4" />
                    </Link>
                  </m.div>
                </div>
              </div>

              {/* Right — laptop analytics photo */}
              <div className="relative overflow-hidden hidden lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cta-laptop-analytics.png"
                  alt="Laptop showing AI SEO analytics dashboard"
                  className="absolute inset-0 w-full h-full object-cover object-left"
                />
                {/* Left fade into dark panel */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, #1A1A2E 0%, transparent 35%)" }}
                />
              </div>

            </div>
          </m.div>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
              Our AI-Powered<br />
              <span style={{ color: "#2563EB" }}>SEO Process</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Our company, Top SEO Services, delivers comprehensive AI-powered seo services that combine artificial intelligence, machine learning results, and traditional optimization techniques. The system improves search results through its automated analysis system and its intelligent ranking prediction capability, which works together with content optimization tools that update according to changing search algorithms and platforms.
            </p>
          </m.div>

          {/* Staggered card row — desktop only */}
          <div className="hidden lg:grid grid-cols-6 gap-3 items-start">
            {[
              { icon: Search,    color: "#EC4899", bg: "#FDF2F8", mt: 0,   title: "Website Audit and Analysis",          desc: "Firstly, we assess the overall technical aspects of the website, which include its page speed, along with the crawl capabilities, which pages can be indexed, and how it performs in search engine results. AI tools then detect all problems that traditional audits fail to find, including the intent mismatch and more." },
              { icon: Brain,     color: "#F97316", bg: "#FFF7ED", mt: 48,  title: "AI-Driven Keyword Research",           desc: "Secondly, we explore search intent. The AI-based analysis of user behavior helps identify opportunities for competitor rankings, leading to a precise keyword strategy that aligns with actual user search patterns." },
              { icon: Layers,    color: "#14B8A6", bg: "#F0FDFA", mt: 88,  title: "Content Optimisation Using AI Tools",  desc: "Thirdly, we improve all website elements, which consist of content, headings, semantic entities, and topic relevance. The AI system improves website structure by fixing incomplete areas, which enables a better match between search queries and website content, resulting in improved search rankings for both general and important search terms." },
              { icon: Cpu,       color: "#10B981", bg: "#ECFDF5", mt: 36,  title: "Technical SEO with AI",               desc: "Then, our team solves all problems that affect website indexing, together with schema implementation problems, page speed problems, internal linking issues, and site layout. The AI analysis process determines which SEO issues require urgent resolution based on their potential effect on search engine rankings." },
              { icon: Globe,     color: "#8B5CF6", bg: "#F5F3FF", mt: 72,  title: "AI-Powered Link Building & Outreach",  desc: "We also use AI data analysis to identify authoritative websites, together with industry publishers and relevant partners. The method enables the acquisition of contextual backlinks, which improve domain trust and result in better ranking consistency." },
              { icon: TrendingUp,color: "#EC4899", bg: "#FDF2F8", mt: 20,  title: "Continuous Monitoring & Adjustments", desc: "Lastly, search algorithms experience ongoing improvements. The AI tracking tools provide real-time monitoring of ranking, traffic signals, and behavior changes, which enable immediate optimization and performance improvements." },
            ].map(({ icon: Icon, color, bg, mt, title, desc }, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="rounded-2xl p-5 border border-slate-100 bg-white"
                style={{ marginTop: `${mt}px`, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug mb-3">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </m.div>
            ))}
          </div>

          {/* Mobile: simple vertical list */}
          <div className="lg:hidden space-y-4">
            {[
              { icon: Search,    color: "#EC4899", bg: "#FDF2F8", num: "01", title: "Website Audit and Analysis",          desc: "We assess all technical aspects including page speed, crawlability, indexation, and search performance. AI tools detect problems traditional audits miss." },
              { icon: Brain,     color: "#F97316", bg: "#FFF7ED", num: "02", title: "AI-Driven Keyword Research",           desc: "AI-based analysis of user behavior identifies competitor ranking opportunities and builds keyword strategies aligned with actual search patterns." },
              { icon: Layers,    color: "#14B8A6", bg: "#F0FDFA", num: "03", title: "Content Optimisation Using AI Tools",  desc: "We improve headings, semantic entities, and topic relevance. AI fills content gaps, improving rankings for both broad and niche search terms." },
              { icon: Cpu,       color: "#10B981", bg: "#ECFDF5", num: "04", title: "Technical SEO with AI",               desc: "Our team resolves indexing, schema, page speed, and layout issues. AI prioritises fixes by their impact on search engine rankings." },
              { icon: Globe,     color: "#8B5CF6", bg: "#F5F3FF", num: "05", title: "AI-Powered Link Building & Outreach",  desc: "AI identifies authoritative publishers and partners for contextual backlinks that improve domain trust and ranking consistency." },
              { icon: TrendingUp,color: "#EC4899", bg: "#FDF2F8", num: "06", title: "Continuous Monitoring & Adjustments", desc: "Real-time monitoring of rankings, traffic signals, and behavior changes enables immediate performance optimisation." },
            ].map(({ icon: Icon, color, bg, num, title, desc }, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border border-slate-100" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <span className="text-xs font-black" style={{ color }}>{num}</span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm mb-1">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline strip — desktop */}
          <div className="hidden lg:block mt-6">
            <div className="relative" style={{ height: "60px" }}>
              <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <path d="M 100,30 C 160,10 240,50 300,30 C 360,10 440,50 500,30 C 560,10 640,50 700,30 C 760,10 840,50 900,30 C 960,10 1040,50 1100,30" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                {[
                  { cx: 100, color: "#EC4899" }, { cx: 300, color: "#F97316" },
                  { cx: 500, color: "#14B8A6" }, { cx: 700, color: "#10B981" },
                  { cx: 900, color: "#8B5CF6" }, { cx: 1100, color: "#EC4899" },
                ].map(({ cx, color }, i) => (
                  <React.Fragment key={i}>
                    <circle cx={cx} cy={30} r="10" fill={color} />
                    <circle cx={cx} cy={30} r="5" fill="white" />
                  </React.Fragment>
                ))}
              </svg>
            </div>
            <div className="grid grid-cols-6 gap-3 mt-1">
              {["Step 01","Step 02","Step 03","Step 04","Step 05","Step 06"].map((label, i) => (
                <p key={i} className="text-center text-xs font-bold text-slate-400">{label}</p>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Link href="#get-started" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: "#2563EB", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}>
                Start Your AI SEO Journey <Sparkles className="w-4 h-4" />
              </Link>
            </m.div>
          </div>

        </div>
      </section>

      {/* ── WHY BUSINESSES CHOOSE US ── */}
      <section className="py-20" style={{ background: "#F4F6FB" }}>
        <div className="container mx-auto px-4 md:px-8">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
              Why Choose Our<br />
              <span style={{ color: "#2563EB" }}>AI-Powered SEO Services?</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              The complete digital marketing services we provide enable businesses to achieve online growth through our advanced AI-driven SEO services. Our SEO process uses data intelligence and automation along with search behavior analysis to enhance search rankings and transform visitors into regular customers.
            </p>
          </m.div>

          {/* 3×2 card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Target,    num: "01",
                title: "Smart Keyword Targeting",
                desc: "Our AI-powered SEO services analyze search patterns and intent to choose keywords users actually search for, resulting in improved visibility. The process completes 100 times faster than manual research.",
              },
              {
                icon: TrendingUp, num: "02",
                title: "Predictive Ranking Optimization",
                desc: "Our AI-powered SEO services use AI forecasting to identify ranking potential and execute page optimization before competitors start their defensive actions.",
              },
              {
                icon: Cpu,        num: "03",
                title: "Automated Technical SEO Fixes",
                desc: "Our digital marketing agency uses AI diagnostics to detect crawl errors, indexing problems, and site speed issues, and then we fix those problems through a systematic approach.",
              },
              {
                icon: Layers,     num: "04",
                title: "High-Performance Content Strategy",
                desc: "We create semantic content clusters through our AI-powered SEO services, which enable your website to rank for hundreds of related queries beyond just specific keywords.",
              },
              {
                icon: Eye,        num: "05",
                title: "Smarter Competitor Analysis",
                desc: "Our agency employs AI search intelligence to monitor competitor ranking movements while making real-time strategy modifications according to those changes.",
              },
              {
                icon: RefreshCw,  num: "06",
                title: "Continuous SEO Improvements",
                desc: "Our ai-powered SEO services continue to enhance user engagement, website rankings, and conversion rates throughout each month because they learn from user behavior that occurs after traditional agencies complete their work.",
              },
            ].map(({ icon: Icon, num, title, desc }, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-7 border border-slate-200"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                {/* Icon badge + number row */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#EFF6FF" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#2563EB" }} />
                  </div>
                  <span className="text-lg font-black" style={{ color: "#2563EB" }}>{num}</span>
                </div>

                <h3 className="font-black text-slate-900 text-base leading-snug mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PREDICTABLE REVENUE CTA ── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl"
            style={{ background: "#1A1A2E" }}
          >
            <div className="grid lg:grid-cols-[1fr_1fr] min-h-[220px]">

              {/* Left — photo */}
              <div className="relative overflow-hidden hidden lg:block min-h-[220px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cta-meeting-analytics.png"
                  alt="Team reviewing AI SEO analytics"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Right fade into dark panel */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to left, #1A1A2E 0%, transparent 40%)" }}
                />
              </div>

              {/* Right — copy */}
              <div className="flex flex-col justify-center px-10 py-10">
                <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-4">
                  Ready to Turn AI Search Into{" "}
                  <em className="not-italic" style={{ color: "#F97316" }}>
                    Predictable Revenue?
                  </em>
                </h2>
                <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Our AI SEO team builds scalable organic growth systems backed by machine learning, predictive analytics, and content intelligence that grow your business month over month.
                </p>
                <div>
                  <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    <Link
                      href="#get-started"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white"
                      style={{ background: "#F97316", boxShadow: "0 4px 16px rgba(249,115,22,0.4)" }}
                    >
                      Request a Free AI SEO Consultation <ArrowRight className="w-4 h-4" />
                    </Link>
                  </m.div>
                </div>
              </div>

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
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
              How Our Digital Marketing Agency Delivers{" "}
              <span style={{ color: "#2563EB" }}>Better Results Than Competitors</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Top SEO Services is a leading AI-powered SEO company that uses AI-powered SEO strategies backed by data modeling, search intent mapping, and predictive analytics to outrank traditional agencies and regularly improve rankings, traffic quality, and conversions.
            </p>
          </m.div>

          {/* Comparison table */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto rounded-2xl border border-slate-200 overflow-hidden"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
          >
            {/* Table header */}
            <div className="grid grid-cols-[1.2fr_1.8fr_1.8fr] bg-slate-50 border-b border-slate-200">
              <div className="px-6 py-4">
                <span className="text-xs font-black tracking-wider text-slate-500 uppercase">Areas</span>
              </div>
              <div className="px-6 py-4 border-l border-slate-200">
                <span className="text-xs font-black tracking-wider uppercase" style={{ color: "#16A34A" }}>Our AI-Powered Approach</span>
              </div>
              <div className="px-6 py-4 border-l border-slate-200">
                <span className="text-xs font-black tracking-wider text-slate-400 uppercase">Typical Competitors</span>
              </div>
            </div>

            {/* Rows */}
            {[
              {
                area: "Keyword Research",
                ours: "AI analyzes search intent, clustering, and user behavior patterns in real time",
                theirs: "Manual keyword lists based on tools and guesswork",
              },
              {
                area: "Content Strategy",
                ours: "Topic modeling, semantic SEO, and NLP-based content planning",
                theirs: "Generic blog topics and repetitive content calendars",
              },
              {
                area: "Ranking Growth",
                ours: "Predictive ranking analysis identifies the fastest ranking opportunities",
                theirs: "Reactive optimization after ranking drops",
              },
              {
                area: "Technical SEO",
                ours: "Automated site audits, crawl diagnostics, and priority-based fixes",
                theirs: "Periodic audits are done manually",
              },
              {
                area: "Conversion Optimization",
                ours: "AI learns which pages convert and optimizes them continuously",
                theirs: "Static landing pages are rarely updated",
              },
              {
                area: "User Experience Optimization",
                ours: "Behavior tracking, heat-mapping signals, engagement prediction",
                theirs: "Focus mostly on meta tags and backlinks",
              },
              {
                area: "Competitor Tracking",
                ours: "Real-time SERP monitoring and algorithm shift detection",
                theirs: "Monthly competitor reports",
              },
              {
                area: "Performance Reporting",
                ours: "Automated dashboards showing revenue-driven SEO impact",
                theirs: "Traffic-only reporting",
              },
            ].map(({ area, ours, theirs }, i, arr) => (
              <div
                key={i}
                className="grid grid-cols-[1.2fr_1.8fr_1.8fr]"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none" }}
              >
                <div className="px-6 py-5">
                  <p className="font-bold text-slate-900 text-sm">{area}</p>
                </div>
                <div className="px-6 py-5 border-l border-slate-100">
                  <p className="text-slate-600 text-sm leading-relaxed">{ours}</p>
                </div>
                <div className="px-6 py-5 border-l border-slate-100">
                  <p className="text-slate-400 text-sm leading-relaxed">{theirs}</p>
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
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight" style={{ color: "#2563EB" }}>
              AI-Powered SEO Services
            </h2>
          </m.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8 items-start max-w-6xl mx-auto">

            {/* Left — still have questions card */}
            <m.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden text-center"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/faq-woman.png"
                alt="Still have questions?"
                className="w-full object-cover"
                style={{ maxHeight: 240 }}
              />
              <div className="px-8 py-7">
                <h3 className="text-lg font-black text-slate-900 mb-2">Still Have Questions?</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Can&apos;t find the answer you&apos;re looking for? Our AI SEO experts are ready to help you get started.
                </p>
                <Link
                  href="#get-started"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "#2563EB" }}
                >
                  Ask Our AI SEO Experts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </m.div>

            {/* Right — accordion list */}
            <m.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              {[
                { q: "Q1. What are AI-powered SEO services, and how do they work?", a: "AI-powered SEO services use machine learning, natural language processing, and predictive analytics to automate keyword research, content optimisation, and ranking strategies — delivering faster, more accurate results than manual SEO." },
                { q: "Q2. How can a digital marketing agency use AI-powered SEO services to improve rankings?", a: "Agencies apply AI to analyse competitor gaps, map search intent at scale, and continuously adjust on-page signals so clients rank for high-value queries faster than with traditional methods." },
                { q: "Q3. Which SEO method provides more effective results: AI-powered SEO services or traditional SEO methods?", a: "AI-powered SEO consistently outperforms traditional methods because it processes real-time data, identifies opportunities instantly, and adapts to algorithm changes before rankings drop." },
                { q: "Q4. Do your AI-powered SEO Services enhance my website traffic?", a: "Yes — our clients typically see measurable organic traffic growth within 60–90 days, driven by precise content targeting and technical improvements guided by AI analysis." },
                { q: "Q5. How does my small business take advantage of AI SEO?", a: "Small businesses benefit most from AI SEO's efficiency: you get enterprise-level insights and content output at a fraction of the cost, levelling the playing field against larger competitors." },
                { q: "Q6. How long do AI-powered SEO services take to show results?", a: "Initial ranking improvements are typically visible in 60–90 days. Significant traffic and revenue impact usually builds over 4–6 months as the AI continuously refines your strategy." },
                { q: "Q7. Do AI-powered SEO services replace human SEO experts?", a: "No — AI handles data processing, pattern recognition, and content drafting while human experts provide strategy, editorial quality control, and client communication." },
                { q: "Q8. Can you trust AI-powered SEO services to maintain your Google rankings?", a: "Our AI monitors SERP positions and algorithm signals daily, triggering proactive adjustments before rankings slip — making it far more reliable than reactive manual monitoring." },
                { q: "Q9. Do AI-powered SEO services boost website conversions for websites while they improve search engine rankings?", a: "Yes. Our AI analyses user behaviour to optimise landing pages, calls-to-action, and content flow simultaneously — increasing both visibility and the percentage of visitors who convert." },
                { q: "Q10. Which industries are best suited for AI-powered SEO services?", a: "AI SEO works across all industries but delivers the strongest ROI in high-competition verticals like e-commerce, healthcare, real estate, legal, finance, and SaaS." },
                { q: "Q11. Do AI-powered SEO services help local SEO?", a: "Absolutely. Our AI optimises Google Business Profiles, local citations, and geo-targeted content clusters to boost visibility in local pack and map results." },
                { q: "Q12. What are the top reasons for choosing your digital marketing agency for AI-powered SEO services?", a: "Clients choose us for our proprietary AI pipeline, transparent reporting, human-reviewed content quality, proven track record across industries, and a results-based pricing model." },
              ].map(({ q, a }, i, arr) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="cursor-pointer"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none" }}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <div className="flex items-center justify-between px-6 py-4 gap-4">
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
                          <p className="px-6 pb-4 text-sm text-slate-500 leading-relaxed">{a}</p>
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

        {/* Purple top banner */}
        <div className="px-4 md:px-8 pt-10 pb-0">
          <div className="container mx-auto">
            <m.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-7"
              style={{ background: "linear-gradient(135deg, #6D28D9 0%, #7C3AED 60%, #8B5CF6 100%)" }}
            >
              {/* Decorative circles */}
              <div className="absolute right-0 top-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)", transform: "translate(30%,-30%)" }} />
              <div className="absolute right-16 top-4 w-28 h-28 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-black text-white mb-1">Ready to Dominate AI-Powered Search?</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Get a free AI SEO audit and discover how to turn intelligent search into measurable growth.
                </p>
              </div>
              <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="relative z-10 flex-shrink-0">
                <Link
                  href="#get-started"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white"
                  style={{ color: "#6D28D9" }}
                >
                  Get Your Free AI Audit <ArrowRight className="w-4 h-4" />
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
                  Let&apos;s <span style={{ color: "#2563EB" }}>Get Started</span>
                </h2>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text" placeholder="Your Name*" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                    style={{ borderBottom: "1.5px solid #CBD5E1" }}
                  />
                  <input
                    type="email" placeholder="Business Email*" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                    style={{ borderBottom: "1.5px solid #CBD5E1" }}
                  />

                  {/* Phone — bordered box */}
                  <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden text-sm">
                    <div className="flex items-center gap-1.5 px-3 py-2.5 border-r border-slate-300 bg-slate-50 flex-shrink-0">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="text-xs text-slate-600 bg-transparent outline-none"
                      >
                        {[["US","+1"],["GB","+44"],["AU","+61"],["IN","+91"],["DE","+49"],["FR","+33"],["JP","+81"]].map(([c, code]) => (
                          <option key={code} value={code}>{c} {code}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="tel" placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                    />
                  </div>

                  <select
                    value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full pb-2 text-sm bg-transparent outline-none"
                    style={{ borderBottom: "1.5px solid #CBD5E1", color: formData.budget ? "#1E293B" : "#94A3B8" }}
                  >
                    <option value="">Select Budget</option>
                    {["Under $1,000","$1,000–$3,000","$3,000–$5,000","$5,000–$10,000","$10,000+"].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <textarea
                    rows={4} placeholder="Tell us about your project*" value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pb-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                    style={{ borderBottom: "1.5px solid #CBD5E1" }}
                  />
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
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="relative rounded-2xl overflow-hidden p-8 md:p-10"
                style={{ background: "#DC2626" }}
              >
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-44 h-44 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.08)", transform: "translate(30%,-30%)" }} />
                <div className="absolute bottom-0 right-12 w-24 h-24 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.05)" }} />

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
                    <div
                      key={i}
                      className="py-4"
                      style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none" }}
                    >
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
