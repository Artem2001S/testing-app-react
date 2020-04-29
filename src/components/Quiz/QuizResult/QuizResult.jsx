import React from 'react';
import PropTypes from 'prop-types';
import classes from './QuizResult.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function QuizResult({ correctAnswersCount, questionsCount }) {
  return (
    <div className={classes.QuizResult}>
      <div className={classes.Title}>
        Your result: <u>{correctAnswersCount}</u> of {questionsCount}
      </div>
      <div className={classes.Footer}>
        <Button href="/dashboard" dangerous>
          Go to tests list
        </Button>
      </div>
    </div>
  );
}

QuizResult.propTypes = {
  correctAnswersCount: PropTypes.number,
  questionsCount: PropTypes.number,
};
