/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import {
  SET_FXPCONVERSIONS_ERRORS,
  SET_FXPCONVERSIONS_ERRORS_ERROR,
  TOGGLE_FXPCONVERSIONS_ERRORS_VIEW_ALL,
  SET_FXPCONVERSIONS_ERRORS_TYPE_FILTER,
  TOGGLE_FXPCONVERSION_FINDER_MODAL,
  SET_FXPCONVERSION_FINDER_FILTER,
  REQUEST_FXPCONVERSIONS,
  UNREQUEST_FXPCONVERSIONS,
  SET_FXPCONVERSIONS,
  SET_FXPCONVERSIONS_ERROR,
  SET_FXPCONVERSIONS_STATUSES,
  SET_FXPCONVERSIONS_STATUSES_ERROR,
  SET_FXPCONVERSIONS_SUCCESS_PERC,
  SET_FXPCONVERSIONS_SUCCESS_PERC_ERROR,
  SET_FXPCONVERSIONS_AVG_TIME,
  SET_FXPCONVERSIONS_AVG_TIME_ERROR,
  FxpConversionsActionTypes,
  FxpConversionsState,
  DateRange,
  SET_FXPCONVERSION_DETAILS,
  TOGGLE_FXPCONVERSION_DETAILS_MODAL,
  REQUEST_FXPCONVERSION,
  UNREQUEST_FXPCONVERSION,
  FxpConversionFilter,
  SetFxpConversionsErrorAction,
  SetFxpConversionsStatusesAction,
  SetFxpConversionsStatusesErrorAction,
  SetFxpConversionsSuccessPercAction,
  SetFxpConversionsSuccessPercErrorAction,
  SetFxpConversionsAction,
  SetFxpConversionsAvgTimeAction,
  SetFxpConversionsAvgTimeErrorAction,
  SetFxpConversionDetailsAction,
} from './types';

const dateRanges = {
  TODAY: [moment().startOf('day').format('x'), moment().endOf('day').format('x')],
  PAST_48_HOURS: [moment().subtract(48, 'hours').format('x'), moment().format('x')],
  '1_WEEK': [
    moment().subtract(1, 'week').startOf('day').format('x'),
    moment().endOf('day').format('x'),
  ],
  '1_MONTH': [
    moment().subtract(1, 'month').startOf('day').format('x'),
    moment().endOf('day').format('x'),
  ],
  CUSTOM: [moment().startOf('day').format('x'), moment().endOf('day').format('x')],
};

function getFromDateBySelection(range: DateRange) {
  return parseInt(dateRanges[range][0], 10);
}

function getToDateBySelection(range: DateRange) {
  return parseInt(dateRanges[range][1], 10);
}

function getFxpConversionFinderFilterInitialState() {
  return {
    conversionId: undefined,
    dates: DateRange.Today,
    from: getFromDateBySelection(DateRange.Today),
    to: getToDateBySelection(DateRange.Today),
    aliasType: undefined,
    payeeAlias: undefined,
    aliasSubValue: undefined,
    direction: undefined,
    institution: undefined,
    status: undefined,
  };
}

export const initialState: FxpConversionsState = {
  fxpConversionsErrors: [],
  fxpConversionsErrorsError: null,
  isFxpConversionsErrorsViewAllActive: false,
  fxpConversionsErrorsTypeFilter: undefined,
  isFxpConversionFinderModalVisible: false,
  isFxpConversionsRequested: false,
  // fxpConversion: [],
  fxpConversions: [],
  fxpConversionsError: null,
  fxpConversionsStatuses: [],
  fxpConversionsStatusesError: null,
  fxpConversionsSuccessPercError: null,
  fxpConversionsAvgTimeError: null,
  isFxpConversionDetailsModalVisible: false,
  fxpConversionDetailsError: null,
  fxpConversionFinderFilter: getFxpConversionFinderFilterInitialState(),
};

export default function fxpConversionsReducer(
  state = initialState,
  action: FxpConversionFilter | FxpConversionsActionTypes
): FxpConversionsState {
  switch ('type' in action ? action.type : action) {
    case SET_FXPCONVERSIONS_ERRORS:
      return {
        ...state,
        fxpConversionsErrors: (action as { data: any }).data,
      };
    case SET_FXPCONVERSIONS_ERRORS_ERROR:
      return {
        ...state,
        fxpConversionsErrorsError: 'error' in action ? action.error : null,
      };
    case TOGGLE_FXPCONVERSIONS_ERRORS_VIEW_ALL:
      return {
        ...state,
        isFxpConversionsErrorsViewAllActive: !state.isFxpConversionsErrorsViewAllActive,
        fxpConversionsErrorsTypeFilter: initialState.fxpConversionsErrorsTypeFilter,
      };
    case SET_FXPCONVERSIONS_ERRORS_TYPE_FILTER:
      return {
        ...state,
        fxpConversionsErrorsTypeFilter: 'filter' in action ? action.filter : undefined,
      };
    case TOGGLE_FXPCONVERSION_FINDER_MODAL: {
      return {
        ...state,
        isFxpConversionFinderModalVisible: !state.isFxpConversionFinderModalVisible,
        fxpConversionFinderFilter: getFxpConversionFinderFilterInitialState(),
        isFxpConversionsRequested: false,
      };
    }
    case TOGGLE_FXPCONVERSION_DETAILS_MODAL: {
      return {
        ...state,
        isFxpConversionDetailsModalVisible: !state.isFxpConversionDetailsModalVisible,
      };
    }
    case SET_FXPCONVERSION_FINDER_FILTER: {
      const { field, value } = action as { field: string; value: any };

      if (field === 'dates' && value) {
        return {
          ...state,
          fxpConversionFinderFilter: {
            ...state.fxpConversionFinderFilter,
            dates: value,
            from: getFromDateBySelection(value as DateRange),
            to: getToDateBySelection(value as DateRange),
          },
        };
      }
      if (field === 'from' || field === 'to') {
        return {
          ...state,
          fxpConversionFinderFilter: {
            ...state.fxpConversionFinderFilter,
            [field]: value,
            dates: 'CUSTOM',
          },
        };
      }
      return {
        ...state,
        fxpConversionFinderFilter: {
          ...state.fxpConversionFinderFilter,
          [field]: value,
        },
      };
    }
    case REQUEST_FXPCONVERSIONS:
      return {
        ...state,
        isFxpConversionsRequested: true,
      };
    case UNREQUEST_FXPCONVERSIONS:
      return {
        ...state,
        isFxpConversionsRequested: false,
      };
    case SET_FXPCONVERSIONS:
      return {
        ...state,
        fxpConversions: (action as SetFxpConversionsAction).data,
      };
    case SET_FXPCONVERSIONS_ERROR:
      return {
        ...state,
        fxpConversionsError: (action as SetFxpConversionsErrorAction).error,
      };
    case SET_FXPCONVERSIONS_STATUSES:
      return {
        ...state,
        fxpConversionsStatuses: (action as SetFxpConversionsStatusesAction).data,
      };
    case SET_FXPCONVERSIONS_STATUSES_ERROR:
      return {
        ...state,
        fxpConversionsStatusesError: (action as SetFxpConversionsStatusesErrorAction).error,
      };
    case SET_FXPCONVERSIONS_SUCCESS_PERC:
      return {
        ...state,
        fxpConversionsSuccessPerc: (action as SetFxpConversionsSuccessPercAction).data,
      };
    case SET_FXPCONVERSIONS_SUCCESS_PERC_ERROR:
      return {
        ...state,
        fxpConversionsSuccessPercError: (action as SetFxpConversionsSuccessPercErrorAction).error,
      };
    case SET_FXPCONVERSIONS_AVG_TIME:
      return {
        ...state,
        fxpConversionsAvgTime: (action as SetFxpConversionsAvgTimeAction).data,
      };
    case SET_FXPCONVERSIONS_AVG_TIME_ERROR:
      return {
        ...state,
        fxpConversionsAvgTimeError: (action as SetFxpConversionsAvgTimeErrorAction).error,
      };
    // FXP
    case SET_FXPCONVERSIONS:
      return {
        ...state,
        fxpConversions: (action as SetFxpConversionsAction).data,
      };
    case REQUEST_FXPCONVERSION:
      return {
        ...state,
        isFxpConversionsRequested: true,
      };
    case UNREQUEST_FXPCONVERSION:
      return {
        ...state,
        isFxpConversionsRequested: false,
      };
    case SET_FXPCONVERSION_DETAILS:
      return {
        ...state,
        fxpConversionDetails: (action as SetFxpConversionDetailsAction).data,
        isFxpConversionDetailsModalVisible: true,
      };
    default:
      return state;
  }
}
