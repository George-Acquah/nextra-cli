# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.5](https://github.com/George-Acquah/nextra-cli/compare/v0.1.4...v0.1.5) (2025-10-04)


### Bug Fixes

* **release:** correct changelog path and unify string quotes ([790b23a](https://github.com/George-Acquah/nextra-cli/commit/790b23a24fb44719435027e27bbd4e74151f3f3d))

### [0.1.4](https://github.com/George-Acquah/nextra-cli/compare/v0.1.3...v0.1.4) (2025-10-04)

### 0.1.3 (2025-10-04)


### Features

* Initiated nextra-cli to git ([6838b1f](https://github.com/George-Acquah/nextra-cli/commit/6838b1f3c834e413e1a51a1637ee6624019c029c))

### 0.1.2 (2025-10-04)


### Features

* Initiated nextra-cli to git ([6838b1f](https://github.com/George-Acquah/nextra-cli/commit/6838b1f3c834e413e1a51a1637ee6624019c029c))

### 0.1.1 (2025-10-04)


### Features

* Initiated nextra-cli to git ([6838b1f](https://github.com/George-Acquah/nextra-cli/commit/6838b1f3c834e413e1a51a1637ee6624019c029c))

## [0.0.0] - YYYY-MM-DD

### Added

- Initial placeholder changelog.

---

How to use this file

- Add new entries under the `Unreleased` heading while preparing a release.
- When releasing, move the `Unreleased` entries into a new section with the new version and the release date.
- Optionally tag releases in git and reference PRs or issues for traceability.

Suggested release steps

1. Update `docs/CHANGELOG.md` by moving `Unreleased` changes to a new version heading.
2. Bump the version in `package.json`.
3. Create a git tag and push.
4. Publish to npm (if applicable).

Example:

```
## [1.2.0] - 2025-10-04
### Added
- Support for merging `.eslintrc.json` when present in templates.
```

---

Notes about automation and GitHub

- GitHub can generate release notes for a release (see the Releases UI -> "Generate release notes"), but that does not automatically update files inside your repository such as `docs/CHANGELOG.md`.
- If you'd like your changelog file to be updated automatically when PRs are merged or when a release is created, consider one of these approaches:

	- Use a GitHub Action like `release-drafter/release-drafter` to assemble release notes/drafts from merged PRs. This will produce a draft release on GitHub but still won't modify files in the repo unless you add a follow-up step to commit changes.
	- Use `github-changelog-generator` or `conventional-changelog` in a CI job to create or update `docs/CHANGELOG.md` and commit the generated file back to the default branch. This requires configuring a workflow with a bot account or permissions to push changes.
	- Keep a manual changelog: maintain `docs/CHANGELOG.md` by editing the `Unreleased` section in PRs or during release preparation. This is the simplest and lowest-risk approach.

Recommendation

- For small OSS projects, the manual approach (edit `docs/CHANGELOG.md` in the release PR) is straightforward and transparent.
- If you want automation, use `release-drafter` to draft release notes and optionally add a CI step to generate and commit an updated `docs/CHANGELOG.md` during release. I can add a sample GitHub Actions workflow if you want.

