import { all } from 'redux-saga/effects';
import appSagas from 'App/sagas';
import dashboardSagas from 'App/Dashboard/sagas';
import technicalDashboardSagas from 'App/TechnicalDashboard/sagas';
import transfersSagas from 'App/Transfers/sagas';
import wizardSagas from 'App/ConnectionWizard/sagas';
import fxpConversionsSagas from 'App/FxpConversions/sagas';

function* rootSaga() {
  yield all([
    appSagas(),
    dashboardSagas(),
    transfersSagas(),
    wizardSagas(),
    technicalDashboardSagas(),
    fxpConversionsSagas(),
  ]);
}

export default rootSaga;
