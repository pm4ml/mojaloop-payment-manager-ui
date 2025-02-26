import { all, put, call, takeLatest } from 'redux-saga/effects';
import apis from '../../../utils/apis';
import { FETCH_STATES_REQUEST, fetchStatesSuccess, fetchStatesFailure } from './actions';

function* fetchStatesSaga(): Generator<any, void, any> {
  try {
    // mock response of comleted, pending, in error and other states
    // const states = yield call(apis.getStatesMockInCompleted.read, {});
    // const states = yield call(apis.getStatesMockPending.read, {});
    const states = yield call(apis.getStatesMockInError.read, {});
    // const states = yield call(apis.getStatesMockAllError.read, {});
    // const states = yield call(apis.getStatesMockOther.read, {});
    yield put(fetchStatesSuccess(states));
  } catch (error) {
    console.error('Error fetching states:', error);
    yield put(fetchStatesFailure(error));
  }
}

export function* watchFetchStatesSaga() {
  yield takeLatest(FETCH_STATES_REQUEST, fetchStatesSaga);
}

export default function* rootSaga() {
  yield all([watchFetchStatesSaga()]);
}
