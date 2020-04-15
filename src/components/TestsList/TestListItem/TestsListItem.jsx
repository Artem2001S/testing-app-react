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
      <span className={classes.Title} title="Title">
        <span>
          {title}
          <sub className={classes.CreatedDate} title="Date of creation">
            {createdAt}
          </sub>
        </span>
      </span>
      <span className={classes.QuestionsCount} title="Questions count">
        <img src={questionIcon} width="32" alt="Questions" />
        {questions.length}
      </span>
      {isAdmin && (
        <div className={classes.Actions}>
          <Button transparent title="Delete" handleClick={deleteTest}>
            &times;
          </Button>
          <Button title="Edit" transparent>
            <img className={classes.EditImg} src={editIcon} alt="Edit" />
          </Button>
        </div>
      )}
      <div className={classes.Actions} title="Start">
        <Button title="Start the test" transparent>
          &rarr;
        </Button>
      </div>
    </div>
  );
}
