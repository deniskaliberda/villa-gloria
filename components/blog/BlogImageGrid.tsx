"use client";

import Image from "next/image";

interface BlogImageGridProps {
  images: Array<{ src: string; alt: string; caption?: string }>;
  columns?: 1 | 2 | 3;
}

export function BlogImageGrid({ images, columns = 2 }: BlogImageGridProps) {
  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={`not-prose my-8 grid gap-4 ${colClass}`}>
      {images.map((image, index) => (
        <figure key={index} className="overflow-hidden rounded-card shadow-lg">
          <div className="relative aspect-[4/3]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes={
                columns === 1
                  ? "100vw"
                  : columns === 3
                    ? "(max-width: 768px) 100vw, 33vw"
                    : "(max-width: 768px) 100vw, 50vw"
              }
            />
          </div>
          {image.caption && (
            <figcaption className="bg-white px-4 py-2 text-center text-sm text-dark-light">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
