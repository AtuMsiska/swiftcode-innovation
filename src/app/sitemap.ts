import type { MetadataRoute } from "next";
import { site, projects } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "", "/about", "/innovation-lab", "/solutions", "/services",
    "/industries", "/case-studies", "/insights", "/careers", "/contact",
    "/privacy", "/popia", "/paia", "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const caseStudies: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/case-studies/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudies];
}
