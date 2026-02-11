import { NextResponse } from "next/server";
import {
  getRecipeBySlugAndId,
  updateRecipeBySlugAndId,
  deleteRecipeBySlugAndId,
} from "@/lib/api/recipeService";
import { recipeUpdateSchema } from "@/lib/helpers/validation";

export async function GET(
  req: Request,
  context: { params: Promise<{ slugAndId: string }> },
) {
  const { slugAndId } = await context.params;

  if (!slugAndId) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Missing slugAndId" } },
      { status: 400 },
    );
  }

  try {
    const recipe = await getRecipeBySlugAndId(slugAndId);
    if (!recipe) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Recipe not found" } },
        { status: 404 },
      );
    }

    return NextResponse.json(recipe);
  } catch (err) {
    console.error("GET /api/recipes/[slugAndId] error:", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Failed to load recipe" } },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ slugAndId: string }> },
) {
  const { slugAndId } = await context.params;

  if (!slugAndId) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Missing slugAndId" } },
      { status: 400 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Invalid JSON body" } },
      { status: 400 },
    );
  }

  const parsed = recipeUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed",
          issues: parsed.error.issues,
        },
      },
      { status: 400 },
    );
  }

  try {
    const updated = await updateRecipeBySlugAndId(slugAndId, parsed.data);

    if (!updated) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Recipe not found" } },
        { status: 404 },
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("PUT /api/recipes/[slugAndId] error:", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Failed to update recipe" } },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ slugAndId: string }> },
) {
  const { slugAndId } = await context.params;

  if (!slugAndId) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Missing slugAndId" } },
      { status: 400 },
    );
  }

  try {
    const deleted = await deleteRecipeBySlugAndId(slugAndId);

    if (!deleted) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Recipe not found" } },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("DELETE /api/recipes/[slugAndId] error:", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Failed to delete recipe" } },
      { status: 500 },
    );
  }
}
