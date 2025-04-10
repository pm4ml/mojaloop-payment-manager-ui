import { Reducer } from 'redux';
import { ConnectionStatusEnum, ConnectionStateDataResponse } from './helpers';
import {
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
  RECREATE_CERT_REQUEST,
  RECREATE_CERT_SUCCESS,
  RECREATE_CERT_FAILURE,
  SET_CONNECTION_STATUS,
} from './actions';

export type State = {
  status: 'pending' | 'inProgress' | 'completed' | 'inError';
  stateDescription: string;
  errorDescription: string;
};

type StatesState = {
  data: ConnectionStateDataResponse | null;
  isLoading: boolean;
  errorMessage: string | null;
  connectionStatus: ConnectionStatusEnum;
};

const initialStatesState: StatesState = {
  data: null,
  isLoading: false,
  errorMessage: null,
  connectionStatus: ConnectionStatusEnum.PENDING,
};

type FetchStatesRequestAction = {
  type: typeof FETCH_STATES_REQUEST;
};

type FetchStatesSuccessAction = {
  type: typeof FETCH_STATES_SUCCESS;
  payload: ConnectionStateDataResponse;
};

type FetchStatesFailureAction = {
  type: typeof FETCH_STATES_FAILURE;
  payload: string;
};

type SetConnectionStatusAction = {
  type: typeof SET_CONNECTION_STATUS;
  payload: ConnectionStatusEnum;
};

type StatesAction =
  | FetchStatesRequestAction
  | FetchStatesSuccessAction
  | FetchStatesFailureAction
  | SetConnectionStatusAction;

export const statesReducer: Reducer<StatesState, StatesAction> = (
  state = initialStatesState,
  action
) => {
  switch (action.type) {
    case FETCH_STATES_REQUEST:
      return { ...state, isLoading: true, errorMessage: null };

    case FETCH_STATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case FETCH_STATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload || 'Failed to fetch states',
      };

    case SET_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.payload,
      };

    default:
      return state;
  }
};

// ---------------------- Recreate Cert Reducer ----------------------

type CertState = {
  data: { status: string } | null;
  isLoading: boolean;
  errorMessage: string | null;
};

const initialCertState: CertState = {
  data: null,
  isLoading: false,
  errorMessage: null,
};

type RecreateCertRequestAction = {
  type: typeof RECREATE_CERT_REQUEST;
};

type RecreateCertSuccessAction = {
  type: typeof RECREATE_CERT_SUCCESS;
  payload: { response: { status: string } };
};

type RecreateCertFailureAction = {
  type: typeof RECREATE_CERT_FAILURE;
  payload: { error: string };
};

type CertAction = RecreateCertRequestAction | RecreateCertSuccessAction | RecreateCertFailureAction;

export const recreateCertReducer: Reducer<CertState, CertAction> = (
  state = initialCertState,
  action
) => {
  switch (action.type) {
    case RECREATE_CERT_REQUEST:
      return { ...state, isLoading: true, errorMessage: null };

    case RECREATE_CERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.response,
        errorMessage: null,
      };

    case RECREATE_CERT_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: null,
        errorMessage: action.payload.error || 'Certificate recreation failed',
      };

    default:
      return state;
  }
};
