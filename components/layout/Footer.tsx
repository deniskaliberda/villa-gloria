import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tLegal = useTranslations("legal");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-warm/80">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="font-accent text-sm font-semibold uppercase tracking-wider text-warm">
              {t("quickLinks")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/das-haus"
                  className="transition-colors hover:text-terracotta-400"
                >
                  {tNav("house")}
                </Link>
              </li>
              <li>
                <Link
                  href="/galerie"
                  className="transition-colors hover:text-terracotta-400"
                >
                  {tNav("gallery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/buchen"
                  className="transition-colors hover:text-terracotta-400"
                >
                  {tNav("book")}
                </Link>
              </li>
              <li>
                <Link
                  href="/umgebung"
                  className="transition-colors hover:text-terracotta-400"
                >
                  {tNav("surroundings")}
                </Link>
              </li>
              <li>
                <Link
                  href="/bewertungen"
                  className="transition-colors hover:text-terracotta-400"
                >
                  {tNav("reviews")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-accent text-sm font-semibold uppercase tracking-wider text-warm">
              {t("contactInfo")}
            </h3>
            <div className="mt-4 space-y-3">
              <p>Villa Gloria al Padre</p>
              <p>Kaštelir, Istrien</p>
              <p>Kroatien</p>
              <Link
                href="/kontakt"
                className="mt-2 inline-block text-terracotta-400 transition-colors hover:text-terracotta-300"
              >
                {tNav("contact")} →
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-accent text-sm font-semibold uppercase tracking-wider text-warm">
              {t("legalLinks")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/impressum"
                  className="transition-colors hover:text-terracotta-400"
                >
                  {tLegal("imprint")}
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="transition-colors hover:text-terracotta-400"
                >
                  {tLegal("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="transition-colors hover:text-terracotta-400"
                >
                  {tLegal("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-warm/20 pt-8 text-center">
          <p className="font-display text-lg text-warm">
            {t("directBooking")}
          </p>
          <p className="mt-2 text-sm text-warm/60">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
