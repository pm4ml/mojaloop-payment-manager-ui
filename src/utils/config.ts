import axios from 'axios';

export const getConfig = async () => {
  const { protocol, host } = window.location;
  const configURL = `${protocol}//${host}/config`;
  let apiBaseUrl = 'http://localhost:3000';
  let checkSession;
  let loginUrl;
  let loginProvider;
  let logoutUrl;

  try {
    const { headers, data } = await axios(configURL);
    if (!headers['content-type'].includes('application/json') || data.API_BASE_URL === undefined) {
      // eslint-disable-next-line
      console.info('Config was invalid. Falling back to default values');
    } else {
      apiBaseUrl = data.API_BASE_URL;
      checkSession = data.CHECK_SESSION_URL;
      loginUrl = data.LOGIN_URL;
      loginProvider = data.LOGIN_PROVIDER;
      logoutUrl = data.LOGOUT_URL;
    }
  } catch (err) {
    // eslint-disable-next-line
    console.info('Config not found. Falling back to default values');
  }

  return { apiBaseUrl, checkSession, loginUrl, loginProvider, logoutUrl };
};

export const getUiConfig = async () => {
  // Default values set for now will be changed later.
  const { protocol, host } = window.location;
  const configURL = `${protocol}//${host}/uiConfig`;
  // // RED THEME
  // let primaryColor = '#e80002';
  // let secondaryColor = '#e80002';
  // let accentColor = '#9b0214';

  // BLUE THEME
  let primaryColor = '#4fc7e7';
  let secondaryColor = '#043865';
  let accentColor = '#02182b';

  // // YELLOW THEME
  // let primaryColor = '#f9d342';
  // let secondaryColor = '#f1b92a';
  // let accentColor = '#a77e07';

  let appTitle = 'Airtel';
  let appLogo =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Bharti_Airtel_Logo.svg/150px-Bharti_Airtel_Logo.svg.png';
  let countryLogo =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/125px-Flag_of_Zambia.svg.png';

  try {
    const { headers, data } = await axios(configURL);
    if (!headers['content-type'].includes('application/json')) {
      // eslint-disable-next-line
      console.info('Config was invalid. Falling back to default values');
    } else {
      // eslint-disable-next-line
      console.log(data);
      primaryColor = data.REACT_APP_PRIMARY_COLOR;
      secondaryColor = data.REACT_APP_SECONDARY_COLOR;
      accentColor = data.REACT_APP_ACCENT_COLOR;
      appTitle = data.REACT_APP_TITLE;
      appLogo = data.REACT_APP_LOGO;
      countryLogo = data.REACT_APP_COUNTRY_LOGO;
    }
  } catch (err) {
    // eslint-disable-next-line
    console.info('UI Config not found. Falling back to default values for the UI');
  }

  // Sanitize the variables before storing them to the store.
  primaryColor = sanitizeColorValue(primaryColor);
  secondaryColor = sanitizeColorValue(secondaryColor);
  accentColor = sanitizeColorValue(accentColor);
  appTitle = sanitizeInput(appTitle);
  appLogo = sanitizeImageInput(appLogo);
  countryLogo = sanitizeImageInput(countryLogo);
  return { primaryColor, secondaryColor, accentColor, appTitle, appLogo, countryLogo };
};

/*
 * Ensures the input is a string. If not, it safely returns an empty string
 * Removes anything outside alphanumeric characters, spaces, and common symbols used in typical input
 * Trims excess whitespace to clean up input from careless user input or malicious attempts.
 * Limits input length to 255 characters to prevent buffer overflow attacks or excessive resource usage.
 * Allowed characters 1234567890!@#$%^&*()a-zA-Z
 * */
function sanitizeInput(input: unknown): string {
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
function sanitizeColorValue(value: unknown): string {
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

function sanitizeImageInput(imageInput: string): string {
  // Check if the input is a valid URL
  if (isValidUrl(imageInput)) {
    return imageInput; // Return the URL as is
  }

  // Check if the input is a valid base64-encoded string
  else if (isValidBase64(imageInput)) {
    return imageInput; // Return the base64 string as is
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
