# Contributing to Nextra CLI

Thanks for considering contributing! This document explains the recommended workflow, coding standards, testing, and the changelog/release process.

## Table of Contents

- How to contribute
- Branching and PR workflow
- Running locally & tests
- PR checklist
- Changelog & releases
- Code of conduct

## Code of Conduct

By participating in this project, you agree to follow the repository's **Code of Conduct** (add or link to one here). Please be respectful and helpful.

## Project Setup
The project uses **pnpm** as its package manager and is written in **TypeScript**. 
1. Fork the repository and clone your fork locally.
2. **Install dependencies** using the correct package manager:

```powershell
pnpm install
```

## Running Locally & Testing
All scripts are run using pnpm.
```powershell
**Command**     **Action**

`pnpm dev`    Runs the CLI source code directly using `tsx` for quick development.

`pnpm build`  Compiles the TypeScript source (`src/cli.ts`) into the JavaScript executable (`dist/cli.js`).

`pnpm test`   Runs the unit tests (if defined).
```
**Linter and Formatting:** Ensure your code is formatted and passes linting before committing:
```powershell
pnpm lint:fix
```

## Git & PR Workflow
1. Create a new branch for your work:
```powershell
git checkout -b feat/descriptive-change
```
2. Implement your change, ensuring your commits follow the convention below.

3. Open a PR from your branch to the `main` branch.

   - Use descriptive branch names like `feat/add-feature-flag`, `fix/cli-template-path`, or `chore/update-dependencies`.

  - Keep PRs focused and small when possible.

  - Reference related issues (e.g., "Fixes #123") in the PR description.

## Commit Message Format (Crucial)
We use Conventional Commits to automate changelog generation and versioning (`standard-version`). Your PR will **not be merged** if your commits do not follow this structure:

The format must be: `<type>(<scope>): <short description>`

```powershell
Type    Purpose & Versioning                                Example

`feat`    New features (triggers a Minor version bump)        `feat: add --feature flag support`

`fix`     Bug fixes (triggers a Patch version bump)           `fix: correct path resolution in `scaffoldTemplate

`chore`   Maintenance, tooling, dependency updates            `chore: update pnpm lockfile`

`docs`    Documentation-only changes                          `docs: add contributing guide`
```

If merging multiple commits, please Squash them into a single commit with a valid Conventional Commit type before merging.

## Pull Request checklist

Before requesting review, ensure your PR:

- [ ] `Code of Conduct`: You have read and agree to the Code of Conduct.
- [ ] `Conventional` Commits: Your squashed PR title uses a valid Conventional Commit type (feat:, fix:, etc.).
- [ ] `CI Passes`: The GitHub Actions workflow (CI) has successfully passed the build and test steps.
- [ ] Tests: Includes unit tests for new behavior or bug fixes when applicable.
- [ ] `Cleanliness`: Passes all local linting and formatting checks (pnpm lint:fix).

## Changelog & Releases
You should NOT manually edit the CHANGELOG.md or bump the version in package.json.

- The repository uses automated tooling (standard-version and GitHub Actions) to generate the changelog and publish new versions.

- The system determines the next version bump (patch, minor, or major) automatically based on the feat: and fix: commits you merge into main.

Your only responsibility regarding releases is to ensure your commit messages are correct.
---