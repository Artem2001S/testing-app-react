import React from 'react';
import PropTypes from 'prop-types';
import classes from './QuizResult.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function QuizResult({ correctAnswersCount, questionsCount }) {
  return (
    <div className={classes.QuizResult}>
      <div className={classes.Title}>
        Your result {`${correctAnswersCount} of ${questionsCount}`}
      </div>
      <div className={classes.Footer}>
        <Button href="/dashboard">Go to tests list</Button>
      </div>
    </div>
  );
}

QuizResult.propTypes = {
  correctAnswersCount: PropTypes.number,
  questionsCount: PropTypes.number,
};
