import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { SeoServicePageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("seo", {
    title: "SEO Services | Top SEO Services",
    description: "Boost organic rankings with expert on-page, off-page, technical SEO and more.",
  });
}

export default async function SeoServicePage() {
  return (
    <>
      <SeoJsonLd pageKey="seo" />
      <SeoServicePageClient />
    </>
  );
}
