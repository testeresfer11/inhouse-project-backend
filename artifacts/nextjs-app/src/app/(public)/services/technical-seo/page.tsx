import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { TechnicalSeoPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("technical-seo", {
    title: "Technical SEO Services | Top SEO Services",
    description: "Fix crawl issues, improve site speed, and optimize your technical foundation.",
  });
}

export default async function TechnicalSeoPage() {
  return (
    <>
      <SeoJsonLd pageKey="technical-seo" />
      <TechnicalSeoPageClient />
    </>
  );
}
