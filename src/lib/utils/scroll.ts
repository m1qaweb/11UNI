
export interface ScrollOptions {
  duration?: number;
  offset?: number;
  easing?: (t: number) => number;
}

export function smoothScrollTo(
  target: string | HTMLElement | number,
  options: ScrollOptions = {}
): void {
  const { duration = 800, offset = 0, easing = easeInOutCubic } = options;

  let targetY: number;

  if (typeof target === "number") {
    targetY = target;
  } else if (typeof target === "string") {
    const element = document.getElementById(target.replace("#", ""));
    if (!element) {
      console.warn(`Element with id "${target}" not found`);
      return;
    }
    targetY = element.getBoundingClientRect().top + window.pageYOffset;
  } else {
    targetY = target.getBoundingClientRect().top + window.pageYOffset;
  }

  const startY = window.pageYOffset;
  const distance = targetY - startY - offset;
  const startTime = performance.now();

  function scroll() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function getActiveSection(
  sectionIds: string[],
  offset = 100
): string | null {
  const scrollY = window.pageYOffset + offset;

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const sectionId = sectionIds[i];
    const element = document.getElementById(sectionId);

    if (element) {
      const sectionTop = element.offsetTop;
      const sectionBottom = sectionTop + element.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        return sectionId;
      }
    }
  }

  if (scrollY < 100) {
    return sectionIds[0] || null;
  }

  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  if (scrollY + windowHeight >= documentHeight - 10) {
    return sectionIds[sectionIds.length - 1] || null;
  }

  return null;
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export function isInViewport(element: HTMLElement, offset = 0): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= windowHeight + offset &&
    rect.right <= windowWidth + offset
  );
}

export function isPartiallyInViewport(
  element: HTMLElement,
  threshold = 0.1
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const elementHeight = rect.height;
  const visibleHeight =
    Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

  return visibleHeight / elementHeight >= threshold;
}

export function scrollToTop(smooth = true): void {
  if (smooth) {
    smoothScrollTo(0);
  } else {
    window.scrollTo(0, 0);
  }
}

export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

export function getScrollPercentage(): number {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  if (scrollHeight === 0) return 0;

  return (scrollTop / scrollHeight) * 100;
}

export function lockScroll(): void {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

export function unlockScroll(): void {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

export function handleKeyboardNav(
  event: KeyboardEvent,
  handlers: {
    onEscape?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onEnter?: () => void;
    onSpace?: () => void;
    onTab?: () => void;
    onHome?: () => void;
    onEnd?: () => void;
  }
): void {
  switch (event.key) {
    case "Escape":
      handlers.onEscape?.();
      break;
    case "ArrowLeft":
      event.preventDefault();
      handlers.onArrowLeft?.();
      break;
    case "ArrowRight":
      event.preventDefault();
      handlers.onArrowRight?.();
      break;
    case "ArrowUp":
      event.preventDefault();
      handlers.onArrowUp?.();
      break;
    case "ArrowDown":
      event.preventDefault();
      handlers.onArrowDown?.();
      break;
    case "Enter":
      handlers.onEnter?.();
      break;
    case " ":
      event.preventDefault();
      handlers.onSpace?.();
      break;
    case "Tab":
      handlers.onTab?.();
      break;
    case "Home":
      event.preventDefault();
      handlers.onHome?.();
      break;
    case "End":
      event.preventDefault();
      handlers.onEnd?.();
      break;
  }
}

export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleTabKey(event: KeyboardEvent) {
    if (event.key !== "Tab") return;

    if (event.shiftKey) {

      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {

      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }

  container.addEventListener("keydown", handleTabKey);

  firstElement?.focus();

  return () => {
    container.removeEventListener("keydown", handleTabKey);
  };
}

export function getElementOffset(element: HTMLElement): number {
  let offset = 0;
  let currentElement: HTMLElement | null = element;

  while (currentElement) {
    offset += currentElement.offsetTop;
    currentElement = currentElement.offsetParent as HTMLElement | null;
  }

  return offset;
}

export function scrollToSection(
  sectionId: string,
  updateHash = true,
  offset = 80
): void {
  const element = document.getElementById(sectionId);

  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  smoothScrollTo(element, { offset });

  if (updateHash) {

    history.pushState(null, "", `#${sectionId}`);
  }
}

export function initScrollSpy(
  sectionIds: string[],
  callback: (activeSectionId: string | null) => void,
  offset = 100
): () => void {
  const handleScroll = throttle(() => {
    const activeSection = getActiveSection(sectionIds, offset);
    callback(activeSection);
  }, 100);

  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}
