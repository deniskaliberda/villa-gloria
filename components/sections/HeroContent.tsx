"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroContent() {
  const t = useTranslations("home.hero");
  const tNav = useTranslations("nav");

  return (
    <>
      <div className="relative z-10 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl font-bold text-white sm:text-5xl md:text-7xl lg:text-8xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 font-accent text-xl text-warm/90 md:text-2xl"
        >
          {t("subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10"
        >
          <Link href="/buchen">
            <Button size="lg">{tNav("bookNow")}</Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-10 w-6 rounded-full border-2 border-white/50"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mx-auto mt-2 h-2 w-1 rounded-full bg-white/70"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
