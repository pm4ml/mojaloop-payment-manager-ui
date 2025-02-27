import { all, put, call, takeLatest } from 'redux-saga/effects';
import apis from '../../../utils/apis';
import {
  FETCH_STATES_REQUEST,
  fetchStatesSuccess,
  fetchStatesFailure,
  RECREATE_JWS_CERT_REQUEST,
  recreateJwsCertSuccess,
  recreateJwsCertFailure,
  RECREATE_OUTBOUND_TLS_CERT_REQUEST,
  recreateOutboundTlsCertSuccess,
  recreateOutboundTlsCertFailure
} from './actions';

function* fetchStatesSaga(): Generator<any, void, any> {
  try {
    // mock response of comleted, pending, in error and other states
    // const states = yield call(apis.getStatesMockInCompleted.read, {});
    // const states = yield call(apis.getStatesMockPending.read, {});
    const states = yield call(apis.getStatesMockInError.read, {});
    // const states = yield call(apis.getStatesMockAllError.read, {});
    // const states = yield call(apis.getStatesMockOther.read, {});
    console.log('states', states);
    yield put(fetchStatesSuccess(states));
  } catch (error) {
    console.error('Error fetching states:', error);
    yield put(fetchStatesFailure(error));
  }
}

export function* watchFetchStatesSaga() {
  yield takeLatest(FETCH_STATES_REQUEST, fetchStatesSaga);
}

function* recreateJwsCertSaga(): Generator<any, void, any> {
  try {
    const jwsCert = yield call(apis.recreateJwsCertMock.read, {});
    console.log('recreateJwsCertSaga', jwsCert);
    yield put(recreateJwsCertSuccess(jwsCert));
  } catch (error) {
    console.error('Error recreating JWS certificate:', error);
    yield put(recreateJwsCertFailure(error));
  }
}

export function* watchRecreateJwsCertSaga() {
  yield takeLatest(RECREATE_JWS_CERT_REQUEST, recreateJwsCertSaga);
}

function* recreateOutboundTlsCertSaga(): Generator<any, void, any> {
  try {
    const outboundTlsCert = yield call(apis.recreateOutboundTlsCertMock.read, {});
    console.log('recreateOutboundTlsCertSaga', outboundTlsCert);
    yield put(recreateOutboundTlsCertSuccess(outboundTlsCert));
  } catch (error) {
    console.error('Error recreating Outbound TLS certificate:', error);
    yield put(recreateOutboundTlsCertFailure(error));
  }
}

export function* watchRecreateOutboundTlsCertSaga() {
  yield takeLatest(RECREATE_OUTBOUND_TLS_CERT_REQUEST, recreateOutboundTlsCertSaga);
}

export default function* rootSaga() {
  yield all([watchFetchStatesSaga(), watchRecreateJwsCertSaga(), watchRecreateOutboundTlsCertSaga()]);
}