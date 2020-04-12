import { createSelector } from 'reselect';
import { denormalizeTests } from 'redux/normalizr/normalizeTests';

const getTests = (state) => state.tests;

export const getTestsArray = createSelector([getTests], (normalizedTests) =>
  denormalizeTests(normalizedTests)
);
