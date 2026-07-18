import { collectionsDetailed } from "@/data/collectionsDetailed";
import { projects } from "@/data/projects";
import { journalArticles } from "@/data/journal";

export default function sitemap() {
  const baseUrl = "http://localhost:3000"; // Replace with production URL

  // Static Routes
  const staticRoutes = ["", "/about", "/collections", "/projects", "/blog", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Collection Routes
  const collectionRoutes = collectionsDetailed.map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic Project Routes
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic Blog Routes
  const blogRoutes = journalArticles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...projectRoutes, ...blogRoutes];
}
