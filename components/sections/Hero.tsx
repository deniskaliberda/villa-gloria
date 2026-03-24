import Image from "next/image";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image — Server-rendered for fast LCP */}
      <Image
        src="/images/hero/villa-pool-seaview.jpg"
        alt="Villa Gloria al Padre — Pool mit Meerblick"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content — Client component for animations */}
      <HeroContent />
    </section>
  );
}
