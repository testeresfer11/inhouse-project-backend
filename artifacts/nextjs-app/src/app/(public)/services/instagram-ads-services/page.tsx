import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { InstagramAdsServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("instagram-ads-services", {
    title: "Instagram Ads Services | Top SEO Services",
    description: "Captivate audiences with visually stunning Instagram ad campaigns.",
  });
}

export default async function InstagramAdsServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="instagram-ads-services" />
      <InstagramAdsServicesPageClient />
    </>
  );
}
