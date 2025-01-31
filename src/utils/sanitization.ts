import * as validator from 'validator';

/**
 * Ensures the input is a valid string, removes unwanted characters, and restricts length.
 */
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string' || !input.trim()) {
    return '';
  }

  const sanitized = input.trim().replace(/[^\w\s\-._@!#$%^&*()+=,;:]/g, '');

  // Restrict length to prevent buffer overflows
  return sanitized.substring(0, 255);
}

/**
 * Validates if the input is a valid color value.
 */
export function sanitizeColorValue(value: unknown): string {
  if (typeof value !== 'string' || value.length > 30) {
    return '';
  }

  const trimmed = value.trim();

  // Define secure regex patterns for common color formats
  const colorPatterns = [
    /^#([0-9a-fA-F]{3,8})$/,
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|0?\.\d+|1)\s*\)$/,
    /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*\)$/,
    /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*,\s*(0|0?\.\d+|1)\s*\)$/,
    /^(transparent|inherit|initial|unset|[a-z]+)$/i,
  ];

  return colorPatterns.some((pattern) => pattern.test(trimmed)) ? trimmed : '';
}

/**
 * Validates and sanitizes an image input, which can be a URL or a base64-encoded string.
 */
export function sanitizeImageInput(imageInput: unknown): string {
  if (typeof imageInput !== 'string' || imageInput.length > 5000) {
    return '';
    // throw new Error('Invalid input: Exceeds size limits');
  }

  const sanitizedInput = imageInput.trim().replace(/^["']|["']$/g, '');

  if (isValidUrl(sanitizedInput)) return sanitizeUrl(sanitizedInput);
  if (isValidBase64(sanitizedInput)) return sanitizeBase64(sanitizedInput);
  return '';
  // throw new Error('Input is not a valid URL or base64-encoded string');
}

/**
 * Validates if a string is a secure URL.
 */
function isValidUrl(url: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(url); // Attempt to parse the URL
    return validator.isURL(url, {
      protocols: ['https'],
      require_protocol: true,
      require_valid_protocol: true,
      disallow_auth: true,
      allow_fragments: false,
      allow_query_components: true,
    });
  } catch {
    return false;
  }
}

/**
 * Sanitizes a URL, ensuring no dangerous input is present.
 */
function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);

    // Enforce HTTPS
    if (parsedUrl.protocol !== 'https:') {
      throw new Error('Only HTTPS URLs are allowed');
    }

    // Remove fragments and unnecessary query parameters
    parsedUrl.hash = '';

    return parsedUrl.toString();
  } catch {
    return '';
  }
}

/**
 * Validates if a string is a safe base64-encoded string.
 */
function isValidBase64(str: string): boolean {
  return /^data:image\/(png|jpeg|gif|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(str);
}

/**
 * Sanitizes a base64-encoded string.
 */
function sanitizeBase64(base64: string): string {
  if (!isValidBase64(base64)) {
    throw new Error('Invalid base64 string');
  }

  // Remove any non-base64 characters (just in case)
  return base64.replace(/[^A-Za-z0-9+/=]/g, '');
}

export default {
  sanitizeColorValue,
  sanitizeImageInput,
  sanitizeInput,
};
