# Remove Global Command

Delete commands from the user's global ~/.claude/commands directory.

## Arguments
- $ARGUMENTS: One or more command names (without .md extension) to remove

## Instructions

1. For each command name provided in $ARGUMENTS:
   - Check if the command exists in `~/.claude/commands/`
   - Ask for confirmation before deleting
   - Delete the command file
   - Report success or failure for each command

2. If no arguments provided, list available global commands that can be removed.

## Example Usage
```
/remove-global my-command
/remove-global cmd1 cmd2 cmd3
```
