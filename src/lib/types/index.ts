
export interface MenuItem {
  id: string;
  name: string; // Georgian
  description: string; // Georgian
  price: number;
  currency: string; // "₾"
  image: string;
  category: string;
  allergens?: string[]; // Optional allergen information
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string; // Georgian
  description?: string; // Georgian
  image?: string; // Category image
  items: MenuItem[];
  order?: number; // For sorting categories
}

export interface DayHours {
  day: string; // Georgian day name
  hours: string; // Georgian time format
  isClosed?: boolean;
}

export interface ContactInfo {
  address: string; // Georgian
  addressLine2?: string; // Optional second line
  city: string; // Georgian
  postalCode?: string;
  country: string; // Georgian
  phone: string;
  phoneFormatted?: string; // Display format
  email: string;
  hours: DayHours[];
  mapEmbedUrl: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface RestaurantInfo extends ContactInfo {
  name: string; // Georgian
  tagline: string; // Georgian
  description: string; // Georgian
  established?: number; // Year
  social: SocialLink[];
}

export type MessageType = "reservation" | "inquiry" | "feedback";

export interface FormData {
  name: string;
  phone: string;
  email: string;
  messageType: MessageType;
  message: string;
  date?: string; // For reservations
  time?: string; // For reservations
  guests?: number; // For reservations
}

export interface FormErrors {
  [key: string]: string; // Georgian error messages
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string; // Georgian
  successMessage?: string; // Georgian
}

export type GalleryCategory =
  | "food"
  | "interior"
  | "atmosphere"
  | "events"
  | "all";

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail: string;
  alt: string; // Georgian
  category: GalleryCategory;
  width?: number;
  height?: number;
  caption?: string; // Georgian
}

export interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  images: GalleryImage[];
}

export interface NavItem {
  id: string;
  label: string; // Georgian
  href: string;
  ariaLabel?: string; // Georgian
  order?: number;
}

export interface NavigationState {
  isMenuOpen: boolean;
  activeSection: string;
  isMobile: boolean;
}

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "youtube"
  | "linkedin"
  | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string; // Georgian
  icon?: string; // Icon name or path
}

export interface HeroProps {
  title: string; // Georgian
  subtitle: string; // Georgian
  backgroundImage: string;
  ctaText?: string; // Georgian
  ctaLink?: string;
}

export interface AboutProps {
  title: string; // Georgian
  content: string; // Georgian
  highlights?: string[]; // Georgian
  image?: string;
}

export interface MenuProps {
  categories: MenuCategory[];
  showFilters?: boolean;
}

export interface MenuItemProps {
  item: MenuItem;
  onClick?: () => void;
}

export interface GalleryProps {
  images: GalleryImage[];
  columns?: number;
  showCategories?: boolean;
}

export interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export interface ContactProps {
  info: ContactInfo;
}

export interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialMessageType?: MessageType;
}

export interface FooterProps {
  restaurantName: string; // Georgian
  socialLinks: SocialLink[];
  copyrightText?: string; // Georgian
  showSocial?: boolean;
}

export interface SocialLinksProps {
  links: SocialLink[];
  variant?: "horizontal" | "vertical";
  size?: "small" | "medium" | "large";
}

export interface HeaderProps {
  restaurantName: string; // Georgian
  logo?: string;
  navItems: NavItem[];
}

export interface NavigationProps {
  items: NavItem[];
  isMobile: boolean;
  isOpen: boolean;
  activeSection: string;
  onToggle: () => void;
  onNavigate: (href: string) => void;
}

export interface ImageConfig {
  src: string;
  widths: number[];
  formats: ("webp" | "jpg" | "png")[];
}

export interface ResponsiveImageSources {
  webp: string;
  fallback: string;
  sizes?: string;
}

export interface OptimizedImageProps {
  src: string;
  alt: string; // Georgian
  widths?: number[];
  loading?: "lazy" | "eager";
  className?: string;
  onError?: () => void;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export interface ErrorState {
  hasError: boolean;
  message: string; // Georgian
  code?: string;
  details?: unknown;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

export type AnimationType =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right";

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  text: string;
  textLight: string;
  textLighter: string;
  bg: string;
  bgLight: string;
  bgDark: string;
  error: string;
  errorBg: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
}

export interface ThemeSpacing {
  unit: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

export function isMenuItem(obj: unknown): obj is MenuItem {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "price" in obj &&
    "category" in obj
  );
}

export function isGalleryImage(obj: unknown): obj is GalleryImage {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "src" in obj &&
    "alt" in obj &&
    "category" in obj
  );
}

export function isFormData(obj: unknown): obj is FormData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "email" in obj &&
    "phone" in obj &&
    "message" in obj
  );
}

export type {

  MenuItem as MenuItemType,
  MenuCategory as MenuCategoryType,
  ContactInfo as ContactInfoType,
  RestaurantInfo as RestaurantInfoType,
  FormData as FormDataType,
  GalleryImage as GalleryImageType,
  NavItem as NavItemType,
  SocialLink as SocialLinkType,
};
