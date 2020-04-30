import { createSelector } from 'reselect';
import { denormalizeTest } from 'redux/normalizr/normalizeTests';

const getTestsEntities = (state) => state.testEditingPage.entities;
const getTestsResult = (state) => state.testEditingPage.result;

export const getTest = createSelector(
  [getTestsEntities, getTestsResult],
  (entities, result) => denormalizeTest({ entities, result })
);
