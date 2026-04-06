"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Star,
  Search, Globe, ShoppingBag, Terminal, Link as LinkIcon, PenTool,
  BarChart3, Users, TrendingUp, Zap, Shield, Settings,
  Share2, FileText, Mail,
  Heart, Building2, ShoppingCart, Gamepad2, GraduationCap, Truck, Activity,
  Target, Headphones,
  Calendar, User2,
  Plus, Minus,
} from "lucide-react";
import { m, AnimatePresence, useInView } from "framer-motion";
import type { Metadata } from "next";

/* ─── DATA ───────────────────────────────────────────── */

const SERVICES = [
  { icon: Search,    title: "Search Engine Marketing (SEO)", desc: "Boost your organic rankings with on-page, off-page, technical SEO, AI-powered SEO, and local SEO optimization.", color: "#2563EB" },
  { icon: Share2,    title: "Social Media Marketing (SMM)",  desc: "Build your brand across Instagram, Facebook, LinkedIn, YouTube, TikTok and more with engaging strategies.",           color: "#E53E3E" },
  { icon: Zap,       title: "Paid Advertising (PPC)",        desc: "Maximize ROI with targeted campaigns on Google Ads, Facebook Ads, Instagram Ads, and Amazon Ads.",                    color: "#F59E0B" },
  { icon: FileText,  title: "Content & Branding",            desc: "Engage your audience with compelling content strategies including blogs, infographics, and video content.",           color: "#10B981" },
  { icon: Mail,      title: "Email & Automation",            desc: "Drive conversions with personalized email campaigns, automation workflows, and newsletter strategies.",               color: "#6C5CE7" },
  { icon: BarChart3, title: "Digital Marketing",             desc: "Comprehensive digital marketing strategies combining multiple channels for maximum business growth.",                color: "#EF4444" },
];

const INDUSTRIES = [
  { icon: Heart,         title: "Healthcare",   desc: "Drive patient acquisition and build trust with SEO strategies for clinics, hospitals and health systems.",        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=450&fit=crop&q=80" },
  { icon: Building2,     title: "Real Estate",  desc: "Dominate local property searches and generate high-quality buyer and seller leads for your agency.",              img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=450&fit=crop&q=80" },
  { icon: ShoppingCart,  title: "E-commerce",   desc: "Outrank competitors on product searches and convert organic traffic into measurable revenue at scale.",           img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=450&fit=crop&q=80" },
  { icon: BarChart3,     title: "Fintech",      desc: "Build domain authority in competitive financial markets with compliant content and link-building strategies.",    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=450&fit=crop&q=80" },
  { icon: GraduationCap, title: "Education",    desc: "Attract the right students with targeted SEO for online courses, universities and e-learning platforms.",         img: "/industry-education.jpg" },
  { icon: Truck,         title: "Logistics",    desc: "Capture B2B leads for freight, shipping and supply chain services through data-driven organic growth.",          img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=450&fit=crop&q=80" },
  { icon: Gamepad2,      title: "Gaming",       desc: "Build a passionate community and drive game downloads with viral content and influencer SEO tactics.",           img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=450&fit=crop&q=80" },
  { icon: Activity,      title: "Fitness",      desc: "Grow memberships and health product sales with location-based SEO and wellness content marketing.",              img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=450&fit=crop&q=80" },
];

const WHY_CHOOSE = [
  { icon: Target,     title: "Data-Driven Strategy",   desc: "Every decision backed by analytics and real performance data for measurable results.",                   color: "#2563EB", bg: "#EFF6FF" },
  { icon: Zap,        title: "Fast Results",            desc: "Our proven methodologies deliver faster rankings and increased traffic within weeks.",                    color: "#F59E0B", bg: "#FFFBEB" },
  { icon: CheckCircle2,title: "Transparent Reporting",  desc: "Regular detailed reports so you always know exactly how your campaigns are performing.",                  color: "#10B981", bg: "#ECFDF5" },
  { icon: Headphones, title: "Dedicated Support",       desc: "A dedicated account manager ensures personalized attention and quick responses.",                        color: "#EF4444", bg: "#FEF2F2" },
];

const PROCESS = [
  { step: "01", title: "Discovery & Audit",        desc: "We deeply analyse your site, competitors, and market to find untapped opportunities." },
  { step: "02", title: "Strategy Blueprint",       desc: "A tailored 90-day roadmap covering technical, content, and authority initiatives." },
  { step: "03", title: "Execution & Optimisation", desc: "Our specialists implement, test, and iterate — moving fast without breaking things." },
  { step: "04", title: "Measure & Scale",          desc: "Full attribution reporting tied to revenue, with a plan to double down on what works." },
];

const STATS = [
  { value: "500+", label: "PROJECTS DELIVERED", color: "#2563EB" },
  { value: "200+", label: "HAPPY CLIENTS",       color: "#EF4444" },
  { value: "15+",  label: "YEARS EXPERIENCE",    color: "#F59E0B" },
  { value: "50+",  label: "INDUSTRIES SERVED",   color: "#10B981" },
];

const CASE_STUDIES = [
  { company: "GPS Geo Guard",                    color: "#10B981", stat: "+312%", label: "Organic Growth",  tag: "SaaS",      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop&q=80",   desc: "We conduct campaigns that focus on audience targeting and aim to boost revenue for our client, GPS Geo Guard. The client came to us with just a few followers, and we transformed their digital presence." },
  { company: "Victoria Radar",                   color: "#F59E0B", stat: "10×",   label: "Audience Growth", tag: "Media",     img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=380&fit=crop&q=80", desc: "Victoria Radar came to Top SEO Services with a minimal brand presence. Our skilled social media experts brought vision into reality, growing her audience 10× in six months." },
  { company: "Outdoor Makeover & Living Spaces", color: "#2563EB", stat: "+185%", label: "Local Leads",     tag: "Local SEO", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=380&fit=crop&q=80", desc: "Refining the search strategy along with visual content helped bring this brand out in the local arena and raise inbound leads for turning online interest into booked appointments." },
  { company: "FinanceHub Platform",              color: "#6C5CE7", stat: "+318%", label: "Traffic Growth",  tag: "Fintech",   img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop&q=80", desc: "A complete digital transformation driving 318% organic traffic growth through strategic keyword targeting and technical SEO overhauls across 200+ landing pages." },
  { company: "LegalEdge SaaS",                  color: "#EF4444", stat: "#1",     label: "in 38 Cities",   tag: "Legal",     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=380&fit=crop&q=80", desc: "Achieved #1 rankings in 38 cities within 4 months through hyper-local SEO strategies, content authority building, and structured data implementation." },
  { company: "ShopNova E-commerce",             color: "#00CEC9", stat: "$4.2M",  label: "Added Revenue",  tag: "eCommerce", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=380&fit=crop&q=80", desc: "Generated $4.2M in additional revenue over 12 months by optimizing product pages, building authoritative backlinks, and implementing a content-first strategy." },
];

const BLOG_POSTS = [
  { id: 1, title: "The Ultimate Guide To Scaling Your Business With Affiliate Marketing", excerpt: "Affiliate Marketing Is More Than Just A Trend; It's A Powerful Tool For Scaling Businesses. In This Blog We Delve Into How Businesses Can Leverage Affiliate Partnerships For Exponential Growth.", date: "12/12/2024", author: "John Doe", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&h=600&fit=crop&q=80" },
  { id: 2, title: "Top 5 Affiliate Marketing Trends To Watch In 2025", date: "12/12/2024", author: "John Doe" },
  { id: 3, title: "How To Build A High-Converting Landing Page", date: "12/12/2024", author: "John Doe" },
  { id: 4, title: "SEO Strategies That Actually Work In 2025", date: "12/12/2024", author: "John Doe" },
];

const FAQS = [
  { q: "How can your digital agency improve my website's search engine rankings?",              a: "We conduct a full technical audit, fix on-page issues, build authoritative backlinks, and produce keyword-targeted content — all working together to push your pages to the top of Google." },
  { q: "Will Top SEO Services offer personalized digital marketing strategies for my company?", a: "Yes. Every client gets a custom strategy built around their industry, competitors, budget, and goals. We don't use cookie-cutter packages — your roadmap is unique to your business." },
  { q: "Does your digital marketing company assist me with the social media management service?", a: "Absolutely. Our company offers detailed social media management services. We effectively manage all aspects of social media, including content development, audience engagement, and converting leads into sales to help establish your brand within the industry." },
  { q: "After how long will I see my website in the top 1 of Google?",                          a: "Most clients see measurable ranking improvements in 90 days. Reaching position #1 for competitive keywords typically takes 4–8 months depending on the domain authority and competition level." },
  { q: "Do you deal with small businesses as well or only established brands?",                  a: "We work with businesses of all sizes — from local startups to enterprise brands. Our Starter plan is specifically designed for growing businesses entering SEO for the first time." },
  { q: "How do I get started with the Top SEO Services?",                                       a: "Simply book a free strategy call through our Contact page. We'll audit your site, identify your biggest opportunities, and walk you through a tailored plan — with no obligation." },
];

/* ─── HELPERS ── */

function SectionBadge({ children, color = "#6C5CE7" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: `${color}18`, color }}>
      {children}
    </span>
  );
}

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const prefix = target.match(/^\$/) ? "$" : "";
    const suffix = target.replace(/[\$0-9.]/g, "");
    if (isNaN(num)) { setDisplay(target); return; }
    let start = 0;
    const duration = 1800;
    const step = 16;
    const inc = num / (duration / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= num) { setDisplay(target); clearInterval(timer); return; }
      const val = num >= 100 ? Math.floor(start) : start.toFixed(0);
      setDisplay(`${prefix}${val}${suffix}`);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return display;
}

/* ─── SECTIONS ── */

function HeroSection() {
  const [url, setUrl] = useState("");
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: "linear-gradient(140deg, #050d1f 0%, #0d1a3a 45%, #0f1f4a 100%)" }}>
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: "#6C5CE7", opacity: 0.10 }} />
      <div className="absolute top-10 right-[15%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none" style={{ background: "#00CEC9", opacity: 0.07 }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-64px)] py-16">

          {/* Left — staggered per-element entrance */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 w-fit text-sm font-semibold" style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.35)", color: "#fb923c" }}>
                <Search className="w-3.5 h-3.5" /> #1 Digital Marketing Agency
              </div>
            </m.div>

            {/* Heading */}
            <m.h1
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.12, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-[3.2rem] font-display font-black text-white leading-[1.12] mb-6"
            >
              Boost Your Business Presence<br />with the Top{" "}
              <span className="font-black" style={{ color: "#3B82F6" }}>Digital<br />Marketing</span>{" "}Agency
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.24, ease: "easeOut" }}
              className="text-slate-300 text-base leading-relaxed mb-8 max-w-[480px]"
            >
              Gain Endless Traffic, Boost Revenue, and Improve Brand Presence with Top SEO Services: Your Trusted Digital Marketing &amp; SEO Partner.
            </m.p>

            {/* URL audit input */}
            <m.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.36, ease: "easeOut" }}
              className="flex items-stretch rounded-xl overflow-hidden mb-6 max-w-[480px]"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(12px)" }}
            >
              <div className="flex items-center pl-4 pr-2 text-slate-400">
                <Globe className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Enter your website URL..."
                className="flex-1 bg-transparent py-3.5 text-sm text-white placeholder-slate-400 outline-none"
              />
              <button
                className="flex items-center gap-1.5 px-5 m-1.5 rounded-lg font-bold text-sm text-white whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #F97316, #ea580c)" }}
              >
                <Search className="w-3.5 h-3.5" /> Audit Your Website
              </button>
            </m.div>

            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.48, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <button
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg hover:opacity-90 transition-opacity"
                  style={{ background: "#F97316" }}
                >
                  Get Your Free Audit <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.22)", color: "white" }}
                >
                  Grow Leads
                </button>
              </Link>
            </m.div>
          </div>

          {/* Right: Hero illustration */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 1.2, ease: "easeOut" }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Globe icon - left edge */}
            <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Globe className="w-4 h-4 text-slate-300" />
            </div>

            {/* Lightning bolt icon - right edge */}
            <div className="absolute right-[-18px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Zap className="w-4 h-4 text-yellow-300" />
            </div>

            {/* Main container with sky-blue background */}
            <div className="relative w-full max-w-[500px]" style={{ paddingTop: "40px", paddingBottom: "40px" }}>

              {/* Floating stat: Traffic Up - top left (outside box, above) */}
              <div
                className="absolute top-0 left-6 z-20 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg"
                style={{ background: "rgba(255,255,255,0.97)", border: "1px solid #e2e8f0" }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#dcfce7" }}>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-800 leading-tight">Traffic Up</p>
                  <p className="text-[11px] text-green-600 font-semibold leading-tight">+27% this month</p>
                </div>
              </div>

              {/* Floating stat: SEO Score - top right (outside box, above) */}
              <div
                className="absolute top-0 right-6 z-20 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg"
                style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#F97316" }}>
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-white leading-tight">SEO Score</p>
                  <p className="text-[11px] text-orange-400 font-semibold leading-tight">98/100 Optimized</p>
                </div>
              </div>

              {/* Video box */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ minHeight: "360px", background: "linear-gradient(160deg, #dbeafe 0%, #93c5fd 60%, #7dd3fc 100%)" }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ minHeight: "360px", display: "block" }}
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Floating stat: #1 Ranking - bottom right (outside box, below) */}
              <div
                className="absolute bottom-0 right-6 z-20 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg"
                style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#10B981" }}>
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-white leading-tight">#1 Ranking</p>
                  <p className="text-[11px] text-emerald-400 font-semibold leading-tight">Google Search</p>
                </div>
              </div>

            </div>
          </m.div>

        </div>
      </div>

    </section>
  );
}

function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    { icon: TrendingUp, label: "Growth-Focused Solutions",  color: "#10B981", bg: "#d1fae5" },
    { icon: Shield,     label: "Trusted Digital Expertise", color: "#2563EB", bg: "#dbeafe" },
    { icon: Settings,   label: "Custom-Built Strategies",   color: "#EF4444", bg: "#fee2e2" },
  ];

  return (
    <section
      ref={ref}
      className="py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #ffffff 100%)" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left – image collage */}
          <m.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
            style={{ minHeight: "480px" }}
          >
            {/* Main large image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ height: "420px", marginRight: "80px" }}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top-right small image */}
            <div
              className="absolute top-0 right-0 rounded-2xl overflow-hidden shadow-lg"
              style={{ width: "140px", height: "170px", border: "4px solid white" }}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&q=80"
                alt="Business professional"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom-left small image */}
            <div
              className="absolute bottom-0 left-0 rounded-2xl overflow-hidden shadow-lg"
              style={{ width: "150px", height: "130px", border: "4px solid white" }}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=250&fit=crop&q=80"
                alt="Professional at work"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom-right small image */}
            <div
              className="absolute bottom-0 right-0 rounded-2xl overflow-hidden shadow-lg"
              style={{ width: "160px", height: "130px", border: "4px solid white", marginRight: "0" }}
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=350&h=260&fit=crop&q=80"
                alt="Analytics dashboard"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Circular rotating badge */}
            <div
              className="absolute top-4 right-[68px] w-20 h-20 rounded-full flex items-center justify-center z-20 shadow-lg"
              style={{ background: "linear-gradient(135deg, #2563EB, #1d4ed8)", border: "3px solid white" }}
            >
              <div className="text-center">
                <p className="text-white text-[8px] font-black leading-tight uppercase tracking-wide">Digital</p>
                <p className="text-white text-[8px] font-black leading-tight uppercase tracking-wide">Marketing</p>
                <div className="w-3 h-3 mx-auto mt-0.5">
                  <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                </div>
              </div>
            </div>
          </m.div>

          {/* Right – text content */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold mb-5 w-fit"
              style={{ background: "#d1fae5", color: "#059669", border: "1px solid #a7f3d0" }}
            >
              About Us
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 leading-tight mb-5">
              Drive Organic Lead Growth<br />
              with{" "}
              <span style={{ color: "#2563EB" }}>Top SEO Services</span>
            </h2>

            {/* Body */}
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-lg">
              Top SEO Services provides effective digital marketing and SEO solutions that improve visibility, attract qualified leads, and help brands grow worldwide using data-driven strategies and performance-based actions.
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-4 mb-9">
              {features.map(({ icon: Icon, label, color, bg }) => (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </span>
                  <span className="text-gray-800 font-semibold text-sm">{label}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/about">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-md hover:opacity-90 transition-opacity w-fit"
                style={{ background: "#F97316" }}
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </m.div>

        </div>
      </div>
    </section>
  );
}

function StatsCounterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  function StatItem({ value, label, color }: { value: string; label: string; color: string }) {
    const display = useCountUp(value, inView);
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start"
      >
        <p className="text-5xl md:text-6xl font-display font-black leading-none mb-2" style={{ color }}>
          {display}
        </p>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
        <div className="w-8 h-1 rounded-full" style={{ background: color }} />
      </m.div>
    );
  }

  return (
    <section
      ref={ref}
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fff7ed 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "#bfdbfe", opacity: 0.4 }} />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "#bbf7d0", opacity: 0.4 }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {STATS.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-20" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)" }}>
      <div className="container mx-auto px-4 md:px-6">

        {/* Two-column header */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          {/* Left – text */}
          <div>
            <div
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold mb-5 w-fit"
              style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa" }}
            >
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Digital Marketing{" "}
              <span style={{ color: "#2563EB" }}>Solutions</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-lg">
              We offer a full suite of digital marketing services designed to help your business grow online and outperform the competition.
            </p>
          </div>

          {/* Right – image */}
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ height: "220px" }}>
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop&q=80"
                alt="Digital marketing strategy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, color }, i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl border border-slate-100 p-7 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md overflow-hidden"
            >
              {/* Hover background tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `${color}0d` }}
              />

              <div className="relative z-10">
                {/* Icon box */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>

                {/* Title in service color */}
                <h3
                  className="font-display font-bold text-lg mb-3"
                  style={{ color }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InlineCTABanner() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className="relative rounded-3xl overflow-hidden grid md:grid-cols-2"
          style={{ background: "#F97316", minHeight: "240px" }}
        >
          {/* Left — text content */}
          <div className="relative z-10 flex flex-col justify-center px-10 py-12 md:py-14">
            <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-4">
              Optimize Every Element,{" "}
              <span style={{ color: "#FDE68A" }}>Dominate Every Search</span>
            </h2>
            <p className="text-orange-100 text-sm leading-relaxed mb-7 max-w-sm">
              Schedule a detailed growth strategy session with us today and discover how we can drive your business to the top of search results.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white border-2 border-white/70 hover:bg-white hover:text-orange-500 transition-all duration-200 w-fit">
                Get a Free Website Audit <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Right — image */}
          <div className="relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80"
              alt="Analytics dashboard"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* fade left edge into orange */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, #F97316 0%, rgba(249,115,22,0.3) 40%, transparent 100%)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="py-24" style={{ background: "#F0F4FF" }}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionBadge color="#00CEC9">Industry Section</SectionBadge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight mt-4 mb-4">
            Industries We{" "}
            <span style={{ color: "#2563EB" }}>Excel In</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            As a premier organic marketing agency, we work with high-impact sectors where digital performance directly influences growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INDUSTRIES.map(({ icon: Icon, title, desc, img }, i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Background image */}
              <img
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Always-visible dark bottom gradient + title */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0.72) 100%)" }}
              />

              {/* Icon badge — top left */}
              <div
                className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "#2563EB" }}
              >
                <Icon className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
              </div>

              {/* Title — always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 z-10">
                <h3 className="font-bold text-white text-base leading-snug">{title}</h3>

                {/* Hover content: desc + button slide up */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-400 ease-in-out">
                  <p className="text-white/80 text-xs leading-relaxed mt-2 mb-3">{desc}</p>
                  <Link href="/contact">
                    <button
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-colors duration-200"
                      style={{ background: "#2563EB" }}
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Hover overlay — extra darkening */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }}
              />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({ icon: Icon, title, desc, color, bg, index }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; title: string; desc: string; color: string; bg: string; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl p-6 bg-white border border-slate-100 hover:shadow-md transition-shadow duration-300"
      style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: bg }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <h3 className="font-bold text-base mb-2" style={{ color }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-500">
        {desc}
      </p>
    </m.div>
  );
}

function WhyChooseUsSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #f0f4ff 0%, #ffffff 50%, #fff9f5 100%)" }}>
      {/* Soft colour blob top-left */}
      <div className="absolute -top-10 -left-10 w-80 h-80 rounded-full blur-[130px] pointer-events-none" style={{ background: "#BFDBFE", opacity: 0.55 }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[110px] pointer-events-none" style={{ background: "#FED7AA", opacity: 0.35 }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — heading + CTA */}
          <m.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
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

          {/* Right — 2×2 feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {WHY_CHOOSE.map((item, i) => (
              <WhyCard key={item.title} {...item} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  const PER_PAGE = 3;
  const maxIdx = Math.ceil(CASE_STUDIES.length / PER_PAGE) - 1;
  const [idx, setIdx] = useState(0);
  const visible = CASE_STUDIES.slice(idx * PER_PAGE, idx * PER_PAGE + PER_PAGE);

  return (
    <section className="py-24" style={{ background: "linear-gradient(180deg, #0F172A 0%, #1a1040 100%)" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(108,92,231,0.2)", color: "#a78bfa" }}>Case Studies</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
              Real Results,<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #6C5CE7, #00CEC9)" }}>Real Businesses</span>
            </h2>
          </div>
          <Link href="/services">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm whitespace-nowrap hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
              See All Case Studies <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map(({ company, color, img, stat, label, tag, desc }) => (
            <m.div
              key={company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all bg-white/5"
            >
              <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
                <img src={img} alt={company} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ height: 200 }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: `linear-gradient(180deg, ${color}22 0%, ${color}44 100%)` }} />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold text-white backdrop-blur-sm" style={{ background: `${color}cc`, border: `1px solid ${color}` }}>{tag}</span>
                <div className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl text-right backdrop-blur-md" style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${color}44` }}>
                  <p className="font-display font-black text-xl leading-none" style={{ color }}>{stat}</p>
                  <p className="text-slate-500 text-[10px] font-semibold leading-tight mt-0.5">{label}</p>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="w-10 h-0.5 rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <h3 className="font-bold text-base leading-snug mb-3 transition-colors duration-200" style={{ color }}>{company}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">{desc}</p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <Link href="/services">
                    <button className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5" style={{ color }}>
                      View Project <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex-1 h-0.5 rounded-full mr-8 overflow-hidden" style={{ background: "#dde3f020" }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / (maxIdx + 1)) * 100}%`, background: "linear-gradient(90deg, #6C5CE7, #00CEC9)" }} />
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200" style={{ background: idx === 0 ? "#ffffff10" : "rgba(108,92,231,0.1)", border: `1px solid ${idx === 0 ? "#ffffff15" : "rgba(108,92,231,0.35)"}`, color: idx === 0 ? "#ffffff30" : "#6C5CE7" }}>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className="rounded-full transition-all duration-300" style={{ width: i === idx ? 24 : 7, height: 7, background: i === idx ? "#6C5CE7" : "#ffffff30" }} />
              ))}
            </div>
            <button onClick={() => setIdx(i => Math.min(maxIdx, i + 1))} disabled={idx === maxIdx} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200" style={{ background: idx === maxIdx ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #6C5CE7, #00CEC9)", border: "1px solid rgba(108,92,231,0.4)", color: idx === maxIdx ? "rgba(255,255,255,0.25)" : "#fff" }}>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeBlogSection() {
  const featured = BLOG_POSTS[0];
  const small = BLOG_POSTS.slice(1);

  const PostMeta = ({ date, author }: { date: string; author: string }) => (
    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {date}</span>
      <span className="flex items-center gap-1.5"><User2 className="w-3.5 h-3.5" /> {author}</span>
    </div>
  );

  return (
    <section className="py-24" style={{ background: "#F8FAFC" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}>Blog</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">
              Stay Updated with the Latest{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #6C5CE7, #00CEC9)" }}>Industry Insights</span>
            </h2>
          </div>
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm shadow-lg hover:opacity-90 transition-opacity whitespace-nowrap" style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
              View All Blogs <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }} className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl overflow-hidden" style={{ minHeight: 300 }}>
            <img src={featured.img} alt={featured.title} className="w-full h-full object-cover" style={{ minHeight: 300 }} />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col justify-center hover:shadow-md transition-shadow">
            <PostMeta date={featured.date} author={featured.author} />
            <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 mb-4 leading-snug">{featured.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all" style={{ color: "#F97316" }}>
              Read More <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </m.div>

        <div className="grid md:grid-cols-3 gap-6">
          {small.map(({ id, title, date, author }, i) => (
            <m.div key={id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col">
              <PostMeta date={date} author={author} />
              <h4 className="font-display font-black text-slate-900 text-base leading-snug mb-5 flex-1">{title}</h4>
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all" style={{ color: "#F97316" }}>
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GrowthCTABanner() {
  const floatingIcons = [
    { icon: BarChart3, color: "#60A5FA", bg: "rgba(96,165,250,0.15)",  top: "14%", left: "38%" },
    { icon: Target,    color: "#FB923C", bg: "rgba(251,146,60,0.15)",  top: "10%", left: "72%" },
    { icon: Zap,       color: "#FBBF24", bg: "rgba(251,191,36,0.15)",  top: "52%", left: "44%" },
    { icon: Activity,  color: "#F87171", bg: "rgba(248,113,113,0.15)", top: "22%", left: "88%" },
    { icon: TrendingUp,color: "#34D399", bg: "rgba(52,211,153,0.15)",  top: "66%", left: "80%" },
    { icon: Globe,     color: "#818CF8", bg: "rgba(129,140,248,0.15)", top: "65%", left: "54%" },
  ];
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }} className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1a1040 55%, #0f2040 100%)", minHeight: 220 }}>
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          <div className="relative z-10 grid lg:grid-cols-[1fr_1fr] min-h-[220px]">
            <div className="px-10 md:px-14 py-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-5 w-fit" style={{ background: "rgba(52,211,153,0.15)", color: "#34D399", border: "1px solid rgba(52,211,153,0.3)" }}>
                <TrendingUp className="w-3 h-3" /> Proven Results
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white leading-tight mb-3">
                Gain <span style={{ color: "#FB923C" }}>3X Organic Traffic</span> in 90 Days
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">Join 500+ businesses growing with data-driven SEO strategies that deliver measurable results.</p>
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm w-fit shadow-lg hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #F97316, #EF4444)" }}>
                  Start Growing Now <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-2xl font-display" style={{ top: "50%", left: "40%", transform: "translate(-50%, -50%)", background: "linear-gradient(135deg, #F97316, #EF4444)" }}>
                <span className="text-white font-black text-xl leading-none">3X</span>
                <span className="text-white/80 text-[10px] font-semibold">Growth</span>
              </div>
              {floatingIcons.map(({ icon: Icon, color, bg, top, left }, i) => (
                <m.div key={i} className="absolute w-11 h-11 rounded-xl flex items-center justify-center shadow-lg" style={{ top, left, background: bg, border: `1px solid ${color}30` }} animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const left  = FAQS.filter((_, i) => i % 2 === 0);
  const right = FAQS.filter((_, i) => i % 2 !== 0);

  const FAQItem = ({ q, a, idx }: { q: string; a: string; idx: number }) => {
    const isOpen = open === idx;
    return (
      <div className="rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer" style={{ background: isOpen ? "#FFF7ED" : "#ffffff", borderColor: isOpen ? "#FED7AA" : "#E2E8F0" }} onClick={() => setOpen(isOpen ? null : idx)}>
        <div className="flex items-start justify-between gap-4 px-5 py-4">
          <span className="font-bold text-sm leading-snug pt-0.5" style={{ color: isOpen ? "#EA580C" : "#0F172A" }}>{q}</span>
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300" style={{ background: isOpen ? "#EA580C" : "transparent", border: isOpen ? "none" : "1.5px solid #CBD5E1" }}>
            {isOpen ? <Minus className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">{a}</p>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold mb-5" style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}>FAQ</div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #6C5CE7, #00CEC9)" }}>Questions</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">{left.map(({ q, a }, i) => <FAQItem key={i} q={q} a={a} idx={i * 2} />)}</div>
          <div className="space-y-3">{right.map(({ q, a }, i) => <FAQItem key={i} q={q} a={a} idx={i * 2 + 1} />)}</div>
        </div>
      </div>
    </section>
  );
}

function GetStartedSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } catch {}
    setLoading(false);
    setSent(true);
  };

  const CONTACTS = [
    { label: "Request a Quote",                     email: "business@topseoservices.co" },
    { label: "Partners Enquires",                   email: "partners@topseoservices.co" },
    { label: "Reference Checks / Misc. HR Enquires",email: "hr@topseoservices.co" },
    { label: "Other Enquires",                      email: "info@topseoservices.co" },
  ];
  const inputCls = "w-full border-0 border-b border-slate-200 bg-transparent py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors";

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-display font-black text-slate-900 mb-10 leading-tight">
              Let&apos;s{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #2563EB, #6C5CE7)" }}>Get Started</span>
            </h2>
            {sent ? (
              <div className="flex flex-col items-start gap-3 py-10">
                <CheckCircle2 className="w-10 h-10" style={{ color: "#6C5CE7" }} />
                <p className="text-xl font-bold text-slate-900">Message sent!</p>
                <p className="text-slate-500 text-sm">We&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name*" className={inputCls} />
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Business Email*" className={inputCls} />
                <div className="flex items-center border-b border-slate-200 focus-within:border-blue-500 transition-colors">
                  <span className="flex items-center gap-1.5 text-sm text-slate-500 pr-3 border-r border-slate-200 mr-3 py-3 whitespace-nowrap flex-shrink-0">🇺🇸 US +1</span>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" className="flex-1 bg-transparent py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none" />
                </div>
                <select name="service" value={form.service} onChange={handleChange} className={`${inputCls} cursor-pointer`} style={{ appearance: "none" }}>
                  <option value="" disabled>Select a Service</option>
                  <option value="SEO Audit">SEO Audit</option>
                  <option value="Local SEO">Local SEO</option>
                  <option value="Technical SEO">Technical SEO</option>
                  <option value="Content Strategy">Content Strategy</option>
                  <option value="Link Building">Link Building</option>
                  <option value="E-commerce SEO">E-commerce SEO</option>
                  <option value="Enterprise SEO">Enterprise SEO</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
                <textarea name="message" required value={form.message} onChange={handleChange} placeholder="Tell us about your project*" rows={4} className={`${inputCls} resize-none`} />
                <button type="submit" disabled={loading} className="px-8 py-3.5 rounded-full font-bold text-white text-sm hover:opacity-90 transition-all shadow-md disabled:opacity-60" style={{ background: "linear-gradient(135deg, #2563EB, #6C5CE7)" }}>
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="rounded-3xl p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #EF4444 0%, #DC2626 60%, #B91C1C 100%)" }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 bg-white" />
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-10 bg-white" />
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-black text-white mb-1">Hate Filling out Forms?</h3>
              <p className="text-white/70 text-sm mb-8">Reach us directly via email:</p>
              <div className="space-y-5">
                {CONTACTS.map(({ label, email }) => (
                  <div key={label}>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
                    <a href={`mailto:${email}`} className="text-white font-bold text-sm hover:underline">{email}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePageClient() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsCounterSection />
      <ServicesSection />
      <InlineCTABanner />
      <IndustriesSection />
      <WhyChooseUsSection />
      <CaseStudiesSection />
      <HomeBlogSection />
      <GrowthCTABanner />
      <FAQSection />
      <GetStartedSection />
    </>
  );
}
