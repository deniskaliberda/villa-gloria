import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
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
    openGraph: {
      images: [{ url: "/images/hero/villa-pool-garden.jpg", width: 1200, height: 800, alt: "Villa Gloria al Padre – Blog" }],
    },
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        "x-default": "/de/blog",
        de: "/de/blog",
        en: "/en/blog",
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts();

  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/hero/villa-pool-seaview.jpg"
          alt="Villa Gloria Pool mit Meerblick"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <ScrollReveal>
              <h1 className="font-display text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                Blog
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/90 md:text-xl">
                Tipps und Inspiration für Ihren Istrien-Urlaub
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </main>
  );
}
