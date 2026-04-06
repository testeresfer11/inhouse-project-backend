"use client";

import React, { useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle, ArrowRight } from "lucide-react";

const INFO_CARDS = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["1178 Broadway, 3rd Floor #3685", "New York, NY 10001", "United States"],
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+1 307 2220 456"],
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["business@topseoservices.co"],
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Fri: 9:00 AM – 6:00 PM", "Sat – Sun: Closed"],
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
  },
];

const CONTACTS = [
  { label: "Request a Quote",                     email: "business@topseoservices.co" },
  { label: "Partners Enquires",                   email: "partners@topseoservices.co" },
  { label: "Reference Checks /Misc. HR Enquires", email: "hr@topseoservices.co" },
  { label: "Other Enquires",                      email: "info@topseoservices.co" },
];

export function ContactPageClient() {
  const [cardHovered, setCardHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24"
        style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #eef2fb 60%, #f8f9ff 100%)" }}
      >
        {/* blobs */}
        <m.div
          className="absolute top-0 left-[15%] w-72 h-72 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "#bfdbfe", opacity: 0.4 }}
          animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute bottom-0 right-[15%] w-64 h-64 rounded-full blur-[110px] pointer-events-none"
          style={{ background: "#c7d2fe", opacity: 0.3 }}
          animate={{ y: [0, 16, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-2xl">

          <m.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <span
              className="inline-flex items-center px-5 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}
            >
              Get In Touch
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 text-slate-900"
          >
            Let&apos;s Build Your
            <br />
            <span style={{ color: "#2563EB" }}>Digital Success</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Have a project in mind? Our team of SEO and digital marketing experts is
            ready to help you achieve measurable growth. Reach out today.
          </m.p>

        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INFO_CARDS.map(({ icon: Icon, title, lines, iconBg, iconColor }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.45 }}
                whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(37,99,235,0.1)" }}
                onHoverStart={() => setCardHovered(i)}
                onHoverEnd={() => setCardHovered(null)}
                className="rounded-2xl border p-6 flex flex-col items-center text-center cursor-default"
                style={{
                  borderColor: cardHovered === i ? "#BFDBFE" : "#E2E8F0",
                  background: cardHovered === i ? "#F8FBFF" : "white",
                  transition: "background 0.25s ease, border-color 0.25s ease",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: iconBg }}
                >
                  <Icon className="w-5 h-5" style={{ color: iconColor }} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
                {lines.map((line, li) => (
                  <p key={li} className="text-slate-500 text-sm leading-relaxed">{line}</p>
                ))}
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LET'S GET STARTED ── */}
      <section className="py-20 bg-slate-50">
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
                  type="text" placeholder="Your Name*"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white"
                />
                <input
                  type="email" placeholder="Business Email*"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white"
                />
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-3 border border-slate-200 rounded-xl text-sm text-slate-600 bg-white flex-shrink-0 cursor-pointer">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>US +1</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                  <input
                    type="tel" placeholder="Phone Number *"
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
                  rows={4} placeholder="Tell us about your project*"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors bg-white resize-none"
                />
                <m.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ background: "#2563EB" }}
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
              style={{ background: "#E53E3E", minHeight: "460px" }}
            >
              <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="absolute top-10 right-10 w-28 h-28 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-black text-white mb-2">
                  Hate Filling out Forms?
                </h3>
                <a href="mailto:business@topseoservices.co" className="text-white text-sm underline underline-offset-2 mb-6 inline-block hover:opacity-80 transition-opacity">
                  Email us.
                </a>
                <div className="mt-4 space-y-0 divide-y divide-white/10">
                  {CONTACTS.map(({ label, email }) => (
                    <div key={label} className="flex items-start gap-3 py-4">
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

    </div>
  );
}
