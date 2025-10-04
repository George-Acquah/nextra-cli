# Nextra CLI

[![npm version](https://img.shields.io/npm/v/nextra-cli.svg)](https://www.npmjs.com/package/nextra-cli) [![build](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions) [![license](https://img.shields.io/github/license/OWNER/REPO.svg)](LICENSE)

A small, focused command-line tool to scaffold and customize Nextra-based projects and feature apps quickly. It downloads templates, copies files into a target directory, and intelligently patches shared configuration (package.json, tsconfig.json, ESLint) so feature-level apps and monorepos get sensible defaults.

## Quick description

nextra-cli helps you bootstrap Nextra sites and feature apps from templates. It automates:

- Downloading and extracting templates from a remote source.
- Copying and merging shared config files.
- Patching project names and TypeScript/ESLint configs when needed.

This repository contains the CLI entrypoint, utility modules for downloading and patching templates, and the scaffolding logic.

## Features

- Download & extract templates
- Merge shared configuration files without overwriting local changes
- Patch `package.json` name for feature apps
- Handles `tsconfig.json` and `.eslintrc.json` merging
- Informative CLI output with progress spinner and warnings

## Installation

You can run the CLI directly with npx (recommended for one-off usage):

```powershell
npx nextra-cli
# or, if installed globally
npm install -g nextra-cli
nextra-cli
```

If you're developing locally, run it from the project root:

```powershell
node ./bin/nextra.js <args>
```

> Assumption: the published package name is `nextra-cli` and the project exposes a bin entry (`nextra.js`) in the `bin/` folder. If your package name or bin differs, replace the command accordingly.

## Basic usage

The CLI scaffolds a template into a target directory. Example usage (adjust flags to match your CLI implementation):

```powershell
# Scaffold the `nextra-blog` template into ./my-blog
npx nextra-cli init nextra-blog ./my-blog --branch main

# Or when developing locally
node ./bin/nextra.js init nextra-blog ./my-blog --branch main
```

Notes:

- `name` is the name or id of the template to download.
- `template` is the destination folder to scaffold into.
- `--feature` (optional) lets you pick a branch/tag of the template source.

If your CLI exposes a different command layout (for example `npx nextra-cli <template> <dir>`), adapt the examples above.

## How it works (brief)

- The CLI downloads and extracts a template to a temporary directory.
- Files are copied to the target folder.
- For shared files like `package.json`, `tsconfig.json`, and `.eslintrc.json`, the CLI merges or patches rather than overwriting.
- If `package.json` exists in the target and the template is a feature app, the tool sets the `name` field to the target folder name.

## Project structure

Key files and folders in this repo:

- `bin/nextra.js` — CLI entry script (bundled JS for publishing)
- `src/cli.ts` — CLI implementation
- `src/utils/download-template.ts` — download & extract logic
- `src/utils/scaffold-template.ts` — core scaffolding flow (copy + patch)
- `src/utils/patch-*.ts` — per-config patching helpers

## Contributing

Contributions are welcome. A few suggestions to get started:

- Run the CLI locally and explore templates to reproduce issues.
- Add unit tests for patching helpers to verify merge behavior.
- Improve the error messages and spinner states for better UX.

If you open issues or PRs, include:

- The command you ran
- The template used and branch (if any)
- The platform/Node version

## Tests & Quality gates

- Add simple unit tests around the `patch-*.ts` utilities to cover merging behavior.
- Run `npm run lint` and `npm test` (or your project-specific scripts) before opening a PR.

## License

Specify your license in the repository root (for example, `LICENSE` file). If you use a permissive license, add a short summary here.

## Contact / Maintainers

Add maintainer information or preferred contact channels here (GitHub issues, emails, etc.).

---

## Note about badges

The badges above are examples. Replace `github.com/George-Acquah` with your GitHub repository owner and name (for example `George-Acquah/nextra-cli`) to enable the build and license badges to work correctly. The npm badge points to the `nextra-cli` package on npm; if your package uses a different name, update the npm badge URL accordingly.
