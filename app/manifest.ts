import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EnterijerStil",
    short_name: "EnterijerStil",
    description:
      "Interior design, renovation and furnishing studio from Kragujevac.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#CA4C15",
    icons: [
      {
        src: "/logo.png",
        sizes: "188x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
