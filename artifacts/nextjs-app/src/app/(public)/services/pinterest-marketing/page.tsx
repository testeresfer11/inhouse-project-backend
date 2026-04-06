import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { PinterestMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("pinterest-marketing", {
    title: "Pinterest Marketing Services | Top SEO Services",
    description: "Drive traffic and sales with visually-driven Pinterest marketing.",
  });
}

export default async function PinterestMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="pinterest-marketing" />
      <PinterestMarketingPageClient />
    </>
  );
}
