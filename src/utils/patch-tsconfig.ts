import fs from "fs-extra";
import path from "path";
/**  **/
export async function patchTsconfig(
  templateDir: string,
  sharedTsconfigPath: string
) {
  const targetPath = path.join(templateDir, "tsconfig.json");

  if (!(await fs.pathExists(targetPath))) {
    await fs.copy(sharedTsconfigPath, targetPath);
    return;
  }

  const templateTs = await fs.readJSON(targetPath);
  const sharedTs = await fs.readJSON(sharedTsconfigPath);

  // Deep merge compilerOptions
  templateTs.compilerOptions = {
    ...sharedTs.compilerOptions,
    ...templateTs.compilerOptions,
  };

  // Merge includes
  templateTs.include = Array.from(
    new Set([...(sharedTs.include || []), ...(templateTs.include || [])])
  );

  // Merge excludes
  templateTs.exclude = Array.from(
    new Set([...(sharedTs.exclude || []), ...(templateTs.exclude || [])])
  );

  await fs.writeJSON(targetPath, templateTs, { spaces: 2 });
}
