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
  BookOpen, HelpCircle, Music2, Share2, ThumbsUp, Video,
  Linkedin, Twitter, Youtube, Hash, Image,
  BarChart, PieChart, Activity, Bell, Calendar, UserCheck,
  Camera, PlayCircle, ShoppingBag, Film, Bookmark,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const ACCENT = "#2563EB";
const ACCENT_LIGHT = "#EFF6FF";
const GREEN = "#16A34A";
const TK = "#FF0050";

const FAQS = [
  { q: "What is TikTok Marketing and why does my business need it?",               a: "TikTok Marketing is the strategic use of TikTok's short-form video platform — organic videos, TikTok LIVE, TikTok Shop, and TikTok Ads — to build brand awareness, drive viral reach, and generate sales at scale. With over 1 billion monthly active users and an algorithm that gives any account the potential to go viral regardless of follower count, TikTok offers unmatched organic reach. We build TikTok strategies that create genuine entertainment value for your audience while converting views into customers." },
  { q: "How long does it take to see results from TikTok Marketing?",              a: "TikTok is the fastest-moving platform — a single well-crafted video can go viral within hours and generate millions of views. Paid TikTok Ad campaigns can drive traffic and conversions within 24–48 hours of launch. Organic account growth typically takes 4–8 weeks of consistent posting to gain momentum, though viral moments can compress this timeline dramatically. We post consistently and monitor early signals to capitalise on your highest-performing content quickly." },
  { q: "What types of content do you create for TikTok?",                          a: "We produce everything your TikTok presence needs: short-form entertainment videos (15–60 seconds), TikTok Duets and Stitches for trend-jacking, POV and storytelling formats, product demonstrations and unboxing, Before & After transformations, trending sound-led content, GRWM (Get Ready With Me) formats, TikTok LIVE sessions, and branded hashtag challenge concepts. Every video is scripted and edited to hook viewers in the first 1–2 seconds and hold attention to the end." },
  { q: "How does TikTok's algorithm work and can you beat it?",                    a: "TikTok's For You Page (FYP) algorithm distributes content based on video completion rate, re-watches, shares, comments, and saves — not follower count. This means a brand-new account can reach millions with the right video. We reverse-engineer high-performing content in your niche, identify the hooks and formats that drive completion and engagement, and build a consistent posting strategy that compounds your reach over time." },
  { q: "Can TikTok Marketing drive real sales and revenue?",                       a: "Yes. TikTok has become one of the most powerful e-commerce channels through TikTok Shop (in-app purchasing), shoppable video ads, and the '#TikTokMadeMeBuyIt' phenomenon. We run full-funnel TikTok strategies — brand awareness through organic content, retargeting via the TikTok Pixel, and direct conversion campaigns through In-Feed Ads and Shopping Ads. Our clients consistently see strong ROAS, particularly in fashion, beauty, food, lifestyle, and consumer products." },
  { q: "What is the difference between organic TikTok and TikTok Ads?",           a: "Organic TikTok builds your account through consistent posting — earning followers, views, and brand awareness through entertaining content that TikTok's algorithm distributes. TikTok Ads (In-Feed Ads, TopView Ads, Branded Hashtag Challenges, Spark Ads, Shopping Ads) place your content in front of targeted audiences immediately. The most effective strategy combines both: organic content proves creative concepts while paid ads scale what works and drive direct conversions." },
  { q: "How do you measure the success of TikTok campaigns?",                     a: "We track video views, watch time, average watch percentage, completion rate, likes, comments, shares, saves, profile visits, follower growth, website clicks (via UTM), TikTok Pixel conversions, ad impressions, click-through rate, cost-per-click, and TikTok Shop revenue. Monthly reports translate every metric into plain business language — what content worked, why it worked, and what we're testing next." },
  { q: "Do I need a large budget for TikTok Marketing?",                          a: "No. Organic TikTok marketing requires no ad spend — just creative, consistent short-form video. TikTok's algorithm democratises reach, making it possible to grow rapidly from zero with the right content strategy. For TikTok Ads, minimum budgets are accessible and the platform's strong e-commerce performance often delivers excellent ROAS even on modest spend. We validate organic concepts before scaling with paid budget." },
  { q: "What is TikTok Shop and should my brand use it?",                         a: "TikTok Shop is TikTok's integrated e-commerce feature that lets users purchase products directly within the app — through shoppable videos, LIVE shopping streams, and a dedicated Shop tab on your profile. It dramatically shortens the path from discovery to purchase. We set up and manage TikTok Shop catalogues, create shoppable content, run LIVE shopping sessions, and manage affiliate partnerships with TikTok creators to drive in-app sales." },
  { q: "Can you manage TikTok alongside other social platforms?",                  a: "Yes. We manage multi-channel social strategies simultaneously, ensuring TikTok receives content tailored to its vertical video format, fast-paced entertainment expectations, and trend-driven algorithm. TikTok requires a fundamentally different content approach to Instagram, LinkedIn, or Pinterest — and we produce platform-native content for every channel without diluting quality or stretching your team." },
  { q: "What industries do you serve with TikTok Marketing?",                     a: "We work across fashion, beauty, health & wellness, food & beverage, fitness, lifestyle, consumer electronics, home & interiors, travel, entertainment, gaming, e-commerce, and direct-to-consumer brands. TikTok is especially powerful for B2C brands with visually demonstrable products — but we also deliver results for B2B brands targeting younger professionals and decision-makers on the platform." },
  { q: "How do I get started with your TikTok Marketing services?",                a: "Getting started is simple. Book a free TikTok strategy call — we audit your current TikTok presence (or build one from scratch), analyse your top competitors' best-performing content, and present a tailored TikTok content and growth plan within 5 business days. No long-term contract required at the discovery stage. You only commit once you're confident the strategy is right for your brand." },
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
export function TikTokMarketingPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [openPlatformCard, setOpenPlatformCard] = useState<number | null>(null);
  const [caseStudyPage, setCaseStudyPage] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
  const setField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="font-sans antialiased overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pb-28" style={{ background: "#0B0F1A" }}>
        {/* Background image — clipped independently so it never bleeds into stats bar */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img src="/cta-meeting-analytics.png" alt="TikTok Marketing background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,15,26,0.96) 0%, rgba(11,15,26,0.80) 55%, rgba(11,15,26,0.90) 100%)" }} />

          {/* Bokeh decorative blobs — inside overflow-hidden so they stay within the image layer */}
          <div className="absolute rounded-full blur-3xl" style={{ width: 320, height: 320, background: "rgba(255,0,80,0.22)", top: "12%", right: "35%" }} />
          <div className="absolute rounded-full blur-3xl" style={{ width: 240, height: 240, background: "rgba(139,92,246,0.22)", top: "52%", right: "8%"  }} />
          <div className="absolute rounded-full blur-2xl" style={{ width: 180, height: 180, background: "rgba(249,115,22,0.18)", top: "22%", right: "12%" }} />
          <div className="absolute rounded-full blur-2xl" style={{ width: 140, height: 140, background: "rgba(37,99,235,0.22)",  top: "68%", left: "6%"  }} />
        </div>

        {/* Main content */}
        <div className="relative w-full container mx-auto px-6 md:px-12 pt-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services/social-media-marketing" className="hover:text-white transition-colors">Social Media Marketing</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">TikTok Marketing</span>
          </nav>

          <div className="grid md:grid-cols-[55%_45%] gap-10 items-center">
            {/* LEFT — text */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 text-xs font-bold tracking-widest uppercase"
                style={{ background: "rgba(255,0,80,0.18)", border: "1px solid rgba(255,0,80,0.4)", color: "#FCA5A5" }}>
                <Music2 className="w-3.5 h-3.5" style={{ color: TK }} />
                #1 TikTok Marketing Agency
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black leading-[1.08] mb-4">
                <span style={{
                  background: "linear-gradient(135deg, #60A5FA 0%, #818CF8 50%, #C084FC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  TikTok Marketing
                  <br />Services
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
                to Boost your Brand Presence &amp; Conversions
              </p>

              {/* Body */}
              <p className="text-slate-300 text-sm leading-relaxed mb-10 max-w-xl">
                Have you ever thought about why famous influencers&apos; TikTok posts receive millions of likes,
                comments, and shares? Well, we know the cheat code: strategic{" "}
                <strong className="text-white">TikTok marketing services</strong>{" "}
                to elevate your conversion rate and follower count. Top SEO Services provides effective solutions
                that help businesses achieve their performance goals through the success of their operational targets.
              </p>

              {/* CTA */}
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                style={{ background: ACCENT }}>
                Talk to a Social Media Expert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* RIGHT — phone mockup */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative" style={{ width: 260 }}>
                {/* Phone shell */}
                <div className="relative rounded-[44px] overflow-hidden shadow-2xl"
                  style={{ border: "3px solid rgba(255,255,255,0.12)", background: "#111", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}>

                  {/* Dynamic island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black" style={{ width: 90, height: 22 }} />

                  {/* Screen */}
                  <div style={{ height: 500, background: "#fafafa" }}>

                    {/* TikTok top bar */}
                    <div className="flex items-center justify-between px-4 pt-8 pb-2" style={{ background: "white" }}>
                      <span className="font-black text-sm text-slate-900" style={{ fontFamily: "serif" }}>TikTok</span>
                      <div className="flex gap-3 items-center">
                        <div className="w-5 h-5 rounded-full" style={{ background: "#FF0050" }} />
                        <MessageSquare className="w-4 h-4 text-slate-800" />
                      </div>
                    </div>

                    {/* Stories row */}
                    <div className="flex gap-2.5 px-3 py-2 overflow-hidden" style={{ background: "white" }}>
                      {[TK, "#F97316", "#8B5CF6", "#16A34A"].map((c, i) => (
                        <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1">
                          <div className="w-11 h-11 rounded-full p-0.5"
                            style={{ background: `linear-gradient(45deg, ${c}, #F59E0B)` }}>
                            <div className="w-full h-full rounded-full bg-white p-0.5">
                              <div className="w-full h-full rounded-full overflow-hidden bg-slate-200">
                                <img src={i === 0 ? "/faq-woman.png" : i === 1 ? "/ai-seo-team.png" : i === 2 ? "/industry-b2b.png" : "/industry-ecommerce.png"}
                                  className="w-full h-full object-cover object-top" />
                              </div>
                            </div>
                          </div>
                          <span className="text-[7px] text-slate-600">user_{i + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ height: 1, background: "#f0f0f0" }} />

                    {/* Post 1 */}
                    <div style={{ background: "white" }}>
                      <div className="flex items-center gap-2 px-3 py-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200">
                          <img src="/faq-woman.png" className="w-full h-full object-cover object-top" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-800">topmarketing</span>
                        <span className="text-[8px] text-slate-400 ml-auto">Follow</span>
                      </div>
                      <div className="overflow-hidden" style={{ height: 140 }}>
                        <img src="/industry-ecommerce.png" className="w-full h-full object-cover" />
                      </div>
                      <div className="px-3 py-1.5 flex items-center gap-3">
                        <Heart className="w-4 h-4 text-slate-700" />
                        <MessageSquare className="w-4 h-4 text-slate-700" />
                        <Share2 className="w-4 h-4 text-slate-700" />
                        <Bookmark className="w-4 h-4 text-slate-700 ml-auto" />
                      </div>
                      <div className="px-3 pb-2">
                        <span className="text-[8px] font-bold text-slate-700">1,468 likes</span>
                      </div>
                    </div>

                    {/* Post 2 (partial) */}
                    <div style={{ background: "white", borderTop: "1px solid #f0f0f0" }}>
                      <div className="flex items-center gap-2 px-3 py-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200">
                          <img src="/ai-seo-team.png" className="w-full h-full object-cover object-top" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-800">brandsocial</span>
                      </div>
                      <div className="overflow-hidden" style={{ height: 80 }}>
                        <img src="/cta-meeting-analytics.png" className="w-full h-full object-cover" />
                      </div>
                    </div>

                  </div>

                  {/* iPhone bottom bar */}
                  <div className="flex items-center justify-center py-2" style={{ background: "#fafafa" }}>
                    <div className="w-24 h-1 rounded-full bg-slate-800 opacity-30" />
                  </div>
                </div>

                {/* Side buttons */}
                <div className="absolute rounded-l-sm" style={{ left: -3, top: 90, width: 3, height: 28, background: "rgba(255,255,255,0.15)" }} />
                <div className="absolute rounded-l-sm" style={{ left: -3, top: 126, width: 3, height: 44, background: "rgba(255,255,255,0.15)" }} />
                <div className="absolute rounded-l-sm" style={{ left: -3, top: 178, width: 3, height: 44, background: "rgba(255,255,255,0.15)" }} />
                <div className="absolute rounded-r-sm" style={{ right: -3, top: 138, width: 3, height: 60, background: "rgba(255,255,255,0.15)" }} />

                {/* Glow under phone */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-40"
                  style={{ width: 200, height: 40, background: TK }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── FLOATING STATS BAR ── */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl translate-y-1/2 z-10">
          <div className="bg-white rounded-2xl shadow-2xl px-6 md:px-10 py-5"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-slate-200">
              {[
                { icon: Camera,     iconBg: "#EFF6FF", iconColor: ACCENT, value: "5,000+",  label: "Posts Managed"       },
                { icon: TrendingUp, iconBg: "#F0FDF4", iconColor: GREEN,  value: "350%",    label: "Avg Engagement Growth" },
                { icon: Flame,      iconBg: "#FFF7ED", iconColor: "#F97316", value: "800+", label: "Brands Served"        },
                { icon: UserCheck,  iconBg: "#F5F3FF", iconColor: "#8B5CF6", value: "98%",  label: "Client Retention"     },
              ].map(({ icon: Icon, iconBg, iconColor, value, label }) => (
                <div key={label} className="flex items-center gap-3 md:px-8 first:pl-0 last:pr-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: iconBg }}>
                    <Icon className="w-5 h-5" style={{ color: iconColor }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-xl font-black leading-none mb-0.5" style={{ color: iconColor }}>{value}</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS INSTAGRAM MARKETING ── */}
      <section className="pt-28 pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Section heading — centered */}
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center leading-tight mb-14">
            What Is TikTok Marketing and<br />
            <span style={{ color: ACCENT }}>How Does It Work?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* LEFT — overlapping image collage with floating badges */}
            <div className="relative h-[400px] select-none">

              {/* Main image — tall left card */}
              <div className="absolute top-0 left-0 w-[55%] h-[85%] rounded-2xl overflow-hidden shadow-lg">
                <img src="/ai-seo-team.png" alt="TikTok marketing on mobile"
                  className="w-full h-full object-cover" />
              </div>

              {/* Secondary image — overlapping bottom-right */}
              <div className="absolute bottom-0 right-0 w-[54%] h-[72%] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img src="/cta-meeting-analytics.png" alt="TikTok social media icons"
                  className="w-full h-full object-cover" />

                {/* Pink engagement badge — on top of secondary image */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-2 text-white whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #FF0050, #F97316)", boxShadow: "0 4px 16px rgba(255,0,80,0.45)" }}>
                  <BarChart3 className="w-3.5 h-3.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-extrabold leading-none">5.2× More Engagement</p>
                    <p className="text-[10px] opacity-85 leading-tight mt-0.5">Average TikTok performance</p>
                  </div>
                </div>
              </div>

              {/* White followers badge — bottom-left floating card */}
              <div className="absolute -bottom-5 left-0 flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 z-10"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900 leading-none">2,000,000+ Followers Grown</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Across client TikTok accounts</p>
                </div>
              </div>
            </div>

            {/* RIGHT — description + CTA */}
            <div className="pt-4">
              <p className="text-slate-600 leading-relaxed mb-5">
                TikTok Marketing refers to the process of using the TikTok platform to create brand recognition
                and interact with specific customer groups while increasing sales through it. By posting content
                at specific times and running ads to specific audiences while interacting with their audience,
                businesses can increase their visibility and impact their audience.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                TikTok&apos;s visual appeal and wide audience make it an essential tool for marketers looking to
                tap into consumer desires and connect with potential clients. So, boost your TikTok marketing
                strategy with proven engagement tactics.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border-2 transition-colors"
                style={{ borderColor: ACCENT, color: ACCENT }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = ACCENT;
                  (e.currentTarget as HTMLAnchorElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = ACCENT;
                }}>
                Talk to a Social Media Expert
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── INSTAGRAM FEATURES GRID ── */}
      <section id="features" className="py-20" style={{ background: "#F0F4FF" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              TikTok Features We Master to Grow Your Brand
              <br />
              <span style={{ color: ACCENT }}>and Engage Your Audience</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Top SEO Services delivers comprehensive TikTok marketing services designed to grow your audience,
              boost engagement, and drive real business results through the world&apos;s most visual social platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "TikTok Reels Marketing",
                img: "/industry-ecommerce.png",
                desc: "Reels are TikTok's highest-reach format. Our creative team produces trend-native, brand-aligned Reels that maximise organic reach and attract new followers at scale.",
              },
              {
                name: "TikTok Stories Management",
                img: "/cta-laptop-analytics.png",
                desc: "We design strategic Stories sequences that drive profile visits, link clicks, and DM conversations — plus curated Highlights that serve as a permanent showcase for new visitors.",
              },
              {
                name: "TikTok Shopping & E-commerce",
                img: "/industry-shopify.png",
                desc: "We set up and optimise your TikTok Shop catalogue, tag products across Feed, Reels, and Stories, and build a seamless in-app purchase experience that shortens the path to checkout.",
              },
              {
                name: "Visual Content & Feed Design",
                img: "/ai-seo-visual.png",
                desc: "A cohesive, well-curated Feed builds brand authority and trust. We design scroll-stopping visuals and educational carousel posts that drive saves, shares, and profile follows.",
              },
              {
                name: "Influencer Collaboration",
                img: "/ai-seo-team.png",
                desc: "We identify, vet, and manage TikTok creator partnerships — from nano-influencers with niche, engaged audiences to macro influencers for mass brand awareness.",
              },
              {
                name: "Hashtag Strategy & Research",
                img: "/industry-b2b.png",
                desc: "We research and build data-driven hashtag sets for every post, targeting the exact keywords your ideal audience follows to maximise discoverability and organic reach.",
              },
              {
                name: "TikTok Ads Management",
                img: "/local-cta-analytics.png",
                desc: "From prospecting campaigns to retargeting funnels, we manage your TikTok Ad spend with precision — building creative that converts with measurable ROI.",
              },
              {
                name: "Performance Analytics & Reporting",
                img: "/cta-meeting-analytics.png",
                desc: "We track every metric that matters — reach, engagement rate, follower growth, story views, and conversion events — with clear monthly reports tied to business outcomes.",
              },
              {
                name: "Community Growth & Engagement",
                img: "/local-seo-team-analytics.png",
                desc: "We actively engage your followers through comments, DMs, and community interactions — turning passive viewers into loyal brand advocates who drive word-of-mouth growth.",
              },
            ].map((feature, i) => (
              <div
                key={feature.name}
                className="rounded-2xl overflow-hidden bg-white"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,99,235,0.13)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)")}
              >
                {/* Image area */}
                <div className="relative overflow-hidden" style={{ height: 195 }}>
                  <img
                    src={feature.img}
                    alt={feature.name}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.4s", transform: openPlatformCard === i ? "scale(1.05)" : "scale(1)" }}
                  />

                  {/* Description overlay — shown when expanded */}
                  {openPlatformCard === i && (
                    <div className="absolute inset-0 flex items-center justify-center p-5 text-center"
                      style={{ background: "rgba(15,23,42,0.88)" }}>
                      <p className="text-white text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  )}

                  {/* Blue + / × toggle button */}
                  <button
                    onClick={() => setOpenPlatformCard(openPlatformCard === i ? null : i)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xl leading-none z-10 transition-all duration-200 hover:scale-110"
                    style={{ background: ACCENT, boxShadow: "0 2px 8px rgba(37,99,235,0.45)" }}
                    aria-label={openPlatformCard === i ? "Close" : "Expand"}
                  >
                    {openPlatformCard === i ? "×" : "+"}
                  </button>
                </div>

                {/* Feature name */}
                <div className="px-4 py-4">
                  <p className="text-slate-900 font-bold text-sm">{feature.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK IMAGE CTA ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: "#1A1F2E" }}>
            <div className="md:w-[46%] flex-shrink-0 relative min-h-[220px]">
              <img src="/local-cta-analytics.png" alt="TikTok growth analytics"
                className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 55%, #1A1F2E)" }} />
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-12 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                Ready to Build an TikTok Presence{" "}
                <span style={{ color: TK }}>That Drives Revenue?</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-md">
                Our TikTok specialists craft strategies tailored to your brand, audience, and growth goals —
                delivering Reels, ads, and content that convert followers into customers.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                  style={{ background: TK }}>
                  Book a Free TikTok Audit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY INSTAGRAM MARKETING MATTERS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Why TikTok<br />
              <span style={{ color: ACCENT }}>Marketing Matters</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              In this competitive world, TikTok marketing performance is vital for businesses looking to broaden their
              reach, engage their audience, and boost conversions. With our results-focused TikTok marketing services
              and effective content strategies, enterprises can create appealing visual stories that resonate with the
              target users.
            </p>
          </div>

          {(() => {
            const cards = [
              { num: "01", icon: Target,      color: ACCENT,    title: "Brand Awareness",       desc: "Utilize TikTok's massive reach to grow your brand's presence and recognition." },
              { num: "02", icon: TrendingUp,  color: "#16A34A", title: "Audience Engagement",   desc: "Build deeper connections with users through interactive content like polls, stories, and comments." },
              { num: "03", icon: BarChart3,   color: "#DC2626", title: "Analytics & Insights",  desc: "Track follower growth, engagement rates, and post reach with essential performance metrics to evaluate success." },
              { num: "04", icon: Zap,         color: "#D97706", title: "Traffic & Conversions", desc: "The campaign's effectiveness gets assessed through its ability to generate website traffic and its success in converting visitors into customers." },
              { num: "05", icon: Users,       color: ACCENT,    title: "Sales & Leads",         desc: "The lead development process enables businesses to convert TikTok followers into customers through direct sales opportunities." },
            ];
            return (
              <>
                {/* Row 1 — 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  {cards.slice(0, 3).map(({ num, icon: Icon, color, title, desc }) => {
                    const isHovered = hoveredCard === num;
                    return (
                      <div key={num}
                        onMouseEnter={() => setHoveredCard(num)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="rounded-2xl border p-6 flex flex-col cursor-default"
                        style={{
                          background: isHovered ? color : "white",
                          borderColor: isHovered ? color : "#E2E8F0",
                          boxShadow: isHovered ? `0 8px 32px ${color}44` : "0 1px 6px rgba(0,0,0,0.06)",
                          transition: "background 0.25s, box-shadow 0.25s, border-color 0.25s",
                        }}>
                        <div className="flex items-start justify-between mb-5">
                          <Icon className="w-6 h-6" style={{ color: isHovered ? "white" : color, transition: "color 0.25s" }} />
                          <span className="text-3xl font-black leading-none select-none"
                            style={{ color: isHovered ? "rgba(255,255,255,0.18)" : "#E2E8F0", transition: "color 0.25s" }}>
                            {num}
                          </span>
                        </div>
                        <h3 className="font-black text-base mb-2"
                          style={{ color: isHovered ? "white" : "#0F172A", transition: "color 0.25s" }}>
                          {title}
                        </h3>
                        <p className="text-xs leading-relaxed flex-1"
                          style={{ color: isHovered ? "rgba(255,255,255,0.82)" : "#64748B", transition: "color 0.25s" }}>
                          {desc}
                        </p>
                        <div className="mt-5 h-[3px] w-10 rounded-full"
                          style={{ background: isHovered ? "rgba(255,255,255,0.45)" : color, transition: "background 0.25s" }} />
                      </div>
                    );
                  })}
                </div>

                {/* Row 2 — 2 cards centered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {cards.slice(3).map(({ num, icon: Icon, color, title, desc }) => {
                    const isHovered = hoveredCard === num;
                    return (
                      <div key={num}
                        onMouseEnter={() => setHoveredCard(num)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="rounded-2xl border p-6 flex flex-col cursor-default"
                        style={{
                          background: isHovered ? color : "white",
                          borderColor: isHovered ? color : "#E2E8F0",
                          boxShadow: isHovered ? `0 8px 32px ${color}44` : "0 1px 6px rgba(0,0,0,0.06)",
                          transition: "background 0.25s, box-shadow 0.25s, border-color 0.25s",
                        }}>
                        <div className="flex items-start justify-between mb-5">
                          <Icon className="w-6 h-6" style={{ color: isHovered ? "white" : color, transition: "color 0.25s" }} />
                          <span className="text-3xl font-black leading-none select-none"
                            style={{ color: isHovered ? "rgba(255,255,255,0.18)" : "#E2E8F0", transition: "color 0.25s" }}>
                            {num}
                          </span>
                        </div>
                        <h3 className="font-black text-base mb-2"
                          style={{ color: isHovered ? "white" : "#0F172A", transition: "color 0.25s" }}>
                          {title}
                        </h3>
                        <p className="text-xs leading-relaxed flex-1"
                          style={{ color: isHovered ? "rgba(255,255,255,0.82)" : "#64748B", transition: "color 0.25s" }}>
                          {desc}
                        </p>
                        <div className="mt-5 h-[3px] w-10 rounded-full"
                          style={{ background: isHovered ? "rgba(255,255,255,0.45)" : color, transition: "background 0.25s" }} />
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: TK }}>
              Industries
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Industries We Support With{" "}
              <span style={{ color: TK }}>TikTok<br />Marketing</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Our TikTok marketing agency delivers industry-scaled services that boost follower growth, content reach,
              and lead quality by framing every strategy with real customer behaviour and platform-specific intent.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { img: "/industry-healthcare.png",  icon: Heart,        iconBg: TK,        label: "Healthcare"  },
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

      {/* ── PINK ENGAGEMENT CTA ── */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: TK }}>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
                Followers Aren&apos;t the Problem.{" "}
                <span style={{ color: "#FDA4AF" }}>Engagement Is.</span>
              </h2>
              <p className="text-pink-100 text-sm leading-relaxed mb-7 max-w-md">
                We help brands turn TikTok followers into engaged communities and loyal
                customers with proven Reels, Stories, and ad strategies.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 border-white text-white transition-colors duration-200 hover:bg-white hover:text-pink-600">
                  Schedule Your TikTok Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="md:w-[36%] flex-shrink-0 relative min-h-[200px] hidden md:block">
              <img src="/ai-seo-team.png" alt="TikTok marketing expert"
                className="absolute bottom-0 right-0 h-full w-full object-cover object-top opacity-90" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to right, " + TK + " 0%, transparent 40%)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW INSTAGRAM SERVICES HELP ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              How TikTok Marketing Services Help
              <br />
              <span style={{ color: ACCENT }}>Modern Businesses to Grow</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Our TikTok marketing strategies combine creative storytelling, data analytics, and platform expertise to
              deliver measurable growth and sustainable engagement for your brand.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Target,
                color: ACCENT,
                title: "Audience Analysis & Targeting",
                desc: "We analyze your ideal TikTok audience — their demographics, interests, behaviors, and peak activity times — to create content strategies that resonate and drive meaningful engagement.",
              },
              {
                icon: Video,
                color: "#DC2626",
                title: "Reels & Video Strategy",
                desc: "Our video team creates scroll-stopping TikTok Reels and video content using trending formats, audio, and hooks that maximize organic reach and virality on the platform.",
              },
              {
                icon: Layers,
                color: "#D97706",
                title: "Visual Content Design",
                desc: "Our designers craft stunning feed posts, carousel slides, and story templates that maintain brand consistency while standing out in crowded TikTok feeds.",
              },
              {
                icon: BarChart3,
                color: "#16A34A",
                title: "Performance Tracking",
                desc: "We monitor every key metric — reach, impressions, engagement rate, profile visits, website clicks, and conversions — to measure success and identify growth opportunities.",
              },
              {
                icon: Users,
                color: ACCENT,
                title: "Community Management",
                desc: "Our team actively manages your TikTok community through timely responses, comment engagement, DM management, and proactive outreach that builds loyal brand advocates.",
              },
              {
                icon: RefreshCw,
                color: "#DC2626",
                title: "Strategy Refinement",
                desc: "We continuously test and optimize content types, posting schedules, hashtag sets, and engagement tactics based on real performance data to ensure ongoing improvement.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title}
                className="rounded-2xl bg-white border border-slate-100 p-7 flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.10)]"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <Icon className="w-6 h-6 mb-5" style={{ color }} strokeWidth={1.8} />
                <h3 className="font-bold text-[15px] leading-snug mb-3" style={{ color }}>{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold px-5 py-2 rounded-full border mb-5"
              style={{ borderColor: TK, color: TK }}>
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              TikTok Marketing Packages That Turn
              <br />Followers Into{" "}
              <span style={{ color: TK }}>Customers</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Our TikTok marketing packages focus on building engaged audiences, driving Reels reach,
              and converting followers into loyal customers through proven content and ad strategies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Starter */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: TK }}>
                <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">Starter Plan</h3>
              <p className="text-slate-400 text-sm mb-6">TikTok account management<br />— Feed posts, Stories & basic Reels</p>
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">What&apos;s Included:</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {["TikTok account audit & strategy","Content calendar creation","8–12 posts per month","Basic Reels & Stories production","Hashtag research & optimisation","Community management","Monthly performance report","Email support"].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-slate-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: TK }} />{f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full text-center py-3 rounded-xl border-2 font-bold text-sm transition-colors duration-200"
                style={{ borderColor: "#CBD5E1", color: "#64748B" }}>Call Now →</Link>
            </div>
            {/* Growth */}
            <div className="relative rounded-2xl bg-white flex flex-col"
              style={{ border: "2px solid " + GREEN, boxShadow: "0 8px 32px rgba(22,163,74,0.18)" }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-black text-white" style={{ background: GREEN }}>
                MOST POPULAR
              </div>
              <div className="p-8 flex flex-col">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: GREEN }}>
                  <Zap className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Growth Plan</h3>
                <p className="text-slate-400 text-sm mb-6">Full TikTok management + paid ads<br />and Reels growth campaigns</p>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">What&apos;s Included:</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {["Everything in Starter, plus","16–20 posts per month","Advanced Reels & Stories production","TikTok Shopping setup","TikTok Ads management","Influencer outreach & management","A/B testing & optimisation","Competitor monitoring","Bi-weekly reporting with insights","Priority support"].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-slate-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="w-full text-center py-3 rounded-xl font-bold text-sm text-white transition-opacity duration-200 hover:opacity-90"
                  style={{ background: GREEN }}>Get Growth Plan →</Link>
              </div>
            </div>
            {/* Enterprise */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#DC2626" }}>
                <Award className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">Enterprise Plan</h3>
              <p className="text-slate-400 text-sm mb-6">Full TikTok ecosystem management<br />with dedicated team & strategy</p>
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">What&apos;s Included:</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {["Tailored to Your Brand Goals","Full TikTok strategy & roadmap","30+ posts per month","Professional video production & editing","Advanced influencer partnerships","TikTok Shop management & optimisation","Crisis management & brand monitoring","Dedicated TikTok account manager","Weekly performance reviews","Ongoing strategy refinement"].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-slate-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#DC2626" }} />{f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full text-center py-3 rounded-xl border-2 font-bold text-sm transition-colors duration-200"
                style={{ borderColor: "#CBD5E1", color: "#64748B" }}>Call Now →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[200px]"
            style={{ background: GREEN }}>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
                Turn TikTok Into{" "}
                <span style={{ color: "#BBF7D0" }}>Predictable Revenue</span>
              </h2>
              <p className="text-green-100 text-sm leading-relaxed mb-7 max-w-md">
                We help brands build scalable TikTok marketing systems backed by data and
                clear ROI — from content strategy to paid ads and Shopping.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 border-white text-white transition-colors duration-200 hover:bg-white"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}>
                  Request an TikTok Strategy Session <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="md:w-[36%] flex-shrink-0 relative min-h-[200px] hidden md:block">
              <img src="/faq-woman.png" alt="TikTok marketing specialist"
                className="absolute bottom-0 right-6 h-[110%] object-contain object-bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest uppercase mb-3 block" style={{ color: TK }}>Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              How We Deliver{" "}
              <span style={{ color: TK }}>TikTok Marketing<br />Results</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Our proven 6-step process ensures your TikTok presence grows strategically, delivering measurable
              follower growth, engagement, and revenue results.
            </p>
          </div>
          {(() => {
            const STEPS = [
              { icon: Search,     iconColor: "#EC4899", iconBg: "#FDF2F8", title: "TikTok\nAudit",        desc: "We start with a comprehensive TikTok audit — analysing your current content performance, competitor benchmarks, audience demographics, and hashtag strategy to identify your biggest growth opportunities.", mt: 0   },
              { icon: Layers,     iconColor: "#F97316", iconBg: "#FFF7ED", title: "Strategy\nDevelopment",   desc: "We create a tailored TikTok strategy including content pillars, Reels themes, posting schedules, hashtag clusters, ad roadmaps, and campaign timelines aligned with your specific business goals.",     mt: 60  },
              { icon: Camera,     iconColor: "#38BDF8", iconBg: "#F0F9FF", title: "Content\nProduction",     desc: "Our creative team produces platform-native TikTok content — Reels, carousels, Stories, and static posts — that resonates with your target audience and is engineered to perform within the algorithm.",  mt: 110 },
              { icon: Zap,        iconColor: "#22C55E", iconBg: "#F0FDF4", title: "Campaign\nLaunch",        desc: "We launch your TikTok campaigns with precision timing, highly targeted paid audiences, and optimised ad placements designed to maximise initial reach, engagement, and follower conversion.",            mt: 0   },
              { icon: BarChart,   iconColor: "#A855F7", iconBg: "#FAF5FF", title: "Monitor\nand Optimise",   desc: "We continuously track Reels views, reach, engagement rate, Stories completion, ad ROAS, and follower growth — adjusting creative and targeting in real-time to compound performance month-over-month.",   mt: 60  },
              { icon: TrendingUp, iconColor: "#EC4899", iconBg: "#FDF2F8", title: "Scale\nand Grow",         desc: "After identifying winning Reels formats and ad creatives, we scale successful campaigns, expand your content calendar, and systematically grow your TikTok presence into a primary revenue channel.",       mt: 0   },
            ];
            const dotColors = ["#EC4899","#F97316","#38BDF8","#22C55E","#A855F7","#EC4899"];
            return (
              <>
                <div className="hidden lg:flex items-start gap-4 mb-2">
                  {STEPS.map(({ icon: Icon, iconColor, iconBg, title, desc, mt }) => (
                    <div key={title}
                      className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 flex flex-col text-center transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(255,0,80,0.12)]"
                      style={{ marginTop: mt, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: iconBg }}>
                        <Icon className="w-5 h-5" style={{ color: iconColor }} strokeWidth={1.8} />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 whitespace-pre-line">{title}</h3>
                      <p className="text-slate-400 text-[11px] leading-relaxed flex-1">{desc}</p>
                    </div>
                  ))}
                </div>
                <div className="hidden lg:block relative w-full" style={{ height: 80 }}>
                  <svg width="100%" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none" className="absolute inset-0">
                    <defs>
                      <linearGradient id="waveGradTK" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#EC4899" />
                        <stop offset="20%"  stopColor="#F97316" />
                        <stop offset="40%"  stopColor="#38BDF8" />
                        <stop offset="60%"  stopColor="#22C55E" />
                        <stop offset="80%"  stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <path d="M 83,18 C 150,18 150,42 233,42 C 316,42 316,66 400,66 C 484,66 484,18 567,18 C 650,18 650,42 733,42 C 816,42 840,18 917,18"
                      fill="none" stroke="url(#waveGradTK)" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-start justify-between px-[8.3%]">
                    {[
                      { label: "Step 01", color: "#EC4899", top: 9  },
                      { label: "Step 02", color: "#F97316", top: 33 },
                      { label: "Step 03", color: "#38BDF8", top: 57 },
                      { label: "Step 04", color: "#22C55E", top: 9  },
                      { label: "Step 05", color: "#A855F7", top: 33 },
                      { label: "Step 06", color: "#EC4899", top: 9  },
                    ].map(({ label, color, top }) => (
                      <div key={label} className="flex flex-col items-center gap-1.5" style={{ marginTop: top }}>
                        <div className="w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center" style={{ borderColor: color }}>
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden mb-8">
                  {STEPS.map(({ icon: Icon, iconColor, iconBg, title, desc }, i) => (
                    <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4 items-start"
                      style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
                        <Icon style={{ color: iconColor, width: 18, height: 18 }} strokeWidth={1.8} />
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
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm"
              style={{ background: TK }}>
              Start Your TikTok Marketing Journey <Send className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20" style={{ background: "#F8FAFF" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Why Choose Top SEO Services for Your<br />
              <span style={{ color: ACCENT }}>TikTok Marketing</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Experience unmatched TikTok marketing excellence powered by creative experts, data-driven
              tools, and proven strategies. We transform your TikTok investment into predictable business growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: "01", icon: TrendingUp, title: "Proven TikTok Growth Results",
                desc: "Our data-driven TikTok strategies have delivered an average engagement increase of over 260% and significant follower growth for clients across diverse industries, with documented case studies and ROI metrics.",
              },
              {
                num: "02", icon: Eye, title: "Complete Campaign Transparency",
                desc: "Our content management system provides direct access to content calendars, approval workflows, and real-time performance dashboards. You see every post, story, and reel before it goes live.",
              },
              {
                num: "03", icon: Cpu, title: "AI-Enhanced Content Intelligence",
                desc: "We leverage AI-powered tools for optimal posting times, content performance prediction, hashtag analysis, and audience sentiment tracking to stay ahead of TikTok's evolving algorithm.",
              },
              {
                num: "04", icon: Briefcase, title: "Industry-Specific TikTok Expertise",
                desc: "Our TikTok specialists bring deep knowledge of industry-specific trends, audience behaviors, and content formats that resonate within your niche, ensuring authentic and effective campaigns.",
              },
              {
                num: "05", icon: Layers, title: "Full-Spectrum TikTok Management",
                desc: "From feed posts and Reels to Stories, Lives, and TikTok Shopping — we manage every aspect of your TikTok presence with a cohesive strategy that maximises each feature's potential.",
              },
              {
                num: "06", icon: ShieldCheck, title: "Dedicated TikTok Partnership",
                desc: "You work with a dedicated TikTok strategist and creative team who become extensions of your brand, delivering proactive recommendations, trend alerts, and strategic growth guidance.",
              },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={num}
                className="rounded-2xl bg-white border border-slate-100 p-6 flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.10)]"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#EFF6FF" }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: ACCENT, width: 18, height: 18 }} strokeWidth={1.8} />
                  </div>
                  <span className="text-2xl font-black leading-none select-none" style={{ color: "#DBEAFE" }}>
                    {num}
                  </span>
                </div>
                <h3 className="font-bold text-[15px] text-slate-900 leading-snug mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCALE CTA BANNER ── */}
      <section className="py-0 px-6 md:px-12 pb-16" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch min-h-[220px]"
            style={{ background: "#111827" }}>
            {/* Left — text */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
                Need to Scale Your{" "}
                <span style={{ color: "#FCD34D" }}>TikTok Presence?</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-sm">
                We deliver consistent, high-quality TikTok content at any volume — so you can scale your
                social presence without sacrificing quality or brand authenticity.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-opacity duration-200 hover:opacity-90"
                  style={{ background: "#F59E0B", color: "#1A1F2E" }}>
                  Scale Your TikTok Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Right — image */}
            <div className="md:w-[48%] flex-shrink-0 relative min-h-[220px]">
              <img src="/local-seo-team-analytics.png" alt="TikTok marketing team"
                className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #111827 0%, transparent 40%)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      {(() => {
        const CASES = [
          {
            img: "/cta-meeting-analytics.png",
            company: "Guidance Whiskey",
            desc: "Guidance Whiskey is a premium American whiskey brand built around craftsmanship and culture. We strengthened their TikTok presence as a lifestyle-driven premium brand — growing visibility and deepening audience engagement through curated feed content and Reels campaigns.",
            stats: [
              { icon: Eye,        label: "Views", value: "118.8K", delta: "+53.9%" },
              { icon: TrendingUp, label: "Reach", value: "13K",    delta: "+9.7%"  },
            ],
            cta: "Get Started",
          },
          {
            img: "/local-seo-team-analytics.png",
            company: "Allostasis Breathwork & Performance",
            desc: "Allostasis is a coaching brand helping athletes improve focus and recovery through breathwork. We focused on education-based Reels and performance-driven TikTok content to dramatically improve reach and discoverability with their target audience.",
            stats: [
              { icon: Eye,        label: "Views", value: "20.7K", delta: "+100%" },
              { icon: TrendingUp, label: "Reach", value: "10.5K", delta: "+100%" },
            ],
            cta: "Book 1:1 Consultation Call",
          },
          {
            img: "/industry-enterprise.png",
            company: "AAKI Corp.",
            desc: "AAKI Corp is a Calgary-based engineering company. We boosted their TikTok presence through targeted content strategies and paid social campaigns, driving qualified leads and strengthening brand authority in the engineering sector.",
            stats: [
              { icon: Activity, label: "Engagement", value: "340%", delta: "Increase" },
            ],
            cta: "Get Your TikTok Audit",
          },
        ];
        const perPage = 3;
        const totalPages = Math.ceil(CASES.length / perPage);
        const visible = CASES.slice(caseStudyPage * perPage, caseStudyPage * perPage + perPage);
        return (
          <section className="py-20" style={{ background: "#f8fafc" }}>
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-14">
                <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: TK }}>
                  Case Study
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
                  Real TikTok Results That Redefine<br />Business Success
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                  Explore our portfolio of successful TikTok marketing campaigns that delivered exceptional results for our
                  clients across various industries.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {visible.map((c) => (
                  <div key={c.company}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(255,0,80,0.12)]"
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
                        style={{ borderColor: TK, color: TK }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = TK; (e.currentTarget as HTMLElement).style.color = "white"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = TK; }}>
                        {c.cta} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCaseStudyPage(p => Math.max(0, p - 1))}
                  disabled={caseStudyPage === 0}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-200 disabled:opacity-30"
                  style={{ borderColor: TK, color: TK }}>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => setCaseStudyPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={caseStudyPage === totalPages - 1}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-200 disabled:opacity-30"
                  style={{ borderColor: TK, color: TK }}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Frequently Asked Questions About{" "}
              <span style={{ color: TK }}>TikTok Marketing</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Get answers to the most common questions about our TikTok Marketing services.
            </p>
          </div>

          <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white">
              <img src="/faq-woman.png" alt="Still have questions?" className="w-full object-cover h-52" />
              <div className="p-6 text-center">
                <h3 className="text-lg font-black text-slate-900 mb-2">Still Have Questions?</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">
                  Can&apos;t find the answer you&apos;re looking for? Our TikTok marketing experts are ready to help.
                </p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: TK }}>
                  Ask Our TikTok Experts <ArrowRight className="w-3.5 h-3.5" />
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
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden">
                        <div className="px-5 pb-5 pt-1 text-slate-500 text-sm leading-relaxed">{faq.a}</div>
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
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* LEFT — form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-10">
                Let&apos;s{" "}
                <span style={{ color: TK }}>Get Started</span>
              </h2>

              <form
                onSubmit={e => { e.preventDefault(); window.location.href = "/contact"; }}
                className="space-y-7">
                <div>
                  <input
                    type="text" placeholder="Your Name*" value={form.name}
                    onChange={setField("name")} required
                    className="w-full pb-2.5 text-slate-800 text-sm placeholder-slate-400 bg-transparent outline-none"
                    style={{ borderBottom: "1px solid #CBD5E1" }} />
                </div>
                <div>
                  <input
                    type="email" placeholder="Business Email*" value={form.email}
                    onChange={setField("email")} required
                    className="w-full pb-2.5 text-slate-800 text-sm placeholder-slate-400 bg-transparent outline-none"
                    style={{ borderBottom: "1px solid #CBD5E1" }} />
                </div>
                <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2.5">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-500 border-r border-slate-300 pr-3 mr-1 select-none">US +1</span>
                  <input
                    type="tel" placeholder="Phone Number *" value={form.phone}
                    onChange={setField("phone")}
                    className="flex-1 text-slate-800 text-sm placeholder-slate-400 bg-transparent outline-none" />
                </div>
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
                <div>
                  <textarea
                    placeholder="Tell us about your TikTok goals*" value={form.message}
                    onChange={setField("message")} rows={4}
                    className="w-full text-slate-800 text-sm placeholder-slate-400 bg-transparent outline-none resize-y"
                    style={{ borderBottom: "1px solid #CBD5E1" }} />
                </div>
                <button type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white text-sm"
                  style={{ background: TK }}>
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
