# Design Document

## Overview

The Georgian restaurant website will be built as a single-page application (SPA) using SvelteKit 2 with Svelte 5's latest features including runes and snippets. The site will be pre-rendered as static HTML using the `@sveltejs/adapter-static`, ensuring optimal performance and SEO. The architecture follows a component-based approach with a focus on accessibility, performance, and mobile-first responsive design.

## Architecture

### Technology Stack

- **Framework**: SvelteKit 2.x with Svelte 5
- **Adapter**: @sveltejs/adapter-static for static site generation
- **Language**: TypeScript for type safety
- **Styling**: CSS with CSS custom properties for theming, Tailwind CSS for utility-first approach
- **Forms**: Native form handling with progressive enhancement
- **Email Service**: FormSubmit or Formspree for contact form submissions (no backend required)
- **Image Optimization**: Enhanced responsive images with srcset and WebP format
- **Icons**: lucide-svelte for consistent, accessible iconography
- **Animations**: CSS transitions and Svelte's built-in transition directives (fade, slide, fly)
- **Fonts**: Google Fonts (Noto Sans Georgian) or BPG fonts for Georgian script
- **SEO**: svelte-meta-tags for managing meta tags and Open Graph data
- **Build Tool**: Vite 5.x for fast development and optimized production builds

### Project Structure

```
georgian-restaurant-website/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Header.svelte
│   │   │   ├── Navigation.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── About.svelte
│   │   │   ├── Menu.svelte
│   │   │   ├── MenuItem.svelte
│   │   │   ├── Gallery.svelte
│   │   │   ├── Lightbox.svelte
│   │   │   ├── Contact.svelte
│   │   │   ├── ContactForm.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── SocialLinks.svelte
│   │   │   └── ErrorMessage.svelte
│   │   ├── data/
│   │   │   ├── menu.ts
│   │   │   ├── restaurant-info.ts
│   │   │   ├── gallery.ts
│   │   │   └── seo.ts
│   │   ├── utils/
│   │   │   ├── validation.ts
│   │   │   ├── scroll.ts
│   │   │   └── image-optimizer.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── constants/
│   │       └── georgian-text.ts
│   ├── routes/
│   │   ├── +page.svelte
│   │   ├── +page.ts
│   │   ├── +layout.svelte
│   │   └── +error.svelte
│   ├── app.html
│   └── app.css
├── static/
│   ├── images/
│   │   ├── menu/
│   │   ├── gallery/
│   │   │   └── thumbs/
│   │   ├── hero/
│   │   ├── logo.svg
│   │   └── placeholder.jpg
│   ├── fonts/
│   ├── robots.txt
│   └── favicon.ico
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### Rendering Strategy

- **Pre-rendering**: All pages will be pre-rendered at build time using `prerender = true`
- **No SSR**: Static adapter with client-side hydration only
- **Fallback**: 404.html for handling non-existent routes
- **Trailing Slashes**: Configure to 'always' for consistent URLs
- **Strict Mode**: Enable for better error detection during development

### SvelteKit Configuration

```javascript
// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: true,
      strict: true,
    }),
    prerender: {
      handleHttpError: "warn",
      handleMissingId: "warn",
      entries: ["*"],
    },
    trailingSlash: "always",
  },
};

export default config;
```

### Build and Deployment

- **Build Command**: `pnpm run build` generates static files in `build/` directory
- **Preview**: `pnpm run preview` serves the built site locally
- **Hosting Options**: Netlify, Vercel, GitHub Pages, or any static hosting service
- **CDN**: Recommended for optimal global performance
- **Asset Optimization**: Vite handles minification, tree-shaking, and code splitting

## Components and Interfaces

### Core Components

#### 1. Layout Component (+layout.svelte)

Wraps all pages with common structure including meta tags, fonts, and global styles.

```typescript
// Props: None (root layout)
// Responsibilities:
// - Load Georgian fonts (e.g., BPG Nino, Sylfaen)
// - Set up global CSS variables
// - Include SEO meta tags
```

#### 2. Header Component

Contains logo and navigation menu.

```typescript
interface HeaderProps {
  isMenuOpen: boolean;
}

// State management using Svelte 5 runes:
// - $state for mobile menu toggle
// - $derived for scroll position detection
```

#### 3. Navigation Component

Responsive navigation with smooth scrolling.

```typescript
interface NavItem {
  id: string;
  label: string; // Georgian text
  href: string;
}

interface NavigationProps {
  items: NavItem[];
  isMobile: boolean;
}

// Features:
// - Smooth scroll to sections
// - Active section highlighting
// - Mobile hamburger menu
```

#### 4. Hero Component

Landing section with restaurant name and hero image.

```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}
```

#### 5. About Component

Restaurant story and Georgian cuisine information.

```typescript
interface AboutProps {
  title: string;
  content: string;
  highlights: string[];
}
```

#### 6. Menu Component

Displays categorized menu items.

```typescript
interface MenuCategory {
  id: string;
  name: string; // Georgian
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string; // Georgian
  description: string; // Georgian
  price: number;
  currency: string; // "₾"
  image: string;
  category: string;
}

interface MenuProps {
  categories: MenuCategory[];
}
```

#### 7. MenuItem Component

Individual menu item card.

```typescript
interface MenuItemProps {
  item: MenuItem;
}

// Features:
// - Lazy-loaded images
// - Hover effects
// - Responsive card layout
```

#### 8. Gallery Component

Photo gallery with grid layout.

```typescript
interface GalleryImage {
  id: string;
  src: string;
  thumbnail: string;
  alt: string; // Georgian
  category?: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

// Features:
// - Responsive grid (CSS Grid)
// - Click to open lightbox
// - Lazy loading
```

#### 9. Lightbox Component

Full-screen image viewer.

```typescript
interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
}

// Features:
// - Keyboard navigation (arrow keys, ESC)
// - Touch gestures for mobile
// - Image preloading
// - Close on backdrop click
```

#### 10. Contact Component

Contact information and form section.

```typescript
interface ContactInfo {
  address: string; // Georgian
  phone: string;
  email: string;
  hours: DayHours[];
  mapEmbedUrl: string;
}

interface DayHours {
  day: string; // Georgian
  hours: string; // Georgian
}

interface ContactProps {
  info: ContactInfo;
}
```

#### 11. ContactForm Component

Form for reservations and inquiries.

```typescript
interface FormData {
  name: string;
  phone: string;
  email: string;
  messageType: "reservation" | "inquiry" | "feedback";
  message: string;
}

interface FormErrors {
  [key: string]: string; // Georgian error messages
}

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

// Features:
// - Client-side validation
// - Progressive enhancement
// - Loading states
// - Success/error messages in Georgian
```

#### 12. Footer Component

Footer with social links and copyright.

```typescript
interface FooterProps {
  socialLinks: SocialLink[];
  copyrightText: string; // Georgian
}
```

#### 13. SocialLinks Component

Social media icon links.

```typescript
interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "youtube";
  url: string;
  label: string; // Georgian
}

interface SocialLinksProps {
  links: SocialLink[];
}
```

## SEO Strategy

### Meta Tags Configuration

```typescript
// src/lib/data/seo.ts
export const seoConfig = {
  title: "რესტორნის სახელი - ავთენტური ქართული სამზარეულო",
  description:
    "ტრადიციული ქართული კერძები თბილისის გულში. ხინკალი, ხაჭაპური, მწვადი და სხვა ავთენტური კერძები.",
  keywords: "ქართული რესტორანი, ხინკალი, ხაჭაპური, თბილისი, ქართული სამზარეულო",
  url: "https://restaurant.ge",
  image: "https://restaurant.ge/images/og-image.jpg",
  locale: "ka_GE",
  type: "website",
};

export const restaurantStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "რესტორნის სახელი",
  description: "ავთენტური ქართული სამზარეულო",
  image: "https://restaurant.ge/images/restaurant.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ქუჩის მისამართი",
    addressLocality: "თბილისი",
    addressCountry: "GE",
  },
  telephone: "+995-XXX-XXX-XXX",
  servesCuisine: "Georgian",
  priceRange: "₾₾",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "12:00",
      closes: "23:00",
    },
  ],
};
```

### Meta Tags Implementation

```svelte
<!-- src/routes/+layout.svelte -->
<svelte:head>
  <title>{seoConfig.title}</title>
  <meta name="description" content={seoConfig.description} />
  <meta name="keywords" content={seoConfig.keywords} />
  <meta name="author" content={seoConfig.title} />

  <!-- Open Graph -->
  <meta property="og:type" content={seoConfig.type} />
  <meta property="og:url" content={seoConfig.url} />
  <meta property="og:title" content={seoConfig.title} />
  <meta property="og:description" content={seoConfig.description} />
  <meta property="og:image" content={seoConfig.image} />
  <meta property="og:locale" content={seoConfig.locale} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoConfig.title} />
  <meta name="twitter:description" content={seoConfig.description} />
  <meta name="twitter:image" content={seoConfig.image} />

  <!-- Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(restaurantStructuredData)}</script>`}
</svelte:head>
```

### Sitemap Generation

```typescript
// src/routes/sitemap.xml/+server.ts
export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://restaurant.ge/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600",
    },
  });
}
```

## Accessibility Implementation

### ARIA Labels and Semantic HTML

```svelte
<!-- Example: Navigation Component -->
<nav aria-label="მთავარი ნავიგაცია" role="navigation">
  <ul role="menubar">
    {#each navItems as item}
      <li role="none">
        <a
          href={item.href}
          role="menuitem"
          aria-label={item.ariaLabel}
          on:click={handleNavClick}
        >
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<!-- Example: Contact Form -->
<form aria-labelledby="contact-heading">
  <h2 id="contact-heading">დაგვიკავშირდით</h2>

  <label for="name">სახელი *</label>
  <input
    id="name"
    type="text"
    required
    aria-required="true"
    aria-describedby="name-error"
  />
  {#if errors.name}
    <span id="name-error" role="alert" aria-live="polite">
      {errors.name}
    </span>
  {/if}
</form>
```

### Keyboard Navigation

```typescript
// src/lib/utils/keyboard-nav.ts
export function handleKeyboardNav(
  event: KeyboardEvent,
  handlers: {
    onEscape?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onEnter?: () => void;
  }
) {
  switch (event.key) {
    case "Escape":
      handlers.onEscape?.();
      break;
    case "ArrowLeft":
      handlers.onArrowLeft?.();
      break;
    case "ArrowRight":
      handlers.onArrowRight?.();
      break;
    case "Enter":
      handlers.onEnter?.();
      break;
  }
}
```

### Focus Management

```css
/* Global focus styles */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

## Data Models

### Menu Data Structure

```typescript
// src/lib/data/menu.ts
export const menuData: MenuCategory[] = [
  {
    id: "appetizers",
    name: "წახემსები", // Appetizers
    items: [
      {
        id: "pkhali",
        name: "ფხალი",
        description: "ტრადიციული ქართული სალათი...",
        price: 12,
        currency: "₾",
        image: "/images/menu/pkhali.jpg",
        category: "appetizers",
      },
      // ... more items
    ],
  },
  // ... more categories
];
```

### Restaurant Info Data

```typescript
// src/lib/data/restaurant-info.ts
export const restaurantInfo = {
  name: "სახელი", // Restaurant name
  tagline: "ავთენტური ქართული სამზარეულო",
  address: "მისამართი, თბილისი, საქართველო",
  phone: "+995 XXX XXX XXX",
  email: "info@restaurant.ge",
  hours: [
    { day: "ორშაბათი", hours: "12:00 - 23:00" },
    { day: "სამშაბათი", hours: "12:00 - 23:00" },
    // ... more days
  ],
  mapEmbedUrl: "https://www.google.com/maps/embed?...",
  social: [
    {
      platform: "facebook",
      url: "https://facebook.com/...",
      label: "ფეისბუქი",
    },
    {
      platform: "instagram",
      url: "https://instagram.com/...",
      label: "ინსტაგრამი",
    },
    { platform: "youtube", url: "https://youtube.com/...", label: "იუთუბი" },
  ],
};
```

### Gallery Data

```typescript
// src/lib/data/gallery.ts
export const galleryImages: GalleryImage[] = [
  {
    id: "img-1",
    src: "/images/gallery/dish-1.jpg",
    thumbnail: "/images/gallery/thumbs/dish-1.jpg",
    alt: "ხინკალი",
    category: "food",
  },
  // ... more images
];
```

## Error Handling

### Form Validation

```typescript
// src/lib/utils/validation.ts

export const validationMessages = {
  required: "ეს ველი სავალდებულოა",
  invalidEmail: "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა",
  invalidPhone: "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი",
  minLength: (min: number) => `მინიმუმ ${min} სიმბოლო`,
  maxLength: (max: number) => `მაქსიმუმ ${max} სიმბოლო`,
};

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Georgian phone number format
  const phoneRegex = /^(\+995)?[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = validationMessages.required;
  }

  if (!data.email.trim()) {
    errors.email = validationMessages.required;
  } else if (!validateEmail(data.email)) {
    errors.email = validationMessages.invalidEmail;
  }

  if (!data.phone.trim()) {
    errors.phone = validationMessages.required;
  } else if (!validatePhone(data.phone)) {
    errors.phone = validationMessages.invalidPhone;
  }

  if (!data.message.trim()) {
    errors.message = validationMessages.required;
  } else if (data.message.length < 10) {
    errors.message = validationMessages.minLength(10);
  }

  return errors;
}
```

### Form Submission Error Handling

```typescript
// Handle network errors, service errors
try {
  const response = await fetch(formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }

  // Show success message
  showMessage("თქვენი შეტყობინება წარმატებით გაიგზავნა", "success");
} catch (error) {
  // Show error message
  showMessage("დაფიქსირდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით", "error");
}
```

### Image Loading Errors

```typescript
// Fallback for failed image loads
function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.jpg";
  img.alt = "სურათი ვერ ჩაიტვირთა";
}
```

## Testing Strategy

### Unit Testing

- **Validation Functions**: Test email, phone validation with various inputs
- **Utility Functions**: Test scroll behavior, form data transformation
- **Component Logic**: Test state management in components using Svelte 5 runes

### Integration Testing

- **Form Submission Flow**: Test complete form validation and submission process
- **Navigation**: Test smooth scrolling and section highlighting
- **Lightbox**: Test image navigation and keyboard controls

### Visual Testing

- **Responsive Design**: Test layouts at breakpoints (320px, 768px, 1024px, 1440px)
- **Georgian Text Rendering**: Verify proper font loading and text display
- **Cross-browser**: Test on Chrome, Firefox, Safari, Edge

### Performance Testing

- **Lighthouse Audits**: Target scores > 90 for Performance, Accessibility, Best Practices, SEO
- **Image Optimization**: Verify lazy loading and proper image formats (WebP with fallbacks)
- **Bundle Size**: Keep JavaScript bundle under 100KB (gzipped)

### Accessibility Testing

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliance for text contrast ratios
- **Focus Management**: Visible focus indicators and logical tab order

## Design Decisions and Rationales

### 1. Static Site Generation

**Decision**: Use @sveltejs/adapter-static for full pre-rendering

**Rationale**:

- Restaurant website content is mostly static
- Optimal performance with CDN hosting
- Better SEO with pre-rendered HTML
- Lower hosting costs (can use GitHub Pages, Netlify, Vercel)
- No server required

### 2. Single Page Application

**Decision**: Build as SPA with smooth scrolling between sections

**Rationale**:

- Better user experience with seamless navigation
- Faster perceived performance (no page reloads)
- Simpler state management
- Easier animations and transitions
- Common pattern for restaurant websites

### 3. Component-Based Data

**Decision**: Store menu and content in TypeScript files rather than CMS

**Rationale**:

- Simpler setup for initial launch
- Type safety with TypeScript
- Version control for content changes
- No external dependencies or API calls
- Can migrate to CMS later if needed

### 4. Form Handling with Third-Party Service

**Decision**: Use FormSubmit or similar service for contact form

**Rationale**:

- No backend server required
- Simple integration
- Reliable email delivery
- Free tier available
- Maintains static site architecture

### 5. CSS Custom Properties for Theming

**Decision**: Use CSS variables for colors, spacing, and typography

**Rationale**:

- Easy theme customization
- Better maintainability
- No build-time processing needed
- Native browser support
- Simpler than CSS-in-JS

### 6. Mobile-First Approach

**Decision**: Design and develop for mobile screens first

**Rationale**:

- Majority of restaurant website traffic is mobile
- Progressive enhancement philosophy
- Ensures core functionality works on all devices
- Easier to scale up than down

### 7. Georgian Web Fonts

**Decision**: Use web fonts optimized for Georgian script (e.g., BPG fonts or Google Fonts with Georgian support)

**Rationale**:

- Better readability for Georgian text
- Consistent rendering across devices
- Professional appearance
- Cultural authenticity

### 8. Lazy Loading for Images

**Decision**: Implement lazy loading for menu and gallery images

**Rationale**:

- Faster initial page load
- Reduced bandwidth usage
- Better performance scores
- Native browser support with loading="lazy"

### 9. Svelte 5 Runes

**Decision**: Use Svelte 5's new runes ($state, $derived, $effect) instead of stores

**Rationale**:

- More intuitive reactivity model
- Better TypeScript support
- Improved performance
- Future-proof codebase
- Simpler component logic

### 10. Embedded Google Maps

**Decision**: Use Google Maps iframe embed for location

**Rationale**:

- No API key required for basic embed
- Familiar interface for users
- Interactive map functionality
- Mobile-friendly
- Zero maintenance

## Image Optimization Strategy

### Responsive Images

```svelte
<!-- Example: Menu Item Image -->
<picture>
  <source
    type="image/webp"
    srcset="
      /images/menu/dish-320.webp 320w,
      /images/menu/dish-640.webp 640w,
      /images/menu/dish-1024.webp 1024w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
  <source
    type="image/jpeg"
    srcset="
      /images/menu/dish-320.jpg 320w,
      /images/menu/dish-640.jpg 640w,
      /images/menu/dish-1024.jpg 1024w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
  <img
    src="/images/menu/dish-640.jpg"
    alt={item.name}
    loading="lazy"
    decoding="async"
    on:error={handleImageError}
  />
</picture>
```

### Image Optimization Utility

```typescript
// src/lib/utils/image-optimizer.ts
export interface ImageConfig {
  src: string;
  widths: number[];
  formats: ("webp" | "jpg" | "png")[];
}

export function generateSrcSet(config: ImageConfig): {
  webp: string;
  fallback: string;
} {
  const { src, widths, formats } = config;
  const basePath = src.replace(/\.[^.]+$/, "");
  const ext = src.split(".").pop();

  const webpSrcSet = widths
    .map((w) => `${basePath}-${w}.webp ${w}w`)
    .join(", ");

  const fallbackSrcSet = widths
    .map((w) => `${basePath}-${w}.${ext} ${w}w`)
    .join(", ");

  return {
    webp: webpSrcSet,
    fallback: fallbackSrcSet,
  };
}

export function getOptimizedImageUrl(
  src: string,
  width: number,
  format: "webp" | "jpg" = "webp"
): string {
  const basePath = src.replace(/\.[^.]+$/, "");
  return `${basePath}-${width}.${format}`;
}
```

### Image Loading Component

```svelte
<!-- src/lib/components/OptimizedImage.svelte -->
<script lang="ts">
  export let src: string;
  export let alt: string;
  export let widths: number[] = [320, 640, 1024];
  export let loading: 'lazy' | 'eager' = 'lazy';

  let imageError = false;

  function handleError() {
    imageError = true;
  }
</script>

{#if !imageError}
  <picture>
    <source
      type="image/webp"
      srcset={widths.map(w => `${src.replace(/\.[^.]+$/, '')}-${w}.webp ${w}w`).join(', ')}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
    <img
      {src}
      {alt}
      {loading}
      decoding="async"
      on:error={handleError}
    />
  </picture>
{:else}
  <img
    src="/images/placeholder.jpg"
    alt="სურათი ვერ ჩაიტვირთა"
    loading="lazy"
  />
{/if}
```

## Performance Optimization

### Code Splitting Strategy

```typescript
// Dynamic imports for heavy components
const Lightbox = () => import("$lib/components/Lightbox.svelte");
const ContactForm = () => import("$lib/components/ContactForm.svelte");
```

### CSS Optimization

```css
/* Critical CSS - inline in app.html */
:root {
  --color-primary: #8b0000;
  --color-secondary: #ffd700;
  --color-text: #2c2c2c;
  --color-bg: #ffffff;
  --font-georgian: "Noto Sans Georgian", "BPG Nino", sans-serif;
  --spacing-unit: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-georgian);
  color: var(--color-text);
  line-height: 1.6;
}
```

### Lazy Loading Strategy

- **Above the fold**: Hero, Header, Navigation (eager loading)
- **Below the fold**: Menu items, Gallery images, Contact form (lazy loading)
- **Intersection Observer**: Trigger animations when sections enter viewport

### Bundle Size Targets

- **Initial JS**: < 50KB (gzipped)
- **Total JS**: < 100KB (gzipped)
- **CSS**: < 20KB (gzipped)
- **Fonts**: < 100KB (woff2 format)

## Georgian Language Support

### Font Configuration

```css
/* Georgian font stack */
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
```

### Georgian Text Constants

```typescript
// src/lib/constants/georgian-text.ts
export const UI_TEXT = {
  navigation: {
    home: "მთავარი",
    about: "ჩვენს შესახებ",
    menu: "მენიუ",
    gallery: "გალერეა",
    contact: "კონტაქტი",
  },
  buttons: {
    submit: "გაგზავნა",
    close: "დახურვა",
    viewMore: "მეტის ნახვა",
    reserve: "დაჯავშნა",
  },
  form: {
    name: "სახელი",
    phone: "ტელეფონი",
    email: "ელ-ფოსტა",
    message: "შეტყობინება",
    messageType: "შეტყობინების ტიპი",
    required: "სავალდებულო ველი",
  },
  messages: {
    success: "თქვენი შეტყობინება წარმატებით გაიგზავნა",
    error: "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით",
    loading: "იტვირთება...",
  },
  errors: {
    required: "ეს ველი სავალდებულოა",
    invalidEmail: "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა",
    invalidPhone: "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი",
    minLength: (min: number) => `მინიმუმ ${min} სიმბოლო`,
    maxLength: (max: number) => `მაქსიმუმ ${max} სიმბოლო`,
    networkError: "ქსელის შეცდომა. შეამოწმეთ ინტერნეტ კავშირი",
  },
} as const;
```

### HTML Language Configuration

```html
<!-- src/app.html -->
<!DOCTYPE html>
<html lang="ka">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body>
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

## Security Considerations

### Content Security Policy

```typescript
// Add to svelte.config.js
const config = {
  kit: {
    csp: {
      mode: "auto",
      directives: {
        "default-src": ["self"],
        "script-src": ["self", "unsafe-inline"],
        "style-src": ["self", "unsafe-inline"],
        "img-src": ["self", "data:", "https:"],
        "font-src": ["self"],
        "connect-src": ["self", "https://formsubmit.co"],
      },
    },
  },
};
```

### Form Security

- **CSRF Protection**: Use FormSubmit's built-in protection
- **Rate Limiting**: Implement client-side debouncing (1 submission per 30 seconds)
- **Input Sanitization**: Validate and sanitize all form inputs
- **Email Validation**: Use regex pattern matching
- **Phone Validation**: Georgian phone number format validation

### Environment Variables

```typescript
// .env.example
PUBLIC_FORM_ENDPOINT=https://formsubmit.co/your-email@example.com
PUBLIC_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps/embed?...
PUBLIC_SITE_URL=https://restaurant.ge
```

## Additional Design Decisions

### 11. Tailwind CSS Integration

**Decision**: Use Tailwind CSS alongside custom CSS properties

**Rationale**:

- Rapid prototyping with utility classes
- Consistent spacing and sizing system
- Built-in responsive design utilities
- Tree-shaking removes unused styles
- Easy to customize with Georgian design tokens
- Reduces custom CSS writing

### 12. Form Service Selection

**Decision**: Use FormSubmit over Formspree or EmailJS

**Rationale**:

- No API key required
- Simple POST request integration
- Built-in spam protection
- Custom redirect support
- Free tier sufficient for restaurant needs
- No JavaScript SDK required

### 13. Error Boundary Implementation

**Decision**: Implement +error.svelte for graceful error handling

**Rationale**:

- Provides fallback UI for runtime errors
- Maintains brand consistency during errors
- Prevents white screen of death
- Allows custom 404 page in Georgian
- Better user experience

### 14. Intersection Observer for Animations

**Decision**: Use Intersection Observer API for scroll animations

**Rationale**:

- Better performance than scroll event listeners
- Native browser API (no library needed)
- Triggers animations only when visible
- Reduces unnecessary computations
- Smooth user experience

### 15. Component Composition Pattern

**Decision**: Use composition over configuration for components

**Rationale**:

- More flexible component reuse
- Better TypeScript inference
- Easier to understand component relationships
- Svelte 5 snippets enable better composition
- Reduces prop drilling
