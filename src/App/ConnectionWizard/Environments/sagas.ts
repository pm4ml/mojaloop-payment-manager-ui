import { Action } from 'redux';
import apis from 'utils/apis';
import { is200 } from 'utils/http';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  INIT_ENVIRONMENTS,
  REQUEST_ENVIRONMENTS,
  REQUEST_MONETARY_ZONES,
  RequestEnvironmentsAction,
  RequestMonetaryZonesAction,
} from './types';
import { setEnvironments, setMonetaryZones, setMonetaryZonesError } from './actions';

function* fetchEnvironments(action: RequestEnvironmentsAction) {
  const data = [{ id: '1', name: 'Environment' }];
  yield put(setEnvironments({ data }));
}

export function* requestEnvironmentsSaga() {
  yield takeLatest([REQUEST_ENVIRONMENTS], fetchEnvironments);
}

function* fetchMonetaryZones(action: RequestMonetaryZonesAction) {
  try {
    const response = yield call(apis.monetaryZones.read, {});

    if (is200(response.status)) {
      yield put(setMonetaryZones({ data: response.data }));
    } else {
      yield put(setMonetaryZonesError({ error: 'Error Fetching Monetary Zones' }));
    }
  } catch (e) {
    yield put(setMonetaryZonesError({ error: e.message }));
  }
}

export function* requestMonetaryZonesSaga() {
  yield takeLatest([REQUEST_MONETARY_ZONES], fetchMonetaryZones);
}

export function* fetchEnvironmentsAndMonetaryZones(action: Action) {
  yield all([fetchEnvironments(action), fetchMonetaryZones(action)]);
}

export function* initEnvironmentsSaga() {
  yield takeLatest([INIT_ENVIRONMENTS], fetchEnvironmentsAndMonetaryZones);
}

export default function* rootSaga() {
  yield all([initEnvironmentsSaga(), requestEnvironmentsSaga()]);
}
