import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    group: "Blog",
    defaultColumns: ["title", "status", "author", "publishedAt"],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
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
        description: "URL-friendly identifier (e.g. 'how-to-rank-on-google')",
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
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Publish Date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Featured Image",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Excerpt / Meta Description Preview",
      admin: {
        description: "A short summary shown in blog listings and search results.",
      },
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures],
      }),
      label: "Body Content",
      required: true,
    },
    {
      name: "faqs",
      type: "array",
      label: "FAQ Block",
      admin: {
        description: "Frequently asked questions shown at the bottom of the post.",
      },
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      label: "Related Posts",
    },
    {
      name: "seo",
      type: "group",
      label: "SEO Settings",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Title",
          admin: {
            description: "Overrides the post title in search results (recommended: 50-60 chars)",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Description",
          admin: {
            description: "Search result snippet (recommended: 150-160 chars)",
          },
        },
        {
          name: "canonicalUrl",
          type: "text",
          label: "Canonical URL",
          admin: {
            description: "Leave blank to use the default post URL",
          },
        },
        {
          name: "ogTitle",
          type: "text",
          label: "Open Graph Title",
          admin: {
            description: "Title for social media sharing (Facebook, LinkedIn, etc.)",
          },
        },
        {
          name: "ogDescription",
          type: "textarea",
          label: "Open Graph Description",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "Open Graph Image",
          admin: {
            description: "Image shown when sharing on social media (recommended: 1200×630px)",
          },
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
