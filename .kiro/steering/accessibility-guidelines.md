---
inclusion: always
---

# Accessibility Guidelines (WCAG AA Compliance)

## Overview

This project aims for WCAG 2.1 Level AA compliance. All components must be accessible to users with disabilities, including those using screen readers, keyboard navigation, and other assistive technologies.

## Semantic HTML

### Use Proper HTML Elements

Always use semantic HTML elements instead of generic divs:

```svelte
<!-- ✅ Good -->
<nav aria-label="მთავარი ნავიგაცია">
  <ul>
    <li><a href="#home">მთავარი</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>სათაური</h1>
    <p>შინაარსი</p>
  </article>
</main>

<footer>
  <p>© 2024 რესტორანი</p>
</footer>

<!-- ❌ Bad -->
<div class="nav">
  <div class="nav-item">მთავარი</div>
</div>

<div class="main">
  <div class="article">
    <div class="title">სათაური</div>
    <div class="content">შინაარსი</div>
  </div>
</div>
```

### Heading Hierarchy

Maintain proper heading hierarchy (h1 → h2 → h3):

```svelte
<h1>რესტორნის სახელი</h1>
  <h2>ჩვენს შესახებ</h2>
    <h3>ჩვენი ისტორია</h3>
    <h3>ჩვენი გუნდი</h3>
  <h2>მენიუ</h2>
    <h3>წახემსები</h3>
    <h3>ძირითადი კერძები</h3>
```

## Keyboard Navigation

### All Interactive Elements Must Be Keyboard Accessible

```svelte
<script lang="ts">
  function handleClick() {
    console.log('Clicked');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<!-- Button - naturally keyboard accessible -->
<button onclick={handleClick}>
  დაჯავშნა
</button>

<!-- Custom interactive element - needs keyboard support -->
<div
  role="button"
  tabindex="0"
  onclick={handleClick}
  onkeydown={handleKeydown}
  aria-label="დაჯავშნა"
>
  დაჯავშნა
</div>
```

### Focus Indicators

Always provide visible focus indicators:

```css
/* Global focus styles */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove default outline only if providing custom */
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Skip to Content Link

Provide a skip link for keyboard users:

```svelte
<!-- +layout.svelte -->
<a href="#main-content" class="skip-link">
  გადასვლა შინაარსზე
</a>

<nav>
  <!-- Navigation -->
</nav>

<main id="main-content" tabindex="-1">
  <!-- Main content -->
</main>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 100;
    border-radius: 0 0 4px 0;
  }

  .skip-link:focus {
    top: 0;
  }
</style>
```

### Tab Order

Ensure logical tab order:

```svelte
<!-- Natural tab order (no tabindex needed) -->
<form>
  <input type="text" /> <!-- Tab 1 -->
  <input type="email" /> <!-- Tab 2 -->
  <button type="submit">გაგზავნა</button> <!-- Tab 3 -->
</form>

<!-- Custom tab order (avoid if possible) -->
<div tabindex="0">First</div>
<div tabindex="0">Second</div>
<div tabindex="0">Third</div>
```

## ARIA Labels and Roles

### ARIA Labels in Georgian

All ARIA labels must be in Georgian:

```svelte
<button aria-label="დახურვა" onclick={handleClose}>
  <CloseIcon />
</button>

<nav aria-label="მთავარი ნავიგაცია">
  <ul role="menubar">
    <li role="none">
      <a href="#home" role="menuitem">მთავარი</a>
    </li>
  </ul>
</nav>

<input
  type="search"
  aria-label="ძიება"
  placeholder="ძიება..."
/>
```

### ARIA Roles

Use appropriate ARIA roles:

```svelte
<!-- Navigation -->
<nav role="navigation" aria-label="მთავარი ნავიგაცია">
  <!-- Content -->
</nav>

<!-- Modal Dialog -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">დიალოგის სათაური</h2>
  <!-- Content -->
</div>

<!-- Alert -->
<div role="alert" aria-live="polite">
  შეცდომა: გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა
</div>

<!-- Status -->
<div role="status" aria-live="polite">
  იტვირთება...
</div>
```

### ARIA States

Update ARIA states dynamically:

```svelte
<script lang="ts">
  let isExpanded = $state(false);
  let isPressed = $state(false);
  let isChecked = $state(false);
</script>

<button
  aria-expanded={isExpanded}
  onclick={() => isExpanded = !isExpanded}
>
  მენიუ
</button>

<button
  aria-pressed={isPressed}
  onclick={() => isPressed = !isPressed}
>
  ფავორიტი
</button>

<div
  role="checkbox"
  aria-checked={isChecked}
  tabindex="0"
  onclick={() => isChecked = !isChecked}
>
  დამახსოვრება
</div>
```

## Form Accessibility

### Labels and Inputs

Always associate labels with inputs:

```svelte
<script lang="ts">
  import { UI_TEXT } from '$lib/constants/georgian-text';

  let email = $state('');
  let errors = $state<Record<string, string>>({});
</script>

<!-- Method 1: for/id association -->
<label for="email">{UI_TEXT.form.email} *</label>
<input
  id="email"
  type="email"
  bind:value={email}
  required
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{#if errors.email}
  <span id="email-error" role="alert" aria-live="polite">
    {errors.email}
  </span>
{/if}

<!-- Method 2: Wrapping label -->
<label>
  {UI_TEXT.form.name} *
  <input
    type="text"
    required
    aria-required="true"
  />
</label>
```

### Required Fields

Indicate required fields clearly:

```svelte
<label for="name">
  სახელი
  <span class="text-red-500" aria-label="სავალდებულო">*</span>
</label>
<input
  id="name"
  type="text"
  required
  aria-required="true"
/>
```

### Error Messages

Provide clear, accessible error messages:

```svelte
<script lang="ts">
  let email = $state('');
  let errors = $state<Record<string, string>>({});

  function validateEmail() {
    if (!email) {
      errors.email = 'ეს ველი სავალდებულოა';
    } else if (!email.includes('@')) {
      errors.email = 'გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა';
    } else {
      delete errors.email;
    }
  }
</script>

<div>
  <label for="email">ელ-ფოსტა *</label>
  <input
    id="email"
    type="email"
    bind:value={email}
    onblur={validateEmail}
    aria-invalid={!!errors.email}
    aria-describedby="email-error email-hint"
  />
  <span id="email-hint" class="text-sm text-gray-600">
    მაგალითი: user@example.com
  </span>
  {#if errors.email}
    <span
      id="email-error"
      role="alert"
      aria-live="polite"
      class="text-red-600"
    >
      {errors.email}
    </span>
  {/if}
</div>
```

### Form Submission States

Announce form submission states:

```svelte
<script lang="ts">
  let isSubmitting = $state(false);
  let submitSuccess = $state(false);
  let submitError = $state('');
</script>

<form onsubmit={handleSubmit}>
  <!-- Form fields -->

  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'იგზავნება...' : 'გაგზავნა'}
  </button>

  {#if isSubmitting}
    <div role="status" aria-live="polite">
      თქვენი შეტყობინება იგზავნება...
    </div>
  {/if}

  {#if submitSuccess}
    <div role="status" aria-live="polite" class="text-green-600">
      თქვენი შეტყობინება წარმატებით გაიგზავნა
    </div>
  {/if}

  {#if submitError}
    <div role="alert" aria-live="assertive" class="text-red-600">
      {submitError}
    </div>
  {/if}
</form>
```

## Color Contrast

### WCAG AA Requirements

- **Normal text** (< 18pt): Contrast ratio ≥ 4.5:1
- **Large text** (≥ 18pt or 14pt bold): Contrast ratio ≥ 3:1
- **UI components**: Contrast ratio ≥ 3:1

### Checking Contrast

Use browser DevTools or online tools:

- Chrome DevTools: Inspect element → Accessibility pane
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Example Color Palette

```css
:root {
  /* Text on white background */
  --color-text: #2c2c2c; /* Contrast: 12.6:1 ✅ */
  --color-text-light: #666666; /* Contrast: 5.7:1 ✅ */

  /* Primary color */
  --color-primary: #8b0000; /* Dark red */
  --color-primary-text: #ffffff; /* White text on primary: 7.3:1 ✅ */

  /* Error color */
  --color-error: #dc2626; /* Red */
  --color-error-bg: #fee2e2; /* Light red background */

  /* Success color */
  --color-success: #059669; /* Green */
  --color-success-bg: #d1fae5; /* Light green background */
}
```

### Don't Rely on Color Alone

Provide additional indicators:

```svelte
<!-- ❌ Bad - Color only -->
<span class="text-red-600">შეცდომა</span>

<!-- ✅ Good - Icon + Color + Text -->
<span class="text-red-600 flex items-center gap-2">
  <ErrorIcon aria-hidden="true" />
  <span>შეცდომა: გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა</span>
</span>
```

## Images and Media

### Alt Text

Provide descriptive alt text in Georgian:

```svelte
<!-- Informative image -->
<img
  src="/images/khinkali.jpg"
  alt="ხინკალი - ტრადიციული ქართული კერძი"
/>

<!-- Decorative image -->
<img
  src="/images/pattern.svg"
  alt=""
  role="presentation"
/>

<!-- Icon with adjacent text -->
<button>
  <PhoneIcon aria-hidden="true" />
  <span>დარეკვა</span>
</button>

<!-- Icon without text -->
<button aria-label="დახურვა">
  <CloseIcon aria-hidden="true" />
</button>
```

### Background Images

Provide text alternatives for background images:

```svelte
<div
  class="hero"
  style="background-image: url('/images/hero.jpg')"
  role="img"
  aria-label="რესტორნის ინტერიერი - თბილი და მყუდრო ატმოსფერო"
>
  <h1>კეთილი იყოს თქვენი მობრძანება</h1>
</div>
```

## Interactive Components

### Modal/Dialog

```svelte
<script lang="ts">
  let isOpen = $state(false);
  let previousFocus: HTMLElement | null = null;

  function openModal() {
    previousFocus = document.activeElement as HTMLElement;
    isOpen = true;
  }

  function closeModal() {
    isOpen = false;
    previousFocus?.focus();
  }

  // Trap focus inside modal
  $effect(() => {
    if (!isOpen) return;

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if isOpen}
  <div
    class="modal-overlay"
    onclick={closeModal}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div
      class="modal-content"
      onclick={(e) => e.stopPropagation()}
    >
      <h2 id="modal-title">დიალოგის სათაური</h2>

      <button
        onclick={closeModal}
        aria-label="დახურვა"
      >
        <CloseIcon aria-hidden="true" />
      </button>

      <div>
        <!-- Modal content -->
      </div>
    </div>
  </div>
{/if}
```

### Accordion

```svelte
<script lang="ts">
  let isExpanded = $state(false);
</script>

<div class="accordion">
  <button
    onclick={() => isExpanded = !isExpanded}
    aria-expanded={isExpanded}
    aria-controls="accordion-content"
  >
    <span>კითხვა</span>
    <ChevronIcon aria-hidden="true" />
  </button>

  {#if isExpanded}
    <div id="accordion-content" role="region">
      პასუხი
    </div>
  {/if}
</div>
```

### Tabs

```svelte
<script lang="ts">
  let activeTab = $state(0);
  const tabs = ['წახემსები', 'ძირითადი კერძები', 'დესერტები'];
</script>

<div class="tabs">
  <div role="tablist" aria-label="მენიუს კატეგორიები">
    {#each tabs as tab, index}
      <button
        role="tab"
        aria-selected={activeTab === index}
        aria-controls={`panel-${index}`}
        id={`tab-${index}`}
        tabindex={activeTab === index ? 0 : -1}
        onclick={() => activeTab = index}
      >
        {tab}
      </button>
    {/each}
  </div>

  {#each tabs as tab, index}
    <div
      role="tabpanel"
      id={`panel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={activeTab !== index}
    >
      <!-- Tab content -->
    </div>
  {/each}
</div>
```

## Screen Reader Announcements

### Live Regions

Use aria-live for dynamic content:

```svelte
<!-- Polite - waits for user to finish -->
<div aria-live="polite" aria-atomic="true">
  {itemCount} ელემენტი დაემატა კალათაში
</div>

<!-- Assertive - interrupts immediately -->
<div aria-live="assertive" role="alert">
  შეცდომა: გთხოვთ შეავსოთ ყველა სავალდებულო ველი
</div>
```

### Visually Hidden Text

Provide context for screen readers:

```svelte
<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>

<button>
  <span class="sr-only">დახურვა</span>
  <CloseIcon aria-hidden="true" />
</button>

<a href="/menu">
  მენიუს ნახვა
  <span class="sr-only">(გაიხსნება ახალ ფანჯარაში)</span>
</a>
```

## Testing Checklist

### Automated Testing

- [ ] Run Lighthouse accessibility audit (score ≥ 90)
- [ ] Run axe DevTools
- [ ] Validate HTML (W3C Validator)

### Manual Testing

- [ ] Navigate entire site using only keyboard (Tab, Enter, Escape, Arrows)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify all images have appropriate alt text
- [ ] Check color contrast ratios
- [ ] Test form validation and error messages
- [ ] Verify focus indicators are visible
- [ ] Test modal/dialog focus trapping
- [ ] Verify skip link works
- [ ] Test with browser zoom at 200%
- [ ] Test with high contrast mode

### Screen Reader Testing

Test with at least one screen reader:

- **Windows**: NVDA (free) or JAWS
- **Mac**: VoiceOver (built-in)
- **Mobile**: TalkBack (Android) or VoiceOver (iOS)

## Common Accessibility Mistakes to Avoid

1. ❌ Missing alt text on images
2. ❌ Using divs/spans instead of buttons for clickable elements
3. ❌ No keyboard support for custom interactive elements
4. ❌ Missing form labels
5. ❌ Poor color contrast
6. ❌ No focus indicators
7. ❌ Incorrect heading hierarchy
8. ❌ Missing ARIA labels on icon-only buttons
9. ❌ Not announcing dynamic content changes
10. ❌ Keyboard traps in modals

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)
