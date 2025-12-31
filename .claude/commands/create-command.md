# Create Command

Generate a new Claude command with a detailed plan template.

## Arguments
- $ARGUMENTS: Description of what the command should do (e.g., "upgrade from dotnet 8 to dotnet 10")

## Instructions

Create a new command file based on the user's description. The command should contain:

1. **A descriptive title** derived from the task
2. **A clear purpose section** explaining what the command does
3. **An Arguments section** for any runtime parameters needed
4. **A detailed step-by-step plan** that covers:
   - Prerequisites and validation checks
   - Research/discovery steps (finding relevant files, configs, dependencies)
   - The core transformation/action steps
   - Verification and testing steps
   - Cleanup and finalization

5. **An adaptive prompt section** that instructs the executing agent to:
   - Analyze the current project structure
   - Adapt the plan to the specific codebase
   - Skip irrelevant steps
   - Handle edge cases discovered during execution

## Command File Template

```markdown
# [Command Title]

[One-line description of what this command accomplishes]

## Arguments
- $ARGUMENTS: [What runtime arguments this command accepts, if any]

## Purpose

[2-3 sentences explaining the goal and when to use this command]

## Plan

### Phase 1: Discovery & Validation
1. [Check prerequisites]
2. [Find relevant files/configs]
3. [Assess current state]

### Phase 2: Preparation
1. [Backup or branch if needed]
2. [Identify all locations requiring changes]
3. [Resolve dependencies]

### Phase 3: Execution
1. [Core action step 1]
2. [Core action step 2]
3. [Continue with main transformation]

### Phase 4: Verification
1. [Run tests/build]
2. [Validate changes]
3. [Check for regressions]

### Phase 5: Finalization
1. [Cleanup temporary files]
2. [Update documentation if needed]
3. [Summary of changes made]

## Adaptive Execution

When executing this command:

1. **Analyze first**: Before following the plan, explore the codebase to understand its specific structure, patterns, and conventions.

2. **Adapt the plan**: Not all steps may apply. Skip steps that are irrelevant to this specific project. Add steps if the project has unique requirements.

3. **Handle discoveries**: If you find unexpected patterns or issues during execution, pause and address them appropriately.

4. **Report progress**: Keep the user informed of what you're doing and any decisions you're making.

5. **Verify thoroughly**: After making changes, ensure the project still builds/runs correctly.

Runtime arguments: $ARGUMENTS
```

## Output

1. Parse the user's description from $ARGUMENTS
2. Generate a kebab-case filename (e.g., "upgrade-dotnet-8-to-10.md")
3. Create the command file with a detailed, task-specific plan
4. Inform the user of the created command and how to use it

## Example

Input: `/create-command upgrade from dotnet 8 to dotnet 10`

Creates: `.claude/commands/upgrade-dotnet-8-to-10.md` with a detailed plan covering:
- Finding all .csproj files and global.json
- Checking for deprecated APIs
- Updating target frameworks
- Updating NuGet packages
- Running tests
- etc.
