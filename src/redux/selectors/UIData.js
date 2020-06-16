import { createSelector } from 'reselect';

export const getIsLoading = createSelector(
  (state) => state.UIData.isLoading,
  (isLoading) => isLoading
);

export const getErrorMessage = createSelector(
  (state) => state.UIData.errors,
  (errors) => errors
);
