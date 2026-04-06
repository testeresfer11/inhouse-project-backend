import Link from "next/link";
import { MapPin, Phone, Mail, Twitter, Linkedin, Instagram, Youtube, Facebook } from "lucide-react";
import { BrandLogo } from "./Navbar";

const SOCIAL = [
  { Icon: Facebook,  href: "#" },
  { Icon: Twitter,   href: "#" },
  { Icon: Linkedin,  href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Youtube,   href: "#" },
];

const OUR_COMPANY = [
  { label: "About",              href: "/about" },
  { label: "Privacy Policy",     href: "/" },
  { label: "Terms & Conditions", href: "/" },
];

const WHITE_LABEL = [
  "Search Engine Marketing (SEO)",
  "Social Media Marketing (SMO)",
  "Paid Advertising (PPC)",
  "Digital Marketing",
  "Content Writing",
  "Email Marketing",
];

const SERVICES_LIST = [
  "On-Page SEO",
  "Off-Page SEO",
  "Technical SEO",
  "Social Media Marketing",
  "PPC Advertising",
  "Digital Marketing",
  "Content Writing",
  "Email Marketing",
];

export function Footer() {
  return (
    <footer style={{ background: "#1B2235" }} className="pt-16 pb-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-5 w-fit">
              <BrandLogo dark />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              TopSEO is a results-driven digital marketing agency specializing in SEO, PPC, social media, content writing, and email marketing. We help businesses of all sizes grow their online presence through data-driven strategies, innovative campaigns, and transparent reporting that delivers measurable ROI.
            </p>
            <div className="flex gap-2 flex-wrap">
              {SOCIAL.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-purple-600" style={{ background: "#2A3550" }}>
                  <Icon className="w-4 h-4 text-slate-300" />
                </a>
              ))}
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-slate-300 text-sm font-black hover:bg-purple-600" style={{ background: "#2A3550" }}>P</a>
            </div>
          </div>

          {/* Our Company */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm">Our Company</h4>
            <ul className="space-y-3">
              {OUR_COMPANY.map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-slate-400 hover:text-white text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* White Label */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm">White Label Services</h4>
            <ul className="space-y-3">
              {WHITE_LABEL.map(item => (
                <li key={item}><Link href="/services" className="text-slate-400 hover:text-white text-sm transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm">Our Services</h4>
            <ul className="space-y-3">
              {SERVICES_LIST.map(item => (
                <li key={item}><Link href="/services" className="text-slate-400 hover:text-white text-sm transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact + Map */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm">Contact Us</h4>
            <ul className="space-y-4 mb-5">
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" />
                <span>1178 Broadway, 3rd Floor #1136, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-purple-400" />
                <a href="tel:+12125551234" className="hover:text-white transition-colors">+1 (212) 555-1234</a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-purple-400" />
                <a href="mailto:info@topseoservices.co" className="hover:text-white transition-colors">info@topseoservices.co</a>
              </li>
            </ul>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                title="Office location"
                width="100%"
                height="110"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215255736735!2d-73.98784068459387!3d40.74844097932774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a3f81d549f%3A0xb49cafb82537f1a7!2s1178%20Broadway%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs">&copy; Top SEO Services @ 2026 All Rights Reserved</p>
          <div className="flex gap-5 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
            <Link href="/" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
