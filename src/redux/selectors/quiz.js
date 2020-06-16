import { createSelector } from 'reselect';

const getQuizState = (state) => state.quiz;

const getTest = createSelector([getQuizState], (quizState) => quizState.test);
const getQuestions = createSelector([getTest], (test) => test.questions);
const getCurrentQuestionIndex = createSelector(
  [getQuizState],
  (quizState) => quizState.currentQuestionIndex
);

export const getCurrentQuestionNumber = createSelector(
  [getQuizState],
  (quizState) => quizState.currentQuestionIndex + 1
);

export const getCurrentQuestion = createSelector(
  [getQuestions, getCurrentQuestionIndex],
  (questions, currentQuestionIndex) => {
    if (currentQuestionIndex < 0) return undefined;
    return questions[currentQuestionIndex] || undefined;
  }
);

export const getCurrentTestQuestionsCount = createSelector(
  [getTest],
  (test) => {
    if (test.questions) {
      return test.questions.length;
    }
    return 0;
  }
);

export const getCurrentQuestionTitle = createSelector(
  [getCurrentQuestion],
  (question) => {
    if (!question) return undefined;
    return question.title;
  }
);

export const getIsQuizFinished = createSelector(
  [getQuizState],
  (quizState) => quizState.isFinished
);

export const getQuizCorrectAnswersCount = createSelector(
  [getQuizState],
  (quizState) => quizState.correctAnswersCount
);

export const getQuizAnswerInputs = createSelector(
  [getQuizState],
  (quizState) => quizState.answerInputs
);
