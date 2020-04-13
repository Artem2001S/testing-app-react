import { createSelector } from 'reselect';
import { denormalizeTests } from 'redux/normalizr/normalizeTests';
import { sortTypes } from 'constants.js';

const getTestsData = (state) => state.tests.data;
const getTestsSortType = (state) => state.tests.sortType;

const getTestsArray = createSelector([getTestsData], (normalizedTests) =>
  denormalizeTests(normalizedTests)
);

export const getSortedTests = createSelector(
  [getTestsArray, getTestsSortType],
  (tests, sortType) => {
    if (sortType === sortTypes.descending) {
      return tests.sort((a, b) => b.createdAtValue - a.createdAtValue);
    } else {
      return tests.sort((a, b) => a.createdAtValue - b.createdAtValue);
    }
  }
);
