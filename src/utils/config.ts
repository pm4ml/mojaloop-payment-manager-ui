import axios from 'axios';
import { sanitizeInput, sanitizeColorValue, sanitizeImageInput } from './sanitization';

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

  // Default config
  let primaryColor = '';
  let secondaryColor = '';
  let accentColor = '';
  let appTitle = 'Payment Manager';
  let appLogo = '';
  let countryLogo = '';

  try {
    const { headers, data } = await axios(configURL);
    if (!headers['content-type'].includes('application/json')) {
      // eslint-disable-next-line
      console.info('Config was invalid. Falling back to default values');
    } else {
      // eslint-disable-next-line
      primaryColor = data.PRIMARY_COLOR ? data.PRIMARY_COLOR : primaryColor;
      secondaryColor = data.SECONDARY_COLOR ? data.SECONDARY_COLOR : secondaryColor;
      accentColor = data.ACCENT_COLOR ? data.ACCENT_COLOR : accentColor;
      appTitle = data.TITLE ? data.TITLE : appTitle;
      appLogo = data.LOGO ? data.LOGO : appLogo;
      countryLogo = data.COUNTRY_LOGO ? data.LOGO : countryLogo;
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
  if (appLogo !== '') appLogo = sanitizeImageInput(appLogo);
  if (countryLogo !== '') countryLogo = sanitizeImageInput(countryLogo);
  return { primaryColor, secondaryColor, accentColor, appTitle, appLogo, countryLogo };
};
