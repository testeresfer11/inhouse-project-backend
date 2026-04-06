import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CheckCircle2, Globe, Search, ShoppingBag, Terminal, Link as LinkIcon, PenTool } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("services", {
    title: "SEO Services — Enterprise, Local, eCommerce & Technical SEO",
    description: "Explore our full range of SEO services: Enterprise SEO, Local SEO, eCommerce SEO, Technical Audits, Authority Link Building and Content Strategy.",
  });
}

const SERVICES_DETAILED = [
  { id: "enterprise-seo",  title: "Enterprise SEO",         icon: Globe,     color: "#6C5CE7",
    description: "Complex organizations require scalable SEO frameworks. We build robust architectures and processes to manage millions of pages and dominate massive, competitive search landscapes.",
    features: ["Massive site crawling & indexation","Programmatic SEO execution","Multi-regional & international strategy","Enterprise CMS migration support"] },
  { id: "local-seo",       title: "Local SEO",              icon: Search,    color: "#00CEC9",
    description: "Dominate the local map pack and localized organic results. We optimize your physical locations to capture high-intent buyers exactly when they're searching nearby.",
    features: ["Google Business Profile optimization","Hyper-local content creation","Citation building & management","Review & reputation strategy"] },
  { id: "ecommerce-seo",   title: "eCommerce SEO",          icon: ShoppingBag, color: "#2563EB",
    description: "Turn your product pages into revenue engines. We optimize category architecture, faceted navigation, and product details to outrank Amazon and industry giants.",
    features: ["Faceted navigation control","Product schema markup","Category architecture mapping","Out-of-stock product strategies"] },
  { id: "technical-seo",   title: "Technical SEO Audits",   icon: Terminal,  color: "#E53E3E",
    description: "The foundation of all rankings. We dissect your site's code, server logs, and architecture to eliminate roadblocks that prevent search engines from understanding your value.",
    features: ["Core Web Vitals optimization","JavaScript rendering SEO","Crawl budget optimization","Log file analysis"] },
  { id: "link-building",   title: "Authority Link Building", icon: LinkIcon, color: "#F59E0B",
    description: "Earn links that your competitors can't buy. We use digital PR and relationship-based outreach to secure contextual placements on the world's most trusted publications.",
    features: ["Digital PR campaigns","Data-driven asset creation","Unlinked brand mentions","Broken link building"] },
  { id: "content",         title: "Content Marketing",      icon: PenTool,   color: "#10B981",
    description: "Content that ranks, educates, and converts. We map the entire buyer's journey and create comprehensive assets that capture traffic at every stage of the funnel.",
    features: ["Topic cluster modeling","Content gap analysis","Subject matter expert interviews","On-page optimization"] },
];

export default async function ServicesPage() {
  return (
    <>
    <div className="min-h-screen bg-white">
      <PageHeader
        badge="Our Capabilities"
        title="Engineering Unfair Search Advantages"
        description="We don't offer generic packages. We deploy highly specialized, technical SEO strategies designed specifically for your growth stage and industry."
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {SERVICES_DETAILED.map((service, idx) => (
              <div key={service.id} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${service.color}15` }}>
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">{service.title}</h2>
                  <p className="text-lg text-slate-500 mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-4 mb-10">
                    {service.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: service.color }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <button className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90" style={{ background: service.color }}>
                      Discuss this service
                    </button>
                  </Link>
                </div>
                <div className={`relative ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="absolute inset-0 rounded-3xl blur-2xl opacity-10" style={{ background: service.color }} />
                  <div className="relative z-10 bg-slate-50 border border-slate-200 rounded-3xl p-8 aspect-square flex items-center justify-center shadow-sm">
                    <service.icon className="w-48 h-48" style={{ color: `${service.color}25` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #6C5CE7 0%, #00CEC9 100%)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to start ranking?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Book a free strategy call and we&apos;ll show you exactly how we&apos;d grow your organic traffic.</p>
          <Link href="/contact">
            <button className="px-8 py-4 rounded-xl bg-white font-bold text-base shadow-xl hover:bg-blue-50 transition-all" style={{ color: "#6C5CE7" }}>
              Book Free Consultation
            </button>
          </Link>
        </div>
      </section>
    </div>
      <SeoJsonLd pageKey="services" />
    </>
  );
}
