import { Reducer } from 'redux';
import {
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
  RECREATE_JWS_CERT_REQUEST,
  RECREATE_JWS_CERT_SUCCESS,
  RECREATE_JWS_CERT_FAILURE,
  RECREATE_OUTBOUND_TLS_CERT_REQUEST,
  RECREATE_OUTBOUND_TLS_CERT_SUCCESS,
  RECREATE_OUTBOUND_TLS_CERT_FAILURE,

} from './actions';
interface CertAction {
  type: string;
  payload?: any;
}

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

interface JwsCertState {
  data: any | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialJwsCertState: JwsCertState = {
  data: null,
  isLoading: false,
  errorMessage: null,
};

export const jwsCertReducer: Reducer<JwsCertState, CertAction> = (state = initialJwsCertState, action) => {
  switch (action.type) {
    case RECREATE_JWS_CERT_REQUEST:
      return { ...state, isLoading: true, errorMessage: null };

    case RECREATE_JWS_CERT_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };

    case RECREATE_JWS_CERT_FAILURE:
      return { ...state, isLoading: false, errorMessage: action.payload as string };

    default:
      return state;
  }
};
interface OutboundTlsCertState {
  data: any | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialOutboundTlsCertState: OutboundTlsCertState = {
  data: null,
  isLoading: false,
  errorMessage: null,
};

export const OutboundTlsCertReducer: Reducer<OutboundTlsCertState, CertAction> = (state = initialOutboundTlsCertState, action) => {
  switch (action.type) {
    case RECREATE_OUTBOUND_TLS_CERT_REQUEST:
      return { ...state, isLoading: true, errorMessage: null };

    case RECREATE_OUTBOUND_TLS_CERT_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };

    case RECREATE_OUTBOUND_TLS_CERT_FAILURE:
      return { ...state, isLoading: false, errorMessage: action.payload as string };

    default:
      return state;
  }
};