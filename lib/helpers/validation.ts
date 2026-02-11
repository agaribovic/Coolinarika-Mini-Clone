import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1),
  amount: z.number().optional(),
  unit: z.string().optional(),
});

export const recipeCreateSchema = z.object({
  title: z.string().min(3),
  lead: z.string().min(10),
  prepTimeMinutes: z.number().int().positive(),
  servings: z.number().int().positive(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  dishGroup: z.enum(["MAIN", "DESSERT", "BREAD", "OTHER"]),
  preparationType: z.enum(["BAKING", "COOKING", "NO_COOK"]),
  tags: z
    .array(z.string().transform((t) => t.trim().toLowerCase()))
    .default([]),
  ingredients: z.array(ingredientSchema).min(1),
  steps: z.array(z.string().min(3)).min(1),
  heroImagePath: z
    .string()
    .regex(/^\/recipes\/.+/, "heroImagePath must start with /recipes/"),
  heroImageAlt: z.string().optional(),
});

export const recipeUpdateSchema = recipeCreateSchema.partial();
