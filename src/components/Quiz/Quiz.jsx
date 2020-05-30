import React from 'react';
import PropTypes from 'prop-types';
import classes from './Quiz.module.scss';
import QuizQuestion from './QuizQuestion/QuizQuestion';
import Button from 'components/UIElements/Button/Button';
import QuizAnswers from './QuizAnswers/QuizAnswers';
import QuizResult from './QuizResult/QuizResult';

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
    return (
      <QuizResult
        correctAnswersCount={correctAnswersCount}
        questionsCount={questionsCount}
      />
    );
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
        <Button dangerous onClick={onFinishQuiz}>
          Finish quiz
        </Button>
        <Button onClick={onNext}>Next</Button>
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
