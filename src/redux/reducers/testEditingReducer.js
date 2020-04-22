import {
  GET_TEST_INFO,
  CHANGE_TITLE_INPUT_VALUE,
  DELETE_QUESTION_SUCCESS,
  CHANGE_ADD_FORM_QUESTION_TYPE,
  ADD_QUESTION_SUCCESS,
} from 'redux/actions/actionTypes';

const initialState = {
  entities: {
    answers: {},
    questions: {},
    tests: {},
  },
  result: -1,
  inputsData: {
    titleEditing: { label: 'Title', name: 'test_title', value: '' },
    addFormQuestionType: 'single',
  },
};

export default function testEditingPageReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case GET_TEST_INFO:
      const testTitle = payload.entities.tests[payload.result].title;

      return {
        ...state,
        ...payload,
        inputsData: {
          ...state.inputsData,
          titleEditing: { ...state.inputsData.titleEditing, value: testTitle },
        },
      };
    case DELETE_QUESTION_SUCCESS:
      const newEntities = { ...state.entities };
      delete newEntities.questions[payload];

      // delete question reference
      newEntities.tests[state.result].questions = newEntities.tests[
        state.result
      ].questions.filter((questionId) => questionId !== payload);

      return { ...state, entities: newEntities };
    case ADD_QUESTION_SUCCESS:
      const test = { ...state.entities.tests[state.result] };

      return {
        ...state,
        entities: {
          ...state.entities,
          tests: {
            [state.result]: {
              ...test,
              questions: [...test.questions, payload.id],
            },
          },
          questions: {
            ...state.entities.questions,
            [payload.id]: payload,
          },
        },
      };
    case CHANGE_TITLE_INPUT_VALUE:
      return {
        ...state,
        inputsData: {
          ...state.inputsData,
          titleEditing: { ...state.inputsData.titleEditing, value: payload },
        },
      };
    case CHANGE_ADD_FORM_QUESTION_TYPE:
      return {
        ...state,
        inputsData: {
          ...state.inputsData,
          addFormQuestionType: payload,
        },
      };
    default:
      return state;
  }
}
