# Make Command Local

Copy a global user-level command from ~/.claude/commands to the local repository's .claude/commands directory.

## Arguments
- $ARGUMENTS: One or more command names (without .md extension) to make local

## Instructions

1. For each command name provided in $ARGUMENTS:
   - Look for the command file in `~/.claude/commands/`
   - Copy it to the local `.claude/commands/` directory
   - Report success or failure for each command

2. If no arguments provided, list available global commands that can be made local.

3. Create the local commands directory if it doesn't exist.

## Example Usage
```
/make-local my-command
/make-local cmd1 cmd2 cmd3
```
