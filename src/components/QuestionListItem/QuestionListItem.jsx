import React from 'react';
import classes from './QuestionListItem.module.scss';
import Button from 'components/Button/Button';

export default function QuestionListItem({ title, type }) {
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
        <Button title="Delete" transparent>
          &times;
        </Button>
      </div>
    </div>
  );
}
