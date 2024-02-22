import axios from 'axios';

export default async function getUserInfo(config: {
  apiBaseUrl: string;
  checkSession: string;
  loginUrl: string;
  loginProvider: string;
  logoutUrl: string;
}) {
  try {
    if (config.checkSession && config.loginUrl) {
      // check for active session
      const session = await axios({
        method: 'GET',
        url: config.checkSession,
        validateStatus: (code) => (code > 199 && code < 300) || code === 401,
        withCredentials: true,
      });

      if (session.status === 401) {
        const loginUrl = `${config.loginUrl}?return_to=${window.location.href}`;
        if (!config.loginProvider) {
          window.location.assign(loginUrl);
          return false;
        }
        // obtain login flow
        const flow = await axios({
          method: 'GET',
          url: loginUrl,
          validateStatus: (code) => code > 199 && code < 300,
        });
        const {
          ui: { method, action, nodes },
        } = flow.data;
        const form = document.createElement('form');
        form.method = method;
        form.action = action;
        let submit: HTMLInputElement | undefined;

        nodes.forEach(
          ({
            attributes: { type, name, node_type, value },
          }: {
            attributes: Record<string, string>;
          }) => {
            if (name === 'provider' && value !== config.loginProvider) return;
            const element = document.createElement(node_type) as HTMLInputElement;
            if (name === 'provider') submit = element;
            element.type = type;
            element.value = value;
            element.name = name;
            form.appendChild(element);
          }
        );

        if (submit) {
          // submit flow with configured provider
          document.body.appendChild(form);
          submit.click();
        } else {
          // navigate to login url
          window.location.assign(loginUrl);
        }
        return false;
      }

      return (
        session?.data && {
          preferred_username: '',
          given_name: session.data.identity?.name,
          family_name: '',
          email: session.data.identity?.email,
          logoutUrl: config.logoutUrl,
          kratos: true,
        }
      );
    }

    const response = await axios({
      method: 'GET',
      url: `${config.apiBaseUrl}/userInfo`,
      validateStatus: (code) => (code > 199 && code < 300) || code === 401,
      withCredentials: true,
    });

    // if we get an unauthorised response status then redirect the browser to our backend login resource
    if (response.status === 401) {
      const redirectUrl = `${config.apiBaseUrl}/login?redirect=${window.location.href}`;
      window.location.href = redirectUrl;
      return false;
    }

    return response.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return undefined;
  }
}
