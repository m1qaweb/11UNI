---
inclusion: always
---

# Georgian Language Implementation Guide

## Overview

All user-facing text in this project must be in Georgian (ქართული ენა). This includes UI labels, error messages, content, and accessibility labels. This guide provides standards for implementing Georgian language support.

## Georgian Script Basics

### Unicode Range

Georgian script uses Unicode ranges:

- **Georgian**: U+10A0 to U+10FF (main alphabet)
- **Georgian Supplement**: U+2D00 to U+2D2F (archaic letters)

### Character Encoding

Always use UTF-8 encoding:

```html
<!-- app.html -->
<meta charset="utf-8" />
```

### Language Attribute

Set the HTML lang attribute:

```html
<html lang="ka"></html>
```

## Font Configuration

### Recommended Fonts

1. **Noto Sans Georgian** (Google Fonts) - Modern, clean, web-optimized
2. **BPG Nino** - Traditional Georgian font
3. **Sylfaen** - System fallback

### Font Loading

```css
/* Load Georgian fonts */
@font-face {
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/noto-sans-georgian-v28-latin_georgian-regular.woff2") format("woff2");
  unicode-range: U+10A0-10FF, U+2D00-2D2F;
}

@font-face {
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/noto-sans-georgian-v28-latin_georgian-700.woff2") format("woff2");
  unicode-range: U+10A0-10FF, U+2D00-2D2F;
}

/* Font stack with fallbacks */
:root {
  --font-georgian: "Noto Sans Georgian", "BPG Nino", "Sylfaen", sans-serif;
}

body {
  font-family: var(--font-georgian);
}
```

## Text Constants Structure

### Organization

All Georgian text should be centralized in `src/lib/constants/georgian-text.ts`:

```typescript
export const UI_TEXT = {
  // Navigation
  navigation: {
    home: "მთავარი",
    about: "ჩვენს შესახებ",
    menu: "მენიუ",
    gallery: "გალერეა",
    contact: "კონტაქტი",
  },

  // Buttons and Actions
  buttons: {
    submit: "გაგზავნა",
    close: "დახურვა",
    open: "გახსნა",
    viewMore: "მეტის ნახვა",
    reserve: "დაჯავშნა",
    send: "გაგზავნა",
    cancel: "გაუქმება",
    confirm: "დადასტურება",
  },

  // Form Labels
  form: {
    name: "სახელი",
    firstName: "სახელი",
    lastName: "გვარი",
    phone: "ტელეფონი",
    email: "ელ-ფოსტა",
    message: "შეტყობინება",
    messageType: "შეტყობინების ტიპი",
    required: "სავალდებულო ველი",
    optional: "არასავალდებულო",

    // Message types
    messageTypes: {
      reservation: "დაჯავშნა",
      inquiry: "შეკითხვა",
      feedback: "გამოხმაურება",
    },
  },

  // Status Messages
  messages: {
    success: "თქვენი შეტყობინება წარმატებით გაიგზავნა",
    error: "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით",
    loading: "იტვირთება...",
    sending: "იგზავნება...",
    processing: "მუშავდება...",
  },

  // Validation Errors
  errors: {
    required: "ეს ველი სავალდებულოა",
    invalidEmail: "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა",
    invalidPhone: "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი",
    minLength: (min: number) => `მინიმუმ ${min} სიმბოლო`,
    maxLength: (max: number) => `მაქსიმუმ ${max} სიმბოლო`,
    networkError: "ქსელის შეცდომა. შეამოწმეთ ინტერნეტ კავშირი",
    serverError: "სერვერის შეცდომა. გთხოვთ სცადოთ მოგვიანებით",
    imageLoadError: "სურათი ვერ ჩაიტვირთა",
  },

  // Days of Week
  days: {
    monday: "ორშაბათი",
    tuesday: "სამშაბათი",
    wednesday: "ოთხშაბათი",
    thursday: "ხუთშაბათი",
    friday: "პარასკევი",
    saturday: "შაბათი",
    sunday: "კვირა",
  },

  // Common Phrases
  common: {
    welcome: "კეთილი იყოს თქვენი მობრძანება",
    thankYou: "გმადლობთ",
    pleaseWait: "გთხოვთ დაელოდოთ",
    backToHome: "დაბრუნება მთავარ გვერდზე",
    learnMore: "გაიგეთ მეტი",
    viewMenu: "მენიუს ნახვა",
    makeReservation: "დაჯავშნა",
  },

  // Accessibility
  a11y: {
    skipToContent: "გადასვლა შინაარსზე",
    closeModal: "მოდალური ფანჯრის დახურვა",
    openMenu: "მენიუს გახსნა",
    closeMenu: "მენიუს დახურვა",
    previousImage: "წინა სურათი",
    nextImage: "შემდეგი სურათი",
    mainNavigation: "მთავარი ნავიგაცია",
    socialMedia: "სოციალური მედია",
  },

  // 404 and Errors
  notFound: {
    title: "გვერდი ვერ მოიძებნა",
    message: "თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს.",
    goHome: "დაბრუნება მთავარ გვერდზე",
  },
} as const;
```

## Common Georgian Phrases for Restaurant Website

### Menu Categories

```typescript
export const MENU_CATEGORIES = {
  appetizers: "წახემსები",
  salads: "სალათები",
  soups: "სუპები",
  mainCourses: "ძირითადი კერძები",
  meat: "ხორცის კერძები",
  fish: "თევზის კერძები",
  vegetarian: "ვეგეტარიანული კერძები",
  desserts: "დესერტები",
  beverages: "სასმელები",
  wine: "ღვინო",
  hotDrinks: "ცხელი სასმელები",
} as const;
```

### Traditional Georgian Dishes

```typescript
export const GEORGIAN_DISHES = {
  khinkali: "ხინკალი",
  khachapuri: "ხაჭაპური",
  mtsvadi: "მწვადი",
  lobio: "ლობიო",
  pkhali: "ფხალი",
  badrijani: "ბადრიჯანი",
  satsivi: "საცივი",
  chakapuli: "ჩაქაფული",
  kharcho: "ხარჩო",
  churchkhela: "ჩურჩხელა",
} as const;
```

### Restaurant Information

```typescript
export const RESTAURANT_INFO = {
  address: "მისამართი",
  phone: "ტელეფონი",
  email: "ელ-ფოსტა",
  hours: "სამუშაო საათები",
  location: "მდებარეობა",
  aboutUs: "ჩვენს შესახებ",
  ourStory: "ჩვენი ისტორია",
  ourTeam: "ჩვენი გუნდი",
  ourMission: "ჩვენი მისია",
} as const;
```

## Usage in Components

### Basic Usage

```svelte
<script lang="ts">
  import { UI_TEXT } from '$lib/constants/georgian-text';
</script>

<nav aria-label={UI_TEXT.a11y.mainNavigation}>
  <a href="#home">{UI_TEXT.navigation.home}</a>
  <a href="#menu">{UI_TEXT.navigation.menu}</a>
  <a href="#contact">{UI_TEXT.navigation.contact}</a>
</nav>
```

### Form Labels

```svelte
<script lang="ts">
  import { UI_TEXT } from '$lib/constants/georgian-text';

  let email = $state('');
  let errors = $state<Record<string, string>>({});
</script>

<div>
  <label for="email">
    {UI_TEXT.form.email}
    <span class="text-red-500">*</span>
  </label>
  <input
    id="email"
    type="email"
    bind:value={email}
    placeholder={UI_TEXT.form.email}
    aria-label={UI_TEXT.form.email}
    aria-required="true"
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {#if errors.email}
    <span id="email-error" role="alert" class="text-red-600">
      {errors.email}
    </span>
  {/if}
</div>
```

### Dynamic Messages

```svelte
<script lang="ts">
  import { UI_TEXT } from '$lib/constants/georgian-text';

  let minLength = 10;
  let errorMessage = UI_TEXT.errors.minLength(minLength);
</script>

<p>{errorMessage}</p>
<!-- Output: მინიმუმ 10 სიმბოლო -->
```

## Georgian Phone Number Format

### Format

Georgian phone numbers follow this format:

- **International**: +995 XXX XXX XXX
- **Local**: 0XX XXX XXX

### Validation

```typescript
export function validateGeorgianPhone(phone: string): boolean {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, "");

  // Check formats:
  // +995XXXXXXXXX (12 digits with +995)
  // 995XXXXXXXXX (12 digits starting with 995)
  // 0XXXXXXXXX (10 digits starting with 0)
  const regex = /^(\+995|995|0)[0-9]{9}$/;

  return regex.test(cleaned);
}
```

### Display Format

```typescript
export function formatGeorgianPhone(phone: string): string {
  const cleaned = phone.replace(/[\s-]/g, "");

  if (cleaned.startsWith("+995")) {
    // +995 XXX XXX XXX
    return cleaned.replace(/(\+995)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  } else if (cleaned.startsWith("0")) {
    // 0XX XXX XXX
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  }

  return phone;
}
```

## Georgian Currency (Lari)

### Symbol

The Georgian Lari symbol is: **₾** (U+20BE)

### Usage

```typescript
export function formatPrice(price: number): string {
  return `${price} ₾`;
}

// Or with decimal places
export function formatPriceDetailed(price: number): string {
  return `${price.toFixed(2)} ₾`;
}
```

### In Components

```svelte
<script lang="ts">
  interface Props {
    price: number;
  }
  let { price }: Props = $props();
</script>

<span class="price">{price} ₾</span>
```

## Typography Considerations

### Line Height

Georgian script benefits from slightly increased line height:

```css
body {
  font-family: var(--font-georgian);
  line-height: 1.6; /* Slightly higher than default 1.5 */
}
```

### Letter Spacing

Georgian text generally doesn't need letter spacing adjustments:

```css
.georgian-text {
  letter-spacing: normal; /* Default is fine */
}
```

### Font Weights

Use these font weights for Georgian text:

- **Regular (400)**: Body text
- **Medium (500)**: Emphasis (if available)
- **Bold (700)**: Headings and strong emphasis

## Accessibility with Georgian Text

### Screen Reader Support

Ensure screen readers announce Georgian text correctly:

```svelte
<button aria-label="დახურვა">
  <CloseIcon />
</button>

<nav aria-label="მთავარი ნავიგაცია">
  <!-- Navigation items -->
</nav>
```

### Form Validation

Provide Georgian error messages with proper ARIA:

```svelte
<input
  type="email"
  aria-invalid={!!errors.email}
  aria-describedby="email-error"
/>
{#if errors.email}
  <span id="email-error" role="alert" aria-live="polite">
    {errors.email}
  </span>
{/if}
```

## Testing Georgian Text

### Visual Testing Checklist

- [ ] All Georgian characters render correctly
- [ ] No font fallback to system fonts (check in DevTools)
- [ ] Text is readable at all font sizes
- [ ] Line breaks occur at appropriate places
- [ ] No text overflow or truncation issues

### Browser Testing

Test Georgian text rendering on:

- Chrome/Edge (Windows, Mac, Linux)
- Firefox (Windows, Mac, Linux)
- Safari (Mac, iOS)

### Common Issues

1. **Missing fonts**: Ensure fonts are loaded before text renders
2. **Encoding issues**: Always use UTF-8
3. **Font fallback**: Provide appropriate fallback fonts
4. **Line height**: Adjust if text appears cramped

## Best Practices

1. **Never hardcode Georgian text** - Always use constants
2. **Use semantic HTML** - Helps screen readers
3. **Test with real Georgian speakers** - Verify translations are natural
4. **Provide context** - Some words have multiple meanings
5. **Keep text concise** - Georgian words can be longer than English
6. **Use proper punctuation** - Georgian uses same punctuation as English
7. **Maintain consistency** - Use same terms throughout the site

## Resources

- [Georgian Unicode Chart](https://unicode.org/charts/PDF/U10A0.pdf)
- [Google Fonts - Georgian](https://fonts.google.com/?subset=georgian)
- [BPG Fonts](http://www.bpg-fonts.com/)
- [Georgian Typography Guidelines](https://www.typography.ge/)
