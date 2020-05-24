import { createSelector } from 'reselect';
import { denormalizeTests } from 'redux/normalizr/normalizeTests';
import { sortTypes } from 'constants.js';

const getTestsEntities = (state) => state.tests.data.entities;
const getTestsResult = (state) => state.tests.data.result;

const getTestsArray = createSelector(
  [getTestsEntities, getTestsResult],
  (entities, result) => denormalizeTests({ entities, result })
);

const getTestsSortType = (state) => state.tests.sortType;

export const getTests = createSelector(
  [getTestsArray, getTestsSortType],
  (tests, sortType) => {
    if (sortType === sortTypes.descending) {
      return tests.sort((a, b) => b.createdAtValue - a.createdAtValue);
    } else {
      return tests.sort((a, b) => a.createdAtValue - b.createdAtValue);
    }
  }
);

const getLastTestAddedId = (state) => state.tests.lastTestAddedId;
export const getIsAfterCreating = createSelector(
  [getLastTestAddedId],
  (lastAddedTestId) => lastAddedTestId !== -1
);
