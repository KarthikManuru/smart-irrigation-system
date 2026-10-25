import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const brainDir = "C:\\Users\\shilp\\.gemini\\antigravity-ide\\brain\\7807d63b-a322-48eb-9254-7677577c5136";
  const publicImages = path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(publicImages)) {
    fs.mkdirSync(publicImages, { recursive: true });
  }

  const mapping = [
    { src: "rice_field_1792923674929.jpg", dst: "field-1.jpg" },
    { src: "maize_field_1792923701271.jpg", dst: "field-2.jpg" },
    { src: "tomato_field_1792923733874.jpg", dst: "field-3.jpg" },
    { src: "farmer_smart_1792923777800.jpg", dst: "farmer.jpg" },
  ];

  const copied: string[] = [];
  for (const m of mapping) {
    const s = path.join(brainDir, m.src);
    const d = path.join(publicImages, m.dst);
    if (fs.existsSync(s)) {
      fs.copyFileSync(s, d);
      copied.push(m.dst);
    }
  }

  return NextResponse.json({ success: true, copied });
}
