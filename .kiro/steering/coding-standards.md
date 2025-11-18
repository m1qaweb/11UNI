---
inclusion: always
---

# Coding Standards

## TypeScript Standards

### Type Definitions

- Always define explicit types for function parameters and return values
- Use interfaces for object shapes, types for unions/primitives
- Export all types from `src/lib/types/index.ts`
- Avoid `any` type - use `unknown` if type is truly unknown

```typescript
// ✅ Good
interface MenuItem {
  id: string;
  name: string;
  price: number;
}

function getMenuItem(id: string): MenuItem | null {
  // implementation
}

// ❌ Bad
function getMenuItem(id) {
  // implementation
}
```

### Naming Conventions

- **Files**: kebab-case (e.g., `contact-form.svelte`, `menu-item.ts`)
- **Components**: PascalCase (e.g., `ContactForm.svelte`, `MenuItem.svelte`)
- **Variables/Functions**: camelCase (e.g., `menuItems`, `validateEmail`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `UI_TEXT`, `MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase (e.g., `MenuItem`, `FormData`)

## Svelte 5 Standards

### Runes Usage

Always use Svelte 5 runes instead of legacy reactive syntax:

```svelte
<script lang="ts">
  // ✅ Good - Svelte 5 runes
  let count = $state(0);
  let doubled = $derived(count * 2);

  $effect(() => {
    console.log('Count changed:', count);
  });

  // ❌ Bad - Legacy syntax
  let count = 0;
  $: doubled = count * 2;
  $: console.log('Count changed:', count);
</script>
```

### Component Structure

Organize component code in this order:

1. Script tag with imports
2. Props and state declarations
3. Derived values
4. Effects
5. Functions
6. Template
7. Styles (if component-scoped)

```svelte
<script lang="ts">
  // 1. Imports
  import { onMount } from 'svelte';
  import type { MenuItem } from '$lib/types';

  // 2. Props and state
  interface Props {
    item: MenuItem;
  }
  let { item }: Props = $props();
  let isHovered = $state(false);

  // 3. Derived values
  let formattedPrice = $derived(`${item.price} ₾`);

  // 4. Effects
  $effect(() => {
    console.log('Item changed:', item.name);
  });

  // 5. Functions
  function handleClick() {
    // implementation
  }
</script>

<!-- 6. Template -->
<div class="menu-item">
  {item.name}
</div>

<!-- 7. Styles -->
<style>
  .menu-item {
    /* styles */
  }
</style>
```

### Props Declaration

Use Svelte 5 `$props()` rune with TypeScript interface:

```svelte
<script lang="ts">
  interface Props {
    title: string;
    items: MenuItem[];
    onSelect?: (item: MenuItem) => void;
  }

  let { title, items, onSelect }: Props = $props();
</script>
```

## CSS/Tailwind Standards

### Utility-First Approach

Prefer Tailwind utility classes over custom CSS:

```svelte
<!-- ✅ Good -->
<div class="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-900">{title}</h2>
</div>

<!-- ❌ Bad -->
<div class="custom-container">
  <h2 class="custom-title">{title}</h2>
</div>

<style>
  .custom-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
</style>
```

### CSS Custom Properties

Use CSS variables for theme values:

```css
:root {
  --color-primary: #8b0000;
  --color-secondary: #ffd700;
  --color-text: #2c2c2c;
  --color-bg: #ffffff;
  --font-georgian: "Noto Sans Georgian", "BPG Nino", sans-serif;
  --spacing-unit: 8px;
}

/* Use in components */
.hero {
  background-color: var(--color-primary);
  font-family: var(--font-georgian);
}
```

### Responsive Design

Use Tailwind responsive prefixes:

```svelte
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns -->
</div>
```

## Georgian Language Standards

### Text Constants

Store all Georgian text in constants file:

```typescript
// src/lib/constants/georgian-text.ts
export const UI_TEXT = {
  navigation: {
    home: "მთავარი",
    about: "ჩვენს შესახებ",
    menu: "მენიუ",
  },
  buttons: {
    submit: "გაგზავნა",
    close: "დახურვა",
  },
} as const;
```

### Usage in Components

```svelte
<script lang="ts">
  import { UI_TEXT } from '$lib/constants/georgian-text';
</script>

<button>{UI_TEXT.buttons.submit}</button>
```

### Never Hardcode Text

```svelte
<!-- ❌ Bad -->
<button>გაგზავნა</button>

<!-- ✅ Good -->
<button>{UI_TEXT.buttons.submit}</button>
```

## Accessibility Standards

### Semantic HTML

Always use semantic HTML elements:

```svelte
<!-- ✅ Good -->
<nav aria-label="მთავარი ნავიგაცია">
  <ul>
    <li><a href="#home">მთავარი</a></li>
  </ul>
</nav>

<!-- ❌ Bad -->
<div class="nav">
  <div class="nav-item">
    <span onclick={goHome}>მთავარი</span>
  </div>
</div>
```

### ARIA Labels

Add ARIA labels in Georgian for all interactive elements:

```svelte
<button
  aria-label="დახურვა"
  onclick={handleClose}
>
  <CloseIcon />
</button>

<input
  type="email"
  aria-label="ელ-ფოსტა"
  aria-required="true"
  aria-describedby="email-error"
/>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```svelte
<script lang="ts">
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<div
  role="button"
  tabindex="0"
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  Click me
</div>
```

## Performance Standards

### Image Optimization

Always use responsive images with lazy loading:

```svelte
<picture>
  <source
    type="image/webp"
    srcset="/images/dish-320.webp 320w, /images/dish-640.webp 640w"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  <img
    src="/images/dish-640.jpg"
    alt={item.name}
    loading="lazy"
    decoding="async"
  />
</picture>
```

### Code Splitting

Use dynamic imports for heavy components:

```typescript
// ✅ Good - Lazy load lightbox
const Lightbox = () => import("$lib/components/Lightbox.svelte");

// ❌ Bad - Import everything upfront
import Lightbox from "$lib/components/Lightbox.svelte";
```

### Bundle Size

- Keep individual component files under 200 lines
- Extract reusable logic into utility functions
- Avoid large dependencies when native solutions exist

## Error Handling Standards

### Form Validation

Always validate on client-side with Georgian error messages:

```typescript
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.email.trim()) {
    errors.email = "ეს ველი სავალდებულოა";
  } else if (!validateEmail(data.email)) {
    errors.email = "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა";
  }

  return errors;
}
```

### Error Display

Show errors with proper ARIA announcements:

```svelte
{#if errors.email}
  <span
    id="email-error"
    role="alert"
    aria-live="polite"
    class="text-red-600 text-sm"
  >
    {errors.email}
  </span>
{/if}
```

### Image Error Handling

Always provide fallback for failed images:

```svelte
<script lang="ts">
  let imageError = $state(false);

  function handleError() {
    imageError = true;
  }
</script>

{#if !imageError}
  <img src={item.image} alt={item.name} onerror={handleError} />
{:else}
  <img src="/images/placeholder.jpg" alt="სურათი ვერ ჩაიტვირთა" />
{/if}
```

## Git Commit Standards

### Commit Message Format

```
[Task #X] Brief description

- Detailed change 1
- Detailed change 2

Requirements: X.X, X.X
```

### Examples

```
[Task #5.1] Create menu data with Georgian dishes

- Added 4 menu categories (appetizers, main, desserts, beverages)
- Included 15 traditional Georgian dishes with descriptions
- Added prices in Georgian Lari (₾)

Requirements: 1.1, 1.2, 1.3
```

## Testing Standards

### Manual Testing Checklist

Before marking a task complete:

- [ ] Component renders without errors
- [ ] Georgian text displays correctly
- [ ] Responsive on mobile (320px) and desktop (1440px)
- [ ] Keyboard navigation works
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors

### Browser Testing

Test on at least:

- Chrome (latest)
- Firefox (latest)
- Safari (latest, if on Mac)

## Code Review Checklist

Before considering code complete:

- [ ] All TypeScript types are properly defined
- [ ] Georgian text is in constants, not hardcoded
- [ ] Accessibility attributes are present (ARIA labels, semantic HTML)
- [ ] Images use lazy loading and have alt text
- [ ] No console.log statements in production code
- [ ] Code follows naming conventions
- [ ] Component is properly documented with comments
- [ ] Error handling is implemented
