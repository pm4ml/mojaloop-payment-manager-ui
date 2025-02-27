import { Reducer, combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { apiReducer } from 'utils/api';
import { reducer as appReducer } from 'App';
import { reducer as dashboardReducer } from 'App/Dashboard';
import { reducer as technicalDashboardReducer } from 'App/TechnicalDashboard';
import { reducer as transfersReducer } from 'App/Transfers';
import { reducer as wizardReducer } from 'App/ConnectionWizard';
import fxpConversionsReducer from '../App/FxpConversions/reducers';

import { statesReducer, jwsCertReducer, OutboundTlsCertReducer } from 'App/TechnicalDashboard/ConnectionHealth/reducers';
const getReducer = (history: History): Reducer =>
  combineReducers({
    api: apiReducer,
    app: appReducer,
    router: connectRouter(history),
    dashboard: dashboardReducer,
    technicalDashboard: technicalDashboardReducer,
    transfers: transfersReducer,
    wizard: wizardReducer,
    fxpConversions: fxpConversionsReducer,
    states: statesReducer,
    jwsCert: jwsCertReducer,
    outboundTlsCert: OutboundTlsCertReducer,
  });

export default getReducer;
