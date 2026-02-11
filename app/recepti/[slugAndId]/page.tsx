import { notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { Recipe } from "@/domain/recipe";
import {
  difficultyDisplayMap,
  dishGroupDisplayMap,
  preparationTypeDisplayMap,
} from "@/lib/maps/displayMaps";
import { recipeJsonLd } from "@/lib/seo/recipeJsonLd";
import { buildRecipeMetadata } from "@/lib/seo/recipeMetadata";

interface RecipePageProps {
  params: {
    slugAndId: string;
  };
}

async function getRecipe(slugAndId: string): Promise<Recipe | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${slugAndId}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: RecipePageProps) {
  const resolvedParams = await params;
  const { slugAndId } = resolvedParams;

  const recipe = await getRecipe(slugAndId);
  if (!recipe) return { title: "Recipe not found" };

  return buildRecipeMetadata(recipe, slugAndId);
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const resolvedParams = await params;
  const slugAndId = resolvedParams.slugAndId;

  const recipe = await getRecipe(slugAndId);
  if (!recipe) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 min-h-screen">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(recipeJsonLd(recipe)),
        }}
        strategy="afterInteractive"
      />

      <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}${recipe.heroImagePath}`}
          alt={recipe.heroImageAlt || recipe.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/25"></div>
        <h1 className="absolute bottom-4 left-4 text-white text-4xl font-bold drop-shadow-lg">
          {recipe.title}
        </h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          ⏱ {recipe.prepTimeMinutes} min
        </span>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          👨‍🍳 {difficultyDisplayMap[recipe.difficulty]}
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          🍳 {dishGroupDisplayMap[recipe.dishGroup]}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          🍽 Za {recipe.servings}
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          🔪 {preparationTypeDisplayMap[recipe.preparationType]}
        </span>
      </div>

      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {recipe.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Sastojci</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx} className="mb-1">
              {ingredient.amount && ingredient.amount > 0 && (
                <span className="font-semibold">{ingredient.amount}</span>
              )}
              {ingredient.unit && (
                <span className="text-gray-500 ml-1">{ingredient.unit}</span>
              )}
              <span className="ml-1">{ingredient.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Priprema</h2>
        <ol className="list-decimal list-inside">
          {recipe.steps.map((step, idx) => (
            <li key={idx} className="mb-2">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
