import { createSelector } from 'reselect';

const getCurrentUserData = (state) => state.currentUserData;

export const getIsAuthorized = createSelector(
  [getCurrentUserData],
  (userData) => userData.isAuthorized
);

export const getIsAdmin = createSelector(
  [getCurrentUserData],
  (userData) => userData.isAdmin
);

export const getLogin = createSelector(
  [getCurrentUserData],
  (userData) => userData.login
);
