export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type DishGroup = "MAIN" | "DESSERT" | "BREAD" | "OTHER";
export type PreparationType = "BAKING" | "COOKING" | "NO_COOK";

export type Unit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "tbsp"
  | "tsp"
  | "cup"
  | "piece"
  | "pinch"
  | string;

export interface Ingredient {
  name: string;
  amount?: number;
  unit?: Unit;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  lead: string;
  prepTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  dishGroup: DishGroup;
  preparationType: PreparationType;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  heroImagePath: string;
  heroImageAlt?: string;
}

export interface RecipeDTO extends Recipe {
  slugAndId: string;
}

export interface RecipeCreateInput {
  title: string;
  lead: string;
  prepTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  dishGroup: DishGroup;
  preparationType: PreparationType;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  heroImagePath: string;
  heroImageAlt?: string;
}

export type RecipeUpdateInput = Partial<RecipeCreateInput>;
