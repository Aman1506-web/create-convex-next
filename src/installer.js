import { execSync } from "child_process";
import { logInfo, logSuccess } from "./logger.js";
import path from "path";

export async function installDeps(dir) {
  let pkgManager = "npm";

  try {
    execSync("pnpm -v", { stdio: "ignore" });
    pkgManager = "pnpm";
  } catch {}

  try {
    execSync("yarn -v", { stdio: "ignore" });
    if (pkgManager !== "pnpm") pkgManager = "yarn";
  } catch {}

  logInfo(`📦 Installing dependencies using ${pkgManager}...`);

  execSync(`${pkgManager} install`, {
    cwd: dir,
    stdio: "inherit"
  });

  logSuccess("✅ Dependencies installed!");
}

// Main Work of this file is DETECT PKG MANAGER + INSTALL dependencies