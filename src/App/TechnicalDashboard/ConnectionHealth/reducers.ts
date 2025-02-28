import { Reducer } from 'redux';
import {
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
  RECREATE_CERT_REQUEST,
  RECREATE_CERT_SUCCESS,
  RECREATE_CERT_FAILURE,
} from './actions';

interface State {
  status: 'pending' | 'inProgress' | 'completed' | 'inError';
  stateDescription: string;
  errorDescription: string;
}

interface StatesState {
  data: Record<string, State>;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialStatesState: StatesState = {
  data: {},
  isLoading: false,
  errorMessage: null,
};
interface StatesAction {
  type: string;
  payload?: Record<string, State> | string;
}

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
        data: action.payload as Record<string, State>,
      };

    case FETCH_STATES_FAILURE:
      return { ...state, isLoading: false, errorMessage: action.payload as string };

    default:
      return state;
  }
};

interface CertState {
  data: any | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialCertState: CertState = {
  data: null,
  isLoading: false,
  errorMessage: null,
};

interface CertAction {
  type: string;
  payload?: {
    response?: any;
    error?: string;
  };
}

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
        data: action.payload?.response,
        errorMessage: null,
      };

    case RECREATE_CERT_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: null,
        errorMessage: action.payload?.error || 'Unknown error',
      };

    default:
      return state;
  }
};
