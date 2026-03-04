import sharp from "sharp";
import { readdir, mkdir, access } from "fs/promises";
import { join, basename } from "path";

const PUBLIC = join(process.cwd(), "public");

async function processGallery() {
  const grades = ["3-razred", "4-razred", "5-razred"];
  let total = 0;

  for (const grade of grades) {
    const srcDir = join(PUBLIC, "gallery", grade);
    try { await access(srcDir); } catch { console.log(`  ${grade}: skipped (source missing)`); continue; }
    const outDir = join(PUBLIC, "gallery-thumbs", grade);
    await mkdir(outDir, { recursive: true });

    const files = (await readdir(srcDir)).filter((f) => f.endsWith(".webp"));

    for (const file of files) {
      const srcPath = join(srcDir, file);
      const outPath = join(outDir, file);

      await sharp(srcPath)
        .resize(300, 300, { fit: "cover" })
        .webp({ quality: 70 })
        .toFile(outPath);

      total++;
    }
    console.log(`  ${grade}: ${files.length} thumbnails`);
  }
  console.log(`Gallery: ${total} thumbnails generated`);
}

async function processMascot() {
  const srcDir = join(PUBLIC, "mascot");
  try { await access(srcDir); } catch { console.log("  Skipped (source missing)"); return; }
  const outDir = join(PUBLIC, "mascot-opt");
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(srcDir)).filter((f) => f.endsWith(".png"));

  for (const file of files) {
    const srcPath = join(srcDir, file);
    const outName = basename(file, ".png") + ".webp";
    const outPath = join(outDir, outName);

    await sharp(srcPath)
      .resize(350, 350, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85 })
      .toFile(outPath);

    const srcStat = (await sharp(srcPath).metadata());
    const outStat = (await sharp(outPath).metadata());
    console.log(`  ${file} → ${outName}`);
  }
  console.log(`Mascot: ${files.length} images optimized`);
}

async function main() {
  console.log("Generating thumbnails...\n");

  console.log("Gallery thumbnails (300x300 WebP):");
  await processGallery();

  console.log("\nMascot optimization (350px WebP):");
  await processMascot();

  console.log("\nDone!");
}

main().catch(console.error);
