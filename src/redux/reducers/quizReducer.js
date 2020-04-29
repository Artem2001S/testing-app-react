import { GET_TEST_FOR_QUIZ_PAGE } from 'redux/actions/actionTypes';
import { createInputsForAnswers } from 'utils/quizUtils';

const initialState = {
  test: {},
  currentQuestionIndex: -1,
  questionsCount: 0,
  answerInputs: [],
};

export default function quizReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_TEST_FOR_QUIZ_PAGE:
      return {
        ...state,
        test: payload,
        currentQuestionIndex: 2,
        questionsCount: payload.questions.length,
        answerInputs: createInputsForAnswers(payload.questions[2]),
      };
    default:
      return state;
  }
}
