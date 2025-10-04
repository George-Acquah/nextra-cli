# Contributing to Nextra CLI

Thanks for considering contributing! This document explains the recommended workflow, coding standards, testing, and the changelog/release process.

## Table of Contents

- How to contribute
- Branching and PR workflow
- Running locally & tests
- PR checklist
- Changelog & releases
- Code of conduct

## How to contribute

1. Fork the repository and clone your fork locally.
2. Create a new branch for your work: `git checkout -b fix/short-description`.
3. Implement your change with clear commits.
4. Run tests and linters locally.
5. Open a PR from your branch to `main`

## Branching and PR workflow

- Use descriptive branch names like `feat/add-merge-tsconfig`, `fix/patch-package-json`, or `chore/update-deps`.
- Keep PRs focused and small when possible.
- Reference related issues in the PR description.

## Running locally & tests

- Install dependencies:

```powershell
npm install
```

- Build

```powershell
npm run build
```

- Run tests:

```powershell
npm test
```

If there are any project-specific scripts (lint, formatting), run them before opening a PR.

## PR checklist

Before requesting review, ensure your PR:

- [ ] Has a descriptive title and summary
- [ ] Includes tests for new behavior when applicable
- [ ] Passes linting and unit tests
- [ ] Contains no sensitive data
- [ ] Updates `docs/CHANGELOG.md` (see guidance below) or references the release flow in the PR description

## Changelog & releases

We maintain `docs/CHANGELOG.md` in the repository. There are two common workflows:

1. Manual (recommended for small projects)

- Edit `docs/CHANGELOG.md` in your PR under the `Unreleased` section to mention the change.
- During release, move `Unreleased` entries into a new heading with the version and date.

2. Automated

- Use tools like `release-drafter` to draft release notes automatically from merged PRs.
- If you want an updated `docs/CHANGELOG.md` file inside the repo, a CI job can run a changelog generator and commit the file. This requires configuring a workflow with write permissions.

Note: GitHub's "Generate release notes" helps create human-readable release notes on GitHub Releases, but it does not update files inside the repository automatically.

## Code of Conduct

By participating in this project, you agree to follow the repository's code of conduct (add or link to one here). Please be respectful and helpful.

---


Tell me which you'd prefer and I'll add them.
