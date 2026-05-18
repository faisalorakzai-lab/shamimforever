/**
 * Builds the CJS bundle for the Vercel serverless function.
 * Output: artifacts/api-server/api/index.js
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { mkdir, rename, rm } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const tmpDir = path.resolve(artifactDir, "api-cjs-tmp");
const apiDir = path.resolve(artifactDir, "api");

await mkdir(tmpDir, { recursive: true });
await mkdir(apiDir, { recursive: true });

await esbuild({
  entryPoints: [path.resolve(artifactDir, "src/vercel-entry.ts")],
  platform: "node",
  bundle: true,
  format: "cjs",
  outdir: tmpDir,
  logLevel: "info",
  external: [
    "*.node",
    "multer",
    "cloudinary",
    "streamifier",
    "sharp",
    "better-sqlite3",
    "sqlite3",
    "canvas",
    "bcrypt",
    "argon2",
    "fsevents",
    "pg-native",
    "nodemailer",
    "@prisma/client",
    "oracledb",
    "mysql2",
    "snappy",
    "playwright",
    "puppeteer",
  ],
  sourcemap: false,
  minify: false,
  plugins: [
    esbuildPluginPino({ transports: ["pino-pretty"] }),
  ],
});

// Move the main bundle to api/index.js
await rename(path.resolve(tmpDir, "vercel-entry.js"), path.resolve(apiDir, "index.js"));
// Clean up temp dir
await rm(tmpDir, { recursive: true, force: true });

console.log("✓ CJS Vercel bundle built at api/index.js");
