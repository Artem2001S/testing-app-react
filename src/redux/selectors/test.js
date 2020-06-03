import { createSelector } from 'reselect';
import { denormalizeTest } from 'redux/normalizr/normalizeTests';

const getTestsEntities = (state) => state.testEditingPage.entities;
const getTestsResult = (state) => state.testEditingPage.result;
const getTestEditingPageState = (state) => state.testEditingPage;

export const getTest = createSelector(
  [getTestsEntities, getTestsResult],
  (entities, result) => denormalizeTest({ entities, result })
);

export const getCurrentTestId = createSelector(
  [getTestEditingPageState],
  (state) => state.result
);

export const getCurrentTestQuestions = createSelector(
  [getTest],
  (test) => test.questions
);

export const getSelectedQuestionType = createSelector(
  [getTestEditingPageState],
  (state) => state.inputsData.addFormQuestionType
);

export const getTestTitleEditingInput = createSelector(
  [getTestEditingPageState],
  (state) => state.inputsData.titleEditing
);
