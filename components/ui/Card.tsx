import type { ReactNode } from "react";

type Variant = "elevated" | "outlined" | "flat";

interface CardProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  elevated: "bg-white shadow-lg",
  outlined: "bg-white border border-warm",
  flat: "bg-white/50",
};

export function Card({
  variant = "elevated",
  className = "",
  children,
}: CardProps) {
  return (
    <div className={`rounded-card overflow-hidden ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function CardImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-video overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
