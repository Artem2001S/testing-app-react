import { createSelector } from 'reselect';

const getAuthorizationFormState = (state) => state.authorizationFormInputs;

export const getAuthorizationFormInputs = createSelector(
  [getAuthorizationFormState],
  (authorizationForm) => authorizationForm.inputs
);

export const getAuthorizationFormValidationErrors = createSelector(
  [getAuthorizationFormState],
  (authorizationForm) => authorizationForm.validationStatus
);
