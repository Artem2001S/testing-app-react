import { createSelector } from 'reselect';

const getSearchTestFormState = (state) => state.searchTestForm;

export const getSearchTestFormInputValue = createSelector(
  [getSearchTestFormState],
  (formState) => formState.value
);
