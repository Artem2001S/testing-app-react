import {
  CHANGE_REGISTRATION_FORM_INPUT_VALUE,
  CHANGE_REGISTRATION_FORM_VALIDATION_STATUS,
} from 'redux/actions/actionTypes';
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
    {
      label: 'Repeat password',
      name: 'repeated_password',
      value: '',
      type: 'password',
    },
    {
      label: 'Register as admin',
      name: 'is_admin',
      value: false,
      type: 'checkbox',
    },
  ],
  validationStatus: '',
};

export default function registrationFormReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case CHANGE_REGISTRATION_FORM_INPUT_VALUE:
      return {
        ...state,
        inputs: updateInputsArray(
          state.inputs,
          payload.inputName,
          payload.newValue
        ),
      };
    case CHANGE_REGISTRATION_FORM_VALIDATION_STATUS:
      return { ...state, validationStatus: payload.status };
    default:
      return state;
  }
}
