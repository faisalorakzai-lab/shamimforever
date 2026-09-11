---
name: GitHub publishing
description: Workspace-specific authentication behavior when publishing this repository to GitHub.
---

The GitHub App connection can be authorized at the account level while still reporting `not_added` in the workspace integration list. Binding the connection may succeed without making the HTTPS Git remote usable in the shell. A valid secure `GITHUB_PERSONAL_ACCESS_TOKEN` works when exposed only to the command invocation as `GH_TOKEN` for both `gh auth setup-git` and `git push`.

**Why:** A push appeared to fail even after the GitHub App was attached because the CLI command did not retain the token environment for the actual push.

**How to apply:** Never print or paste the token. Check secret existence through the secrets tool, then run the authentication setup and push in the same secure environment.