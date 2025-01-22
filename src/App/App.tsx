import { Switch, Route, Redirect } from 'react-router-dom';
import React, { FC } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import TechnicalDashboard from './TechnicalDashboard';
import Transfers from './Transfers';
import SuccessToast from './SuccessToast';
import ErrorModal from './ErrorModal';
import connectors from './connectors';
import { User } from './types';
import FxpTechnicalDashboard from './FxpTechnicalDashboard';
// import FxpTransfers from './FxpConversions';
import FxpConversions from './FxpConversions';

import { getUiConfig } from './selectors';

interface AppProps {
  isSuccessToastVisible: boolean;
  isErrorModalVisible: boolean;
  errorModalContent: string;
  onCloseErrorModal: () => void;
  userInfo?: User;
  logoutUrl: string;
}

const App: FC<AppProps> = ({
  isSuccessToastVisible,
  isErrorModalVisible,
  errorModalContent,
  onCloseErrorModal,
  userInfo,
}) => {
  const uiConfig = useSelector(getUiConfig);
  const appTitle = uiConfig.appTitle || 'CBC';
  const countryLogo = uiConfig.countryLogo || '/Comesa-logo.png';
  const appLogo = uiConfig.appLogo || '/cbs_logo.jpg';
  const activeConnectionName = 'Modusbox & Mojaloop Labs';
  const activeConnectionStatusColor = '#12d670';
  return (
    <div className="App">
      <Layout.Container>
        <Layout.Navbar
          username={
            userInfo ? `${userInfo.givenName || ''} ${userInfo.familyName || ''}`.trim() : ''
          }
          logoutUrl={userInfo ? userInfo.logoutUrl : undefined}
          kratos={userInfo?.kratos}
          activeConnectionName={activeConnectionName}
          activeConnectionStatusColor={activeConnectionStatusColor}
          appTitle={appTitle}
          appLogo={appLogo}
          countryLogo={countryLogo}
        />
        <Layout.Content>
          <Layout.SideMenu />
          <Layout.Page>
            <Switch>
              {/*
                uncomment when dashboard uses real data and not mock
                <Route path="/dashboard" component={Dashboard} />
              */}
              <Route path="/transfers" component={Transfers} />
              <Route path="/fxpConversions" component={FxpConversions} />
              <Route path="/techdashboard" component={TechnicalDashboard} />
              <Route path="/fxptechdashboard" component={FxpTechnicalDashboard} />

              {/* process.env.NODE_ENV === 'development' && <Route path="/test" component={Test} /> */}

              <Route path="/" exact>
                <Redirect to="/transfers" />
              </Route>
              <Route>
                <Redirect to="/transfers" />
              </Route>
            </Switch>
          </Layout.Page>
        </Layout.Content>
      </Layout.Container>

      <SuccessToast isVisible={isSuccessToastVisible} />
      <ErrorModal
        isVisible={isErrorModalVisible}
        content={errorModalContent}
        onClose={onCloseErrorModal}
      />
    </div>
  );
};

export default connectors(App);
