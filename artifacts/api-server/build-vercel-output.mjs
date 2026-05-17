/**
 * Generates the Vercel Build Output API (v3) structure from our pre-built bundle.
 * Vercel invokes this as buildCommand; it creates .vercel/output/ so Vercel knows
 * exactly what to deploy without any framework detection or pnpm install.
 *
 * Docs: https://vercel.com/docs/build-output-api/v3
 */
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const out = resolve(root, ".vercel/output");

// Create function directory
await mkdir(`${out}/functions/index.func`, { recursive: true });

// Copy the pre-built CJS bundle
await copyFile(resolve(root, "api/index.js"), `${out}/functions/index.func/index.js`);

// Vercel function config (Node.js runtime, CJS handler)
await writeFile(
  `${out}/functions/index.func/.vc-config.json`,
  JSON.stringify({
    runtime: "nodejs20.x",
    handler: "index.js",
    launcherType: "Nodejs",
  }),
);

// Router: forward all requests to the /index function
await writeFile(
  `${out}/config.json`,
  JSON.stringify({
    version: 3,
    routes: [{ src: "/(.*)", dest: "/index" }],
  }),
);

console.log("✓ Vercel Build Output API structure created at .vercel/output/");
