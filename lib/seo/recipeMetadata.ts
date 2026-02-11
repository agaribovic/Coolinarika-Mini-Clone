import { Recipe } from "@/domain/recipe";

export function buildRecipeMetadata(recipe: Recipe, slugAndId: string) {
  const heroImage = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}${recipe.heroImagePath}`;

  return {
    title: `${recipe.title} | Coolinarika`,
    description: recipe.lead,
    alternates: { canonical: `/recepti/${slugAndId}` },
    openGraph: {
      title: recipe.title,
      description: recipe.lead,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/recept/${slugAndId}`,
      siteName: "Coolinarika",
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: recipe.heroImageAlt || recipe.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.lead,
      images: [heroImage],
      site: "@coolinarika",
    },
  };
}
