import axios from 'axios';

const getConfig = async () => {
  const { protocol, host } = window.location;
  const configURL = `${protocol}//${host}/config`;
  let apiBaseUrl = 'http://localhost:3000';
  let checkSession;
  let loginUrl;
  let loginProvider;
  let logoutUrl;
  let enableAuthentication = false;

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
      enableAuthentication = data.ENABLE_AUTHENTICATION === 'true';
    }
  } catch (err) {
    // eslint-disable-next-line
    console.info('Config not found. Falling back to default values');
  }

  return { apiBaseUrl, checkSession, loginUrl, loginProvider, logoutUrl, enableAuthentication };
};

export default getConfig;
