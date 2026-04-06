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
const ACCENT = "#2563EB";          // blue
const ACCENT_LIGHT = "#EFF6FF";
const GREEN = "#16A34A";

const HERO_STATS = [
  { icon: MessageSquare, value: "5,000+", label: "Answers Optimized",    color: "#F97316" },
  { icon: TrendingUp,    value: "380%",   label: "Avg Visibility Growth", color: GREEN },
  { icon: Target,        value: "2,500+", label: "Snippets Won",          color: "#0891B2" },
  { icon: Users,         value: "98%",    label: "Client Retention",      color: "#7C3AED" },
];

const FAQS = [
  { q: "What are AEO services and how do they work?",                              a: "AEO (Answer Engine Optimization) services optimise your brand's content so that search engines and voice assistants select it as the direct answer to user queries. We structure your pages with FAQ schema, HowTo markup, and conversational content so Google, Alexa, Siri, and Bing Surface your brand in featured snippets and zero-click answers." },
  { q: "How can AEO services help my business grow?",                              a: "AEO captures high-intent users at the very top of the search results page — before they ever scroll. When your brand provides the answer, users arrive pre-qualified and trust you before the first click, dramatically increasing conversion rates and lowering acquisition costs." },
  { q: "Why is AEO important for voice search?",                                   a: "Over 50% of searches are now voice-based. Voice assistants read a single answer aloud — and AEO ensures that answer belongs to your brand. Without AEO, you are invisible to every voice-activated query in your category." },
  { q: "How does AEO improve customer engagement?",                                a: "When users receive direct, authoritative answers from your brand — whether on Google, Alexa, or Siri — engagement skyrockets. AEO reduces friction, answers objections instantly, and positions your brand as the most trusted resource in your niche." },
  { q: "What are the benefits of AEO for marketing?",                              a: "AEO delivers zero-click brand impressions at massive scale, authority positioning through featured snippets, voice search dominance, structured data advantages, reduced bounce rates, and compounding visibility gains — all without additional ad spend." },
  { q: "How can I track AEO performance?",                                         a: "We report monthly on featured snippet wins, voice answer captures, structured data coverage, click-through rates from answer boxes, and revenue attributed to zero-click and snippet-driven traffic across all major search platforms." },
  { q: "What is the difference between AEO and traditional SEO?",                  a: "Traditional SEO targets ranked blue links. AEO targets position zero — the answer box that appears above all results. AEO also optimises for voice search and AI assistants, capturing traffic that traditional SEO cannot reach because users never click beyond the answer." },
  { q: "How does AEO help businesses reach the right audience?",                   a: "AEO maps the exact questions your target audience asks search engines and voice devices, then structures your content to win those answer positions. Every snippet and voice answer is a precision-targeted touchpoint that reaches users at peak intent." },
  { q: "How do AEO services increase conversions and sales?",                      a: "Featured snippet traffic converts at rates 2–5× higher than standard organic clicks because the user's question has already been answered positively by your brand. AEO pre-sells your authority so visitors arrive ready to act, shortening every sales cycle." },
  { q: "What kind of businesses can benefit from AEO?",                            a: "Any brand in a research-heavy category — healthcare, legal, finance, SaaS, e-commerce, education, and professional services — benefits enormously. If your customers search for answers before buying, AEO ensures your brand is the answer they find." },
  { q: "Can AEO services improve mobile search visibility?",                       a: "Absolutely. Featured snippets and voice answers appear prominently on mobile devices where screen space is limited, making position zero even more valuable. Our AEO strategies are mobile-first, maximising your brand's presence on the devices your customers use most." },
  { q: "How do AEO services enhance brand authority?",                             a: "Consistently appearing as the answer source across thousands of queries builds category authority that competitors cannot easily replicate. Over time, AEO turns your brand into the recognised expert — the name users and search engines associate with trustworthy answers in your field." },
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
export function AeoPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [openServiceCard, setOpenServiceCard] = useState<number | null>(null);

  return (
    <div className="font-sans antialiased overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[82vh] flex flex-col justify-end" style={{ background: "#0B0F1A" }}>
        {/* Background photo */}
        <div className="absolute inset-0 overflow-hidden">
          <img src="/ai-seo-hero.jpg" alt="AEO hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,15,26,0.88) 50%, rgba(11,15,26,0.35) 100%)" }} />
        </div>

        <div className="relative container mx-auto px-6 md:px-12 pt-32 pb-0 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services/seo" className="hover:text-white transition-colors">SEO</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "#F97316" }}>AEO Services</span>
          </nav>

          {/* Badge — outlined pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-7"
            style={{
              border: "1px solid rgba(249,115,22,0.6)",
              background: "rgba(249,115,22,0.08)",
              color: "#F97316",
            }}>
            <BadgeCheck className="w-3.5 h-3.5" />
            #1 AEO SERVICES PROVIDER
          </div>

          {/* Headline */}
          <h1 className="font-black leading-tight mb-5 max-w-5xl"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)" }}>
            <span style={{ color: "#F97316" }}>Enhance Your Search Visibility</span>
            {" "}
            <span className="text-white" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
              with AEO Services
            </span>
          </h1>

          {/* Body */}
          <p className="text-slate-300 max-w-md leading-relaxed mb-10" style={{ fontSize: "0.925rem" }}>
            As the most trusted AEO service provider, Top SEO Services uses super-advanced tactics to
            place your brand in AI-generated search results, voice searches, and more, ensuring its
            future visibility. Our prime goal is to maintain your brand at the forefront in this
            competitive game.
          </p>

          {/* CTA */}
          <div className="mb-0 pb-14">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#F97316", boxShadow: "0 4px 20px rgba(249,115,22,0.45)" }}>
              Book a Free Discovery Session <ArrowRight className="w-4 h-4" />
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

      {/* ── WHAT DOES AEO MEAN ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              What does AEO Services Exactly Mean
              <br />and<br />
              <span style={{ color: "#2563EB" }}>Why Does it Matter?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* LEFT — stacked images */}
            <div className="relative flex items-end justify-center" style={{ minHeight: 380 }}>
              {/* Back image */}
              <div className="absolute rounded-2xl overflow-hidden shadow-2xl"
                style={{ width: "62%", top: 0, left: 0, transform: "rotate(-3deg)", zIndex: 1 }}>
                <img src="/cta-meeting-analytics.png" alt="AEO team" className="w-full h-auto object-cover" />
              </div>
              {/* Front image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ width: "62%", marginLeft: "auto", marginTop: 60, transform: "rotate(2deg)", zIndex: 2 }}>
                <img src="/cta-laptop-analytics.png" alt="AEO analytics" className="w-full h-auto object-cover" />
                {/* Orange pill on front image */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "#F97316", zIndex: 3 }}>
                  <BarChart3 className="w-3.5 h-3.5 text-white flex-shrink-0" />
                  <div>
                    <div className="text-white text-[11px] font-bold leading-tight">3.8× More Visibility</div>
                    <div className="text-orange-100 text-[9px] leading-tight">Average AEO performance lift</div>
                  </div>
                </div>
              </div>
              {/* White stat pill bottom-left */}
              <div className="absolute flex items-center gap-2.5 bg-white rounded-2xl shadow-lg px-4 py-3"
                style={{ bottom: -10, left: 10, zIndex: 4, border: "1px solid #F1F5F9" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EFF6FF" }}>
                  <MessageSquare className="w-4 h-4" style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <div className="text-slate-900 text-[13px] font-black leading-tight">2,500+ Snippets Won</div>
                  <div className="text-slate-400 text-[10px] leading-tight">Featured answers across clients</div>
                </div>
              </div>
            </div>

            {/* RIGHT — text */}
            <div>
              <p className="text-slate-600 leading-relaxed mb-5" style={{ fontSize: "0.975rem" }}>
                The process of creating Answer engine optimization strategies involves creating content
                through structured methods, which validate content and then distribute it to enable AI
                search engines to extract content for their direct answer presentation. Google, Bing, and
                AI assistants now give priority to summary content and overview information, which leads
                to zero-click results, making traditional SEO methods insufficient for achieving online
                visibility.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8" style={{ fontSize: "0.975rem" }}>
                AEO Services helps brands achieve AI response inclusion through its evaluation of answer
                clarity and entity relationships, topical depth, and trust signals.
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

      {/* ── COMPREHENSIVE AEO SERVICES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Comprehensive AEO Services to{" "}
              <span style={{ color: ACCENT }}>Boost Your Visibility</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              At Top SEO Services, we offer compelling AEO services for voice search optimization that help
              brands become primary AI sources by transforming their structured knowledge into accessible
              answers, which appear in Google AI overviews, as well as in voice search and upcoming
              discovery platforms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: BarChart3,
                image: "/local-card-map-pack.png",
                title: "AI Overview Optimization",
                desc: "We engineer your content to win Google AI Overviews by structuring authoritative Q&A blocks, entity-rich paragraphs, and schema markup that compels Google's AI to surface your brand as the primary answer source.",
              },
              {
                icon: ScanSearch,
                image: "/local-card-audit.png",
                title: "AI Visibility Intelligence",
                desc: "The system enables users to monitor their brand presence in AI search results through tracking and detection of unindexed items and potential answer ownership.",
              },
              {
                icon: Link2,
                image: "/local-card-citations.png",
                title: "Brand Mentions & EEAT Signals",
                desc: "We build the Experience, Expertise, Authoritativeness, and Trust signals that AI engines require before selecting a brand as a cited source — including expert authorship, digital PR, and mention acquisition.",
              },
              {
                icon: Globe,
                image: "/local-card-location-pages.png",
                title: "Programmatic GEO",
                desc: "We scale answer-optimised content across hundreds of location and topic variants programmatically — ensuring your brand holds featured snippet and voice-answer positions in every market you serve.",
              },
              {
                icon: Brain,
                image: "/local-card-consulting.png",
                title: "Semantic SEO & Entirety Optimization",
                desc: "We map your content to complete semantic topic clusters, ensuring AI engines see your site as the most comprehensive resource — not just a partial answer — for every query in your category.",
              },
              {
                icon: MonitorCheck,
                image: "/cta-laptop-analytics.png",
                title: "Continuous AI Search Performance",
                desc: "Monthly reporting covers featured snippet wins, voice answer captures, schema health, CTR from answer boxes, and revenue attributed to zero-click and AI-generated traffic — with ongoing optimisation included.",
              },
            ].map((card, i) => {
              const isOpen = openServiceCard === i;
              return (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                  style={{ minHeight: 280 }}>
                  {isOpen ? (
                    /* ── Expanded: blue overlay ── */
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
                    /* ── Default: photo + title + + button ── */
                    <>
                      <div className="relative h-52 w-full overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
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
              <img src="/local-cta-analytics.png" alt="AEO analytics" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, #0B0F1A)" }} />
            </div>
            <div className="relative ml-auto w-full md:w-3/5 px-10 md:pl-16 md:pr-14 py-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">
                <span className="text-white">Not Appearing in </span>
                <span style={{ background: "linear-gradient(90deg, #22D3EE, #0891B2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Featured Snippets?
                </span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-7 max-w-md">
                Our AEO experts structure your content so Google, Alexa, and Siri select your brand as
                the answer — putting you at position zero before every competitor.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Get Your Free AEO Audit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW AEO HELPS BUSINESSES GROW ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              How AEO Services Help{" "}
              <span style={{ color: ACCENT }}>Businesses to Grow</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Answer engine optimization connects your brand with high-intent searchers at the exact
              moment they need an answer. By owning position zero, you capture attention before
              competitors, build lasting authority, and drive conversions that compound over time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", icon: Eye,        color: "#2563EB", title: "Maximize Snippet Visibility",      desc: "Featured snippets appear above all organic results, capturing attention before users even see your competitors. AEO positions your brand at position zero — the most valuable real estate in search — for your highest-intent queries." },
              { num: "02", icon: Mic,         color: "#16A34A", title: "Dominate Voice Search",            desc: "Voice assistants read a single answer aloud. AEO ensures that answer is yours. By targeting conversational queries with speakable, structured content, your brand becomes the voice your customers hear when asking about your category." },
              { num: "03", icon: DollarSign,  color: "#DC2626", title: "Boost Revenue from Zero-Click",   desc: "Featured snippet impressions build brand trust at massive scale — even users who don't click see your brand as the authoritative source. When they're ready to buy, yours is the name they remember and search for directly." },
              { num: "04", icon: Flame,       color: "#D97706", title: "Strengthen Brand Authority",      desc: "Consistently appearing as the answer source across thousands of queries builds category leadership that compounds. Users and search engines alike come to associate your brand with credible, trustworthy expertise in your field." },
              { num: "05", icon: BarChart3,   color: ACCENT,    title: "Unlock Actionable Insights",      desc: "AEO analytics reveal which questions your audience asks most, which snippets convert best, and where competitors still hold positions you can displace — giving your content team a precision roadmap for high-ROI investment." },
              { num: "06", icon: Globe,       color: "#0D9488", title: "Expand Cross-Platform Reach",     desc: "AEO wins span Google featured snippets, Bing answer boxes, Google Assistant, Alexa Skills, Siri, and Cortana — multiplying your brand's presence across every search surface your audience uses simultaneously." },
              { num: "07", icon: ShieldCheck, color: "#DC2626", title: "Build Lasting Customer Trust",    desc: "Brands that answer questions authoritatively are brands customers trust. AEO positions you as the expert resource, creating the credibility and confidence that shortens sales cycles and increases customer lifetime value." },
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

      {/* ── TAILORED FOR EVERY INDUSTRY ── */}
      <section className="py-20" style={{ background: "#f3f4f6" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Answer Engine Optimization Services
              <br />
              <span style={{ color: ACCENT }}>Tailored for Every Industry We Serve</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Awarded as the most-trusted AEO services agency, our services are built to adapt to how
              several industries are searched, evaluated, and summarized by AI, ensuring your content
              aligns with real decision-making patterns across complex and direct-to-market sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: "/industry-b2b.png",        icon: Briefcase,    iconBg: "#2563EB", label: "B2B" },
              { img: "/industry-ecommerce.png",  icon: ShoppingCart, iconBg: "#F97316", label: "B2C" },
              { img: "/industry-shopify.png",    icon: Rocket,       iconBg: "#16A34A", label: "D2C" },
            ].map(({ img, icon: Icon, iconBg, label }) => (
              <div key={label} className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img src={img} alt={label} className="w-full h-full object-cover" />
                {/* Dark gradient for readability */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 30%, transparent 70%)" }} />
                {/* Icon badge top-left */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: iconBg }}>
                  <Icon className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                </div>
                {/* Label bottom-left */}
                <div className="absolute bottom-4 left-4 text-white font-bold text-base leading-none">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOICE SEARCH CTA ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center"
            style={{ background: "#1A1F2E", minHeight: 200 }}>
            <div className="relative z-10 flex-1 px-10 md:px-14 py-12 md:py-10">
              <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">
                <span className="text-white">Missing Out on </span>
                <span style={{ color: "#F97316", fontStyle: "italic" }}>Voice Search Answers?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                We optimise your content for Alexa, Siri, and Google Assistant — ensuring your brand
                is the answer when customers ask voice devices about your category.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: "#F97316" }}>
                Schedule a Strategy Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-[48%] self-end overflow-hidden">
              <img src="/cta-laptop-analytics.png" alt="AEO analytics dashboard"
                className="w-full h-auto object-cover object-top"
                style={{ borderRadius: "0 1.5rem 1.5rem 0", maxHeight: 260 }} />
              <div className="absolute inset-y-0 left-0 w-24"
                style={{ background: "linear-gradient(to right, #1A1F2E, transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP BENEFITS FOR AEO SERVICES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Top Benefits for
              <br />
              <span style={{ color: ACCENT }}>AEO Services</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              The AEO services, which offer premium features, deliver power to organizations through
              modern user search points that let users experience actual visibility on their websites
              to present their brand as a legitimate solution for AI systems.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: ShoppingCart,
                color: "#2563EB",
                title: "For E-commerce Business",
                desc: "The AI system generates optimized category content, FAQ content, and comparison content, which helps E-commerce brands present their products to customers who will buy from them.",
              },
              {
                icon: BookOpen,
                color: "#16A34A",
                title: "For Businesses Creating Expert Content",
                desc: "AI systems mention experts and publishers who present their insights through straightforward language because they demonstrate their expertise by answering difficult questions, which AI systems use to identify reliable sources for continuous visibility.",
              },
              {
                icon: Layers,
                color: "#DC2626",
                title: "For Businesses with Mixed B2B/B2C Models",
                desc: "Unified messaging helps hybrid B2B and B2C businesses because it establishes a single brand image, which enables AI systems to identify their brand during all informational and purchase research activities.",
              },
              {
                icon: Rocket,
                color: "#D97706",
                title: "For New Businesses",
                desc: "New businesses achieve trustworthiness by using early AI answers, which contain structured content and focused queries to challenge established brands in competitive niche markets.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title}
                className="rounded-2xl border border-slate-200 bg-white p-8"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <Icon className="w-7 h-7 mb-6" style={{ color }} strokeWidth={1.6} />
                <h3 className="font-bold text-base leading-snug mb-4" style={{ color }}>{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY HIRE TOP SEO SERVICES FOR AEO ── */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Why Hire Top SEO Services for
              <br />
              <span style={{ color: ACCENT }}>AEO Services</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Top SEO Services is your ultimate AEO services provider, as it combines deep AI insights
              with proven SEO strategies that definitely work for businesses and allow them to stay way
              ahead in the competition &amp; rank higher. Our customized approach ensures long-term success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: "01", icon: TrendingUp,
                title: "Proven Expertise in AEO Optimization",
                desc: "Our AEO strategies show they work by analyzing what people are searching for and how they behave on search engine results pages, using this information along with performance data to create content that search engines highlight as direct answers.",
              },
              {
                num: "02", icon: Target,
                title: "Tailored Solutions for Your Business Needs",
                desc: "We build AEO content optimization strategies around your industry, audience queries, and buying intent so we can create content formats, schemas, and page structures that match the most common user questions throughout their decision-making process.",
              },
              {
                num: "03", icon: Settings2,
                title: "Advanced Tools for Maximizing Visibility",
                desc: "We use enterprise-grade keyword smartness together with entity analysis, schema validation, and SERP tracking tools to discover answer opportunities, which enable us to position your content in areas where search engines provide trusted answers.",
              },
              {
                num: "04", icon: Eye,
                title: "Transparent Reporting and Analytics",
                desc: "The AEO campaign provides you with complete visibility into content performance through detailed reporting that includes snippet wins, impression growth, click-through performance, and comprehensive query coverage of modern search experiences.",
              },
              {
                num: "05", icon: RefreshCw,
                title: "Continuous Adaptation to Search Algorithms",
                desc: "Search engines develop new features at a rapid pace. We take care of three main factors, including AI summary modifications and voice search pattern & ranking signal updates, to keep your content aligned with existing answer selection methods.",
              },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={num}
                className="rounded-2xl bg-white border border-slate-200 p-7 flex flex-col cursor-default transition-shadow duration-200"
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(37,99,235,0.15)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                {/* Icon + number row */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: ACCENT_LIGHT }}>
                    <Icon className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.8} />
                  </div>
                  <span className="text-base font-black" style={{ color: ACCENT + "66" }}>{num}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE CTA ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: "linear-gradient(135deg,#0F172A 0%,#0c1a2e 100%)" }}>
            <div className="md:w-[46%] flex-shrink-0 relative min-h-[220px]">
              <img src="/cta-meeting-analytics.png" alt="AEO consultation"
                className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent 60%,#0F172A)" }} />
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                Ready to Dominate{" "}
                <span style={{ color: ACCENT }}>Answer-Powered Search?</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-7 max-w-md">
                Our AEO team builds content systems that make your brand the definitive answer across
                featured snippets, voice assistants, and AI-generated results.
              </p>
              <div>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Request a Free AEO Consultation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AEO STRATEGY TABLE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              What is our{" "}
              <span style={{ color: ACCENT }}>AEO Services Strategy</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              As a leading AEO services provider, we follow a structured process to combine search intent
              data with content architecture, ensuring your brand captures and holds position-zero answers
              at the right moment for every high-value query.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-[1fr_2fr] bg-slate-50 border-b border-slate-200">
              <div className="px-6 py-3 text-xs font-black tracking-widest uppercase text-slate-400">Process Phases</div>
              <div className="px-6 py-3 text-xs font-black tracking-widest uppercase text-slate-400 border-l border-slate-200">Description</div>
            </div>
            {[
              { phase: "Discovery & Intent Mapping",    desc: "We audit your current snippet and voice-answer landscape, map every high-value question your audience asks, and benchmark your position against competitors across all major search platforms and voice assistants." },
              { phase: "Strategy & Schema Blueprint",  desc: "We design a structured data architecture — FAQ, HowTo, Speakable, and Article schemas — alongside a content template strategy that aligns every key page with the snippet types Google awards for each query cluster." },
              { phase: "Content Creation & Optimisation", desc: "Our writers produce answer-first content in the concise, conversational format that search engines and voice assistants select. Existing pages are re-structured with direct answer blocks and supporting depth to compete for position zero." },
              { phase: "Implementation & Validation",  desc: "We deploy schema at scale through your CMS, validate all structured data via Search Console and Rich Results Test, and confirm featured snippet triggers through live testing across targeted queries." },
              { phase: "Monitoring & Continuous Growth",desc: "Real-time dashboards track snippet ownership, voice answer captures, CTR from answer boxes, and revenue attribution. Monthly strategy sessions refine the approach and expand to new query clusters as positions are secured." },
            ].map(({ phase, desc }, i, arr) => (
              <div key={phase}
                className={`grid grid-cols-[1fr_2fr]${i < arr.length - 1 ? " border-b border-slate-200" : ""}`}>
                <div className="px-6 py-5 text-sm font-black text-slate-900 flex items-start">{phase}</div>
                <div className="px-6 py-5 text-sm text-slate-500 leading-relaxed border-l border-slate-200">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Frequently Asked Questions About{" "}
              <span style={{ color: ACCENT }}>AEO Services</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Get answers to the most common questions about our Answer Engine Optimization services.
            </p>
          </div>

          <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white">
              <img src="/faq-woman.png" alt="Still have questions?" className="w-full object-cover h-52" />
              <div className="p-6 text-center">
                <h3 className="text-lg font-black text-slate-900 mb-2">Still Have Questions?</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">
                  Can&apos;t find the answer you&apos;re looking for? Our AEO experts are ready to help.
                </p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Ask Our AEO Experts <ArrowRight className="w-3.5 h-3.5" />
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
              Ready to Own the Answer Box?
            </h2>
            <p className="text-green-100 text-sm max-w-md leading-relaxed">
              Get a free AEO audit and discover how to make your brand the featured answer across
              Google, voice assistants, and AI-generated search results.
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
                  className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-cyan-400 bg-white transition-colors" />
                <input type="email" placeholder="Business Email*"
                  className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-cyan-400 bg-white transition-colors" />
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-500 flex-shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                    <span>US +1</span>
                  </div>
                  <input type="tel" placeholder="Phone Number *"
                    className="flex-1 rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-cyan-400 bg-white transition-colors" />
                </div>
                <select className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-cyan-400 bg-white text-slate-500 transition-colors appearance-none">
                  <option value="">Select Budget</option>
                  <option value="under-1k">Under $1,000/mo</option>
                  <option value="1k-3k">$1,000 – $3,000/mo</option>
                  <option value="3k-5k">$3,000 – $5,000/mo</option>
                  <option value="5k-10k">$5,000 – $10,000/mo</option>
                  <option value="10k+">$10,000+/mo</option>
                </select>
                <textarea rows={4} placeholder="Tell us about your project*"
                  className="w-full rounded-lg px-4 py-3 text-sm border border-slate-200 outline-none focus:border-cyan-400 bg-white resize-none transition-colors" />
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
