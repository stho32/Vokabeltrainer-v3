# Remove Global Command or Architecture

Delete commands or app-architecture folders from the user's global ~/.claude directory.

## Arguments
- $ARGUMENTS: One or more names to remove. Use `--arch` or `-a` flag to specify app-architectures instead of commands.

## Instructions

### Determine the type of resource:
- If `--arch` or `-a` flag is present: operate on app-architectures
- Otherwise (default): operate on commands

### For Commands (default):

1. For each command name provided in $ARGUMENTS:
   - Check if the command exists in `~/.claude/commands/`
   - Ask for confirmation before deleting
   - Delete the command file
   - Report success or failure for each command

2. If no arguments provided, list available global commands that can be removed.

### For App-Architectures (with --arch or -a flag):

1. For each architecture name provided in $ARGUMENTS:
   - Check if the folder exists in `~/.claude/app-architectures/`
   - Ask for confirmation before deleting (remind user this deletes the entire folder)
   - Delete the entire folder recursively
   - Report success or failure for each architecture

2. If no architecture names provided (just `--arch`), list available global app-architectures that can be removed.

## Example Usage

### Commands (default)
```
/remove-global my-command
/remove-global cmd1 cmd2 cmd3
```

### App-Architectures
```
/remove-global --arch svelte-app-architecture
/remove-global -a svelte-app-architecture react-app-architecture
/remove-global --arch                        # List available architectures
```
