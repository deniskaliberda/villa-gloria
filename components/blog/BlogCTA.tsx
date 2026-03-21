import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export function BlogCTA() {
  return (
    <div className="mt-12 rounded-card bg-terracotta-500 p-8 text-center text-white md:p-12">
      <h3 className="font-display text-2xl font-bold md:text-3xl">
        Jetzt Villa Gloria buchen
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-white/90">
        180 m² Luxusvilla mit privatem Pool, Meerblick und eingezäuntem
        Grundstück in Kaštelir, Istrien. Bis zu 9 Gäste. Direkt buchen — bester
        Preis garantiert.
      </p>
      <div className="mt-6">
        <Link href="/buchen">
          <Button
            variant="secondary"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-terracotta-500"
          >
            Verfügbarkeit prüfen
          </Button>
        </Link>
      </div>
    </div>
  );
}
