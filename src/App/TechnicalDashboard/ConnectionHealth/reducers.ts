import { Reducer } from 'redux';
import {
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
} from './actions';

interface StatesState {
  data: any[]; 
  loading: boolean;
  error: string | null;
}

const initialState: StatesState = {
  data: [],
  loading: false,
  error: null,
};

interface StatesAction {
  type: string;
  payload?: any;
}

export const statesReducer: Reducer<StatesState, StatesAction> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_STATES_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_STATES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
