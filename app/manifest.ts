import type { MetadataRoute } from "next";

/**
 * PWA web manifest. Next.js auto-serves at /manifest.webmanifest and adds the
 * <link rel="manifest"> reference to <head>. Used by Android "Add to home
 * screen" and Chromium-derived link previews.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Villa Gloria al Padre",
    short_name: "Villa Gloria",
    description: "Luxus-Ferienhaus mit Pool und Meerblick in Kaštelir, Istrien.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#C2703E",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
  };
}
