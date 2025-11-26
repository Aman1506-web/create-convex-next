// src/scaffold.js
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { logInfo } from "./logger.js";
import { copyDir } from "./utils/copyDir.js";
import { mergePackageJson } from "./installer.js";

function appendEnvKeys(envPath, keys) {
  if (!fs.existsSync(envPath)) fs.writeFileSync(envPath, "");
  const content = fs.readFileSync(envPath, "utf8");
  const missing = keys.filter((key) => !content.includes(key));
  if (missing.length) {
    fs.appendFileSync(
      envPath,
      "\n" + missing.map((k) => `${k}=`).join("\n") + "\n"
    );
  }
}

export async function scaffoldProject(targetDir, answers) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const templateRoot = path.join(__dirname, "..", "templates");

  // 1. Base Next.js template
  logInfo("📦 Copying base Next.js template...");
  await copyDir(path.join(templateRoot, "base-next"), targetDir);

  const envPath = path.join(targetDir, ".env.example");

  // 2. Tailwind
  if (answers.useTailwind) {
    logInfo("🎨 Adding Tailwind...");
    await copyDir(path.join(templateRoot, "tailwind"), targetDir, {
      skipPackageJson: true
    });
    mergePackageJson(
      targetDir,
      path.join(templateRoot, "tailwind", "package.json")
    );
  }

  // 3. ShadCN
  if (answers.useShadcn) {
    logInfo("✨ Adding ShadCN UI...");
    await copyDir(path.join(templateRoot, "shadcn"), targetDir, {
      skipPackageJson: true
    });
    mergePackageJson(
      targetDir,
      path.join(templateRoot, "shadcn", "package.json")
    );
  }

  // 4. Convex
  if (answers.useConvex) {
    logInfo("📡 Adding Convex setup...");
    await copyDir(path.join(templateRoot, "convex"), targetDir, {
      skipPackageJson: true,
      filter: (p) => !p.endsWith(".env.example")
    });
    mergePackageJson(
      targetDir,
      path.join(templateRoot, "convex", "package.json")
    );
    appendEnvKeys(envPath, [
      "NEXT_PUBLIC_CONVEX_URL",
      "CLERK_JWT_ISSUER_DOMAIN",
      "CLERK_WEBHOOK_SECRET"
    ]);
  }

  // 5. Clerk
  if (answers.useClerk) {
    logInfo("🔐 Adding Clerk Auth...");
    await copyDir(path.join(templateRoot, "clerk"), targetDir, {
      skipPackageJson: true,
      filter: (p) => !p.endsWith(".env.example")
    });
    mergePackageJson(
      targetDir,
      path.join(templateRoot, "clerk", "package.json")
    );
    appendEnvKeys(envPath, [
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      "CLERK_SECRET_KEY"
    ]);
  }

  // 6. Dodo Payments
  if (answers.useDodo) {
    logInfo("💳 Adding DodoPayments integration...");
    await copyDir(path.join(templateRoot, "dodo"), targetDir);
  }
}
