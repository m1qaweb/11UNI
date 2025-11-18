---
inclusion: fileMatch
fileMatchPattern: "*.svelte"
---

# SvelteKit and Svelte 5 Patterns

## File-Based Routing

SvelteKit uses file-based routing. Key files:

- `+page.svelte` - Page component
- `+page.ts` - Page data/metadata (runs on client)
- `+layout.svelte` - Layout wrapper for pages
- `+error.svelte` - Error boundary
- `+server.ts` - API endpoint

## Static Adapter Configuration

For this project, we use static adapter with full pre-rendering:

```javascript
// svelte.config.js
import adapter from "@sveltejs/adapter-static";

const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: true,
      strict: true,
    }),
    prerender: {
      entries: ["*"],
    },
  },
};
```

## Svelte 5 Runes Reference

### $state - Reactive State

```svelte
<script lang="ts">
  // Simple state
  let count = $state(0);

  // Object state
  let user = $state({ name: '', email: '' });

  // Array state
  let items = $state<MenuItem[]>([]);

  // Update state
  function increment() {
    count++; // Direct mutation works!
  }

  function addItem(item: MenuItem) {
    items.push(item); // Direct array mutation works!
  }
</script>
```

### $derived - Computed Values

```svelte
<script lang="ts">
  let count = $state(0);

  // Simple derived
  let doubled = $derived(count * 2);

  // Complex derived
  let summary = $derived({
    count,
    doubled,
    message: `Count is ${count}`
  });

  // Derived from props
  interface Props {
    items: MenuItem[];
  }
  let { items }: Props = $props();

  let total = $derived(
    items.reduce((sum, item) => sum + item.price, 0)
  );
</script>
```

### $effect - Side Effects

```svelte
<script lang="ts">
  let count = $state(0);

  // Run effect when dependencies change
  $effect(() => {
    console.log('Count changed:', count);
    document.title = `Count: ${count}`;
  });

  // Effect with cleanup
  $effect(() => {
    const interval = setInterval(() => {
      count++;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  // Effect that runs once (no dependencies)
  $effect(() => {
    console.log('Component mounted');
  });
</script>
```

### $props - Component Props

```svelte
<script lang="ts">
  // Define props interface
  interface Props {
    title: string;
    items: MenuItem[];
    onSelect?: (item: MenuItem) => void;
    class?: string;
  }

  // Destructure props with defaults
  let {
    title,
    items,
    onSelect,
    class: className = ''
  }: Props = $props();

  // Props are reactive - no need for $derived
  // Just use them directly in template
</script>

<div class={className}>
  <h2>{title}</h2>
  {#each items as item}
    <button onclick={() => onSelect?.(item)}>
      {item.name}
    </button>
  {/each}
</div>
```

## Component Patterns

### Container/Presentational Pattern

```svelte
<!-- Menu.svelte - Container -->
<script lang="ts">
  import MenuItem from './MenuItem.svelte';
  import { menuData } from '$lib/data/menu';

  let selectedCategory = $state('all');

  let filteredItems = $derived(
    selectedCategory === 'all'
      ? menuData
      : menuData.filter(item => item.category === selectedCategory)
  );
</script>

<div class="menu">
  {#each filteredItems as item}
    <MenuItem {item} />
  {/each}
</div>

<!-- MenuItem.svelte - Presentational -->
<script lang="ts">
  import type { MenuItem } from '$lib/types';

  interface Props {
    item: MenuItem;
  }

  let { item }: Props = $props();
</script>

<div class="menu-item">
  <h3>{item.name}</h3>
  <p>{item.description}</p>
  <span>{item.price} ₾</span>
</div>
```

### Modal/Overlay Pattern

```svelte
<script lang="ts">
  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  // Close on Escape key
  $effect(() => {
    if (!isOpen) return;

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  // Prevent body scroll when open
  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black/50 z-50"
    onclick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div
      class="bg-white p-6 rounded-lg"
      onclick={(e) => e.stopPropagation()}
    >
      <slot />
    </div>
  </div>
{/if}
```

### Form Handling Pattern

```svelte
<script lang="ts">
  import { validateForm } from '$lib/utils/validation';
  import { UI_TEXT } from '$lib/constants/georgian-text';
  import type { FormData, FormErrors } from '$lib/types';

  let formData = $state<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  let errors = $state<FormErrors>({});
  let isSubmitting = $state(false);
  let submitSuccess = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();

    // Validate
    errors = validateForm(formData);
    if (Object.keys(errors).length > 0) return;

    // Submit
    isSubmitting = true;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Submission failed');

      submitSuccess = true;
      formData = { name: '', email: '', phone: '', message: '' };
    } catch (error) {
      errors.submit = UI_TEXT.errors.networkError;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form onsubmit={handleSubmit}>
  <div>
    <label for="email">{UI_TEXT.form.email}</label>
    <input
      id="email"
      type="email"
      bind:value={formData.email}
      aria-invalid={!!errors.email}
      aria-describedby={errors.email ? 'email-error' : undefined}
    />
    {#if errors.email}
      <span id="email-error" role="alert">{errors.email}</span>
    {/if}
  </div>

  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? UI_TEXT.messages.loading : UI_TEXT.buttons.submit}
  </button>

  {#if submitSuccess}
    <div role="status">{UI_TEXT.messages.success}</div>
  {/if}
</form>
```

### Intersection Observer Pattern

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  let element: HTMLElement;
  let isVisible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<div
  bind:this={element}
  class:fade-in={isVisible}
>
  <slot />
</div>

<style>
  div {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s;
  }

  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }
</style>
```

## Transitions and Animations

### Built-in Transitions

```svelte
<script lang="ts">
  import { fade, slide, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let isVisible = $state(false);
</script>

{#if isVisible}
  <!-- Fade in/out -->
  <div transition:fade={{ duration: 300 }}>
    Content
  </div>

  <!-- Slide down/up -->
  <div transition:slide={{ duration: 300 }}>
    Content
  </div>

  <!-- Fly in from top -->
  <div transition:fly={{ y: -20, duration: 300, easing: quintOut }}>
    Content
  </div>
{/if}
```

### Custom Transitions

```svelte
<script lang="ts">
  function fadeScale(node: HTMLElement, { duration = 300 }) {
    return {
      duration,
      css: (t: number) => `
        opacity: ${t};
        transform: scale(${0.95 + (t * 0.05)});
      `
    };
  }
</script>

{#if isVisible}
  <div transition:fadeScale={{ duration: 400 }}>
    Content
  </div>
{/if}
```

## Event Handling

### Modern Event Syntax

```svelte
<script lang="ts">
  function handleClick(event: MouseEvent) {
    console.log('Clicked:', event.target);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleClick(event as any);
    }
  }
</script>

<!-- Use onclick instead of on:click -->
<button onclick={handleClick}>
  Click me
</button>

<!-- Event with inline handler -->
<button onclick={() => console.log('Clicked')}>
  Click me
</button>

<!-- Multiple events -->
<input
  oninput={(e) => console.log(e.currentTarget.value)}
  onfocus={() => console.log('Focused')}
  onblur={() => console.log('Blurred')}
/>
```

## Snippets (Svelte 5 Feature)

### Basic Snippet

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    header: Snippet;
    footer: Snippet;
  }

  let { header, footer }: Props = $props();
</script>

<div class="card">
  <div class="card-header">
    {@render header()}
  </div>

  <div class="card-body">
    <slot />
  </div>

  <div class="card-footer">
    {@render footer()}
  </div>
</div>
```

### Snippet with Parameters

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    items: MenuItem[];
    renderItem: Snippet<[MenuItem, number]>;
  }

  let { items, renderItem }: Props = $props();
</script>

<ul>
  {#each items as item, index}
    <li>
      {@render renderItem(item, index)}
    </li>
  {/each}
</ul>
```

## Common Pitfalls to Avoid

### ❌ Don't use legacy reactive syntax

```svelte
<!-- Bad -->
<script>
  let count = 0;
  $: doubled = count * 2;
</script>

<!-- Good -->
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

### ❌ Don't mutate props directly

```svelte
<!-- Bad -->
<script lang="ts">
  interface Props {
    count: number;
  }
  let { count }: Props = $props();

  function increment() {
    count++; // Error! Props are readonly
  }
</script>

<!-- Good -->
<script lang="ts">
  interface Props {
    count: number;
    onIncrement: () => void;
  }
  let { count, onIncrement }: Props = $props();
</script>

<button onclick={onIncrement}>Increment</button>
```

### ❌ Don't forget to cleanup effects

```svelte
<!-- Bad -->
<script lang="ts">
  $effect(() => {
    const interval = setInterval(() => {
      console.log('Tick');
    }, 1000);
    // Memory leak! Interval never cleared
  });
</script>

<!-- Good -->
<script lang="ts">
  $effect(() => {
    const interval = setInterval(() => {
      console.log('Tick');
    }, 1000);

    return () => clearInterval(interval);
  });
</script>
```

## Performance Tips

1. **Use $derived for computed values** - More efficient than recalculating in template
2. **Lazy load heavy components** - Use dynamic imports for modals, lightboxes
3. **Use keyed each blocks** - Helps Svelte optimize list updates
4. **Avoid unnecessary effects** - Only use $effect when you need side effects
5. **Memoize expensive computations** - Use $derived for caching

```svelte
<script lang="ts">
  let items = $state<MenuItem[]>([]);

  // ✅ Good - Computed once, cached
  let total = $derived(
    items.reduce((sum, item) => sum + item.price, 0)
  );
</script>

<!-- Use the cached value -->
<p>Total: {total} ₾</p>
```
