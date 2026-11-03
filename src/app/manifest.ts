import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ramadan Daily",
    short_name: "Ramadan",
    description: "Tracking daily habits selama bulan Ramadan",
    start_url: "/today",
    display: "standalone",
    background_color: "#f6f4ee",
    theme_color: "#0f6b4f",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
