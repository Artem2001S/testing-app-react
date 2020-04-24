import { createSelector } from 'reselect';

const getInputs = (state) => state.questionForm.inputs;

export const getVisibleInputs = createSelector([getInputs], (inputs) =>
  inputs.filter((input) => !input.needToDelete)
);
