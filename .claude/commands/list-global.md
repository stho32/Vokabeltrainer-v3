# List Global Resources

Show an overview of all globally available commands and app-architectures, compared with locally available resources.

## Arguments
- $ARGUMENTS: Optional flags:
  - `--commands` or `-c`: Show only commands
  - `--arch` or `-a`: Show only app-architectures
  - (no flags): Show both commands and architectures

## Purpose

This command provides a comprehensive overview of all Claude commands and app-architectures available globally (in `~/.claude/`) and locally (in `.claude/`). It helps you understand what resources are available and identify differences between global and local versions.

## Instructions

### 1. Gather Global Resources

**Commands:**
- List all `.md` files in `~/.claude/commands/`
- Extract command names (filename without .md extension)

**App-Architectures:**
- List all directories in `~/.claude/app-architectures/`
- Extract architecture names (directory names)

### 2. Gather Local Resources

**Commands:**
- List all `.md` files in `.claude/commands/`
- Extract command names (filename without .md extension)

**App-Architectures:**
- List all directories in `.claude/app-architectures/`
- Extract architecture names (directory names)

### 3. Compare and Display Results

For each resource type, show a table with:

| Resource | Global | Local | Status |
|----------|--------|-------|--------|
| name     | Yes/No | Yes/No | [status] |

**Status indicators:**
- `Global only` - Available globally but not locally
- `Local only` - Available locally but not globally
- `Both (synced)` - Available in both, files are identical
- `Both (differs)` - Available in both, but content differs (local may have modifications)

### 4. Output Format

```
## Global Commands (~/.claude/commands/)

| Command | Global | Local | Status |
|---------|--------|-------|--------|
| commit | Yes | Yes | Both (synced) |
| create-svelte-app | Yes | Yes | Both (differs) |
| deploy | Yes | No | Global only |
| my-local-cmd | No | Yes | Local only |

## Global App-Architectures (~/.claude/app-architectures/)

| Architecture | Global | Local | Status |
|--------------|--------|-------|--------|
| svelte-app-architecture | Yes | Yes | Both (synced) |
| react-app-architecture | Yes | No | Global only |

## Summary

- **Commands**: X global, Y local, Z in both
- **Architectures**: X global, Y local, Z in both

### Quick Actions
- To copy a global command locally: `/make-local <command-name>`
- To copy a local command globally: `/make-global <command-name>`
- To copy a global architecture locally: `/make-local --arch <arch-name>`
- To copy a local architecture globally: `/make-global --arch <arch-name>`
```

### 5. Handling Missing Directories

- If `~/.claude/commands/` doesn't exist: Report "No global commands directory found"
- If `~/.claude/app-architectures/` doesn't exist: Report "No global app-architectures directory found"
- If `.claude/commands/` doesn't exist: Report "No local commands directory found"
- If `.claude/app-architectures/` doesn't exist: Report "No local app-architectures directory found"

### 6. Comparing File Contents

To determine if files are synced or differ:
- For commands: Compare the .md file contents using `diff -q`
- For architectures: Compare directory contents recursively using `diff -rq`

## Example Usage

```
/list-global              # Show all commands and architectures
/list-global --commands   # Show only commands
/list-global -c           # Show only commands (short form)
/list-global --arch       # Show only architectures
/list-global -a           # Show only architectures (short form)
```

## Related Commands

- `/make-local` - Copy global resources to local repository
- `/make-global` - Copy local resources to global directory
- `/remove-local` - Remove local resources
- `/remove-global` - Remove global resources
