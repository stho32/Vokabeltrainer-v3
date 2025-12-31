# Git Commit

Create a git commit for staged or all changes.

## Arguments
- $ARGUMENTS: Optional commit message or flags (e.g., `-a` to include all changes)

## Instructions

Use the Task tool with a subagent to handle the commit process. This keeps the main conversation context clean.

Launch a subagent with the following prompt:

```
Create a git commit following these steps:

1. Run these commands in parallel to understand the current state:
   - `git status` to see all untracked and modified files
   - `git diff` to see unstaged changes
   - `git diff --cached` to see staged changes
   - `git log --oneline -5` to see recent commit message style

2. Analyze all changes and draft a concise commit message that:
   - Summarizes the nature of changes (feature, fix, refactor, docs, etc.)
   - Focuses on the "why" rather than the "what"
   - Follows the repository's existing commit style

3. If there are no staged changes, stage the relevant files (ask if unclear which files to include)

4. Create the commit with the message ending with:
   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>

5. Run `git status` to verify the commit succeeded

User arguments: $ARGUMENTS

If the user provided a commit message in the arguments, use that message instead of generating one.
Do not push to remote unless explicitly requested.
```

Use subagent_type: "general-purpose"
