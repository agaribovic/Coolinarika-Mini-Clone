import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mime from "mime";

export async function GET(
  req: Request,
  context: { params?: Promise<{ path?: string[] }> },
) {
  try {
    const resolvedParams = await context.params;
    const pathSegments = resolvedParams?.path;

    if (!pathSegments || pathSegments.length === 0) {
      return NextResponse.json(
        { error: "No file specified in the path" },
        { status: 400 },
      );
    }

    const filePath = path.join(process.cwd(), "public", "cdn", ...pathSegments);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const contentType = mime.getType(filePath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  } catch (err) {
    console.error("GET /api/cdn/[...path] error:", err);
    return NextResponse.json(
      { error: "Server error while reading file" },
      { status: 500 },
    );
  }
}
