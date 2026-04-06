import { getPageSeo } from "@/lib/seo";

export async function SeoJsonLd({ pageKey }: { pageKey: string }) {
  const seo = await getPageSeo(pageKey);
  if (!seo?.structuredData) return null;

  let json: string;
  try {
    JSON.parse(seo.structuredData);
    json = seo.structuredData;
  } catch {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
