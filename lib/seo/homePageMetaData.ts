import { Metadata } from "next";
import { Recipe } from "@/domain/recipe";

export function buildHomepageMetadata(recipes: Recipe[] = []): Metadata {
  return {
    title: "Coolinarika – Najbolji recepti i kulinarski savjeti",
    description:
      "Pronađite najbolje recepte, kulinarske savjete i inspiraciju za kuhanje na Coolinarika.",
    keywords: [
      "recepti",
      "kuhanje",
      "deserti",
      "jela",
      "hrana",
      "kulinarika",
      "Coolinarika",
    ],
    authors: [{ name: "Enterwell Team" }],
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    alternates: { canonical: "/recepti" },
    openGraph: {
      title: "Coolinarika – Najbolji recepti i kulinarski savjeti",
      description:
        "Pronađite najbolje recepte, kulinarske savjete i inspiraciju za kuhanje na Coolinarika.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/recepti`,
      siteName: "Coolinarika",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/og-image-default.png`,
          width: 1200,
          height: 630,
          alt: "Coolinarika – Najbolji recepti",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Coolinarika – Najbolji recepti i kulinarski savjeti",
      description:
        "Pronađite najbolje recepte, kulinarske savjete i inspiraciju za kuhanje na Coolinarika.",
      images: [`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/og-image-default.png`],
      site: "@coolinarika",
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
}
