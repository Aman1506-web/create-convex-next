import fs from "fs-extra";
import path from "path";
import { logInfo } from "./logger.js";
import { copyDir } from "./utils/copyDir.js";

export async function scaffoldProject(targetDir, answers) {
  const templateRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "templates");

  // 1. Base Next.js template
  logInfo("📦 Copying base Next.js template...");
  await copyDir(path.join(templateRoot, "base-next"), targetDir);

  // 2. Tailwind
  if (answers.useTailwind) {
    logInfo("🎨 Adding Tailwind...");
    await copyDir(path.join(templateRoot, "tailwind"), targetDir);
  }

  // 3. ShadCN
  if (answers.useShadcn) {
    logInfo("✨ Adding ShadCN UI...");
    await copyDir(path.join(templateRoot, "shadcn"), targetDir);
  }

  // 4. Convex
  if (answers.useConvex) {
    logInfo("📡 Adding Convex setup...");
    await copyDir(path.join(templateRoot, "convex"), targetDir);
  }

  // 5. Clerk
  if (answers.useClerk) {
    logInfo("🔐 Adding Clerk Auth...");
    await copyDir(path.join(templateRoot, "clerk"), targetDir);
  }

  // 6. Dodo Payments
  if (answers.useDodo) {
    logInfo("💳 Adding DodoPayments integration...");
    await copyDir(path.join(templateRoot, "dodo"), targetDir);
  }
}


// templates are empty right now but copy logic is ready
