import { Switch, Route, Redirect } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchStatesRequest, setConnectionStatus } from "./TechnicalDashboard/ConnectionHealth/actions";
import { getConnectionStateData } from "./TechnicalDashboard/ConnectionHealth/helpers";
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

import { ConnectionStatusEnum, indicatorColor, getNavbarConnectionStatus } from "./TechnicalDashboard/ConnectionHealth/helpers";

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
  const { appTitle, countryLogo, appLogo } = uiConfig;
  const connectionName = 'Modusbox & Mojaloop Labs';

  const dispatch = useDispatch();
  const connectionStateData = useSelector((state: any) => state.states.data?.data);
  const storedConnectionStatus = useSelector((state: any) => state.states.connectionStatus) as ConnectionStatusEnum;

  useEffect(() => {
    dispatch(fetchStatesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!connectionStateData || storedConnectionStatus === getConnectionStateData(connectionStateData).connectionStatus) {
      return;
    }

    dispatch(setConnectionStatus(getConnectionStateData(connectionStateData).connectionStatus));
  }, [connectionStateData, storedConnectionStatus, dispatch]);

  const connectionText = getNavbarConnectionStatus(storedConnectionStatus, connectionName);
  const connectionIndicatorColor = indicatorColor[storedConnectionStatus] || indicatorColor.pending;

  return (
    <div className="App">
      <Layout.Container>
        <Layout.Navbar
          username={
            userInfo ? `${userInfo.givenName || ''} ${userInfo.familyName || ''}`.trim() : ''
          }
          logoutUrl={userInfo ? userInfo.logoutUrl : undefined}
          kratos={userInfo?.kratos}
          connectionStatusTitle={connectionText}
          connectionStatusColor={connectionIndicatorColor}
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
