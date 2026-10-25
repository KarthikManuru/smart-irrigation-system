import type { Metadata, Viewport } from "next";
import {
  Poppins,
  Noto_Sans_Devanagari,
  Noto_Sans_Kannada,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Sans_Malayalam,
  Noto_Sans_Bengali,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Oriya,
} from "next/font/google";
import fs from "fs";
import path from "path";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import PwaRegister from "@/components/PwaRegister";

// Automatically ensure field photos exist in public/images for fast static serving
try {
  const brainDir = "C:\\Users\\shilp\\.gemini\\antigravity-ide\\brain\\7807d63b-a322-48eb-9254-7677577c5136";
  const pubDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(pubDir)) {
    fs.mkdirSync(pubDir, { recursive: true });
  }
  const map: Record<string, string> = {
    "field-1.jpg": "rice_field_1792923674929.jpg",
    "field-2.jpg": "maize_field_1792923701271.jpg",
    "field-3.jpg": "tomato_field_1792923733874.jpg",
    "farmer.jpg": "farmer_smart_1792923777800.jpg",
  };
  for (const [dst, src] of Object.entries(map)) {
    const fullDst = path.join(pubDir, dst);
    const fullSrc = path.join(brainDir, src);
    if (!fs.existsSync(fullDst) && fs.existsSync(fullSrc)) {
      fs.copyFileSync(fullSrc, fullDst);
    }
  }
} catch {
  // safe fallback
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

// One font per Indian script. They are variable fonts and are only
// downloaded by the browser when a page actually uses that script.
const deva = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-deva", preload: false });
const kan = Noto_Sans_Kannada({ subsets: ["kannada"], variable: "--font-kan", preload: false });
const tam = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-tam", preload: false });
const tel = Noto_Sans_Telugu({ subsets: ["telugu"], variable: "--font-tel", preload: false });
const mal = Noto_Sans_Malayalam({ subsets: ["malayalam"], variable: "--font-mal", preload: false });
const ben = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-ben", preload: false });
const guj = Noto_Sans_Gujarati({ subsets: ["gujarati"], variable: "--font-guj", preload: false });
const pan = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], variable: "--font-pan", preload: false });
const ori = Noto_Sans_Oriya({ subsets: ["oriya"], variable: "--font-ori", preload: false });

export const metadata: Metadata = {
  title: "Annadata | Smart Irrigation for a Sustainable Tomorrow",
  description:
    "AI-powered irrigation system that uses real-time sensor data, weather forecasts and machine learning to give you the right amount of water, at the right time.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
  appleWebApp: { capable: true, title: "Annadata", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0d3a27",
  width: "device-width",
  initialScale: 1,
};

const fontVars = [poppins, deva, kan, tam, tel, mal, ben, guj, pan, ori]
  .map((f) => f.variable)
  .join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontVars}>
        <LanguageProvider>{children}</LanguageProvider>
        <PwaRegister />
      </body>
    </html>
  );
}
