"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlogCTA } from "./BlogCTA";
import { BlogCard } from "./BlogCard";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import type { ReactNode } from "react";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  localizedTitle?: string;
  children: ReactNode;
}

export function BlogArticle({
  post,
  relatedPosts,
  localizedTitle,
  children,
}: BlogArticleProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.villa-gloria-istrien.de/de",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.villa-gloria-istrien.de/de/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: localizedTitle || post.title,
        item: `https://www.villa-gloria-istrien.de/de/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-4 pb-8 md:pb-12">
            <span className="inline-block rounded-full bg-terracotta-500 px-3 py-1 font-accent text-xs font-semibold text-white">
              {post.category}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {localizedTitle || post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb + Meta */}
      <div className="mx-auto max-w-4xl px-4 pt-8">
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-sm text-dark-light">
            <Link
              href="/"
              className="hover:text-terracotta-500 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/blog"
              className="hover:text-terracotta-500 transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-dark line-clamp-1">{post.title}</span>
          </nav>

          <div className="mt-4 flex items-center gap-4 text-sm text-dark-light">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("de-DE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-4 py-12">
        <ScrollReveal>
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-dark prose-h2:mt-12 prose-h2:mb-4 prose-p:text-dark-light prose-a:text-terracotta-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-dark prose-li:text-dark-light [&>h2]:after:mt-3 [&>h2]:after:block [&>h2]:after:h-0.5 [&>h2]:after:w-16 [&>h2]:after:bg-terracotta-300 [&>h2]:after:content-['']">
            {children}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <BlogCTA />
        </ScrollReveal>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-warm py-16">
          <div className="mx-auto max-w-7xl px-4">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-dark text-center">
                Weitere Artikel
              </h2>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related, index) => (
                <BlogCard
                  key={related.slug}
                  post={related}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
