# SvelteKit Routing & Data Loading

> **Official Documentation**: [SvelteKit Routing](https://svelte.dev/docs/kit/routing) | [Loading Data](https://svelte.dev/docs/kit/load)

This guide covers SvelteKit's file-based routing system and data loading patterns.

## File-Based Routing

SvelteKit uses the filesystem to define routes. The `src/routes` directory structure maps directly to URLs:

```
src/routes/
├── +page.svelte           → /
├── about/
│   └── +page.svelte       → /about
├── blog/
│   ├── +page.svelte       → /blog
│   └── [slug]/
│       └── +page.svelte   → /blog/:slug
└── api/
    └── posts/
        └── +server.ts     → /api/posts
```

> **Reference**: [SvelteKit Routing Documentation](https://svelte.dev/docs/kit/routing)

---

## Route Files

### `+page.svelte` - Page Component

The main component rendered for a route:

```svelte
<script>
  let { data } = $props();
</script>

<h1>{data.title}</h1>
<p>{data.description}</p>
```

### `+page.ts` - Universal Load Function

Runs on both server and client:

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch('/api/posts');
  const posts = await response.json();

  return { posts };
};
```

### `+page.server.ts` - Server-Only Load Function

Runs only on the server, can access databases and secrets:

```typescript
// src/routes/blog/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ params }) => {
  const post = await db.posts.findUnique({
    where: { slug: params.slug }
  });

  if (!post) {
    throw error(404, 'Post not found');
  }

  return { post };
};
```

> **Reference**: [Loading Data Documentation](https://svelte.dev/docs/kit/load)

---

## Layouts

### `+layout.svelte` - Shared UI

Layouts wrap pages and child layouts:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children, data } = $props();
</script>

<Header user={data.user} />

<main>
  {@render children()}
</main>

<Footer />
```

### `+layout.ts` / `+layout.server.ts` - Layout Data

Data from layouts is available to all child routes:

```typescript
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user
  };
};
```

### Nested Layouts

Layouts cascade through the route hierarchy:

```
src/routes/
├── +layout.svelte         # Root layout (all pages)
├── admin/
│   ├── +layout.svelte     # Admin layout (admin pages only)
│   ├── +page.svelte       # /admin
│   └── users/
│       └── +page.svelte   # /admin/users
```

> **Reference**: [SvelteKit Layouts Documentation](https://svelte.dev/docs/kit/routing#layout)

---

## Dynamic Routes

### Basic Parameters

```
src/routes/blog/[slug]/+page.svelte  → /blog/hello-world
```

```typescript
// +page.server.ts
export const load = async ({ params }) => {
  console.log(params.slug); // 'hello-world'
};
```

### Rest Parameters

```
src/routes/docs/[...path]/+page.svelte  → /docs/a/b/c
```

```typescript
export const load = async ({ params }) => {
  console.log(params.path); // 'a/b/c'
};
```

### Optional Parameters

```
src/routes/[[lang]]/about/+page.svelte
  → /about
  → /en/about
  → /de/about
```

### Parameter Matchers

Create custom parameter validation:

```typescript
// src/params/integer.ts
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  return /^\d+$/.test(param);
};
```

```
src/routes/items/[id=integer]/+page.svelte
  → /items/123 ✓
  → /items/abc ✗
```

> **Reference**: [Advanced Routing Documentation](https://svelte.dev/docs/kit/advanced-routing)

---

## API Routes (`+server.ts`)

Create API endpoints by exporting HTTP method handlers:

```typescript
// src/routes/api/posts/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const limit = Number(url.searchParams.get('limit') ?? 10);
  const posts = await db.posts.findMany({ take: limit });

  return json(posts);
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    throw error(401, 'Unauthorized');
  }

  const data = await request.json();
  const post = await db.posts.create({ data });

  return json(post, { status: 201 });
};

export const DELETE: RequestHandler = async ({ params }) => {
  await db.posts.delete({ where: { id: params.id } });

  return new Response(null, { status: 204 });
};
```

> **Reference**: [API Routes Documentation](https://svelte.dev/docs/kit/routing#server)

---

## Form Actions

Handle form submissions on the server:

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return fail(400, { email, missing: true });
    }

    const user = await authenticate(email, password);

    if (!user) {
      return fail(401, { email, incorrect: true });
    }

    cookies.set('session', user.token, { path: '/' });
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- +page.svelte -->
<script>
  import { enhance } from '$app/forms';

  let { form } = $props();
</script>

<form method="POST" use:enhance>
  <input name="email" value={form?.email ?? ''} />

  {#if form?.missing}
    <p class="error">Email and password required</p>
  {/if}

  {#if form?.incorrect}
    <p class="error">Invalid credentials</p>
  {/if}

  <input name="password" type="password" />
  <button>Log in</button>
</form>
```

> **Reference**: [Form Actions Documentation](https://svelte.dev/docs/kit/form-actions)

---

## Page Options

Control rendering behavior per-route:

```typescript
// +page.ts or +layout.ts
export const prerender = true;    // Generate static HTML
export const ssr = false;         // Client-only rendering
export const csr = true;          // Enable client-side rendering
export const trailingSlash = 'always'; // URL trailing slash handling
```

### Prerendering

Generate static HTML at build time:

```typescript
// src/routes/blog/[slug]/+page.server.ts
export const prerender = true;

// Generate all paths at build time
export async function entries() {
  const posts = await db.posts.findMany();
  return posts.map(post => ({ slug: post.slug }));
}
```

### SSR vs CSR

| Option | Server | Client | Use Case |
|--------|--------|--------|----------|
| `ssr: true, csr: true` | Initial | Hydration + Navigation | Default, best SEO |
| `ssr: true, csr: false` | Always | Never | No JS needed |
| `ssr: false, csr: true` | Never | Always | Admin dashboards, SPAs |

> **Reference**: [Page Options Documentation](https://svelte.dev/docs/kit/page-options)

---

## Navigation

### Programmatic Navigation

```svelte
<script>
  import { goto, invalidate, invalidateAll } from '$app/navigation';

  async function handleSubmit() {
    await saveData();
    goto('/success');
  }

  async function refresh() {
    // Re-run load functions matching this URL
    await invalidate('/api/data');

    // Or re-run all load functions
    await invalidateAll();
  }
</script>
```

### Prefetching

SvelteKit prefetches linked pages on hover:

```svelte
<!-- Automatic prefetch on hover (default) -->
<a href="/about">About</a>

<!-- Prefetch on viewport entry -->
<a href="/about" data-sveltekit-preload-data="viewport">About</a>

<!-- Disable prefetching -->
<a href="/about" data-sveltekit-preload-data="off">About</a>
```

> **Reference**: [Navigation Documentation](https://svelte.dev/docs/kit/link-options)

---

## Error Handling

### `+error.svelte` - Error Pages

```svelte
<!-- src/routes/+error.svelte -->
<script>
  import { page } from '$app/stores';
</script>

<h1>{$page.status}</h1>
<p>{$page.error?.message}</p>
```

### Throwing Errors

```typescript
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const post = await db.posts.find(params.id);

  if (!post) {
    throw error(404, {
      message: 'Post not found',
      code: 'POST_NOT_FOUND'
    });
  }

  return { post };
};
```

---

## Hooks

### Server Hooks

```typescript
// src/hooks.server.ts
import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Run before every request
  event.locals.user = await getUserFromCookie(event.cookies);

  const response = await resolve(event);

  // Modify response if needed
  return response;
};

export const handleError: HandleServerError = async ({ error, event }) => {
  console.error('Server error:', error);
  return {
    message: 'Internal Error',
    code: 'INTERNAL_ERROR'
  };
};
```

### Client Hooks

```typescript
// src/hooks.client.ts
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error }) => {
  console.error('Client error:', error);
  return {
    message: 'Something went wrong'
  };
};
```

> **Reference**: [Hooks Documentation](https://svelte.dev/docs/kit/hooks)

---

## Best Practices

### Data Loading

1. **Use `+page.server.ts` for sensitive data** - Database queries, API keys
2. **Use `+page.ts` for public data** - When you need client-side re-fetching
3. **Load data in layouts** - Share data across child routes
4. **Avoid waterfalls** - Load functions run in parallel by default

### Performance

1. **Prerender static content** - Blog posts, marketing pages
2. **Use streaming** - Return promises in load functions for progressive rendering
3. **Leverage prefetching** - SvelteKit prefetches on hover automatically
4. **Invalidate selectively** - Use `invalidate(url)` instead of `invalidateAll()`

### Security

1. **Validate all inputs** - In form actions and API routes
2. **Use CSRF protection** - Built into form actions
3. **Server-only secrets** - Keep in `$lib/server/` or `+server.ts`
4. **Sanitize user content** - Prevent XSS attacks

---

## Further Reading

- [SvelteKit Routing](https://svelte.dev/docs/kit/routing)
- [Loading Data](https://svelte.dev/docs/kit/load)
- [Form Actions](https://svelte.dev/docs/kit/form-actions)
- [Page Options](https://svelte.dev/docs/kit/page-options)
- [Hooks](https://svelte.dev/docs/kit/hooks)
- [Advanced Routing](https://svelte.dev/docs/kit/advanced-routing)
- [Understanding SvelteKit Data Flow (Joy of Code)](https://joyofcode.xyz/sveltekit-data-flow)
- [SvelteKit API Endpoints (Joy of Code)](https://joyofcode.xyz/sveltekit-loading-data)
