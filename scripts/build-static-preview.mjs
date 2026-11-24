// Builds a static, backend-free preview into ./out (no API routes).
// Forms in this preview will show "submission service not connected".
// Pass --portable to also rename Next's "_next" asset folder and drop
// underscore-prefixed files, for hosts that reserve "_" paths.
import { execSync } from "node:child_process";
import { existsSync, renameSync, readdirSync, statSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const api = "app/api";
const parked = ".api-parked";
if (existsSync(api)) renameSync(api, parked);
try {
  execSync("npx next build", { stdio: "inherit", env: { ...process.env, NEXT_OUTPUT: "export" } });
} finally {
  if (existsSync(parked)) renameSync(parked, api);
}

if (process.argv.includes("--portable")) {
  const out = "out";
  renameSync(join(out, "_next"), join(out, "nx-static"));
  const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  for (const f of walk(out)) {
    const base = f.split("/").pop();
    if (base.startsWith("_") || f.startsWith(join(out, "_not-found"))) { rmSync(f); continue; }
    if (/\.(html|js|css|txt)$/.test(f)) {
      const s = readFileSync(f, "utf8");
      if (s.includes("/_next/")) writeFileSync(f, s.replaceAll("/_next/", "/nx-static/"));
    }
  }
  if (existsSync(join(out, "_not-found"))) rmSync(join(out, "_not-found"), { recursive: true });
  console.log("Portable preview ready in ./out");
}
