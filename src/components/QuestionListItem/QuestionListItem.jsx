import React from 'react';
import classes from './QuestionListItem.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function QuestionListItem({ title, type, onDelete }) {
  return (
    <div className={classes.QuestionListItem}>
      <span className={classes.Title} title="Title">
        <span>
          {title}
          <sub className={classes.QuestionType} title="Question type">
            {type}
          </sub>
        </span>
      </span>
      <div className={classes.Actions}>
        <Button title="Edit" transparent>
          Edit
        </Button>
        <Button title="Delete" transparent handleClick={onDelete}>
          &times;
        </Button>
      </div>
    </div>
  );
}
