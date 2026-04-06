import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { GoogleAdsServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("google-ads-services", {
    title: "Google Ads Services | Top SEO Services",
    description: "Drive qualified traffic with expertly managed Google Ads campaigns.",
  });
}

export default async function GoogleAdsServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="google-ads-services" />
      <GoogleAdsServicesPageClient />
    </>
  );
}
