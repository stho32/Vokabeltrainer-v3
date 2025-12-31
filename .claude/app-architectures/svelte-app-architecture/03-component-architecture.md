# Svelte Component Architecture

> **Official Documentation**: [Svelte Components](https://svelte.dev/docs/svelte/svelte-components)

This guide covers best practices for building and organizing Svelte 5 components.

## Component Basics

A Svelte component is a `.svelte` file containing markup, styles, and logic:

```svelte
<script>
  let { name } = $props();
  let count = $state(0);
</script>

<div class="greeting">
  <h1>Hello, {name}!</h1>
  <button onclick={() => count++}>
    Clicked {count} times
  </button>
</div>

<style>
  .greeting {
    padding: 1rem;
    border: 1px solid #ccc;
  }
</style>
```

---

## Component Organization

### Atomic Design Pattern

Organize components using atomic design principles:

```
src/lib/components/
├── atoms/           # Basic building blocks
│   ├── Button.svelte
│   ├── Input.svelte
│   ├── Icon.svelte
│   └── Badge.svelte
├── molecules/       # Combinations of atoms
│   ├── SearchBar.svelte
│   ├── FormField.svelte
│   └── Card.svelte
├── organisms/       # Complex UI sections
│   ├── Header.svelte
│   ├── Sidebar.svelte
│   └── ProductList.svelte
├── templates/       # Page layouts
│   └── DashboardLayout.svelte
└── index.ts         # Barrel exports
```

> **Reference**: [Beatbump Project Structure (Real-World Example)](https://codeparrot.ai/blogs/beatbump-exploring-svelte-best-practices-for-dynamic-web-applications)

### Feature-Based Organization

For larger apps, organize by feature:

```
src/lib/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.svelte
│   │   │   └── RegisterForm.svelte
│   │   ├── stores/
│   │   │   └── auth.svelte.ts
│   │   └── types.ts
│   ├── blog/
│   │   ├── components/
│   │   │   ├── PostCard.svelte
│   │   │   └── PostList.svelte
│   │   └── types.ts
│   └── shared/
│       └── components/
│           ├── Button.svelte
│           └── Modal.svelte
```

---

## Props and Events

### Defining Props with `$props`

```svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    children: import('svelte').Snippet;
    onclick?: (event: MouseEvent) => void;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    children,
    onclick
  }: Props = $props();
</script>

<button
  class="btn btn-{variant} btn-{size}"
  {disabled}
  {onclick}
>
  {@render children()}
</button>
```

### Event Callbacks (Svelte 5 Pattern)

Svelte 5 uses callback props instead of `createEventDispatcher`:

```svelte
<!-- Child.svelte -->
<script lang="ts">
  interface Props {
    onSelect?: (item: Item) => void;
    onChange?: (value: string) => void;
  }

  let { onSelect, onChange }: Props = $props();

  function handleClick(item: Item) {
    onSelect?.(item);
  }
</script>
```

```svelte
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';

  function handleSelect(item) {
    console.log('Selected:', item);
  }
</script>

<Child onSelect={handleSelect} />
```

---

## Snippets and Composition

### Using Snippets (Svelte 5)

Snippets replace slots for content projection:

```svelte
<!-- Card.svelte -->
<script>
  let { header, children, footer } = $props();
</script>

<div class="card">
  {#if header}
    <div class="card-header">
      {@render header()}
    </div>
  {/if}

  <div class="card-body">
    {@render children()}
  </div>

  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}
</div>
```

```svelte
<!-- Usage -->
<Card>
  {#snippet header()}
    <h2>Card Title</h2>
  {/snippet}

  <p>Card content goes here</p>

  {#snippet footer()}
    <button>Action</button>
  {/snippet}
</Card>
```

### Snippets with Parameters

```svelte
<!-- List.svelte -->
<script lang="ts">
  interface Props<T> {
    items: T[];
    renderItem: import('svelte').Snippet<[T, number]>;
  }

  let { items, renderItem }: Props<T> = $props();
</script>

<ul>
  {#each items as item, index}
    <li>
      {@render renderItem(item, index)}
    </li>
  {/each}
</ul>
```

```svelte
<!-- Usage -->
<List {items}>
  {#snippet renderItem(item, index)}
    <span>{index + 1}. {item.name}</span>
  {/snippet}
</List>
```

> **Reference**: [Svelte Snippets Documentation](https://svelte.dev/docs/svelte/snippet)

---

## Component Patterns

### Compound Components

Group related components together:

```svelte
<!-- Tabs/index.ts -->
export { default as Tabs } from './Tabs.svelte';
export { default as Tab } from './Tab.svelte';
export { default as TabPanel } from './TabPanel.svelte';
```

```svelte
<!-- Tabs.svelte -->
<script>
  import { setContext } from 'svelte';

  let { children } = $props();
  let activeTab = $state(0);

  setContext('tabs', {
    get active() { return activeTab; },
    setActive(index) { activeTab = index; }
  });
</script>

<div class="tabs">
  {@render children()}
</div>
```

### Wrapper Components

Extend native elements:

```svelte
<!-- Button.svelte -->
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary';
    loading?: boolean;
  }

  let {
    variant = 'primary',
    loading = false,
    children,
    disabled,
    ...rest
  }: Props = $props();
</script>

<button
  class="btn btn-{variant}"
  disabled={disabled || loading}
  {...rest}
>
  {#if loading}
    <span class="spinner"></span>
  {/if}
  {@render children?.()}
</button>
```

### Headless Components

Provide logic without rendering:

```svelte
<!-- UseClickOutside.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    onClickOutside: () => void;
    children: import('svelte').Snippet<[{ ref: (node: HTMLElement) => void }]>;
  }

  let { onClickOutside, children }: Props = $props();
  let element: HTMLElement | null = null;

  function ref(node: HTMLElement) {
    element = node;
  }

  onMount(() => {
    function handleClick(event: MouseEvent) {
      if (element && !element.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
</script>

{@render children({ ref })}
```

---

## Styling Best Practices

### Scoped Styles (Default)

Styles in `<style>` are scoped to the component:

```svelte
<style>
  /* Only affects this component */
  .button {
    background: blue;
  }
</style>
```

### Global Styles

Use `:global()` sparingly:

```svelte
<style>
  /* Global style */
  :global(body) {
    margin: 0;
  }

  /* Scoped container with global children */
  .markdown :global(h1) {
    font-size: 2rem;
  }
</style>
```

### CSS Custom Properties for Theming

```svelte
<!-- Button.svelte -->
<button class="btn">
  {@render children()}
</button>

<style>
  .btn {
    background: var(--btn-bg, #007bff);
    color: var(--btn-color, white);
    padding: var(--btn-padding, 0.5rem 1rem);
  }
</style>
```

```svelte
<!-- Usage with custom theme -->
<div style="--btn-bg: green; --btn-color: white;">
  <Button>Green Button</Button>
</div>
```

> **Reference**: [Svelte Styling Documentation](https://svelte.dev/docs/svelte/styles)

---

## Lifecycle and Actions

### Lifecycle Functions

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';

  onMount(() => {
    console.log('Component mounted');

    return () => {
      console.log('Cleanup on unmount');
    };
  });
</script>
```

### Actions for DOM Manipulation

Actions are functions that run when an element is created:

```svelte
<script>
  function tooltip(node, text) {
    // Setup
    const tip = document.createElement('div');
    tip.textContent = text;
    tip.className = 'tooltip';

    function show() {
      document.body.appendChild(tip);
    }

    function hide() {
      tip.remove();
    }

    node.addEventListener('mouseenter', show);
    node.addEventListener('mouseleave', hide);

    return {
      update(newText) {
        tip.textContent = newText;
      },
      destroy() {
        node.removeEventListener('mouseenter', show);
        node.removeEventListener('mouseleave', hide);
      }
    };
  }
</script>

<button use:tooltip="Click me!">
  Hover for tooltip
</button>
```

> **Reference**: [Svelte Actions Documentation](https://svelte.dev/docs/svelte/use)

---

## Best Practices Summary

### Do:

1. **Keep components focused** - One responsibility per component
2. **Use TypeScript** - Type your props and events
3. **Prefer composition** - Use snippets over complex prop drilling
4. **Use scoped styles** - Default to component-scoped CSS
5. **Extract reusable logic** - Put shared logic in `.svelte.ts` files

### Don't:

1. **Don't make components too large** - Split at ~200 lines
2. **Don't deeply nest components** - Flatten when possible
3. **Don't overuse `:global()`** - Keep styles scoped
4. **Don't mix concerns** - Separate data fetching from presentation

---

## Further Reading

- [Svelte Component Documentation](https://svelte.dev/docs/svelte/svelte-components)
- [Svelte Snippets](https://svelte.dev/docs/svelte/snippet)
- [Svelte Actions](https://svelte.dev/docs/svelte/use)
- [Svelte Styling](https://svelte.dev/docs/svelte/styles)
- [Mastering Svelte: Advanced Techniques and Best Practices](https://devbrite.io/mastering-sveltejs-advanced-techniques-best-practices)
