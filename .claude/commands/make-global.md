# Make Command or Architecture Global

Copy local repository commands or app-architecture folders to the user's global ~/.claude directory.

## Arguments
- $ARGUMENTS: One or more names to make global. Use `--arch` or `-a` flag to specify app-architectures instead of commands.

## Instructions

### Determine the type of resource:
- If `--arch` or `-a` flag is present: operate on app-architectures
- Otherwise (default): operate on commands

### For Commands (default):

1. For each command name provided in $ARGUMENTS:
   - Look for the command file in the local `.claude/commands/` directory
   - Copy it to `~/.claude/commands/`
   - Report success or failure for each command

2. If no arguments provided, list available local commands that can be made global.

3. Create the global commands directory if it doesn't exist.

### For App-Architectures (with --arch or -a flag):

1. For each architecture name provided in $ARGUMENTS:
   - Look for the folder in the local `.claude/app-architectures/` directory
   - Copy the entire folder recursively to `~/.claude/app-architectures/`
   - Report success or failure for each architecture

2. If no architecture names provided (just `--arch`), list available local app-architectures that can be made global.

3. Create the global app-architectures directory if it doesn't exist.

## Example Usage

### Commands (default)
```
/make-global my-command
/make-global cmd1 cmd2 cmd3
```

### App-Architectures
```
/make-global --arch svelte-app-architecture
/make-global -a svelte-app-architecture react-app-architecture
/make-global --arch                        # List available architectures
```
