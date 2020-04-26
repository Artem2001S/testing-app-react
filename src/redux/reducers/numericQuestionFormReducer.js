import {
  CHANGE_NUMERIC_QUESTION_FORM_INPUT_VALUE,
  START_NUMERIC_QUESTION_EDITING,
} from 'redux/actions/actionTypes';
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
  questionId: -1,
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
    case START_NUMERIC_QUESTION_EDITING:
      return {
        ...state,
        questionId: payload.id,
        inputs: [
          {
            label: 'Question:',
            name: 'question-title',
            value: payload.title,
          },
          {
            type: 'number',
            label: 'Answer:',
            name: 'answer',
            value: String(payload.answer),
          },
        ],
      };
    default:
      return state;
  }
}
