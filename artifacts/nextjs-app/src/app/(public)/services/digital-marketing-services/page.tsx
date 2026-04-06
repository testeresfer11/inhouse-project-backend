import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { DigitalMarketingServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("digital-marketing-services", {
    title: "Digital Marketing Services | Top SEO Services",
    description: "Comprehensive digital marketing strategies that drive traffic and revenue.",
  });
}

export default async function DigitalMarketingServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="digital-marketing-services" />
      <DigitalMarketingServicesPageClient />
    </>
  );
}
