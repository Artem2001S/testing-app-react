import React from 'react';
import icon from './question.svg';
import classes from './TestsListItem.module.scss';

export default function TestsListItem({
  title,
  questions,
  createdAt,
  withActions,
}) {
  return (
    <div className={classes.Item}>
      <span className={classes.Title}>
        {title}
        <sub className={classes.CreatedDate}>{createdAt}</sub>
      </span>
      <span className={classes.QuestionsCount}>
        <img src={icon} width="32" alt="Questions" /> {questions.length}
      </span>
      {withActions && <div></div>}
    </div>
  );
}
