/**
 * Phase 12 — fal.ai image generation
 * Generates blog card images and gallery photos for where2junk.com
 *
 * Usage: FAL_KEY=<key> node scripts/generate-images.mjs
 *   or:  (key already in .env.local) node -e "require('dotenv').config({path:'.env.local'})" && node scripts/generate-images.mjs
 */

import { fal } from '@fal-ai/client';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Load .env.local manually
import { readFileSync } from 'fs';
try {
  const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
  for (const line of env.split('\n')) {
    const [k, ...v] = line.split('=');
    if (k && !k.startsWith('#') && v.length) {
      process.env[k.trim()] = v.join('=').trim();
    }
  }
} catch {}

fal.config({ credentials: process.env.FAL_KEY });

// ── Blog card images ──────────────────────────────────────────────────────
const BLOG_IMAGES = [
  {
    slug: 'how-to-simplify-junk-removal',
    prompt:
      'Overhead flat lay of mixed household junk items sorted into neat piles on a concrete driveway — old furniture, cardboard boxes, small appliances — bright afternoon sunlight, photorealistic DSLR photo, wide angle',
  },
  {
    slug: 'junk-removal-cost-manchester-nh',
    prompt:
      'White junk removal pickup truck loaded full with old furniture and household items parked in a New England residential driveway, sunny day, green trees, photorealistic DSLR photo',
  },
  {
    slug: 'garage-cleanout-checklist',
    prompt:
      'Cluttered two-car garage interior packed with cardboard boxes, old furniture, bicycles, and miscellaneous household items, overhead fluorescent lighting, photorealistic DSLR photo, wide shot',
  },
  {
    slug: 'what-to-expect-junk-removal-day',
    prompt:
      'Two workers loading a couch onto a junk removal truck in a residential driveway, shot from behind, New Hampshire neighborhood, overcast sky, photorealistic DSLR photo',
  },
  {
    slug: 'signs-time-for-house-cleanout',
    prompt:
      'Cluttered living room of a house being cleared out, stacked cardboard boxes, old furniture piled up, dusty interior with natural light through windows, photorealistic DSLR photo',
  },
  {
    slug: 'junk-removal-vs-dumpster-rental',
    prompt:
      'Green dumpster container sitting in a suburban driveway next to a white junk removal truck, side by side comparison scene, New England neighborhood, photorealistic DSLR photo',
  },
  {
    slug: 'what-happens-to-your-junk',
    prompt:
      'Organized recycling sorting facility with conveyor belt, separated piles of metal scrap, cardboard, and furniture, industrial space with natural lighting, photorealistic DSLR photo',
  },
  {
    slug: 'construction-debris-removal-guide',
    prompt:
      'Large pile of construction debris — broken drywall, wood scraps, concrete chunks, insulation — on a residential renovation site, photorealistic DSLR photo, daytime',
  },
  {
    slug: 'yard-waste-removal-nh',
    prompt:
      'Large pile of storm-downed branches and yard debris in a New England backyard after winter, bare trees, early spring mud season, New Hampshire, photorealistic DSLR photo',
  },
  {
    slug: 'estate-cleanout-manchester-nh',
    prompt:
      'Large pile of furniture and household items stacked in a residential driveway during an estate cleanout, ranch house in background, New Hampshire, photorealistic DSLR photo',
  },
  {
    slug: 'donate-recycle-what-happens-your-junk',
    prompt:
      'Junk removal truck with back door open, worker sorting usable furniture from general debris — some items set aside for donation, some for recycling — bright day, New Hampshire residential street, photorealistic DSLR photo',
  },
  {
    slug: 'junk-removal-before-selling-home-manchester-nh',
    prompt:
      'Clean open garage and tidy basement side by side in a New Hampshire colonial home staged for real estate listing, bright natural light, empty shelves, freshly swept floors, photorealistic DSLR photo',
  },
];

// ── Gallery job photos ────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  {
    filename: 'gallery-01',
    prompt:
      'Full junk removal truck loaded with old furniture, mattresses, and household items, residential driveway, sunny afternoon, photorealistic DSLR photo',
  },
  {
    filename: 'gallery-02',
    prompt:
      'Cluttered garage packed with cardboard boxes, old appliances, furniture, and miscellaneous junk before a cleanout, photorealistic DSLR photo',
  },
  {
    filename: 'gallery-03',
    prompt:
      'Clean empty swept garage after professional junk removal, bare concrete floor, empty shelves, natural daylight, photorealistic DSLR photo',
  },
  {
    filename: 'gallery-04',
    prompt:
      'Construction debris pile at renovation site — broken drywall, lumber, concrete rubble being loaded into a truck, photorealistic DSLR photo',
  },
  {
    filename: 'gallery-05',
    prompt:
      'Large pile of yard waste — branches, dead shrubs, garden debris — in a New Hampshire backyard, spring season, photorealistic DSLR photo',
  },
  {
    filename: 'gallery-06',
    prompt:
      'Old sofa and mattress being carried down stairs by workers to a junk removal truck, residential home, photorealistic DSLR photo, shot from outside',
  },
  {
    filename: 'gallery-07',
    prompt:
      'Sorted donation items — usable furniture and household goods — organized in a neat row separate from junk pile, bright interior lighting, photorealistic DSLR photo',
  },
  {
    filename: 'gallery-08',
    prompt:
      'Before and after diptych: messy cluttered basement full of old junk on the left, same basement clean and empty on the right, photorealistic DSLR photos',
  },
];

async function generateImage(prompt, outputPath) {
  console.log(`  Generating: ${outputPath.split('/').pop()}`);

  const result = await fal.subscribe('fal-ai/flux/schnell', {
    input: {
      prompt,
      image_size: 'landscape_16_9',
      num_inference_steps: 4,
      num_images: 1,
      enable_safety_checker: false,
    },
    logs: false,
  });

  const imageUrl = result.data.images[0].url;

  // Download the image
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to download: ${imageUrl}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, buffer);
  console.log(`  Saved: ${outputPath.replace(ROOT, '')}`);
}

async function main() {
  if (!process.env.FAL_KEY) {
    console.error('ERROR: FAL_KEY not set. Add it to .env.local');
    process.exit(1);
  }

  console.log('\n── Blog card images ──────────────────────────────');
  for (const { slug, prompt } of BLOG_IMAGES) {
    const outPath = join(ROOT, 'public', 'images', 'blog', `${slug}.jpg`);
    await generateImage(prompt, outPath);
  }

  console.log('\n── Gallery photos ────────────────────────────────');
  for (const { filename, prompt } of GALLERY_IMAGES) {
    const outPath = join(ROOT, 'public', 'images', 'gallery', `${filename}.jpg`);
    await generateImage(prompt, outPath);
  }

  console.log('\n✓ All images generated successfully\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
