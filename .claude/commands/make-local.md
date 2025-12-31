# Make Command or Architecture Local

Copy global user-level commands or app-architecture folders from ~/.claude to the local repository's .claude directory.

## Arguments
- $ARGUMENTS: One or more names to make local. Use `--arch` or `-a` flag to specify app-architectures instead of commands.

## Instructions

### Determine the type of resource:
- If `--arch` or `-a` flag is present: operate on app-architectures
- Otherwise (default): operate on commands

### For Commands (default):

1. For each command name provided in $ARGUMENTS:
   - Look for the command file in `~/.claude/commands/`
   - Copy it to the local `.claude/commands/` directory
   - Report success or failure for each command

2. If no arguments provided, list available global commands that can be made local.

3. Create the local commands directory if it doesn't exist.

### For App-Architectures (with --arch or -a flag):

1. For each architecture name provided in $ARGUMENTS:
   - Look for the folder in `~/.claude/app-architectures/`
   - Copy the entire folder recursively to the local `.claude/app-architectures/`
   - Report success or failure for each architecture

2. If no architecture names provided (just `--arch`), list available global app-architectures that can be made local.

3. Create the local app-architectures directory if it doesn't exist.

## Example Usage

### Commands (default)
```
/make-local my-command
/make-local cmd1 cmd2 cmd3
```

### App-Architectures
```
/make-local --arch svelte-app-architecture
/make-local -a svelte-app-architecture react-app-architecture
/make-local --arch                        # List available architectures
```
