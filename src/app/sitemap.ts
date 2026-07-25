import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Only public, canonical URLs belong here. The single-page site currently
 * exposes one indexable URL. Placeholder legal pages are intentionally
 * excluded until real policies are published.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
