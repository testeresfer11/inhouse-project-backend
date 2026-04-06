"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  Search, TrendingUp, Target, FileText,
  ArrowRight, CheckCircle2, BarChart3,
  Zap, Star, ChevronRight, ChevronDown,
  Globe, Shield, Layers, Lightbulb,
  Users, Award, Clock, Rocket, Eye,
  Cpu, Sparkles, MessageSquare,
  RefreshCw, BadgeCheck,
  Megaphone, Database,
  Settings2, Gauge,
  Phone, Mail, Send,
  Flame, DollarSign, MapPin, ShieldCheck,
  ShoppingCart, Heart, Briefcase, Scale, Home, Landmark, Truck,
  BookOpen, HelpCircle, Share2, ThumbsUp, Video,
  Instagram, Linkedin, Twitter, Youtube, Hash, Image,
  BarChart, PieChart, Activity, Bell, Calendar, UserCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const ACCENT = "#2563EB";
const ACCENT_LIGHT = "#EFF6FF";
const GREEN = "#16A34A";

const HERO_STATS = [
  { icon: Users,       value: "3.2B+",  label: "Social Media Users Worldwide", color: "#F97316" },
  { icon: TrendingUp,  value: "420%",   label: "Avg Engagement Growth",         color: GREEN },
  { icon: Target,      value: "10,000+",label: "Campaigns Launched",            color: "#0891B2" },
  { icon: Award,       value: "98%",    label: "Client Satisfaction",           color: "#7C3AED" },
];

const FAQS = [
  { q: "What is Social Media Marketing and how does it work?",                    a: "Social Media Marketing (SMM) is the practice of using social platforms — Facebook, Instagram, LinkedIn, TikTok, Twitter/X, and YouTube — to grow brand awareness, build communities, drive traffic, and generate leads. We craft platform-specific strategies that combine organic content, paid advertising, and community management to achieve measurable business results." },
  { q: "Which social media platforms should my business be on?",                  a: "It depends on where your audience is. B2B brands typically see the best ROI on LinkedIn. E-commerce and lifestyle brands thrive on Instagram and TikTok. Local businesses do well on Facebook. We audit your audience data and competitive landscape first, then recommend the precise platform mix that maximises your return on investment." },
  { q: "How long does it take to see results from Social Media Marketing?",       a: "Paid social campaigns can generate clicks and conversions within 48–72 hours. Organic growth — building followers, improving reach, and growing engagement — typically takes 3–6 months to gain meaningful momentum. We set clear KPIs upfront so you have a realistic roadmap of what to expect and when." },
  { q: "What is the difference between organic and paid social media marketing?",  a: "Organic social builds your presence through regular posting, community engagement, and content that earns reach naturally. Paid social uses targeted advertising to reach specific audiences who have never heard of your brand. The most effective strategy combines both: organic content builds trust while paid amplification accelerates growth." },
  { q: "How do you measure the success of social media campaigns?",               a: "We track reach, impressions, engagement rate, follower growth, click-through rate, cost per click, conversion rate, cost per lead, and revenue attribution. Monthly reports translate every metric into plain business language — what changed, why it changed, and what we're optimising next." },
  { q: "Can social media marketing generate real leads and sales?",                a: "Absolutely. We run conversion-focused campaigns with precise audience targeting, compelling creative, and optimised landing pages. Our clients consistently generate qualified leads and direct sales through Facebook Lead Ads, Instagram Shopping, LinkedIn Lead Gen Forms, and TikTok Spark Ads." },
  { q: "Do I need a large budget for Social Media Marketing?",                    a: "No. We work with a range of budgets and scale spend based on performance. Some of our best-performing campaigns started at £500–£1,000 per month. We focus your budget on the highest-converting audiences first, then scale what works once we have proven performance data." },
  { q: "What kind of content do you create for social media?",                    a: "We create everything your social presence needs: carousel posts, short-form video (Reels, TikToks, Shorts), static graphics, story sequences, long-form LinkedIn articles, infographics, UGC-style ads, and platform-native content. All content is produced to match your brand identity and optimised for each platform's algorithm." },
  { q: "How does social media marketing support SEO?",                            a: "Social signals are a secondary ranking factor, but the real SEO benefit comes from traffic and backlinks. Viral social content drives referral traffic, earns media mentions, and generates organic backlinks — all of which strengthen your domain authority and search rankings over time." },
  { q: "Can you manage social media marketing for multiple platforms at once?",   a: "Yes. We manage multi-platform strategies simultaneously, ensuring each platform receives content tailored to its audience and format — not a one-size-fits-all approach. A single brief from you turns into platform-native content across all your active channels." },
  { q: "What industries do you serve with Social Media Marketing?",               a: "We work across e-commerce, SaaS, professional services, healthcare, real estate, hospitality, education, B2B technology, and consumer brands. Each industry vertical has its own content strategy, tone of voice, and campaign approach tailored to how its buyers use social media." },
  { q: "How do I get started with your Social Media Marketing services?",         a: "Getting started is simple. Book a free strategy call — we audit your current social presence, review your competitors, and present a tailored growth plan within 5 business days. No long-term contracts on discovery. You only commit once you're confident in the strategy." },
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
export function SocialMediaMarketingPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [openServiceCard, setOpenServiceCard] = useState<number | null>(null);
  const [openPlatformCard, setOpenPlatformCard] = useState<number | null>(null);
  const [caseStudyPage, setCaseStudyPage] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
  const setField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="font-sans antialiased overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[82vh] flex flex-col justify-end" style={{ background: "#0B0F1A" }}>
        <div className="absolute inset-0 overflow-hidden">
          <img src="/ai-seo-hero.jpg" alt="Social Media Marketing" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,15,26,0.88) 50%, rgba(11,15,26,0.35) 100%)" }} />
        </div>

        <div className="relative container mx-auto px-6 md:px-12 pt-32 pb-0 w-full">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Social Media Marketing</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
              style={{ background: "#F97316", color: "white" }}>
              Social Media Marketing Services
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-6">
              Grow Your Brand With{" "}
              <span style={{ color: "#F97316" }}>Social Media</span>{" "}
              That Actually Converts
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl">
              From viral content to precision-targeted paid campaigns — we build social media systems
              that turn followers into customers, and customers into brand advocates.
            </p>
            <div className="flex flex-wrap gap-4 pb-12">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                style={{ background: "#F97316" }}>
                Get Your Free SMM Strategy <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border border-white/20 text-white hover:bg-white/10 transition-colors">
                Explore Services <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* ── ABOUT THE SERVICE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          {/* Two-col: layered images left, text right */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-16">

            {/* LEFT — layered image composition */}
            <div className="relative h-[380px] md:h-[420px] select-none">
              {/* Top-left rectangle */}
              <div className="absolute top-0 left-0 w-[62%] rounded-2xl overflow-hidden shadow-lg"
                style={{ aspectRatio: "4/3" }}>
                <img src="/cta-meeting-analytics.png" alt="Social media content"
                  className="w-full h-full object-cover" />
              </div>

              {/* Bottom-right circle */}
              <div className="absolute bottom-0 right-0 w-[56%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl"
                style={{ background: "#1a1a2e" }}>
                <img src="/faq-woman.png" alt="Social media expert"
                  className="w-full h-full object-cover object-top" />
              </div>

              {/* "20 Years of Experience" badge */}
              <div className="absolute z-10 flex flex-col items-center justify-center rounded-full text-white font-black text-center"
                style={{
                  width: 90, height: 90,
                  background: ACCENT,
                  bottom: "30%", left: "46%",
                  transform: "translate(-50%, 50%)",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.5)",
                }}>
                <span className="text-2xl leading-none">20</span>
                <span className="text-[9px] font-bold leading-tight mt-0.5 opacity-90">Years of<br />Experience</span>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-4 right-[30%] w-3 h-3 rounded-full" style={{ background: "#F97316" }} />
              <div className="absolute top-10 right-[24%] w-2 h-2 rounded-full" style={{ background: ACCENT, opacity: 0.5 }} />
            </div>

            {/* RIGHT — text */}
            <div>
              <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-5"
                style={{ background: ACCENT, color: "white" }}>
                What We Do
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
                What Our Social Media Marketing Services{" "}
                <span style={{ color: ACCENT }}>Actually Do</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                We offer advanced social media marketing services that help brands achieve their
                marketing needs through brand recognition, branding consistency, and their ability to
                generate free leads and trackable customer engagement. We create, distribute, and
                handle content that matches our business objectives, audience viewing patterns, and
                platform algorithm requirements. Our services provide content calendars and
                performance tracking solutions, which help your business achieve long-term growth.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                style={{ background: ACCENT }}>
                Talk to a Social Media Expert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="rounded-2xl border border-slate-200 bg-white"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 divide-y md:divide-y-0">
              {[
                { value: "25,000+", label: "Happy Customers",     color: ACCENT },
                { value: "3,000+",  label: "Campaigns Launched",  color: GREEN },
                { value: "120+",    label: "Certified Experts",   color: "#DC2626" },
                { value: "60+",     label: "Social Strategists",  color: "#D97706" },
              ].map(({ value, label, color }) => (
                <div key={label} className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <span className="text-3xl md:text-4xl font-black leading-none mb-2" style={{ color }}>
                    {value}
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── PLATFORMS GRID ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Social Media Platforms We Manage to Reach
              <br />
              <span style={{ color: ACCENT }}>and Engage Your Audience</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              As a reliable social media marketing firm, we create platform-specific campaigns, which we
              assess through actual user behavior to achieve successful marketing results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Instagram",
                pill: "Instagram",
                pillColor: "#E1306C",
                img: "/industry-ecommerce.png",
                desc: "We design visually compelling Instagram strategies — Reels, Stories, carousels, and shoppable posts — that grow your following and convert browsers into buyers through creative-first campaigns.",
              },
              {
                name: "Facebook",
                pill: "Facebook",
                pillColor: "#1877F2",
                img: "/cta-laptop-analytics.png",
                desc: "From community management to hyper-targeted Facebook Ads and Lead Gen campaigns, we harness the world's largest social platform to deliver qualified traffic and measurable ROI for your business.",
              },
              {
                name: "LinkedIn",
                pill: "LinkedIn",
                pillColor: "#0A66C2",
                img: "/industry-b2b.png",
                desc: "We position your brand as an industry authority on LinkedIn — through thought leadership content, targeted InMail campaigns, and B2B lead generation strategies that connect you with decision-makers.",
              },
              {
                name: "YouTube",
                pill: "YouTube",
                pillColor: "#FF0000",
                img: "/ai-seo-hero.jpg",
                desc: "Our YouTube marketing service covers channel strategy, video SEO, Shorts production, and pre-roll ad campaigns — ensuring your content reaches, educates, and converts your ideal audience at scale.",
              },
              {
                name: "Pinterest",
                pill: "Pinterest",
                pillColor: "#E60023",
                img: "/industry-real-estate.png",
                desc: "We create visually rich Pinterest boards and promoted pins that drive high-intent traffic to your website — ideal for e-commerce, home décor, fashion, food, and lifestyle brands.",
              },
              {
                name: "TikTok",
                pill: "TikTok",
                pillColor: "#010101",
                img: "/industry-shopify.png",
                desc: "We produce trend-native TikTok content, run Spark Ads, and manage influencer partnerships that put your brand in front of millions of engaged users — driving virality, brand awareness, and conversions.",
              },
              {
                name: "X (Twitter)",
                pill: "X (Twitter)",
                pillColor: "#000000",
                img: "/cta-meeting-analytics.png",
                desc: "We manage real-time X/Twitter engagement, trending hashtag campaigns, and promoted tweet strategies that build your brand voice, grow your following, and insert you into the conversations that matter.",
              },
              {
                name: "Snapchat",
                pill: "Snapchat",
                pillColor: "#FFFC00",
                pillTextColor: "#000",
                img: "/industry-education.jpg",
                desc: "Through Snapchat Ads, AR filters, and story-led campaigns, we help brands reach Gen Z and Millennial audiences with immersive, ephemeral content that drives app installs, product discovery, and sales.",
              },
              {
                name: "Reddit",
                pill: "Reddit",
                pillColor: "#FF4500",
                img: "/ai-seo-visual.png",
                desc: "We craft authentic Reddit marketing strategies — community engagement, AMA campaigns, and targeted Reddit Ads — that build trust within niche communities and drive highly engaged traffic to your brand.",
              },
            ].map((platform, i) => (
              <div
                key={platform.name}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,99,235,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)")}
              >
                {/* Image area with "+" toggle */}
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img
                    src={platform.img}
                    alt={platform.name}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.4s", transform: openPlatformCard === i ? "scale(1.04)" : "scale(1)" }}
                  />
                  {/* overlay when open */}
                  {openPlatformCard === i && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center"
                      style={{ background: "rgba(37,99,235,0.92)" }}>
                      <p className="text-white text-sm leading-relaxed font-medium">{platform.desc}</p>
                    </div>
                  )}
                  {/* + / × button */}
                  <button
                    onClick={() => setOpenPlatformCard(openPlatformCard === i ? null : i)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg leading-none z-10 transition-transform duration-200 hover:scale-110"
                    style={{ background: ACCENT, boxShadow: "0 2px 8px rgba(37,99,235,0.4)" }}
                    aria-label={openPlatformCard === i ? "Close" : "Open"}
                  >
                    {openPlatformCard === i ? "×" : "+"}
                  </button>
                </div>

                {/* Bottom label */}
                <div className="px-4 py-4 flex items-center gap-3">
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: platform.pillColor,
                      color: (platform as any).pillTextColor ?? "#fff",
                    }}
                  >
                    {platform.pill}
                  </span>
                  <span className="text-slate-900 font-bold text-sm">{platform.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── DARK IMAGE CTA ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: "#1A1F2E" }}>
            <div className="md:w-[46%] flex-shrink-0 relative min-h-[220px]">
              <img src="/local-cta-analytics.png" alt="Social Media growth"
                className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 55%, #1A1F2E)" }} />
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-12 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                Ready to Build a Social Media Presence{" "}
                <span style={{ color: "#F97316" }}>That Drives Revenue?</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-md">
                Our social media specialists craft strategies tailored to your brand, audience, and
                growth goals — delivering results you can measure, month after month.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                  style={{ background: "#F97316" }}>
                  Book a Free Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW SMM HELPS (hover cards) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-5">
              How Social Media Marketing{" "}
              <span style={{ color: ACCENT }}>Grows Your Business</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Every social media investment should translate into a tangible business outcome.
              Here&apos;s exactly how our SMM approach delivers measurable growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", icon: Megaphone,   color: "#2563EB", title: "Build Brand Awareness at Scale",         desc: "We create platform-native content that earns organic reach and amplify it with targeted paid campaigns — putting your brand in front of the right audiences on the platforms they use every day." },
              { num: "02", icon: Users,       color: "#16A34A", title: "Grow a High-Value Audience",             desc: "Follower counts only matter when the followers are your actual customers. Our audience-building strategies attract qualified prospects who match your ideal customer profile." },
              { num: "03", icon: ThumbsUp,    color: "#F97316", title: "Drive Meaningful Engagement",            desc: "Likes are vanity; comments and shares are signals. We create content designed to spark conversations, encourage shares, and build the kind of community loyalty that converts." },
              { num: "04", icon: DollarSign,  color: "#DC2626", title: "Generate Leads & Direct Sales",          desc: "From Facebook Lead Ads to Instagram Shopping and LinkedIn Lead Gen Forms — we build conversion-optimised campaigns that turn social browsers into paying customers." },
              { num: "05", icon: BarChart3,   color: ACCENT,    title: "Optimise Ad Spend ROI",                  desc: "Every pound of your ad budget is tracked to a business outcome. We continuously test creative, audience segments, and placements to reduce cost-per-acquisition month over month." },
              { num: "06", icon: ShieldCheck, color: "#7C3AED", title: "Protect & Build Brand Reputation",       desc: "Social media is where reputations are made and broken. Our community management team monitors your brand 24/7, manages responses, and ensures every customer touchpoint builds trust." },
              { num: "07", icon: Activity,    color: "#0D9488", title: "Generate Long-Term Compounding Growth",  desc: "Great social media content has a long shelf life. Our evergreen content strategy generates compounding traffic, engagement, and authority — delivering returns that grow with every passing month." },
            ].map(({ num, icon: Icon, color, title, desc }) => {
              const isHovered = hoveredCard === num;
              return (
                <div key={num}
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

      {/* ── INDUSTRIES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
              Industries
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Industries We Support With{" "}
              <span style={{ color: ACCENT }}>Social Media<br />Marketing</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Our social media marketing agency delivers industry-scaled services to boost potential reach, organic
              engagement, and, more importantly, lead quality by framing the platform strategy with real customer behavior
              and search intent. Here is how our SMM solutions cater to different industries:
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { img: "/industry-healthcare.png",  icon: Heart,        iconBg: ACCENT,    label: "Healthcare"  },
              { img: "/industry-real-estate.png",  icon: Home,         iconBg: "#DC2626", label: "Real Estate" },
              { img: "/industry-ecommerce.png",    icon: ShoppingCart, iconBg: "#D97706", label: "E-commerce"  },
              { img: "/industry-shopify.png",      icon: Layers,       iconBg: GREEN,     label: "Shopify"     },
              { img: "/industry-logistics.png",    icon: Truck,        iconBg: ACCENT,    label: "Logistics"   },
              { img: "/industry-education.jpg",    icon: BookOpen,     iconBg: "#DC2626", label: "Education"   },
              { img: "/industry-b2b.png",          icon: Briefcase,    iconBg: "#D97706", label: "B2B"         },
              { img: "/industry-enterprise.png",   icon: BarChart3,    iconBg: GREEN,     label: "Enterprise"  },
            ].map(({ img, icon: Icon, iconBg, label }) => (
              <div key={label}
                className="relative rounded-2xl overflow-hidden shadow-md group"
                style={{ aspectRatio: "4/3" }}>
                <img src={img} alt={label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 30%, transparent 70%)" }} />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: iconBg }}>
                  <Icon className="text-white" style={{ width: 17, height: 17 }} />
                </div>
                <div className="absolute bottom-3 left-3 text-white font-bold text-sm leading-none">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLUE ENGAGEMENT CTA ── */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: ACCENT }}>
            {/* Left — text */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
                Followers Aren&apos;t the Problem.{" "}
                <span style={{ color: "#93C5FD" }}>Engagement Is.</span>
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-7 max-w-md">
                We help brands turn social media followers into engaged communities and loyal
                customers with proven engagement strategies.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 border-white text-white transition-colors duration-200 hover:bg-white hover:text-blue-600">
                  Schedule Your Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Right — team image */}
            <div className="md:w-[36%] flex-shrink-0 relative min-h-[200px] hidden md:block">
              <img src="/ai-seo-team.png" alt="SMM expert"
                className="absolute bottom-0 right-0 h-full w-full object-cover object-top opacity-90" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to right, " + ACCENT + " 0%, transparent 40%)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW SMM SERVICES HELP ── */}
      <section className="py-20" style={{ background: "#f0f8ff" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              How Social Media Marketing Services Help
              <br />
              <span style={{ color: ACCENT }}>Modern Businesses to Grow</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Consistent, strategic social media marketing drives compounding returns across
              brand visibility, customer acquisition, and long-term revenue growth.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Eye,         color: "#2563EB", title: "Increase Brand Visibility",      desc: "Consistent content across platforms keeps your brand top-of-mind for both warm audiences who already know you and cold audiences who are discovering you for the first time." },
              { icon: TrendingUp,  color: "#DC2626", title: "Accelerate Audience Growth",     desc: "Data-driven posting schedules, hashtag strategies, and collaborative content dramatically accelerate follower growth with audiences that match your buyer persona." },
              { icon: Zap,         color: "#D97706", title: "Boost Website Traffic",          desc: "Social content with strong CTAs, link-in-bio strategies, and paid link campaigns consistently drive high-intent traffic to your website and landing pages." },
              { icon: Users,       color: "#16A34A", title: "Build Customer Loyalty",         desc: "Brands that engage authentically on social create loyal communities. Regular interaction, user-generated content campaigns, and responsive community management keep customers coming back." },
              { icon: BarChart3,   color: "#2563EB", title: "Improve Conversion Rates",       desc: "Social proof, retargeting campaigns, and conversion-optimised ad creative work together to turn social audiences into paying customers at a fraction of traditional ad costs." },
              { icon: Globe,       color: "#DC2626", title: "Expand Market Reach",            desc: "Social platforms remove geographic barriers. Our targeting capabilities let you reach specific audiences in any city, country, or demographic segment your business wants to serve." },
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

      {/* ── CASE STUDY ── */}
      {(() => {
        const CASES = [
          {
            img: "/cta-meeting-analytics.png",
            company: "Guidance Whiskey",
            desc: "Guidance Whiskey is a premium American whiskey brand built around craftsmanship, culture, and community. We strengthened their social media presence as a lifestyle-driven premium brand by increasing visibility and deepening audience engagement across Instagram and Facebook.",
            stats: [
              { icon: Eye,       label: "Views",  value: "118.8K", delta: "+53.9%" },
              { icon: TrendingUp, label: "Reach",  value: "13K",    delta: "+9.7%"  },
            ],
            cta: "Get Started",
          },
          {
            img: "/local-seo-team-analytics.png",
            company: "Allostasis Breathwork & Performance",
            desc: "Allostasis is a coaching brand helping athletes and high performers improve focus and recovery through science-backed breathwork. We focused on education-based content and performance-driven reels to improve social media reach and discoverability.",
            stats: [
              { icon: Eye,       label: "Views",  value: "20.7K", delta: "+100%" },
              { icon: TrendingUp, label: "Reach",  value: "10.5K", delta: "+100%" },
            ],
            cta: "Book 1:1 Consultation Call",
          },
          {
            img: "/industry-enterprise.png",
            company: "AAKI Corp.",
            desc: "AAKI Corp is a Calgary-based engineering company. We boosted their social media presence and LinkedIn engagement, driving qualified leads through targeted content strategies and paid social campaigns.",
            stats: [
              { icon: Activity, label: "Engagement", value: "340%", delta: "Increase" },
            ],
            cta: "Get Your Social Audit",
          },
        ];
        const perPage = 3;
        const totalPages = Math.ceil(CASES.length / perPage);
        const visible = CASES.slice(caseStudyPage * perPage, caseStudyPage * perPage + perPage);
        return (
          <section className="py-20" style={{ background: "#f8fafc" }}>
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <div className="text-center mb-14">
                <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
                  Case Study
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
                  Real Social Media Results That Redefine<br />Business Success
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                  Explore our portfolio of successful social media marketing campaigns that delivered exceptional results for our
                  clients across various industries.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {visible.map((c) => (
                  <div key={c.company}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.12)]"
                    style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                    <div className="h-48 overflow-hidden flex-shrink-0">
                      <img src={c.img} alt={c.company} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-black text-slate-900 text-base mb-3">{c.company}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">{c.desc}</p>
                      <div className="flex gap-6 mb-5">
                        {c.stats.map(({ icon: Icon, label, value, delta }) => (
                          <div key={label}>
                            <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase tracking-wide mb-1">
                              <Icon className="w-3 h-3" /> {label}
                            </div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-black text-slate-900 text-base">{value}</span>
                              <span className="text-xs font-bold" style={{ color: GREEN }}>{delta}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link href="/contact"
                        className="w-full text-center py-2.5 rounded-xl border-2 font-bold text-sm transition-colors duration-200 hover:text-white"
                        style={{ borderColor: ACCENT, color: ACCENT }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACCENT; (e.currentTarget as HTMLElement).style.color = "white"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = ACCENT; }}>
                        {c.cta} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination arrows */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCaseStudyPage(p => Math.max(0, p - 1))}
                  disabled={caseStudyPage === 0}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-200 disabled:opacity-30"
                  style={{ borderColor: ACCENT, color: ACCENT }}>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => setCaseStudyPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={caseStudyPage === totalPages - 1}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-200 disabled:opacity-30"
                  style={{ borderColor: ACCENT, color: ACCENT }}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── GREEN REVENUE CTA ── */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: GREEN }}>
            {/* Left — text */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
                Turn Social Media Into{" "}
                <span style={{ color: "#BBF7D0" }}>Predictable Revenue</span>
              </h2>
              <p className="text-green-100 text-sm leading-relaxed mb-7 max-w-md">
                We help brands build scalable social media marketing systems backed by data and
                clear ROI.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 border-white text-white transition-colors duration-200 hover:bg-white"
                  style={{ color: "white" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}>
                  Request a Social Media Session <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Right — woman image */}
            <div className="md:w-[36%] flex-shrink-0 relative min-h-[200px] hidden md:block">
              <img src="/faq-woman.png" alt="Social media specialist"
                className="absolute bottom-0 right-6 h-[110%] object-contain object-bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold px-5 py-2 rounded-full border mb-5"
              style={{ borderColor: ACCENT, color: ACCENT }}>
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Social Media Packages That Turn
              <br />Followers Into{" "}
              <span style={{ color: ACCENT }}>Customers</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Our social media marketing packages focus on building communities, driving engagement, and
              converting followers into loyal customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* ── Starter ── */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: ACCENT }}>
                <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">Starter Plan</h3>
              <p className="text-slate-400 text-sm mb-6">Choose any one platform –<br />Facebook, Instagram, etc.</p>
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">What&apos;s Included:</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "Social media audit & strategy",
                  "Content calendar creation",
                  "8–12 posts per month",
                  "Basic graphic design",
                  "Community management",
                  "Monthly performance report",
                  "Hashtag research & optimization",
                  "Email support",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-slate-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact"
                className="w-full text-center py-3 rounded-xl border-2 font-bold text-sm transition-colors duration-200"
                style={{ borderColor: "#CBD5E1", color: "#64748B" }}>
                Call Now →
              </Link>
            </div>

            {/* ── Growth (featured) ── */}
            <div className="relative rounded-2xl bg-white flex flex-col"
              style={{ border: "2px solid " + GREEN, boxShadow: "0 8px 32px rgba(22,163,74,0.18)" }}>
              {/* Most Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-black text-white"
                style={{ background: GREEN }}>
                MOST POPULAR
              </div>
              <div className="p-8 flex flex-col">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: GREEN }}>
                  <Zap className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Growth Plan</h3>
                <p className="text-slate-400 text-sm mb-6">Choose any 2–3 platforms</p>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">What&apos;s Included:</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {[
                    "Everything in Starter, plus",
                    "16–20 posts per month",
                    "Reels & story content creation",
                    "Influencer outreach & management",
                    "Paid social ad management",
                    "A/B testing & optimization",
                    "Competitor monitoring",
                    "Bi-weekly reporting with insights",
                    "Community engagement strategies",
                    "Priority support",
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-slate-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className="w-full text-center py-3 rounded-xl font-bold text-sm text-white transition-opacity duration-200 hover:opacity-90"
                  style={{ background: GREEN }}>
                  Get Growth Plan →
                </Link>
              </div>
            </div>

            {/* ── Enterprise ── */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "#DC2626" }}>
                <Award className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">Enterprise Plan</h3>
              <p className="text-slate-400 text-sm mb-6">All platforms with full management</p>
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">What&apos;s Included:</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "Tailored to Your Brand Goals",
                  "Full social media strategy & roadmap",
                  "30+ posts per month across all platforms",
                  "Video production & editing",
                  "Advanced influencer partnerships",
                  "Social commerce setup & optimization",
                  "Crisis management & brand monitoring",
                  "Dedicated social media manager",
                  "Weekly performance reviews",
                  "Ongoing strategy refinement",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-slate-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#DC2626" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact"
                className="w-full text-center py-3 rounded-xl border-2 font-bold text-sm transition-colors duration-200"
                style={{ borderColor: "#CBD5E1", color: "#64748B" }}>
                Call Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              How We Deliver{" "}
              <span style={{ color: ACCENT }}>Social Media<br />Results</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Our proven 6-step process ensures your social media presence grows strategically, delivering measurable
              engagement and business results.
            </p>
          </div>

          {/* ── Desktop wave layout ── */}
          {(() => {
            const STEPS = [
              { icon: Search,    iconColor: "#EC4899", iconBg: "#FDF2F8", title: "Discovery\nand Audit",         desc: "We start with a comprehensive social media audit, analyzing your current presence, competitors, and audience to identify opportunities for growth.",                                                              mt: 0  },
              { icon: Layers,    iconColor: "#F97316", iconBg: "#FFF7ED", title: "Strategy\nDevelopment",        desc: "We create a tailored social media strategy including content pillars, posting schedules, platform selection, and campaign roadmaps aligned with your goals.",                                                mt: 60 },
              { icon: Users,     iconColor: "#38BDF8", iconBg: "#F0F9FF", title: "Content\nCreation",            desc: "Our creative team produces engaging content including graphics, videos, stories, and copy that resonates with your target audience across all platforms.",                                                  mt: 110},
              { icon: Zap,       iconColor: "#22C55E", iconBg: "#F0FDF4", title: "Campaign\nLaunch",             desc: "We launch your social media campaigns with precision timing, targeted audiences, and optimized ad placements to maximize initial impact and reach.",                                                       mt: 0  },
              { icon: BarChart,  iconColor: "#A855F7", iconBg: "#FAF5FF", title: "Monitor\nand Optimize",        desc: "We continuously track engagement, reach, conversions, and ROI. Our team adjusts strategies in real-time to improve performance and eliminate waste.",                                                     mt: 60 },
              { icon: TrendingUp,iconColor: "#EC4899", iconBg: "#FDF2F8", title: "Scale\nand Grow",              desc: "After identifying winning strategies, we scale successful campaigns, expand to new platforms, and continuously grow your social media presence.",                                                         mt: 0  },
            ];
            const dotColors = ["#EC4899","#F97316","#38BDF8","#22C55E","#A855F7","#EC4899"];
            return (
              <>
                {/* Cards row — desktop */}
                <div className="hidden lg:flex items-start gap-4 mb-2">
                  {STEPS.map(({ icon: Icon, iconColor, iconBg, title, desc, mt }) => (
                    <div key={title}
                      className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 flex flex-col text-center transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.12)]"
                      style={{ marginTop: mt, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: iconBg }}>
                        <Icon className="w-5 h-5" style={{ color: iconColor }} strokeWidth={1.8} />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 whitespace-pre-line">{title}</h3>
                      <p className="text-slate-400 text-[11px] leading-relaxed flex-1">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Wave SVG + dots — desktop */}
                <div className="hidden lg:block relative w-full" style={{ height: 80 }}>
                  <svg width="100%" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none" className="absolute inset-0">
                    <defs>
                      <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#EC4899" />
                        <stop offset="20%"  stopColor="#F97316" />
                        <stop offset="40%"  stopColor="#38BDF8" />
                        <stop offset="60%"  stopColor="#22C55E" />
                        <stop offset="80%"  stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 83,18 C 150,18 150,42 233,42 C 316,42 316,66 400,66 C 484,66 484,18 567,18 C 650,18 650,42 733,42 C 816,42 840,18 917,18"
                      fill="none" stroke="url(#waveGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  {/* Dots */}
                  <div className="absolute inset-0 flex items-start justify-between px-[8.3%]">
                    {[
                      { label: "Step 01", color: "#EC4899", top: 9 },
                      { label: "Step 02", color: "#F97316", top: 33 },
                      { label: "Step 03", color: "#38BDF8", top: 57 },
                      { label: "Step 04", color: "#22C55E", top: 9 },
                      { label: "Step 05", color: "#A855F7", top: 33 },
                      { label: "Step 06", color: "#EC4899", top: 9 },
                    ].map(({ label, color, top }) => (
                      <div key={label} className="flex flex-col items-center gap-1.5" style={{ marginTop: top }}>
                        <div className="w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center"
                          style={{ borderColor: color }}>
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden mb-8">
                  {STEPS.map(({ icon: Icon, iconColor, iconBg, title, desc }, i) => (
                    <div key={title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4 items-start"
                      style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
                        <Icon className="w-4.5 h-4.5" style={{ color: iconColor, width: 18, height: 18 }} strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: dotColors[i] }}>Step 0{i + 1}</div>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 whitespace-pre-line">{title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}

          <div className="flex justify-center mt-10">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm"
              style={{ background: ACCENT }}>
              Start Your Social Media Journey <Send className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Frequently Asked Questions About{" "}
              <span style={{ color: ACCENT }}>Social Media Marketing</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Get answers to the most common questions about our Social Media Marketing services.
            </p>
          </div>

          <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white">
              <img src="/faq-woman.png" alt="Still have questions?" className="w-full object-cover h-52" />
              <div className="p-6 text-center">
                <h3 className="text-lg font-black text-slate-900 mb-2">Still Have Questions?</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">
                  Can&apos;t find the answer you&apos;re looking for? Our social media experts are ready to help.
                </p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  Ask Our SMM Experts <ArrowRight className="w-3.5 h-3.5" />
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
                        transition={{ duration: 0.2 }}>
                        <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                          <span className="font-black text-slate-400 mr-2">A{i + 1}.</span>
                          {faq.a}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LET'S GET STARTED ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* LEFT — form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-10">
                Let&apos;s{" "}
                <span style={{ color: ACCENT }}>Get Started</span>
              </h2>

              <form
                onSubmit={e => { e.preventDefault(); window.location.href = "/contact"; }}
                className="space-y-7">
                {/* Name */}
                <div>
                  <input
                    type="text" placeholder="Your Name*" value={form.name}
                    onChange={setField("name")} required
                    className="w-full pb-2.5 text-slate-800 text-sm placeholder-slate-400 bg-transparent outline-none"
                    style={{ borderBottom: "1px solid #CBD5E1" }} />
                </div>
                {/* Email */}
                <div>
                  <input
                    type="email" placeholder="Business Email*" value={form.email}
                    onChange={setField("email")} required
                    className="w-full pb-2.5 text-slate-800 text-sm placeholder-slate-400 bg-transparent outline-none"
                    style={{ borderBottom: "1px solid #CBD5E1" }} />
                </div>
                {/* Phone */}
                <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2.5">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-500 border-r border-slate-300 pr-3 mr-1 select-none">US +1</span>
                  <input
                    type="tel" placeholder="Phone Number *" value={form.phone}
                    onChange={setField("phone")}
                    className="flex-1 text-slate-800 text-sm placeholder-slate-400 bg-transparent outline-none" />
                </div>
                {/* Budget */}
                <div>
                  <select
                    value={form.budget} onChange={setField("budget")}
                    className="w-full pb-2.5 text-sm bg-transparent outline-none cursor-pointer"
                    style={{ borderBottom: "1px solid #CBD5E1", color: form.budget ? "#1e293b" : "#94a3b8" }}>
                    <option value="" disabled>Select Budget</option>
                    <option value="<1k">Under $1,000 / mo</option>
                    <option value="1k-3k">$1,000 – $3,000 / mo</option>
                    <option value="3k-5k">$3,000 – $5,000 / mo</option>
                    <option value="5k+">$5,000+ / mo</option>
                  </select>
                </div>
                {/* Message */}
                <div>
                  <textarea
                    placeholder="Tell us about your project*" value={form.message}
                    onChange={setField("message")} rows={4}
                    className="w-full text-slate-800 text-sm placeholder-slate-400 bg-transparent outline-none resize-y"
                    style={{ borderBottom: "1px solid #CBD5E1" }} />
                </div>
                {/* Submit */}
                <button type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white text-sm"
                  style={{ background: ACCENT }}>
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* RIGHT — red card */}
            <div className="rounded-3xl p-10 text-white" style={{ background: "#DC2626" }}>
              <h3 className="text-xl font-black mb-1">Hate Filling out Forms?</h3>
              <p className="text-red-200 text-sm mb-8 underline underline-offset-2 cursor-pointer">Email us.</p>

              <div className="space-y-6">
                {[
                  { label: "Request a Quote",                     email: "business@topseoservices.co" },
                  { label: "Partners Enquires",                   email: "partners@topseoservices.co" },
                  { label: "Reference Checks /Misc. HR Enquires", email: "hr@topseoservices.co"       },
                  { label: "Other Enquires",                      email: "info@topseoservices.co"     },
                ].map(({ label, email }) => (
                  <div key={label} className="flex items-start gap-3 pb-5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-0.5">{label}</div>
                      <a href={`mailto:${email}`}
                        className="text-red-200 text-xs hover:text-white transition-colors">{email}</a>
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
