# Remove Local Command

Delete commands from the local repository's .claude/commands directory.

## Arguments
- $ARGUMENTS: One or more command names (without .md extension) to remove

## Instructions

1. For each command name provided in $ARGUMENTS:
   - Check if the command exists in the local `.claude/commands/` directory
   - Ask for confirmation before deleting
   - Delete the command file
   - Report success or failure for each command

2. If no arguments provided, list available local commands that can be removed.

## Example Usage
```
/remove-local my-command
/remove-local cmd1 cmd2 cmd3
```
