# State Management in Svelte 5

> **Official Documentation**: [Svelte State Management](https://svelte.dev/docs/svelte/$state)

This guide covers patterns for managing local and global state in Svelte 5 applications.

## State Types Overview

| Scope | Solution | Use Case |
|-------|----------|----------|
| Component | `$state` | Local UI state |
| Component Tree | Context API | Theme, auth, shared data |
| Global (Client) | Module state | App-wide client state |
| Request-scoped | Context + Layout | Server-safe global state |

---

## Local Component State

Use `$state` for component-local reactive state:

```svelte
<script>
  let count = $state(0);
  let user = $state({ name: '', email: '' });
  let items = $state<string[]>([]);

  function addItem(item: string) {
    items.push(item); // Deep reactivity
  }
</script>
```

> **Reference**: [$state Documentation](https://svelte.dev/docs/svelte/$state)

---

## Shared State with Context

### Setting Up Context

Use Svelte's context API for sharing state within a component tree:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { setContext } from 'svelte';

  // Create reactive state
  let theme = $state('light');
  let user = $state(null);

  // Share via context
  setContext('theme', {
    get value() { return theme; },
    toggle() { theme = theme === 'light' ? 'dark' : 'light'; }
  });

  setContext('user', {
    get current() { return user; },
    set(newUser) { user = newUser; },
    logout() { user = null; }
  });
</script>

{@render children()}
```

### Consuming Context

```svelte
<!-- Any child component -->
<script>
  import { getContext } from 'svelte';

  const theme = getContext('theme');
  const user = getContext('user');
</script>

<button onclick={theme.toggle}>
  Current theme: {theme.value}
</button>

{#if user.current}
  <p>Welcome, {user.current.name}</p>
{/if}
```

### Type-Safe Context Pattern

Create a dedicated context module for type safety:

```typescript
// src/lib/context/theme.ts
import { getContext, setContext } from 'svelte';

const THEME_KEY = Symbol('theme');

interface ThemeContext {
  readonly value: 'light' | 'dark';
  toggle(): void;
}

export function setThemeContext(initial: 'light' | 'dark' = 'light') {
  let theme = $state(initial);

  const ctx: ThemeContext = {
    get value() { return theme; },
    toggle() { theme = theme === 'light' ? 'dark' : 'light'; }
  };

  setContext(THEME_KEY, ctx);
  return ctx;
}

export function getThemeContext(): ThemeContext {
  return getContext<ThemeContext>(THEME_KEY);
}
```

```svelte
<!-- +layout.svelte -->
<script>
  import { setThemeContext } from '$lib/context/theme';
  setThemeContext('light');
</script>
```

```svelte
<!-- Component.svelte -->
<script>
  import { getThemeContext } from '$lib/context/theme';
  const theme = getThemeContext();
</script>
```

> **Reference**: [Svelte Context API](https://svelte.dev/docs/svelte/context)

---

## Global Module State (Client-Only)

For truly global state that persists across the entire client session:

### Using Classes (Recommended)

```typescript
// src/lib/stores/counter.svelte.ts
class Counter {
  value = $state(0);

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }

  reset() {
    this.value = 0;
  }
}

export const counter = new Counter();
```

```svelte
<script>
  import { counter } from '$lib/stores/counter.svelte';
</script>

<button onclick={counter.increment}>
  Count: {counter.value}
</button>
```

### Using Factory Functions

```typescript
// src/lib/stores/cart.svelte.ts
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function createCart() {
  let items = $state<CartItem[]>([]);

  const total = $derived(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  return {
    get items() { return items; },
    get total() { return total; },
    get count() { return items.length; },

    add(item: Omit<CartItem, 'quantity'>) {
      const existing = items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity++;
      } else {
        items.push({ ...item, quantity: 1 });
      }
    },

    remove(id: string) {
      const index = items.findIndex(i => i.id === id);
      if (index !== -1) items.splice(index, 1);
    },

    clear() {
      items = [];
    }
  };
}

export const cart = createCart();
```

> **Reference**: [Global State in Svelte 5](https://mainmatter.com/blog/2025/03/11/global-state-in-svelte-5/)

---

## Server-Safe State (Isomorphic Apps)

### The Problem with Global State on the Server

Global module state persists across all requests on the server, causing data leaks between users:

```typescript
// ❌ DANGEROUS - shared across all server requests
export const user = $state(null);
```

### Solution: Request-Scoped Context

Initialize state in your root layout and pass via context:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { setContext } from 'svelte';

  // Create fresh state per request
  let user = $state(null);
  let notifications = $state([]);

  setContext('app', {
    get user() { return user; },
    setUser(u) { user = u; },
    get notifications() { return notifications; },
    addNotification(n) { notifications.push(n); }
  });
</script>
```

### Using `event.locals` for Server State

```typescript
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Set request-specific data
  event.locals.user = await getUserFromSession(event.cookies);

  return resolve(event);
};
```

```typescript
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user
  };
};
```

---

## State Patterns

### Optimistic Updates

```typescript
// src/lib/stores/todos.svelte.ts
interface Todo {
  id: string;
  text: string;
  done: boolean;
}

function createTodoStore() {
  let todos = $state<Todo[]>([]);
  let pending = $state<Map<string, Todo>>(new Map());

  return {
    get all() { return todos; },
    get pendingCount() { return pending.size; },

    async add(text: string) {
      const optimistic: Todo = {
        id: `temp-${Date.now()}`,
        text,
        done: false
      };

      // Optimistic update
      todos.push(optimistic);
      pending.set(optimistic.id, optimistic);

      try {
        const saved = await api.createTodo(text);
        // Replace optimistic with real
        const index = todos.findIndex(t => t.id === optimistic.id);
        todos[index] = saved;
      } catch (error) {
        // Rollback on error
        todos = todos.filter(t => t.id !== optimistic.id);
        throw error;
      } finally {
        pending.delete(optimistic.id);
      }
    }
  };
}
```

### Persisted State

```typescript
// src/lib/stores/persisted.svelte.ts
import { browser } from '$app/environment';

function createPersistedState<T>(key: string, initial: T) {
  let value = $state<T>(initial);

  // Load from storage on client
  if (browser) {
    const stored = localStorage.getItem(key);
    if (stored) {
      value = JSON.parse(stored);
    }
  }

  // Sync to storage
  $effect(() => {
    if (browser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return {
    get value() { return value; },
    set value(v: T) { value = v; }
  };
}

export const preferences = createPersistedState('preferences', {
  theme: 'light',
  language: 'en'
});
```

---

## Best Practices

### Do's

1. **Use context for request-scoped state** in SSR applications
2. **Use classes for global stores** - they're more performant than POJOs
3. **Create type-safe context helpers** to prevent key collisions
4. **Keep state close to where it's used** - don't globalize everything
5. **Use `$derived` for computed values** instead of syncing with effects

### Don'ts

1. **Don't export raw `$state` variables** - wrap in objects or use getters
2. **Don't use global state for user data** on the server
3. **Don't sync state with `$effect`** - use `$derived` instead
4. **Don't mutate props directly** - use callbacks to update parent state

### Anti-Pattern Example

```typescript
// ❌ Bad - direct export loses reactivity
export let count = $state(0);

// ✅ Good - wrapped in object
export const counter = {
  get value() { return count; },
  set value(v) { count = v; }
};

// ✅ Better - class with methods
class Counter {
  value = $state(0);
  increment = () => this.value++;
}
export const counter = new Counter();
```

---

## Migration from Svelte 4 Stores

| Svelte 4 | Svelte 5 |
|----------|----------|
| `writable(0)` | `$state(0)` |
| `derived(store, ...)` | `$derived(...)` |
| `$store` (auto-subscribe) | Direct access |
| `store.set(value)` | Direct assignment |
| `store.update(fn)` | Direct mutation |

```typescript
// Svelte 4
import { writable, derived } from 'svelte/store';
const count = writable(0);
const doubled = derived(count, $c => $c * 2);

// Svelte 5
let count = $state(0);
let doubled = $derived(count * 2);
```

---

## Further Reading

- [$state Documentation](https://svelte.dev/docs/svelte/$state)
- [$derived Documentation](https://svelte.dev/docs/svelte/$derived)
- [Svelte Context API](https://svelte.dev/docs/svelte/context)
- [Global State in Svelte 5: Do's and Don'ts](https://mainmatter.com/blog/2025/03/11/global-state-in-svelte-5/)
- [Understanding Svelte 5 Runes](https://www.infoworld.com/article/2336000/reactive-magic-in-svelte-5-understanding-runes.html)
