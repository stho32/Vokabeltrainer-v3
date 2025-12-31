# Svelte 5 Runes & Reactivity System

> **Official Documentation**: [Svelte Runes](https://svelte.dev/docs/svelte/overview)

Svelte 5 introduces a revolutionary reactivity system called **runes**. Runes are special primitives marked with a `$` prefix that bring explicit, fine-grained reactivity to Svelte.

## Why Runes?

Svelte 4 used implicit reactivity through the compiler. Svelte 5's runes make reactivity:
- **Explicit** - You can see where reactivity happens
- **Portable** - Works in `.svelte.js` and `.svelte.ts` files, not just components
- **Performant** - Fine-grained updates with better TypeScript integration

> **Reference**: [Introducing Runes (Official Blog)](https://svelte.dev/blog/runes)

---

## Core Runes

### `$state` - Reactive State

The `$state` rune creates reactive variables that trigger UI updates when changed.

```svelte
<script>
  let count = $state(0);

  function increment() {
    count++; // Simple mutation triggers reactivity
  }
</script>

<button onclick={increment}>
  Clicks: {count}
</button>
```

**Key characteristics:**
- State is just a regular variable
- Updates work with normal JavaScript operators (`++`, `=`, etc.)
- Deep reactivity for objects and arrays

> **Reference**: [$state Documentation](https://svelte.dev/docs/svelte/$state)

#### Deep Reactivity

When you pass an object or array to `$state`, it becomes deeply reactive:

```svelte
<script>
  let todos = $state([
    { id: 1, text: 'Learn Svelte', done: false }
  ]);

  function addTodo(text) {
    todos.push({ id: Date.now(), text, done: false });
    // ↑ Push works! The array is a reactive proxy
  }

  function toggle(todo) {
    todo.done = !todo.done;
    // ↑ Nested property updates work too
  }
</script>
```

#### `$state.raw` - Non-Proxied State

For large collections you won't mutate, use `$state.raw` to avoid proxy overhead:

```svelte
<script>
  // Can only be reassigned, not mutated
  let items = $state.raw(largeDataArray);

  function updateItems(newItems) {
    items = newItems; // Reassignment works
    // items.push(...) // This won't trigger updates!
  }
</script>
```

#### `$state.snapshot` - Get Plain Objects

To pass state to external libraries that don't work with proxies:

```svelte
<script>
  let form = $state({ name: '', email: '' });

  function submit() {
    const data = $state.snapshot(form);
    // data is a plain object, not a proxy
    sendToAPI(data);
  }
</script>
```

---

### `$derived` - Computed Values

The `$derived` rune creates values that automatically update when their dependencies change.

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
  let quadrupled = $derived(doubled * 2);
</script>

<p>{count} × 2 = {doubled}</p>
<p>{count} × 4 = {quadrupled}</p>
```

**Key rules:**
- The expression must be **pure** (no side effects)
- Dependencies are tracked automatically
- Values are **memoized** - only recalculated when dependencies change

> **Reference**: [$derived Documentation](https://svelte.dev/docs/svelte/$derived)

#### `$derived.by` - Complex Derivations

For logic that requires multiple statements:

```svelte
<script>
  let items = $state([1, 2, 3, 4, 5]);

  let total = $derived.by(() => {
    let sum = 0;
    for (const item of items) {
      sum += item;
    }
    return sum;
  });

  let stats = $derived.by(() => {
    const sum = items.reduce((a, b) => a + b, 0);
    const avg = sum / items.length;
    return { sum, avg, count: items.length };
  });
</script>
```

---

### `$effect` - Side Effects

The `$effect` rune runs code when reactive dependencies change. Use it for DOM manipulation, API calls, or other side effects.

```svelte
<script>
  let count = $state(0);

  $effect(() => {
    console.log(`Count is now: ${count}`);
    document.title = `Count: ${count}`;
  });
</script>
```

**Important characteristics:**
- Runs after the DOM updates
- Only runs in the browser (not during SSR)
- Automatically tracks reactive dependencies read synchronously

> **Reference**: [$effect Documentation](https://svelte.dev/docs/svelte/$effect)

#### Cleanup Functions

Return a function to clean up before the effect re-runs or when the component unmounts:

```svelte
<script>
  let interval = $state(1000);

  $effect(() => {
    const id = setInterval(() => {
      console.log('tick');
    }, interval);

    return () => {
      clearInterval(id); // Cleanup
    };
  });
</script>
```

#### `$effect.pre` - Before DOM Updates

Runs before the DOM updates, useful for reading DOM state:

```svelte
<script>
  let messages = $state([]);
  let container;

  $effect.pre(() => {
    // Check scroll position before DOM updates
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;

      if (isAtBottom) {
        // Schedule scroll after DOM update
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    }
  });
</script>
```

---

### `$props` - Component Properties

The `$props` rune declares component properties:

```svelte
<script>
  // Basic props with defaults
  let { name, age = 18 } = $props();
</script>

<p>{name} is {age} years old</p>
```

#### Destructuring with Rest

```svelte
<script>
  let { href, children, ...rest } = $props();
</script>

<a {href} {...rest}>
  {@render children()}
</a>
```

#### TypeScript Support

```svelte
<script lang="ts">
  interface Props {
    name: string;
    age?: number;
    onUpdate?: (value: string) => void;
  }

  let { name, age = 18, onUpdate }: Props = $props();
</script>
```

> **Reference**: [$props Documentation](https://svelte.dev/docs/svelte/$props)

---

### `$bindable` - Two-Way Binding

Create props that support `bind:` from parent components:

```svelte
<!-- Counter.svelte -->
<script>
  let { value = $bindable(0) } = $props();
</script>

<button onclick={() => value++}>
  {value}
</button>
```

```svelte
<!-- Parent.svelte -->
<script>
  import Counter from './Counter.svelte';
  let count = $state(0);
</script>

<Counter bind:value={count} />
<p>Parent sees: {count}</p>
```

> **Reference**: [$bindable Documentation](https://svelte.dev/docs/svelte/$bindable)

---

## Best Practices

### Do: Use `$derived` for Computed Values

```svelte
<script>
  let items = $state([]);

  // ✅ Good - derived value
  let total = $derived(items.reduce((sum, item) => sum + item.price, 0));
</script>
```

### Don't: Use `$effect` to Sync State

```svelte
<script>
  let count = $state(0);

  // ❌ Bad - using effect to sync state
  let doubled = $state(0);
  $effect(() => {
    doubled = count * 2;
  });

  // ✅ Good - use $derived instead
  let doubled = $derived(count * 2);
</script>
```

### Do: Keep Effects Focused

```svelte
<script>
  let user = $state(null);

  // ✅ Good - focused effect with cleanup
  $effect(() => {
    if (!user) return;

    const controller = new AbortController();

    fetch(`/api/user/${user.id}`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => { /* handle data */ });

    return () => controller.abort();
  });
</script>
```

### Do: Use Runes in `.svelte.js/.svelte.ts` Files

Runes work in special JavaScript/TypeScript files:

```typescript
// counter.svelte.ts
export function createCounter(initial = 0) {
  let count = $state(initial);

  return {
    get value() { return count; },
    increment() { count++; },
    decrement() { count--; }
  };
}
```

```svelte
<!-- Component.svelte -->
<script>
  import { createCounter } from './counter.svelte.ts';

  const counter = createCounter(10);
</script>

<button onclick={counter.increment}>
  {counter.value}
</button>
```

---

## Comparison: Svelte 4 vs Svelte 5

| Svelte 4 | Svelte 5 |
|----------|----------|
| `let count = 0;` | `let count = $state(0);` |
| `$: doubled = count * 2;` | `let doubled = $derived(count * 2);` |
| `$: { console.log(count); }` | `$effect(() => { console.log(count); });` |
| `export let name;` | `let { name } = $props();` |

---

## Further Reading

- [Svelte 5 Runes Overview](https://svelte.dev/docs/svelte/overview)
- [$state Documentation](https://svelte.dev/docs/svelte/$state)
- [$derived Documentation](https://svelte.dev/docs/svelte/$derived)
- [$effect Documentation](https://svelte.dev/docs/svelte/$effect)
- [$props Documentation](https://svelte.dev/docs/svelte/$props)
- [Runes Blog Announcement](https://svelte.dev/blog/runes)
- [Understanding Svelte 5 Runes: $derived vs $effect](https://dev.to/mikehtmlallthethings/understanding-svelte-5-runes-derived-vs-effect-1hh)
- [Signals in Svelte 5: A Comprehensive Guide to Runes](https://www.divotion.com/blog/signals-in-svelte-5-a-comprehensive-guide-to-runes)
