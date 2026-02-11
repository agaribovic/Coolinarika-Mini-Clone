import { RecipeDTO } from "@/domain/recipe";

export const serializeField = <T>(field?: T[]): string => {
  return JSON.stringify(field ?? []);
};

export const deserializeRecipe = (
  recipe: any,
): Omit<RecipeDTO, "slugAndId"> => {
  const safeParse = (field?: string): any[] => {
    if (!field) return [];
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  };

  return {
    ...recipe,
    tags: safeParse(recipe.tags),
    ingredients: safeParse(recipe.ingredients),
    steps: safeParse(recipe.steps),
  };
};

export const deserializeRecipeArray = (recipes: any[]): RecipeDTO[] => {
  return recipes.map((r) => {
    const d = deserializeRecipe(r);
    return {
      ...d,
      slugAndId: `${d.slug}-${d.id}`,
    };
  });
};
