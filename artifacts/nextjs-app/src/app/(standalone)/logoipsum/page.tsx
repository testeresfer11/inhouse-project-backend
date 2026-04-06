"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CloudUpload,
  Cpu,
  MonitorSmartphone,
  ShieldCheck,
  LayoutGrid,
  MousePointerClick,
  ImagePlus,
  MonitorDown,
  Sparkles,
} from "lucide-react";

const NAV_LINKS = ["Templates", "Resources", "Pricing", "FAQ", "Enterprise"];

const FEATURES = [
  {
    icon: CloudUpload,
    title: "Instant Deployment",
    desc: "Deploy your apps to any domain instantly.",
  },
  {
    icon: Cpu,
    title: "Smart Systems",
    desc: "Modular components that stay perfectly consistent.",
  },
  {
    icon: MonitorSmartphone,
    title: "Fully Responsive",
    desc: "Optimized for mobile, tablet, and desktop layouts.",
  },
  {
    icon: ShieldCheck,
    title: "Clean Code",
    desc: "Secure, production-ready code with every prompt.",
  },
  {
    icon: LayoutGrid,
    title: "Rapid Iteration",
    desc: "Go from idea to launch in minutes.",
  },
  {
    icon: MousePointerClick,
    title: "Cinematic Promos",
    desc: "Generate high-end video ads for your app.",
  },
  {
    icon: ImagePlus,
    title: "Visual Assets",
    desc: "Create custom logos and brand icons instantly.",
  },
  {
    icon: MonitorDown,
    title: "Full Export",
    desc: "Download and own your clean React Code.",
  },
];

export default function LogoipsumPage() {
  const [prompt, setPrompt] = useState("");

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#08080F", color: "white", fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
            <defs>
              <linearGradient id="triGrad" x1="0" y1="0" x2="28" y2="26">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
            </defs>
            <polygon points="14,1 27,25 1,25" fill="url(#triGrad)" />
          </svg>
          <span className="font-bold text-[17px] text-white tracking-tight">Logoipsum</span>
        </div>

        {/* Centre nav links — pill container */}
        <div
          className="hidden md:flex items-center gap-0.5 px-2 py-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              href="#"
              className="px-4 py-1.5 text-[13px] text-slate-400 hover:text-white rounded-full transition-colors hover:bg-white/5"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-5">
          <Link href="#" className="text-[13px] text-slate-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link
            href="#"
            className="px-5 py-2 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#7C3AED" }}
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center px-6 pt-14 pb-0">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 text-[13px] text-slate-400"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
          New: Where high-end design meets high-speed code.
        </div>

        {/* Headline */}
        <h1
          className="font-black leading-[1.05] tracking-tight text-white mb-5"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.25rem)" }}
        >
          Describe it. Build it. Launch it.
        </h1>

        {/* Sub-headline */}
        <p
          className="max-w-xl text-slate-400 leading-relaxed mb-12"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
        >
          An AI engine that turns plain English into full web apps, assets, and cinematic promos in
          seconds.
        </p>

        {/* Prompt box */}
        <div
          className="w-full max-w-2xl rounded-3xl px-7 pt-7 pb-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Logoipsum to build your saas startup."
            className="w-full bg-transparent text-white placeholder-slate-600 text-[15px] outline-none mb-6"
          />
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1.5 text-[13px] text-violet-400 hover:text-violet-300 transition-colors font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Enhance my prompt
            </button>
            <button
              className="px-7 py-2.5 rounded-xl text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "#7C3AED" }}
            >
              Generate
            </button>
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <div
        className="mt-20 border-t flex-1"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto w-full">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => {
            const isLastInRow = (i + 1) % 4 === 0;
            const isInTopRow = i < 4;
            return (
              <div
                key={title}
                className="flex flex-col gap-4 px-8 py-10"
                style={{
                  borderRight: !isLastInRow ? "1px solid rgba(255,255,255,0.07)" : "none",
                  borderBottom: isInTopRow ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <Icon className="w-7 h-7 text-slate-500" strokeWidth={1.4} />
                <div>
                  <h3 className="text-white font-semibold text-[13px] mb-1.5">{title}</h3>
                  <p className="text-slate-600 text-[12px] leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
