/*
 * Ensures the input is a string. If not, it safely returns an empty string
 * Removes anything outside alphanumeric characters, spaces, and common symbols used in typical input
 * Trims excess whitespace to clean up input from careless user input or malicious attempts.
 * Limits input length to 255 characters to prevent buffer overflow attacks or excessive resource usage.
 * Allowed characters 1234567890!@#$%^&*()a-zA-Z
 * */
export function sanitizeInput(input: unknown): string {
  // Ensure the input is a string
  if (typeof input !== 'string') {
    return ''; // Return a safe default for non-string inputs
  }

  // Trim excess whitespace and normalize the string
  const trimmed = input.trim();

  // Remove harmful characters, allowing only alphanumeric, spaces, and safe symbols
  const sanitized = trimmed.replace(/[^\w\s\-._@!#$%^&*()+=]/g, '');

  // Restrict the length to prevent overflow attacks
  const maxLength = 255;
  return sanitized.substring(0, maxLength);
}
/*
 * Validates the input whether it is a valid color value or not.
 * If invalid then returns a empty string.
 */
export function sanitizeColorValue(value: unknown): string {
  // Ensure the input is a string
  if (typeof value !== 'string') {
    return ''; // Return an empty string for non-string inputs
  }

  const trimmed = value.trim();

  // Define regex patterns for valid color formats
  const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  const rgbColorRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  // eslint-disable-next-line
  const rgbaColorRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|0?\.\d+|1)\s*\)$/;
  const hslColorRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
  // eslint-disable-next-line
  const hslaColorRegex = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0|0?\.\d+|1)\s*\)$/;
  const colorNameRegex = /^(transparent|inherit|initial|unset|[a-zA-Z]+)$/;

  // Validate against each pattern
  if (
    hexColorRegex.test(trimmed) ||
    rgbColorRegex.test(trimmed) ||
    rgbaColorRegex.test(trimmed) ||
    hslColorRegex.test(trimmed) ||
    hslaColorRegex.test(trimmed) ||
    colorNameRegex.test(trimmed)
  ) {
    return trimmed; // Return the sanitized color value
  }

  return ''; // Return an empty string for invalid color inputs
}

export function sanitizeImageInput(imageInput: string): string {
  // Remove leading and trailing quotes (if any)
  const sanitizedInput = imageInput.replace(/^["']|["']$/g, '');
  // Check if the input is a valid URL
  if (isValidUrl(sanitizedInput)) {
    return sanitizedInput; // Return the URL as is
  }

  // Check if the input is a valid base64-encoded string
  else if (isValidBase64(sanitizedInput)) {
    return sanitizedInput; // Return the base64 string as is
  }

  // If neither, throw an error
  else {
    throw new Error('Input is not a valid URL or base64-encoded string');
  }
}

function isValidUrl(url: string): boolean {
  try {
    // Use the URL constructor to validate the URL
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function isValidBase64(str: string): boolean {
  // Base64 regex to check if the string is a valid base64-encoded string
  const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

  // Check if the string matches the base64 pattern
  if (!base64Regex.test(str)) {
    return false;
  }

  // Try decoding the string to ensure it's valid base64
  try {
    atob(str); // Decode the base64 string
    return true;
  } catch (error) {
    return false;
  }
}

export default {
  sanitizeColorValue,
  sanitizeImageInput,
  sanitizeInput,
};
