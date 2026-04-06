import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { LinkedInAdsServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("linkedin-ads-services", {
    title: "LinkedIn Ads Services | Top SEO Services",
    description: "Generate B2B leads with highly effective LinkedIn advertising.",
  });
}

export default async function LinkedInAdsServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="linkedin-ads-services" />
      <LinkedInAdsServicesPageClient />
    </>
  );
}
