import { createSelector } from 'reselect';

const getCurrentUserData = (state) => state.currentUserData;

export const getIsAuthorized = createSelector(
  [getCurrentUserData],
  (userData) => userData.isAuthorized
);
