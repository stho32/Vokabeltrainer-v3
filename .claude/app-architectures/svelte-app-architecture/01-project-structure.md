# SvelteKit Project Structure

> **Official Documentation**: [Project Structure](https://svelte.dev/docs/kit/project-structure)

## Standard Directory Layout

A typical SvelteKit project follows this structure:

```
my-project/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable UI components
│   │   ├── stores/         # Svelte stores for state
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── server/         # Server-only code
│   ├── params/             # Route parameter matchers
│   ├── routes/             # Application routes (pages)
│   ├── app.html            # HTML template
│   ├── app.css             # Global styles
│   ├── error.html          # Fallback error page
│   ├── hooks.client.js     # Client-side hooks
│   ├── hooks.server.js     # Server-side hooks
│   └── service-worker.js   # PWA service worker (optional)
├── static/                 # Static assets (robots.txt, favicon, etc.)
├── tests/                  # Test files
├── package.json
├── svelte.config.js        # Svelte & SvelteKit configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.js          # Vite bundler configuration
```

## Key Directories Explained

### `src/lib/` - The $lib Alias

The `src/lib/` directory is special in SvelteKit. It contains reusable code that can be imported anywhere using the `$lib` alias:

```javascript
// Instead of relative imports like:
import Button from '../../../lib/components/Button.svelte';

// Use the $lib alias:
import Button from '$lib/components/Button.svelte';
```

**Recommended `$lib` organization:**

```
src/lib/
├── components/
│   ├── ui/              # Generic UI components (Button, Input, Modal)
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   └── features/        # Feature-specific components
├── stores/              # Reactive state stores
├── utils/               # Helper functions
├── types/               # TypeScript interfaces and types
├── constants/           # Application constants
└── server/              # Server-only utilities
```

> **Reference**: [SvelteKit $lib](https://svelte.dev/docs/kit/$lib)

### `src/lib/server/` - Server-Only Code

Code in `src/lib/server/` can only be imported by server-side code. SvelteKit prevents accidental client-side imports:

```javascript
// This import only works in +page.server.ts, +server.ts, etc.
import { db } from '$lib/server/database';
```

Use this for:
- Database connections
- Secret API keys
- Server-side utilities

### `src/routes/` - File-Based Routing

Routes are defined by the directory structure. Each folder can contain special files:

| File | Purpose |
|------|---------|
| `+page.svelte` | Page component |
| `+page.ts` | Universal load function |
| `+page.server.ts` | Server-only load function |
| `+layout.svelte` | Layout wrapper for page and children |
| `+layout.ts` | Layout load function |
| `+layout.server.ts` | Server-only layout load function |
| `+error.svelte` | Error boundary component |
| `+server.ts` | API endpoint |

**Example routes structure:**

```
src/routes/
├── +page.svelte              # Home page (/)
├── +layout.svelte            # Root layout
├── about/
│   └── +page.svelte          # /about
├── blog/
│   ├── +page.svelte          # /blog
│   ├── +page.server.ts       # Load blog posts
│   └── [slug]/
│       ├── +page.svelte      # /blog/:slug
│       └── +page.server.ts   # Load single post
└── api/
    └── posts/
        └── +server.ts        # API: /api/posts
```

> **Reference**: [SvelteKit Routing](https://svelte.dev/docs/kit/routing)

## Architectural Approaches for Larger Apps

When scaling your application, consider these two common approaches:

### Approach 1: Library-Centric (Recommended for shared components)

Keep all reusable logic in `src/lib/`, organized by feature modules:

```
src/
├── lib/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── stores/
│   │   │   └── types/
│   │   ├── blog/
│   │   │   ├── components/
│   │   │   ├── stores/
│   │   │   └── types/
│   │   └── shared/
│   │       └── components/
├── routes/
│   ├── auth/
│   │   └── +page.svelte
│   └── blog/
│       └── +page.svelte
```

**Pros:**
- Clear separation of concerns
- Easy to share code across routes
- Better for publishable component libraries

### Approach 2: Co-Located (Recommended for route-specific features)

Keep route-specific code alongside the route:

```
src/
├── lib/
│   └── components/          # Only truly shared components
├── routes/
│   ├── auth/
│   │   ├── components/      # Auth-specific components
│   │   ├── types/
│   │   └── +page.svelte
│   └── blog/
│       ├── components/      # Blog-specific components
│       ├── types/
│       └── +page.svelte
```

**Pros:**
- Features are self-contained
- Easier to understand route dependencies
- Simpler to delete/move entire features

> **Reference**: [Structuring Larger SvelteKit Apps (Community Discussion)](https://github.com/sveltejs/kit/discussions/7579)

## Naming Conventions

SvelteKit doesn't enforce strict naming conventions, but these are recommended:

| Type | Convention | Example |
|------|------------|---------|
| Directories | kebab-case | `user-profile/` |
| Regular files | kebab-case | `format-date.ts` |
| Svelte components | PascalCase | `Button.svelte` |
| Route files | SvelteKit convention | `+page.svelte` |
| Types/Interfaces | PascalCase | `UserProfile.ts` |

> **Reference**: [Naming Conventions Discussion](https://webdeveloper.com/bounties/whats-the-recommended-naming-convention-for-sveltekit-files-and-folders/)

## Configuration Files

### `svelte.config.js`

Main SvelteKit configuration:

```javascript
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $stores: 'src/lib/stores'
    }
  }
};

export default config;
```

> **Reference**: [SvelteKit Configuration](https://svelte.dev/docs/kit/configuration)

### `vite.config.js`

Vite bundler configuration:

```javascript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
});
```

## Static Assets

Place static files in the `static/` directory. They're served from the root URL:

```
static/
├── favicon.png       # → /favicon.png
├── robots.txt        # → /robots.txt
└── images/
    └── logo.svg      # → /images/logo.svg
```

## Generated Files

The `.svelte-kit/` directory contains generated files:
- Type definitions for routes
- Build artifacts
- Development server files

**This directory can be safely deleted** - it regenerates automatically during `dev` or `build`.

## Further Reading

- [SvelteKit Project Structure](https://svelte.dev/docs/kit/project-structure)
- [SvelteKit Project Structure Explained (Joy of Code)](https://joyofcode.xyz/sveltekit-project-structure)
- [Best Practices for Organizing Svelte Applications](https://kim-jangwook.medium.com/best-practices-for-organizing-and-structuring-svelte-applications-5f85a3d5a6f5)
