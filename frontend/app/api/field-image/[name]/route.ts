import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params?: Promise<{ name: string }> | { name: string } }
) {
  let name = "";
  try {
    if (context?.params) {
      const p = await context.params;
      name = p?.name ?? "";
    }
  } catch {
    // fallback
  }
  if (!name) {
    const parts = req.nextUrl.pathname.split("/");
    name = parts[parts.length - 1];
  }

  const brainDir =
    "C:\\Users\\shilp\\.gemini\\antigravity-ide\\brain\\7807d63b-a322-48eb-9254-7677577c5136";
  const publicDir = path.join(process.cwd(), "public", "images");

  const fileMap: Record<string, string> = {
    "field-1.jpg": "rice_field_1792923674929.jpg",
    "field-2.jpg": "maize_field_1792923701271.jpg",
    "field-3.jpg": "tomato_field_1792923733874.jpg",
    "farmer.jpg": "farmer_smart_1792923777800.jpg",
  };

  const brainFile = fileMap[name];
  const srcPath = brainFile ? path.join(brainDir, brainFile) : "";
  const publicPath = path.join(publicDir, name);

  if (fs.existsSync(publicPath)) {
    const buffer = fs.readFileSync(publicPath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  if (srcPath && fs.existsSync(srcPath)) {
    try {
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      fs.copyFileSync(srcPath, publicPath);
    } catch {
      // ignore
    }
    const buffer = fs.readFileSync(srcPath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // fallback to hero.jpg if available
  const heroPath = path.join(publicDir, "hero.jpg");
  if (fs.existsSync(heroPath)) {
    const buffer = fs.readFileSync(heroPath);
    return new NextResponse(buffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  }

  return new NextResponse("Not Found", { status: 404 });
}

