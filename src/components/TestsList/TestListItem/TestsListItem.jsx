import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import questionIcon from './question.svg';
import editIcon from './edit.svg';
import classes from './TestsListItem.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function TestsListItem({
  id,
  title,
  questions,
  createdAt,
  isAdmin,
}) {
  const itemClasses = classNames(classes.Item, {
    [classes.WithoutActions]: !isAdmin,
  });

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
          <Button title="Edit" href={`/tests/${id}`} transparent>
            <img className={classes.EditImg} src={editIcon} alt="Edit" />
          </Button>
        </div>
      )}
      <div className={classes.Actions} title="Start">
        <Button href={`/quiz/${id}`} title="Start the test" transparent>
          &rarr;
        </Button>
      </div>
    </div>
  );
}

TestsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  createdAt: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
};
