import prompts from "prompts";
import path from "path";
import { scaffoldTemplate } from "./utils/scaffold-template.js";
import { Command } from "commander"; // 💡 Use Commander
import { slugify } from "./utils/slugify.js";

async function main() {
  // 1. Setup Commander and parse arguments
  const program = new Command();

  program
    .option(
      "-f, --feature",
      "Enable lean feature setup and skip template selection."
    )
    .option(
      "-n, --name <name>",
      'Project name (use "." for current directory).'
    )
    .option(
      "-t, --template <template>",
      "Specify the template to use (e.g., base, blog)."
    )
    .parse(process.argv);

  const options = program.opts();

  // 2. Extract flags and determine feature mode
  const isFeatureBootstrap = !!options.feature;
  let templateArg = options.template;
  let nameArg = options.name;

  // --- Template Determination and Share Files ---
  let finalTemplate;
  // Share files is NULL if --feature is passed, otherwise it uses the default list
  let shareFiles: string[] | null = [
    "package.json",
    "tsconfig.json",
    ".eslintrc.json",
    ".prettierrc",
  ];

  if (isFeatureBootstrap) {
    // 💡 If --feature is passed, always use 'bootstrap-base' branch and null shareFiles.
    finalTemplate = "bootstrap-base";
    shareFiles = null;
  } else if (templateArg) {
    // Use template passed via argument
    finalTemplate = templateArg;
  } else {
    // Interactive prompt for template
    const templateResponse = await prompts({
      type: "select",
      name: "template",
      message: "Choose a template to start with:",
      choices: [
        { title: "Base", value: "base" },
        { title: "Blog", value: "blog" },
        { title: "Theme + ShadCN", value: "theme" },
      ],
    });
    if (!templateResponse.template) {
      console.log("❌ Cancelled");
      process.exit(1);
    }
    finalTemplate = templateResponse.template;
  }

  // --- Project Name Determination ---
  let finalProjectName;

  if (nameArg) {
    // Use name passed via argument
    finalProjectName = nameArg;
  } else {
    // Interactive prompt for project name
    const nameResponse = await prompts({
      type: "text",
      name: "projectName",
      message: `Project name (use "." for current directory):`,
      initial: isFeatureBootstrap ? "my-feature-app" : "my-app",
    });
    if (!nameResponse.projectName) {
      console.log("❌ Cancelled");
      process.exit(1);
    }
    finalProjectName = nameResponse.projectName;
  }

  // --- Apply Naming Consistency Rules (Only for --feature) ---
  let targetDirName = finalProjectName;

  if (isFeatureBootstrap) {
    if (finalProjectName !== ".") {
      // Sluggify the name
      const slug = slugify(finalProjectName);

      // Append 'feature-' only if the slug doesn't already contain 'feature'
      if (!slug.startsWith("feature-")) {
        targetDirName = `feature-${slug}`;
      } else {
        targetDirName = slug;
      }
    }
    // If finalProjectName is '.', targetDirName remains '.'
  }

  // --- Final Scaffold Execution ---
  const targetDir =
    targetDirName === "."
      ? process.cwd()
      : path.resolve(process.cwd(), targetDirName);

  const templateFolderName = isFeatureBootstrap ? "base" : finalTemplate;
  const branchToDownload = isFeatureBootstrap
    ? "feature-bootstrap"
    : finalTemplate;

  // scaffoldTemplate now receives finalTemplate (branch name) and shareFiles (null or array)
  await scaffoldTemplate(templateFolderName, targetDir, branchToDownload, shareFiles);

  console.log(`\n🎉 All done! Next steps:`);
  if (targetDirName !== ".") {
    console.log(`  cd ${targetDirName}`);
  }
  console.log(`  pnpm install`);
  console.log(`  pnpm dev\n`);
}

main();
