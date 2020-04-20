import {
  GET_TEST_INFO,
  CHANGE_TITLE_INPUT_VALUE,
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
    case CHANGE_TITLE_INPUT_VALUE:
      return {
        ...state,
        inputsData: {
          ...state.inputsData,
          titleEditing: { ...state.inputsData.titleEditing, value: payload },
        },
      };
    default:
      return state;
  }
}
