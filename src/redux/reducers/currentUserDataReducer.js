import { SIGN_IN, SUCCESS_LOGOUT } from 'redux/actions/actionTypes';

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
    default:
      return state;
  }
}
