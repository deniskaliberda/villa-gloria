import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blog" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts();

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-dark-light">
            Tipps und Inspiration für Ihren Istrien-Urlaub
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </main>
  );
}
