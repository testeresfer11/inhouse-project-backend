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
  BookOpen, Mic, HelpCircle, List, Code2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const ACCENT = "#2563EB";
const ACCENT_LIGHT = "#EFF6FF";
const GREEN = "#16A34A";

const HERO_STATS = [
  { icon: ScanSearch, value: "1,200+", label: "Sites Audited",         color: "#F97316" },
  { icon: TrendingUp, value: "210%",   label: "Avg Traffic Growth",    color: GREEN },
  { icon: CheckCircle2, value: "850+", label: "Issues Fixed",          color: ACCENT },
  { icon: Users,      value: "99%",    label: "Client Satisfaction",   color: "#7C3AED" },
];

const FAQS = [
  { q: "What is an SEO audit and why do I need one?",                         a: "An SEO audit is a comprehensive analysis of your website's technical health, on-page optimisation, content quality, and backlink profile. It identifies everything that is preventing your site from ranking higher — from crawl errors and slow load times to thin content and missing schema — and gives you a prioritised action plan to fix them." },
  { q: "How long does a professional SEO audit take?",                        a: "Our standard SEO audit is delivered within 5–7 business days. Enterprise audits covering sites with thousands of pages may take 10–14 days. Every audit includes a detailed report and a strategy call to walk you through the findings and prioritise the next steps." },
  { q: "What does your SEO audit cover?",                                      a: "Our audit covers technical SEO (crawlability, indexation, site speed, Core Web Vitals, mobile usability), on-page SEO (titles, meta descriptions, heading structure, content quality), off-page SEO (backlink profile, toxic links, domain authority), local SEO signals, schema markup, and competitor benchmarking." },
  { q: "How much does an SEO audit cost?",                                    a: "SEO audit pricing depends on the size and complexity of your website. We offer audits for small business sites, mid-market sites, and enterprise platforms. Contact us for a personalised quote — we also offer a free initial site review to assess your needs before recommending the right audit package." },
  { q: "Will the audit tell me exactly what to fix?",                         a: "Yes. Every issue we identify comes with a clear priority level (critical, high, medium, low), a plain-English explanation of why it matters, and specific implementation instructions your developer or content team can act on immediately. We do not deliver data dumps — we deliver actionable roadmaps." },
  { q: "Can you fix the issues found in the audit?",                          a: "Absolutely. Most clients choose to engage our team for implementation after the audit. We offer technical SEO implementation, content optimisation, link profile cleanup, and schema deployment — ensuring every recommendation is executed correctly and efficiently." },
  { q: "How is your SEO audit different from free tools?",                    a: "Free tools give you raw data. Our audit gives you expert interpretation, business context, and a prioritised action plan. We identify the 20% of issues causing 80% of your ranking problems, benchmark you against top competitors, and deliver recommendations that are specific to your site architecture and business goals." },
  { q: "How often should I get an SEO audit?",                                a: "We recommend a full SEO audit once per year as a minimum, with quarterly technical health checks in between. If your site undergoes a major redesign, CMS migration, or significant content change, an audit should happen before and after to protect your rankings." },
  { q: "Will an SEO audit improve my Google rankings?",                       a: "The audit itself is the diagnostic. Rankings improve when you implement the recommendations. Our clients typically see measurable ranking improvements within 60–90 days of acting on the audit findings, with compounding gains as more issues are resolved." },
  { q: "Do you audit e-commerce sites?",                                      a: "Yes. E-commerce audits include all standard checks plus faceted navigation crawl management, product page duplication, category architecture, structured data for products and reviews, and crawl budget optimisation — all critical for large catalogue sites to perform in search." },
  { q: "What is a technical SEO audit?",                                      a: "A technical SEO audit focuses exclusively on the behind-the-scenes factors that affect how search engines crawl, render, and index your site. This includes XML sitemaps, robots.txt, canonical tags, hreflang, structured data, page speed, Core Web Vitals, JavaScript rendering, HTTPS, and internal linking architecture." },
  { q: "How do I get started with an SEO audit?",                             a: "Simply fill in the contact form below or book a free discovery call. We will review your site, understand your goals, and recommend the right audit package. Most clients have their audit brief confirmed within 24 hours of getting in touch." },
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
export function SeoAuditPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [openServiceCard, setOpenServiceCard] = useState<number | null>(null);

  return (
    <div className="font-sans antialiased overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[82vh] flex flex-col justify-end" style={{ background: "#0B0F1A" }}>
        <div className="absolute inset-0 overflow-hidden">
          <img src="/ai-seo-hero.jpg" alt="SEO Audit hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,15,26,0.88) 50%, rgba(11,15,26,0.35) 100%)" }} />
        </div>

        <div className="relative container mx-auto px-6 md:px-12 pt-32 pb-0 w-full">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services/seo" className="hover:text-white transition-colors">SEO</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "#F97316" }}>SEO Audit</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-7"
            style={{
              border: "1px solid rgba(249,115,22,0.6)",
              background: "rgba(249,115,22,0.08)",
              color: "#F97316",
            }}>
            <BadgeCheck className="w-3.5 h-3.5" />
            #1 SEO AUDIT SERVICES PROVIDER
          </div>

          <h1 className="font-black leading-tight mb-5 max-w-5xl"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)" }}>
            <span style={{ color: "#F97316" }}>Identify Every Issue Holding</span>
            {" "}
            <span className="text-white" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
              Back Your Rankings with an SEO Audit
            </span>
          </h1>

          <p className="text-slate-300 max-w-md leading-relaxed mb-10" style={{ fontSize: "0.925rem" }}>
            As the most trusted SEO audit provider, Top SEO Services delivers comprehensive website
            audits that uncover technical errors, content gaps, and off-page weaknesses — giving you
            a clear, prioritised roadmap to higher rankings and more organic traffic.
          </p>

          <div className="mb-0 pb-14">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#F97316", boxShadow: "0 4px 20px rgba(249,115,22,0.45)" }}>
              Book a Free SEO Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative w-full bg-white" style={{ borderTop: "1px solid #E2E8F0" }}>
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
            {HERO_STATS.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="flex items-center gap-4 py-6 px-6 first:pl-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: color + "18" }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <div className="text-2xl font-black leading-none" style={{ color }}>
                    <AnimatedNumber value={value} />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN SEO AUDIT ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              What is an SEO Audit Exactly
              <br />and<br />
              <span style={{ color: "#2563EB" }}>Why Does it Matter?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="relative flex items-end justify-center" style={{ minHeight: 380 }}>
              <div className="absolute rounded-2xl overflow-hidden shadow-2xl"
                style={{ width: "62%", top: 0, left: 0, transform: "rotate(-3deg)", zIndex: 1 }}>
                <img src="/cta-meeting-analytics.png" alt="SEO Audit team" className="w-full h-auto object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ width: "62%", marginLeft: "auto", marginTop: 60, transform: "rotate(2deg)", zIndex: 2 }}>
                <img src="/cta-laptop-analytics.png" alt="SEO Audit report" className="w-full h-auto object-cover" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "#F97316", zIndex: 3 }}>
                  <BarChart3 className="w-3.5 h-3.5 text-white flex-shrink-0" />
                  <div>
                    <div className="text-white text-[11px] font-bold leading-tight">210% Traffic Growth</div>
                    <div className="text-orange-100 text-[9px] leading-tight">Average post-audit improvement</div>
                  </div>
                </div>
              </div>
              <div className="absolute flex items-center gap-2.5 bg-white rounded-2xl shadow-lg px-4 py-3"
                style={{ bottom: -10, left: 10, zIndex: 4, border: "1px solid #F1F5F9" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EFF6FF" }}>
                  <CheckCircle2 className="w-4 h-4" style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <div className="text-slate-900 text-[13px] font-black leading-tight">850+ Issues Fixed</div>
                  <div className="text-slate-400 text-[10px] leading-tight">Across audited client sites</div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-slate-600 leading-relaxed mb-5" style={{ fontSize: "0.975rem" }}>
                An SEO audit is a full diagnostic of your website — examining technical infrastructure,
                on-page content, internal linking, page speed, Core Web Vitals, mobile usability, and
                backlink health. It reveals precisely why your site is underperforming in search and
                maps every barrier between your current rankings and your target positions.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8" style={{ fontSize: "0.975rem" }}>
                Without a professional SEO audit, you are optimising blind. Our audits surface the
                hidden technical errors, content gaps, and authority signals that search engines penalise
                — giving your team a clear, prioritised action plan to recover and grow.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90"
                style={{ background: "#2563EB" }}>
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPREHENSIVE SEO AUDIT SERVICES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Comprehensive SEO Audit Services to{" "}
              <span style={{ color: ACCENT }}>Fix & Grow Your Rankings</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              At Top SEO Services, our audits go beyond a basic checklist. We analyse every dimension
              of your site&apos;s search performance — technical, content, authority, and user experience
              — to deliver a prioritised roadmap your team can act on immediately.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Settings2,
                image: "/local-card-audit.png",
                title: "Technical SEO Audit",
                desc: "We crawl your entire site to identify crawl errors, broken links, redirect chains, duplicate content, indexation issues, canonical problems, and XML sitemap errors — the technical blockers search engines penalise most severely.",
              },
              {
                icon: FileText,
                image: "/local-card-map-pack.png",
                title: "On-Page SEO Audit",
                desc: "Every page is evaluated for title tag optimisation, meta description quality, heading structure, keyword alignment, content depth, internal linking, and schema markup — with specific fixes for each underperforming element.",
              },
              {
                icon: Link2,
                image: "/local-card-citations.png",
                title: "Backlink & Authority Audit",
                desc: "We analyse your entire backlink profile to identify toxic links, assess your domain authority relative to competitors, and highlight link-building opportunities that will move the needle on your domain strength.",
              },
              {
                icon: Gauge,
                image: "/local-card-location-pages.png",
                title: "Core Web Vitals & Speed Audit",
                desc: "We assess your Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint, and overall page speed across desktop and mobile — identifying every performance bottleneck and the specific code-level fixes to resolve them.",
              },
              {
                icon: Brain,
                image: "/local-card-consulting.png",
                title: "Content Gap Analysis",
                desc: "We map your existing content against your target keyword landscape and competitor content libraries to identify the topics, pages, and query clusters your site is missing — turning gaps into ranking opportunities.",
              },
              {
                icon: MonitorCheck,
                image: "/cta-laptop-analytics.png",
                title: "Competitor Benchmarking",
                desc: "Every audit includes a side-by-side comparison of your technical health, content depth, backlink authority, and keyword coverage against your top 3–5 organic competitors — revealing exactly where to prioritise effort for the fastest gains.",
              },
            ].map((card, i) => {
              const isOpen = openServiceCard === i;
              return (
                <div key={i}
                  className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                  style={{ minHeight: 280 }}>
                  {isOpen ? (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center p-7 text-center"
                      style={{ background: ACCENT }}>
                      <button
                        onClick={() => setOpenServiceCard(null)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-base leading-none transition-opacity hover:opacity-80"
                        style={{ background: "#DC2626" }}>
                        ×
                      </button>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                        style={{ background: "rgba(255,255,255,0.15)" }}>
                        <card.icon className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-white text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  ) : (
                    <>
                      <div className="relative h-52 w-full overflow-hidden">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => setOpenServiceCard(i)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-lg leading-none shadow-lg transition-opacity hover:opacity-90"
                          style={{ background: ACCENT }}>
                          +
                        </button>
                      </div>
                      <div className="bg-white px-5 py-4">
                        <h3 className="font-black text-slate-900 text-sm">{card.title}</h3>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DARK IMAGE CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl overflow-hidden" style={{ background: "#0B0F1A", minHeight: 220 }}>
            <div className="absolute inset-y-0 left-0 w-2/5 overflow-hidden">
              <img src="/local-cta-analytics.png" alt="SEO Audit analytics" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, #0B0F1A)" }} />
            </div>
            <div className="relative ml-auto w-full md:w-3/5 px-10 md:pl-16 md:pr-14 py-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">
                <span className="text-white">Don&apos;t Know Why Your </span>
                <span style={{ background: "linear-gradient(90deg, #60A5FA, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Rankings Are Dropping?
                </span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-7 max-w-md">
                Our SEO audit experts identify every technical error, content gap, and authority issue
                preventing your site from ranking — and hand you a prioritised fix list.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Get Your Free Site Review <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW AN SEO AUDIT HELPS YOUR BUSINESS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              How an SEO Audit Helps{" "}
              <span style={{ color: ACCENT }}>Your Business Grow</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              An SEO audit is the foundation of every successful organic growth strategy. By revealing
              exactly what is holding your site back, it directs your resources to the highest-impact
              fixes — accelerating rankings, traffic, and revenue.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", icon: ScanSearch,  color: "#2563EB", title: "Uncover Hidden Technical Blockers",    desc: "Search engines cannot rank what they cannot crawl. Our audit surfaces every crawl error, broken redirect, slow page, and indexation issue your dev team may have missed — the technical barriers that silently suppress your entire site's visibility." },
              { num: "02", icon: FileText,    color: "#16A34A", title: "Eliminate Thin & Duplicate Content",   desc: "Google penalises thin, duplicate, and near-duplicate content. Our content audit identifies every page cannibalising your own rankings or diluting your topical authority — giving you a clear content consolidation and optimisation plan." },
              { num: "03", icon: Link2,       color: "#DC2626", title: "Clean Up Toxic Backlinks",             desc: "A single cluster of spammy backlinks can trigger a Google penalty and erase years of ranking progress. Our backlink audit identifies toxic links, guides disavow strategy, and benchmarks your domain authority against your top competitors." },
              { num: "04", icon: Gauge,       color: "#D97706", title: "Improve Core Web Vitals Scores",       desc: "Since Google's Page Experience update, Core Web Vitals are a direct ranking signal. Our performance audit pinpoints exactly which LCP, CLS, and INP issues are hurting your rankings and provides developer-ready fixes." },
              { num: "05", icon: BarChart3,   color: ACCENT,    title: "Outperform Competitors Strategically", desc: "Our competitive gap analysis reveals the exact pages, keywords, and content topics where your competitors outrank you — and why. You leave with a prioritised plan to take their positions systematically." },
              { num: "06", icon: Globe,       color: "#0D9488", title: "Boost Mobile & International Reach",   desc: "We audit your mobile experience, hreflang implementation, and international SEO signals to ensure your site performs across every device and market your customers use — not just desktop English-language search." },
              { num: "07", icon: ShieldCheck, color: "#DC2626", title: "Protect Against Algorithm Updates",    desc: "Our audits align your site with Google's current quality signals — E-E-A-T, helpful content, spam policies, and link guidelines — so algorithm updates strengthen rather than punish your rankings." },
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
                    boxShadow: isHovered ? `0 8px 32px ${color}44` : "0 1px 4px rgba(0,0,0,0.05)",
                    transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: isHovered ? "rgba(255,255,255,0.2)" : color + "15", transition: "background 0.25s ease" }}>
                      <Icon className="w-5 h-5" style={{ color: isHovered ? "white" : color, transition: "color 0.25s ease" }} />
                    </div>
                    <span className="text-4xl font-black leading-none select-none"
                      style={{ color: isHovered ? "rgba(255,255,255,0.2)" : "#F1F5F9", transition: "color 0.25s ease" }}>
                      {num}
                    </span>
                  </div>
                  <h3 className="font-black text-base mb-3"
                    style={{ color: isHovered ? "white" : "#0F172A", transition: "color 0.25s ease" }}>
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed flex-1"
                    style={{ color: isHovered ? "rgba(255,255,255,0.8)" : "#64748B", transition: "color 0.25s ease" }}>
                    {desc}
                  </p>
                  <div className="mt-5 h-0.5 w-10 rounded-full"
                    style={{ background: isHovered ? "rgba(255,255,255,0.5)" : color, transition: "background 0.25s ease" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW SEO AUDIT HELPS BUSINESSES GROW ── */}
      <section className="py-20" style={{ background: "#f0f8ff" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              How SEO Audit Services Help Modern
              <br />
              <span style={{ color: ACCENT }}>Businesses to Grow</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Your website needs comprehensive website SEO audit services to discover its potential
              because the auditing process will identify improvement areas, while the team will resolve
              major website issues to enhance your online growth through data-driven insights and
              strategic website enhancement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Search,
                color: "#2563EB",
                title: "Identify and Resolve Website Issues",
                desc: "Discover key errors such as broken links, crawl errors, and other technical glitches that adversely impact your rankings. Our in-depth audits show hidden issues that literally stop search engines from indexing your website.",
              },
              {
                icon: TrendingUp,
                color: "#DC2626",
                title: "Enhance Search Engine Rankings",
                desc: "Optimize the on-page elements, meta tags, and content structure to enhance your site's presence in the search results. Therefore, strategic improvements help you outrank competitors and gain top positions for valuable keywords.",
              },
              {
                icon: Zap,
                color: "#D97706",
                title: "Amplify User Experience and Website Performance",
                desc: "An eye-catching UX (user experience) eventually enhances page speed, mobile responsiveness, and proper navigation flow. Along with this, it keeps the targeted users engaged for a long time and reduces bounce rates.",
              },
              {
                icon: Users,
                color: "#16A34A",
                title: "Get Organic Traffic",
                desc: "Target valuable and high-volume keywords and implement a relevant content strategy to engage visitors. More visibility directly means more clicks from people actively searching for your product or solutions.",
              },
              {
                icon: BarChart3,
                color: "#2563EB",
                title: "Improved Conversion Rates",
                desc: "The combination of strategic CTAs and landing page optimization enables successful SEO enhancements to achieve conversion targets. By converting additional website visitors into tangible business outcomes, businesses can attain continuous revenue growth.",
              },
              {
                icon: Eye,
                color: "#DC2626",
                title: "Enhance Brand Visibility",
                desc: "Improved search engine results should enhance your online brand presence as you establish your business authority in your specific field. Your brand's enhanced visibility creates trust among customers, who will remember it when they need it.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title}
                className="rounded-2xl bg-white border border-slate-200 p-7 flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.12)]"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <Icon className="w-6 h-6 mb-5" style={{ color }} strokeWidth={1.8} />
                <h3 className="font-bold text-[15px] leading-snug mb-3" style={{ color }}>{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL ISSUES CTA ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center"
            style={{ background: "#1A1F2E", minHeight: 200 }}>
            <div className="relative z-10 flex-1 px-10 md:px-14 py-12 md:py-10">
              <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">
                <span className="text-white">Losing Rankings to </span>
                <span style={{ color: "#F97316", fontStyle: "italic" }}>Technical SEO Errors?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                Our technical SEO audit pinpoints every crawl error, slow page, and broken signal
                that is costing you rankings — with developer-ready fixes included.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: "#F97316" }}>
                Fix My Technical SEO <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-[48%] self-end overflow-hidden">
              <img src="/cta-laptop-analytics.png" alt="SEO audit dashboard"
                className="w-full h-auto object-cover object-top"
                style={{ borderRadius: "0 1.5rem 1.5rem 0", maxHeight: 260 }} />
              <div className="absolute inset-y-0 left-0 w-24"
                style={{ background: "linear-gradient(to right, #1A1F2E, transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP BENEFITS FOR SEO AUDIT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Top Reasons Why a Website Audit
              <br />
              <span style={{ color: ACCENT }}>Matters the Most</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              The website audit process establishes essential elements that help maintain your
              website&apos;s search performance while providing users with optimal experiences and
              defending against algorithm modifications. Here is why website audit services matter
              the most.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: Search,
                color: "#2563EB",
                title: "Uncover Hidden Technical Errors",
                desc: "At some point, the website witnessed regular ranking issues because its broken links, slow loading time, mobile problems, and crawl failures acted as hidden pointers.",
              },
              {
                icon: Target,
                color: "#DC2626",
                title: "Skyrocket Local Search Presence",
                desc: "Sometimes, the business needs to find out missing schema markup, NAP data inconsistencies, and local SEO errors to stop Google from accessing information about the business.",
              },
              {
                icon: Zap,
                color: "#D97706",
                title: "Elevate User Experience",
                desc: "The research reveals several navigation challenges, irrelevant design elements, and conversion hurdles that stop potential customers from engaging with your business.",
              },
              {
                icon: BarChart3,
                color: "#16A34A",
                title: "Stand Out from Competitors",
                desc: "The key strategies implemented by the leading competitors are available, and you can adapt them to gain a highly competitive edge in your local market.",
              },
              {
                icon: DollarSign,
                color: "#2563EB",
                title: "Maximize ROI on Marketing",
                desc: "Marketers should cease their financial waste on campaigns that drive users to broken websites and poorly designed pages that fail to bring in new customers.",
              },
              {
                icon: ShieldCheck,
                color: "#DC2626",
                title: "Adapt to Algorithm Changes",
                desc: "Routine audits help websites stay in line with the latest best practices. Furthermore, this approach safeguards against the penalties and restrictions that can hit unexpectedly due to the latest Google algorithm updates.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title}
                className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.12)]"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <Icon className="w-6 h-6 mb-5" style={{ color }} strokeWidth={1.8} />
                <h3 className="font-bold text-[15px] leading-snug mb-3" style={{ color }}>{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm"
              style={{ background: ACCENT }}>
              Discuss Your SEO Audit Needs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── ORGANIC TRAFFIC CTA BANNER ── */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[220px]"
            style={{ background: "#1A1F2E" }}>
            <div className="md:w-[46%] flex-shrink-0 relative min-h-[220px]">
              <img src="/cta-meeting-analytics.png" alt="SEO consultation meeting"
                className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to right, transparent 55%, #1A1F2E)" }} />
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-10 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                Ready to Turn Organic Traffic Into
              </h2>
              <p className="text-xl md:text-2xl font-black italic mb-5" style={{ color: "#F97316" }}>
                Predictable Revenue?
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-md">
                Our SEO team builds scalable organic growth systems backed by data, content
                excellence, and technical precision that grow your business month over month.
              </p>
              <div>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                  style={{ background: "#F97316" }}>
                  Request a Free SEO Consultation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Straightforward SEO Audit
              <br />
              <span style={{ color: ACCENT }}>Process We Follow</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              For a successful white-label SEO audit, we use a simple methodology. This includes
              the usage of advanced tools and expert analysis to discover hidden opportunities,
              solve complex problems, and create a successful website path.
            </p>
          </div>

          {/* Staggered 4-card row */}
          <div className="hidden lg:flex items-start gap-5 mb-6">
            {[
              {
                icon: Search,
                iconColor: "#2563EB",
                iconBg: "#EFF6FF",
                title: "Website\nData Fetch",
                desc: "Our SEO professionals uses utilizes SEO tools and methodologies to perform a detailed website crawling. Here, the process gathers all critical data regarding your website's technical performance, quality of content, backlink structure, keywords, and user experience metrics, which eventually influence search visibility.",
                mt: 0,
              },
              {
                icon: BarChart3,
                iconColor: "#F97316",
                iconBg: "#FFF7ED",
                title: "Analyze Data &\nGenerate Insights",
                desc: "The SEO professionals analyze the collected data to figure out the best patterns that lead them to discover errors that influence rankings. The experts use the data to find successful opportunities while assessing your local market position against your competitors.",
                mt: 48,
              },
              {
                icon: Layers,
                iconColor: "#EC4899",
                iconBg: "#FDF2F8",
                title: "Provide Personalized\nRecommendations",
                desc: "We deliver a customized action plan, which we arrange according to which elements will create the most substantial effect. The business will receive clear and specific strategies that perfectly match their business objectives, budget limitations, and technical capabilities to achieve the most effective results.",
                mt: 96,
              },
              {
                icon: FileText,
                iconColor: "#16A34A",
                iconBg: "#F0FDF4",
                title: "Consultation &\nDetailed Reporting",
                desc: "Lastly, you will get an inclusive audit report that comprises visual data and listings of the vital issues that demand resolution. Moreover, the consultation will showcase the key findings.",
                mt: 24,
              },
            ].map(({ icon: Icon, iconColor, iconBg, title, desc, mt }) => (
              <div key={title} className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 flex flex-col text-center transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.12)]"
                style={{ marginTop: mt, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 mx-auto"
                  style={{ background: iconBg }}>
                  <Icon className="w-5 h-5" style={{ color: iconColor }} strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-4 whitespace-pre-line">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile fallback: flat grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 lg:hidden">
            {[
              { icon: Search,    iconColor: "#2563EB", iconBg: "#EFF6FF", title: "Website Data Fetch",                  desc: "Our SEO professionals uses utilizes SEO tools and methodologies to perform a detailed website crawling. Here, the process gathers all critical data regarding your website's technical performance, quality of content, backlink structure, keywords, and user experience metrics, which eventually influence search visibility." },
              { icon: BarChart3, iconColor: "#F97316", iconBg: "#FFF7ED", title: "Analyze Data & Generate Insights",     desc: "The SEO professionals analyze the collected data to figure out the best patterns that lead them to discover errors that influence rankings. The experts use the data to find successful opportunities while assessing your local market position against your competitors." },
              { icon: Layers,    iconColor: "#EC4899", iconBg: "#FDF2F8", title: "Provide Personalized Recommendations", desc: "We deliver a customized action plan, which we arrange according to which elements will create the most substantial effect. The business will receive clear and specific strategies that perfectly match their business objectives, budget limitations, and technical capabilities to achieve the most effective results." },
              { icon: FileText,  iconColor: "#16A34A", iconBg: "#F0FDF4", title: "Consultation & Detailed Reporting",    desc: "Lastly, you will get an inclusive audit report that comprises visual data and listings of the vital issues that demand resolution. Moreover, the consultation will showcase the key findings." },
            ].map(({ icon: Icon, iconColor, iconBg, title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col text-center transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.12)]"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 mx-auto" style={{ background: iconBg }}>
                  <Icon className="w-5 h-5" style={{ color: iconColor }} strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-4">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative flex items-center justify-between py-6 px-4 md:px-10 mt-4">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-[26px] h-[2px] mx-12 md:mx-16"
              style={{ background: "linear-gradient(to right, #2563EB 0%, #F97316 33%, #EC4899 66%, #16A34A 100%)" }} />
            {[
              { label: "Step 01", color: "#2563EB", dot: true },
              { label: "Step 02", color: "#F97316", dot: true },
              { label: "Step 03", color: "#EC4899", dot: true },
              { label: "Step 04", color: "#16A34A", dot: false },
            ].map(({ label, color, dot }) => (
              <div key={label} className="flex flex-col items-center gap-2 relative z-10">
                {dot ? (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center border-2"
                    style={{ background: "white", borderColor: color }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: color }}>
                    <Send className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Bottom CTA button */}
          <div className="flex justify-center mt-8">
            <a href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm"
              style={{ background: ACCENT }}>
              Get Free SEO Audit Today <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE TOP SEO SERVICES ── */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Why Choose Top SEO Services for
              <br />
              <span style={{ color: ACCENT }}>Local SEO Audit</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Top SEO Services uses its technical skills and local market expertise to deliver
              scalable local SEO audits that identify problems and create solutions that drive
              actual business growth and success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              {
                num: "01", icon: TrendingUp,
                title: "Expertise",
                desc: "Our certified SEO professionals bring years of experience auditing websites across diverse industries. We possess expertise regarding local search algorithms, together with Google Business Profile optimization methods and all regional ranking factors that businesses need to know.",
              },
              {
                num: "02", icon: Eye,
                title: "Comprehensive Audit",
                desc: "We look at everything that affects how easily people can find you, including checking your technical SEO (search engine optimization), on-page optimization, content quality, local citations, backlinks, mobile experience, page speed, schema markup, and what your competitors are doing.",
              },
              {
                num: "03", icon: Cpu,
                title: "Tailored Solutions",
                desc: "No generic checklists here. We design our recommendations to align with your business objectives, target market, competitive environment, financial limits, and technical capabilities, ensuring practical results that you can implement.",
              },
              {
                num: "04", icon: FileText,
                title: "Detailed Reporting",
                desc: "You get reports that present information in an easy-to-read format with visual charts, action item priorities, severity ratings, and before-and-after comparisons. The report explains each issue, which will result in specific effects that will decrease your website ranking and traffic volume.",
              },
              {
                num: "05", icon: Layers,
                title: "Actionable Recommendation",
                desc: "We offer solutions that drive clients to resolve their problems through implementation guides that contain detailed step-by-step instructions, code examples, content templates, and resource recommendations, which empower your team to make improvements with full confidence and efficiency.",
              },
              {
                num: "06", icon: ShieldCheck,
                title: "Ongoing Support",
                desc: "The audit process includes follow-up consultations, which track progress while providing ongoing support throughout the entire evaluation period. We remain available to support you with all your inquiries while we work together to implement the necessary changes for your success.",
              },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={num}
                className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.12)]"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: ACCENT_LIGHT }}>
                    <Icon className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.8} />
                  </div>
                  <span className="text-base font-black" style={{ color: ACCENT }}>{num}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm"
              style={{ background: ACCENT }}>
              Enquire Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── IMAGE CTA ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: "linear-gradient(135deg,#0F172A 0%,#0c1a2e 100%)" }}>
            <div className="md:w-[46%] flex-shrink-0 relative min-h-[220px]">
              <img src="/cta-meeting-analytics.png" alt="SEO Audit consultation"
                className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent 60%,#0F172A)" }} />
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                Ready to Fix What&apos;s Holding Back{" "}
                <span style={{ color: ACCENT }}>Your Rankings?</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-7 max-w-md">
                Our SEO audit team delivers a complete diagnostic and prioritised fix list so you can
                stop guessing and start climbing search rankings with confidence.
              </p>
              <div>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Request a Free SEO Audit <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Frequently Asked Questions About{" "}
              <span style={{ color: ACCENT }}>SEO Audit Services</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Get answers to the most common questions about our professional SEO audit services.
            </p>
          </div>

          <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white">
              <img src="/faq-woman.png" alt="Still have questions?" className="w-full object-cover h-52" />
              <div className="p-6 text-center">
                <h3 className="text-lg font-black text-slate-900 mb-2">Still Have Questions?</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">
                  Can&apos;t find the answer you&apos;re looking for? Our SEO audit experts are ready to help.
                </p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Ask Our SEO Experts <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

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
              Ready to Discover What&apos;s Killing Your Rankings?
            </h2>
            <p className="text-green-100 text-sm max-w-md leading-relaxed">
              Get a free SEO audit review and discover every technical error, content gap, and
              authority issue that is preventing you from ranking where your business deserves to be.
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
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
                Let&apos;s{" "}
                <span style={{ color: "#16A34A" }}>Get Started</span>
              </h2>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name*"
                  className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white transition-colors" />
                <input type="email" placeholder="Business Email*"
                  className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white transition-colors" />
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-500 flex-shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                    <span>US +1</span>
                  </div>
                  <input type="tel" placeholder="Phone Number *"
                    className="flex-1 rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white transition-colors" />
                </div>
                <select className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white text-slate-500 transition-colors appearance-none">
                  <option value="">Select Budget</option>
                  <option value="under-1k">Under $1,000/mo</option>
                  <option value="1k-3k">$1,000 – $3,000/mo</option>
                  <option value="3k-5k">$3,000 – $5,000/mo</option>
                  <option value="5k-10k">$5,000 – $10,000/mo</option>
                  <option value="10k+">$10,000+/mo</option>
                </select>
                <textarea rows={4} placeholder="Tell us about your project*"
                  className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white resize-none transition-colors" />
                <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-white font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ background: "#16A34A" }}>
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>

            <div className="rounded-2xl p-8 text-white" style={{ background: "#DC2626" }}>
              <h3 className="text-2xl font-black mb-1">Hate Filling out Forms?</h3>
              <a href="mailto:info@topseoservices.co" className="text-red-200 underline text-sm mb-8 block">
                Email us.
              </a>
              <div className="space-y-0">
                {[
                  { label: "Request a Quote",                     email: "business@topseoservices.co" },
                  { label: "Partners Enquires",                   email: "partners@topseoservices.co" },
                  { label: "Reference Checks /Misc. HR Enquires", email: "hr@topseoservices.co" },
                  { label: "Other Enquires",                      email: "info@topseoservices.co" },
                ].map(({ label, email }, i, arr) => (
                  <div key={label}
                    className={`flex items-start gap-3 py-5${i < arr.length - 1 ? " border-b border-red-500" : ""}`}>
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-0.5">{label}</p>
                      <a href={`mailto:${email}`} className="text-red-200 text-xs hover:text-white transition-colors">{email}</a>
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
