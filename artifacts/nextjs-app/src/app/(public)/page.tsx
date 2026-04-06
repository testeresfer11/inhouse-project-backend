import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { HomePageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("home", {
    title: "Top SEO Services — #1 Digital Marketing Agency",
    description: "Gain endless traffic, boost revenue, and improve brand presence with Top SEO Services.",
  });
}

export default async function HomePage() {
  return (
    <>
      <SeoJsonLd pageKey="home" />
      <HomePageClient />
    </>
  );
}
