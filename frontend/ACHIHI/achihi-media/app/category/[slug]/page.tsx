import type { Metadata } from "next";
import { CATEGORIES, getArticlesByCategory } from "@/lib/mock-data";
import type { Category } from "@/lib/mock-data";
import CategoryFeed from "./CategoryFeed";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${cat} News`,
    description: `Latest ${cat} news and stories from ACHIHI Media`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categoryName = (slug.charAt(0).toUpperCase() + slug.slice(1)) as Category;
  const articles = getArticlesByCategory(categoryName);

  return <CategoryFeed category={categoryName} initialArticles={articles} />;
}
