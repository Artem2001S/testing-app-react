import { createSelector } from 'reselect';

const getQuestions = (state) => state.quiz.test.questions;
const getTest = (state) => state.quiz.test;

const getCurrentQuestionIndex = (state) => state.quiz.currentQuestionIndex;

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
