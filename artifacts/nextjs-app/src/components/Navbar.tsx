"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

const SERVICES_MENU = [
  {
    category: "Search Engine Optimization (SEO)",
    href: "/services/seo",
    items: [
      { label: "Search Engine Optimization Services", href: "/services/seo" },
      { label: "On-Page SEO",                         href: "/services/on-page-seo" },
      { label: "Off-Page SEO",                        href: "/services/off-page-seo" },
      { label: "Technical SEO",                       href: "/services/technical-seo" },
      { label: "AI-Powered SEO",                      href: "/services/ai-powered-seo" },
      { label: "Local SEO",                           href: "/services/local-seo" },
      { label: "Domain Authority Services",           href: "/services/domain-authority" },
      { label: "GEO (Generative Engine Optimization)",href: "/services/geo" },
      { label: "AEO (Answer Engine Optimization)",    href: "/services/aeo" },
      { label: "SEO Audit",                           href: "/services/seo-audit" },
    ],
  },
  {
    category: "Social Media Marketing (SMM)",
    href: "/services/social-media-marketing",
    items: [
      { label: "Social Media Marketing Services", href: "/services/social-media-marketing" },
      { label: "Instagram Marketing Services",    href: "/services/instagram-marketing" },
      { label: "Facebook Marketing Services",     href: "/services/facebook-marketing" },
      { label: "LinkedIn Marketing Services",     href: "/services/linkedin-marketing" },
      { label: "YouTube Marketing Services",      href: "/services/youtube-marketing" },
      { label: "Quora Marketing Services",        href: "/services/quora-marketing" },
      { label: "Pinterest Marketing Services",    href: "/services/pinterest-marketing" },
      { label: "Twitter (X) Marketing Services",  href: "/services/twitter-marketing" },
      { label: "TikTok Marketing Services",       href: "/services/tiktok-marketing" },
    ],
  },
  {
    category: "Paid Advertising (PPC)",
    href: "/services/pay-per-click-marketing",
    items: [
      { label: "Pay-Per-Click Marketing Services", href: "/services/pay-per-click-marketing" },
      { label: "Google Ads Services",              href: "/services/google-ads-services" },
      { label: "Facebook Ads Services",            href: "/services/facebook-ads-services" },
      { label: "Instagram Ads Services",           href: "/services/instagram-ads-services" },
      { label: "LinkedIn Ads Services",            href: "/services/linkedin-ads-services" },
      { label: "YouTube Ads Services",             href: "/services/youtube-ads-services" },
      { label: "Amazon Ads Services",              href: "/services/amazon-ads-services" },
    ],
  },
  {
    category: "Content Writing Services",
    href: "/services/content-writing-services",
    items: [],
  },
  {
    category: "Email Marketing Services",
    href: "/services/email-marketing-services",
    items: [],
  },
  {
    category: "Digital Marketing Services",
    href: "/services/digital-marketing-services",
    items: [],
  },
];

const NAV_LINKS = [
  { label: "Home",       href: "/",          dropdown: false },
  { label: "About",      href: "/about",      dropdown: false },
  { label: "Services",   href: "/services",   dropdown: true  },
  { label: "Industries", href: "/industries", dropdown: false },
  { label: "Contact Us", href: "/contact",    dropdown: false },
];

export function BrandLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`select-none flex items-center ${dark ? "bg-white rounded-xl px-2 py-1" : ""}`}>
      <img src="/logo.jpg" alt="Top SEO Services" className="h-12 w-auto object-contain" />
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200"
      style={{ boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none" }}
    >
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <BrandLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href, dropdown }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));

            if (dropdown) {
              return (
                <div
                  key={href}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className="flex items-center gap-0.5 text-sm font-medium transition-colors duration-200 hover:text-gray-900"
                    style={{ color: active ? "#2563EB" : "#374151" }}
                  >
                    {label}
                    <ChevronDown
                      className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200"
                      style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <m.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-2xl overflow-hidden"
                        style={{
                          width: "680px",
                          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                          border: "1px solid #E2E8F0",
                          background: "white",
                        }}
                        onMouseEnter={openDropdown}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="flex">
                          {/* Left — category list */}
                          <div className="w-[260px] flex-shrink-0 py-2" style={{ background: "#F8FAFC", borderRight: "1px solid #E2E8F0" }}>
                            {SERVICES_MENU.map((svc, i) => {
                              const catStyle = {
                                background: activeCat === i ? "#EFF6FF" : "transparent",
                                color: activeCat === i ? "#2563EB" : "#374151",
                                fontWeight: activeCat === i ? 600 : 400,
                              };
                              const catClass = "w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-all duration-150";
                              const catContent = (
                                <>
                                  <span>{svc.category}</span>
                                  {svc.items.length > 0 && (
                                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeCat === i ? "#2563EB" : "#94A3B8" }} />
                                  )}
                                </>
                              );
                              return svc.items.length === 0 ? (
                                <Link
                                  key={svc.category}
                                  href={svc.href}
                                  onMouseEnter={() => setActiveCat(i)}
                                  onClick={() => setServicesOpen(false)}
                                  className={catClass}
                                  style={catStyle}
                                >
                                  {catContent}
                                </Link>
                              ) : (
                                <button
                                  key={svc.category}
                                  onMouseEnter={() => setActiveCat(i)}
                                  onClick={() => setServicesOpen(false)}
                                  className={catClass}
                                  style={catStyle}
                                >
                                  {catContent}
                                </button>
                              );
                            })}
                          </div>

                          {/* Right — sub-items */}
                          <div className="flex-1 py-3 px-2">
                            {SERVICES_MENU[activeCat].items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setServicesOpen(false)}
                                className="block px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-0.5 text-sm font-medium transition-colors duration-200 hover:text-gray-900"
                style={{ color: active ? "#2563EB" : "#374151" }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact">
            <button
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "#F97316" }}
            >
              Get Free Audit
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute left-0 right-0 top-16 bg-white border-b border-slate-200 shadow-lg max-h-[80vh] overflow-y-auto"
          >
            <nav className="flex flex-col px-5 py-4 gap-1">
              {NAV_LINKS.map(({ label, href, dropdown }) => {
                const active = pathname === href || (href !== "/" && pathname.startsWith(href));
                if (dropdown) {
                  return (
                    <div key={href}>
                      <Link
                        href={href}
                        className="flex items-center gap-1 py-2.5 text-sm font-semibold border-b border-slate-100"
                        style={{ color: active ? "#2563EB" : "#374151" }}
                      >
                        {label} <ChevronDown className="w-3.5 h-3.5" />
                      </Link>
                      <div className="pl-3 pb-1">
                        {SERVICES_MENU.map((svc) => (
                          <div key={svc.category} className="py-1.5">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{svc.category}</p>
                            {svc.items.slice(0, 3).map((item) => (
                              <Link key={item.label} href={item.href} className="block py-1 text-sm text-slate-600">
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-1 py-2.5 text-sm font-semibold border-b border-slate-100 last:border-0"
                    style={{ color: active ? "#2563EB" : "#374151" }}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link href="/contact" className="mt-3">
                <button
                  className="w-full py-2.5 rounded-lg text-sm font-bold text-white"
                  style={{ background: "#F97316" }}
                >
                  Get Free Audit
                </button>
              </Link>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
