import {
  SIGN_IN,
  SUCCESS_LOGOUT,
  CHANGE_IS_AUTHORIZED_STATUS,
} from 'redux/actions/actionTypes';

const initialState = {
  isAuthorized: true,
  login: '',
  isAdmin: false,
};

export default function currentUserDataReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        login: payload.username,
        isAdmin: payload.is_admin,
        isAuthorized: true,
      };
    case SUCCESS_LOGOUT:
      return {
        ...state,
        login: '',
        isAuthorized: false,
      };
    case CHANGE_IS_AUTHORIZED_STATUS:
      return {
        ...state,
        isAuthorized: payload,
      };
    default:
      return state;
  }
}
