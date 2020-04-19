import { createSelector } from 'reselect';
import { denormalizeTest } from 'redux/normalizr/normalizeTests';

const getTestData = (state) => state.testEditingPage;

export const getTest = createSelector([getTestData], (test) =>
  denormalizeTest(test)
);
