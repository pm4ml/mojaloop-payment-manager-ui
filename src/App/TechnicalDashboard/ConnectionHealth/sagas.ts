import { all, put, call, takeLatest } from 'redux-saga/effects';
import { getStates } from '../../../utils/api';
import { 
  FETCH_STATES_REQUEST, 
  fetchStatesSuccess, 
  fetchStatesFailure 
} from './actions';

function* fetchStatesSaga(): Generator<any, void, any> {
  try {
    const states = yield call(getStates);
    yield put(fetchStatesSuccess(states));
  } catch (error) {
    console.error("Error fetching states:", error);
    yield put(fetchStatesFailure(error));
  }
}

export function* watchFetchStatesSaga() {
  yield takeLatest(FETCH_STATES_REQUEST, fetchStatesSaga);
}

export default function* rootSaga() {
  yield all([watchFetchStatesSaga()]);
}
