/**
 * Draws the homepage hero background: an original pixel-art landscape (sky,
 * sun, dithered clouds, three snowy mountain ranges) and saves day and night
 * versions as .webp in public/art/.
 *
 *   node scripts/generate-hero-art.mjs [--seed 7] [--out public/art] [--name hero-landscape]
 *
 * Everything is deterministic for a given seed. Tweak the constants below and
 * re-run to retune; change the seed for a new layout.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, i, all) => {
    if (arg.startsWith("--")) pairs.push([arg.slice(2), all[i + 1]?.startsWith("--") ? true : (all[i + 1] ?? true)]);
    return pairs;
  }, []),
);

const SEED = Number(args.seed ?? 7);
const OUT_DIR = args.out ?? "public/art";
const NAME = args.name ?? "hero-landscape";

/** Art-pixel grid, and how many screen pixels each art pixel becomes. */
const W = 480;
const H = 270;
const SCALE = 4;

const LAYOUT = {
  sun: { x: 0.17, y: 0.3, r: 12 },
  /** Centre of the sky kept clear of clouds for the headline. */
  calm: { x: 0.5, y: 0.42, rx: 0.13, ry: 0.22, strength: 0.55 },
  cloudBands: [
    { y: 0.07, thickness: 0.06, weight: 1 },
    { y: 0.19, thickness: 0.05, weight: 0.85 },
    { y: 0.32, thickness: 0.06, weight: 0.95 },
    { y: 0.46, thickness: 0.05, weight: 0.8 },
    { y: 0.56, thickness: 0.03, weight: 0.6 },
  ],
  cumulus: [
    { x: 0.08, y: 0.42, r: 0.11 },
    { x: 0.86, y: 0.3, r: 0.13 },
    { x: 0.66, y: 0.12, r: 0.09 },
  ],
  /** Back to front. base/amp are fractions of the height. */
  ranges: [
    { base: 0.78, amp: 0.2, freq: 0.0065, haze: 0.55, snow: 0.6 },
    { base: 0.9, amp: 0.22, freq: 0.0085, haze: 0.22, snow: 0.5 },
    { base: 1.04, amp: 0.2, freq: 0.011, haze: 0.0, snow: 0.35 },
  ],
};

const DAY = {
  sky: ["#7ea4eb", "#8fb2ef", "#a3c1f2", "#bccff5", "#d3dcf7", "#e6e3f5", "#f3e5ea", "#f8e4dc"],
  sun: { core: "#f39a62", inner: "#f6ad7a", halo: ["#f8c7a4", "#f6d9c6"] },
  cloud: { lit: "#fff3df", mid: "#fbf7f3", shade: "#c9c3ef", deep: "#a7a1e0" },
  snow: { lit: "#fff6ec", warm: "#f9e2cc", shade: "#cdc6f1", deep: "#a59ede" },
  rock: { lit: "#eab38a", warm: "#d99a86", mid: "#b39ad1", shade: "#8b82c8", deep: "#6c64ad" },
  haze: "#e4def6",
  stars: null,
};

const NIGHT = {
  sky: ["#0d0f2b", "#12153a", "#181b49", "#1f2258", "#272a65", "#30306c", "#3a3670", "#443d72"],
  sun: { core: "#eeeaff", inner: "#d8d4fb", halo: ["#6f6cb3", "#4a4890"] },
  cloud: { lit: "#6b68a8", mid: "#56538f", shade: "#403d78", deep: "#302d62" },
  snow: { lit: "#a9acdf", warm: "#9396cf", shade: "#6466a6", deep: "#4b4c8a" },
  rock: { lit: "#57549a", warm: "#4b4889", mid: "#3d3a74", shade: "#2f2d62", deep: "#22204a" },
  haze: "#2b2a5a",
  stars: "#f4f2ff",
};

/* ---------- Seeded noise ---------- */

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise(seed) {
  const rand = mulberry32(seed);
  const perm = new Uint8Array(512);
  const values = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
    values[i] = rand();
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
  const lattice = (x, y) => values[perm[(perm[x & 255] + y) & 255]];
  const smooth = (t) => t * t * (3 - 2 * t);

  const value = (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const tx = smooth(x - xi);
    const ty = smooth(y - yi);
    const a = lattice(xi, yi);
    const b = lattice(xi + 1, yi);
    const c = lattice(xi, yi + 1);
    const d = lattice(xi + 1, yi + 1);
    return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
  };

  const fbm = (x, y, octaves = 5) => {
    let sum = 0;
    let amp = 0.5;
    let freq = 1;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += value(x * freq, y * freq) * amp;
      norm += amp;
      amp *= 0.5;
      freq *= 2;
    }
    return sum / norm;
  };

  const ridged = (x, y, octaves = 5) => {
    let sum = 0;
    let amp = 0.5;
    let freq = 1;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += (1 - Math.abs(value(x * freq, y * freq) * 2 - 1)) ** 2 * amp;
      norm += amp;
      amp *= 0.5;
      freq *= 2.1;
    }
    return sum / norm;
  };

  return { value, fbm, ridged, rand };
}

/* ---------- Colour helpers ---------- */

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/** 4x4 Bayer matrix, normalised to 0..1, for ordered dithering. */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const bayer = (x, y) => BAYER[(y & 3) * 4 + (x & 3)];

/** Picks between neighbouring colours in a ramp with ordered dithering. */
function ramp(colors, t, x, y) {
  const f = Math.min(Math.max(t, 0), 0.9999) * (colors.length - 1);
  const i = Math.floor(f);
  return f - i > bayer(x, y) ? colors[Math.min(i + 1, colors.length - 1)] : colors[i];
}

/* ---------- Scene ---------- */

function render(palette, seed) {
  const n = makeNoise(seed);
  const pal = {
    sky: palette.sky.map(hex),
    sun: { core: hex(palette.sun.core), inner: hex(palette.sun.inner), halo: palette.sun.halo.map(hex) },
    cloud: Object.fromEntries(Object.entries(palette.cloud).map(([k, v]) => [k, hex(v)])),
    snow: Object.fromEntries(Object.entries(palette.snow).map(([k, v]) => [k, hex(v)])),
    rock: Object.fromEntries(Object.entries(palette.rock).map(([k, v]) => [k, hex(v)])),
    haze: hex(palette.haze),
    stars: palette.stars ? hex(palette.stars) : null,
  };
  const img = new Array(W * H);
  const set = (x, y, c) => (img[y * W + x] = c);
  const get = (x, y) => img[y * W + x];

  // 1. Sky
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = (y / (H * 0.78)) ** 1.1 + (n.value(x * 0.02, y * 0.02) - 0.5) * 0.04;
      set(x, y, ramp(pal.sky, t, x, y));
      if (pal.stars && y < H * 0.5 && n.rand() < 0.0025) set(x, y, pal.stars);
    }
  }

  // 2. Sun (or moon)
  const sx = LAYOUT.sun.x * W;
  const sy = LAYOUT.sun.y * H;
  const sr = LAYOUT.sun.r;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const d = Math.hypot(x - sx, y - sy);
      if (d <= sr) {
        set(x, y, d < sr * 0.62 ? pal.sun.core : pal.sun.inner);
      } else if (d < sr * 2.4) {
        const t = (d - sr) / (sr * 1.4);
        if (bayer(x, y) > t) set(x, y, mix(get(x, y), t < 0.5 ? pal.sun.halo[0] : pal.sun.halo[1], 0.75));
      }
    }
  }

  // 3. Clouds: density from streaky bands + puffy clusters, cleared in the centre.
  const density = (x, y) => {
    const u = x / W;
    const v = y / H;
    let env = 0;
    for (const b of LAYOUT.cloudBands) {
      env += b.weight * Math.exp(-(((v - b.y) / b.thickness) ** 2));
    }
    // Low-frequency mask breaks each band into separate drifting streaks.
    const gaps = Math.max(0, n.fbm(x * 0.006 + 19, v * 3 + 2) * 2.4 - 0.6);
    const streak = env * gaps * n.fbm(x * 0.011 + 3.1, y * 0.06 + 7.3);
    let puff = 0;
    for (const c of LAYOUT.cumulus) {
      // Domain warp so the clusters are lumpy rather than round, with flatter bottoms.
      const wx = (n.fbm(x * 0.03 + 40, y * 0.03) - 0.5) * 0.12;
      const wy = (n.fbm(x * 0.03, y * 0.03 + 40) - 0.5) * 0.12;
      const dy = v + wy - c.y;
      const r = Math.hypot((u + wx - c.x) * (W / H) * 0.8, dy > 0 ? dy * 2.2 : dy) / c.r;
      puff = Math.max(puff, Math.max(0, 1 - r) * n.fbm(x * 0.04 + 11, y * 0.05 + 5) * 1.3);
    }
    const c = LAYOUT.calm;
    const calm =
      1 - c.strength * Math.exp(-(((u - c.x) / c.rx) ** 2) - ((v - c.y) / c.ry) ** 2);
    // Keep clouds off the sun so it stays visible.
    const sunGap = 1 - Math.exp(-((Math.hypot(x - LAYOUT.sun.x * W, y - LAYOUT.sun.y * H) / (LAYOUT.sun.r * 2.6)) ** 4));
    return Math.max(streak * 1.25, puff * 2.3) * calm * sunGap;
  };
  const THRESH = 0.42;
  const EDGE = 0.06;
  const cloudTop = H * 0.62;
  for (let y = 0; y < cloudTop; y++) {
    for (let x = 0; x < W; x++) {
      const d = density(x, y);
      if (d < THRESH - EDGE) continue;
      // Soft dithered edge.
      if (d < THRESH && (d - (THRESH - EDGE)) / EDGE < bayer(x, y)) continue;
      const above = density(x, y - 3);
      const below = density(x, y + 3);
      const below2 = density(x, y + 6);
      let c = pal.cloud.mid;
      if (above < THRESH) c = pal.cloud.lit;
      else if (below < THRESH) c = below2 < THRESH - EDGE ? pal.cloud.deep : pal.cloud.shade;
      else if (below2 < THRESH && bayer(x, y) > 0.5) c = pal.cloud.shade;
      set(x, y, c);
    }
  }

  // 4. Mountains, back to front.
  LAYOUT.ranges.forEach((range, ri) => {
    const off = ri * 97.3;
    const top = new Float32Array(W + 2);
    for (let x = -1; x <= W; x++) {
      const h = n.ridged(x * range.freq + off, 0.37 + ri, 4) ** 1.25;
      top[x + 1] = H * range.base - H * range.amp * h * 1.5;
    }
    const peak = Math.min(...top);
    // Ridgeline slope, averaged over a few columns so lighting doesn't flip column to column.
    const smoothSlope = new Float32Array(W);
    for (let x = 0; x < W; x++) {
      let sum = 0;
      for (let k = -3; k <= 3; k++) sum += top[Math.min(W + 1, Math.max(0, x + k))] - top[Math.min(W + 1, Math.max(0, x + k + 2))];
      smoothSlope[x] = sum / 7;
    }
    const snowLine = (x) => top[x + 1] + (H * range.base - peak) * range.snow * (0.55 + n.fbm(x * 0.05 + off, 3) * 0.7);
    for (let x = 0; x < W; x++) {
      const t = Math.max(0, Math.floor(top[x + 1]));
      for (let y = t; y < H; y++) {
        // Facets: a ridged field slanted to follow the slopes; its x-gradient
        // decides which faces catch the light.
        const slant = Math.max(-1, Math.min(1, smoothSlope[x] * 0.4));
        const g = (xx) => n.ridged(xx * 0.022 + (y - t) * 0.012 * slant + off, y * 0.016 + off, 4);
        const near = Math.max(0, 1 - (y - t) / 18); // the ridgeline's own slope matters only near the top
        const light = smoothSlope[x] * 0.22 * near + (g(x - 1) - g(x + 1)) * 3.2 + (n.fbm(x * 0.09, y * 0.09) - 0.5) * 0.3;
        const depth = (y - t) / Math.max(1, H - t);
        const lt = Math.min(1, Math.max(0, 0.5 + light * 0.5 - depth * 0.35));
        let c;
        if (y < snowLine(x)) {
          c = ramp([pal.snow.deep, pal.snow.shade, pal.snow.warm, pal.snow.lit], lt, x, y);
        } else {
          c = ramp([pal.rock.deep, pal.rock.shade, pal.rock.mid, pal.rock.warm, pal.rock.lit], lt, x, y);
        }
        // Atmospheric haze for farther ranges, and mist at each range's foot.
        const foot = Math.max(0, (y - (H * range.base - H * 0.04)) / (H * 0.08));
        const haze = Math.min(0.85, range.haze + foot * 0.6);
        if (haze > 0 && bayer(x, y) < haze) c = mix(c, pal.haze, 0.65);
        set(x, y, c);
      }
    }
  });

  return img;
}

async function save(img, file) {
  const outW = W * SCALE;
  const outH = H * SCALE;
  const buf = Buffer.alloc(outW * outH * 3);
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const c = img[Math.floor(y / SCALE) * W + Math.floor(x / SCALE)];
      const o = (y * outW + x) * 3;
      buf[o] = c[0];
      buf[o + 1] = c[1];
      buf[o + 2] = c[2];
    }
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const info = await sharp(buf, { raw: { width: outW, height: outH, channels: 3 } })
    .webp({ lossless: true, effort: 6 })
    .toFile(file);
  console.log(`${file}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

await save(render(DAY, SEED), path.join(OUT_DIR, `${NAME}.webp`));
await save(render(NIGHT, SEED), path.join(OUT_DIR, `${NAME}-dark.webp`));
