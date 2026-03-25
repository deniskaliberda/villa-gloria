"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCSection {
  id: string;
  label: string;
}

interface BlogTableOfContentsProps {
  sections: TOCSection[];
  title?: string;
}

export function BlogTableOfContents({
  sections,
  title = "Inhalt",
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="not-prose my-8 rounded-card border border-sand-300 bg-warm p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between md:pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-50">
            <List className="h-5 w-5 text-terracotta-500" />
          </div>
          <h3 className="font-display text-lg font-bold text-dark">{title}</h3>
        </div>
        <span className="text-dark-light md:hidden">{isOpen ? "−" : "+"}</span>
      </button>

      <ol
        className={`mt-4 space-y-2 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 md:max-h-[1000px] md:opacity-100"
        }`}
      >
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-colors ${
                activeId === section.id
                  ? "bg-terracotta-50 font-semibold text-terracotta-600"
                  : "text-dark-light hover:bg-sand-100 hover:text-dark"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  activeId === section.id
                    ? "bg-terracotta-500 text-white"
                    : "bg-sand-200 text-dark-light"
                }`}
              >
                {index + 1}
              </span>
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
