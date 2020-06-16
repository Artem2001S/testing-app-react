import React from 'react';
import PropTypes from 'prop-types';
import classes from './QuizQuestion.module.scss';

function QuizQuestion({
  questionTitle,
  currentQuestionNumber,
  questionsCount,
}) {
  return (
    <div className={classes.QuizHeader}>
      <div className={classes.CurrentQuestion}>
        {`${currentQuestionNumber}/${questionsCount}`}
      </div>
      <div>{questionTitle}</div>
    </div>
  );
}

QuizQuestion.propTypes = {
  questionTitle: PropTypes.string,
  questionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentQuestionNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default React.memo(QuizQuestion);
