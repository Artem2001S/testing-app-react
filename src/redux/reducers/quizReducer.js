import {
  GET_TEST_FOR_QUIZ_PAGE,
  NEXT_QUESTION,
  FINISH_QUIZ,
} from 'redux/actions/actionTypes';
import { createInputsForAnswers } from 'utils/quizUtils';

const initialState = {
  test: {},
  currentQuestionIndex: -1,
  questionsCount: 0,
  answerInputs: [],
  isFinished: false,
};

export default function quizReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_TEST_FOR_QUIZ_PAGE:
      return {
        ...state,
        test: payload,
        currentQuestionIndex: 0,
        questionsCount: payload.questions.length,
        answerInputs: createInputsForAnswers(payload.questions[0]),
        isFinished: false,
      };
    case NEXT_QUESTION:
      // check did quiz finished
      // +1 - next question index
      // +1 - index start from zero
      if (state.questionsCount === state.currentQuestionIndex + 1) {
        return {
          ...state,
          isFinished: true,
        };
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answerInputs: createInputsForAnswers(
          state.test.questions[state.currentQuestionIndex + 1]
        ),
      };

    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    default:
      return state;
  }
}
