/**
 * Dear Ones — one-time brand image processor.
 *
 * DROP-IN: Place the supplied brand photo at:
 *     brand-source/dear-ones-source.jpeg   (or .jpg / .png / .webp)
 *
 * Then run:  npm run process-images
 *
 * When a real source photo is present, this script produces optimised
 * WebP/AVIF crops for the hero, a hands close-up and the full source.
 * When no source is present, it generates tasteful warm placeholders so
 * the site builds and renders complete. Placeholders are clearly abstract
 * and never fabricate a person — swap them by dropping in the real photo.
 *
 * Crop ratios are expressed as fractions of the source dimensions so they
 * adapt to any resolution. Adjust the CROPS values if your source framing
 * differs. The wordmark in the UI is rendered as crisp SVG/text (see
 * BrandMark.tsx), so no text crop from the photo is required.
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public", "images");
mkdirSync(OUT, { recursive: true });

const SOURCE_CANDIDATES = [
  "dear-ones-source.jpeg",
  "dear-ones-source.jpg",
  "dear-ones-source.png",
  "dear-ones-source.webp",
].map((f) => join(ROOT, "brand-source", f));

const source = SOURCE_CANDIDATES.find((p) => existsSync(p));

// Fractional crop boxes { left, top, width, height } relative to source size.
// The baked-in "Dear Ones" wordmark sits on the left ~half of the photo, so
// the hero crop deliberately starts past the midpoint to exclude that text.
const CROPS = {
  hero: { left: 0.5, top: 0.0, width: 0.5, height: 1.0 },
  hands: { left: 0.44, top: 0.58, width: 0.54, height: 0.42 },
};

const PALETTE = {
  bg: "#FBF6EC",
  sand: "#EEDEC9",
  sandDeep: "#E5C7A9",
  gold: "#C69759",
  goldDark: "#A8783F",
  terracotta: "#8A3D25",
  brown: "#4C250D",
};

function box(dim, frac) {
  return {
    left: Math.round(dim.width * frac.left),
    top: Math.round(dim.height * frac.top),
    width: Math.round(dim.width * frac.width),
    height: Math.round(dim.height * frac.height),
  };
}

async function fromSource() {
  const meta = await sharp(source).metadata();
  const dim = { width: meta.width ?? 1254, height: meta.height ?? 1254 };
  console.log(`Source found: ${source} (${dim.width}x${dim.height})`);

  // Full optimised source (WebP + AVIF).
  await sharp(source)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT, "dear-ones-source.webp"));
  await sharp(source)
    .resize({ width: 1400, withoutEnlargement: true })
    .avif({ quality: 62 })
    .toFile(join(OUT, "dear-ones-source.avif"));

  // Hero crop (woman + held hands, no baked-in text).
  await sharp(source)
    .extract(box(dim, CROPS.hero))
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(join(OUT, "dear-ones-hero.webp"));
  await sharp(source)
    .extract(box(dim, CROPS.hero))
    .resize({ width: 1100, withoutEnlargement: true })
    .avif({ quality: 64 })
    .toFile(join(OUT, "dear-ones-hero.avif"));

  // Hands close-up.
  await sharp(source)
    .extract(box(dim, CROPS.hands))
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(join(OUT, "dear-ones-hands.webp"));

  console.log("Generated hero, hands and source assets from the real photo.");
}

function gradientSvg(w, h, { motif = false } = {}) {
  const glow = motif
    ? `<circle cx="${w * 0.72}" cy="${h * 0.3}" r="${w * 0.55}" fill="url(#glow)" />`
    : "";
  const heart = motif
    ? `<g transform="translate(${w * 0.5}, ${h * 0.5})" opacity="0.14" fill="none"
         stroke="${PALETTE.goldDark}" stroke-width="${Math.max(2, w * 0.006)}"
         stroke-linecap="round" stroke-linejoin="round">
         <path transform="scale(${w * 0.0016})" d="M0,-38 C22,-70 78,-58 78,-16 C78,24 30,52 0,80 C-30,52 -78,24 -78,-16 C-78,-58 -22,-70 0,-38 Z" />
         <path transform="scale(${w * 0.0016})" d="M-96,44 C-70,10 -34,-2 0,10 C34,-2 70,10 96,44" />
       </g>`
    : "";
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0.35" y2="1">
           <stop offset="0" stop-color="#F6E9D6"/>
           <stop offset="0.55" stop-color="${PALETTE.sand}"/>
           <stop offset="1" stop-color="${PALETTE.sandDeep}"/>
         </linearGradient>
         <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
           <stop offset="0" stop-color="#FFF7EA" stop-opacity="0.9"/>
           <stop offset="1" stop-color="#FFF7EA" stop-opacity="0"/>
         </radialGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#g)"/>
       ${glow}
       ${heart}
     </svg>`
  );
}

async function fromPlaceholders() {
  console.log(
    "No source photo found in brand-source/. Generating warm placeholders.\n" +
      "  -> Drop the real photo at brand-source/dear-ones-source.jpeg and re-run."
  );
  const jobs = [
    { name: "dear-ones-source.webp", w: 1400, h: 1400, motif: true },
    { name: "dear-ones-source.avif", w: 1400, h: 1400, motif: true, avif: true },
    { name: "dear-ones-hero.webp", w: 1100, h: 1320, motif: true },
    { name: "dear-ones-hero.avif", w: 1100, h: 1320, motif: true, avif: true },
    { name: "dear-ones-hands.webp", w: 1000, h: 760, motif: true },
  ];
  for (const j of jobs) {
    const pipe = sharp(gradientSvg(j.w, j.h, { motif: j.motif }));
    if (j.avif) pipe.avif({ quality: 60 });
    else pipe.webp({ quality: 80 });
    await pipe.toFile(join(OUT, j.name));
  }
  console.log("Placeholders written to public/images/.");
}

/* ---------- Hero banners ---------- */
// The two supplied banner artworks live in public/images/ as PNG masters.
// They already carry the wordmark and tagline, so they are used as-is —
// only re-encoded to AVIF/WebP at a few widths for the hero <picture>.
const BANNERS = [
  { master: "banner_lap.png", base: "banner-desktop", widths: [1920, 1280] },
  { master: "banner_mobile.png", base: "banner-mobile", widths: [1024, 720] },
];

// The hero copy is overlaid on the artwork, so the hero uses photo-only crops
// taken from the desktop master — the wordmark and tagline baked into both
// banners sit exactly where the headline goes. Pixel boxes on banner_lap.png
// (1983x793); the wordmark ends at x~845, so every crop starts past it.
const HERO_CROPS = [
  // Wide framing for md+ — keeps the engraved village edge for the left fade.
  {
    base: "hero-wide",
    crop: { left: 880, top: 0, width: 1103, height: 793 },
    widths: [1103, 800],
  },
  // Tighter, taller framing for phones.
  {
    base: "hero-portrait",
    crop: { left: 1110, top: 20, width: 680, height: 773 },
    widths: [680, 500],
  },
];

// Engraved village vignette used as a decorative layer in the hero. Taken
// from banner_mobile.png (1024x1536), where it sits clear of every text
// block — the desktop banner's copy of it runs under the wordmark.
const VILLAGE_CROP = { left: 0, top: 806, width: 492, height: 400 };

// Hands close-up used by the Distance and Family Updates sections, cropped
// out of the desktop banner (fractions of its 1983x793 frame).
const HANDS_CROP = { left: 0.56, top: 0.34, width: 0.34, height: 0.66 };

async function processBanners() {
  for (const { master, base, widths } of BANNERS) {
    const src = join(OUT, master);
    if (!existsSync(src)) {
      console.warn(`Banner master missing: ${master} — skipped.`);
      continue;
    }
    for (const w of widths) {
      await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(join(OUT, `${base}-${w}.webp`));
      await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(join(OUT, `${base}-${w}.avif`));
    }
    console.log(`Encoded ${base} at ${widths.join(", ")}px (AVIF + WebP).`);
  }

  const desktopMaster = join(OUT, "banner_lap.png");
  if (existsSync(desktopMaster)) {
    for (const { base, crop, widths } of HERO_CROPS) {
      for (const w of widths) {
        await sharp(desktopMaster)
          .extract(crop)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: 84 })
          .toFile(join(OUT, `${base}-${w}.webp`));
        await sharp(desktopMaster)
          .extract(crop)
          .resize({ width: w, withoutEnlargement: true })
          .avif({ quality: 62 })
          .toFile(join(OUT, `${base}-${w}.avif`));
      }
      console.log(`Cropped ${base} at ${widths.join(", ")}px (AVIF + WebP).`);
    }
  }

  const mobileMaster = join(OUT, "banner_mobile.png");
  if (existsSync(mobileMaster)) {
    await sharp(mobileMaster)
      .extract(VILLAGE_CROP)
      .webp({ quality: 84 })
      .toFile(join(OUT, "hero-village.webp"));
    await sharp(mobileMaster)
      .extract(VILLAGE_CROP)
      .avif({ quality: 62 })
      .toFile(join(OUT, "hero-village.avif"));
    console.log("Cropped hero-village from the mobile banner (AVIF + WebP).");
  }

  if (!source && existsSync(desktopMaster)) {
    const meta = await sharp(desktopMaster).metadata();
    const dim = { width: meta.width ?? 1983, height: meta.height ?? 793 };
    await sharp(desktopMaster)
      .extract(box(dim, HANDS_CROP))
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(join(OUT, "dear-ones-hands.webp"));
    console.log("Derived dear-ones-hands.webp from the desktop banner.");
  }
}

async function main() {
  if (source) await fromSource();
  else await fromPlaceholders();
  await processBanners();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
