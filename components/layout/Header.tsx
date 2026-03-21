"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/das-haus", key: "house" },
  { href: "/galerie", key: "gallery" },
  { href: "/buchen", key: "book" },
  { href: "/umgebung", key: "surroundings" },
  { href: "/bewertungen", key: "reviews" },
  { href: "/blog", key: "blog" },
  { href: "/kontakt", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // On subpages: always solid white header
  // On homepage: transparent initially, solid after scroll
  const isSolid = !isHomePage || isScrolled;

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? "bg-white/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="z-10">
          <span
            className={`font-display text-2xl font-bold transition-colors md:text-3xl ${
              isSolid ? "text-dark" : "text-white"
            }`}
          >
            Villa Gloria <span className="font-normal italic">al Padre</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`font-accent text-sm font-semibold transition-colors hover:text-terracotta-500 ${
                isSolid ? "text-dark" : "text-white"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Right side: Language + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher isScrolled={isSolid} />
          <Link href="/buchen">
            <Button size="sm">{t("bookNow")}</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`z-50 lg:hidden ${
            isMobileMenuOpen || isSolid ? "text-dark" : "text-white"
          }`}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white pt-safe lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl font-bold text-dark transition-colors hover:text-terracotta-500"
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="mt-4">
                <LanguageSwitcher isScrolled={true} />
              </div>
              <Link href="/buchen" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="lg">{t("bookNow")}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
