import { Switch, Route, Redirect } from 'react-router-dom';
import React, { FC } from 'react';
import './App.css';
import Layout from './Layout';
import TechnicalDashboard from './TechnicalDashboard';
import Transfers from './Transfers';
import SuccessToast from './SuccessToast';
import ErrorModal from './ErrorModal';
import connectors from './connectors';
import { User } from './types';
import FxpTechnicalDashboard from './FxpTechnicalDashboard';
import FxpTransfers from './FxpTransfers';

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
  return (
    <div className="App">
      <Layout.Container>
        <Layout.Navbar
          username={
            userInfo ? `${userInfo.givenName || ''} ${userInfo.familyName || ''}`.trim() : ''
          }
          logoutUrl={userInfo ? userInfo.logoutUrl : undefined}
          kratos={userInfo?.kratos}
          activeConnectionName="Modusbox & Mojaloop Labs"
          activeConnectionStatusColor="#12d670"
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
              <Route path="/fxptransfers" component={FxpTransfers} />
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
