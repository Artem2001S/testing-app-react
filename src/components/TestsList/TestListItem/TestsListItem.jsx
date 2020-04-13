import React, { useCallback } from 'react';
import classNames from 'classnames';
import questionIcon from './question.svg';
import editIcon from './edit.svg';
import classes from './TestsListItem.module.scss';
import Button from 'components/Button/Button';

export default function TestsListItem({
  id,
  title,
  questions,
  createdAt,
  isAdmin,
  onDeleteTest,
}) {
  const itemClasses = classNames(classes.Item, {
    [classes.WithoutActions]: !isAdmin,
  });

  const deleteTest = useCallback(() => onDeleteTest(id), [id, onDeleteTest]);

  return (
    <div className={itemClasses}>
      <span className={classes.Title}>
        <span>
          {title}
          <sub className={classes.CreatedDate}>{createdAt}</sub>
        </span>
      </span>
      <span className={classes.QuestionsCount}>
        <img src={questionIcon} width="32" alt="Questions" /> {questions.length}
      </span>
      {isAdmin && (
        <div className={classes.Actions}>
          <Button transparent handleClick={deleteTest}>
            &times;
          </Button>
          <Button transparent>
            <img src={editIcon} width="22" alt="Edit" />
          </Button>
        </div>
      )}
      <div className={classes.Actions}>
        <Button transparent>&rarr;</Button>
      </div>
    </div>
  );
}
