"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

export function BlogCard({ post, delay = 0 }: BlogCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <Link href={`/blog/${post.slug}`}>
        <Card className="group h-full transition-shadow hover:shadow-xl">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute top-4 left-4 rounded-full bg-terracotta-500 px-3 py-1 font-accent text-xs font-semibold text-white">
              {post.category}
            </span>
          </div>
          <CardContent>
            <h2 className="font-display text-xl font-bold text-dark line-clamp-2 group-hover:text-terracotta-500 transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-dark-light line-clamp-3">
              {post.description}
            </p>
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
          </CardContent>
        </Card>
      </Link>
    </ScrollReveal>
  );
}
