import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux';
import apis from 'utils/apis';
import { is20x } from 'utils/http';
import {
  REQUEST_FXPCONVERSIONS_PAGE_DATA,
  REQUEST_FXPCONVERSIONS,
  REQUEST_FXPCONVERSIONS_STATUSES,
  REQUEST_FXPCONVERSIONS_SUCCESS_PERC,
  REQUEST_FXPCONVERSIONS_AVG_TIME,
  REQUEST_FXPCONVERSION_DETAILS,
  REQUEST_FXPCONVERSIONS_ERRORS,
  RequestFxpConversionsErrorsAction,
  RequestFxpConversionsAction,
  RequestFxpConversionsStatusesAction,
  RequestFxpConversionsSuccessPercAction,
  RequestFxpConversionsAvgTimeAction,
  RequestFxpConversionDetailsAction,
  SuccessPercApi,
  AvgTimeApi,
  REQUEST_FXPCONVERSION,
} from './types';
import {
  setFxpConversions,
  setFxpConversionsError,
  setFxpConversionsErrors,
  setFxpConversionsErrorsError,
  setFxpConversionsStatuses,
  setFxpConversionsStatusesError,
  setFxpConversionsSuccessPerc,
  setFxpConversionsSuccessPercError,
  setFxpConversionsAvgTime,
  setFxpConversionsAvgTimeError,
  setFxpConversionDetailsError,
  setFxpConversionDetails,
} from './actions';

export function* fetchFxpConversionsErrors(action: RequestFxpConversionsErrorsAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.fxpConversionsErrors.read, {});
    if (is20x(response.status)) {
      yield put(setFxpConversionsErrors({ data: response.data }));
    } else {
      yield put(setFxpConversionsErrorsError({ error: response.status }));
    }
  } catch (e) {
    yield put(setFxpConversionsErrorsError({ error: e.message }));
  }
}

export function* fxpConversionsErrorsSaga() {
  yield takeLatest([REQUEST_FXPCONVERSIONS_ERRORS], fetchFxpConversionsErrors);
}

function* fetchFxpConversionsStatuses(action: RequestFxpConversionsStatusesAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.fxpConversionsStatuses.read, {});
    if (is20x(response.status)) {
      yield put(setFxpConversionsStatuses({ data: response.data }));
    } else {
      yield put(setFxpConversionsStatusesError({ error: response.status }));
    }
  } catch (e) {
    yield put(setFxpConversionsStatusesError({ error: e.message }));
  }
}

export function* fxpConversionsStatusesSaga() {
  yield takeLatest([REQUEST_FXPCONVERSIONS_STATUSES], fetchFxpConversionsStatuses);
}

function* fetchFxpConversionsSuccessPerc(action: RequestFxpConversionsSuccessPercAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.fxpConversionsSuccessPerc.read, {
      params: { minutePrevious: 1440 },
    });
    yield put(
      setFxpConversionsSuccessPerc({
        data: {
          color: '',
          points: response.data.map((d: SuccessPercApi) => {
            return [Number(d.timestamp), Number(d.percentage)];
          }),
        },
      })
    );
  } catch (e) {
    yield put(setFxpConversionsSuccessPercError({ error: e.message }));
  }
}

export function* fxpConversionsSuccessPercSaga() {
  yield takeLatest([REQUEST_FXPCONVERSIONS_SUCCESS_PERC], fetchFxpConversionsSuccessPerc);
}

function* fetchFxpConversionsAvgTime(action: RequestFxpConversionsAvgTimeAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.fxpConversionsAvgTime.read, {
      params: { minutePrevious: 1440 },
    });

    yield put(
      setFxpConversionsAvgTime({
        data: {
          color: '',
          points: response.data.map((d: AvgTimeApi) => {
            return [Number(d.timestamp), Number(d.averageResponseTime)];
          }),
        },
      })
    );
  } catch (e) {
    yield put(setFxpConversionsAvgTimeError({ error: e.message }));
  }
}

export function* fxpConversionsAvgTimeSaga() {
  yield takeLatest([REQUEST_FXPCONVERSIONS_AVG_TIME], fetchFxpConversionsAvgTime);
}

function* fetchFxpConversionDetails(action: RequestFxpConversionDetailsAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.fxpConversionDetails.read, {
      conversionId: action.conversionId,
    });

    if (is20x(response.status)) {
      yield put(setFxpConversionDetails({ data: response.data }));
    } else {
      yield put(setFxpConversionDetailsError({ error: response.status }));
    }
  } catch (e) {
    yield put(setFxpConversionDetailsError({ error: e.message }));
  }
}

export function* fxpConversionDetailsSaga() {
  yield takeEvery([REQUEST_FXPCONVERSION_DETAILS], fetchFxpConversionDetails);
}

function* fetchFxpConversionsAllData(action: Action) {
  yield all([
    call(fetchFxpConversionsErrors, action),
    call(fetchFxpConversionsStatuses, action),
    call(fetchFxpConversionsSuccessPerc, action),
    call(fetchFxpConversionsAvgTime, action),
  ]);
}

export function* fxpConversionsPageSaga() {
  yield takeLatest([REQUEST_FXPCONVERSIONS_PAGE_DATA], fetchFxpConversionsAllData);
}

//Fxp Conversions API
function* fetchFxpConversions(action: RequestFxpConversionsAction) {
  try {
    let params;
    if (action.filters.conversionId) {
      params = {
        id: action.filters.conversionId,
      };
    } else {
      params = {
        startTimestamp: new Date(action.filters.from as number).toISOString(),
        endTimestamp: new Date(action.filters.to as number).toISOString(),
        recipientIdType: action.filters.aliasType,
        recipientIdValue: action.filters.payeeAlias,
        recipientIdSubValue: action.filters.aliasSubValue,
        direction: action.filters.direction,
        institution: action.filters.institution,
        status: action.filters.status,
      };
    }
    // eslint-disable-next-line
    const response = yield call(apis.fxpConversions.read, { params });
    console.log(response);
    if (is20x(response.status)) {
      yield put(setFxpConversions({ data: response.data.slice(0, 50) }));
    } else {
      yield put(setFxpConversionsError({ error: response.status }));
    }
  } catch (e) {
    yield put(setFxpConversionsError({ error: e.message }));
  }
}
export function* fxpConversionsSaga() {
  yield takeLatest([REQUEST_FXPCONVERSION], fetchFxpConversions);
}

//FXP Conversions Status API
// function* fetchFxpConversionsStatuses(action: RequestFxpConversionsStatusesAction) {
//   try {
//     // eslint-disable-next-line
//     const response = yield call(apis.fxpConversionsStatuses.read, {});
//     if (is20x(response.status)) {
//       yield put(setFxpConversionsStatuses({ data: response.data }));
//     } else {
//       yield put(setFxpConversionsStatusesError({ error: response.status }));
//     }
//   } catch (e) {
//     yield put(setFxpConversionsStatusesError({ error: e.message }));
//   }
// }

// export function* fxpConversionsStatusesSaga() {
//   yield takeLatest([REQUEST_FXPCONVERSIONS_STATUSES], fetchFxpConversionsStatuses);
// }

//FXP Conversions SuccessPerc
// function* fetchFxpConversionsSuccessPerc(action: RequestFxpConversionsSuccessPercAction) {
//   try {
//     // eslint-disable-next-line
//     const response = yield call(apis.fxpConversionsSuccessPerc.read, {
//       params: { minutePrevious: 1440 },
//     });
//     yield put(
//       setFxpConversionsSuccessPerc({
//         data: {
//           color: '',
//           points: response.data.map((d: SuccessPercApi) => {
//             return [Number(d.timestamp), Number(d.percentage)];
//           }),
//         },
//       })
//     );
//   } catch (e) {
//     yield put(setFxpConversionsSuccessPercError({ error: e.message }));
//   }
// }

// export function* fxpConversionsSuccessPercSaga() {
//   yield takeLatest([REQUEST_FXPCONVERSIONS_SUCCESS_PERC], fetchFxpConversionsSuccessPerc);
// }

// FXP Converions AVGTime
// function* fetchFxpConversionsAvgTime(action: RequestFxpConversionsAvgTimeAction) {
//   try {
//     // eslint-disable-next-line
//     const response = yield call(apis.fxpConversionsAvgTime.read, { params: { minutePrevious: 1440 } });

//     yield put(
//       setFxpConversionsAvgTime({
//         data: {
//           color: '',
//           points: response.data.map((d: AvgTimeApi) => {
//             return [Number(d.timestamp), Number(d.averageResponseTime)];
//           }),
//         },
//       })
//     );
//   } catch (e) {
//     yield put(setFxpConversionsAvgTimeError({ error: e.message }));
//   }
// }

// export function* fxpConversionsAvgTimeSaga() {
//   yield takeLatest([REQUEST_FXPCONVERSIONS_AVG_TIME], fetchFxpConversionsAvgTime);
// }

// FXPConversions ALL Data

// Root Saga
export default function* rootSaga() {
  yield all([
    fxpConversionsPageSaga(),
    fxpConversionsErrorsSaga(),
    fxpConversionsSaga(),
    fxpConversionsStatusesSaga(),
    fxpConversionsSuccessPercSaga(),
    fxpConversionsAvgTimeSaga(),
    fxpConversionDetailsSaga(),
    fxpConversionsPageSaga(),
    fxpConversionsErrorsSaga(),
  ]);
}
