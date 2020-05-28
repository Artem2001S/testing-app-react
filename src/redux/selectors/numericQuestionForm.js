import { createSelector } from 'reselect';

const getNumericQuestionFormState = (state) => state.numericQuestionForm;

export const getNumericQuestionFormInputs = createSelector(
  [getNumericQuestionFormState],
  (state) => state.inputs
);

export const getNumericQuestionFormQuestionId = createSelector(
  [getNumericQuestionFormState],
  (state) => state.questionId
);
