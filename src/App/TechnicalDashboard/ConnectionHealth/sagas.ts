import { all, put, call, takeLatest } from 'redux-saga/effects';
import apis from '../../../utils/apis';
import {
  FETCH_STATES_REQUEST,
  fetchStatesSuccess,
  fetchStatesFailure,
  RECREATE_CERT_REQUEST,
  recreateCertSuccess,
  recreateCertFailure,
  RecreateCertRequestAction,
  RecreateCertActionTypes,
} from './actions';
import { ConnectionStateDataResponse } from './helpers';

type RecreateCertResponse = { status: string };

function* fetchStatesSaga() {
  try {
    const response: ConnectionStateDataResponse = yield call(apis.getStates.read, {});
    yield put(fetchStatesSuccess(response));
  } catch (error) {
    yield put(fetchStatesFailure(error instanceof Error ? error.message : 'Request failed'));
  }
}

export function* watchFetchStatesSaga() {
  yield takeLatest(FETCH_STATES_REQUEST, fetchStatesSaga);
}

function isRecreateCertRequestAction(
  action: RecreateCertActionTypes
): action is RecreateCertRequestAction {
  return action.type === RECREATE_CERT_REQUEST;
}

function* recreateCertSaga(action: RecreateCertActionTypes) {
  if (!isRecreateCertRequestAction(action)) return;

  const { securityType, reason } = action.payload;
  try {
    const response: RecreateCertResponse = yield call(apis.recreateCert.create, {
      securityType,
      body: { reason },
    });
    yield put(recreateCertSuccess(response));
  } catch (error) {
    yield put(recreateCertFailure(error instanceof Error ? error.message : 'Request failed'));
  }
}

export function* watchRecreateCertSaga() {
  yield takeLatest(RECREATE_CERT_REQUEST, recreateCertSaga);
}

export default function* rootSaga() {
  yield all([watchFetchStatesSaga(), watchRecreateCertSaga()]);
}
