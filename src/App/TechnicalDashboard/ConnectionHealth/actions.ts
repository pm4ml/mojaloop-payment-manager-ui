export const FETCH_STATES_REQUEST = 'FETCH_STATES_REQUEST';
export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const FETCH_STATES_FAILURE = 'FETCH_STATES_FAILURE';

export const fetchStatesRequest = () => ({ type: FETCH_STATES_REQUEST });
export const fetchStatesSuccess = (states: any) => ({
  type: FETCH_STATES_SUCCESS,
  payload: states,
});
export const fetchStatesFailure = (error: any) => ({ type: FETCH_STATES_FAILURE, payload: error });

export const RECREATE_CERT_REQUEST = 'RECREATE_CERT_REQUEST';
export const RECREATE_CERT_SUCCESS = 'RECREATE_CERT_SUCCESS';
export const RECREATE_CERT_FAILURE = 'RECREATE_CERT_FAILURE';

type SecurityType = 'outboundTLS' | 'JWS';

interface RecreateCertRequestAction {
  type: typeof RECREATE_CERT_REQUEST;
  payload: { securityType: SecurityType; reason: string };
}

interface RecreateCertSuccessAction {
  type: typeof RECREATE_CERT_SUCCESS;
  payload: { response: any };
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

export const recreateCertSuccess = (response: any): RecreateCertSuccessAction => ({
  type: RECREATE_CERT_SUCCESS,
  payload: { response },
});

export const recreateCertFailure = (error: string): RecreateCertFailureAction => ({
  type: RECREATE_CERT_FAILURE,
  payload: { error: error || 'Unknown error' },
});
