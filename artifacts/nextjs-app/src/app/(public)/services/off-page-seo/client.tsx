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

const COVERED_SERVICES = [
  {
    icon: Link2,
    color: "#2563EB",
    bg: "#EFF6FF",
    title: "Backlink Strategy and Building",
    desc: "The procedure for gaining high-quality backlinks is the foremost asset of off-page SEO work. We aim to get backlinks from recognized websites that'll enhance your website's credibility while increasing its search engine rankings.",
    featured: false,
  },
  {
    icon: FileText,
    color: "#16A34A",
    bg: "#F0FDF4",
    title: "Guest Posting and Content Outreach",
    desc: "We enhance your website's reach by securing guest posts on reputable blogs and sites. This process brings visitors to your site, helping to establish your authority and develop your online presence, which ultimately leads to better search engine rankings.",
    featured: false,
  },
  {
    icon: Globe2,
    color: "#F97316",
    bg: "#FFF7ED",
    title: "Social Media and Brand Mentions",
    desc: "This approach involves link building, social media marketing, and online reputation management. Additionally, strong off-page SEO can significantly influence and boost your organic traffic and help you outrank your rivals in terms of search results.",
    featured: false,
  },
  {
    icon: ShieldCheck,
    color: "#0D9488",
    bg: "#F0FDFA",
    title: "Local SEO and Citations",
    desc: "We build and optimise consistent NAP citations across local directories, industry databases, and authoritative listing sites — critical for local search rankings and a foundational layer of any off-page SEO strategy.",
    featured: false,
  },
  {
    icon: Star,
    color: "#7C3AED",
    bg: "#F5F3FF",
    title: "Influencer Marketing and Partnerships",
    desc: "We connect your brand with relevant influencers and industry partners to amplify reach, earn authoritative backlinks, and build genuine social proof that search engines recognise as trust signals.",
    featured: false,
  },
  {
    icon: Settings2,
    color: "#E53E3E",
    bg: "#FFF5F5",
    title: "Online Reputation Management",
    desc: "We monitor, protect, and improve your brand's online reputation by managing reviews, responding to mentions, and ensuring your brand is consistently represented positively across the web.",
    featured: false,
  },
  {
    icon: LayoutGrid,
    color: "#CA8A04",
    bg: "#FEFCE8",
    title: "Social Bookmarking and Forums",
    desc: "We strategically engage on social bookmarking platforms and niche forums to drive referral traffic, build brand visibility, and generate signals that supplement your core link-building campaigns.",
    featured: false,
  },
  {
    icon: BarChart3,
    color: "#2563EB",
    bg: "#EFF6FF",
    title: "Competitor Analysis",
    desc: "We reverse-engineer the off-page SEO strategies of your top competitors — identifying their backlink sources, anchor profiles, and digital PR placements — so we can systematically outperform them.",
    featured: false,
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    color: "#F97316",
    label: "Backlink Audit",
    icon: FileText,
    title: "Backlink Audit",
    desc: "We begin with a comprehensive audit of your existing backlink profile using Ahrefs, SEMrush, and Majestic. We identify toxic links, analyse anchor text distribution, benchmark your domain authority against top competitors, and build a clear baseline for the campaign ahead.",
    items: [
      "Full backlink profile analysis",
      "Toxic and spammy link identification",
      "Competitor backlink benchmarking",
      "Domain authority baseline report",
    ],
  },
  {
    num: "02",
    color: "#2563EB",
    label: "Strategy & Targets",
    icon: Target,
    title: "Strategy & Targets",
    desc: "Based on your niche, domain authority, and competitive landscape, we define a tailored link-building strategy. We identify the highest-value link targets — editorial publications, industry blogs, resource pages, and digital PR opportunities — and set monthly authority targets.",
    items: [
      "Niche link opportunity research",
      "Target site qualification and vetting",
      "Anchor text strategy mapping",
      "Monthly authority milestone planning",
    ],
  },
  {
    num: "03",
    color: "#16A34A",
    label: "Content Creation",
    icon: AlignLeft,
    title: "Content Creation",
    desc: "Our content team creates linkable assets specifically designed to earn editorial backlinks — original research, expert guides, data-driven infographics, and thought-leadership articles that target publications want to reference and share with their audiences.",
    items: [
      "Linkable asset development",
      "Guest post drafting and editing",
      "Original data study creation",
      "Infographic and visual asset design",
    ],
  },
  {
    num: "04",
    color: "#7C3AED",
    label: "Outreach",
    icon: Globe2,
    title: "Outreach & Placement",
    desc: "We execute personalised, manual outreach campaigns to editors, journalists, and site owners. Our team builds genuine relationships — not mass-blast email campaigns — to secure editorial placements on high-DR sites that pass lasting authority to your domain.",
    items: [
      "Personalised pitch creation",
      "Journalist and editor outreach",
      "Follow-up sequence management",
      "Placement negotiation and confirmation",
    ],
  },
  {
    num: "05",
    color: "#E53E3E",
    label: "Link Monitoring",
    icon: Gauge,
    title: "Link Monitoring",
    desc: "Once links are live, we monitor them continuously to ensure they remain indexed, followed, and active. If a link is removed or noindexed, we identify it immediately and work to reinstate or replace it — protecting every unit of authority we've built.",
    items: [
      "Live link verification and indexation",
      "Lost link detection and recovery",
      "Anchor text drift monitoring",
      "Disavow file maintenance",
    ],
  },
  {
    num: "06",
    color: "#0D9488",
    label: "Reporting",
    icon: BarChart3,
    title: "Reporting & Iteration",
    desc: "Monthly reports show every link earned, the domain rating of each placement, changes to your overall domain authority, and ranking improvements attributed to the campaign. We use this data to refine targeting, expand into new content formats, and continuously improve ROI.",
    items: [
      "Monthly link acquisition report",
      "Domain authority progression tracking",
      "Ranking uplift attribution analysis",
      "Next-cycle strategy refinement",
    ],
  },
];

const WHY_CARDS = [
  {
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=540&fit=crop&q=85",
    icon: Target,
    color: "#2563EB",
    bg: "#EFF6FF",
    title: "Builds Domain Authority",
    desc: "Every high-quality backlink earned increases your domain authority score, directly improving how search engines rank all your pages.",
  },
  {
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=540&fit=crop&q=85",
    icon: Link2,
    color: "#16A34A",
    bg: "#F0FDF4",
    title: "Improves Search Engine Rankings",
    desc: "The use of off-page SEO techniques, which include guest posting, blogging and influencer marketing, helps your site improve its keyword rankings, resulting in higher positions on search engine results pages.",
  },
  {
    photo: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=540&fit=crop&q=85",
    icon: TrendingUp,
    color: "#F97316",
    bg: "#FFF7ED",
    title: "Increases Referral Traffic",
    desc: "Links from high-traffic publications send targeted referral visitors to your site — traffic that converts because it comes pre-qualified.",
  },
  {
    photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=540&fit=crop&q=85",
    icon: ShieldCheck,
    color: "#9333EA",
    bg: "#FAF5FF",
    title: "Strengthens Brand Trust",
    desc: "Being featured in respected publications positions your brand as a trusted, expert voice in your niche and boosts user confidence.",
  },
  {
    photo: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=540&fit=crop&q=85",
    icon: Globe2,
    color: "#CA8A04",
    bg: "#FEFCE8",
    title: "Expands Brand Awareness",
    desc: "Digital PR and guest placements introduce your brand to new audiences across authoritative platforms, growing your organic reach.",
  },
  {
    photo: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&h=540&fit=crop&q=85",
    icon: BarChart3,
    color: "#DC2626",
    bg: "#FEF2F2",
    title: "Outpaces Competitors",
    desc: "In competitive niches, domain authority is the decisive factor. Stronger backlink profiles consistently outrank comparable on-page SEO.",
  },
];

const FAQS = [
  {
    q: "What is off-page SEO and why does it matter?",
    a: "Off-page SEO refers to all actions taken outside your website to improve its authority and rankings — primarily link building, digital PR, and brand mentions. Search engines treat backlinks as votes of confidence; the more high-authority, relevant sites that link to yours, the more trustworthy your site appears. Without off-page SEO, even perfectly optimised on-page content struggles to rank against established competitors.",
  },
  {
    q: "How do backlinks from off-page SEO services enhance my Google rankings?",
    a: "Backlinks serve as trust signals from high-authority websites, boosting your domain authority and search rankings. Off-page SEO services gain top-quality backlinks through guest posting, content outreach, and digital PR that directly influence your visibility and referral traffic.",
  },
  {
    q: "What is the core difference between on-page and off-page SEO strategies?",
    a: "On-page SEO optimizes internal elements (content, meta tags, site structure), while off-page SEO builds external authority through backlinks, social signals, etc. On the other hand, on-page makes your website crawlable, and off-page makes it trustworthy. Both are equally essential for maximizing search performance.",
  },
  {
    q: "What is the projected timeframe to get results from off-page SEO services?",
    a: "Expect visible results in 3-6 months, depending on competition and current domain authority. Search engines need time to discover and evaluate new backlinks. Results compound over time, delivering sustainable organic traffic growth.",
  },
  {
    q: "What are the best ways to get high-authority backlinks?",
    a: "Gain backlinks through well-written guest posts on industry blogs, digital PR campaigns (public relations efforts conducted online), broken link building (the process of finding and replacing broken links on websites), creating linkable assets (content that is valuable enough for others to link to), and building organic relationships with influencers in your niche.",
  },
  {
    q: "How can your agency measure the off-page SEO success?",
    a: "As a trustworthy digital marketing services provider, we track domain authority growth, referring domain count, keyword ranking improvements, organic traffic increases, and referral traffic quality—delivering transparent, results-driven reporting.",
  },
  {
    q: "What are the best off-page SEO techniques?",
    a: "Guest blogging, digital PR, influencer outreach, broken link building, social media engagement, and brand mentions drive the best and organic off-page results.",
  },
  {
    q: "How to disavow toxic backlinks?",
    a: "The rule to disavow toxic backlinks is simple: Identify harmful links using SEO tools, request removal directly from webmasters, and then use Google's Disavow Tool for persistent spam links. Only disavow severe cases—preserve valuable links.",
  },
  {
    q: "What should I get in my off-page SEO service suite?",
    a: "When you avail yourself of expert off-page seo services from Top Seo Services, you will get link building, guest posting, citation building, digital PR, and social media engagement.",
  },
  {
    q: "Should I hire a professional SEO agency, or can I tackle off-page SEO in-house?",
    a: "Professional SEO agencies offer well-established networks, tools, and immediate results. In-house works only if you have dedicated teams and time to build relationships. Most businesses achieve success with a hybrid approach, handling the basics internally while outsourcing advanced link building.",
  },
  {
    q: "What are the most relevant off-page ranking factors Google considers?",
    a: "Google highly prioritizes backlink quality, quantity, and domain authority. Also, brand mentions, social signals, user engagement metrics, online reviews, local citations, etc.",
  },
  {
    q: "What off-page SEO techniques deliver the best ROI for small businesses?",
    a: "To get the best ROI for small businesses, you can take help from the local citations, Google Business Profile optimization, niche guest posting, and community engagement, which bring strong returns. Establish relationships with local bloggers and industry publications for highly valued backlinks.",
  },
];

export function OffPageSeoPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", countryCode: "+1", budget: "", service: "Off-Page SEO", message: "" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [whySlide, setWhySlide] = useState(0);
  const [whyCardPage, setWhyCardPage] = useState(0);
  const WHY_PHOTOS = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=620&fit=crop&q=85",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=620&fit=crop&q=85",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=620&fit=crop&q=85",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=620&fit=crop&q=85",
  ];
  const WHY_BOTTOM_CARDS = [
    [
      { icon: ShieldCheck, color: "#0D9488", bg: "#F0FDFA", title: "White-Hat, Future-Proof Strategies", desc: "We use only ethical SEO methods which continue to deliver results after algorithm changes. Our off-page techniques protect your domain long-term and shield you from Google penalties." },
      { icon: Target, color: "#F97316", bg: "#FFF7ED", title: "Industry-Specific Link Building", desc: "We reject one-size-fits-all solutions. Our specialists build outreach campaigns tailored to your industry — leveraging sector-specific publications your competitors simply can't access." },
      { icon: FileText, color: "#CA8A04", bg: "#FEFCE8", title: "Transparent Reporting & Communication", desc: "Every link earned is documented with domain rating, anchor text, and placement URL. Dedicated account managers keep you informed at every stage of the campaign." },
    ],
    [
      { icon: BarChart3, color: "#2563EB", bg: "#EFF6FF", title: "Data-Driven Link Strategy", desc: "Every campaign is grounded in competitor backlink analysis and domain authority benchmarking. We identify exactly which authority sites power your competitors — then pursue those placements." },
      { icon: Globe2, color: "#7C3AED", bg: "#F5F3FF", title: "Comprehensive Competitor Analysis", desc: "We reverse-engineer the backlink profiles of your top competitors to uncover the exact link sources and outreach angles driving their authority — then outperform them systematically." },
      { icon: TrendingUp, color: "#16A34A", bg: "#F0FDF4", title: "Compounding Authority Growth", desc: "Unlike paid traffic that stops the moment you pause spend, off-page SEO compounds over time. Each authoritative link adds to a growing foundation that drives traffic for years." },
    ],
  ];

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
                  <Search className="w-3.5 h-3.5" /> OFF-PAGE SEO SPECIALISTS
                </span>
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.55 }}
                className="font-display font-black leading-tight mb-5"
              >
                <span className="block text-5xl md:text-6xl lg:text-7xl" style={{ color: "#F97316" }}>Proven Off-Page SEO</span>
                <span className="block text-white text-2xl md:text-3xl font-bold">Strategies to Boost Rankings &amp; Authority</span>
              </m.h1>

              <m.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.45 }}
                className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-md"
              >
                Get your business easily found on Google with our authoritative Off-page SEO services for businesses of all scales. We specialize in improving your website's search engine rankings through tangible off-page SEO campaigns to craft an appealing client experience with ease.
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
                    Book a Call <ArrowRight className="w-4 h-4" />
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

      {/* ── WHAT IS OFF-PAGE SEO ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "#FFF7ED", color: "#F97316", border: "1px solid #FED7AA" }}>
              WHAT IS OFF-PAGE SEO
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              What Is Off-Page SEO and{" "}
              <span style={{ color: "#F97316" }}>How Does It Work?</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Off-page SEO encompasses every action taken outside your website to build its authority, trustworthiness, and relevance in the eyes of search engines. While on-page SEO optimises what is on your site, off-page SEO determines how the rest of the web perceives it — and Google uses that perception as a powerful ranking signal.
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
                  alt="Team executing off-page SEO and link building campaigns"
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
                  <p className="text-white font-bold text-sm leading-tight">4.2× Avg. Authority Lift</p>
                  <p className="text-orange-100 text-xs">After off-page campaigns</p>
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
                  <p className="text-slate-900 font-bold text-sm leading-tight">25,000+ Backlinks Built</p>
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
              <div className="mb-6 p-5 rounded-xl" style={{ background: "#FFF7ED", border: "1px solid #FED7AA" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#F97316" }}>The Technical Definition</p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Off-page SEO is defined as the optimization and actions taken outside your website to enhance the search engine&apos;s ranking &amp; visibility. Generally, it includes strategies such as quality backlink building from reputable websites, engaging in guest blogging, and strengthening the brand&apos;s presence across the web. This approach directly signals to search engines that your site is 100% genuine.
                </p>
              </div>
              <div className="mb-8 p-5 rounded-xl" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>The Human Response</p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Off-page SEO is all about enhancing your site&apos;s presence and ranking by working on valuable tactics that are outside of your website. This involves getting other recognized websites to link back to you, which lets search engines know that your site is trusted and viable.
                </p>
              </div>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm"
                  style={{ border: "2px solid #F97316", color: "#F97316", background: "transparent" }}
                >
                  Talk to an Off-Page SEO Expert
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
                <span className="text-white">Are you ready to find your business on </span>
                <span className="italic" style={{ color: "#FB923C" }}>Google?</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
                Schedule a 1:1 consultation with our experts, who will help you enhance your understanding of your business&apos;s online growth through our results-focused SEO analysis.
              </p>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg"
                  style={{ background: "#F97316" }}
                >
                  Get Free SEO Report <ArrowRight className="w-4 h-4" />
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
              SERVICES COVERED
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              What&apos;s Covered in Our{" "}
              <span style={{ color: "#F97316" }}>Off-Page SEO</span> Services
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Our comprehensive off-page SEO services aim to enhance the visibility of your website. Through stepwise backlinking, brand mentions, and influencer collabs, we primarily focus on improving your SEO rankings and driving valuable traffic.
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

          <m.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <Link href="/contact">
              <m.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white shadow-lg"
                style={{ background: "#F97316" }}
              >
                Hire Our SEO Experts. Today <ArrowRight className="w-4 h-4" />
              </m.button>
            </Link>
          </m.div>
        </div>
      </section>

      {/* ── WHY OFF-PAGE SEO IS CRITICAL ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-4">
              Why Off-Page SEO Is{" "}
              <span style={{ color: "#2563EB" }}>Essential</span>{" "}
              for Growth
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
              Off-page SEO builds the authority, trust, and visibility your website needs to dominate search rankings and drive sustainable organic growth.
            </p>
          </m.div>

          {/* 3×2 hover-card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_CARDS.map(({ photo, icon: Icon, color, bg, title, desc }, i) => {
              const isHovered = hoveredCard === (1000 + i);
              return (
                <m.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.07, duration: 0.45 }}
                  onMouseEnter={() => setHoveredCard(1000 + i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative overflow-hidden rounded-2xl cursor-default"
                  style={{ aspectRatio: "4/3" }}
                >
                  {/* Background photo */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${photo})`,
                      opacity: isHovered ? 0 : 1,
                      transition: "opacity 0.45s ease",
                    }}
                  />
                  {/* Dark gradient overlay (default only) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
                      opacity: isHovered ? 0 : 1,
                      transition: "opacity 0.45s ease",
                    }}
                  />
                  {/* Hover state — white background content */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between p-6"
                    style={{
                      background: "#fff",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.45s ease",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{desc}</p>
                      <h3 className="font-bold text-base" style={{ color }}>{title}</h3>
                    </div>
                  </div>
                  {/* Default state — title overlay at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-5"
                    style={{
                      opacity: isHovered ? 0 : 1,
                      transition: "opacity 0.35s ease",
                    }}
                  >
                    <h3 className="font-bold text-white text-base drop-shadow">{title}</h3>
                  </div>
                </m.div>
              );
            })}
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
              Our 6-Step Off-Page SEO{" "}
              <span style={{ color: "#F97316" }}>Optimisation Process</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-2xl mx-auto">
              At The Top SEO Services, we follow a proven 6-step off-page SEO process to build sustainable domain authority. From initial backlink audit through to outreach, placement, and ongoing monitoring, every step is designed to compound your site's trust signals and deliver measurable ranking improvements over time.
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

          {/* ── Top: text left + photo right ── */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

            {/* Left — badge, heading, text, nav arrows */}
            <m.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <span
                className="inline-block w-fit px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ background: "#FFF7ED", color: "#F97316", border: "1.5px solid #FED7AA" }}
              >
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight mb-5">
                Why Businesses Choose Our{" "}
                <span style={{ color: "#F97316" }}>Off-Page SEO Expertise</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-md">
                Prominent industry leaders recommend our top-notch off-page SEO techniques to achieve exceptional outcomes that old-fashioned agencies can&apos;t match. Additionally, our data-driven SEO strategy combines smart tactics with personalised attention, guaranteeing your brand obtains consistent growth and unrivalled search visibility.
              </p>
              {/* Arrow nav + dots */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWhySlide((whySlide - 1 + WHY_PHOTOS.length) % WHY_PHOTOS.length)}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-slate-500 rotate-180" />
                </button>
                <button
                  onClick={() => setWhySlide((whySlide + 1) % WHY_PHOTOS.length)}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <div className="flex items-center gap-1.5 ml-2">
                  {WHY_PHOTOS.map((_: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setWhySlide(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: whySlide === i ? "20px" : "8px",
                        height: "8px",
                        background: whySlide === i ? "#F97316" : "#CBD5E1",
                      }}
                    />
                  ))}
                </div>
              </div>
            </m.div>

            {/* Right — photo carousel */}
            <m.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "3/2" }}
            >
              <AnimatePresence mode="wait">
                <m.img
                  key={whySlide}
                  src={WHY_PHOTOS[whySlide]}
                  alt="Off-page SEO team"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </m.div>
          </div>

          {/* ── Bottom: 3-col card slider ── */}
          <div className="pt-8 border-t border-slate-100">
            <AnimatePresence mode="wait">
              <m.div
                key={whyCardPage}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.32, ease: "easeInOut" }}
                className="grid sm:grid-cols-3 gap-6 mb-6"
              >
                {WHY_BOTTOM_CARDS[whyCardPage].map(({ icon: Icon, color, bg, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-2xl p-6 flex flex-col gap-4 border border-slate-100"
                    style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <h3 className="font-bold text-sm leading-snug" style={{ color }}>{title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
                  </div>
                ))}
              </m.div>
            </AnimatePresence>
            {/* Card slider nav */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setWhyCardPage((p) => Math.max(0, p - 1))}
                disabled={whyCardPage === 0}
                className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4 text-slate-500 rotate-180" />
              </button>
              {WHY_BOTTOM_CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setWhyCardPage(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: whyCardPage === i ? "24px" : "8px",
                    height: "8px",
                    background: whyCardPage === i ? "#F97316" : "#CBD5E1",
                  }}
                />
              ))}
              <button
                onClick={() => setWhyCardPage((p) => Math.min(WHY_BOTTOM_CARDS.length - 1, p + 1))}
                disabled={whyCardPage === WHY_BOTTOM_CARDS.length - 1}
                className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
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
