import type { ReactNode } from "react";

type Variant =
  | "terracotta"
  | "olive"
  | "adriatic"
  | "gray"
  | "green"
  | "yellow"
  | "red";

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  terracotta: "bg-terracotta-100 text-terracotta-700",
  olive: "bg-olive-100 text-olive-700",
  adriatic: "bg-adriatic-100 text-adriatic-700",
  gray: "bg-gray-100 text-gray-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
};

export function Badge({ variant = "terracotta", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
