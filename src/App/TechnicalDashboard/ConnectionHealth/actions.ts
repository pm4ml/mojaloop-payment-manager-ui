export const FETCH_STATES_REQUEST = 'FETCH_STATES_REQUEST';
export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const FETCH_STATES_FAILURE = 'FETCH_STATES_FAILURE';

export const fetchStatesRequest = () => ({ type: FETCH_STATES_REQUEST });
export const fetchStatesSuccess = (states: any) => ({ type: FETCH_STATES_SUCCESS, payload: states });
export const fetchStatesFailure = (error: any) => ({ type: FETCH_STATES_FAILURE, payload: error });
