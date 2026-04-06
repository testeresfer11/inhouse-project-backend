import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "Top SEO Services",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Site Logo",
    },
    {
      name: "defaultMetaTitle",
      type: "text",
      label: "Default Meta Title",
      admin: {
        description: "Used when a page does not have its own meta title",
      },
    },
    {
      name: "defaultMetaDescription",
      type: "textarea",
      label: "Default Meta Description",
    },
    {
      name: "contactInfo",
      type: "group",
      label: "Contact Information",
      fields: [
        { name: "email", type: "email" },
        { name: "phone", type: "text" },
        { name: "address", type: "textarea" },
      ],
    },
    {
      name: "socialLinks",
      type: "group",
      label: "Social Media Links",
      fields: [
        { name: "twitter", type: "text", label: "Twitter / X" },
        { name: "facebook", type: "text", label: "Facebook" },
        { name: "linkedin", type: "text", label: "LinkedIn" },
        { name: "instagram", type: "text", label: "Instagram" },
        { name: "youtube", type: "text", label: "YouTube" },
      ],
    },
    {
      name: "organizationSchema",
      type: "group",
      label: "Organization Schema (JSON-LD)",
      fields: [
        { name: "name", type: "text", label: "Organization Name" },
        { name: "url", type: "text", label: "Website URL" },
        { name: "logo", type: "text", label: "Logo URL (absolute)" },
        { name: "foundingYear", type: "number", label: "Founding Year" },
      ],
    },
  ],
};
