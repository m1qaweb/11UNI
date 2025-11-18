import type { FormData, FormErrors, ValidationResult } from "$lib/types";

export const validationMessages = {
  required: "ეს ველი სავალდებულოა",
  invalidEmail: "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა",
  invalidPhone: "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი",
  minLength: (min: number) => `მინიმუმ ${min} სიმბოლო`,
  maxLength: (max: number) => `მაქსიმუმ ${max} სიმბოლო`,
  invalidFormat: "არასწორი ფორმატი",
  networkError: "ქსელის შეცდომა. შეამოწმეთ ინტერნეტ კავშირი",
  serverError: "სერვერის შეცდომა. გთხოვთ სცადოთ მოგვიანებით",
} as const;

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") {
    return false;
  }

  const cleaned = phone.replace(/[\s\-()]/g, "");

  const georgianPhoneRegex = /^(\+995|995|0)[0-9]{9}$/;

  return georgianPhoneRegex.test(cleaned);
}

export function formatGeorgianPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, "");

  if (cleaned.startsWith("+995")) {

    return cleaned.replace(/(\+995)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  } else if (cleaned.startsWith("995")) {

    return cleaned.replace(/(995)(\d{3})(\d{3})(\d{3})/, "+$1 $2 $3 $4");
  } else if (cleaned.startsWith("0")) {

    return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  }

  return phone;
}

export function validateLength(
  value: string,
  min?: number,
  max?: number
): { isValid: boolean; error?: string } {
  const length = value.trim().length;

  if (min !== undefined && length < min) {
    return {
      isValid: false,
      error: validationMessages.minLength(min),
    };
  }

  if (max !== undefined && length > max) {
    return {
      isValid: false,
      error: validationMessages.maxLength(max),
    };
  }

  return { isValid: true };
}

export function validateRequired(value: string): boolean {
  return value !== null && value !== undefined && value.trim().length > 0;
}

export function validateName(name: string): boolean {
  if (!name || typeof name !== "string") {
    return false;
  }

  const nameRegex = /^[\u10A0-\u10FFa-zA-Z\s\-]+$/;
  const trimmed = name.trim();

  return (
    trimmed.length >= 2 && trimmed.length <= 100 && nameRegex.test(trimmed)
  );
}

export function validateMessage(
  message: string,
  minLength = 10,
  maxLength = 1000
): boolean {
  if (!message || typeof message !== "string") {
    return false;
  }

  const trimmed = message.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

export function validateForm(data: FormData): ValidationResult {
  const errors: FormErrors = {};

  if (!validateRequired(data.name)) {
    errors.name = validationMessages.required;
  } else if (!validateName(data.name)) {
    errors.name = "გთხოვთ შეიყვანოთ სწორი სახელი";
  }

  if (!validateRequired(data.email)) {
    errors.email = validationMessages.required;
  } else if (!validateEmail(data.email)) {
    errors.email = validationMessages.invalidEmail;
  }

  if (!validateRequired(data.phone)) {
    errors.phone = validationMessages.required;
  } else if (!validatePhone(data.phone)) {
    errors.phone = validationMessages.invalidPhone;
  }

  if (!validateRequired(data.message)) {
    errors.message = validationMessages.required;
  } else if (!validateMessage(data.message)) {
    const lengthValidation = validateLength(data.message, 10, 1000);
    if (!lengthValidation.isValid) {
      errors.message =
        lengthValidation.error || validationMessages.invalidFormat;
    }
  }

  if (!data.messageType) {
    errors.messageType = validationMessages.required;
  }

  if (data.messageType === "reservation") {
    if (data.date && !validateDate(data.date)) {
      errors.date = "გთხოვთ აირჩიოთ სწორი თარიღი";
    }

    if (data.time && !validateTime(data.time)) {
      errors.time = "გთხოვთ აირჩიოთ სწორი დრო";
    }

    if (data.guests !== undefined && !validateGuestCount(data.guests)) {
      errors.guests = "გთხოვთ შეიყვანოთ სტუმრების რაოდენობა (1-20)";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateDate(dateString: string): boolean {
  if (!dateString) return false;

  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date >= today;
}

export function validateTime(timeString: string): boolean {
  if (!timeString) return false;

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}

export function validateGuestCount(count: number): boolean {
  return Number.isInteger(count) && count >= 1 && count <= 20;
}

export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  let sanitized = input.replace(/<[^>]*>/g, "");

  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );

  sanitized = sanitized.trim();

  return sanitized;
}

export function validateUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function createDebouncedValidator<T>(
  validator: (value: T) => boolean,
  delay = 300
): (value: T, callback: (isValid: boolean) => void) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (value: T, callback: (isValid: boolean) => void) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const isValid = validator(value);
      callback(isValid);
    }, delay);
  };
}

export function validateField(
  fieldName: keyof FormData,
  value: string | number | undefined
): string | null {
  if (value === undefined) return null;

  const stringValue = String(value);

  switch (fieldName) {
    case "name":
      if (!validateRequired(stringValue)) return validationMessages.required;
      if (!validateName(stringValue)) return "გთხოვთ შეიყვანოთ სწორი სახელი";
      return null;

    case "email":
      if (!validateRequired(stringValue)) return validationMessages.required;
      if (!validateEmail(stringValue)) return validationMessages.invalidEmail;
      return null;

    case "phone":
      if (!validateRequired(stringValue)) return validationMessages.required;
      if (!validatePhone(stringValue)) return validationMessages.invalidPhone;
      return null;

    case "message":
      if (!validateRequired(stringValue)) return validationMessages.required;
      if (!validateMessage(stringValue)) {
        const lengthValidation = validateLength(stringValue, 10, 1000);
        return lengthValidation.error || validationMessages.invalidFormat;
      }
      return null;

    default:
      return null;
  }
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function getFirstError(errors: FormErrors): string | null {
  const keys = Object.keys(errors);
  return keys.length > 0 ? errors[keys[0]] : null;
}

export function clearError(errors: FormErrors, field: string): FormErrors {
  const newErrors = { ...errors };
  delete newErrors[field];
  return newErrors;
}
