# Make Command Global

Copy local repository commands to the user's global ~/.claude/commands directory.

## Arguments
- $ARGUMENTS: One or more command names (without .md extension) to make global

## Instructions

1. For each command name provided in $ARGUMENTS:
   - Look for the command file in the local `.claude/commands/` directory
   - Copy it to `~/.claude/commands/`
   - Report success or failure for each command

2. If no arguments provided, list available local commands that can be made global.

3. Create the global commands directory if it doesn't exist.

## Example Usage
```
/make-global my-command
/make-global cmd1 cmd2 cmd3
```
