import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { InstagramMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("instagram-marketing", {
    title: "Instagram Marketing Services | Top SEO Services",
    description: "Build a thriving Instagram community and convert followers into loyal customers.",
  });
}

export default async function InstagramMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="instagram-marketing" />
      <InstagramMarketingPageClient />
    </>
  );
}
