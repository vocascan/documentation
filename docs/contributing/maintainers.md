# Maintainers

## Complete Release workflow

1. See [Server - Release workflow](#server-release-workflow)
1. See [Desktop - Release workflow](#desktop-release-workflow)
1. See [Documentation - Release workflow](#documentation-release-workflow)

### Server - Release workflow

**Main version**

1. Create PR into the `main` branch
1. Increment version in `package.json` and remove `-rc.x` label
1. Write changelog into the `CHANGELOG.md` file
1. Merge after review
1. Wait for the CI to pass, build and publish
1. Make an unpublished release, copy the changelog into the release description and publish
1. Add `-rc.x` label back in the experimental branch

**RC version**

1. Increment rc version in `package.json` and push changes
1. The CI/CD pipeline will automatically publish the rc version

### Desktop - Release workflow

**Main version**

1. Create PR into the `main` branch
1. Increment version in `package.json` and remove `-rc.x` label
1. Write changelog into the `CHANGELOG.md` file
1. Merge after review
1. Wait for the CI to pass, build and create the unpublished release
1. Copy the changelog into the release description and publish
1. Add `-rc.x` label back in the experimental branch

**RC version**

_Will be added later_

### Documentation - Release workflow

1. Create PR into the `main` branch
1. Merge after review
1. Wait for the CI to pass, build and publish the documentation
