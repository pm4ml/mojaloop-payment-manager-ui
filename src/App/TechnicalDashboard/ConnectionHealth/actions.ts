import { ConnectionStateDataResponse } from './helpers';

export const FETCH_STATES_REQUEST = 'FETCH_STATES_REQUEST';
export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const FETCH_STATES_FAILURE = 'FETCH_STATES_FAILURE';

interface FetchStatesRequestAction {
  type: typeof FETCH_STATES_REQUEST;
}

interface FetchStatesSuccessAction {
  type: typeof FETCH_STATES_SUCCESS;
  payload: ConnectionStateDataResponse;
}

interface FetchStatesFailureAction {
  type: typeof FETCH_STATES_FAILURE;
  payload: string;
}

export type FetchStatesActionTypes =
  | FetchStatesRequestAction
  | FetchStatesSuccessAction
  | FetchStatesFailureAction;

export const fetchStatesRequest = (): FetchStatesRequestAction => ({
  type: FETCH_STATES_REQUEST,
});

export const fetchStatesSuccess = (
  states: ConnectionStateDataResponse
): FetchStatesSuccessAction => ({
  type: FETCH_STATES_SUCCESS,
  payload: states,
});

export const fetchStatesFailure = (error: string): FetchStatesFailureAction => ({
  type: FETCH_STATES_FAILURE,
  payload: error,
});

export const RECREATE_CERT_REQUEST = 'RECREATE_CERT_REQUEST';
export const RECREATE_CERT_SUCCESS = 'RECREATE_CERT_SUCCESS';
export const RECREATE_CERT_FAILURE = 'RECREATE_CERT_FAILURE';

type SecurityType = 'outboundTLS' | 'JWS';

export interface RecreateCertRequestAction {
  type: typeof RECREATE_CERT_REQUEST;
  payload: { securityType: SecurityType; reason: string };
}

interface RecreateCertSuccessAction {
  type: typeof RECREATE_CERT_SUCCESS;
  payload: { response: { status: string } };
}

interface RecreateCertFailureAction {
  type: typeof RECREATE_CERT_FAILURE;
  payload: { error: string };
}

export type RecreateCertActionTypes =
  | RecreateCertRequestAction
  | RecreateCertSuccessAction
  | RecreateCertFailureAction;

export const recreateCertRequest = (
  securityType: SecurityType,
  reason: string
): RecreateCertRequestAction => ({
  type: RECREATE_CERT_REQUEST,
  payload: { securityType, reason },
});

export const recreateCertSuccess = (response: { status: string }): RecreateCertSuccessAction => ({
  type: RECREATE_CERT_SUCCESS,
  payload: { response },
});

export const recreateCertFailure = (error: string): RecreateCertFailureAction => ({
  type: RECREATE_CERT_FAILURE,
  payload: { error: error || 'Unknown error' },
});

export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';

export type ConnectionStatus = 'pending' | 'inError' | 'completed' | 'inProgress';

interface SetConnectionStatusAction {
  type: typeof SET_CONNECTION_STATUS;
  payload: ConnectionStatus;
}

export type ConnectionStatusActionTypes = SetConnectionStatusAction;

export const setConnectionStatus = (status: ConnectionStatus): SetConnectionStatusAction => ({
  type: SET_CONNECTION_STATUS,
  payload: status,
});
