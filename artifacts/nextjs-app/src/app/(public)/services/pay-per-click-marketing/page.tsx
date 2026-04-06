import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { PPCMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("pay-per-click-marketing", {
    title: "PPC Marketing Services | Top SEO Services",
    description: "Maximize ROI with targeted pay-per-click campaigns on Google, Facebook, and more.",
  });
}

export default async function PPCMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="pay-per-click-marketing" />
      <PPCMarketingPageClient />
    </>
  );
}
