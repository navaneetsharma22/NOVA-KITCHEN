export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/private/"],
    },
    sitemap: "http://localhost:3000/sitemap.xml", // Replace with production URL
  };
}
