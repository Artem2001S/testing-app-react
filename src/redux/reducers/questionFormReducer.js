import {
  CHANGE_QUESTION_FORM_INPUT_VALUE,
  CHANGE_QUESTION_FORM_CHECKBOX_VALUE,
  CHANGE_QUESTION_FORM_ANSWER_POSITION,
  ADD_ANSWER_TO_QUESTION_FORM,
  DELETE_ANSWER_FROM_QUESTION_FORM,
} from 'redux/actions/actionTypes';
import { updateInputsArray } from 'utils';

const initialState = {
  questionTitleInput: {
    label: 'Question title',
    name: 'question-title',
    value: '',
  },
  inputs: [
    {
      name: 'answer-1',
      value: '',
      isRight: true,
      initialPosition: 0,
      isNew: true,
      needToDelete: false,
    },
    {
      name: 'answer-2',
      value: '',
      isRight: false,
      initialPosition: 1,
      isNew: true,
      needToDelete: false,
    },
  ],
};

export default function questionFormReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case ADD_ANSWER_TO_QUESTION_FORM:
      return {
        ...state,
        inputs: [
          ...state.inputs,
          {
            name: `answer-${state.inputs.length + 1}`,
            value: '',
            isRight: false,
            initialPosition: state.inputs.length,
            isNew: true,
            needToDelete: false,
          },
        ],
      };
    case DELETE_ANSWER_FROM_QUESTION_FORM:
      const itemForDelete = state.inputs.find(
        (input) => input.name === payload.inputName
      );

      itemForDelete.needToDelete = true;

      return {
        ...state,
        inputs: [...state.inputs],
      };
    case CHANGE_QUESTION_FORM_INPUT_VALUE:
      if (payload.inputName === state.questionTitleInput.name) {
        return {
          ...state,
          questionTitleInput: {
            ...state.questionTitleInput,
            value: payload.newValue,
          },
        };
      } else {
        return {
          ...state,
          inputs: updateInputsArray(
            state.inputs,
            payload.inputName,
            payload.newValue
          ),
        };
      }
    case CHANGE_QUESTION_FORM_CHECKBOX_VALUE:
      return {
        ...state,
        inputs: state.inputs.map((input) =>
          input.name === payload.inputName
            ? { ...input, isRight: payload.newValue }
            : input
        ),
      };
    case CHANGE_QUESTION_FORM_ANSWER_POSITION:
      const visibleInputs = state.inputs.filter((input) => !input.needToDelete);
      const { from, to } = payload;

      // swap items
      // eslint-disable-next-line
      [visibleInputs[from], visibleInputs[to]] = [visibleInputs[to], visibleInputs[from]];

      return {
        ...state,
        inputs: visibleInputs,
      };
    default:
      return state;
  }
}
