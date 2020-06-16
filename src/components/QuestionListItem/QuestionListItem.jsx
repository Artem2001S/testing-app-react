import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UIElements/Button/Button';
import classes from './QuestionListItem.module.scss';

function QuestionListItem({ title, type, onDelete, startQuestionEditing }) {
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
        <Button title="Edit" transparent onClick={startQuestionEditing}>
          Edit
        </Button>
        <Button title="Delete" transparent onClick={onDelete}>
          &times;
        </Button>
      </div>
    </div>
  );
}

QuestionListItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  startQuestionEditing: PropTypes.func.isRequired,
};

export default React.memo(QuestionListItem);
