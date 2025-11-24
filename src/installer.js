// src/installer.js
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import { logInfo, logSuccess } from "./logger.js";

export function mergePackageJson(targetDir, templatePkgPath) {
  const projectPkgPath = path.join(targetDir, "package.json");

  const projectPkg = JSON.parse(fs.readFileSync(projectPkgPath, "utf8"));
  const templatePkg = JSON.parse(fs.readFileSync(templatePkgPath, "utf8"));

  // Merge dependencies safely
  projectPkg.dependencies = {
    ...projectPkg.dependencies,
    ...(templatePkg.dependencies || {})
  };

  projectPkg.devDependencies = {
    ...projectPkg.devDependencies,
    ...(templatePkg.devDependencies || {})
  };

  // Write back merged package.json
  fs.writeFileSync(projectPkgPath, JSON.stringify(projectPkg, null, 2));
}

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
