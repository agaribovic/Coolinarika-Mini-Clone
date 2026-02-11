import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  getAllRecipes,
  createRecipe,
  RecipeErrorCode,
} from "@/lib/api/recipeService";
import { recipeCreateSchema } from "@/lib/helpers/validation";

export async function GET() {
  try {
    const recipes = await getAllRecipes();

    return NextResponse.json(recipes, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err) {
    console.error("GET /api/recipes error:", err);
    return NextResponse.json(
      {
        error: {
          code: RecipeErrorCode.SERVER_ERROR,
          message: "Failed to load recipes",
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const data = recipeCreateSchema.parse(body);

    const recipe = await createRecipe(data);

    return NextResponse.json(recipe, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          error: {
            code: RecipeErrorCode.VALIDATION_ERROR,
            message: "Validation failed",
            issues: err.issues,
          },
        },
        { status: 400 },
      );
    }

    if ((err as any).code === RecipeErrorCode.SLUG_EXISTS) {
      return NextResponse.json(
        {
          error: {
            code: RecipeErrorCode.SLUG_EXISTS,
            message: "Recipe with this slug already exists",
          },
        },
        { status: 409 },
      );
    }

    console.error("POST /api/recipes error:", err);
    return NextResponse.json(
      {
        error: {
          code: RecipeErrorCode.SERVER_ERROR,
          message: "Failed to create recipe",
        },
      },
      { status: 500 },
    );
  }
}
