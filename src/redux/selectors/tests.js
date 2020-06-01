import { createSelector } from 'reselect';
import { denormalizeTests } from 'redux/normalizr/normalizeTests';

const getTestsEntities = (state) => state.tests.data.entities;
const getTestsResult = (state) => state.tests.data.result;

export const getTests = createSelector(
  [getTestsEntities, getTestsResult],
  (entities, result) => denormalizeTests({ entities, result })
);

const getTestsState = (state) => state.tests;

export const getLastTestAddedId = createSelector(
  [getTestsState],
  (testsState) => testsState.lastTestAddedId
);

export const getIsAfterCreating = createSelector(
  [getLastTestAddedId],
  (lastAddedTestId) => lastAddedTestId !== -1
);

export const getTotalPages = createSelector(
  [getTestsState],
  (testsState) => testsState.totalPages
);

export const getCurrentSortType = createSelector(
  [getTestsState],
  (testsState) => testsState.sortType
);

export const getCurrentTestsListPage = createSelector(
  [getTestsState],
  (testsState) => testsState.currentPage
);
