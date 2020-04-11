import React from 'react';
import classes from './TestsList.module.scss';
import Button from 'components/Button/Button';
import TestsListItem from './TestListItem/TestsListItem';

export default function TestsList({ tests, isAdmin }) {
  tests = [
    {
      id: 47,
      createdAt: new Date('2020-04-09T15:03:15.326Z').toLocaleString(),
      title:
        'Big Test TitleBig Test TitleBig Test TitleBig Test TitleBig Test TitleBig Test TitleBig Test TitleBig Test Title',
      questions: [],
    },
    {
      id: 48,
      createdAt: new Date('2020-04-09T15:09:15.172Z').toLocaleString(),
      title: 'test_2',
      questions: [],
    },
  ];

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
