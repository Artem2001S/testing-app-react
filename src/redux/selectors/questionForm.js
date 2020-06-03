import { createSelector } from 'reselect';

const getQuestionFormState = (state) => state.questionForm;
const getInputs = (state) => state.questionForm.inputs;

export const getVisibleInputs = createSelector([getInputs], (inputs) =>
  inputs.filter((input) => !input.needToDelete)
);

export const getAllInputs = createSelector(
  [getQuestionFormState],
  (questionFormState) => questionFormState.inputs
);

export const getQuestionTitleInput = createSelector(
  [getQuestionFormState],
  (questionFormState) => questionFormState.questionTitleInput
);

export const getQuestionId = createSelector(
  [getQuestionFormState],
  (questionFormState) => questionFormState.questionId
);
