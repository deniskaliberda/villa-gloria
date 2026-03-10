"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface SectionProgressIndicatorProps {
  sections: Section[];
}

export function SectionProgressIndicator({
  sections,
}: SectionProgressIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const viewportCenter = window.scrollY + window.innerHeight * 0.4;

    // Calculate overall page progress
    const firstTop = sectionElements[0].offsetTop;
    const lastEl = sectionElements[sectionElements.length - 1];
    const lastBottom = lastEl.offsetTop + lastEl.offsetHeight;
    const totalHeight = lastBottom - firstTop;
    const scrolled = viewportCenter - firstTop;
    setProgress(Math.max(0, Math.min(1, scrolled / totalHeight)));

    // Find active section
    let currentIndex = 0;
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const el = sectionElements[i];
      if (el.offsetTop <= viewportCenter) {
        currentIndex = i;
        break;
      }
    }
    setActiveIndex(currentIndex);
  }, [sections]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex xl:right-8 2xl:right-12">
      <div className="relative flex flex-col items-center">
        {/* Track line (background) */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-dark/10" />

        {/* Progress line (filled) */}
        <motion.div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top bg-terracotta-400"
          style={{ height: "100%" }}
          animate={{ scaleY: progress }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        {/* Section dots */}
        <div className="relative flex flex-col gap-8">
          {sections.map((section, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={section.id}
                className="group relative flex items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Label (appears on hover, positioned to the left) */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.button
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => scrollToSection(section.id)}
                      className={`absolute right-8 whitespace-nowrap rounded-md px-3 py-1.5 font-accent text-xs font-semibold tracking-wide transition-colors ${
                        isActive
                          ? "bg-terracotta-500 text-white"
                          : "bg-white text-dark-light shadow-sm ring-1 ring-dark/5 hover:text-terracotta-600"
                      }`}
                    >
                      {section.label}
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="relative flex h-5 w-5 items-center justify-center"
                  aria-label={section.label}
                >
                  {/* Outer ring for active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeRing"
                      className="absolute h-5 w-5 rounded-full border-2 border-terracotta-400"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}

                  {/* Inner dot */}
                  <motion.div
                    className={`relative z-10 rounded-full transition-colors duration-300 ${
                      isActive
                        ? "h-2.5 w-2.5 bg-terracotta-500"
                        : isPast
                          ? "h-2 w-2 bg-terracotta-300"
                          : "h-2 w-2 bg-dark/20 group-hover:bg-dark/40"
                    }`}
                    animate={{
                      scale: isActive ? 1 : isHovered ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
