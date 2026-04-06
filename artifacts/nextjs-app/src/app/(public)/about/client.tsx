"use client";

import React, { useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import {
  ArrowRight, Target, TrendingUp, Shield,
  CheckCircle2, BarChart3, Globe2, Award, Zap,
  TrendingUpIcon, ShieldCheck, Settings2, Headphones,
  Plus, Minus, Mail, Phone, CheckCircle,
} from "lucide-react";

const STATS = [
  { value: "500+", label: "Projects Delivered", color: "#2563EB" },
  { value: "200+", label: "Happy Clients",       color: "#F97316" },
  { value: "15+",  label: "Years Experience",    color: "#10B981" },
  { value: "50+",  label: "Industries Served",   color: "#8B5CF6" },
];

const WHY_CHOOSE = [
  { icon: Target,      title: "Data-Driven Strategy",  desc: "Every decision backed by analytics and real performance data for measurable results.",              color: "#2563EB", bg: "#EFF6FF" },
  { icon: Zap,         title: "Fast Results",           desc: "Our proven methodologies deliver faster rankings and increased traffic within weeks.",               color: "#F59E0B", bg: "#FFFBEB" },
  { icon: CheckCircle2,title: "Transparent Reporting",  desc: "Regular detailed reports so you always know exactly how your campaigns are performing.",             color: "#10B981", bg: "#ECFDF5" },
  { icon: Headphones,  title: "Dedicated Support",      desc: "A dedicated account manager ensures personalized attention and quick responses.",                   color: "#EF4444", bg: "#FEF2F2" },
];

const CASE_STUDIES_ABOUT = [
  { company: "ICS Meta",       color: "#EF4444", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=340&fit=crop&q=80",   desc: "Through precision social media presence and digital positioning, we help our client, ICS Meta, to establish authority in a highly competitive tech market, driving strong measurable results." },
  { company: "GPS Geo Guard",  color: "#10B981", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop&q=80",  desc: "We conduct campaigns that focus on audience targeting and aim to boost revenue for our client, GPS Geo Guard. The client came to us with just a few followers, and we transformed their presence." },
  { company: "Victoria Radar", color: "#F59E0B", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=340&fit=crop&q=80", desc: "The Possibility Coach (Victoria Radar) came to Top SEO Services with a minimal brand presence as well as followers. Our skilled social media experts bring vision into reality." },
  { company: "FinanceHub",     color: "#2563EB", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop&q=80",  desc: "A complete digital transformation driving 318% organic traffic growth through strategic keyword targeting and technical SEO overhauls across 200+ landing pages." },
  { company: "LegalEdge SaaS", color: "#8B5CF6", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=340&fit=crop&q=80",  desc: "Achieved #1 rankings in 38 cities within 4 months through hyper-local SEO strategies, content authority building, and structured data implementation." },
  { company: "ShopNova",       color: "#06B6D4", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=340&fit=crop&q=80",  desc: "Generated $4.2M in additional revenue over 12 months by optimizing product pages, building authoritative backlinks, and implementing a content-first strategy." },
];

const FAQ_ABOUT = [
  {
    q: "How can your digital agency improve my website's search engine rankings?",
    a: "Our global digital marketing agency will help you create rich, valuable, search engine-friendly content and gain high-quality backlinks. Deeply evaluate your competitors and more. They will bring your company online success, driving leads, conversions, and increased ROI using on-page, off-page, technical, and Local SEO processes. Furthermore, we also support your business with our paid ad services to increase your website traffic and leads.",
  },
  {
    q: "Will Top SEO Services offer personalized digital marketing strategies for my company?",
    a: "Absolutely. Every strategy we develop is tailored to your specific industry, business goals, and target audience. We analyze your current digital footprint and build a custom roadmap to maximize your visibility and ROI.",
  },
  {
    q: "Does your digital marketing company assist me with the social media management service?",
    a: "Yes, we offer full-scale social media management including content creation, scheduling, community engagement, and performance reporting across all major platforms.",
  },
  {
    q: "After how long will I see my website in the top 1 of Google?",
    a: "SEO timelines vary based on competition, domain authority, and the target keywords. Most clients see significant ranking improvements within 3–6 months, with top-1 positions often achieved within 6–12 months for competitive terms.",
  },
  {
    q: "Do you deal with small businesses as well as only established brands?",
    a: "We work with businesses of all sizes — from ambitious startups to Fortune 500 enterprises. Our strategies scale to match your budget, goals, and growth stage.",
  },
  {
    q: "How do I get started with the Top SEO Services?",
    a: "Simply fill in the contact form on our website or email us directly. One of our consultants will reach out within 24 hours to schedule a free discovery call and assess your needs.",
  },
];

function SectionBadge({ children, color = "#F97316" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {children}
    </span>
  );
}

function WhyCard({ icon: Icon, title, desc, color, bg, index }: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string; desc: string; color: string; bg: string; index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl p-6 border cursor-pointer"
      style={{
        backgroundColor: hovered ? color : "white",
        borderColor: hovered ? color : "#f1f5f9",
        boxShadow: hovered ? `0 8px 24px ${color}33` : "0 1px 6px rgba(0,0,0,0.06)",
        transition: "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: hovered ? "rgba(255,255,255,0.2)" : bg, transition: "background 0.25s ease" }}
      >
        <Icon className="w-5 h-5" style={{ color: hovered ? "white" : color, transition: "color 0.25s ease" }} />
      </div>
      <h3 className="font-bold text-base mb-2" style={{ color: hovered ? "white" : color, transition: "color 0.25s ease" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: hovered ? "rgba(255,255,255,0.85)" : "#64748b", transition: "color 0.25s ease" }}>
        {desc}
      </p>
    </m.div>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────── */
function AboutFaqSection() {
  const half = Math.ceil(FAQ_ABOUT.length / 2);
  const left  = FAQ_ABOUT.slice(0, half);
  const right = FAQ_ABOUT.slice(half);
  const [open, setOpen] = useState<number>(0);

  const toggle = (i: number) => setOpen(prev => (prev === i ? -1 : i));

  const Item = ({ item, idx }: { item: typeof FAQ_ABOUT[0]; idx: number }) => {
    const isOpen = open === idx;
    return (
      <div
        className="rounded-2xl border mb-3 overflow-hidden transition-all duration-200 cursor-pointer"
        style={{
          background: isOpen ? "#FFF7ED" : "#fff",
          borderColor: isOpen ? "#FED7AA" : "#E2E8F0",
        }}
        onClick={() => toggle(idx)}
      >
        <div className="flex items-start justify-between gap-4 p-5">
          <span
            className="font-semibold text-sm leading-snug"
            style={{ color: isOpen ? "#F97316" : "#1e293b" }}
          >
            {item.q}
          </span>
          <button
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors mt-0.5"
            style={{ background: isOpen ? "#F97316" : "#F1F5F9" }}
          >
            {isOpen
              ? <Minus className="w-3.5 h-3.5 text-white" />
              : <Plus  className="w-3.5 h-3.5 text-slate-500" />
            }
          </button>
        </div>
        {isOpen && (
          <div className="px-5 pb-5">
            <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}
          >
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
            Frequently Asked <span style={{ color: "#2563EB" }}>Questions</span>
          </h2>
        </m.div>

        {/* Two-column accordions */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>{left.map((item, i)  => <Item key={i} item={item} idx={i} />)}</div>
          <div>{right.map((item, i) => <Item key={i + half} item={item} idx={i + half} />)}</div>
        </div>

      </div>
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────────────────────────── */
function AboutContactSection() {
  const CONTACTS = [
    { label: "Request a Quote",              email: "business@topseoservices.co" },
    { label: "Partners Enquires",            email: "partners@topseoservices.co" },
    { label: "Reference Checks /Misc. HR Enquires", email: "hr@topseoservices.co" },
  ];

  return (
    <section className="py-20 bg-white">
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
                type="text"
                placeholder="Your Name*"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white"
              />
              <input
                type="email"
                placeholder="Business Email*"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white"
              />
              {/* Phone with flag */}
              <div className="flex gap-2">
                <div
                  className="flex items-center gap-1.5 px-3 py-3 border border-slate-200 rounded-xl text-sm text-slate-600 bg-white flex-shrink-0 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>us +1</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number *"
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
                rows={4}
                placeholder="Tell us about your project*"
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
            style={{ background: "#E53E3E", minHeight: "420px" }}
          >
            {/* decorative circle */}
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="absolute top-10 right-10 w-28 h-28 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />

            <div className="relative z-10">
              <h3 className="text-2xl font-display font-black text-white mb-2">
                Hate Filling out Forms?
              </h3>
              <a href="mailto:business@topseoservices.co" className="text-white text-sm underline underline-offset-2 mb-8 inline-block hover:opacity-80 transition-opacity">
                Email us.
              </a>

              <div className="mt-4 space-y-0 divide-y divide-white/10">
                {CONTACTS.map(({ label, email }) => (
                  <div key={label} className="flex items-start gap-3 py-5">
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
  );
}

const PER_PAGE = 3;

function CaseStudySection() {
  const maxIdx = Math.ceil(CASE_STUDIES_ABOUT.length / PER_PAGE) - 1;
  const [idx, setIdx] = useState(0);
  const visible = CASE_STUDIES_ABOUT.slice(idx * PER_PAGE, idx * PER_PAGE + PER_PAGE);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}
            >
              Case Study
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              From Vision to Victory:<br />
              <span style={{ color: "#2563EB" }}>Our Client Success Stories</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Each brand comes to our agency with a tricky challenge, and what they leave with is Momentum. Our team takes complete care of these projects and showcases its best expertise to turn strategy into measurable performance, helping brands sharpen visibility and capture qualified leads. Please have a look at our diverse portfolio:
            </p>
          </div>
          <div className="flex-shrink-0 mt-2">
            <Link href="/contact">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ background: "#F97316" }}
              >
                See All Reviews <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map(({ company, color, img, desc }, i) => (
            <m.div
              key={company}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-slate-100 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
              style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img src={img} alt={company} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)" }} />
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(255,255,255,0.92)", color: "#475569" }}
                >
                  Case Study
                </span>
              </div>
              {/* Body */}
              <div className="p-5">
                <h3 className="font-bold text-base mb-2" style={{ color }}>{company}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{desc}</p>
                <button
                  className="inline-flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all"
                  style={{ color }}
                >
                  View Project <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </m.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIdx(i => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
            style={{ borderColor: "#e2e8f0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? 28 : 10,
                height: 10,
                background: i === idx ? "#2563EB" : "#CBD5E1",
              }}
            />
          ))}
          <button
            onClick={() => setIdx(i => Math.min(maxIdx, i + 1))}
            disabled={idx === maxIdx}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
            style={{ borderColor: "#e2e8f0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export function AboutPageClient() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20"
        style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #e6eeff 60%, #f8f9ff 100%)" }}
      >
        {/* decorative blobs — slow float */}
        <m.div
          className="absolute top-0 left-[20%] w-72 h-72 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "#a5b4fc", opacity: 0.25 }}
          animate={{ y: [0, -18, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute bottom-0 right-[15%] w-56 h-56 rounded-full blur-[100px] pointer-events-none"
          style={{ background: "#93c5fd", opacity: 0.2 }}
          animate={{ y: [0, 16, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
            <span
              className="inline-flex items-center px-5 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "#e8edff", color: "#4B5563", border: "1px solid #c7d2fe" }}
            >
              About Us
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-display font-black leading-tight mb-5"
          >
            <span className="block text-xl md:text-2xl font-bold text-slate-700 mb-1">Your Trusted Partner for</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl" style={{ color: "#2563EB" }}>
              Digital Growth &amp; Success
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-slate-500 text-base md:text-lg leading-relaxed max-w-lg mx-auto"
          >
            We are a results-driven digital marketing agency helping businesses scale their online presence through innovative SEO strategies, data-driven campaigns, and creative solutions.
          </m.p>
        </div>
      </section>

      {/* ── DRIVE ORGANIC LEAD GROWTH ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — device-frame image collage */}
            <m.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main device frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[10px] bg-slate-800 border-slate-800" style={{ minHeight: 340 }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=460&fit=crop&q=80"
                  alt="Team collaborating"
                  className="w-full h-full object-cover"
                  style={{ minHeight: 320, display: "block" }}
                />
              </div>

              {/* Floating image — top right (orange border) */}
              <m.div
                className="absolute -top-5 -right-5 w-36 md:w-44 rounded-xl overflow-hidden shadow-xl"
                style={{ border: "4px solid #F97316", zIndex: 10 }}
                animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop&q=80"
                  alt="Presenter"
                  className="w-full h-28 md:h-32 object-cover"
                />
              </m.div>

              {/* Floating image — bottom right (yellow border) */}
              <m.div
                className="absolute -bottom-5 right-6 w-32 md:w-40 rounded-xl overflow-hidden shadow-xl"
                style={{ border: "4px solid #FBBF24", zIndex: 10 }}
                animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=280&h=180&fit=crop&q=80"
                  alt="Analytics dashboard"
                  className="w-full h-24 md:h-28 object-cover"
                />
              </m.div>

              {/* Floating image — bottom left (blue border) */}
              <m.div
                className="absolute -bottom-5 left-4 w-28 md:w-36 rounded-xl overflow-hidden shadow-xl"
                style={{ border: "4px solid #2563EB", zIndex: 10 }}
                animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=260&h=180&fit=crop&q=80"
                  alt="Office team"
                  className="w-full h-24 md:h-28 object-cover"
                />
              </m.div>

              {/* Circular badge — overlaps top-right corner of main frame */}
              <div
                className="absolute top-2 right-28 md:right-36 w-16 h-16 rounded-full flex flex-col items-center justify-center text-center shadow-lg"
                style={{ background: "#1D4ED8", zIndex: 20, border: "3px solid #fff" }}
              >
                <span className="text-white text-[8px] font-black leading-tight uppercase tracking-tight">Marketing<br />Agency</span>
                <span className="text-yellow-300 text-base">★</span>
              </div>
            </m.div>

            {/* Right — text content */}
            <m.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }}
            >
              <span
                className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold mb-5"
                style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}
              >
                About Us
              </span>

              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
                Drive Organic Lead Growth<br />
                with{" "}
                <span style={{ color: "#2563EB" }}>Top SEO Services</span>
              </h2>

              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Top SEO Services provides effective digital marketing and SEO solutions that improve visibility, attract qualified leads, and help brands grow worldwide using data-driven strategies and performance-based actions.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-9">
                {[
                  { icon: TrendingUp,  label: "Growth-Focused Solutions",  iconBg: "#ECFDF5", iconColor: "#059669" },
                  { icon: ShieldCheck, label: "Trusted Digital Expertise",  iconBg: "#EFF6FF", iconColor: "#2563EB" },
                  { icon: Settings2,   label: "Custom-Built Strategies",    iconBg: "#FFF1F2", iconColor: "#E11D48" },
                ].map(({ icon: Icon, label, iconBg, iconColor }, i) => (
                  <m.div
                    key={label}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <m.div
                      whileHover={{ scale: 1.12, rotate: 6 }} transition={{ type: "spring", stiffness: 300 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: iconBg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: iconColor }} />
                    </m.div>
                    <span className="text-slate-800 font-semibold text-sm">{label}</span>
                  </m.div>
                ))}
              </div>

              <Link href="/contact">
                <button
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-md hover:opacity-90 transition-opacity"
                  style={{ background: "#F97316" }}
                >
                  Learn More About Us <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-16 border-y border-slate-100" style={{ background: "#FAFBFF" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label, color }, i) => (
              <m.div
                key={label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="cursor-default p-4 rounded-2xl transition-shadow duration-200 hover:shadow-md"
              >
                <p className="text-4xl md:text-5xl font-display font-black mb-1" style={{ color }}>{value}</p>
                <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: color }} />
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">{label}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #f0f4ff 0%, #ffffff 50%, #fff9f5 100%)" }}>
        <div className="absolute -top-10 -left-10 w-80 h-80 rounded-full blur-[130px] pointer-events-none" style={{ background: "#BFDBFE", opacity: 0.55 }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[110px] pointer-events-none" style={{ background: "#FED7AA", opacity: 0.35 }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <m.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}
              >
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight mb-6">
                We Help Businesses{" "}
                <span style={{ color: "#2563EB" }}>Grow<br />Online</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-md">
                With over 15 years of experience in digital marketing, our team of experts combines creativity with data-driven strategies to deliver outstanding results for businesses of all sizes.
              </p>
              <Link href="/contact">
                <button
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg hover:opacity-90 transition-opacity"
                  style={{ background: "#F97316" }}
                >
                  Start Your Journey
                </button>
              </Link>
            </m.div>

            {/* Right — 2×2 cards */}
            <div className="grid grid-cols-2 gap-4">
              {WHY_CHOOSE.map((item, i) => (
                <WhyCard key={item.title} {...item} index={i} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <CaseStudySection />

      {/* ── MISSION & VISION ── */}
      <section className="py-20 relative overflow-hidden bg-white">
        {/* soft blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-56 rounded-full blur-[120px] pointer-events-none" style={{ background: "#bbf7d0", opacity: 0.45 }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: "#bfdbfe", opacity: 0.35 }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: "#fed7aa", opacity: 0.3 }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Mission card */}
            <m.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(249,115,22,0.12)" }}
              className="bg-white rounded-2xl p-8 border border-slate-100 cursor-default"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "#EFF6FF" }}>
                <Target className="w-6 h-6" style={{ color: "#F97316" }} />
              </div>
              <h3 className="text-xl font-display font-black text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                To empower businesses of all sizes with cutting-edge digital marketing strategies that drive measurable growth. We believe every brand deserves visibility, and we&apos;re committed to making that happen through transparent, data-driven approaches.
              </p>
            </m.div>

            {/* Vision card */}
            <m.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(37,99,235,0.12)" }}
              className="bg-white rounded-2xl p-8 border border-slate-100 cursor-default"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "#EFF6FF" }}>
                <Zap className="w-6 h-6" style={{ color: "#2563EB" }} />
              </div>
              <h3 className="text-xl font-display font-black text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                To become the most trusted global digital marketing partner, known for delivering exceptional ROI and building long-term relationships with clients across industries. We envision a world where every business thrives online.
              </p>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <AboutFaqSection />

      {/* ── CONTACT ── */}
      <AboutContactSection />


    </div>
  );
}
