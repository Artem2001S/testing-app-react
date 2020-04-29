import {
  GET_TEST_FOR_QUIZ_PAGE,
  NEXT_QUESTION,
  FINISH_QUIZ,
  CHANGE_QUIZ_ANSWER_INPUT,
} from 'redux/actions/actionTypes';
import { createInputsForAnswers, validateAnswer } from 'utils/quizUtils';
import { updateInputsArray } from 'utils';

const initialState = {
  test: {},
  currentQuestionIndex: -1,
  questionsCount: 0,
  answerInputs: [],
  isFinished: false,
  correctAnswersCount: 0,
};

export default function quizReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_TEST_FOR_QUIZ_PAGE:
      // if test not found
      if (payload.id === -1) {
        return initialState;
      }

      return {
        ...state,
        test: payload,
        currentQuestionIndex: 0,
        questionsCount: payload.questions.length,
        answerInputs: createInputsForAnswers(payload.questions[0]),
        isFinished: false,
        correctAnswersCount: 0,
      };
    case CHANGE_QUIZ_ANSWER_INPUT:
      const isRadioButtons =
        state.test.questions[state.currentQuestionIndex].question_type ===
        'single';

      return {
        ...state,
        answerInputs: updateInputsArray(
          state.answerInputs,
          payload.inputName,
          payload.newValue,
          isRadioButtons
        ),
      };
    case NEXT_QUESTION:
      const currentQuestion = state.test.questions[state.currentQuestionIndex];
      const isCorrect = validateAnswer(currentQuestion, state.answerInputs);

      const correctAnswersCount = isCorrect
        ? state.correctAnswersCount + 1
        : state.correctAnswersCount;

      // check is quiz finished
      // +1 - next question
      if (state.questionsCount === state.currentQuestionIndex + 1) {
        return {
          ...state,
          isFinished: true,
          correctAnswersCount,
        };
      }

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answerInputs: createInputsForAnswers(
          state.test.questions[state.currentQuestionIndex + 1]
        ),
        correctAnswersCount,
      };
    case FINISH_QUIZ:
      const isAnswerCorrect = validateAnswer(
        state.test.questions[state.currentQuestionIndex],
        state.answerInputs
      );

      const finalCorrectAnswersCount = isAnswerCorrect
        ? state.correctAnswersCount + 1
        : state.correctAnswersCount;

      return {
        ...state,
        isFinished: true,
        correctAnswersCount: finalCorrectAnswersCount,
      };
    default:
      return state;
  }
}
