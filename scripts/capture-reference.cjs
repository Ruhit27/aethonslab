/**
 * Captures reference screenshots of a site's homepage, section by section,
 * at desktop and mobile sizes. Output is for internal design reference only
 * (reference/ is gitignored).
 *
 *   NODE_PATH=<dir with playwright-core> node scripts/capture-reference.cjs [url] [outDir]
 *
 * Uses the installed Google Chrome (channel "chrome"), so no browser download.
 */
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS so NODE_PATH can resolve playwright-core */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright-core");

const URL = process.argv[2] ?? "https://www.ayautomate.com/";
const OUT = process.argv[3] ?? path.join(__dirname, "..", "reference", "ayautomate");

const SIZES = {
  desktop: { viewport: { width: 1440, height: 900 }, isMobile: false },
  mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "section";

async function dismissCookies(page) {
  // Most privacy-preserving choice first.
  for (const label of [/reject all/i, /decline/i, /necessary only/i, /only necessary/i, /reject/i]) {
    const button = page.getByRole("button", { name: label }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      await sleep(500);
      return;
    }
  }
}

/** Closes the lead popup if it's on screen. Called before every screenshot. */
async function closePopup(page) {
  const button = page.getByText("Maybe next time", { exact: true }).first();
  if (await button.isVisible().catch(() => false)) {
    await button.click().catch(() => {});
    await sleep(600);
  }
}

/** Scrolls top to bottom in small steps so lazy and scroll-triggered content renders. */
async function warmUp(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round(page.viewportSize().height * 0.6);
  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await sleep(350);
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await sleep(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(800);
}

async function capture(browser, name, opts) {
  const dir = path.join(OUT, name);
  fs.mkdirSync(dir, { recursive: true });
  const context = await browser.newContext({ ...opts, colorScheme: "light", deviceScaleFactor: 1 });
  const page = await context.newPage();
  const index = [];

  // A lead popup opens partway through the visit; dismiss it whenever it shows.
  await page.addLocatorHandler(page.getByText("Maybe next time", { exact: true }), async (button) => {
    await button.click();
    await sleep(400);
  });

  await page.goto(URL, { waitUntil: "load", timeout: 90_000 });
  await sleep(3000);
  await dismissCookies(page);
  await warmUp(page);

  await closePopup(page);
  await page.screenshot({ path: path.join(dir, "full-page.png"), fullPage: true });
  index.push(["full-page.png", "Whole page"]);

  // The nav bar on its own (it's fixed, so it isn't a <section>).
  const navHeight = await page.evaluate(() => {
    const nav = document.querySelector("nav");
    return nav ? Math.ceil(nav.getBoundingClientRect().bottom) : 80;
  });
  await closePopup(page);
  await page.screenshot({
    path: path.join(dir, "00-header.png"),
    clip: { x: 0, y: 0, width: page.viewportSize().width, height: Math.max(48, navHeight) },
  });
  index.push(["00-header.png", "Navigation bar"]);

  // Header, then every <section> not nested in another section, then the footer, in DOM order.
  const handles = await page.$$(
    "body header:not(section header), section:not(section section), body footer:not(section footer)",
  );
  let n = 0;
  for (const handle of handles) {
    const box = await handle.boundingBox();
    if (!box || box.height < 40 || box.width < 100) continue;
    const label = await handle.evaluate((el) => {
      const heading = el.querySelector("h1, h2, h3");
      return el.id || (heading?.textContent ?? "").trim().split(/\s+/).slice(0, 5).join(" ") || el.tagName;
    });
    const tag = await handle.evaluate((el) => el.tagName.toLowerCase());
    n += 1;
    const file = `${String(n).padStart(2, "0")}-${slug(label)}.png`;
    await handle.scrollIntoViewIfNeeded().catch(() => {});
    await sleep(700);
    await closePopup(page);
    await handle.screenshot({ path: path.join(dir, file) }).catch((e) => console.warn(file, e.message));
    index.push([file, `<${tag}> ${label} (${Math.round(box.height)}px tall)`]);
  }

  // Screen-by-screen backup.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = page.viewportSize().height;
  for (let i = 0, y = 0; y < height; i++, y += vh) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await sleep(500);
    const file = `viewport-${String(i + 1).padStart(2, "0")}.png`;
    await closePopup(page);
    await page.screenshot({ path: path.join(dir, file) });
    index.push([file, `Screen at scroll ${y}px`]);
  }

  // Open mega-menus (desktop navigation only).
  if (!opts.isMobile) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(600);
    for (const item of ["Services", "Resources"]) {
      const trigger = page.locator("header, nav").getByText(item, { exact: true }).first();
      if (!(await trigger.isVisible().catch(() => false))) continue;
      await trigger.hover({ timeout: 10_000 }).catch(() => {});
      await sleep(900);
      const file = `menu-${item.toLowerCase()}.png`;
      await closePopup(page);
      await trigger.hover({ timeout: 10_000 }).catch(() => {});
      await sleep(600);
      await page.screenshot({ path: path.join(dir, file) });
      index.push([file, `${item} menu open`]);
      await page.mouse.move(720, 700);
      await sleep(500);
    }
  }

  await context.close();
  return index;
}

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const lines = [`# Reference screenshots: ${URL}`, "", `Captured ${new Date().toISOString()}`, ""];
  for (const [name, opts] of Object.entries(SIZES)) {
    const index = await capture(browser, name, opts);
    lines.push(`## ${name} (${opts.viewport.width}×${opts.viewport.height})`, "");
    for (const [file, what] of index) lines.push(`- [${file}](${name}/${file}) — ${what}`);
    lines.push("");
    console.log(`${name}: ${index.length} files`);
  }
  fs.writeFileSync(path.join(OUT, "index.md"), lines.join("\n"));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
