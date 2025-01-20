import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { getUiConfig, getConfig } from 'utils/config';
import setupStyles from 'utils/setupStyles';
import getUserInfo from 'utils/authentication';
import { User } from './App/types';
import './icons';
import App from './App';
import configureStore from './store';
import 'normalize.css';
import './index.css';

const history: History = createBrowserHistory();
const store = configureStore(history, { isDevelopment: process.env.NODE_ENV === 'development' });

const ConnectedApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} context={ReactReduxContext}>
      <App />
    </ConnectedRouter>
  </Provider>
);

async function bootstrap() {
  const config = await getConfig();
  const uiConfigurations = await getUiConfig();
  setupStyles(uiConfigurations);

  // we make a blocking call to getUserInfo before rendering as this will tell
  // us if we are authenticated or not. we should not render anything if we are
  // not authenticated at startup.
  // If we're not authenticated the call to getUserInfo will redirect the
  // browser to the login URL but the browser will stupidly carry on executing
  // code once we have called window.location.href=. The render block is
  // wrapped in a conditional to prevent this once the redirect has been
  // initiated.
  const userInfo = await getUserInfo(config);

  if (userInfo) {
    const user: User = {
      username: userInfo.preferred_username,
      givenName: userInfo.given_name,
      familyName: userInfo.family_name,
      email: userInfo.email,
      kratos: userInfo.kratos,
      logoutUrl: 'logoutUrl' in userInfo ? userInfo.logoutUrl : `${config.apiBaseUrl}/logout`,
    };

    // only render if we got user info i.e. we are authenticated
    store.dispatch({ type: 'App / Set Config', config });
    store.dispatch({ type: 'App / Set User', data: user });
    store.dispatch({ type: 'App / Set UI Config', uiConfig: uiConfigurations });
    ReactDOM.render(
      <React.StrictMode>
        <ConnectedApp />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}

bootstrap();
