import { createSelector } from 'reselect';

const getAddTestFormState = (state) => state.addTestForm;

export const getAddTestFormInput = createSelector(
  [getAddTestFormState],
  (formState) => formState.input
);
