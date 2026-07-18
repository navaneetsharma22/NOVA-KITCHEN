import { journalArticles } from "@/data/journal";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { RelatedJournalArticles } from "@/components/blog/RelatedJournalArticles";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { CTASection } from "@/components/sections/cta/CTASection";

export async function generateStaticParams() {
  return journalArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Extract headings for TOC
  const headings = article.content
    ? article.content.filter(block => block.type === "heading").map(h => ({ id: h.id, text: h.text }))
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <ReadingProgress />
      
      <ArticleHero article={article} />

      <div className="w-full bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            
            {/* Left Sidebar (Table of Contents) */}
            <aside className="hidden lg:block w-[300px] flex-shrink-0">
              <TableOfContents headings={headings} />
            </aside>

            {/* Main Reading Column */}
            <main className="flex-1 w-full max-w-[800px]">
              <ArticleContent content={article.content} />
            </main>

          </div>
        </div>
      </div>

      <BlogNewsletter />
      <RelatedJournalArticles article={article} />
      <CTASection />
    </div>
  );
}
