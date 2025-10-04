import fs from "fs-extra";
import path from "path";
import os from "os";
import { pipeline } from "stream/promises";
import fetch from "node-fetch";
import extract from "extract-zip";

// Define constants once
const GITHUB_REPO = "George-Acquah/nextra-templates";
const TEMPLATE_DIR_NAME = "templates"; // Name of the directory holding all templates

/**
 * Downloads a template from my GitHub repo and returns path to extracted temp folder.
 * * @param templateName e.g. "base" or "blog"
 * @param branchName The specific Git branch to download (e.g., "main" or "bootstrap-base")
 * @returns path to extracted folder containing the template content
 */
export async function downloadAndExtractTemplate(
  templateName: string,
  branchName: string
): Promise<string> {
  // 1. Compute download URL (GitHub ZIP of the requested branch)
  const zipUrl = `https://codeload.github.com/${GITHUB_REPO}/zip/refs/heads/${branchName}`;

  // 2. Download it to temp file
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "nextra-"));
  const zipPath = path.join(tmpDir, "repo.zip");

  const response = await fetch(zipUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to download template repo from branch "${branchName}": ${response.status} ${response.statusText}`
    );
  }

  const writeStream = fs.createWriteStream(zipPath);
  if (!response.body || typeof (response.body as any).pipe !== "function") {
    throw new Error("Response body is not a Node.js readable stream.");
  }
  await pipeline(response.body as NodeJS.ReadableStream, writeStream);

  // 3. Extract it into temp directory
  const extractDir = path.join(tmpDir, "extracted");
  await fs.mkdir(extractDir);
  await extract(zipPath, { dir: extractDir });

  // 4. Compute the path to the template folder inside the extracted structure
  const extractedRootName = `${path.basename(GITHUB_REPO)}-${branchName}`;
  let candidate: string;

  if (branchName === "feature-bootstrap") {
    // 💡 CRUCIAL FIX: For the lean branch, the contents are at:
    // nextra-templates-bootstrap-base/base/
    candidate = path.join(extractDir, extractedRootName, "base");
  } else {
    // For the main branch, use the nested path structure: /templates/<templateName>
    candidate = path.join(
      extractDir,
      extractedRootName,
      TEMPLATE_DIR_NAME,
      templateName
    );
  }

  // 5. Final check before returning
  if (!(await fs.pathExists(candidate))) {
    throw new Error(
      `Template content not found in branch "${branchName}" at expected path: ${candidate}`
    );
  }

  return candidate;
}
