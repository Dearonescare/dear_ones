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
import { existsSync, mkdirSync, readdirSync } from "node:fs";
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

/* ---------- Hero backgrounds ---------- */
// Purpose-built, text-free artwork: engraved village on one side, the photo
// on the other. Used whole — the hero copy overlays them — so these are only
// re-encoded to AVIF/WebP at a couple of widths for the hero <picture>.
// NOTE: the masters are only 1065px and 392px wide, so they are encoded at
// native size — there is no second srcset width to offer, and upscaling here
// would add bytes without adding detail. Higher-resolution exports (~2400px
// desktop, ~1200px mobile) would sharpen these noticeably on HiDPI screens.
const HERO_BACKGROUNDS = [
  { master: "desktop_background.png", base: "hero-desktop" },
  { master: "mobile_background.png", base: "hero-mobile" },
];

// Hands close-up used by the Distance and Family Updates sections, cropped
// out of the desktop banner (fractions of its 1983x793 frame).
const HANDS_CROP = { left: 0.56, top: 0.34, width: 0.34, height: 0.66 };

/* ---------- Brand lockup ---------- */
// navbar_logo.png is a sheet: the horizontal lockup on the left, a square
// app-icon variant on the right. Only the lockup is needed, and it ships on
// a flat cream plate — opaque, it would show as a patch against the
// translucent scrolled header, so the plate is unmultiplied back out to alpha.
const LOCKUP_CROP = { left: 4, top: 11, width: 600, height: 165 };
const LOCKUP_PLATE = [250, 244, 237];

async function unmultiplyPlate(src, crop, plate) {
  const { data, info } = await sharp(src)
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    // Ink over a known flat plate: the channel that darkened most relative to
    // the plate gives the coverage, and the colour divides back out of it.
    let a = 0;
    for (let c = 0; c < 3; c += 1) a = Math.max(a, 1 - data[i + c] / plate[c]);
    a = Math.min(1, Math.max(0, a));
    if (a < 0.004) continue; // stays fully transparent
    for (let c = 0; c < 3; c += 1) {
      const v = (data[i + c] - plate[c] * (1 - a)) / a;
      out[i + c] = Math.min(255, Math.max(0, Math.round(v)));
    }
    out[i + 3] = Math.round(a * 255);
  }

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

/* ---------- Section artwork ---------- */
// Masters are dropped in brand-source/<folder>/ and keep their filename; the
// components reference /images/<name>.webp. None of these render wider than
// ~400 CSS px, so 800px covers 2x displays and next/image takes it from there.
const ARTWORK_FOLDERS = ["services", "distance"];
const ARTWORK_WIDTH = 800;

async function processSectionArtwork() {
  for (const folder of ARTWORK_FOLDERS) {
    const dir = join(ROOT, "brand-source", folder);
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
    for (const file of files) {
      const base = file.replace(/\.[^.]+$/, "");
      await sharp(join(dir, file))
        .resize({ width: ARTWORK_WIDTH, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(join(OUT, `${base}.webp`));
    }
    if (files.length) console.log(`Encoded ${files.length} ${folder} images to WebP.`);
  }
}

async function processArtwork() {
  for (const { master, base } of HERO_BACKGROUNDS) {
    const src = join(OUT, master);
    if (!existsSync(src)) {
      console.warn(`Hero master missing: ${master} — skipped.`);
      continue;
    }
    const { width, height } = await sharp(src).metadata();
    await sharp(src).webp({ quality: 84 }).toFile(join(OUT, `${base}.webp`));
    await sharp(src).avif({ quality: 62 }).toFile(join(OUT, `${base}.avif`));
    console.log(`Encoded ${base} at ${width}x${height} (AVIF + WebP).`);
  }

  const logoSheet = join(OUT, "navbar_logo.png");
  if (existsSync(logoSheet)) {
    const lockup = await unmultiplyPlate(logoSheet, LOCKUP_CROP, LOCKUP_PLATE);
    await lockup
      .clone()
      .png({ compressionLevel: 9 })
      .toFile(join(OUT, "brand-lockup.png"));
    await lockup
      .clone()
      .webp({ quality: 92, alphaQuality: 100 })
      .toFile(join(OUT, "brand-lockup.webp"));
    console.log("Extracted brand-lockup with transparency (PNG + WebP).");
  }

  const handsMaster = join(OUT, "banner_lap.png");
  if (!source && existsSync(handsMaster)) {
    const meta = await sharp(handsMaster).metadata();
    const dim = { width: meta.width ?? 1983, height: meta.height ?? 793 };
    await sharp(handsMaster)
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
  await processArtwork();
  await processSectionArtwork();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
