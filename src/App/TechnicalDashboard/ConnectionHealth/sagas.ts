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
  REONBOARD_REQUEST,
  reonboardSuccess,
  reonboardFailure,
  ReonboardActionTypes,
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

function* reonboardSaga(action: ReonboardActionTypes) {
  if (action.type !== REONBOARD_REQUEST) return;

  const { reason } = action.payload;
  try {
    const response: RecreateCertResponse = yield call(apis.reonboard.create, {
      body: { reason },
    });
    yield put(reonboardSuccess(response));
  } catch (error) {
    yield put(reonboardFailure(error instanceof Error ? error.message : 'Reonboard failed'));
  }
}

export function* watchReonboardSaga() {
  yield takeLatest(REONBOARD_REQUEST, reonboardSaga);
}

export default function* rootSaga() {
  yield all([watchFetchStatesSaga(), watchRecreateCertSaga(), watchReonboardSaga()]);
}
