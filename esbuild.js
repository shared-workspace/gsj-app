import { build } from "esbuild";
import { copyFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const metadata = JSON.parse(readFileSync("./metadata.json", "utf8"));

console.debug(`Building ${metadata.name} v${metadata.version}...`);

build({
  entryPoints: ["src/main.ts"],
  outdir: "dist",
  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: false,
  target: "firefox115", // Since GJS 1.77.2
  format: 'esm',
  platform: "node", // Use 'node' platform for GJS
  external: ["gi://*", "resource://*", "system", "gettext", "cairo"],
})
  .then(() => {
    console.debug(`Built ${metadata.name} v${metadata.version}.`);
    const metaSrc = resolve(__dirname, "metadata.json");
    const metaDist = resolve(__dirname, "dist/metadata.json");
    copyFileSync(metaSrc, metaDist);
    console.log(
      `Build complete. Metadata copied from ${metaSrc} to ${metaDist}`
    );
  })
  .catch((error) => {
    console.error(
      `Failed to build ${metadata.name} v${metadata.version}:`,
      error
    );
    process.exit(1);
  });
