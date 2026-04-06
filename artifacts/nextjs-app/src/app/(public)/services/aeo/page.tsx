import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { AeoPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("aeo", {
    title: "Answer Engine Optimization (AEO) | Top SEO Services",
    description: "Optimize for AI-driven answer engines and featured snippets.",
  });
}

export default async function AeoPage() {
  return (
    <>
      <SeoJsonLd pageKey="aeo" />
      <AeoPageClient />
    </>
  );
}
