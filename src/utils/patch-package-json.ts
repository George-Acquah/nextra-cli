import fs from "fs-extra";
import path from "path";

type PackageJson = {
  name?: string;
  version?: string;
  // scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  workspaces?: string[];
  [key: string]: any;
};

export async function patchPackageJson(
  templateDir: string,
  sharedPackageJsonPath: string
) {
  const targetPath = path.join(templateDir, "package.json");

  if (!(await fs.pathExists(targetPath))) {
    // If there's no package.json in template, just copy
    await fs.copy(sharedPackageJsonPath, targetPath);
    return;
  }

  const templatePkg: PackageJson = await fs.readJSON(targetPath);
  const sharedPkg: PackageJson = await fs.readJSON(sharedPackageJsonPath);

  // Merge scripts
  templatePkg.scripts = {
    ...sharedPkg.scripts,
    ...templatePkg.scripts, // template overrides shared
  };

  // Merge dependencies
  templatePkg.dependencies = {
    ...sharedPkg.dependencies,
    ...templatePkg.dependencies,
  };

  // Merge devDependencies
  templatePkg.devDependencies = {
    ...sharedPkg.devDependencies,
    ...templatePkg.devDependencies,
  };

  // Remove `workspaces` and other monorepo-specific props
  delete templatePkg.workspaces;
  delete templatePkg.packageManager;

  await fs.writeJSON(targetPath, templatePkg, { spaces: 2 });
}
