import React from 'react';
import PropTypes from 'prop-types';
import classes from './Quiz.module.scss';
import QuizQuestion from './QuizQuestion/QuizQuestion';

export default function Quiz({
  questionTitle,
  currentQuestionNumber,
  questionsCount,
}) {
  return (
    <div className={classes.QuizContainer}>
      <QuizQuestion
        questionTitle={questionTitle}
        questionsCount={questionsCount}
        currentQuestionNumber={currentQuestionNumber}
      />
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
};
