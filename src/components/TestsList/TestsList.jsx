import React from 'react';
import PropTypes from 'prop-types';
import classes from './TestsList.module.scss';
import Button from 'components/UIElements/Button/Button';
import TestsListItem from './TestListItem/TestsListItem';

export default function TestsList({ tests, isAdmin, onSortChange }) {
  return (
    <div className={classes.TestsListWrapper}>
      <div className={classes.Header}>
        <h2>Tests</h2>
        <Button
          transparent
          title="Change the sorting"
          handleClick={onSortChange}
        >
          &darr;&uarr;
        </Button>
      </div>
      <div className={classes.List}>
        {tests.map((test) => (
          <TestsListItem key={test.id} isAdmin={isAdmin} {...test} />
        ))}
      </div>
    </div>
  );
}

TestsList.propTypes = {
  tests: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
};
