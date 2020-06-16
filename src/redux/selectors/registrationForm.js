import { createSelector } from 'reselect';

const getRegistrationFormState = (state) => state.registrationForm;

export const getRegistrationFormInputs = createSelector(
  [getRegistrationFormState],
  (registrationForm) => registrationForm.inputs
);

export const getRegistrationFormValidationErrors = createSelector(
  [getRegistrationFormState],
  (registrationForm) => registrationForm.validationStatus
);
