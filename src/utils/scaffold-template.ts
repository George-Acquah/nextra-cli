import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";

import { downloadAndExtractTemplate } from "./download-template.js";
import { patchEslintConfig } from "./patch-eslint.js";
import { patchPackageJson } from "./patch-package-json.js";
import { patchTsconfig } from "./patch-tsconfig.js";

export async function scaffoldTemplate(
  templateName: string,
  targetDir: string,
  branchName: string,
  sharedFiles: string[] | null = null
) {
  const spinner = ora(`Downloading "${templateName}" template...`).start();

  try {
    const templatePath = await downloadAndExtractTemplate(templateName, branchName);
    spinner.text = "Copying template files...";
    await fs.copy(templatePath, targetDir);

    const extractedRoot = path.resolve(templatePath, "../../");

    spinner.text = "Patching shared files...";
    if (!sharedFiles) {
      const pkgPath = path.join(targetDir, "package.json");

      // We MUST patch package.json for feature apps to set the correct name
      if (await fs.pathExists(pkgPath)) {
        spinner.text = "Patching package.json project name...";

        try {
          // Read the file, parse the JSON
          const pkgContent = await fs.readJson(pkgPath);

          // Get the final directory name (which holds the feature- convention)
          const finalProjectName = path.basename(targetDir);

          // Set the 'name' field in package.json to the final project name
          pkgContent.name = finalProjectName;

          // Write the updated JSON back to the file
          await fs.writeJson(pkgPath, pkgContent, { spaces: 2 });
        } catch (error) {
          spinner.fail(
            chalk.red(`Failed to patch package.json in ${pkgPath}.`)
          );
          // Re-throw the error to stop the process if patching fails
          throw error;
        }
      } else {
        // Handle case where a feature template somehow lacks package.json
        spinner.warn(
          chalk.yellow(
            `Warning: package.json not found in ${targetDir}. Skipping name patch.`
          )
        );
      }
      spinner.succeed(
        `Scaffolded "${chalk.green(templateName)}" into ${chalk.cyan(
          targetDir
        )}`
      );
      return;
    }

    for (const filename of sharedFiles) {
      const sourcePath = path.join(extractedRoot, filename);
      const destPath = path.join(targetDir, filename);

      const exists = await fs.pathExists(destPath);

      switch (filename) {
        case "package.json":
          await patchPackageJson(targetDir, sourcePath);
          spinner.info(`Merged ${chalk.cyan("package.json")}`);
          break;
        case "tsconfig.json":
          await patchTsconfig(targetDir, sourcePath);
          spinner.info(`Merged ${chalk.cyan("tsconfig.json")}`);
          break;
        case ".eslintrc.json":
          await patchEslintConfig(targetDir, sourcePath);
          spinner.info(`Merged ${chalk.cyan(".eslintrc.json")}`);
          break;
        default:
          if (!exists) {
            await fs.copy(sourcePath, destPath);
            spinner.info(`Copied ${chalk.cyan(filename)}`);
          } else {
            spinner.warn(`Skipped existing ${chalk.yellow(filename)}`);
          }
          break;
      }
    }

    spinner.succeed(
      `Scaffolded "${chalk.green(templateName)}" into ${chalk.cyan(targetDir)}`
    );
  } catch (error) {
    spinner.fail(
      `❌ Failed to scaffold: ${error instanceof Error ? error.message : error}`
    );
    process.exit(1);
  }
}
