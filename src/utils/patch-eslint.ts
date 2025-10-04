import fs from "fs-extra";
import path from "path";

export async function patchEslintConfig(
  templateDir: string,
  sharedEslintPath: string
) {
  const targetPath = path.join(templateDir, ".eslintrc.json");

  if (!(await fs.pathExists(targetPath))) {
    await fs.copy(sharedEslintPath, targetPath);
    return;
  }

  const templateCfg = await fs.readJSON(targetPath);
  const sharedCfg = await fs.readJSON(sharedEslintPath);

  // Merge extends (flatten + dedupe)
  const toArray = (val: any) =>
    (Array.isArray(val) ? val : [val]).filter(Boolean);

  const extendsSet = new Set([
    ...toArray(sharedCfg.extends),
    ...toArray(templateCfg.extends),
  ]);

  templateCfg.extends = Array.from(extendsSet);

  // Merge rules (template overrides shared)
  templateCfg.rules = {
    ...sharedCfg.rules,
    ...templateCfg.rules,
  };

  await fs.writeJSON(targetPath, templateCfg, { spaces: 2 });
}
