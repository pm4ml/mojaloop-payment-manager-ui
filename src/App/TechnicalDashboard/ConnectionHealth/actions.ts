export const FETCH_STATES_REQUEST = 'FETCH_STATES_REQUEST';
export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const FETCH_STATES_FAILURE = 'FETCH_STATES_FAILURE';

export const fetchStatesRequest = () => ({ type: FETCH_STATES_REQUEST });
export const fetchStatesSuccess = (states: any) => ({ type: FETCH_STATES_SUCCESS, payload: states });
export const fetchStatesFailure = (error: any) => ({ type: FETCH_STATES_FAILURE, payload: error });

export const RECREATE_JWS_CERT_REQUEST = 'RECREATE_JWS_CERT_REQUEST';
export const RECREATE_JWS_CERT_SUCCESS = 'RECREATE_JWS_CERT_SUCCESS';
export const RECREATE_JWS_CERT_FAILURE = 'RECREATE_JWS_CERT_FAILURE';

export const recreateJwsCertRequest = () => ({ type: RECREATE_JWS_CERT_REQUEST });
export const recreateJwsCertSuccess = (jwsCert: any) => ({ type: RECREATE_JWS_CERT_SUCCESS, payload: jwsCert });
export const recreateJwsCertFailure = (error: any) => ({ type: RECREATE_JWS_CERT_FAILURE, payload: error });


export const RECREATE_OUTBOUND_TLS_CERT_REQUEST = 'RECREATE_OUTBOUND_TLS_CERT_REQUEST';
export const RECREATE_OUTBOUND_TLS_CERT_SUCCESS = 'RECREATE_OUTBOUND_TLS_CERT_SUCCESS';
export const RECREATE_OUTBOUND_TLS_CERT_FAILURE = 'RECREATE_OUTBOUND_TLS_CERT_FAILURE';

export const recreateOutboundTlsCertRequest = () => ({ type: RECREATE_OUTBOUND_TLS_CERT_REQUEST });
export const recreateOutboundTlsCertSuccess = (outboundTlsCert: any) => ({ type: RECREATE_OUTBOUND_TLS_CERT_SUCCESS, payload: outboundTlsCert });
export const recreateOutboundTlsCertFailure = (error: any) => ({ type: RECREATE_OUTBOUND_TLS_CERT_FAILURE, payload: error });
