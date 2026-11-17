import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const logoPath = path.join(root, "public", "images", "logo.png");

const trimmed = await sharp(logoPath).trim({ threshold: 20 }).toBuffer();

async function makeCircle(size, { apple }) {
  const pad = Math.round(size * 0.14);
  const inner = size - pad * 2;
  const logoBuf = await sharp(trimmed)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .ensureAlpha()
    .png()
    .toBuffer();

  // Transparent canvas + white disc + logo
  const discSvg = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#ffffff"/>
</svg>`);

  const disc = await sharp(discSvg)
    .resize(size, size)
    .ensureAlpha()
    .composite([{ input: logoBuf, left: pad, top: pad }])
    .png()
    .toBuffer();

  // Hard circular alpha mask so corners stay fully transparent
  const mask = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
</svg>`);

  const masked = await sharp(disc)
    .ensureAlpha()
    .composite([{ input: await sharp(mask).resize(size, size).png().toBuffer(), blend: "dest-in" }])
    .png()
    .toBuffer();

  if (apple) {
    const cream = { r: 245, g: 240, b: 232, alpha: 1 };
    return sharp({
      create: { width: size, height: size, channels: 4, background: cream },
    })
      .composite([{ input: masked, left: 0, top: 0 }])
      .png()
      .toBuffer();
  }

  return masked;
}

const icon = await makeCircle(512, { apple: false });
const apple = await makeCircle(180, { apple: true });

fs.writeFileSync(path.join(root, "src", "app", "icon.png"), icon);
fs.writeFileSync(path.join(root, "src", "app", "apple-icon.png"), apple);
fs.writeFileSync(path.join(root, "public", "favicon.png"), icon);

// Sanity: corner pixel alpha should be 0 for icon
const { data, info } = await sharp(icon)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const cornerA = data[3];
console.log(
  `wrote circular icons; corner alpha=${cornerA} size=${info.width}x${info.height}`,
);
