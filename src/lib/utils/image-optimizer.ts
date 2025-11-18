import type { ImageConfig, ResponsiveImageSources } from "$lib/types";

export function generateSrcSet(
  basePath: string,
  widths: number[],
  format: string
): string {
  return widths
    .map((width) => `${basePath}-${width}.${format} ${width}w`)
    .join(", ");
}

export function generateResponsiveImageSources(
  config: ImageConfig
): ResponsiveImageSources {
  const { src, widths, formats } = config;
  const basePath = src.replace(/\.[^.]+$/, ""); // Remove extension

  const webpSrcSet = generateSrcSet(basePath, widths, "webp");
  const fallbackFormat = formats.find((f) => f !== "webp") || "jpg";
  const fallbackSrcSet = generateSrcSet(basePath, widths, fallbackFormat);

  return {
    webp: webpSrcSet,
    fallback: fallbackSrcSet,
    sizes: generateSizesAttribute(widths),
  };
}

export function generateSizesAttribute(widths: number[]): string {

  return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
}

export function getOptimizedImageUrl(
  src: string,
  width: number,
  format: "webp" | "jpg" | "png" = "webp"
): string {
  const basePath = src.replace(/\.[^.]+$/, "");
  return `${basePath}-${width}.${format}`;
}

export function getThumbnailUrl(src: string, size = 320): string {
  const directory = src.substring(0, src.lastIndexOf("/"));
  const filename = src.substring(src.lastIndexOf("/") + 1);
  const baseName = filename.replace(/\.[^.]+$/, "");
  const extension = filename.substring(filename.lastIndexOf("."));

  return `${directory}/thumbs/${baseName}-${size}${extension}`;
}

export function handleImageError(
  event: Event,
  fallbackSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f5f5f5" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="%23999"%3Eსურათი ვერ ჩაიტვირთა%3C/text%3E%3C/svg%3E'
): void {
  const img = event.target as HTMLImageElement;
  if (img && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
    img.alt = "სურათი ვერ ჩაიტვირთა";
  }
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map((src) => preloadImage(src)));
}

export function createLazyLoadObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "50px",
    threshold: 0.01,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
}

export function initLazyLoading(selector = 'img[loading="lazy"]'): () => void {

  if ("loading" in HTMLImageElement.prototype) {

    return () => {}; // No cleanup needed
  }

  const images = document.querySelectorAll<HTMLImageElement>(selector);

  const observer = createLazyLoadObserver((entry) => {
    const img = entry.target as HTMLImageElement;
    const src = img.dataset.src;

    if (src) {
      img.src = src;
      img.removeAttribute("data-src");
      observer.unobserve(img);
    }
  });

  images.forEach((img) => {

    if (img.src && !img.dataset.src) {
      img.dataset.src = img.src;
      img.src =
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    }
    observer.observe(img);
  });

  return () => {
    observer.disconnect();
  };
}

export function getImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function calculateAspectRatio(width: number, height: number): number {
  return (height / width) * 100;
}

export function generatePlaceholder(
  width: number,
  height: number,
  color = "#f0f0f0"
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${color}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function getBlurPlaceholder(src: string): string {
  const basePath = src.replace(/\.[^.]+$/, "");
  return `${basePath}-blur.jpg`;
}

export function isWebPSupported(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}

export async function getPreferredImageFormat(): Promise<"webp" | "jpg"> {
  const supportsWebP = await isWebPSupported();
  return supportsWebP ? "webp" : "jpg";
}

export function createImageConfig(
  src: string,
  options: {
    widths?: number[];
    formats?: ("webp" | "jpg" | "png")[];
  } = {}
): ImageConfig {
  const defaultWidths = [320, 640, 1024, 1920];
  const defaultFormats: ("webp" | "jpg" | "png")[] = ["webp", "jpg"];

  return {
    src,
    widths: options.widths || defaultWidths,
    formats: options.formats || defaultFormats,
  };
}

export function optimizeImageLoading(img: HTMLImageElement): void {

  img.decoding = "async";

  if (!img.hasAttribute("loading")) {
    img.loading = "lazy";
  }

  const rect = img.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    img.loading = "eager";

    img.fetchpriority = "high";
  }
}

export async function batchPreloadImages(
  images: { src: string; priority: "high" | "low" }[]
): Promise<void> {
  const highPriority = images
    .filter((img) => img.priority === "high")
    .map((img) => img.src);
  const lowPriority = images
    .filter((img) => img.priority === "low")
    .map((img) => img.src);

  await preloadImages(highPriority);

  if (lowPriority.length > 0) {
    preloadImages(lowPriority).catch(() => {

    });
  }
}

export function estimateImageSize(
  width: number,
  height: number,
  format: "webp" | "jpg" | "png"
): number {
  const pixels = width * height;

  const bytesPerPixel = {
    webp: 0.1,
    jpg: 0.15,
    png: 0.5,
  };

  return Math.round((pixels * bytesPerPixel[format]) / 1024);
}
