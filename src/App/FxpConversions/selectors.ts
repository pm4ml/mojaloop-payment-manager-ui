import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import { XYCoordinate, LinesConfig } from '../types';

export const getFxpConversionsErrors = (state: State) => state.fxpConversions.fxpConversionsErrors;
export const getFxpConversionsErrorsError = (state: State) =>
  state.fxpConversions.fxpConversionsErrorsError;
export const getIsFxpConversionsErrorsPending = createSelector(
  (state: State) => state.api,
  isPending('fxpConversionsErrors.read')
);
export const getIsFxpConversionsErrorsViewAllActive = (state: State) =>
  state.fxpConversions.isFxpConversionsErrorsViewAllActive;
export const getFxpConversionsErrorsTypeFilter = (state: State) =>
  state.fxpConversions.fxpConversionsErrorsTypeFilter;
export const getIsFxpConversionFinderModalVisible = (state: State) =>
  state.fxpConversions.isFxpConversionFinderModalVisible;
export const getFxpConversionFinderFilter = (state: State) =>
  state.fxpConversions.fxpConversionFinderFilter;
export const getFilteredByStatusFxpConversionsErrors = createSelector(
  getFxpConversionsErrors,
  getFxpConversionsErrorsTypeFilter,
  (errors, status) => {
    if (status) {
      return errors.filter((error) => error.errorType === status);
    }
    return errors;
  }
);

export const getIsFxpConversionsRequested = (state: State) =>
  state.fxpConversions.isFxpConversionsRequested;
// export const getFxpConversions = (state: State) => state.fxpConversions.fxpConversions;
export const getFxpConversions = (state: State) => state.fxpConversions.fxpConversions;
export const getFxpConversionsError = (state: State) => state.fxpConversions.fxpConversionsError;
export const getIsFxpConversionsPending = createSelector(
  (state: State) => state.api,
  isPending('fxpConversions.read')
);

export const getFxpConversionsStatuses = (state: State) =>
  state.fxpConversions.fxpConversionsStatuses;
export const getFxpConversionsStatusesError = (state: State) =>
  state.fxpConversions.fxpConversionsStatusesError;
export const getIsFxpConversionsStatusesPending = createSelector(
  (state: State) => state.api,
  isPending('fxpConversionsStatuses.read')
);

const transformRawFxpConversionData = (lines?: LinesConfig) => {
  const data: [number, number][] = [];

  const now: Date = new Date();
  const start: Date = new Date();

  start.setSeconds(0);
  start.setMilliseconds(0);
  start.setHours(now.getHours() - 24);

  const fullSeries: [number, number][] = [];

  while (start.getTime() < now.getTime()) {
    fullSeries.push([start.getTime(), 0]);
    start.setMinutes(start.getMinutes() + 1, 0, 0);
  }

  // merge our real data points with the background zero set
  if (lines && lines.points) {
    fullSeries.forEach((p) => {
      const realPoint = lines.points.find((l) => {
        return l[0] === p[0];
      });

      if (realPoint) {
        data.push(realPoint);
        return;
      }
      data.push(p);
    });
  }

  data.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });

  return data.map((d: [number, number]) => {
    return {
      x: d[0],
      y: d[1],
    } as XYCoordinate;
  });
};

export const getFxpConversionsSuccessPerc = (state: State) =>
  state.fxpConversions.fxpConversionsSuccessPerc;
export const getFxpConversionsSuccessPercError = (state: State) =>
  state.fxpConversions.fxpConversionsSuccessPercError;
export const getIsFxpConversionsSuccessPercPending = createSelector(
  (state: State) => state.api,
  isPending('fxpConversionsSuccessPerc.read')
);
export const getFxpConversionsSuccessPercTransformed = createSelector(
  getFxpConversionsSuccessPerc,
  transformRawFxpConversionData
);

export const getFxpConversionsAvgTime = (state: State) =>
  state.fxpConversions.fxpConversionsAvgTime;
export const getFxpConversionsAvgTimeError = (state: State) =>
  state.fxpConversions.fxpConversionsAvgTimeError;
export const getIsFxpConversionsAvgTimePending = createSelector(
  (state: State) => state.api,
  isPending('fxpConversionsAvgTime.read')
);
export const getFxpConversionsAvgTimeTransformed = createSelector(
  getFxpConversionsAvgTime,
  transformRawFxpConversionData
);

export const getIsFxpConversionDetailsModalVisible = (state: State) =>
  state.fxpConversions.isFxpConversionDetailsModalVisible;

export const getFxpConversionDetails = (state: State) => state.fxpConversions.fxpConversionDetails;
export const getFxpConversionDetailsError = (state: State) =>
  state.fxpConversions.fxpConversionDetailsError;
export const getIsFxpConversionDetailsPending = createSelector(
  (state: State) => state.api,
  isPending('fxpConversionDetails.read')
);
