import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    group: "Content",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "bio",
      type: "textarea",
      label: "Short Bio",
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      label: "Profile Photo",
    },
    {
      name: "role",
      type: "text",
      label: "Job Title / Role",
      admin: {
        description: "e.g. 'Senior SEO Strategist'",
      },
    },
    {
      name: "socialLinks",
      type: "group",
      label: "Social Links",
      fields: [
        { name: "twitter", type: "text", label: "Twitter / X URL" },
        { name: "linkedin", type: "text", label: "LinkedIn URL" },
        { name: "website", type: "text", label: "Personal Website" },
      ],
    },
  ],
};
