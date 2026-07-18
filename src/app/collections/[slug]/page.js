import { collectionsDetailed } from "@/data/collectionsDetailed";
import { notFound } from "next/navigation";
import { CollectionHero } from "@/components/collections/CollectionHero";
import { CollectionSpecs } from "@/components/collections/CollectionSpecs";
import { CollectionGallery } from "@/components/collections/CollectionGallery";
import { CollectionMaterials } from "@/components/collections/CollectionMaterials";
import { ConfigurationOptions } from "@/components/collections/ConfigurationOptions";
import { CollectionFAQs } from "@/components/collections/CollectionFAQs";
import { RelatedProjects } from "@/components/collections/RelatedProjects";
import { CTASection } from "@/components/sections/cta/CTASection";

export async function generateStaticParams() {
  return collectionsDetailed.map((collection) => ({
    slug: collection.slug,
  }));
}

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;
  
  const collection = collectionsDetailed.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CollectionHero collection={collection} />
      <CollectionSpecs collection={collection} />
      <ConfigurationOptions collection={collection} />
      <CollectionGallery collection={collection} />
      <CollectionMaterials collection={collection} />
      <CollectionFAQs collection={collection} />
      <RelatedProjects collection={collection} />
      <CTASection />
    </div>
  );
}
