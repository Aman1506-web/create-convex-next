import fs from "fs-extra";

// Copy a directory, optionally skipping package.json so we can merge it separately.
export async function copyDir(src, dest, { skipPackageJson = false } = {}) {
  if (!fs.existsSync(src)) return; // template might be empty initially

  await fs.copy(src, dest, {
    overwrite: true,
    recursive: true,
    filter: (filePath) =>
      skipPackageJson ? !filePath.endsWith("package.json") : true
  });
}

// it is the REAL WORKING COPY FUNCTION
