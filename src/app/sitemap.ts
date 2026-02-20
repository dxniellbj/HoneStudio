import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://honestudio.co";

  const staticPages = [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/work`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.8 },
  ];

  const caseStudies = CASE_STUDIES.map((study) => ({
    url: `${base}/work/${study.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...caseStudies];
}
