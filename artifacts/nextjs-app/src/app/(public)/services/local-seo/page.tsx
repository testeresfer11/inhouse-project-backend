import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { LocalSeoPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("local-seo", {
    title: "Local SEO Services | Top SEO Services",
    description: "Dominate local search results and attract nearby customers with our local SEO strategies.",
  });
}

export default async function LocalSeoPage() {
  return (
    <>
      <SeoJsonLd pageKey="local-seo" />
      <LocalSeoPageClient />
    </>
  );
}
