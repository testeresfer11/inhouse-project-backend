import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { GeoPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("geo", {
    title: "Generative Engine Optimization (GEO) | Top SEO Services",
    description: "Optimize your content for generative AI search engines like ChatGPT and Gemini.",
  });
}

export default async function GeoPage() {
  return (
    <>
      <SeoJsonLd pageKey="geo" />
      <GeoPageClient />
    </>
  );
}
