import React from 'react';
import PropTypes from 'prop-types';
import classes from './Quiz.module.scss';
import QuizQuestion from './QuizQuestion/QuizQuestion';
import Button from 'components/UIElements/Button/Button';
import QuizAnswers from './QuizAnswers/QuizAnswers';

export default function Quiz({
  questionTitle,
  currentQuestionNumber,
  isFinished,
  questionsCount,
  correctAnswersCount,
  inputChangeHandlers,
  answerInputs,
  onNext,
  onFinishQuiz,
}) {
  if (isFinished) {
    return <h1>Your result {`${correctAnswersCount} of ${questionsCount}`}</h1>;
  }

  return (
    <div className={classes.QuizContainer}>
      <QuizQuestion
        questionTitle={questionTitle}
        questionsCount={questionsCount}
        currentQuestionNumber={currentQuestionNumber}
      />
      <QuizAnswers
        answerInputs={answerInputs}
        inputChangeHandlers={inputChangeHandlers}
      />
      <div className={classes.Actions}>
        <Button dangerous handleClick={onFinishQuiz}>
          Finish quiz
        </Button>
        <Button handleClick={onNext}>Next</Button>
      </div>
    </div>
  );
}

Quiz.propTypes = {
  questionTitle: PropTypes.string,
  questionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentQuestionNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isFinished: PropTypes.bool,
  answerInputs: PropTypes.array.isRequired,
  correctAnswersCount: PropTypes.number,
  inputChangeHandlers: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
  onFinishQuiz: PropTypes.func.isRequired,
};
