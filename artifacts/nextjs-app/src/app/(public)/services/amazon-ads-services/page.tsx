import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { AmazonAdsServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("amazon-ads-services", {
    title: "Amazon Ads Services | Top SEO Services",
    description: "Boost product visibility and sales on Amazon with sponsored ad campaigns.",
  });
}

export default async function AmazonAdsServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="amazon-ads-services" />
      <AmazonAdsServicesPageClient />
    </>
  );
}
