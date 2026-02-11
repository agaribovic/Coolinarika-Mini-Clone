import { Recipe } from "@/domain/recipe";

export const recipeJsonLd = (recipe: Recipe) => ({
  "@context": "https://schema.org/",
  "@type": "Recipe",
  name: recipe.title,
  image: [`${process.env.NEXT_PUBLIC_CDN_BASE_URL}${recipe.heroImagePath}`],
  description: recipe.lead,
  recipeIngredient: recipe.ingredients.map((i) =>
    `${i.amount ?? ""} ${i.unit ?? ""} ${i.name}`.trim(),
  ),
  recipeInstructions: recipe.steps.map((step) => ({
    "@type": "HowToStep",
    text: step,
  })),
  recipeYield: `${recipe.servings} osoba`,
  cookTime: `PT${recipe.prepTimeMinutes}M`,
  prepTime: `PT${recipe.prepTimeMinutes}M`,
});
