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
  let primaryColor = '#e80002';
  let secondaryColor = '#9b0214';
  let accentColor = '#e80002';
  let appTitle = 'Airtel';
  let appLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Bharti_Airtel_Logo.svg/150px-Bharti_Airtel_Logo.svg.png';
  let countryLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/125px-Flag_of_Zambia.svg.png';

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
  return { primaryColor, secondaryColor, accentColor, appTitle, appLogo, countryLogo };
};
