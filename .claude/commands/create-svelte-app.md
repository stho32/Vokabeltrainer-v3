# Create Svelte App

Initialize a complete Svelte 5 / SvelteKit project structure with requirements documentation.

## Arguments
- $ARGUMENTS: Application name and optional description (e.g., "my-app A todo application with user authentication")

## Version Requirements

**IMPORTANT: This command explicitly targets Svelte 5.**

- **Svelte**: Version 5.x (uses Runes: `$state`, `$derived`, `$effect`, `$props`)
- **SvelteKit**: Version 2.x
- **Vite**: Version 6.x
- **TypeScript**: Version 5.x

If a newer major version of Svelte is available (e.g., Svelte 6), inform the user but continue using Svelte 5. The architecture documentation and patterns in this command are specifically designed for Svelte 5's runes-based reactivity system. Upgrading to a newer Svelte version would require updating the architecture documentation first.

## Purpose

This command sets up a new Svelte 5 application from scratch or enhances an existing repository with the proper structure. It:
- Creates the SvelteKit project structure with **Svelte 5** dependencies
- Creates a proper `.gitignore` file for SvelteKit projects
- Makes the svelte-app-architecture documentation available locally (Svelte 5 specific)
- Sets up a requirements tracking system in German ("Anforderungen")
- Creates initial documentation

Use this command when starting a new Svelte 5 project or when you need to add proper structure and requirements tracking to an existing codebase.

## Plan

### Phase 1: Discovery & Validation

1. **Check existing project structure**
   - Look for `package.json` to see if this is already a Node project
   - Check for `svelte.config.js` to see if SvelteKit is already set up
   - Check for existing `src/` directory structure
   - Verify if `.claude/app-architectures/svelte-app-architecture/` already exists locally

2. **Parse arguments**
   - Extract application name from $ARGUMENTS
   - Extract optional description if provided
   - Use directory name as fallback if no name provided

3. **Check global architecture availability**
   - Verify `~/.claude/app-architectures/svelte-app-architecture/` exists
   - If not available locally or globally, warn user

### Phase 2: Setup Architecture Documentation

1. **Make svelte-app-architecture local**
   - If not already present in `.claude/app-architectures/`
   - Copy from `~/.claude/app-architectures/svelte-app-architecture/`
   - Create `.claude/app-architectures/` directory if needed

2. **Read architecture documentation**
   - Read the README.md and key architecture files
   - Understand project structure requirements
   - Note patterns to follow during app creation

### Phase 3: Create Project Structure

1. **Initialize SvelteKit project (if not present)**
   - Create `package.json` with explicit Svelte 5 dependencies:
     ```json
     {
       "devDependencies": {
         "@sveltejs/adapter-auto": "^3.0.0",
         "@sveltejs/kit": "^2.0.0",
         "@sveltejs/vite-plugin-svelte": "^5.0.0",
         "svelte": "^5.0.0",
         "svelte-check": "^4.0.0",
         "typescript": "^5.0.0",
         "vite": "^6.0.0"
       }
     }
     ```
   - Create `svelte.config.js` with adapter-auto
   - Create `vite.config.ts`
   - Create `tsconfig.json` for TypeScript support
   - **Note**: Always use `^5.0.0` for Svelte to stay on version 5.x

2. **Create source directory structure**
   ```
   src/
   ├── lib/
   │   ├── components/
   │   ├── stores/
   │   ├── utils/
   │   └── types/
   ├── routes/
   │   ├── +layout.svelte
   │   ├── +page.svelte
   │   └── +error.svelte
   └── app.html
   ```

3. **Create static assets directory**
   ```
   static/
   └── favicon.png (placeholder or skip)
   ```

4. **Create .gitignore file**
   - Create a proper `.gitignore` for SvelteKit projects
   - Include standard Node.js ignores (node_modules, etc.)
   - Include SvelteKit-specific ignores (.svelte-kit, build output)
   - Include IDE and OS-specific ignores (.vscode, .idea, .DS_Store)
   - Example content:
   ```
   # Dependencies
   node_modules/

   # Build output
   .svelte-kit/
   build/
   dist/

   # Environment files
   .env
   .env.*
   !.env.example

   # IDE
   .vscode/
   .idea/
   *.swp
   *.swo

   # OS
   .DS_Store
   Thumbs.db

   # Logs
   *.log
   npm-debug.log*

   # Package manager locks (keep one)
   # pnpm-lock.yaml
   # yarn.lock
   ```

### Phase 4: Setup Requirements Documentation

1. **Create Anforderungen folder**
   - Create `Anforderungen/` directory in project root
   - This will hold all requirements documents

2. **Create sample requirement file**
   - Create `Anforderungen/R00001-sample.md` as template
   - Use format:
   ```markdown
   # R00001: [Requirement Title]

   ## Description
   [What this requirement entails]

   ## Acceptance Criteria
   - [ ] Criterion 1
   - [ ] Criterion 2

   ## Status
   - [ ] Not Started / In Progress / Completed

   ## Notes
   [Additional context]
   ```

3. **Create requirements README**
   - Create `Anforderungen/README.md` explaining the numbering system
   - Document how to add new requirements

### Phase 5: Create Application Documentation

1. **Create main README.md**
   - Application name and description
   - Tech stack overview (Svelte 5, SvelteKit, TypeScript)
   - Link to requirements folder
   - List of current requirements
   - Getting started instructions
   - Development commands

2. **Format README content**
   ```markdown
   # [Application Name]

   [Description]

   ## Tech Stack
   - Svelte 5 with Runes
   - SvelteKit 2.x
   - TypeScript
   - Vite

   ## Requirements
   See [Anforderungen/](./Anforderungen/) for detailed requirements.

   ### Current Requirements
   - R00001: [Sample requirement]

   ## Getting Started
   ...
   ```

### Phase 6: Install Dependencies & Verify

1. **Install npm dependencies**
   - Run `npm install` if package.json was created
   - Verify all dependencies install correctly

2. **Verify project structure**
   - Ensure all directories exist
   - Check all configuration files are valid

3. **Run development server (optional)**
   - Start dev server to verify setup works
   - Report any issues

### Phase 7: Begin Application Development

1. **Review requirements**
   - Read any existing requirements in Anforderungen/
   - If no real requirements yet, skip to waiting for user input

2. **Consult architecture documentation**
   - Reference `.claude/app-architectures/svelte-app-architecture/`
   - Follow patterns from the architecture docs

3. **Implement according to requirements**
   - Start with basic layout and routing
   - Build features according to documented requirements
   - Follow Svelte 5 runes patterns

## Adaptive Execution

When executing this command:

1. **Analyze first**: Before following the plan, explore the codebase to understand if this is a fresh start or an existing project that needs enhancement.

2. **Adapt the plan**:
   - If SvelteKit is already set up, skip initialization
   - If architecture docs already exist locally, skip copying
   - If Anforderungen folder exists, don't overwrite existing requirements

3. **Handle existing content**:
   - Never overwrite existing requirements files
   - Merge with existing README content if present
   - Preserve any existing src/ structure

4. **Report progress**: Keep the user informed of each phase and any decisions made.

5. **Ask for requirements**: If no specific requirements are provided, ask the user what features the application should have before starting implementation.

6. **Follow the architecture**: Always reference the svelte-app-architecture docs when making structural decisions.

## File Naming Conventions

### Requirements Files
- Format: `R[NNNNN]-[slug].md`
- Example: `R00001-user-authentication.md`
- Always use 5-digit zero-padded numbers
- Use lowercase kebab-case for the slug
- Increment by 1 for each new requirement

### Component Files
- Use PascalCase: `MyComponent.svelte`
- Place in `src/lib/components/`
- Group related components in subdirectories

## Example Usage

```
/create-svelte-app vocabulary-trainer An app for learning vocabulary with spaced repetition
```

This creates a Svelte app called "vocabulary-trainer" with proper structure and requirements tracking.
