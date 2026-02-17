import { prisma } from "@/lib/db/prismaClient";
import { serializeField, deserializeRecipe } from "@/lib/helpers/serialize";
import { extractId } from "@/lib/helpers/extractId";
import { slugify } from "@/lib/helpers/slugify";
import {
  RecipeDTO,
  RecipeCreateInput,
  RecipeUpdateInput,
} from "@/domain/recipe";

export enum RecipeErrorCode {
  SLUG_EXISTS = "SLUG_EXISTS",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
}

export async function getAllRecipes(): Promise<RecipeDTO[]> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });

  return recipes.map((r) => {
    const d = deserializeRecipe(r);
    return { ...d, slugAndId: `${d.slug}-${d.id}` };
  });
}

export async function getRecipeBySlugAndId(
  slugAndId: string,
): Promise<RecipeDTO | null> {
  const id = extractId(slugAndId);
  if (!id) return null;

  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) return null;

  const d = deserializeRecipe(recipe);
  return { ...d, slugAndId: `${d.slug}-${d.id}` };
}

export async function createRecipe(
  data: RecipeCreateInput,
): Promise<RecipeDTO> {
  const slug = slugify(data.title);

  const exists = await prisma.recipe.findFirst({ where: { slug } });
  if (exists) {
    const error = new Error("Recipe with this slug already exists");
    (error as any).code = RecipeErrorCode.SLUG_EXISTS;
    throw error;
  }

  const { tags, ingredients, steps, ...rest } = data;

  const recipe = await prisma.recipe.create({
    data: {
      ...rest,
      slug,
      tags: serializeField(tags),
      ingredients: serializeField(ingredients),
      steps: serializeField(steps),
    },
  });

  const d = deserializeRecipe(recipe);
  return { ...d, slugAndId: `${d.slug}-${d.id}` };
}

export async function updateRecipeBySlugAndId(
  slugAndId: string,
  data: RecipeUpdateInput,
): Promise<RecipeDTO | null> {
  const id = extractId(slugAndId);
  if (!id) return null;

  const updateData = {
    ...data,
    ...(data.title ? { slug: slugify(data.title) } : {}),
    tags: serializeField(data.tags),
    ingredients: serializeField(data.ingredients),
    steps: serializeField(data.steps),
  };

  const updated = await prisma.recipe.update({
    where: { id },
    data: updateData,
  });

  const d = deserializeRecipe(updated);
  return { ...d, slugAndId: `${d.slug}-${d.id}` };
}

export async function deleteRecipeBySlugAndId(slugAndId: string) {
  const id = extractId(slugAndId);
  if (!id) return null;

  const result = await prisma.recipe.deleteMany({ where: { id } });

  if (result.count === 0) return null;

  return { success: true };
}

