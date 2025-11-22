#!/usr/bin/env node

import { runPrompts } from "../src/prompts.js";
import { scaffoldProject } from "../src/scaffold.js";
import { installDeps } from "../src/installer.js";
import { logInfo, logSuccess, logError } from "../src/logger.js";

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    logInfo("⚡ create-convex-next starting...");

    const answers = await runPrompts();

    const targetDir = path.join(process.cwd(), answers.projectName);

    // Create folder if doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    logInfo("📁 Creating project structure...");

    // Copy templates based on options
    await scaffoldProject(targetDir, answers);

    // Install dependencies if selected
    if (answers.installDeps) {
      await installDeps(targetDir);
    }

    logSuccess(`\n🎉 Project created successfully!`);
    logSuccess(`👉 cd ${answers.projectName}`);
    logSuccess(`👉 npm run dev`);
  } catch (err) {
    logError("❌ Error occurred:");
    console.error(err);
    process.exit(1);
  }
}

main();

