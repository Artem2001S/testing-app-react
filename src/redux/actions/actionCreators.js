import { CHANGE_AUTH_FORM_INPUT_VALUE } from './actionTypes';

export function changeAuthFormInputValue(inputName, newValue) {
  return {
    type: CHANGE_AUTH_FORM_INPUT_VALUE,
    payload: { inputName, newValue },
  };
}
