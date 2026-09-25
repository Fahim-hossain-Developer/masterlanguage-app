import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const routes = [
    "",
    "/ielts",
    "/ielts/full-mock",
    "/ielts/reading",
    "/ielts/listening",
    "/ielts/writing",
    "/ielts/speaking",
    "/ielts/question-types",
    "/english",
    "/english/basic",
    "/english/elementary",
    "/english/intermediate",
    "/english/upper-intermediate",
    "/english/advanced",
    "/books",
    "/tips",
    "/daily-practice",
    "/search",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
