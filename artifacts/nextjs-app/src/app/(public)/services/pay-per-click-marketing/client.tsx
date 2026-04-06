"use client";

import React, { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  Target, TrendingUp, DollarSign, Award, ArrowRight,
  CheckCircle2, BarChart3, Zap, Star, ChevronDown,
  Globe, Shield, Layers, Users, Clock, Rocket, Eye,
  Megaphone, Settings2, Gauge, Phone, Mail, Send,
  ShoppingCart, Heart, Home, Landmark, Truck,
  BarChart, Activity, UserCheck, Search, RefreshCw,
  MousePointer, Cpu, BadgeCheck, PieChart, FlaskConical,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const BLUE   = "#2563EB";
const GREEN  = "#16A34A";
const ACCENT = "#2563EB";

const STATS = [
  { value: "$50M+",  label: "Ad Spend Managed",   color: "#F59E0B", icon: DollarSign },
  { value: "300%",   label: "Average ROI",         color: "#22C55E", icon: TrendingUp },
  { value: "2,500+", label: "Campaigns Launched",  color: "#3B82F6", icon: Target     },
  { value: "95+",    label: "Certified Experts",   color: "#8B5CF6", icon: Award      },
];

const SERVICES = [
  { icon: Search,       color: "#4285F4", title: "Google Ads Management",     desc: "Search, Display, Shopping, Performance Max — full-funnel Google campaigns managed by certified specialists." },
  { icon: Megaphone,    color: "#1877F2", title: "Facebook & Instagram Ads",  desc: "Scroll-stopping creative plus precision audience targeting across Meta's 3 billion-user ecosystem." },
  { icon: Users,        color: "#0A66C2", title: "LinkedIn Ads",              desc: "Sponsored Content, Message Ads, and Lead Gen Forms targeting B2B decision-makers by title, industry, and company." },
  { icon: BarChart3,    color: "#FF0000", title: "YouTube Ads",               desc: "TrueView, Bumper, and Skippable In-Stream ads that build brand awareness and drive conversions on YouTube." },
  { icon: ShoppingCart, color: "#F90",   title: "Amazon Ads",                 desc: "Sponsored Products, Sponsored Brands, and DSP campaigns that dominate search results on Amazon's marketplace." },
  { icon: RefreshCw,    color: "#7C3AED", title: "Remarketing & Retargeting", desc: "Re-engage lost visitors across Google, Meta, and display networks with personalised ads that close the sale." },
  { icon: Globe,        color: "#0EA5E9", title: "Display & Programmatic",    desc: "Data-driven banner and native advertising across premium publisher networks for awareness and retargeting." },
  { icon: MousePointer, color: "#EC4899", title: "Shopping & PMax Campaigns", desc: "Product-feed driven Shopping Ads and Performance Max campaigns engineered to maximise e-commerce ROAS." },
];

const PROCESS = [
  { step: "01", title: "PPC Audit & Research",      desc: "We audit your existing account (if any), analyse competitors, and identify the highest-ROI keyword and audience opportunities for your budget." },
  { step: "02", title: "Strategy & Campaign Build", desc: "We architect the full campaign structure — ad groups, match types, audiences, bidding strategies, landing pages, and conversion tracking." },
  { step: "03", title: "Creative & Copy",           desc: "Our copywriters and designers produce high-converting ad creative: headlines, descriptions, extensions, images, and video assets." },
  { step: "04", title: "Launch & Optimise",         desc: "We launch, monitor daily, and optimise continuously — A/B testing creatives, refining bids, adding negative keywords, and scaling winners." },
  { step: "05", title: "Report & Scale",            desc: "Monthly reports covering spend, impressions, clicks, conversions, CPA, and ROAS — with a clear plan for what we're scaling next." },
];

const FEATURES = [
  { icon: BadgeCheck, title: "Certified Specialists",   desc: "Google Premier Partner and Meta Business Partner — every campaign managed by certified, experienced PPC professionals." },
  { icon: Target,     title: "Conversion-First Strategy", desc: "We optimise for revenue and leads, not vanity metrics — every pound of ad spend is tracked to business outcomes." },
  { icon: Gauge,      title: "Real-Time Optimisation",  desc: "Daily bid management, budget pacing, and creative testing keep your campaigns performing at peak efficiency." },
  { icon: Shield,     title: "Full Transparency",       desc: "You own your ad accounts. We provide complete access and clear reporting — no black boxes, no hidden fees." },
  { icon: Cpu,        title: "AI-Powered Bidding",      desc: "Smart bidding strategies enhanced by our proprietary scripts and feed optimisations for maximum ROAS." },
  { icon: PieChart,   title: "Cross-Channel Attribution", desc: "Multi-touch attribution models that show the true contribution of every channel in your paid media mix." },
];

const INDUSTRIES = [
  { img: "/industry-ecommerce.png",   icon: ShoppingCart, color: "#F59E0B", label: "E-commerce"       },
  { img: "/industry-healthcare.png",  icon: Heart,        color: BLUE,      label: "Healthcare"       },
  { img: "/industry-real-estate.png", icon: Home,         color: "#DC2626", label: "Real Estate"      },
  { img: "/industry-shopify.png",     icon: Layers,       color: GREEN,     label: "Shopify"          },
  { img: "/industry-logistics.png",   icon: Truck,        color: ACCENT,    label: "Logistics"        },
  { img: "/industry-b2b.png",         icon: Landmark,     color: "#7C3AED", label: "B2B / SaaS"       },
  { img: "/industry-enterprise.png",  icon: Globe,        color: "#0EA5E9", label: "Enterprise"       },
  { img: "/industry-education.png",   icon: Users,        color: "#16A34A", label: "Education"        },
];

const PLANS = [
  {
    name: "Starter",
    price: "£799",
    period: "/mo",
    adSpend: "Up to £3,000 ad spend",
    color: "#2563EB",
    features: ["Google Search Ads", "Facebook / Instagram Ads", "Keyword research & setup", "Monthly performance report", "Conversion tracking setup", "Dedicated account manager"],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "£1,499",
    period: "/mo",
    adSpend: "Up to £10,000 ad spend",
    color: "#7C3AED",
    popular: true,
    features: ["All Starter features", "Shopping / Performance Max", "Remarketing campaigns", "A/B creative testing", "Weekly optimisation calls", "Landing page recommendations"],
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    adSpend: "£10,000+ ad spend",
    color: "#0EA5E9",
    features: ["All Growth features", "LinkedIn & YouTube Ads", "Amazon Ads management", "Programmatic display", "Multi-channel attribution", "Dedicated strategy team"],
    cta: "Talk to Us",
  },
];

const FAQS = [
  { q: "What is Pay-Per-Click (PPC) Marketing?",                                   a: "PPC is a digital advertising model where you pay only when someone clicks your ad. Platforms like Google Ads, Meta Ads, LinkedIn Ads, and Amazon Ads serve your ads to targeted audiences, and you're charged per click rather than per impression. A well-managed PPC campaign delivers immediate, measurable traffic and can generate a strong ROI by reaching users with proven purchase intent at the exact moment they're searching." },
  { q: "How quickly can PPC drive results for my business?",                       a: "PPC is the fastest digital marketing channel — campaigns can go live within 24–48 hours and start generating clicks immediately. You can typically see qualified leads or sales within the first week of launch. Unlike SEO, which builds organic rankings over months, PPC places your brand at the top of search results from day one. We set up conversion tracking before launch so you can see ROI from the start." },
  { q: "Which PPC platforms do you manage?",                                       a: "We manage campaigns across all major paid platforms: Google Ads (Search, Shopping, Display, YouTube, Performance Max), Meta Ads (Facebook and Instagram), LinkedIn Ads, YouTube Ads, Amazon Ads (Sponsored Products, Sponsored Brands, DSP), Microsoft Ads (Bing), and programmatic display networks. We recommend the right platform mix based on your audience, goals, and budget." },
  { q: "How do you determine the right budget for PPC?",                           a: "We base budget recommendations on your target cost-per-lead or ROAS goals, your market's keyword competition level, and your monthly revenue targets. We start with a realistic budget to gather data efficiently, then scale spend on campaigns that prove positive returns. We're transparent about what different budget levels can realistically achieve in your market." },
  { q: "What is a good ROAS for PPC campaigns?",                                   a: "ROAS (Return On Ad Spend) varies significantly by industry, product margin, and campaign type. A ROAS of 3:1 to 5:1 is generally considered healthy for e-commerce, meaning £3–£5 revenue per £1 of ad spend. B2B lead generation is measured differently — by cost-per-lead and lead quality. We set benchmarks specific to your business at the start and continuously optimise toward exceeding them." },
  { q: "Do you require long-term contracts?",                                      a: "No. We work on rolling monthly agreements — we earn your business every month through results. Most clients stay with us long-term because they see clear ROI, not because they're contractually locked in. We do recommend a minimum 3-month commitment to allow time for campaign optimisation and meaningful data collection, but there's no penalty for leaving." },
  { q: "How do you prevent wasted ad spend?",                                      a: "Wasted spend is our number-one enemy. We eliminate it through rigorous negative keyword management, precise audience targeting, match type strategy, device and location bid adjustments, ad scheduling, and daily budget pacing. We use account-level scripts to catch anomalies automatically and review every campaign weekly to catch inefficiencies before they compound." },
  { q: "Will I have access to my own ad accounts?",                               a: "Always. You own your Google Ads, Meta Ads, and all other platform accounts. We work as a manager on your account, not the other way around. Full transparency is non-negotiable — you can see every campaign, keyword, bid, and spend at any time. If you ever leave, you take your account history and data with you." },
  { q: "How do you measure PPC success?",                                         a: "We measure success against the KPIs that matter to your business: cost-per-lead (CPL), cost-per-acquisition (CPA), ROAS, revenue generated, and lead quality. We set up full conversion tracking — including Google Tag Manager, Google Analytics 4, Meta Pixel, and CRM integration — so every click can be traced to a business outcome. Monthly reports translate raw data into plain business language." },
  { q: "What makes your PPC agency different from others?",                        a: "Three things set us apart: first, we are a Google Premier Partner and Meta Business Partner — our certifications are current, not legacy. Second, we are conversion-obsessed — we optimise for revenue and qualified leads, not impressions or clicks. Third, we are fully transparent — you own your accounts, see all data, and receive plain-English reports that explain what's working and what we're changing." },
  { q: "Can PPC work alongside my SEO strategy?",                                 a: "Yes — PPC and SEO are the most powerful combination in digital marketing. PPC delivers immediate traffic while SEO builds long-term organic rankings. PPC data (best-converting keywords, highest-performing ad copy) directly informs SEO strategy. And as organic rankings grow, you can reduce PPC spend on branded terms while maintaining total visibility. We manage both channels and ensure they reinforce each other." },
  { q: "How do I get started with your PPC services?",                             a: "Book a free PPC audit call. We'll review your current ad accounts (if any), analyse your competitors, and present a clear PPC strategy with realistic projections within 5 business days. No long-term commitment at the discovery stage — you only proceed once you're confident the strategy is right for your goals and budget." },
];

/* ─────────────────────────────────────────────
   PPC CAMPAIGN TYPES DATA
───────────────────────────────────────────── */
const PPC_TYPES = [
  {
    label: "Search Ads",
    img: "/ai-seo-card-keyword.png",
    desc: "Search advertising places your brand at the top of Google and Bing results the moment potential customers are actively searching for your products or services. With precise keyword targeting, ad extensions, and smart bidding, search ads capture high-intent traffic that converts. You pay only when a user clicks — making every pound of budget directly accountable to business outcomes.",
  },
  {
    label: "Display Ads",
    img: "/cta-laptop-analytics.png",
    desc: "Display advertising enables visual storytelling to reach millions of websites and applications that use Google's extensive Display Network for their advertising needs. The banner ads and images, together with rich media formats, create captivating displays that help businesses establish brand recognition and reach potential customers at earlier stages of their purchasing process. Display campaigns succeed at bringing back past website visitors while introducing your brand to fresh audiences.",
  },
  {
    label: "Social Ads",
    img: "/ai-seo-team.png",
    desc: "Social advertising on Facebook, Instagram, LinkedIn, and X (Twitter) lets you reach precisely defined audiences based on demographics, interests, behaviours, and lookalike profiles. From scroll-stopping video to carousel product showcases, social ads build brand awareness, drive website traffic, and generate leads directly within the platform — at a fraction of the cost of traditional advertising.",
  },
  {
    label: "Remarketing Ads",
    img: "/local-card-audit.png",
    desc: "Remarketing campaigns re-engage users who have already visited your website, viewed a product, or abandoned a shopping cart. By serving personalised ads across Google Display, YouTube, and social platforms, remarketing keeps your brand top-of-mind and nudges warm audiences back to convert. These campaigns typically deliver the highest ROAS of any PPC format because you're targeting users who already know your brand.",
  },
  {
    label: "Google Shopping Ads",
    img: "/industry-ecommerce.png",
    desc: "Google Shopping Ads display your products directly in Google Search results with image, price, and store name — before users even click to your site. Connected to your product catalogue via Google Merchant Center, Shopping campaigns target users at the exact moment of purchase intent. We manage feed optimisation, bidding strategies, and campaign structure to maximise your e-commerce ROAS.",
  },
  {
    label: "In-Stream Ads",
    img: "/ai-seo-visual.png",
    desc: "In-Stream ads on YouTube and social video platforms place your brand in front of engaged viewers during video content. TrueView skippable ads, non-skippable bumper ads, and Discovery ads build powerful brand awareness and drive conversions at scale. With YouTube's precise audience targeting by interest, keyword, and demographics, in-stream campaigns reach the right viewers at the right moment in their content journey.",
  },
  {
    label: "Gmail-Sponsored Promotions",
    img: "/cta-meeting-analytics.png",
    desc: "Gmail Sponsored Promotions deliver interactive ads directly to users' Gmail inboxes, appearing as native emails in the Promotions tab. When users open the teaser, it expands into a full email-like experience with images, links, and CTAs. This format excels for product launches, special offers, and lead generation — targeting Gmail users based on their email interests, competitor brand affinity, and demographic profile.",
  },
  {
    label: "Local Services Ads",
    img: "/local-seo-team-analytics.png",
    desc: "Local Services Ads (LSAs) appear at the very top of Google Search results for local service queries, above standard search ads and organic results. They carry Google's 'Google Guaranteed' or 'Google Screened' badge, building instant trust with potential customers. LSAs operate on a pay-per-lead model, meaning you only pay when a verified customer contacts your business — ideal for trades, professional services, and home services businesses.",
  },
  {
    label: "Amazon PPC Ads",
    img: "/industry-shopify.png",
    desc: "Amazon PPC campaigns — Sponsored Products, Sponsored Brands, and Sponsored Display — place your products at the top of Amazon search results and on competitor product pages. With Amazon's unmatched purchase-intent data, these campaigns reach shoppers who are ready to buy. We manage keyword research, bid optimisation, negative keyword strategy, and ACOS targets to maximise your Amazon sales and profitability.",
  },
];

/* ─────────────────────────────────────────────
   PPC CAMPAIGN GRID SUB-COMPONENT
───────────────────────────────────────────── */
function PpcCampaignGrid() {
  const [expanded, setExpanded] = useState<number | null>(null);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {PPC_TYPES.map((item, i) => (
        <m.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white"
        >
          {/* Image area with expand overlay */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Dark overlay when expanded */}
            <AnimatePresence>
              {expanded === i && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center p-5 text-white text-xs leading-relaxed"
                  style={{ background: "rgba(30,64,175,0.93)" }}
                >
                  {item.desc}
                </m.div>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-lg leading-none shadow-md transition-transform hover:scale-110 z-10"
              style={{ background: expanded === i ? "#DC2626" : BLUE }}
              aria-label={expanded === i ? "Close" : "Expand"}
            >
              {expanded === i ? "×" : "+"}
            </button>
          </div>

          {/* Label */}
          <div className="px-4 py-3">
            <p className="font-bold text-gray-900 text-sm">{item.label}</p>
          </div>
        </m.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export function PPCMarketingPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ── CONTACT FORM ── */
  const [cform, setCform] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
  const [cSent, setCsent] = useState(false);
  const [cLoading, setCloading] = useState(false);
  const handleCform = async (e: React.FormEvent) => {
    e.preventDefault();
    setCloading(true);
    await new Promise(r => setTimeout(r, 900));
    setCloading(false);
    setCsent(true);
  };

  /* ── ROI CALCULATOR ── */
  const [budget,     setBudget]     = useState(5000);
  const [cpc,        setCpc]        = useState(2.5);
  const [convRate,   setConvRate]   = useState(3);
  const [orderValue, setOrderValue] = useState(100);

  const clicks   = Math.round(budget / cpc);
  const convs    = Math.round(clicks * (convRate / 100));
  const revenue  = convs * orderValue;
  const roas     = budget > 0 ? (revenue / budget).toFixed(1) : "0.0";
  const profit   = revenue - budget;

  return (
    <div className="bg-gray-950 text-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden">
        {/* Background image */}
        <img
          src="/cta-meeting-analytics.png"
          alt="PPC marketing team"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gray-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-24">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(37,99,235,0.18)", border: "1px solid rgba(37,99,235,0.4)", color: "#93C5FD" }}>
              <Target className="w-3.5 h-3.5 text-blue-400" />
              #1 PPC Marketing Agency
            </div>

            {/* Heading */}
            <h1 className="font-extrabold leading-tight mb-5">
              <span className="block text-4xl md:text-5xl text-white">Pay-Per-Click</span>
              <span className="block text-5xl md:text-6xl" style={{ color: BLUE }}>Marketing</span>
              <span className="block text-3xl md:text-4xl text-white mt-1">Company That Drives Qualified Leads</span>
            </h1>

            {/* Body */}
            <p className="text-gray-300 text-lg max-w-xl mb-8 leading-relaxed">
              Skyrocket your business growth and revenue with Top SEO Services, your most trusted pay-per-click marketing company. From{" "}
              <strong className="text-white font-bold">Google Ads</strong> to{" "}
              <strong className="text-white font-bold">Facebook Ads</strong>, we have got you covered.
            </p>

            {/* CTA */}
            <Link href="/contact"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-lg transition-colors text-white"
              style={{ background: BLUE }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
              Get Free PPC Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </m.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="container mx-auto px-4 md:px-6">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl -mt-10 relative z-10 overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center py-8 px-4 gap-1">
                <s.icon className="w-5 h-5 mb-1" style={{ color: s.color }} />
                <span className="text-3xl md:text-4xl font-extrabold" style={{ color: s.color }}>{s.value}</span>
                <span className="text-xs text-gray-500 text-center font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </m.div>
      </section>

      {/* ── WHAT IS PPC ── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              What Is Pay-Per-Click Advertising
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: BLUE }}>
              and How Does It Work?
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">

            {/* LEFT — overlapping image collage */}
            <div className="relative h-[360px] md:h-[420px]">

              {/* Back image — team / monitors */}
              <div className="absolute top-0 left-0 w-[68%] rounded-2xl overflow-hidden shadow-lg h-[75%]">
                <img
                  src="/local-seo-team-analytics.png"
                  alt="PPC team analytics"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Front image — laptop */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-0 right-0 w-[62%] rounded-2xl overflow-hidden shadow-2xl h-[70%]"
              >
                <img
                  src="/cta-laptop-analytics.png"
                  alt="PPC campaign analytics"
                  className="w-full h-full object-cover"
                />

                {/* 3.2× badge on laptop image */}
                <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 min-w-[140px]">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: BLUE }}>
                    <TrendingUp className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-gray-900 leading-none">3.2× More Traffic</p>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5">Average client growth rate</p>
                  </div>
                </div>
              </m.div>

              {/* 500+ badge — bottom left */}
              <div className="absolute bottom-4 left-2 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 min-w-[155px] z-10">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F3F4F6" }}>
                  <Search className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-gray-900 leading-none">500+ Keywords Ranked</p>
                  <p className="text-[10px] text-gray-500 leading-tight mt-0.5">Driving qualified organic traffic</p>
                </div>
              </div>
            </div>

            {/* RIGHT — text + CTA */}
            <m.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Pay-per-click advertising works as a digital marketing system that requires advertisers to pay only when users click their ads. This advertising method provides immediate visibility through search engines, social media platforms, and websites at a low cost to businesses. The pay-per-click services enable businesses to control their advertising expenses because they can decide their spending limits, select their target market, and monitor their advertising budget. Whether you are launching a new product or scaling an established brand, PPC campaigns generate data-driven leads when users are searching for solutions you offer.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-white transition-colors"
                style={{ background: BLUE }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; }}
              >
                Talk to a PPC Expert
              </Link>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── TYPES OF PPC CAMPAIGNS ── */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Types of PPC Campaign
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: BLUE }}>
              Management Services
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 text-sm leading-relaxed">
            Boost your advertising ROI with diverse PPC campaign management services tailored to your business objectives. Every format delivers unique perks for reaching customers at different touchpoints.
          </p>

          {/* 3×3 Card Grid */}
          <PpcCampaignGrid />

        </div>
      </section>

      {/* ── MID-PAGE CTA BANNER ── */}
      <section className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden grid md:grid-cols-[42%_58%] min-h-[220px]"
        >
          {/* Left — photo with tinted overlay */}
          <div className="relative hidden md:block">
            <img
              src="/cta-meeting-analytics.png"
              alt="PPC team"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(88,28,135,0.7) 0%, rgba(37,99,235,0.5) 100%)" }} />
          </div>

          {/* Right — dark text panel */}
          <div className="bg-gray-900 flex flex-col justify-center px-10 py-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
              Tired of Wasting Budget on
            </h3>
            <h3 className="text-2xl md:text-3xl font-extrabold italic leading-tight mb-5"
              style={{ color: "#F97316" }}>
              Underperforming Ads?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-7 max-w-md">
              Our PPC experts build ROI-focused campaigns that transform your ad spend into qualified leads, measurable conversions, and predictable revenue growth.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 self-start font-bold px-7 py-3.5 rounded-lg text-white transition-colors"
              style={{ background: "#F97316" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#ea6f0a"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F97316"; }}>
              Get Your Free PPC Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </m.div>
      </div>
      </section>

      {/* ── WHY TRUST US ── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Why Businesses Trust Our
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: BLUE }}>
              PPC Marketing Services
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-14 text-sm leading-relaxed">
            Our pay-per-click advertising services deliver immediate visibility, qualified leads, and measurable revenue growth. Here's what sets our PPC management apart from the competition.
          </p>

          {/* 3×2 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                num: "01", icon: Target,      color: "#2563EB",
                title: "Precision Audience Targeting",
                desc: "Our PPC specialists use advanced targeting methods, including demographics, intent signals, custom audiences, and lookalike modeling, to ensure your ads reach the right prospects at the exact moment they're ready to convert.",
                bar: "#2563EB",
              },
              {
                num: "02", icon: TrendingUp,  color: "#16A34A",
                title: "Conversion Rate Optimization",
                desc: "We continuously optimise landing pages, ad copy, and user journeys through rigorous A/B testing to turn more of your paid clicks into paying customers and maximise your conversion rates across every campaign.",
                bar: "#16A34A",
              },
              {
                num: "03", icon: DollarSign,  color: "#DC2626",
                title: "Maximize Your ROAS",
                desc: "Our data-driven bidding strategies, budget allocation frameworks, and smart automation ensure every dollar of your ad spend delivers maximum return on investment, reducing waste and amplifying profitable campaigns.",
                bar: "#DC2626",
              },
              {
                num: "04", icon: BarChart3,   color: "#F59E0B",
                title: "Transparent Real-Time Reporting",
                desc: "Access real-time dashboards and detailed performance reports that show exactly how your campaigns perform. Track impressions, clicks, conversions, cost per lead, and ROAS with complete transparency.",
                bar: "#F59E0B",
              },
              {
                num: "05", icon: Zap,         color: "#2563EB",
                title: "Rapid Campaign Scaling",
                desc: "Once we identify winning campaigns and ad sets, we scale them strategically to capture more market share and revenue while maintaining cost efficiency and quality lead flow across all platforms.",
                bar: "#2563EB",
              },
              {
                num: "06", icon: Award,       color: "#16A34A",
                title: "Certified PPC Professionals",
                desc: "Our team holds certifications from Google, Meta, LinkedIn, and Amazon, ensuring your campaigns leverage the latest platform features, follow best practices, and stay ahead of algorithm changes.",
                bar: "#16A34A",
              },
            ].map((f, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-gray-200 p-7 flex flex-col relative overflow-hidden bg-white shadow-sm"
              >
                {/* Faint number */}
                <span className="absolute top-4 right-5 text-5xl font-extrabold select-none"
                  style={{ color: "#F3F4F6" }}>{f.num}</span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${f.color}18` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>

                {/* Text */}
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{f.desc}</p>

                {/* Bottom accent bar */}
                <div className="mt-5 h-0.5 w-10 rounded-full" style={{ background: f.bar }} />
              </m.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Industries We Serve With
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: BLUE }}>
              Pay-Per-Click Advertising
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 text-sm leading-relaxed">
            The advertising initiatives that you implement through pay-per-click channels will transform your business presence in the marketplace. Our company provides measurable marketing results through specialized industry marketing efforts that generate suitable customer prospects and produce revenue growth using our PPC strategies based on verified data.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { img: "/industry-healthcare.png",  icon: Heart,        color: "#2563EB", label: "Healthcare"  },
              { img: "/industry-real-estate.png", icon: Home,         color: "#DC2626", label: "Real Estate" },
              { img: "/industry-ecommerce.png",   icon: ShoppingCart, color: "#F59E0B", label: "E-commerce"  },
              { img: "/industry-shopify.png",     icon: Layers,       color: "#16A34A", label: "Shopify"     },
              { img: "/industry-logistics.png",   icon: Truck,        color: "#2563EB", label: "Logistics"   },
              { img: "/industry-education.png",   icon: Users,        color: "#DC2626", label: "Education"   },
              { img: "/industry-b2b.png",         icon: Landmark,     color: "#F59E0B", label: "B2B"         },
              { img: "/industry-enterprise.png",  icon: Globe,        color: "#16A34A", label: "Enterprise"  },
            ].map((ind, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer"
              >
                <img src={ind.img} alt={ind.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)" }} />
                {/* Icon badge — top left */}
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: ind.color }}>
                  <ind.icon className="w-4 h-4 text-white" />
                </div>
                {/* Label — bottom left */}
                <span className="absolute bottom-3 left-4 text-white font-bold text-sm drop-shadow">
                  {ind.label}
                </span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GETTING CLICKS CTA ── */}
      <section className="bg-white pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden grid md:grid-cols-[55%_45%] min-h-[220px]"
            style={{ background: "#1a2035" }}
          >
            {/* Left — dark text panel */}
            <div className="flex flex-col justify-center px-10 py-12">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-1">
                Getting Clicks But{" "}
                <span className="italic" style={{ color: "#F97316" }}>No Conversions?</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mt-3 mb-7 max-w-sm">
                We turn paid traffic into paying customers through conversion-optimised landing pages, strategic remarketing, and data-driven campaign optimisation.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 self-start font-bold px-6 py-3 rounded-lg text-white transition-colors"
                style={{ background: BLUE }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
                Schedule a Strategy Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — analytics image */}
            <div className="relative hidden md:block">
              <img
                src="/cta-laptop-analytics.png"
                alt="PPC analytics dashboard"
                className="absolute inset-0 w-full h-full object-cover object-left"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to right, #1a2035 0%, transparent 40%)" }} />
            </div>
          </m.div>
        </div>
      </section>

      {/* ── HOW OUR PPC SERVICES DRIVE CONVERSIONS ── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              How Our PPC Services
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: BLUE }}>
              Drive Conversions &amp; Revenue
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-14 text-sm leading-relaxed">
            Our pay-per-click marketing strategies combine precision targeting, compelling ad creative, and continuous optimisation to deliver measurable ROI and sustainable business growth for every client we serve.
          </p>

          {/* 3×2 card grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                color: "#2563EB",
                title: "Strategic Audience Targeting",
                desc: "We identify and target high-intent audiences using demographics, interests, behaviors, keyword intent, and custom audience segments to ensure your ads reach people who are actively searching for your products or services.",
              },
              {
                icon: Search,
                color: "#DC2626",
                title: "Keyword & Competitor Research",
                desc: "Our comprehensive keyword research and competitor analysis uncovers high-value search terms, identifies bidding gaps, and positions your campaigns to capture market share from competitors at optimal cost.",
              },
              {
                icon: MousePointer,
                color: "#D97706",
                title: "Conversion-Optimised Landing Pages",
                desc: "We design and continuously optimise landing pages specifically for paid traffic. Every element — from headlines and CTAs to form placement and page speed — is engineered to maximise your conversion rates.",
              },
              {
                icon: BarChart,
                color: "#16A34A",
                title: "Real-Time Performance Tracking",
                desc: "Advanced analytics, attribution modelling, and custom dashboards give you complete visibility into campaign performance, enabling data-driven optimisation decisions that improve ROI week over week.",
              },
              {
                icon: FlaskConical,
                color: "#2563EB",
                title: "Continuous A/B Testing",
                desc: "We systematically test ad copy, creative formats, audiences, bidding strategies, and landing page variations to identify winning combinations that improve click-through rates and reduce cost per acquisition.",
              },
              {
                icon: RefreshCw,
                color: "#DC2626",
                title: "Smart Remarketing Sequences",
                desc: "Our remarketing strategies re-engage website visitors at every stage of the buyer's journey with personalised ad sequences, recovering lost conversions and nurturing warm leads into paying customers.",
              },
            ].map((card, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-5">
                  <card.icon className="w-7 h-7" style={{ color: card.color }} />
                </div>
                <h3 className="font-bold text-base mb-3" style={{ color: card.color }}>
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section className="py-24" style={{ background: "#111827" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-1">
              Calculate Your PPC
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              <span style={{ color: BLUE }}>Campaign ROI</span>{" "}
              <span style={{ color: "#22C55E" }}>Instantly</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mt-5 leading-relaxed">
              Use our free PPC calculator to estimate clicks, conversions, and revenue. Enter your campaign details below and see projected results to plan your ad budget effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">

            {/* ── LEFT: Campaign Parameters ── */}
            <div className="rounded-2xl p-8" style={{ background: "#1F2937" }}>
              {/* Card header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: BLUE }}>
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-base">Campaign Parameters</span>
              </div>

              {/* Sliders */}
              {[
                { label: "Monthly Ad Budget",  value: budget,     set: setBudget,     min: 500,  max: 50000, step: 100,  fmt: (v: number) => v.toLocaleString() },
                { label: "Cost Per Click (CPC)", value: cpc,      set: setCpc,        min: 0.1,  max: 20,    step: 0.1,  fmt: (v: number) => v.toFixed(1) },
                { label: "Conversion Rate",    value: convRate,   set: setConvRate,   min: 0.1,  max: 20,    step: 0.1,  fmt: (v: number) => v.toFixed(0) },
                { label: "Avg Order Value",    value: orderValue, set: setOrderValue, min: 10,   max: 10000, step: 10,   fmt: (v: number) => v.toLocaleString() },
              ].map(({ label, value, set, min, max, step, fmt }) => (
                <div key={label} className="mb-7">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span className="text-white text-sm font-bold px-3 py-1 rounded-lg min-w-[60px] text-center"
                      style={{ background: "#374151" }}>
                      {fmt(value)}
                    </span>
                  </div>
                  <input
                    type="range" min={min} max={max} step={step} value={value}
                    onChange={e => set(parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${BLUE} 0%, ${BLUE} ${((value - min) / (max - min)) * 100}%, #374151 ${((value - min) / (max - min)) * 100}%, #374151 100%)`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* ── RIGHT: Projected Results ── */}
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <BarChart className="w-5 h-5" style={{ color: "#F59E0B" }} />
                <span className="font-bold text-white text-base">Projected Results</span>
              </div>

              {/* Metric cards */}
              {[
                { icon: MousePointer, color: "#2563EB", bg: "#1E3A5F", label: "Clicks/Month", value: clicks.toLocaleString() },
                { icon: Target,       color: "#22C55E", bg: "#14432A", label: "Conversions",  value: convs.toLocaleString() },
                { icon: DollarSign,   color: "#F59E0B", bg: "#44300A", label: "Revenue",      value: `$${revenue.toLocaleString()}` },
                { icon: TrendingUp,   color: "#EF4444", bg: "#450A0A", label: "ROAS",         value: `${roas}x` },
              ].map(({ icon: Icon, color, bg, label, value }) => (
                <div key={label} className="flex items-center justify-between rounded-xl px-5 py-4"
                  style={{ background: "#1F2937" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-gray-400 text-sm">{label}</span>
                  </div>
                  <span className="text-white font-extrabold text-lg">{value}</span>
                </div>
              ))}

              {/* Estimated Profit card */}
              <div className="rounded-xl px-5 py-5 flex items-center justify-between"
                style={{ background: "#1F2937", border: "1px solid #374151" }}>
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Estimated Profit</p>
                  <p className="text-2xl font-extrabold" style={{ color: profit >= 0 ? "#22C55E" : "#EF4444" }}>
                    {profit >= 0 ? "+" : ""}${profit.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: profit >= 0 ? "#14432A" : "#450A0A" }}>
                  <TrendingUp className="w-5 h-5" style={{ color: profit >= 0 ? "#22C55E" : "#EF4444" }} />
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/contact"
                className="w-full text-center py-4 rounded-xl font-bold text-white transition-colors block"
                style={{ background: BLUE }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
                Get a Free PPC Audit →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PACKAGES ── */}
      <section className="py-20" style={{ background: "#F0FFF4" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Affordable &amp; Performance-Focused
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: "#16A34A" }}>
              Pay-Per-Click Marketing Packages
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-14 text-sm leading-relaxed">
            Unlock the full potential of targeted ads with our performance-driven, cost-effective Pay-per-click marketing packages. Our pricing is tailored to boost your online visibility and drive meaningful results that fit your business needs.
          </p>

          {/* 3 pricing cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {[
              {
                popular: false,
                iconBg: "#2563EB",
                icon: BadgeCheck,
                name: "Basic PPC Plan",
                platforms: "Any 1 platform",
                tag: "Google Ads, Bing Ads, Meta Ads, LinkedIn Ads",
                features: [
                  "PPC account setup or initial review",
                  "Keyword and audience research aligned with platform guidelines",
                  "Campaign and ad group structuring",
                  "Ad copy creation following advertising policies",
                  "Conversion tracking configuration (where applicable)",
                  "Budget and bid adjustments based on performance data",
                  "Ongoing campaign monitoring",
                  "Monthly activity and performance summary",
                ],
                cta: "Get Started with Basic",
                ctaSolid: false,
                accentColor: "#2563EB",
              },
              {
                popular: true,
                iconBg: "#16A34A",
                icon: Zap,
                name: "Advanced PPC Plan",
                platforms: "Any 2 platforms",
                tag: "Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads",
                features: [
                  "Everything in the Basic plan, plus",
                  "Multi-campaign account management",
                  "Refined keyword and audience segmentation",
                  "Ad variation testing for messaging and formats",
                  "Remarketing campaign setup (policy-compliant)",
                  "Budget and bid optimisation across platforms",
                  "Conversion tracking review and improvements",
                  "Scheduled performance reporting",
                ],
                cta: "Avail your Advanced Plan",
                ctaSolid: true,
                accentColor: "#16A34A",
              },
              {
                popular: false,
                iconBg: "#DC2626",
                icon: Award,
                name: "Custom PPC Plan",
                platforms: "Any 3–4 platforms",
                tag: "Fully customisable",
                features: [
                  "Custom PPC strategy aligned with business goals",
                  "Search, display, shopping, and remarketing campaigns",
                  "Automation and Performance Max configuration",
                  "Advanced tracking and attribution setup",
                  "Ongoing optimisation based on approved performance signals",
                  "Scalable campaign planning and testing",
                  "Detailed analytics and reporting",
                  "Dedicated account management support",
                ],
                cta: "Request a Custom PPC Strategy",
                ctaSolid: false,
                accentColor: "#DC2626",
              },
            ].map((plan, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl flex flex-col relative overflow-hidden"
                style={{
                  border: plan.popular ? `2px solid #16A34A` : "1px solid #E5E7EB",
                  boxShadow: plan.popular ? "0 8px 32px rgba(22,163,74,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Most Popular badge */}
                {plan.popular && (
                  <div className="text-center py-2 text-xs font-bold text-white tracking-wide"
                    style={{ background: "#16A34A" }}>
                    Most Popular
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: plan.iconBg }}>
                      <plan.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Name + platforms */}
                  <h3 className="text-xl font-extrabold text-gray-900 text-center mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-sm text-center mb-4">{plan.platforms}</p>

                  {/* Platform tag */}
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full text-center leading-snug">
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0 text-gray-400" />
                      {plan.tag}
                    </span>
                  </div>

                  {/* Feature list */}
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">What&apos;s Included:</p>
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#16A34A" }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href="/contact"
                    className="w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 block"
                    style={plan.ctaSolid
                      ? { background: "#16A34A", color: "#fff" }
                      : { background: "transparent", color: "#374151", border: "1.5px solid #D1D5DB" }
                    }>
                    {plan.cta} →
                  </Link>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="grid md:grid-cols-2 overflow-hidden" style={{ background: "#0F1929" }}>

        {/* Left: meeting photo */}
        <div className="relative min-h-[260px] md:min-h-[340px]">
          <img
            src="/cta-meeting-analytics.png"
            alt="PPC team analytics meeting"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right: copy */}
        <div className="flex flex-col justify-center px-10 py-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-4">
            Ready to Turn Ad Spend Into{" "}
            <em className="not-italic font-extrabold" style={{ color: "#22C55E" }}>
              Predictable Revenue?
            </em>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
            Our PPC management team builds scalable advertising systems backed by data, automation, and clear ROI metrics that grow your business month over month.
          </p>
          <div>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
              style={{ background: "transparent", color: "#22C55E", border: "2px solid #22C55E" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#22C55E";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#22C55E";
              }}>
              Request a Free PPC Consultation →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6-STEP PROCESS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Our Proven</h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: BLUE }}>
              PPC Campaign Process
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
            Our systematic 6-step PPC management process ensures your campaigns are built for success, delivering measurable ROI and continuous performance improvement from day one.
          </p>

          {/* Staggered 6-step cards */}
          {(() => {
            const steps = [
              {
                icon: Search,
                color: "#EC4899",
                bg: "#FDF2F8",
                title: "Discovery and Audit",
                body: "We begin with a thorough PPC audit, analysing your current campaigns, competitor strategies, keyword landscape, and market opportunities to identify quick wins and long-term growth potential.",
                mt: "mt-8",
              },
              {
                icon: Target,
                color: "#F97316",
                bg: "#FFF7ED",
                title: "Strategy & Planning",
                body: "We develop a customized PPC strategy including platform selection, audience targeting, budget allocation, bidding approach, and campaign architecture aligned with your business objectives and KPIs.",
                mt: "mt-0",
              },
              {
                icon: Layers,
                color: "#3B82F6",
                bg: "#EFF6FF",
                title: "Campaign Build",
                body: "Our team builds your campaigns from the ground up — optimised ad groups, compelling ad copy, strategic keywords, negative keyword lists, conversion tracking, and dedicated landing pages.",
                mt: "mt-0",
              },
              {
                icon: Rocket,
                color: "#22C55E",
                bg: "#F0FDF4",
                title: "Launch & Monitor",
                body: "We launch your campaigns with careful monitoring, making real-time adjustments to bidding, targeting, placements, and creative to maximise initial performance and minimise wasted spend.",
                mt: "mt-8",
              },
              {
                icon: BarChart3,
                color: "#8B5CF6",
                bg: "#F5F3FF",
                title: "Optimize and Test",
                body: "Through continuous A/B testing of ad copy, audiences, landing pages, and bidding strategies, we systematically improve ROAS, reduce CPA, and increase conversion volume across all campaigns.",
                mt: "mt-0",
              },
              {
                icon: TrendingUp,
                color: "#6366F1",
                bg: "#EEF2FF",
                title: "Scale & Expand",
                body: "After identifying winning campaigns and profitable channels, we scale strategically — expanding to new platforms, audiences, geographies, and ad formats while maintaining cost efficiency.",
                mt: "mt-8",
              },
            ];

            const dotColors = ["#EC4899", "#F97316", "#3B82F6", "#22C55E", "#8B5CF6", "#6366F1"];

            return (
              <>
                {/* Cards grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start mb-10">
                  {steps.map((s, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={`rounded-2xl p-5 flex flex-col gap-3 ${s.mt}`}
                      style={{ background: s.bg, border: "1px solid #F3F4F6" }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${s.color}1A` }}>
                        <s.icon className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm leading-snug">{s.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{s.body}</p>
                    </m.div>
                  ))}
                </div>

                {/* Timeline dots + wavy connector */}
                <div className="relative flex justify-between items-center max-w-4xl mx-auto px-2 mb-12">
                  {/* Wavy SVG line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 60" preserveAspectRatio="none"
                    style={{ zIndex: 0 }}>
                    <path
                      d="M 30,30 C 100,10 130,50 200,30 C 270,10 300,50 400,30 C 500,10 530,50 600,30 C 670,10 700,50 770,30"
                      fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="6 4"
                    />
                  </svg>
                  {/* Dots + labels */}
                  {dotColors.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                      <div className="w-6 h-6 rounded-full border-4 border-white shadow-md"
                        style={{ background: c }} />
                      <span className="text-xs font-semibold text-gray-400">Step 0{i + 1}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="flex justify-center">
                  <Link href="/contact"
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white text-sm transition-all duration-200"
                    style={{ background: BLUE }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
                    Launch Your PPC Campaign
                    <Rocket className="w-4 h-4" />
                  </Link>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-20" style={{ background: "#F8F9FB" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Why Choose Top SEO Services for Your
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: BLUE }}>
              Pay-Per-Click Marketing Services
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-14 text-sm leading-relaxed">
            Witness unmatched PPC excellence with our PPC campaign services, powered by certified experts, proprietary technology, and seamless optimization. We transform advertising budgets into predictable revenue engines.
          </p>

          {/* 3×2 cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: TrendingUp,
                title: "Proven Track Record of Exceptional Results",
                body: "Our data-driven campaign management method has produced an average ROI improvement of over 300% for clients across multiple industries. The portfolio provides evidence of our successful strategies through its documented record of continuous revenue growth, lower customer acquisition expenses, and the highest conversion rates in the industry. The frameworks that you get now provide proven techniques to increase profits without requiring any uncertain decisions.",
              },
              {
                num: "02",
                icon: Eye,
                title: "Complete Transparency and Full Control",
                body: "The dashboard system provides direct access to real-time campaign results while displaying all performance metrics and tracking information without any hidden data. The complete transparency we offer gives you complete control across all bidding aspects, strategies, and budget distribution, along with optimization processes. The business shares everything through transparent communication and collaborative work with clients, eliminating any hidden elements that could lead to unexpected situations.",
              },
              {
                num: "03",
                icon: Cpu,
                title: "Advanced Technology and Automation",
                body: "Our business provides AI-based bidding systems, predictive analytics, and automation tools that handle campaign optimization work throughout the entire day. Our technology stack operates together with your current system setup to deliver business advantages that competitors cannot obtain from normal technology solutions. Your organization gets access to advanced business tools that require no heavy technology spending.",
              },
              {
                num: "04",
                icon: Landmark,
                title: "Industry-Specialized Campaign Expertise",
                body: "The strategists on our team possess a deep understanding of your industry-specific challenges, seasonal trends, customer behavior, and competitive dynamics. Our vertical-specific knowledge enables direct creation of authentic campaigns that actually connect with your target audience. The competitive environment requires your rivals to spend money on testing while you move forward with your business processes.",
              },
              {
                num: "05",
                icon: Layers,
                title: "Comprehensive Multi-Channel Management",
                body: "Our integrated advertising system operates all profitable advertising platforms through which we run combined Google Ads and Microsoft Advertising, social media, and display network campaigns. We use our cross-channel strategies to achieve maximum audience reach while stopping audience burnout and budget waste. Your brand will establish a presence in all areas where consumers make online searches and product research.",
              },
              {
                num: "06",
                icon: Shield,
                title: "Dedicated Strategic Partnership Approach",
                body: "The business provides dedicated service through senior PPC experts who will work with you until they achieve success, and not through junior account managers. We become extensions of your marketing team because we deliver strategic consulting services together with competitive testing and recommendation delivery. The partners you work with will help you increase your advertising returns because they have extensive experience in the field.",
              },
            ].map((card, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-7 flex flex-col gap-4"
                style={{ border: "1px solid #E8ECF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                {/* Badge row */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#EEF2FF" }}>
                    <card.icon className="w-4 h-4" style={{ color: BLUE }} />
                  </div>
                  <span className="text-base font-bold" style={{ color: "#C7D2FE" }}>{card.num}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-gray-900 leading-snug">{card.title}</h3>

                {/* Body */}
                <p className="text-gray-500 text-sm leading-relaxed">{card.body}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCALE CTA BANNER ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-2xl overflow-hidden grid md:grid-cols-2 min-h-[220px]"
            style={{ background: "#0F1929" }}>

            {/* Left: copy */}
            <div className="flex flex-col justify-center px-10 py-12">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-3">
                Struggling to Scale Your{" "}
                <em className="not-italic font-extrabold" style={{ color: "#F59E0B" }}>
                  Ad Campaigns Profitably?
                </em>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-7 max-w-sm">
                We identify high-performing audiences, optimise bidding strategies, and expand winning campaigns — so you grow revenue without growing waste.
              </p>
              <div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-gray-900 transition-all duration-200"
                  style={{ background: "#F59E0B" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#D97706"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F59E0B"; }}>
                  Scale Your Campaigns Now →
                </Link>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative min-h-[200px] md:min-h-0">
              <img src="/cta-laptop-analytics.png" alt="Campaign analytics"
                className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0F1929 0%, transparent 60%)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Top SEO Services vs. Competitors:
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Why We Are the Best{" "}
              <span style={{ color: BLUE }}>Pay-Per-Click Marketing Company</span>
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 text-sm leading-relaxed">
            The Top SEO Services serves as a recommended pay-per-click marketing company and reigns supreme over competitors. Our proven track record, transparent approach, and obsessive focus on ROI deliver superior results that simply outperform industry benchmarks.
          </p>

          {/* Table */}
          <div className="overflow-x-auto max-w-4xl mx-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "separate", borderSpacing: 0, border: "1px solid #E5E7EB", borderRadius: "16px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#F9FAFB" }}>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-[22%]">Pointers</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest w-[39%]" style={{ color: GREEN }}>Top SEO Services</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-[39%]">Competitors</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    pointer: "Campaign Strategy",
                    us: "Custom-built strategies aligned with your specific business goals and target audience",
                    them: "Generic, template-based approaches applied across all clients",
                  },
                  {
                    pointer: "Reporting Transparency",
                    us: "Real-time dashboards with full access to campaign data and granular performance metrics",
                    them: "Limited monthly reports with restricted data visibility",
                  },
                  {
                    pointer: "Account Management",
                    us: "Dedicated senior strategist with direct communication and proactive optimisation",
                    them: "Junior staff or offshore teams with limited availability",
                  },
                  {
                    pointer: "Industry Expertise",
                    us: "Specialised knowledge across 8+ major industries with proven case studies",
                    them: "Generalist approach without deep sector understanding",
                  },
                  {
                    pointer: "Technology Stack",
                    us: "Advanced automation, AI-powered bidding, and proprietary optimisation tools",
                    them: "Basic platform features with minimal technological advantage",
                  },
                  {
                    pointer: "ROI Focus",
                    us: "Laser-focused on revenue and profit metrics, not just clicks and impressions",
                    them: "Vanity metrics like traffic volume without conversion emphasis",
                  },
                ].map((row, i, arr) => (
                  <tr key={i} style={{ borderTop: "1px solid #E5E7EB", background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                    <td className="px-6 py-5 font-bold text-gray-900 align-top"
                      style={{ borderRight: "1px solid #E5E7EB" }}>{row.pointer}</td>
                    <td className="px-6 py-5 text-gray-600 align-top"
                      style={{ borderRight: "1px solid #E5E7EB" }}>
                      <span className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                        {row.us}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-500 align-top">
                      <span className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center rounded-full text-white text-xs font-bold leading-none"
                          style={{ background: "#EF4444", minWidth: "16px", minHeight: "16px", fontSize: "10px" }}>✕</span>
                        {row.them}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ background: "#F8F9FB" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Frequently Asked Questions About
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: BLUE }}>
              PPC Marketing Services
            </h2>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-14 text-sm leading-relaxed">
            Get answers to the most common questions about our pay-per-click marketing and advertising management services.
          </p>

          <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start max-w-5xl mx-auto">

            {/* Left: still-have-questions card */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-4 sticky top-24"
              style={{ border: "1px solid #E8ECF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <img src="/faq-woman.png" alt="Still have questions?"
                className="w-full max-w-[220px] object-contain rounded-xl" />
              <h3 className="text-lg font-extrabold text-gray-900">Still Have Questions?</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Can&apos;t find the answer you&apos;re looking for? Our PPC experts are ready to help you get started.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200"
                style={{ background: BLUE }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
                Ask Our PPC Experts →
              </Link>
            </div>

            {/* Right: accordion */}
            <div className="flex flex-col gap-3">
              {[
                {
                  q: "Q1. What PPC advertising platforms do you manage?",
                  a: "We manage campaigns across Google Ads, Microsoft Bing Ads, Meta (Facebook & Instagram) Ads, LinkedIn Ads, YouTube Ads, Amazon Ads, TikTok Ads, Pinterest Ads, and programmatic display networks — giving your brand full-funnel coverage wherever your audience spends time.",
                },
                {
                  q: "Q2. How quickly will I see results from PPC advertising?",
                  a: "Unlike SEO, PPC can deliver traffic and leads within 24–72 hours of launch. Most campaigns reach optimal performance within the first 30–60 days as we gather data, refine targeting, and optimise bidding strategies for your specific goals.",
                },
                {
                  q: "Q3. What budget do I need for effective PPC campaigns?",
                  a: "Effective PPC budgets vary by industry, competition, and goals. We work with monthly ad spends starting from £500 for focused campaigns, up to £50,000+ for enterprise accounts. Our team helps you allocate budget intelligently to maximise ROAS from day one.",
                },
                {
                  q: "Q4. How do you measure and report PPC campaign success?",
                  a: "We track clicks, impressions, CTR, conversions, cost-per-conversion, ROAS, and revenue. You get access to a real-time dashboard plus monthly performance reports with plain-language insights, trend analysis, and recommended actions for the next period.",
                },
                {
                  q: "Q5. Do you handle all the ad creative and copywriting?",
                  a: "Yes. Our in-house team creates compelling ad copy, headlines, descriptions, and call-to-actions tailored to each platform's best practices. For display and social campaigns, we also produce static and animated creatives optimised for engagement and conversions.",
                },
                {
                  q: "Q6. What's the difference between PPC and SEO?",
                  a: "PPC (Pay-Per-Click) delivers immediate paid visibility in search results and social feeds — you pay per click. SEO (Search Engine Optimisation) builds organic, unpaid rankings over time. We recommend combining both: PPC for instant traffic and SEO for long-term authority.",
                },
                {
                  q: "Q7. How do you optimise landing pages for PPC?",
                  a: "We audit your existing landing pages for conversion rate, load speed, message-match, and UX. We then implement copy improvements, A/B testing, clear CTAs, and trust signals. Where needed, we build dedicated PPC landing pages designed solely to convert ad traffic.",
                },
                {
                  q: "Q8. What makes your PPC management agency different?",
                  a: "Senior-only account management, full transparency on spend and performance, proprietary automation tools, and an obsessive focus on revenue — not vanity metrics. Every client gets a dedicated strategist with industry-specific expertise, not a generic account template.",
                },
                {
                  q: "Q9. Can you help with remarketing and retargeting campaigns?",
                  a: "Absolutely. We build advanced remarketing audiences from your website visitors, CRM lists, video viewers, and past converters. These campaigns re-engage high-intent users across Google Display, YouTube, Meta, and LinkedIn to recover lost revenue at lower cost-per-acquisition.",
                },
                {
                  q: "Q10. Do you require long-term contracts?",
                  a: "No long-term lock-ins. We operate on flexible monthly agreements because we believe our results should do the talking. Most clients stay with us long-term because of the ROI we deliver — not because they're contractually obligated to.",
                },
              ].map((faq, i) => (
                <div key={i}
                  className="bg-white rounded-xl overflow-hidden cursor-pointer"
                  style={{ border: "1px solid #E8ECF0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="flex items-center justify-between px-6 py-4 gap-4">
                    <span className="font-semibold text-gray-900 text-sm leading-snug">{faq.q}</span>
                    <ChevronDown
                      className="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-300"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <m.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden">
                        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">
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

      {/* ── MAXIMIZE ROI CTA BANNER ── */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-8"
            style={{ background: BLUE }}>
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1">Ready to Maximize Your Ad ROI?</h3>
              <p className="text-blue-100 text-sm max-w-md">
                Get a free PPC audit and discover how to turn every click into measurable growth.
              </p>
            </div>
            <Link href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
              style={{ background: "transparent", color: "#fff", border: "2px solid #fff" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#fff";
                (e.currentTarget as HTMLElement).style.color = BLUE;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}>
              Get Your Free Audit →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-[3fr_2fr] gap-10 max-w-5xl mx-auto items-start">

            {/* Left: form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
                Let&apos;s <span style={{ color: BLUE }}>Get Started</span>
              </h2>

              {cSent ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <CheckCircle2 className="w-14 h-14" style={{ color: GREEN }} />
                  <p className="text-xl font-bold text-gray-900">Message sent!</p>
                  <p className="text-gray-500 text-sm">We&apos;ll be in touch within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleCform} className="flex flex-col gap-6">
                  <div className="border-b border-gray-200 pb-2">
                    <input type="text" required placeholder="Your Name*"
                      value={cform.name}
                      onChange={e => setCform(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none py-1" />
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <input type="email" required placeholder="Business Email*"
                      value={cform.email}
                      onChange={e => setCform(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none py-1" />
                  </div>
                  <div className="border-b border-gray-200 pb-2 flex items-center gap-3">
                    <span className="text-sm text-gray-500 flex items-center gap-1 flex-shrink-0">
                      <Phone className="w-3.5 h-3.5" /> US +1
                    </span>
                    <input type="tel" placeholder="Phone Number *"
                      value={cform.phone}
                      onChange={e => setCform(p => ({ ...p, phone: e.target.value }))}
                      className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none py-1" />
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <select value={cform.budget}
                      onChange={e => setCform(p => ({ ...p, budget: e.target.value }))}
                      className="w-full bg-transparent text-sm text-gray-400 outline-none py-1 appearance-none cursor-pointer">
                      <option value="">Select Budget</option>
                      <option value="under-1k">Under £1,000/mo</option>
                      <option value="1k-5k">£1,000 – £5,000/mo</option>
                      <option value="5k-15k">£5,000 – £15,000/mo</option>
                      <option value="15k-50k">£15,000 – £50,000/mo</option>
                      <option value="50k+">£50,000+/mo</option>
                    </select>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <textarea rows={4} placeholder="Tell us about your project*"
                      value={cform.message}
                      onChange={e => setCform(p => ({ ...p, message: e.target.value }))}
                      className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none py-1 resize-none" />
                  </div>
                  <div>
                    <button type="submit" disabled={cLoading}
                      className="px-8 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 disabled:opacity-70"
                      style={{ background: BLUE }}
                      onMouseEnter={e => { if (!cLoading) (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
                      {cLoading ? "Sending…" : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: email card */}
            <div className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: "#DC2626" }}>
              <div>
                <h3 className="text-xl font-extrabold text-white mb-1">Hate Filling out Forms?</h3>
                <a href="mailto:business@topseoservices.co"
                  className="text-red-100 text-sm underline underline-offset-2 hover:text-white transition-colors">
                  Email us.
                </a>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                {[
                  { label: "Request a Quote",                     email: "business@topseoservices.co" },
                  { label: "Partners Enquires",                   email: "partners@topseoservices.co" },
                  { label: "Reference Checks /Misc. HR Enquires", email: "hr@topseoservices.co"       },
                  { label: "Other Enquires",                      email: "info@topseoservices.co"     },
                ].map((item, i, arr) => (
                  <div key={i}>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-white opacity-90" />
                      <div>
                        <p className="font-bold text-white text-sm">{item.label}</p>
                        <a href={`mailto:${item.email}`}
                          className="text-red-100 text-xs hover:text-white transition-colors">
                          {item.email}
                        </a>
                      </div>
                    </div>
                    {i < arr.length - 1 && <div className="mt-4 border-t border-red-400 opacity-40" />}
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
