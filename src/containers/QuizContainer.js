import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  requestTestFromQuizPage,
  nextQuestion,
  finishQuiz,
  changeQuizAnswerInput,
} from 'redux/actions/actionCreators';
import {
  getCurrentQuestionTitle,
  getCurrentTestQuestionsCount,
  getCurrentQuestionNumber,
  getIsQuizFinished,
  getQuizCorrectAnswersCount,
  getQuizAnswerInputs,
} from 'redux/selectors/quiz';
import { createOnChangeHandlers } from 'utils';
import { getIsLoading } from 'redux/selectors/UIData';
import { useAction } from 'hooks/useAction';
import Quiz from 'components/Quiz/Quiz';

export default function QuizContainer({ ...props }) {
  const { testId } = useParams();

  const isLoading = useSelector(getIsLoading);

  const currentQuestionNumber = useSelector(getCurrentQuestionNumber);
  const questionTitle = useSelector(getCurrentQuestionTitle);
  const questionsCount = useSelector(getCurrentTestQuestionsCount);
  const isFinished = useSelector(getIsQuizFinished);
  const correctAnswersCount = useSelector(getQuizCorrectAnswersCount);
  const answerInputs = useSelector(getQuizAnswerInputs);

  const isNotFound = useMemo(() => questionsCount === 0, [questionsCount]);

  const requestTestFromServer = useAction(requestTestFromQuizPage);

  const nextQuestionAction = useAction(nextQuestion);
  const finishQuizAction = useAction(finishQuiz);
  const changeInputAction = useAction(changeQuizAnswerInput);

  const handleNextQuestion = useCallback(() => nextQuestionAction(), [
    nextQuestionAction,
  ]);

  const handleFinishQuiz = useCallback(() => finishQuizAction(), [
    finishQuizAction,
  ]);

  const handleInputChange = useCallback(
    (inputName, inputType, e) => {
      if (inputType === 'checkbox' || inputType === 'radio') {
        changeInputAction(inputName, e.target.checked);
      } else {
        changeInputAction(inputName, e.target.value);
      }
    },
    [changeInputAction]
  );

  const inputChangeHandlers = useMemo(
    () => createOnChangeHandlers(answerInputs, handleInputChange),
    [answerInputs, handleInputChange]
  );

  useEffect(() => {
    if (!isNaN(testId)) {
      requestTestFromServer(testId);
    }
  }, [requestTestFromServer, testId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isNotFound) {
    return (
      <div>
        <h1>Test not found (or this quiz doesn't contain questions)</h1>
        <Link to="/dashboard">Open tests list</Link>
      </div>
    );
  }

  return (
    <Quiz
      {...props}
      currentQuestionNumber={currentQuestionNumber}
      questionTitle={questionTitle}
      questionsCount={questionsCount}
      isFinished={isFinished}
      correctAnswersCount={correctAnswersCount}
      answerInputs={answerInputs}
      inputChangeHandlers={inputChangeHandlers}
      onNext={handleNextQuestion}
      onFinishQuiz={handleFinishQuiz}
    />
  );
}
