---
inclusion: always
---

# Georgian Restaurant Website - Project Overview

## Project Description

This is a static website for a Georgian restaurant built with SvelteKit 2, Svelte 5, and the static adapter. The site showcases authentic Georgian cuisine, provides essential restaurant information, and enables customer engagement through contact and reservation features. All content is presented in the Georgian language to maintain cultural authenticity.

## Technology Stack

- **Framework**: SvelteKit 2.x with Svelte 5 (using runes: $state, $derived, $effect)
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS + CSS custom properties
- **Adapter**: @sveltejs/adapter-static for static site generation
- **Build Tool**: Vite 5.x
- **Icons**: lucide-svelte
- **Fonts**: Noto Sans Georgian (Google Fonts)

## Key Principles

1. **Static-First**: All pages are pre-rendered at build time for optimal performance
2. **Mobile-First**: Design and develop for mobile screens first, then scale up
3. **Accessibility**: WCAG AA compliance with proper ARIA labels and keyboard navigation
4. **Performance**: Target Lighthouse scores > 90, bundle sizes < 100KB
5. **Georgian Language**: All UI text, content, and error messages in Georgian
6. **Type Safety**: Comprehensive TypeScript types for all data structures
7. **Component Composition**: Prefer composition over configuration using Svelte 5 snippets

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── data/          # Static data files (menu, restaurant info, gallery)
│   ├── utils/         # Utility functions (validation, scroll, image optimization)
│   ├── types/         # TypeScript type definitions
│   └── constants/     # Georgian text constants
├── routes/            # SvelteKit routes
├── app.html          # HTML template
└── app.css           # Global styles
```

## Development Workflow

1. Read requirements and design documents in `.kiro/specs/georgian-restaurant-website/`
2. Follow tasks in sequential order from `tasks.md`
3. Implement one task at a time, ensuring it's complete before moving to the next
4. Test functionality after each task completion
5. Commit changes with descriptive messages referencing task numbers

## Build and Deployment

- **Dev**: `pnpm run dev` - Start development server
- **Build**: `pnpm run build` - Generate static files in `build/` directory
- **Preview**: `pnpm run preview` - Preview production build locally
- **Deploy**: Upload `build/` directory to any static hosting (Netlify, Vercel, GitHub Pages)

## Important Notes

- All text content must be in Georgian language
- Use Svelte 5 runes ($state, $derived) instead of stores
- Implement lazy loading for images below the fold
- Ensure all interactive elements are keyboard accessible
- Test on multiple browsers and devices before considering tasks complete
