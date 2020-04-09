import {
  CHANGE_AUTH_FORM_INPUT_VALUE,
  CHANGE_AUTH_FORM_VALIDATION_STATUS,
  CHANGE_REGISTRATION_FORM_INPUT_VALUE,
  CHANGE_REGISTRATION_FORM_VALIDATION_STATUS,
  START_API_REQUEST,
  FINISH_API_REQUEST,
  SIGN_IN,
  LOGOUT,
  SEND_REGISTRATION_REQUEST,
  GET_REQUEST_ERROR,
  SEND_AUTHORIZATION_REQUEST,
} from './actionTypes';

export function startApiRequest() {
  return {
    type: START_API_REQUEST,
  };
}

export function finishApiRequest() {
  return {
    type: FINISH_API_REQUEST,
  };
}

export function getError(message) {
  return {
    type: GET_REQUEST_ERROR,
    payload: message,
  };
}

export function changeAuthFormInputValue(inputName, newValue) {
  return {
    type: CHANGE_AUTH_FORM_INPUT_VALUE,
    payload: { inputName, newValue },
  };
}

export function changeAuthFormValidationStatus(status) {
  return {
    type: CHANGE_AUTH_FORM_VALIDATION_STATUS,
    payload: { status },
  };
}

export function changeRegistrationFormInputValue(inputName, newValue) {
  return {
    type: CHANGE_REGISTRATION_FORM_INPUT_VALUE,
    payload: { inputName, newValue },
  };
}

export function changeRegistrationFormValidationStatus(status) {
  return {
    type: CHANGE_REGISTRATION_FORM_VALIDATION_STATUS,
    payload: { status },
  };
}

export function signIn(userData) {
  return {
    type: SIGN_IN,
    payload: userData,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function sendRegistrationRequest(userName, password, isAdmin) {
  return {
    type: SEND_REGISTRATION_REQUEST,
    payload: { username: userName, password, is_admin: isAdmin },
  };
}

export function sendAuthorizationRequest(userName, password) {
  return {
    type: SEND_AUTHORIZATION_REQUEST,
    payload: { username: userName, password },
  };
}
