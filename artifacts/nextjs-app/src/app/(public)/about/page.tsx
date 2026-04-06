import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { AboutPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("about", {
    title: "About Top SEO Services | #1 Digital Marketing Agency",
    description: "Learn about Top SEO Services, our mission, team, and proven digital marketing approach.",
  });
}

export default async function AboutPage() {
  return (
    <>
      <SeoJsonLd pageKey="about" />
      <AboutPageClient />
    </>
  );
}
