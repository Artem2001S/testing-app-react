import { CHANGE_AUTH_FORM_INPUT_VALUE } from 'redux/actions/actionTypes';
import { updateInputsArray } from 'utils';
const initialState = {
  inputs: [
    {
      label: 'Login',
      name: 'login',
      value: '',
    },
    {
      label: 'Password',
      name: 'password',
      value: '',
      type: 'password',
    },
  ],
  validationStatus: '',
};

export function authorizationFormInputsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_AUTH_FORM_INPUT_VALUE:
      return {
        ...state,
        inputs: updateInputsArray(
          state.inputs,
          payload.inputName,
          payload.newValue
        ),
      };
    default:
      return state;
  }
}
