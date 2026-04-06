import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: { default: "Top SEO Services — #1 Digital Marketing Agency", template: "%s | Top SEO Services" },
  description: "Gain endless traffic, boost revenue, and improve brand presence with Top SEO Services: your trusted digital marketing & SEO partner.",
  metadataBase: new URL("https://topseoservices.co"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
