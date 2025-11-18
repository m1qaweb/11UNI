# Georgian Restaurant Website

A static website for a Georgian restaurant built with SvelteKit 2, Svelte 5, and TypeScript.

## Technology Stack

- **Framework**: SvelteKit 2.x with Svelte 5
- **Language**: TypeScript with strict type checking
- **Adapter**: @sveltejs/adapter-static for static site generation
- **Build Tool**: Vite 5.x

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm (package manager)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm run dev

# Open in browser
pnpm run dev --open
```

The development server will start at `http://localhost:5173`

### Building for Production

```bash
# Build static site
pnpm run build

# Preview production build
pnpm run preview
```

The static files will be generated in the `build/` directory.

### Type Checking

```bash
# Run TypeScript type checking
pnpm run check

# Run type checking in watch mode
pnpm run check:watch
```

## Project Structure

```
georgian-restaurant-website/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable Svelte components
│   │   ├── data/          # Static data files
│   │   ├── utils/         # Utility functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── constants/     # Georgian text constants
│   ├── routes/            # SvelteKit routes
│   ├── app.html          # HTML template
│   └── app.css           # Global styles
├── static/               # Static assets
├── build/                # Production build output
└── .kiro/
    └── specs/            # Feature specifications
```

## Configuration

### SvelteKit Configuration (svelte.config.js)

- **Adapter**: Static adapter with prerendering enabled
- **Fallback**: 404.html for handling non-existent routes
- **Precompress**: Enabled for gzip and brotli compression
- **Strict Mode**: Enabled for better error detection

### Vite Configuration (vite.config.ts)

- **Build Target**: ESNext for modern browsers
- **Minification**: ESBuild for fast builds
- **CSS Minification**: Enabled

### TypeScript Configuration (tsconfig.json)

- **Strict Mode**: Enabled with all strict checks
- **No Unused Locals/Parameters**: Enabled
- **No Implicit Returns**: Enabled
- **No Fallthrough Cases**: Enabled

## Deployment

The `build/` directory contains static files that can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `build/` folder
- **Vercel**: Connect your repository and set build command to `pnpm run build`
- **GitHub Pages**: Upload contents of `build/` directory
- **Any CDN**: Upload static files to your preferred CDN

## Development Guidelines

- All user-facing text must be in Georgian language
- Use Svelte 5 runes ($state, $derived, $effect) instead of stores
- Follow WCAG AA accessibility standards
- Implement lazy loading for images below the fold
- Ensure all interactive elements are keyboard accessible

## License

Private project - All rights reserved
