import { createSelector } from 'reselect';
import { denormalizeTests } from 'redux/normalizr/normalizeTests';

const getTestsEntities = (state) => state.tests.data.entities;
const getTestsResult = (state) => state.tests.data.result;

export const getTests = createSelector(
  [getTestsEntities, getTestsResult],
  (entities, result) => denormalizeTests({ entities, result })
);

const getLastTestAddedId = (state) => state.tests.lastTestAddedId;

export const getIsAfterCreating = createSelector(
  [getLastTestAddedId],
  (lastAddedTestId) => lastAddedTestId !== -1
);
