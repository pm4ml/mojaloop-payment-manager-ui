import { all, put, call, takeLatest } from 'redux-saga/effects';
import apis from '../../../utils/apis';
import {
  FETCH_STATES_REQUEST,
  fetchStatesSuccess,
  fetchStatesFailure,
  RECREATE_CERT_REQUEST,
  recreateCertSuccess,
  recreateCertFailure,
} from './actions';

function* fetchStatesSaga(): Generator<any, void, any> {
  try {
    // [getStates, getStatesMockInCompleted, getStatesMockPending, getStatesMockInError, getStatesMockOther, getStatesMockAllError]
    const states = yield call(apis.getStatesMockInError.read, {});
    console.log('Fetched states:', states);
    yield put(fetchStatesSuccess(states));
  } catch (error) {
    console.error('Error fetching states:', error);
    yield put(fetchStatesFailure(error));
  }
}

export function* watchFetchStatesSaga() {
  yield takeLatest(FETCH_STATES_REQUEST, fetchStatesSaga);
}

function* recreateCertSaga(action: any): Generator<any, void, any> {
  const { securityType, reason } = action.payload || {};
  try {
    // recreateCert
    const response = yield call(apis.recreateCertMockSuccess.create, {
      securityType,
      body: { reason }
    });
    console.log(`Recreate cert response for ${securityType}`, response.data);
    yield put(recreateCertSuccess(response));
  } catch (error) {
    console.error('Error recreating cert:', error);
    yield put(
      recreateCertFailure(
        error instanceof Error ? error.message : 'Request failed'
      )
    );
  }
}

export function* watchRecreateCertSaga() {
  yield takeLatest(RECREATE_CERT_REQUEST, recreateCertSaga);
}

export default function* rootSaga() {
  yield all([watchFetchStatesSaga(), watchRecreateCertSaga()]);
}
