import {
  REQUEST_FXPCONVERSIONS_PAGE_DATA,
  RequestFxpConversionsPageDataAction,
  REQUEST_FXPCONVERSIONS_ERRORS,
  SET_FXPCONVERSIONS_ERRORS,
  SET_FXPCONVERSIONS_ERRORS_ERROR,
  TOGGLE_FXPCONVERSIONS_ERRORS_VIEW_ALL,
  SET_FXPCONVERSIONS_ERRORS_TYPE_FILTER,
  RequestFxpConversionsErrorsAction,
  RequestFxpConversionDetailsAction,
  REQUEST_FXPCONVERSION_DETAILS,
  SetFxpConversionsErrorsAction,
  SetFxpConversionsErrorsErrorAction,
  ToggleFxpConversionsErrorsViewAllAction,
  SetFxpConversionsErrorsTypeFilterAction,
  TOGGLE_FXPCONVERSION_FINDER_MODAL,
  ToggleFxpConversionFinderModalAction,
  SET_FXPCONVERSION_FINDER_FILTER,
  SetFxpConversionFinderFilterAction,
  REQUEST_FXPCONVERSIONS,
  UNREQUEST_FXPCONVERSIONS,
  SET_FXPCONVERSIONS,
  SET_FXPCONVERSIONS_ERROR,
  RequestFxpConversionsAction,
  UnrequestFxpConversionsAction,
  SetFxpConversionsAction,
  SetFxpConversionsErrorAction,
  REQUEST_FXPCONVERSIONS_STATUSES,
  SET_FXPCONVERSIONS_STATUSES,
  SET_FXPCONVERSIONS_STATUSES_ERROR,
  RequestFxpConversionsStatusesAction,
  SetFxpConversionsStatusesAction,
  SetFxpConversionsStatusesErrorAction,
  REQUEST_FXPCONVERSIONS_SUCCESS_PERC,
  SET_FXPCONVERSIONS_SUCCESS_PERC,
  SET_FXPCONVERSIONS_SUCCESS_PERC_ERROR,
  REQUEST_FXPCONVERSIONS_AVG_TIME,
  SET_FXPCONVERSIONS_AVG_TIME,
  SET_FXPCONVERSIONS_AVG_TIME_ERROR,
  RequestFxpConversionsSuccessPercAction,
  SetFxpConversionsSuccessPercAction,
  SetFxpConversionsSuccessPercErrorAction,
  RequestFxpConversionsAvgTimeAction,
  SetFxpConversionsAvgTimeAction,
  SetFxpConversionsAvgTimeErrorAction,
  FxpConversionError,
  FxpConversion,
  FxpConversionDetails,
  FxpConversionFilter,
  FxpConversionsStatus,
  SuccessPerc,
  AvgTime,
  SET_FXPCONVERSION_DETAILS,
  SET_FXPCONVERSION_DETAILS_ERROR,
  SetFxpConversionDetailsAction,
  SetFxpConversionDetailsErrorAction,
  ToggleFxpConversionDetailsModalAction,
  TOGGLE_FXPCONVERSION_DETAILS_MODAL,
  REQUEST_FXPCONVERSION,
  UNREQUEST_FXPCONVERSION,
  SetFxpConversionErrorsAction,
} from './types';

export function requestFxpConversionsPageData(): RequestFxpConversionsPageDataAction {
  return {
    type: REQUEST_FXPCONVERSIONS_PAGE_DATA,
  };
}

// setFxpConversionsErrors
export function setFxpConversionsErrors({
  data,
}: {
  data: FxpConversionError[];
}): SetFxpConversionErrorsAction {
  return {
    type: SET_FXPCONVERSIONS_ERRORS,
    data,
  };
}

// setFxpConversionsErrorsError
export function setFxpConversionsErrorsError({
  error,
}: {
  error: string;
}): SetFxpConversionsErrorsErrorAction {
  return {
    type: SET_FXPCONVERSIONS_ERRORS_ERROR,
    error,
  };
}

// requestFxpConversionsErrors
export function requestFxpConversionsErrors(): RequestFxpConversionsErrorsAction {
  return {
    type: REQUEST_FXPCONVERSIONS_ERRORS,
  };
}

// toggleFxpConversionsErrorsViewAll
export function toggleFxpConversionsErrorsViewAll(): ToggleFxpConversionsErrorsViewAllAction {
  return {
    type: TOGGLE_FXPCONVERSIONS_ERRORS_VIEW_ALL,
  };
}

// setFxpConversionsErrorsTypeFilter
export function setFxpConversionsErrorsTypeFilter({
  filter,
}: {
  filter: string;
}): SetFxpConversionsErrorsTypeFilterAction {
  return {
    type: SET_FXPCONVERSIONS_ERRORS_TYPE_FILTER,
    filter,
  };
}

export function toggleFxpConversionFinderModal(): ToggleFxpConversionFinderModalAction {
  return {
    type: TOGGLE_FXPCONVERSION_FINDER_MODAL,
  };
}

export function toggleFxpConversionFinderModalAction(): ToggleFxpConversionFinderModalAction {
  return {
    type: TOGGLE_FXPCONVERSION_FINDER_MODAL,
  };
}

export function setFxpConversionFinderFilter({
  field,
  value,
}: {
  field: string;
  value: string | number;
}): SetFxpConversionFinderFilterAction {
  return {
    type: SET_FXPCONVERSION_FINDER_FILTER,
    field,
    value,
  };
}

export function setFxpConversions({ data }: { data: FxpConversion[] }): SetFxpConversionsAction {
  return {
    type: SET_FXPCONVERSIONS,
    data,
  };
}

// setFxpConversionsError
export function setFxpConversionsError({ error }: { error: string }): SetFxpConversionsErrorAction {
  return {
    type: SET_FXPCONVERSIONS_ERROR,
    error,
  };
}

// fxp
export function requestFxpConversions({
  filters,
}: {
  filters: FxpConversionFilter;
}): RequestFxpConversionsAction {
  return {
    type: REQUEST_FXPCONVERSION,
    filters,
  };
}

export function unrequestFxpConversions(): UnrequestFxpConversionsAction {
  return {
    type: UNREQUEST_FXPCONVERSION,
  };
}

export function setFxpConversionsStatuses({
  data,
}: {
  data: FxpConversionsStatus[];
}): SetFxpConversionsStatusesAction {
  return {
    type: SET_FXPCONVERSIONS_STATUSES,
    data,
  };
}

export function setFxpConversionsStatusesError({
  error,
}: {
  error: string;
}): SetFxpConversionsStatusesErrorAction {
  return {
    type: SET_FXPCONVERSIONS_STATUSES_ERROR,
    error,
  };
}

export function requestFxpConversionsStatuses(): RequestFxpConversionsStatusesAction {
  return {
    type: REQUEST_FXPCONVERSIONS_STATUSES,
  };
}

export function requestFxpConversionDetails({
  conversionId,
}: {
  conversionId: string;
}): RequestFxpConversionDetailsAction {
  return {
    type: REQUEST_FXPCONVERSION_DETAILS,
    conversionId,
  };
}

export function setFxpConversionDetails({
  data,
}: {
  data: FxpConversionDetails;
}): SetFxpConversionDetailsAction {
  return {
    type: SET_FXPCONVERSION_DETAILS,
    data,
  };
}

export function setFxpConversionDetailsError({
  error,
}: {
  error: string;
}): SetFxpConversionDetailsErrorAction {
  return {
    type: SET_FXPCONVERSION_DETAILS_ERROR,
    error,
  };
}

export function toggleFxpConversionDetailsModal(): ToggleFxpConversionDetailsModalAction {
  return {
    type: TOGGLE_FXPCONVERSION_DETAILS_MODAL,
  };
}

export function requestFxpConversionsSuccessPerc(): RequestFxpConversionsSuccessPercAction {
  return {
    type: REQUEST_FXPCONVERSIONS_SUCCESS_PERC,
  };
}

export function setFxpConversionsSuccessPerc({
  data,
}: {
  data: SuccessPerc;
}): SetFxpConversionsSuccessPercAction {
  return {
    type: SET_FXPCONVERSIONS_SUCCESS_PERC,
    data,
  };
}

export function setFxpConversionsSuccessPercError({
  error,
}: {
  error: string;
}): SetFxpConversionsSuccessPercErrorAction {
  return {
    type: SET_FXPCONVERSIONS_SUCCESS_PERC_ERROR,
    error,
  };
}

export function requestFxpConversionsAvgTime(): RequestFxpConversionsAvgTimeAction {
  return {
    type: REQUEST_FXPCONVERSIONS_AVG_TIME,
  };
}

export function setFxpConversionsAvgTime({
  data,
}: {
  data: AvgTime;
}): SetFxpConversionsAvgTimeAction {
  return {
    type: SET_FXPCONVERSIONS_AVG_TIME,
    data,
  };
}

export function setFxpConversionsAvgTimeError({
  error,
}: {
  error: string;
}): SetFxpConversionsAvgTimeErrorAction {
  return {
    type: SET_FXPCONVERSIONS_AVG_TIME_ERROR,
    error,
  };
}
