import { createSelector } from 'reselect';
import { denormalizeTests } from 'redux/normalizr/normalizeTests';

const getTestsData = (state) => state.tests.data;

export const getTestsArray = createSelector([getTestsData], (normalizedTests) =>
  denormalizeTests(normalizedTests)
);
