import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { FacebookAdsServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("facebook-ads-services", {
    title: "Facebook Ads Services | Top SEO Services",
    description: "Grow your business with data-driven Facebook advertising.",
  });
}

export default async function FacebookAdsServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="facebook-ads-services" />
      <FacebookAdsServicesPageClient />
    </>
  );
}
