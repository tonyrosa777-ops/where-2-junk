/**
 * generate-blog-images.ts
 * Generates missing blog card thumbnails for Where2 Junk using fal.ai.
 *
 * Run: npx tsx scripts/generate-blog-images.ts
 */

import { fal } from "@fal-ai/client";
import * as fs from "node:fs";
import * as path from "node:path";
import * as https from "node:https";
import * as http from "node:http";

// ---------------------------------------------------------------------------
// Load .env.local manually (dotenv not installed)
// ---------------------------------------------------------------------------
function loadEnvLocal(): void {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) throw new Error(".env.local not found: " + envPath);
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const idx = t.indexOf("=");
    if (idx === -1) continue;
    const key = t.slice(0, idx).trim();
    const val = t.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// ---------------------------------------------------------------------------
// Brand style prefix — from design-system.md Section 6
// ---------------------------------------------------------------------------
const STYLE_PREFIX =
  "High contrast editorial photography, deep blacks, punchy saturation, " +
  "photorealistic, gritty realism, no stock photo feel, natural light, " +
  "16:9 aspect ratio, Manchester NH context";

// ---------------------------------------------------------------------------
// Blog images to generate
// ---------------------------------------------------------------------------
const JOBS = [
  {
    slug: "donate-recycle-what-happens-your-junk",
    subject:
      "A junk removal crew worker sorting household items into labeled cardboard donation boxes " +
      "in the back of a black and red branded pickup truck. Usable furniture and household goods " +
      "visible, separated from debris. Urban neighborhood setting, overcast natural light. " +
      "Action-oriented, crew-forward composition. Believable and gritty, not staged.",
  },
  {
    slug: "junk-removal-before-selling-home-manchester-nh",
    subject:
      "After photo: a completely empty, clean residential room in a New England home ready for " +
      "sale. Hardwood floors swept clean, blank walls, late afternoon window light streaming in. " +
      "A real estate for-sale sign faintly visible through the window in the front yard. " +
      "Photorealistic, sense of space and possibility. No people, no clutter.",
  },
];

// ---------------------------------------------------------------------------
// Download helper
// ---------------------------------------------------------------------------
function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(res.headers.location!, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve()));
    }).on("error", (err) => { fs.unlinkSync(dest); reject(err); });
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  loadEnvLocal();

  const key = process.env.FAL_KEY;
  if (!key) throw new Error("FAL_KEY not found in .env.local");
  fal.config({ credentials: key });

  const outDir = path.resolve(__dirname, "../public/images/blog");
  fs.mkdirSync(outDir, { recursive: true });

  console.log("\nWhere2 Junk — Blog Image Generator");
  console.log("====================================");
  console.log(`Generating ${JOBS.length} images via fal-ai/flux/schnell (~$${(JOBS.length * 0.003).toFixed(3)} total)\n`);

  for (const job of JOBS) {
    const outPath = path.join(outDir, `${job.slug}.jpg`);

    // Skip if already exists
    if (fs.existsSync(outPath)) {
      console.log(`  ↳ Skipped (exists): ${job.slug}.jpg`);
      continue;
    }

    console.log(`  Generating: ${job.slug}...`);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await fal.subscribe("fal-ai/flux/schnell" as any, {
        input: {
          prompt: `${STYLE_PREFIX}, ${job.subject}`,
          image_size: "landscape_16_9",
          num_inference_steps: 4,
          num_images: 1,
          enable_safety_checker: true,
          output_format: "jpeg",
        },
        logs: false,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const imageUrl: string = (result.data as any)?.images?.[0]?.url;
      if (!imageUrl) throw new Error("No image URL in response: " + JSON.stringify(result.data));

      await downloadFile(imageUrl, outPath);
      console.log(`  ✓ Saved: public/images/blog/${job.slug}.jpg`);
    } catch (err) {
      console.error(`  ✗ Failed: ${job.slug} — ${(err as Error).message}`);
    }
  }

  console.log("\nDone. Commit the generated files with git add public/images/blog/");
}

main().catch((err) => {
  console.error("\nFatal:", err.message);
  process.exit(1);
});
