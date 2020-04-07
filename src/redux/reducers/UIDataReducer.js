import {
  START_API_REQUEST,
  FINISH_API_REQUEST,
} from 'redux/actions/actionTypes';

const initialState = {
  isLoading: false,
};

export default function UIDataReducer(state = initialState, { payload, type }) {
  switch (type) {
    case START_API_REQUEST:
      return { ...state, isLoading: true };
    case FINISH_API_REQUEST:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
