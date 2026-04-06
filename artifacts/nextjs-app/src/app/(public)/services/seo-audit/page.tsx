import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { SeoAuditPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("seo-audit", {
    title: "SEO Audit Services | Top SEO Services",
    description: "Comprehensive SEO audits identifying technical issues, content gaps, and growth opportunities.",
  });
}

export default async function SeoAuditPage() {
  return (
    <>
      <SeoJsonLd pageKey="seo-audit" />
      <SeoAuditPageClient />
    </>
  );
}
