/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import {
  SET_TRANSFERS_ERRORS,
  SET_TRANSFERS_ERRORS_ERROR,
  TOGGLE_TRANSFERS_ERRORS_VIEW_ALL,
  SET_TRANSFERS_ERRORS_TYPE_FILTER,
  TOGGLE_TRANSFER_FINDER_MODAL,
  SET_TRANSFER_FINDER_FILTER,
  REQUEST_TRANSFERS,
  UNREQUEST_TRANSFERS,
  SET_TRANSFERS,
  SET_FXPCONVERSIONS,
  SET_TRANSFERS_ERROR,
  SET_TRANSFERS_STATUSES,
  SET_TRANSFERS_STATUSES_ERROR,
  SET_TRANSFERS_SUCCESS_PERC,
  SET_TRANSFERS_SUCCESS_PERC_ERROR,
  SET_TRANSFERS_AVG_TIME,
  SET_TRANSFERS_AVG_TIME_ERROR,
  TransfersActionTypes,
  FxpConversionsState,
  DateRange,
  SET_FXPCONVERSION_DETAILS,
  TOGGLE_TRANSFER_DETAILS_MODAL,
  REQUEST_FXPCONVERSION,
  UNREQUEST_FXPCONVERSION,
  FxpConversionFilter,
  SetTransfersAction,
  SetTransfersErrorAction,
  SetTransfersStatusesAction,
  SetTransfersStatusesErrorAction,
  SetTransfersSuccessPercAction,
  SetTransfersSuccessPercErrorAction,
  SetFxpConversionsAction,
  SetTransfersAvgTimeAction,
  SetTransfersAvgTimeErrorAction,
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

function getTransferFinderFilterInitialState() {
  return {
    transferId: undefined,
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
  isTransfersErrorsViewAllActive: false,
  transfersErrorsTypeFilter: undefined,
  isTransferFinderModalVisible: false,
  transferFinderFilter: getTransferFinderFilterInitialState(),
  isTransfersRequested: false,
  fxpConversion: [],
  fxpConversions: [],
  fxpConversionsError: null,
  transfersStatuses: [],
  transfersStatusesError: null,
  transfersSuccessPercError: null,
  transfersAvgTimeError: null,
  isTransferDetailsModalVisible: false,
  fxpConversionDetailsError: null,
  fxpConversionFinderFilter: getFxpConversionFinderFilterInitialState(),
};

export default function fxpConversionsReducer(
  state = initialState,
  action: FxpConversionFilter | TransfersActionTypes
): FxpConversionsState {
  switch ('type' in action ? action.type : action) {
    case SET_TRANSFERS_ERRORS:
      return {
        ...state,
        fxpConversionsErrors: (action as { data: any }).data,
      };
    case SET_TRANSFERS_ERRORS_ERROR:
      return {
        ...state,
        fxpConversionsErrorsError: 'error' in action ? action.error : null,
      };
    case TOGGLE_TRANSFERS_ERRORS_VIEW_ALL:
      return {
        ...state,
        isTransfersErrorsViewAllActive: !state.isTransfersErrorsViewAllActive,
        transfersErrorsTypeFilter: initialState.transfersErrorsTypeFilter,
      };
    case SET_TRANSFERS_ERRORS_TYPE_FILTER:
      return {
        ...state,
        transfersErrorsTypeFilter: 'filter' in action ? action.filter : undefined,
      };
    case TOGGLE_TRANSFER_FINDER_MODAL: {
      return {
        ...state,
        isTransferFinderModalVisible: !state.isTransferFinderModalVisible,
        transferFinderFilter: getTransferFinderFilterInitialState(),
        isTransfersRequested: false,
      };
    }
    // fxp
    case TOGGLE_TRANSFER_FINDER_MODAL: {
      return {
        ...state,
        isTransferFinderModalVisible: !state.isTransferFinderModalVisible,
        fxpConversionFinderFilter: getFxpConversionFinderFilterInitialState(),
        isTransfersRequested: false,
      };
    }
    case TOGGLE_TRANSFER_DETAILS_MODAL: {
      return {
        ...state,
        isTransferDetailsModalVisible: !state.isTransferDetailsModalVisible,
      };
    }
    case SET_TRANSFER_FINDER_FILTER: {
      const { field, value } = action as { field: string; value: any };

      if (field === 'dates' && value) {
        return {
          ...state,
          transferFinderFilter: {
            ...state.transferFinderFilter,
            dates: value,
            from: getFromDateBySelection(value as DateRange),
            to: getToDateBySelection(value as DateRange),
          },
        };
      }
      if (field === 'from' || field === 'to') {
        return {
          ...state,
          transferFinderFilter: {
            ...state.transferFinderFilter,
            [field]: value,
            dates: 'CUSTOM',
          },
        };
      }
      return {
        ...state,
        transferFinderFilter: {
          ...state.transferFinderFilter,
          [field]: value,
        },
      };
    }
    case REQUEST_TRANSFERS:
      return {
        ...state,
        isTransfersRequested: true,
      };
    case UNREQUEST_TRANSFERS:
      return {
        ...state,
        isTransfersRequested: false,
      };
    case SET_TRANSFERS:
      return {
        ...state,
        fxpConversions: (action as SetFxpConversionsAction).data,
      };
    case SET_TRANSFERS_ERROR:
      return {
        ...state,
        fxpConversionsError: (action as SetTransfersErrorAction).error,
      };
    case SET_TRANSFERS_STATUSES:
      return {
        ...state,
        transfersStatuses: (action as SetTransfersStatusesAction).data,
      };
    case SET_TRANSFERS_STATUSES_ERROR:
      return {
        ...state,
        transfersStatusesError: (action as SetTransfersStatusesErrorAction).error,
      };
    case SET_TRANSFERS_SUCCESS_PERC:
      return {
        ...state,
        transfersSuccessPerc: (action as SetTransfersSuccessPercAction).data,
      };
    case SET_TRANSFERS_SUCCESS_PERC_ERROR:
      return {
        ...state,
        transfersSuccessPercError: (action as SetTransfersSuccessPercErrorAction).error,
      };
    case SET_TRANSFERS_AVG_TIME:
      return {
        ...state,
        transfersAvgTime: (action as SetTransfersAvgTimeAction).data,
      };
    case SET_TRANSFERS_AVG_TIME_ERROR:
      return {
        ...state,
        transfersAvgTimeError: (action as SetTransfersAvgTimeErrorAction).error,
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
        isTransfersRequested: true,
      };
    case UNREQUEST_FXPCONVERSION:
      return {
        ...state,
        isTransfersRequested: false,
      };
    case SET_FXPCONVERSION_DETAILS:
      return {
        ...state,
        fxpConversionDetails: (action as SetFxpConversionDetailsAction).data,
        isTransferDetailsModalVisible: true,
      };
    default:
      return state;
  }
}
