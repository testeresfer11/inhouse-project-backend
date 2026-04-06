import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const ServicePages: CollectionConfig = {
  slug: "service-pages",
  admin: {
    useAsTitle: "title",
    group: "Content",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Used in the URL: /services/[slug]",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "headline",
          type: "text",
          label: "Hero Headline",
        },
        {
          name: "subheadline",
          type: "textarea",
          label: "Hero Subheadline",
        },
        {
          name: "ctaText",
          type: "text",
          label: "CTA Button Text",
        },
        {
          name: "ctaUrl",
          type: "text",
          label: "CTA Button URL",
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          label: "Hero Background Image",
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures],
      }),
      label: "Page Content",
    },
    {
      name: "faqs",
      type: "array",
      label: "FAQ Block",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "SEO Settings",
      fields: [
        { name: "metaTitle", type: "text", label: "Meta Title" },
        { name: "metaDescription", type: "textarea", label: "Meta Description" },
        { name: "canonicalUrl", type: "text", label: "Canonical URL" },
        { name: "ogTitle", type: "text", label: "Open Graph Title" },
        { name: "ogDescription", type: "textarea", label: "Open Graph Description" },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "Open Graph Image",
        },
        {
          name: "noIndex",
          type: "checkbox",
          label: "Hide from search engines (noindex)",
          defaultValue: false,
        },
      ],
    },
  ],
};
