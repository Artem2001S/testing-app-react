import { CHANGE_NUMERIC_QUESTION_FORM_INPUT_VALUE } from 'redux/actions/actionTypes';
import { updateInputsArray } from 'utils';

const initialState = {
  inputs: [
    {
      label: 'Question:',
      name: 'question-title',
      value: '',
    },
    {
      type: 'number',
      label: 'Answer:',
      name: 'answer',
      value: '',
    },
  ],
};

export default function numericQuestionFormReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case CHANGE_NUMERIC_QUESTION_FORM_INPUT_VALUE:
      return {
        ...state,
        inputs: updateInputsArray(
          state.inputs,
          payload.inputName,
          payload.newValue
        ),
      };
    default:
      return state;
  }
}
