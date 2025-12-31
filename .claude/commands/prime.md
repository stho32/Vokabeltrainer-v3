# Prime Project Context

Load essential project context by listing all tracked files and reading documentation.

## Arguments

None required.

## Purpose

This command primes Claude with a comprehensive understanding of the project structure and documentation. Use it at the start of a session when you need Claude to have full awareness of the codebase layout, file organization, and project documentation before diving into tasks.

## Plan

### Phase 1: Repository Structure Discovery

1. **List all tracked files**: Use `git ls-files` to get a complete listing of all version-controlled files in the repository
2. **Display file tree**: Show the hierarchical structure so Claude understands the project organization

### Phase 2: Documentation Loading

1. **Read README.md**: Load the main project documentation to understand:
   - Project purpose and goals
   - Setup instructions
   - Key features and functionality
   - Any important notes for developers

2. **Read CLAUDE.md** (if exists): Load Claude-specific instructions that may contain:
   - Coding conventions
   - Architecture decisions
   - Important patterns to follow

### Phase 3: Context Summary

1. **Summarize project structure**: Provide a brief overview of the main directories and their purposes
2. **Highlight key files**: Note configuration files, entry points, and important modules
3. **Ready for tasks**: Confirm context is loaded and await user instructions

## Adaptive Execution

When executing this command:

1. **Check for documentation files**: Look for README.md, CLAUDE.md, CONTRIBUTING.md, or similar documentation files that provide project context.

2. **Adjust to project type**: The structure summary should be tailored to the type of project (web app, library, CLI tool, etc.).

3. **Note special directories**: Identify and explain any non-standard directory structures or naming conventions.

4. **Flag missing documentation**: If expected documentation is missing, note this to the user.

5. **Keep summaries concise**: Provide useful context without overwhelming detail.

## Execution Steps

```bash
# List all tracked files
git ls-files
```

```bash
# Read main documentation
cat README.md
```

After gathering this information, provide a concise summary of:
- Total number of files and main directories
- Project type and tech stack (based on config files)
- Key entry points and important files
- Ready to assist with specific tasks
