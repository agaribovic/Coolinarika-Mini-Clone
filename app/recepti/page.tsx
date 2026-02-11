import RecipeCard from "@/components/Recipe/RecipeCard";
import { Recipe } from "@/domain/recipe";
import Script from "next/script";
import { buildHomepageMetadata } from "@/lib/seo/homePageMetaData";
import { homepageJsonLd } from "@/lib/seo/homepageJsonLd";

export async function generateMetadata() {
  const recipes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`,
    { next: { revalidate: 60 } },
  ).then((res) => res.json());

  return buildHomepageMetadata(recipes);
}

export default async function RecipeListPage() {
  const recipes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`,
    { next: { revalidate: 60 } },
  ).then((r) => r.json());

  if (!recipes || recipes.length === 0) {
    return (
      <p className="text-4xl font-bold text-red-500 text-center">
        No recipes found.
      </p>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
        strategy="afterInteractive"
      />
      <h1 className="sr-only">
        Coolinarika – Najbolji recepti i kulinarski savjeti
      </h1>
      <section
        aria-label="Lista recepata"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl"
      >
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </main>
  );
}
