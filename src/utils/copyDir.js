import fs from "fs-extra";

export async function copyDir(src, dest) {
  if (!fs.existsSync(src)) return; // template might be empty initially

  await fs.copy(src, dest, {
    overwrite: true,
    recursive: true
  });
}

// it is the REAL WORKING COPY FUNCTION