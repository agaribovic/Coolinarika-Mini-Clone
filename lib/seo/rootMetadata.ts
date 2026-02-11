import type { Metadata } from "next";

export const ROOT_METADATA: Metadata = {
  title: "Coolinarka – Najbolji recepti i kulinarski savjeti",
  description:
    "Coolinarka je platforma za ljubitelje kuhanja. Pronađite recepte, savjete i ideje za pripremu jela.",
  keywords: [
    "recepti",
    "kuhanje",
    "deserti",
    "jela",
    "hrana",
    "kulinarika",
    "Coolinarka",
  ],
  authors: [{ name: "Enterwell Team" }],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Coolinarka – Najbolji recepti i kulinarski savjeti",
    description:
      "Coolinarka je platforma za ljubitelje kuhanja. Pronađite recepte, savjete i ideje za pripremu jela.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "Coolinarka",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/og-image-default.png`,
        width: 1200,
        height: 630,
        alt: "Coolinarka – Najbolji recepti",
      },
    ],
    locale: "bs-BA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coolinarka – Najbolji recepti i kulinarski savjeti",
    description:
      "Coolinarka je platforma za ljubitelje kuhanja. Pronađite recepte, savjete i ideje za pripremu jela.",
    images: [`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/og-image-default.png`],
    site: "@coolinarka",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
