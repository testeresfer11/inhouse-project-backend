import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://topseoservices.co";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/legacy-admin/",
          "/*.json$",
          "/cdn-cgi/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/legacy-admin/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/legacy-admin/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/blog/", "/services/", "/about", "/industries"],
        disallow: ["/admin/", "/api/", "/legacy-admin/", "/contact"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/blog/", "/services/", "/about", "/industries"],
        disallow: ["/admin/", "/api/", "/legacy-admin/", "/contact"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/blog/", "/services/", "/about", "/industries"],
        disallow: ["/admin/", "/api/", "/legacy-admin/", "/contact"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/blog/", "/services/", "/about", "/industries"],
        disallow: ["/admin/", "/api/", "/legacy-admin/", "/contact"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "Bytespider",
        disallow: ["/"],
      },
      {
        userAgent: "omgili",
        disallow: ["/"],
      },
      {
        userAgent: "omgilibot",
        disallow: ["/"],
      },
      {
        userAgent: "FacebookBot",
        allow: ["/blog/", "/services/", "/about", "/"],
        disallow: ["/admin/", "/api/", "/legacy-admin/"],
      },
      {
        userAgent: "Twitterbot",
        allow: ["/blog/", "/services/", "/about", "/"],
        disallow: ["/admin/", "/api/", "/legacy-admin/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
