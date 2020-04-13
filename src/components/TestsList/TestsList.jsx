import React from 'react';
import classes from './TestsList.module.scss';
import Button from 'components/Button/Button';
import TestsListItem from './TestListItem/TestsListItem';

export default function TestsList({ tests, isAdmin }) {
  return (
    <div className={classes.TestsListWrapper}>
      <div className={classes.Header}>
        <h2>Tests</h2>
        <Button transparent>&darr;&uarr;</Button>
      </div>
      <div className={classes.List}>
        {tests.map((test) => (
          <TestsListItem key={test.id} {...test} withActions={isAdmin} />
        ))}
      </div>
    </div>
  );
}
