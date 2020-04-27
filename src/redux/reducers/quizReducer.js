import { GET_TEST_FOR_QUIZ_PAGE } from 'redux/actions/actionTypes';

const initialState = {
  test: {},
  currentQuestionIndex: -1,
};

export default function quizReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_TEST_FOR_QUIZ_PAGE:
      return {
        ...state,
        test: payload,
        currentQuestionIndex: 0,
        questionsCount: payload.questions.length,
      };
    default:
      return state;
  }
}
