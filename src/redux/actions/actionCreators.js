import {
  CHANGE_AUTH_FORM_INPUT_VALUE,
  CHANGE_AUTH_FORM_VALIDATION_STATUS,
  CHANGE_REGISTRATION_FORM_INPUT_VALUE,
  CHANGE_REGISTRATION_FORM_VALIDATION_STATUS,
} from './actionTypes';

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
