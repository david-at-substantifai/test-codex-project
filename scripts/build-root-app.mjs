import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const tauriConfigPath = join(projectRoot, "src-tauri", "tauri.conf.json");
const tauriConfig = JSON.parse(readFileSync(tauriConfigPath, "utf8"));
const productName = tauriConfig.productName ?? "Tauri App";

if (process.platform !== "darwin") {
  console.error("This build script currently expects macOS so it can create a .app bundle.");
  process.exit(1);
}

const tauriArgs = ["tauri", "build", "--bundles", "app"];
const command = process.platform === "win32" ? "npx.cmd" : "npx";
const build = spawnSync(command, tauriArgs, {
  cwd: projectRoot,
  stdio: "inherit",
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const appName = `${productName}.app`;
const bundlePath = join(
  projectRoot,
  "src-tauri",
  "target",
  "release",
  "bundle",
  "macos",
  appName,
);
const rootAppPath = join(projectRoot, appName);

if (!existsSync(bundlePath)) {
  console.error(`Expected bundle not found at ${bundlePath}`);
  process.exit(1);
}

mkdirSync(projectRoot, { recursive: true });
rmSync(rootAppPath, { recursive: true, force: true });
cpSync(bundlePath, rootAppPath, { recursive: true });

console.log(`Copied app bundle to ${rootAppPath}`);
