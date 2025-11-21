#!/usr/bin/env node

import { runPrompts } from "../src/prompts.js";
import { scaffoldProject } from "../src/scaffold.js";
import { installDeps } from "../src/installer.js";
import { logInfo, logSuccess } from "../src/logger.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  logInfo("🚀 Starting create-convex-next...");

  const answers = await runPrompts();

  const projectDir = path.resolve(process.cwd(), answers.projectName);

  await scaffoldProject(projectDir, answers);

  if (answers.installDeps) {
    await installDeps(projectDir);
  }

  logSuccess("🎉 Project created successfully!");
}

main().catch((err) => {
  console.error("❌ CLI Error:", err);
  process.exit(1);
});
