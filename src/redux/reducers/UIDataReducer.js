import {
  START_API_REQUEST,
  FINISH_API_REQUEST,
  GET_REQUEST_ERROR,
} from 'redux/actions/actionTypes';

const initialState = {
  isLoading: false,
  errors: '',
};

export default function UIDataReducer(state = initialState, { payload, type }) {
  switch (type) {
    case START_API_REQUEST:
      return { ...state, isLoading: true, errors: '' };
    case FINISH_API_REQUEST:
      return { ...state, isLoading: false };
    case GET_REQUEST_ERROR:
      return { ...state, errors: payload };
    default:
      return state;
  }
}
