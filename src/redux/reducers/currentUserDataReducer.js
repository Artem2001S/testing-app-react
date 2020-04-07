import { SIGN_IN, LOGOUT } from 'redux/actions/actionTypes';

const initialState = {
  isAuthorized: false,
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
        login: payload.login,
        isAdmin: payload.isAdmin,
        isAuthorized: true,
      };
    case LOGOUT:
      return {
        ...state,
        login: '',
        isAuthorized: false,
      };
    default:
      return state;
  }
}
